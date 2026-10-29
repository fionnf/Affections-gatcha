import test from "node:test";
import assert from "node:assert/strict";
import { connectPacket, subscribePacket, publishPacket, PacketReader, parsePublish, withMqtt } from "../google-home/mqtt.js";
import { fulfil, sync } from "../google-home/smarthome.js";
import { makeBridge } from "../google-home/bridge.js";
import { route } from "../google-home/router.js";
import { sign, verify } from "../google-home/auth.js";

const hex = (u8) => Buffer.from(u8).toString("hex");

test("MQTT packets match a reference encoder byte for byte", () => {
  // Generated with mqtt-packet (the library inside mqtt.js).
  assert.equal(hex(connectPacket("gh_x")), "101000044d5154540402003c000467685f78");
  assert.equal(hex(subscribePacket(1, ["a/b"])), "820800010003612f6200");
  assert.equal(hex(publishPacket("a/b", { on: true })), "30100003612f627b226f6e223a747275657d");
});

test("the packet reader copes with split and joined chunks and reads retained publishes", () => {
  const r = new PacketReader();
  const bytes = Uint8Array.from(Buffer.from("20020000" + "310c0008702f6576656e74736869", "hex"));
  r.push(bytes.slice(0, 3));
  assert.equal(r.next(), null);
  r.push(bytes.slice(3, 9));
  const connack = r.next();
  assert.equal(connack.type, 2);
  assert.equal(r.next(), null);
  r.push(bytes.slice(9));
  const pub = r.next();
  assert.equal(pub.type, 3);
  assert.deepEqual(parsePublish(pub), { topic: "p/events", payload: "hi" });
});

// A broker in memory: accepts CONNECT, records PUBLISH, and answers a nudge the
// way the lamps do — an echo per lamp — plus a retained status per lamp.
function fakeBroker({ lamps, refuse = false, silent = false }) {
  const published = [];
  const inbox = [];
  let waiter = null;
  const push = (u8) => { if (waiter) { const w = waiter; waiter = null; w({ value: u8, done: false }); } else inbox.push(u8); };
  const reader = new PacketReader();
  const frame = (topic, obj) => publishPacket(topic, obj);
  return {
    published,
    transport: {
      async write(bytes) {
        reader.push(bytes);
        let p;
        while ((p = reader.next())) {
          if (p.type === 1) push(Uint8Array.from([0x20, 2, 0, refuse ? 5 : 0]));
          if (p.type === 8) {                       // SUBSCRIBE: retained status flags
            for (const [id, l] of Object.entries(lamps)) push(frame(`picolight_lf26/status/${id}`, { online: l.online }));
          }
          if (p.type === 3) {
            const m = parsePublish(p);
            const d = JSON.parse(m.payload);
            published.push(d);
            if (d.nudge && !silent) for (const [id, l] of Object.entries(lamps)) push(frame("picolight_lf26/events", { from: id, on: l.on, groups: [] }));
          }
        }
      },
      read() { return inbox.length ? Promise.resolve({ value: inbox.shift(), done: false }) : new Promise((res) => { waiter = res; }); },
      close() {}
    }
  };
}

test("withMqtt refuses a broker that says no", async () => {
  const b = fakeBroker({ lamps: {}, refuse: true });
  await assert.rejects(() => withMqtt(b.transport, "x", async () => {}), /refused/);
});

test("the bridge reads each lamp's on state and online flag", async () => {
  const b = fakeBroker({ lamps: { board_a: { on: true, online: true }, board_b: { on: false, online: true } } });
  const state = await makeBridge(async () => b.transport).readState();
  assert.deepEqual(state, { board_a: { online: true, on: true }, board_b: { online: true, on: false } });
});

test("the bridge sends target for one lamp, nothing for the pair", async () => {
  let b = fakeBroker({ lamps: {} });
  await makeBridge(async () => b.transport).setOn(["board_a"], false);
  assert.deepEqual(b.published, [{ on: false, target: "board_a", from: "google_home" }]);
  b = fakeBroker({ lamps: {} });
  await makeBridge(async () => b.transport).setOn(["both"], true);
  assert.deepEqual(b.published, [{ on: true, from: "google_home" }]);
  b = fakeBroker({ lamps: {} });
  await makeBridge(async () => b.transport).setOn(["board_a", "board_b"], true);
  assert.deepEqual(b.published, [{ on: true, from: "google_home" }], "both lamps asked for = one message to everyone");
});

const fakeBridge = (state, calls = []) => ({ readState: async () => state, setOn: async (ids, on) => { calls.push([ids, on]); } });

test("SYNC lists two lamps and the pair as on/off lights", async () => {
  const r = sync("r1");
  assert.deepEqual(r.payload.devices.map((d) => d.id), ["board_a", "board_b", "both"]);
  for (const d of r.payload.devices) {
    assert.equal(d.type, "action.devices.types.LIGHT");
    assert.deepEqual(d.traits, ["action.devices.traits.OnOff"]);
  }
});

test("QUERY reports on/off, the pair as on when either is, and unknown ids as errors", async () => {
  const state = { board_a: { on: true, online: true }, board_b: { on: false, online: true } };
  const r = await fulfil({ requestId: "q", inputs: [{ intent: "action.devices.QUERY", payload: { devices: [{ id: "board_a" }, { id: "board_b" }, { id: "both" }, { id: "x" }] } }] }, fakeBridge(state));
  assert.equal(r.payload.devices.board_a.on, true);
  assert.equal(r.payload.devices.board_b.on, false);
  assert.equal(r.payload.devices.both.on, true);
  assert.equal(r.payload.devices.x.errorCode, "deviceNotFound");
});

