// ── Lights pull-flash ─────────────────────────────────────────────────────────
// When a capsule is revealed, both linked_friend_lights lamps play a short
// show in the capsule's colour (~18 s) and then return to exactly the state
// they were in before.
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
// A show (pull flash, hug, candle) is tinting the lamps. Their echoes are not
// a colour anyone chose, so the Licht tab must not remember them.
export function isFxBusy() { return _busy; }

// Pinned: an unversioned URL follows every new major release of the library
// that drives the lamps. One load in flight at a time — two callers used to
// add two script tags.
let _mqttLoading = null;
export function loadMqtt() {
  if (window.mqtt) return Promise.resolve();
  if (_mqttLoading) return _mqttLoading;
  _mqttLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://unpkg.com/mqtt@5.16.0/dist/mqtt.min.js";
    s.onload = () => resolve();
    s.onerror = () => { _mqttLoading = null; s.remove(); reject(new Error("mqtt load failed")); };
    document.head.appendChild(s);
  });
  return _mqttLoading;
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

// ── Keine Wecker ─────────────────────────────────────────────────────────────
// The lamps don't wake anyone. Their alarm schedule is a retained list on the
// broker that every board re-reads on each connect and keeps in flash; a
// wake-up left on it (a 🌅 Rise set on the lights page, the app's old
// Sonnenaufgang) lights the lamp every morning. So on every app open — not
// only when the Licht tab happens to be opened — this reads the list and,
// if a wake-up is on it, publishes it without, both retained (for boards
// that are offline now) and as set_alarms (for those online). Bedtime fades
// stay. Touches nothing else; throttled, since the app opens often.
const ALARM_TOPIC = "picolight_lf26/alarms";
const WAKEUP_CHECK_KEY = "affektions-gacha:licht:wakeup-check";
export const WAKEUP_CHECK_EVERY_MS = 30 * 60000;
export function isWakeUpAlarm(a) {
  return !!a && typeof a === "object" && a.type !== "sunset";   // the firmware's own rule
}
export function clearWakeUpAlarms({ force = false } = {}) {
  try {
    const last = Number(window.localStorage.getItem(WAKEUP_CHECK_KEY) || 0);
    if (!force && Date.now() - last < WAKEUP_CHECK_EVERY_MS) return Promise.resolve(false);
  } catch (_e) {}
  return loadMqtt().then(() => new Promise((resolve) => {
    const client = window.mqtt.connect(BROKER, { clientId: "gachafx_" + Math.random().toString(16).slice(2), clean: true, connectTimeout: 8000, reconnectPeriod: 0 });
    let done = false, removed = 0;
    const finish = (checked) => {
      if (done) return;
      done = true;
      if (checked) { try { window.localStorage.setItem(WAKEUP_CHECK_KEY, String(Date.now())); } catch (_e) {} }
      try { client.end(); } catch (_e) {}
      resolve(removed > 0);
    };
    client.on("connect", () => {
      client.subscribe(ALARM_TOPIC, (err) => {
        if (err) { finish(false); return; }
        // Retained: it arrives at once. No list at all is also an answer.
        setTimeout(() => finish(true), 4000);
      });
    });
    client.on("message", (t, msg) => {
      if (String(t) !== ALARM_TOPIC) return;
      let list;
      try { list = JSON.parse(msg.toString()); } catch (_e) { finish(true); return; }
      if (!Array.isArray(list)) { finish(true); return; }
      const kept = list.filter((a) => a && typeof a === "object" && !isWakeUpAlarm(a));
      removed = list.length - kept.length;
      if (!removed) { finish(true); return; }
      try {
        client.publish(ALARM_TOPIC, JSON.stringify(kept), { retain: true, qos: 1 });
        client.publish(TOPIC, JSON.stringify({ set_alarms: kept, from: FROM_ID }), { qos: 1 });
      } catch (_e) { finish(false); return; }
      // qos 1 publishes go out before end() closes the socket gracefully.
      setTimeout(() => finish(true), 1500);
    });
    client.on("error", () => finish(false));
    client.on("close", () => finish(false));
    setTimeout(() => finish(false), 15000);
  })).catch(() => false);
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

// ── Shared show plumbing ─────────────────────────────────────────────────────
// Every show connects, nudges, captures each lamp's state from its echo, plays
// its steps and puts the captured state back. Three rules keep it from
// fighting anyone:
//  - It plays only on lamps that answered. A lamp whose echo was lost used to
//    get the show anyway and was then "restored" from the other lamp's state —
//    switched on, in the other lamp's colour.
//  - Its own messages carry `fx` (boards ignore unknown fields). Any other
//    command on the topic while it runs — the Licht tab, the lights page,
//    Fionn tapping Off — is a takeover: the show stops at once and leaves
//    that lamp as the person set it, instead of reverting it at the end.
//  - It restores what it captured, never an older colour from memory: white
//    that someone chose is white.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const COMMAND_FIELDS = ["on", "brightness", "groups", "fade_steps", "drift_enabled"];
const BUSY_WAIT_MS = 25000;

// Wait for another show to end — but never for a lit candle, which holds the
// lamps for as long as it burns. Returns false when they are still taken.
async function waitTurn() {
  const until = Date.now() + BUSY_WAIT_MS;
  while (_busy && !_looping && Date.now() < until) await sleep(400);
  return !_busy;
}

function openShow({ target = null, onCaptured, onTakeover }) {
  const fx = "gachafx_" + Math.random().toString(16).slice(2);
  const client = window.mqtt.connect(BROKER, { clientId: fx, clean: true, connectTimeout: 8000 });
  const captured = {};
  const skip = new Set();
  let capturing = true;
  const show = {
    client, captured, skip,
    // The lamps this show plays on: answered, and not taken over.
    boards() { return (target ? [target] : BOARD_IDS).filter((id) => captured[id] && !skip.has(id)); },
    publish(payload) {
      try { client.publish(TOPIC, JSON.stringify({ ...payload, from: FROM_ID, fx })); } catch (_e) {}
    },
    // Untargeted to both when both play; per lamp otherwise.
    send(payload) {
      const ids = show.boards();
      if (!ids.length) return;
      if (!target && ids.length === BOARD_IDS.length) show.publish(payload);
      else for (const id of ids) show.publish({ ...payload, target: id });
    },
    restore(ids) {
      for (const id of ids) {
        const state = captured[id];
        if (!state || skip.has(id)) continue;
        const base = { target: id, ..._restorePayload(state) };
        show.publish({ ...base, on: true });
        // Firmware ignores colour while off: colour on, then power back down
        // once the fade has landed.
        if (state.on === false) setTimeout(() => show.publish({ target: id, on: false }), 1500);
      }
    },
    stopCapturing() { capturing = false; }
  };
  client.on("message", (_t, msg) => {
    let d;
    try { d = JSON.parse(msg.toString()); } catch (_e) { return; }
    if (!d || typeof d !== "object") return;
    if (d.from && BOARD_IDS.includes(d.from) && Array.isArray(d.groups)) {
      if (capturing) { captured[d.from] = d; if (onCaptured) onCaptured(d.from); }
      return;
    }
    if (capturing || d.fx === fx || d.from === undefined || BOARD_IDS.includes(d.from)) return;
    if (!COMMAND_FIELDS.some((k) => d[k] !== undefined)) return;   // a ping or nudge
    const hit = d.target ? [d.target] : BOARD_IDS;
    let changed = false;
    for (const id of hit) if (BOARD_IDS.includes(id) && !skip.has(id)) { skip.add(id); changed = true; }
    if (changed && onTakeover) onTakeover();
  });
  return show;
}

// Like runFlash, but open-ended: the cycle repeats every `periodMs` until
// the stop handed to `onReady` is called, which restores and disconnects.
let _looping = false;
async function runLoop(cycleFn, periodMs, onReady) {
  // The candle used to give up silently when a pull flash or a hug was still
  // playing — the veil on screen, nothing on the lamps.
  if (!(await waitTurn())) { onReady(() => {}); return; }
  _busy = true;
  _looping = true;
  try {
    await loadMqtt();
    await new Promise((resolve) => {
      let running = false, done = false;
      let stepTimers = [], loopTimer = null;
      const finish = () => {
        if (done) return;
        done = true;
        try { show.client.end(); } catch (_e) {}
        resolve();
      };
      const halt = () => {
        clearTimeout(loopTimer);
        for (const t of stepTimers) clearTimeout(t);
        stepTimers = [];
      };
      const show = openShow({
        onTakeover: () => { if (running && !show.boards().length) { halt(); running = false; setTimeout(finish, 500); } }
      });
      const playCycle = () => {
        halt();
        if (!show.boards().length) return;
        for (const step of cycleFn()) stepTimers.push(setTimeout(() => show.send({ ...step.payload }), step.at));
        loopTimer = setTimeout(playCycle, periodMs);
      };
      const stop = () => {
        halt();
        if (!running) { finish(); return; }
        running = false;
        show.restore(BOARD_IDS);
        setTimeout(finish, 2500);
      };
      show.client.on("connect", () => {
        show.client.subscribe(TOPIC, (err) => {
          if (err) { finish(); onReady(() => {}); return; }
          show.publish({ nudge: true });
          setTimeout(() => {
            if (done) return;
            show.stopCapturing();
            if (!show.boards().length) { finish(); onReady(() => {}); return; }
            running = true;
            playCycle();
            onReady(stop);
          }, ECHO_WAIT_MS);
        });
      });
      show.client.on("error", () => { if (!running) { finish(); onReady(() => {}); } });
      show.client.on("close", () => { if (!running) { finish(); onReady(() => {}); } });
    });
  } catch (_e) {
    onReady(() => {});
  } finally {
    _busy = false;
    _looping = false;
  }
}

// Connect, capture the lamps' state from their echoes, play the steps, put
// everything back. `target` limits the show (and the restore) to one lamp.
async function runFlash(steps, totalMs, target) {
  // Another show still playing (a pull right after a hug, a reaction right
  // after a pull): wait for it rather than drop this one.
  if (!(await waitTurn())) return;
  _busy = true;
  try {
    await loadMqtt();
    await new Promise((resolve, reject) => {
      let flashed = false, done = false;
      let restoreTimer = null, stepTimers = [];
      const finish = () => {
        if (done) return;
        done = true;
        document.removeEventListener("visibilitychange", onHide);
        try { show.client.end(); } catch (_e) {}
        resolve();
      };
      const halt = () => {
        clearTimeout(restoreTimer);
        for (const t of stepTimers) clearTimeout(t);
        stepTimers = [];
      };
      const restore = () => {
        // A restore mid-show (page hidden, takeover) also cancels the steps
        // still queued, or a spark would land on top of the restored state.
        halt();
        if (!flashed) { finish(); return; }
        flashed = false;
        show.restore(target ? [target] : BOARD_IDS);
        // Give the trailing power-off publishes time to leave, then close.
        setTimeout(finish, 2500);
      };
      const show = openShow({
        target,
        // Someone took a lamp over: put back the ones still playing, now.
        onTakeover: () => { if (flashed) restore(); }
      });
      // If the page is backgrounded mid-flash, restore immediately — an
      // interrupted timer must never strand the lamps in the show colour.
      const onHide = () => {
        if (document.visibilityState === "hidden" && flashed) restore();
      };
      document.addEventListener("visibilitychange", onHide);

      show.client.on("connect", () => {
        show.client.subscribe(TOPIC, (err) => {
          if (err) { finish(); return; }
          // No recognised fields — boards change nothing but echo their
          // full current state back.
          show.publish({ nudge: true });
          setTimeout(() => {
            if (done) return;
            show.stopCapturing();
            if (!show.boards().length) { finish(); return; }
            flashed = true;
            for (const step of steps) stepTimers.push(setTimeout(() => show.send({ ...step.payload }), step.at));
            restoreTimer = setTimeout(restore, totalMs);
          }, ECHO_WAIT_MS);
        });
      });
      show.client.on("error", () => { if (!flashed) finish(); });
      show.client.on("close", () => { if (!flashed) finish(); });
      setTimeout(() => reject(new Error("lights flash timed out")), totalMs + 20000);
    });
  } catch (_e) {
    /* best-effort: no lamps, no network, no problem */
  } finally {
    _busy = false;
  }
}
