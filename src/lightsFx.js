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

import { isWhite, isColoured, rememberColour, recallColour, restorePayload } from "./farbe.js";
import { lightReactionsEnabled } from "./einstellungen.js";

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
const FLASH_MS = 18000;
const SPARK_STEP_MS = 420;
const SPARK_STEPS = 6;
const REVEAL_AT_MS = SPARK_STEP_MS * SPARK_STEPS;
const SHIMMER_MS = 1600;

// The flash used to be one flat colour for ten seconds. Now it is a small
// show: a rattle of the tone colour chased by white sparks while the capsule
// is falling, then the full colour at full brightness, and for the rarer
// tones a slow shimmer between two hues until the end. Group sizes always
// sum to NUM_LEDS, which is what the firmware expects. Exported so a test
// can check the timeline without a broker.
export function choreography(tone) {
  const light = TONE_LIGHT[tone] || { pos: GREEN_POS, w: 0.0 };
  // For a Foto-Drop the base is white, so the sparks go green instead.
  const spark = light.w >= 1 ? { pos: GREEN_POS, w: 0.0 } : { pos: light.pos, w: 1.0 };
  const tint = { pos: light.pos, w: light.w };
  const rattleA = [{ ...tint, size: 3 }, { ...spark, size: 2 }, { ...tint, size: 3 }, { ...spark, size: 2 }];
  const rattleB = [{ ...spark, size: 2 }, { ...tint, size: 3 }, { ...spark, size: 2 }, { ...tint, size: 3 }];
  const steps = [];
  for (let i = 0; i < SPARK_STEPS; i++) {
    steps.push({ at: i * SPARK_STEP_MS, payload: { on: true, fade_steps: 6, brightness: 1.0, groups: i % 2 ? rattleB : rattleA } });
  }
  steps.push({ at: REVEAL_AT_MS, payload: { on: true, fade_steps: 40, brightness: 1.0, groups: [{ ...tint, size: NUM_LEDS }] } });
  const shimmer = tone === "jackpot" || tone === "special" ? { pos: 29 / 29, w: 0.0 }   // pale gold
    : tone === "rare" ? { pos: 8 / 29, w: 0.0 }                                          // violet
    : null;
  if (shimmer) {
    let flip = false;
    for (let t = REVEAL_AT_MS + SHIMMER_MS; t < FLASH_MS - SHIMMER_MS; t += SHIMMER_MS) {
      flip = !flip;
      steps.push({ at: t, payload: { on: true, fade_steps: 60, groups: [{ ...(flip ? shimmer : tint), size: NUM_LEDS }] } });
    }
  }
  return steps;
}
const ECHO_WAIT_MS = 2500;
const BOARD_IDS = ["board_a", "board_b"];

let _busy = false;

