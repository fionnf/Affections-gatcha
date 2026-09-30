// ── Lights pull-flash ─────────────────────────────────────────────────────────
// When a capsule is revealed, both linked_friend_lights lamps glow green for
// ~10 s and then return to exactly the state they were in before.
//
// Protocol (see /lichter.html and the linked_friend_lights firmware): boards
// listen on <prefix>/events via MQTT-over-WebSocket and — key to this file —
// echo their complete current state (groups incl. pos/w/size, on, brightness,
// fade/drift settings) whenever they receive any message from a non-board
// sender. So: nudge → capture echoes → flash green → replay the captured
// state per board. Boards that were off get their colour restored first and
// are powered back down a beat later (the firmware ignores colour commands
// while off).
//
// Everything is best-effort and fully async: no mqtt.js loaded until a real
// pull happens, and any failure (no network, CDN blocked, boards offline)
// silently skips the effect without touching the reveal UX.

const BROKER = "wss://broker.hivemq.com:8884/mqtt";
const TOPIC = "picolight_lf26/events";
const FROM_ID = "web_app";
const NUM_LEDS = 10;
// Positions on the firmware's 30-entry TINT_PALETTE (index / 29): 0 golden
// yellow, 4 pure red, 12 sky blue, 14 cyan, 17 pure green, 25 purple. w is
// the white level; 1.0 swamps the hue, which is the point for a Foto-Drop.
// The room reacts to what he drew before he has read it.
const GREEN_POS = 17 / 29;
const TONE_LIGHT = {
  jackpot:  { pos: 0 / 29,  w: 0.0 },
  special:  { pos: 0 / 29,  w: 0.0 },
  rare:     { pos: 25 / 29, w: 0.0 },
  quest:    { pos: 12 / 29, w: 0.0 },
  cursed:   { pos: 4 / 29,  w: 0.0 },
  uncommon: { pos: 14 / 29, w: 0.0 },
  photo:    { pos: GREEN_POS, w: 1.0 },
  quiet:    { pos: 1 / 29,  w: 0.3 }
};
const FLASH_MS = 10000;
const ECHO_WAIT_MS = 2500;
const BOARD_IDS = ["board_a", "board_b"];

let _busy = false;

function _loadMqtt() {
  if (window.mqtt) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://unpkg.com/mqtt/dist/mqtt.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("mqtt load failed"));
    document.head.appendChild(s);
  });
}

function _restorePayload(state) {
  return {
    groups: state.groups,
    brightness: state.brightness,
    fade_steps: state.fade_steps,
    drift_enabled: state.drift_enabled,
    drift_interval: state.drift_interval,
  };
}

export async function flashLightsForPull(tone) {
  if (_busy) return;
  const light = TONE_LIGHT[tone] || { pos: GREEN_POS, w: 0.0 };
  _busy = true;
  try {
    await _loadMqtt();
    await new Promise((resolve, reject) => {
      const client = window.mqtt.connect(BROKER, {
        clientId: "gachafx_" + Math.random().toString(16).slice(2),
        clean: true,
        connectTimeout: 8000,
      });
      const captured = {};
      let flashed = false;
      let restoreTimer = null;
      let done = false;

      const finish = () => {
        if (done) return;
        done = true;
        document.removeEventListener("visibilitychange", onHide);
        try { client.end(true); } catch (_e) {}
        resolve();
      };

      const publish = (payload) => {
        payload.from = FROM_ID;
        try { client.publish(TOPIC, JSON.stringify(payload)); } catch (_e) {}
      };

      const restore = () => {
        clearTimeout(restoreTimer);
        if (!flashed) { finish(); return; }
        flashed = false;
        for (const id of BOARD_IDS) {
          // A board whose echo got lost is restored from its partner's
          // snapshot — the two are normally in sync anyway, and the boss
          // re-syncs the follower within a minute regardless.
          const state = captured[id] || captured[BOARD_IDS.find((b) => b !== id)];
          if (!state) continue;
          const base = { target: id, ..._restorePayload(state) };
          if (state.on === false) {
            // Firmware ignores colour while off: restore colour on, then
            // power back down once the fade has landed.
            publish({ ...base, on: true });
            setTimeout(() => publish({ target: id, on: false }), 1500);
          } else {
            publish({ ...base, on: true });
          }
        }
        // Give the trailing power-off publishes time to leave, then close.
        setTimeout(finish, 2500);
      };

      // If the page is backgrounded mid-flash, restore immediately — an
      // interrupted timer must never strand the lamps in green.
      const onHide = () => {
        if (document.visibilityState === "hidden" && flashed) restore();
      };
      document.addEventListener("visibilitychange", onHide);

      client.on("connect", () => {
        client.subscribe(TOPIC, (err) => {
          if (err) { finish(); return; }
          // No recognised fields — boards change nothing but echo their
          // full current state back.
          publish({ nudge: true });
          setTimeout(() => {
            if (!Object.keys(captured).length) { finish(); return; }
            flashed = true;
            publish({ on: true, groups: [{ pos: light.pos, w: light.w, size: NUM_LEDS }] });
            restoreTimer = setTimeout(restore, FLASH_MS);
          }, ECHO_WAIT_MS);
        });
      });

      client.on("message", (t, msg) => {
        try {
          const d = JSON.parse(msg.toString());
          if (d.from && BOARD_IDS.includes(d.from) && Array.isArray(d.groups) && !flashed) {
            captured[d.from] = d;
          }
        } catch (_e) {}
      });

      client.on("error", () => { if (!flashed) finish(); });
      client.on("close", () => { if (!flashed) finish(); });
      setTimeout(() => reject(new Error("lights flash timed out")), FLASH_MS + 20000);
    });
  } catch (_e) {
    /* best-effort: no lamps, no network, no problem */
  } finally {
    _busy = false;
  }
}