test("EXECUTE switches lamps and refuses anything but on/off", async () => {
  const calls = [];
  const ok = await fulfil({ requestId: "e", inputs: [{ intent: "action.devices.EXECUTE", payload: { commands: [{ devices: [{ id: "board_b" }], execution: [{ command: "action.devices.commands.OnOff", params: { on: false } }] }] } }] }, fakeBridge({}, calls));
  assert.deepEqual(calls, [[["board_b"], false]]);
  assert.equal(ok.payload.commands[0].status, "SUCCESS");
  assert.equal(ok.payload.commands[0].states.on, false);
  const bad = await fulfil({ requestId: "e", inputs: [{ intent: "action.devices.EXECUTE", payload: { commands: [{ devices: [{ id: "board_a" }], execution: [{ command: "action.devices.commands.BrightnessAbsolute", params: { brightness: 50 } }] }] } }] }, fakeBridge({}, calls));
  assert.equal(bad.payload.commands[0].errorCode, "functionNotSupported");
  assert.equal(calls.length, 1, "nothing was sent for the unsupported command");
  const offline = await fulfil({ requestId: "e", inputs: [{ intent: "action.devices.EXECUTE", payload: { commands: [{ devices: [{ id: "board_a" }], execution: [{ command: "action.devices.commands.OnOff", params: { on: true } }] }] } }] }, { setOn: async () => { throw new Error("down"); } });
  assert.equal(offline.payload.commands[0].errorCode, "deviceOffline");
});

const env = { CLIENT_ID: "cid", CLIENT_SECRET: "csecret", SIGNING_KEY: "k".repeat(32), LINK_PASSPHRASE: "open sesame", GOOGLE_PROJECT_ID: "proj-1" };
const REDIRECT = "https://oauth-redirect.googleapis.com/r/proj-1";
const post = (path, params, headers = {}) => new Request(`https://w.test${path}`, { method: "POST", body: new URLSearchParams(params), headers });

test("account linking: wrong password, then right password, code → tokens → fulfilment", async () => {
  const q = `?client_id=cid&redirect_uri=${encodeURIComponent(REDIRECT)}&state=st&response_type=code`;
  assert.equal((await route(new Request(`https://w.test/auth${q}`), env)).status, 200);
  assert.equal((await route(new Request(`https://w.test/auth?client_id=nope&redirect_uri=${encodeURIComponent(REDIRECT)}&response_type=code`), env)).status, 400);
  assert.equal((await route(new Request(`https://w.test/auth?client_id=cid&redirect_uri=${encodeURIComponent("https://evil.test/")}&response_type=code`), env)).status, 400);

  const base = { client_id: "cid", redirect_uri: REDIRECT, state: "st", response_type: "code" };
  assert.equal((await route(post("/auth", { ...base, passphrase: "wrong" }), env)).status, 403);
  const ok = await route(post("/auth", { ...base, passphrase: "open sesame" }), env);
  assert.equal(ok.status, 302);
  const back = new URL(ok.headers.get("location"));
  assert.equal(back.searchParams.get("state"), "st");
  const code = back.searchParams.get("code");

  const tok = await (await route(post("/token", { client_id: "cid", client_secret: "csecret", grant_type: "authorization_code", code, redirect_uri: REDIRECT }), env)).json();
  assert.ok(tok.access_token && tok.refresh_token);
  assert.equal((await route(post("/token", { client_id: "cid", client_secret: "bad", grant_type: "authorization_code", code, redirect_uri: REDIRECT }), env)).status, 401);

  const refreshed = await (await route(post("/token", { client_id: "cid", client_secret: "csecret", grant_type: "refresh_token", refresh_token: tok.refresh_token }), env)).json();
  assert.ok(refreshed.access_token);
  assert.equal((await route(post("/token", { client_id: "cid", client_secret: "csecret", grant_type: "refresh_token", refresh_token: tok.access_token }), env)).status, 400, "an access token is not a refresh token");

  const body = JSON.stringify({ requestId: "1", inputs: [{ intent: "action.devices.SYNC" }] });
  const res = await route(new Request("https://w.test/fulfillment", { method: "POST", body, headers: { authorization: `Bearer ${tok.access_token}` } }), env, fakeBridge({}));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).payload.devices.length, 3);
  assert.equal((await route(new Request("https://w.test/fulfillment", { method: "POST", body }), env, fakeBridge({}))).status, 401);
  assert.equal((await route(new Request("https://w.test/fulfillment", { method: "POST", body, headers: { authorization: `Bearer ${tok.access_token}x` } }), env, fakeBridge({}))).status, 401);
});

test("tokens expire and reject tampering", async () => {
  const t = await sign("secret", { t: "access", exp: 1000 });
  assert.equal((await verify("secret", t, 500)).t, "access");
  assert.equal(await verify("secret", t, 2000), null, "expired");
  assert.equal(await verify("other", t, 500), null, "wrong key");
  assert.equal(await verify("secret", "a.b", 500), null, "garbage");
});