export function loadMqtt() {
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

export function flashLightsForPull(tone) {
  if (!lightReactionsEnabled()) return Promise.resolve();
  return runFlash(choreography(tone), FLASH_MS, null);
}

// The emoji he taps under the card has a colour; Fionn's lamp shows it for
// ten seconds and breathes twice, then goes back. The reaction row already
// has the emoji, this file already had the flash.
export const REACTION_LIGHT = {
  "🥹": { pos: 25 / 29, w: 0.0 },   // violet — gerührt
  "😂": { pos: 0 / 29,  w: 0.0 },   // gold — lachen
  "🙃": { pos: GREEN_POS, w: 0.0 }  // green — na gut
};
export const REACTION_MS = 10000;
export function reactionChoreography(emoji) {
  const tint = REACTION_LIGHT[emoji] || { pos: 2 / 29, w: 0.3 };
  const full = [{ ...tint, size: NUM_LEDS }];
  return [
    { at: 0,    payload: { on: true, fade_steps: 20, brightness: 1.0, groups: full } },
    { at: 2200, payload: { fade_steps: 60, brightness: 0.45 } },
    { at: 4400, payload: { fade_steps: 60, brightness: 1.0 } },
    { at: 6600, payload: { fade_steps: 60, brightness: 0.45 } },
    { at: 8800, payload: { fade_steps: 60, brightness: 1.0 } }
  ];
}
export function flashReactionOnLamp(emoji, boardId = "board_a") {
  if (!lightReactionsEnabled()) return Promise.resolve();
  return runFlash(reactionChoreography(emoji), REACTION_MS, boardId);
}

// ── Farbgedächtnis beim Start ────────────────────────────────────────────────
// Once in a while when the app opens: ask the lamps how they look, and put
// the remembered colour back on any that answers white while a colour is on
// record. A short connection, nothing else sent. Throttled, because the app
// opens often and the lamps rarely reboot.
const CHECK_KEY = "affektions-gacha:licht:farbe:checked";
export const CHECK_EVERY_MS = 20 * 60000;
export function checkColourOnStart({ force = false } = {}) {
  try {
    const last = Number(window.localStorage.getItem(CHECK_KEY) || 0);
    if (!force && Date.now() - last < CHECK_EVERY_MS) return Promise.resolve(false);
    window.localStorage.setItem(CHECK_KEY, String(Date.now()));
  } catch (_e) {}
  if (!BOARD_IDS.some((id) => recallColour(id))) return Promise.resolve(false);
  return colourCheck().catch(() => false);
}
async function colourCheck() {
  if (_busy) return false;
  _busy = true;
  try {
    await loadMqtt();
    return await new Promise((resolve) => {
      const client = window.mqtt.connect(BROKER, { clientId: "gachafx_" + Math.random().toString(16).slice(2), clean: true, connectTimeout: 8000 });
      let done = false, restored = 0;
      const finish = () => { if (done) return; done = true; try { client.end(true); } catch (_e) {} resolve(restored > 0); };
      const publish = (payload) => { payload.from = FROM_ID; try { client.publish(TOPIC, JSON.stringify(payload)); } catch (_e) {} };
      client.on("connect", () => {
        client.subscribe(TOPIC, (err) => {
          if (err) { finish(); return; }
          publish({ nudge: true });
          setTimeout(() => setTimeout(finish, restored ? 2000 : 0), ECHO_WAIT_MS);
        });
      });
      client.on("message", (t, msg) => {
        try {
          const d = JSON.parse(msg.toString());
          if (!d.from || !BOARD_IDS.includes(d.from) || !Array.isArray(d.groups)) return;
          if (isColoured(d)) { rememberColour(d.from, d); return; }
          const m = d.on !== false && isWhite(d) ? recallColour(d.from) : null;
          if (m) { publish(restorePayload(d.from, m)); restored++; }
        } catch (_e) {}
      });
      client.on("error", finish);
      client.on("close", finish);
      setTimeout(finish, ECHO_WAIT_MS + 8000);
    });
  } finally {
    _busy = false;
  }
}

// ── Notfall-Umarmung ─────────────────────────────────────────────────────────
// A hug that went out is seen on both lamps: red and orange in short
// segments chasing along the strip, strobing, for eight seconds. The
// pattern moves one light per step; every other step is dim, which is
// the strobe. Then the lamps go back to what they were.
export const HUG_MS = 8000;
export const HUG_STEP_MS = 220;
const HUG_RED = 4 / 29, HUG_ORANGE = 1.5 / 29;
// Two reds, two oranges, repeated and rotated by `shift` lights.
export function hugGroups(shift = 0) {
  const seg = 2;
  const colours = [];
  for (let i = 0; i < NUM_LEDS; i++) colours.push(Math.floor(((i + shift) % NUM_LEDS) / seg) % 2 === 0 ? HUG_RED : HUG_ORANGE);
  const groups = [];
  for (const pos of colours) {
    const last = groups[groups.length - 1];
    if (last && last.pos === pos) last.size++;
    else groups.push({ pos, w: 0, size: 1 });
  }
  return groups;
}
export function hugChoreography() {
  const steps = [];
  for (let at = 0, i = 0; at < HUG_MS - 400; at += HUG_STEP_MS, i++) {
    steps.push({ at, payload: { on: true, fade_steps: 4, brightness: i % 2 ? 0.18 : 1.0, groups: hugGroups(i) } });
  }
  return steps;
}
export function flashHugOnLamps() {
  if (!lightReactionsEnabled()) return Promise.resolve();
  return runFlash(hugChoreography(), HUG_MS, null);
}

// ── Kerze ────────────────────────────────────────────────────────────────────
// Both lamps as one candle: a warm amber, low, breathing unevenly the way a
// flame does. Runs until stopped; the stop puts the lamps back.
export const CANDLE_PERIOD_MS = 3200;
export const CANDLE_TINT = { pos: 1 / 29, w: 0.12 };
export function candleCycle(rand = Math.random) {
  const full = [{ ...CANDLE_TINT, size: NUM_LEDS }];
  const j = () => (rand() - 0.5) * 0.08;
  return [
    { at: 0,    payload: { on: true, fade_steps: 70, brightness: 0.30 + j(), groups: full } },
    { at: 900,  payload: { fade_steps: 60, brightness: 0.42 + j() } },
    { at: 1700, payload: { fade_steps: 50, brightness: 0.26 + j() } },
    { at: 2400, payload: { fade_steps: 60, brightness: 0.38 + j() } }
  ];
}
// Returns a stop function. Best-effort like the flashes: no lamps, no harm.
export function startCandleLights() {
  let stopped = false;
  let stopFn = null;
  runLoop(() => candleCycle(), CANDLE_PERIOD_MS, (stop) => { stopFn = stop; if (stopped) stop(); }).catch(() => {});
  return () => { stopped = true; if (stopFn) stopFn(); };
}

// Like runFlash, but open-ended: the cycle repeats every `periodMs` until
// the stop handed to `onReady` is called, which restores and disconnects.
async function runLoop(cycleFn, periodMs, onReady) {
  if (_busy) { onReady(() => {}); return; }
  _busy = true;
  try {
    await loadMqtt();
    await new Promise((resolve) => {
      const client = window.mqtt.connect(BROKER, {
        clientId: "gachafx_" + Math.random().toString(16).slice(2),
        clean: true,
        connectTimeout: 8000,
      });
      const captured = {};
      let running = false, done = false;
      let stepTimers = [], loopTimer = null;
      const finish = () => {
        if (done) return;
        done = true;
        try { client.end(true); } catch (_e) {}
        resolve();
      };
      const publish = (payload) => {
        payload.from = FROM_ID;
        try { client.publish(TOPIC, JSON.stringify(payload)); } catch (_e) {}
      };
      const playCycle = () => {
        for (const t of stepTimers) clearTimeout(t);
        stepTimers = [];
        for (const step of cycleFn()) stepTimers.push(setTimeout(() => publish({ ...step.payload }), step.at));
        loopTimer = setTimeout(playCycle, periodMs);
      };
      const stop = () => {
        clearTimeout(loopTimer);
        for (const t of stepTimers) clearTimeout(t);
        stepTimers = [];
        if (!running) { finish(); return; }
        running = false;
        for (const id of BOARD_IDS) {
          const state = captured[id] || captured[BOARD_IDS.find((b) => b !== id)];
          if (!state) continue;
          const base = { target: id, ..._restorePayload(state) };
          if (state.on === false) {
            publish({ ...base, on: true });
            setTimeout(() => publish({ target: id, on: false }), 1500);
          } else {
            publish({ ...base, on: true });
          }
        }
        setTimeout(finish, 2500);
      };
      client.on("connect", () => {
        client.subscribe(TOPIC, (err) => {
          if (err) { finish(); onReady(() => {}); return; }
          publish({ nudge: true });
          setTimeout(() => {
            if (done) return;
            if (!Object.keys(captured).length) { finish(); onReady(() => {}); return; }
            running = true;
            playCycle();
            onReady(stop);
          }, ECHO_WAIT_MS);
        });
      });
      client.on("message", (t, msg) => {
        try {
          const d = JSON.parse(msg.toString());
          if (d.from && BOARD_IDS.includes(d.from) && Array.isArray(d.groups) && !running) captured[d.from] = d;
        } catch (_e) {}
      });
      client.on("error", () => { if (!running) { finish(); onReady(() => {}); } });
      client.on("close", () => { if (!running) { finish(); onReady(() => {}); } });
    });
  } catch (_e) {
    onReady(() => {});
  } finally {
    _busy = false;
  }
}

// Connect, capture the lamps' state from their echoes, play the steps, put
// everything back. `target` limits the show (and the restore) to one lamp.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function runFlash(steps, totalMs, target) {
  // A targeted show (a reaction) right after a pull would find the pull's
  // show still running — wait for it rather than drop the reaction. The
  // pull show itself never waits: two pulls in a row is a replay.
  if (_busy && target) {
    const until = Date.now() + 25000;
    while (_busy && Date.now() < until) await sleep(500);
  }
  if (_busy) return;
  _busy = true;
  try {
    await loadMqtt();
    await new Promise((resolve, reject) => {
      const client = window.mqtt.connect(BROKER, {
        clientId: "gachafx_" + Math.random().toString(16).slice(2),
        clean: true,
        connectTimeout: 8000,
      });
      const captured = {};
      let flashed = false;
      let restoreTimer = null;
      let stepTimers = [];
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
        // A restore mid-show (page hidden) must also cancel the steps still
        // queued, or a spark would land on top of the restored state.
        for (const t of stepTimers) clearTimeout(t);
        stepTimers = [];
        if (!flashed) { finish(); return; }
        flashed = false;
        for (const id of (target ? [target] : BOARD_IDS)) {
          // A board whose echo got lost is restored from its partner's
          // snapshot — the two are normally in sync anyway, and the boss
          // re-syncs the follower within a minute regardless.
          const state = captured[id] || captured[BOARD_IDS.find((b) => b !== id)];
          if (!state) continue;
          // A lamp that was white when the show began, with a colour on
          // record, gets the colour back rather than the white: it had come
          // back from a reboot, not been asked for white.
          const memory = state.on !== false && isWhite(state) ? recallColour(id) : null;
          const base = memory ? restorePayload(id, memory) : { target: id, ..._restorePayload(state) };
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
            for (const step of steps) {
              stepTimers.push(setTimeout(() => publish(target ? { ...step.payload, target } : step.payload), step.at));
            }
            restoreTimer = setTimeout(restore, totalMs);
          }, ECHO_WAIT_MS);
        });
      });

      client.on("message", (t, msg) => {
        try {
          const d = JSON.parse(msg.toString());
          if (d.from && BOARD_IDS.includes(d.from) && Array.isArray(d.groups) && !flashed) {
            captured[d.from] = d;
            if (isColoured(d)) rememberColour(d.from, d);
          }
        } catch (_e) {}
      });

      client.on("error", () => { if (!flashed) finish(); });
      client.on("close", () => { if (!flashed) finish(); });
      setTimeout(() => reject(new Error("lights flash timed out")), totalMs + 20000);
    });
  } catch (_e) {
    /* best-effort: no lamps, no network, no problem */
  } finally {
    _busy = false;
  }
}
