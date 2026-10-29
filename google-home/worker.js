// Cloudflare Worker entry. Talks to the lamps' MQTT broker over a plain TCP
// socket (the public HiveMQ broker also listens on 1883); the browser apps
// use its WebSocket port instead, but a Worker has no need for that.
import { connect } from "cloudflare:sockets";
import { makeBridge } from "./bridge.js";
import { route } from "./router.js";

async function openTransport(env) {
  const socket = connect({ hostname: env.MQTT_HOST || "broker.hivemq.com", port: Number(env.MQTT_PORT || 1883) });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  return {
    write: (bytes) => writer.write(bytes),
    read: () => reader.read(),
    close: () => { try { socket.close(); } catch (_e) {} }
  };
}

export default {
  async fetch(request, env) {
    return route(request, env, makeBridge(() => openTransport(env)));
  }
};
