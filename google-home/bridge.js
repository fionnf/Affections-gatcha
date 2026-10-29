// The bridge to the lamps: MQTT on the same public broker and topics the app
// and the lights page use (see src/licht.js). `openTransport()` is injected:
// the Worker gives it a Cloudflare TCP socket, a test gives it a fake.
import { withMqtt } from "./mqtt.js";
import { BOARD_IDS } from "./smarthome.js";

export const PREFIX = "picolight_lf26";
const FROM = "google_home";
const clientId = () => "gh_" + Math.random().toString(16).slice(2, 10);

export function makeBridge(openTransport, { echoWaitMs = 2500 } = {}) {
  return {
    // The boards echo their whole state to any sender that is not a board, and
    // keep a retained online flag; read both.
    async readState() {
      const state = {};
      await withMqtt(await openTransport(), clientId(), async (s) => {
        await s.subscribe([`${PREFIX}/events`, `${PREFIX}/status/+`]);
        await s.publish(`${PREFIX}/events`, { nudge: true, from: FROM });
        const got = (msgs) => BOARD_IDS.every((id) => state[id] && "on" in state[id]);
        const fold = (msgs) => {
          for (const m of msgs) {
            let d; try { d = JSON.parse(m.payload); } catch (_e) { continue; }
            if (!d || typeof d !== "object") continue;
            if (m.topic.startsWith(`${PREFIX}/status/`)) {
              const id = m.topic.split("/").pop();
              if (BOARD_IDS.includes(id)) state[id] = { ...(state[id] || {}), online: !!d.online };
            } else if (BOARD_IDS.includes(d.from) && "on" in d) {
              state[d.from] = { ...(state[d.from] || {}), on: !!d.on };
            }
          }
          return got();
        };
        const msgs = await s.collect(echoWaitMs, fold);
        fold(msgs);
      });
      return state;
    },
    // ids may include "both". Single lamps are addressed with `target`, the
    // pair with a message to everyone, as the app does.
    async setOn(ids, on) {
      const targets = ids.includes("both") ? [null] : ids.filter((i) => BOARD_IDS.includes(i));
      if (BOARD_IDS.every((b) => targets.includes(b))) targets.splice(0, targets.length, null);
      await withMqtt(await openTransport(), clientId(), async (s) => {
        for (const t of targets) await s.publish(`${PREFIX}/events`, t ? { on, target: t, from: FROM } : { on, from: FROM });
        await new Promise((r) => setTimeout(r, 150));   // let the packets leave before closing
      });
    }
  };
}
