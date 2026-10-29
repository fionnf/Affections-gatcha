// Just enough MQTT 3.1.1 for the bridge: connect, subscribe, publish at QoS 0,
// and read the PUBLISH packets that come back. The Worker has no MQTT library
// (and does not need one for this), so the packets are written by hand.
//
// A transport is { write(Uint8Array), read() -> {value, done}, close() },
// which is what a Cloudflare TCP socket's writer/reader provide.

const enc = new TextEncoder();
const dec = new TextDecoder();

const str = (s) => {
  const b = enc.encode(s);
  return [b.length >> 8, b.length & 255, ...b];
};
const remaining = (n) => {
  const out = [];
  do { let d = n % 128; n = Math.floor(n / 128); if (n > 0) d |= 128; out.push(d); } while (n > 0);
  return out;
};
const packet = (first, body) => Uint8Array.from([first, ...remaining(body.length), ...body]);

export function connectPacket(clientId, keepalive = 60) {
  return packet(0x10, [...str("MQTT"), 4, 0x02, keepalive >> 8, keepalive & 255, ...str(clientId)]);
}
export function subscribePacket(id, topics) {
  return packet(0x82, [id >> 8, id & 255, ...topics.flatMap((t) => [...str(t), 0])]);
}
export function publishPacket(topic, payload, retain = false) {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  return packet(0x30 | (retain ? 1 : 0), [...str(topic), ...enc.encode(body)]);
}
export const DISCONNECT = Uint8Array.from([0xe0, 0x00]);

// Packet reader over a byte stream: chunks may split or join packets.
export class PacketReader {
  constructor() { this.buf = new Uint8Array(0); }
  push(chunk) {
    const next = new Uint8Array(this.buf.length + chunk.length);
    next.set(this.buf); next.set(chunk, this.buf.length);
    this.buf = next;
  }
  // Next complete packet as { type, flags, body }, or null.
  next() {
    const b = this.buf;
    if (b.length < 2) return null;
    let len = 0, mul = 1, i = 1;
    for (;;) {
      if (i >= b.length) return null;
      len += (b[i] & 127) * mul;
      if (!(b[i] & 128)) break;
      mul *= 128; i++;
      if (i > 4) throw new Error("bad MQTT length");
    }
    const start = i + 1;
    if (b.length < start + len) return null;
    const pkt = { type: b[0] >> 4, flags: b[0] & 15, body: b.slice(start, start + len) };
    this.buf = b.slice(start + len);
    return pkt;
  }
}

export function parsePublish(pkt) {
  const b = pkt.body;
  const tl = (b[0] << 8) | b[1];
  const topic = dec.decode(b.slice(2, 2 + tl));
  const qos = (pkt.flags >> 1) & 3;
  const from = 2 + tl + (qos ? 2 : 0);
  return { topic, payload: dec.decode(b.slice(from)) };
}

// One short session: connect, run fn(session), disconnect. Rejects if the
// broker does not accept the connection.
export async function withMqtt(transport, clientId, fn) {
  const reader = new PacketReader();
  const messages = [];
  let ended = false;

  const pump = async (ms, stop) => {
    const until = Date.now() + ms;
    for (;;) {
      let pkt;
      while ((pkt = reader.next())) {
        if (pkt.type === 3) messages.push(parsePublish(pkt));
        else if (pkt.type === 2) return pkt;      // CONNACK
        if (stop && stop(messages)) return null;
      }
      const left = until - Date.now();
      if (left <= 0 || ended) return null;
      const r = await Promise.race([
        transport.read(),
        new Promise((res) => setTimeout(() => res({ timeout: true }), left))
      ]);
      if (r.timeout) return null;
      if (r.done) { ended = true; return null; }
      reader.push(r.value);
    }
  };

  await transport.write(connectPacket(clientId));
  const ack = await pump(8000);
  if (!ack || ack.body[1] !== 0) { try { transport.close(); } catch (_e) {} throw new Error("MQTT broker refused the connection"); }
  try {
    return await fn({
      subscribe: (topics) => transport.write(subscribePacket(1, topics)),
      publish: (topic, payload, retain) => transport.write(publishPacket(topic, payload, retain)),
      // Collect messages for up to `ms`, or until `stop(messages)` says enough.
      collect: async (ms, stop) => { await pump(ms, stop); return messages.slice(); }
    });
  } finally {
    try { await transport.write(DISCONNECT); } catch (_e) {}
    try { transport.close(); } catch (_e) {}
  }
}
