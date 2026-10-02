// ── Licht: the lamps, inside the app ─────────────────────────────────────────
// The two linked_friend_lights lamps used to live behind a link to a separate
// page (lichter.html, vendored from the lights repo). The everyday part of
// that page — is it on, how bright, which colour, a mood, a saved scene —
// is now a tab of its own here, on the same glass as everything else. The
// full page stays one tap away for the rare things: alarms, groups, Wi-Fi,
// reboot.
//
// Protocol, same as lightsFx.js: MQTT over WebSocket, one topic, boards echo
// their complete state to any non-board sender. Status is a retained
// last-will per board. Scenes are a retained shared library the lights page
// writes; this tab only reads and plays them.
//
// Everything here is best-effort: no broker, no lamps, no problem — the tab
// says so and nothing else in the app notices.
import { mount, $ } from "./state.js";
import { showToast } from "./toast.js";
import { haptic } from "./haptic.js";
import { loadMqtt } from "./lightsFx.js";
import { escapeHtml as esc } from "./utils.js";

export const BROKER = "wss://broker.hivemq.com:8884/mqtt";
export const PREFIX = "picolight_lf26";
export const NUM_LEDS = 10;
export const BOARDS = [
  { id: "board_a", name: "Fionns Lampe", owner: "Fionn", short: "FF" },
  { id: "board_b", name: "Lennarts Lampe", owner: "Lennart", short: "LS" }
];
const FROM_ID = "web_app";
const HOLD_MS = 1500;      // ignore echoes this long after a local change
const STALE_MS = 150000;   // no echo for this long + no retained online → offline

// The firmware's 30-entry tint palette, index/29 = pos. Ported from the lights
// page so the strip preview and the palette bar show what the lamp shows.
export const PALETTE = [
  [255,200,80],[255,160,0],[255,120,0],[255,60,0],
  [255,0,0],[255,0,60],[255,0,140],[200,0,200],
  [140,0,255],[80,0,255],[0,0,255],[0,60,255],
  [0,140,255],[0,200,255],[0,255,220],[0,255,160],
  [0,255,80],[0,220,0],[80,255,0],[160,255,0],
  [220,255,0],[255,240,0],[255,180,40],[255,100,80],
  [255,80,160],[180,40,255],[40,100,255],[0,180,180],
  [20,255,120],[255,220,120],
];
const lerp = (a, b, t) => a + (b - a) * t;
// Vivid tint for a palette position (what a group shows at w = 0).
export function paletteRgb(pos) {
  const p = Math.min(Math.max(Number(pos) || 0, 0), 0.9999);
  const scaled = p * (PALETTE.length - 1);
  const idx = Math.floor(scaled), frac = scaled - idx;
  const c1 = PALETTE[idx], c2 = PALETTE[Math.min(idx + 1, PALETTE.length - 1)];
  return [0, 1, 2].map((i) => Math.round(lerp(c1[i], c2[i], frac)));
}
// What a group looks like with its white level mixed in.
export function groupRgb(g) {
  const [r, gg, b] = paletteRgb(g.pos);
  const w = Math.min(Math.max(Number(g.w) || 0, 0), 1);
  return [Math.round(lerp(r, 255, w)), Math.round(lerp(gg, 244, w)), Math.round(lerp(b, 225, w))];
}

// ── Payloads ─────────────────────────────────────────────────────────────────
export function stripGroups(pos, w = 0) {
  return [{ pos, w, size: NUM_LEDS }];
}
// Quick moods. Group sizes always sum to NUM_LEDS — the firmware expects it.
export const MOODS = [
  { id: "warm",  label: "Warm",     emoji: "🕯", brightness: 0.55, groups: [{ pos: 0, w: 0.75, size: NUM_LEDS }] },
  { id: "weiss", label: "Weiß",     emoji: "💡", brightness: 0.8,  groups: [{ pos: 0, w: 1.0, size: NUM_LEDS }] },
  { id: "wald",  label: "Wald",     emoji: "🌿", brightness: 0.7,  groups: [{ pos: 17 / 29, w: 0, size: NUM_LEDS }] },
  { id: "gold",  label: "Gold",     emoji: "✨", brightness: 0.8,  groups: [{ pos: 0, w: 0, size: 5 }, { pos: 29 / 29, w: 0, size: 5 }] },
  { id: "abend", label: "Abendrot", emoji: "🌇", brightness: 0.65, groups: [{ pos: 2 / 29, w: 0, size: 4 }, { pos: 23 / 29, w: 0, size: 3 }, { pos: 24 / 29, w: 0, size: 3 }] },
  { id: "meer",  label: "Meer",     emoji: "🌊", brightness: 0.6,  groups: [{ pos: 13 / 29, w: 0, size: 5 }, { pos: 27 / 29, w: 0.2, size: 5 }] },
  { id: "nacht", label: "Nacht",    emoji: "🌙", brightness: 0.18, groups: [{ pos: 10 / 29, w: 0, size: NUM_LEDS }] }
];
export function moodPayload(mood) {
  return { on: true, fade_steps: 40, brightness: mood.brightness, groups: mood.groups.map((g) => ({ ...g })) };
}
// A scene as the lights page saves it: groups when present, otherwise rebuilt
// from positions + boundaries the way that page does.
export function scenePayload(scene) {
  let groups = Array.isArray(scene.groups) && scene.groups.length ? scene.groups : null;
  if (!groups && Array.isArray(scene.groupPositions)) {
    const splits = [0, ...(scene.boundaries || []).slice().sort((a, b) => a - b), NUM_LEDS];
    groups = splits.slice(0, -1).map((start, i) => ({
      pos: scene.groupPositions[i] ?? 0,
      w: (scene.groupWLevels || [])[i] ?? 1,
      size: splits[i + 1] - start
    }));
  }
  if (!groups) groups = stripGroups(0, 1);
  return {
    on: scene.on !== false,
    brightness: typeof scene.brightness === "number" ? scene.brightness : 0.6,
    fade_steps: typeof scene.fadeSteps === "number" ? scene.fadeSteps : 60,
    groups: groups.map((g) => ({ pos: Number(g.pos) || 0, w: Number(g.w) || 0, size: Math.max(1, Number(g.size) || 1) }))
  };
}
// Three green pulses on one lamp, then back to what it was. Pure timeline so
// a test can check it; "restore" is whatever the lamp last echoed.
export function winkSteps(restore) {
  const green = { on: true, brightness: 1.0, fade_steps: 6, groups: stripGroups(17 / 29, 0) };
  const steps = [
    { at: 0, payload: green },
    { at: 450, payload: { brightness: 0.12, fade_steps: 6 } },
    { at: 900, payload: { brightness: 1.0, fade_steps: 6 } },
    { at: 1350, payload: { brightness: 0.12, fade_steps: 6 } },
    { at: 1800, payload: { brightness: 1.0, fade_steps: 6 } }
  ];
  if (restore) {
    steps.push({ at: 2700, payload: { on: true, groups: restore.groups, brightness: restore.brightness, fade_steps: restore.fade_steps } });
    if (restore.on === false) steps.push({ at: 4200, payload: { on: false } });
  } else {
    steps.push({ at: 2700, payload: { on: false } });
  }
  return steps;
}

// ── Connection + state ───────────────────────────────────────────────────────
let client = null;
let connecting = null;
let generation = 0;        // bumped on every disconnect so a dead client's events are ignored
let connectedAt = 0;
let lastError = "";
let nudgeTimer = null;
let holdUntil = 0;
const lamps = {};          // id → { online, on, brightness, fade_steps, groups, seenAt }
let scenes = [];
let alarms = [];           // the lamps' alarm list, as the lights page keeps it (retained)
let deletedScenes = [];    // tombstones the lights page sent; republished with ours
let sendTarget = "";       // "" = both, else a board id
let conn = "idle";         // idle | connecting | connected | error

function topicEvents() { return `${PREFIX}/events`; }
function topicStatus() { return `${PREFIX}/status/+`; }
function topicScenes() { return `${PREFIX}/scenes`; }
function topicAlarms() { return `${PREFIX}/alarms`; }

export function lampOnline(id, now = Date.now()) {
  const l = lamps[id];
  if (!l) return false;
  if (l.online === false) return false;
  if (l.online === true) return true;
  return !!(l.seenAt && now - l.seenAt < STALE_MS);
}
// The strip we draw: whichever lamp spoke last.
function anyLamp() {
  return Object.values(lamps).filter((l) => l.groups).sort((a, b) => (b.seenAt || 0) - (a.seenAt || 0))[0] || null;
}

function setConn(next) {
  conn = next;
  renderLichtPanel();
}

// One client at a time. A generation counter guards every handler: after a
// disconnect (tap on the status, app backgrounded) a late event from the old
// socket must not flip the state of the new one. The promise only covers the
// first attempt; after that MQTT.js keeps retrying by itself and the handlers
// keep the label honest. The first version of this could get stuck: a
// handshake that only ever emitted "close" never settled the promise, so a
// retry tap found "already connecting" and did nothing, forever.
function connect() {
  if (client && client.connected) { setConn("connected"); return Promise.resolve(client); }
  if (connecting) return connecting;
  const gen = ++generation;
  setConn("connecting");
  connecting = loadMqtt().then(() => new Promise((resolve, reject) => {
    const c = window.mqtt.connect(BROKER, {
      clientId: "gacha_licht_" + Math.random().toString(16).slice(2),
      clean: true, connectTimeout: 10000, reconnectPeriod: 4000, keepalive: 30
    });
    client = c;
    const mine = () => gen === generation && client === c;
    let settled = false;
    const settle = (ok) => {
      if (settled) return;
      settled = true;
      if (ok) resolve(c); else reject(new Error(lastError || "licht: no connection"));
    };
    c.on("connect", () => {
      if (!mine()) return;
      connectedAt = Date.now();
      lastError = "";
      c.subscribe([topicEvents(), topicStatus(), topicScenes(), topicAlarms()], () => {});
      // Boards change nothing on an unknown field, but echo their whole
      // state back — the fastest way to know what the room looks like.
      publishRaw({ nudge: true });
      setConn("connected");
      settle(true);
    });
    c.on("message", (t, m) => { if (mine()) onMessage(t, m); });
    c.on("reconnect", () => { if (mine() && conn !== "connected") setConn("connecting"); });
    c.on("offline", () => { if (mine()) setConn("error"); });
    c.on("error", (err) => { if (!mine()) return; lastError = (err && err.message) || "error"; setConn("error"); });
    c.on("close", () => { if (mine()) setConn("error"); });
    // Don't hang the first attempt forever; MQTT.js carries on retrying.
    setTimeout(() => settle(!!(c.connected)), 15000);
  })).catch((err) => {
    if (gen === generation) { lastError = (err && err.message) || "load"; setConn("error"); }
    throw err;
  }).finally(() => { if (gen === generation) connecting = null; });
  return connecting;
}

export function disconnectLicht() {
  generation++;
  connecting = null;
  if (client) { try { client.end(true); } catch (_e) {} }
  client = null; conn = "idle"; connectedAt = 0;
  if (nudgeTimer) { clearInterval(nudgeTimer); nudgeTimer = null; }
  renderLichtPanel();
}

// Every minute while the tab is open: a ping the boards answer with a
// heartbeat (keeps "online" honest) and a repaint for the stale timers.
function startNudging() {
  if (nudgeTimer) return;
  nudgeTimer = setInterval(() => {
    if (client && client.connected) publishRaw({ ping: true });
    renderLichtPanel();
  }, 60000);
}

function onMessage(topic, msg) {
  let d;
  try { d = JSON.parse(msg.toString()); } catch (_e) { return; }
  const t = String(topic);
  if (t.startsWith(`${PREFIX}/status/`)) {
    const id = t.split("/").pop();
    lamps[id] = { ...(lamps[id] || {}), online: !!d.online };
    if (d.online) lamps[id].seenAt = Date.now();
    renderLichtPanel();
    return;
  }
  if (t === topicAlarms()) {
    if (Array.isArray(d)) alarms = d.filter((a) => a && typeof a === "object");
    renderLichtPanel();
    return;
  }
  if (t === topicScenes()) {
    const list = Array.isArray(d.scenes) ? d.scenes : [];
    deletedScenes = (Array.isArray(d.deleted) ? d.deleted : []).filter((x) => typeof x === "string").slice(-50);
    const dead = new Set(deletedScenes);
    scenes = list.filter((s) => s && typeof s === "object" && s.name && !dead.has(s.id));
    renderLichtPanel();
    return;
  }
  if (!d.from || !BOARDS.some((b) => b.id === d.from)) return;
  const l = lamps[d.from] = { ...(lamps[d.from] || {}), seenAt: Date.now() };
  if (Date.now() < holdUntil) { renderLichtPanel(); return; }
  if (d.on !== undefined) l.on = !!d.on;
  if (typeof d.brightness === "number") l.brightness = d.brightness;
  if (typeof d.fade_steps === "number") l.fade_steps = d.fade_steps;
  if (Array.isArray(d.groups)) l.groups = d.groups;
  renderLichtPanel();
}

function publishRaw(payload) {
  if (!client || !client.connected) return false;
  try { client.publish(topicEvents(), JSON.stringify({ ...payload, from: FROM_ID })); return true; } catch (_e) { return false; }
}

// A user change: mirror locally at once (the echo confirms a beat later),
// hold incoming echoes briefly so a slider doesn't fight its own lamp.
function send(payload, target = sendTarget || null) {
  holdUntil = Date.now() + HOLD_MS;
  const ids = target ? [target] : BOARDS.map((b) => b.id);
  for (const id of ids) {
    const l = lamps[id] = { ...(lamps[id] || {}) };
    if (payload.on !== undefined) l.on = !!payload.on;
    if (typeof payload.brightness === "number") l.brightness = payload.brightness;
    if (typeof payload.fade_steps === "number") l.fade_steps = payload.fade_steps;
    if (Array.isArray(payload.groups)) l.groups = payload.groups;
  }
  const ok = publishRaw(target ? { ...payload, target } : payload);
  if (!ok) showToast("Keine Verbindung zu den Lampen");
  renderLichtPanel();
  return ok;
}

// ── Actions ──────────────────────────────────────────────────────────────────
function anyOn() { return BOARDS.some((b) => lamps[b.id] && lamps[b.id].on); }

export function setPower(on) { send({ on: !!on }); haptic(8); }
export function setBrightness(v) { send({ brightness: Math.min(1, Math.max(0.02, v)) }); }
export function setColour(pos, w = 0) { send({ on: true, fade_steps: 30, groups: stripGroups(pos, w) }); haptic(6); }
export function playMood(mood) { send(moodPayload(mood)); haptic([8, 20, 8]); showToast(`${mood.emoji} ${mood.label}`); }
export function playScene(scene) { send(scenePayload(scene)); haptic([8, 20, 8]); showToast(`✓ ${scene.name}`); }
export function setFade(steps) { send({ fade_steps: Math.round(Math.min(600, Math.max(10, steps))) }); }
export function setTarget(id) { sendTarget = BOARDS.some((b) => b.id === id) ? id : ""; renderLichtPanel(); }
export function toggleLamp(id) {
  const l = lamps[id];
  const isOn = !!(l && l.on !== false);
  send({ on: !isOn }, id);
  haptic(8);
}

// Two to four groups of random tints, sizes summing to the strip. Pure, so a
// test can check the sum; the RNG is injectable for the same reason.
export function randomGroups(rand = Math.random) {
  const n = 2 + Math.floor(rand() * 3);
  const cuts = new Set();
  while (cuts.size < n - 1) cuts.add(1 + Math.floor(rand() * (NUM_LEDS - 1)));
  const splits = [0, ...[...cuts].sort((a, b) => a - b), NUM_LEDS];
  return splits.slice(0, -1).map((start, i) => ({
    pos: Math.round(rand() * 29) / 29, w: rand() < 0.2 ? Math.round(rand() * 60) / 100 : 0, size: splits[i + 1] - start
  }));
}
export function playRandom() { send({ on: true, fade_steps: 40, groups: randomGroups() }); haptic([6, 20, 6]); }

// A scene as the lights page stores it, from whatever a lamp last echoed.
export function sceneFromLamp(name, lamp, now = Date.now()) {
  const groups = (lamp && Array.isArray(lamp.groups) && lamp.groups.length ? lamp.groups : stripGroups(0, 1))
    .map((g) => ({ pos: Number(g.pos) || 0, w: Number(g.w) || 0, size: Math.max(1, Math.round(Number(g.size) || 1)) }));
  const boundaries = [];
  let cursor = 0;
  for (const g of groups.slice(0, -1)) { cursor += g.size; if (cursor > 0 && cursor < NUM_LEDS) boundaries.push(cursor); }
  return {
    id: now.toString(36) + "-" + Math.random().toString(36).slice(2, 8), updated: now, name,
    groups, boundaries,
    groupPositions: groups.map((g) => g.pos), groupWLevels: groups.map((g) => g.w),
    brightness: lamp && typeof lamp.brightness === "number" ? lamp.brightness : 0.6,
    fadeSteps: lamp && typeof lamp.fade_steps === "number" ? lamp.fade_steps : 60,
    on: !(lamp && lamp.on === false)
  };
}
// Shared library: the retained scenes topic, same merge rules as the lights
// page (by id, newer updated wins, tombstones travel along). From a different
// sender id than the lights page uses, or it would drop our copy as its own.
export function saveScene(name) {
  const clean = String(name || "").trim().slice(0, 32);
  if (!clean) { showToast("Der Szene fehlt ein Name"); return false; }
  if (!client || !client.connected) { showToast("Keine Verbindung zu den Lampen"); return false; }
  const scene = sceneFromLamp(clean, anyLamp());
  scenes = [...scenes.filter((s) => s.name !== clean), scene];
  try {
    client.publish(topicScenes(), JSON.stringify({ v: 1, from: "gacha_app", scenes, deleted: deletedScenes }), { retain: true, qos: 1 });
  } catch (_e) { showToast("Szene konnte nicht gesichert werden"); return false; }
  haptic([8, 20, 8]);
  showToast(`✓ „${clean}“ gesichert — auch auf der grossen Seite`);
  renderLichtPanel();
  return true;
}

let winkTimers = [];
export function wink(boardId = "board_a") {
  const board = BOARDS.find((b) => b.id === boardId);
  if (!lampOnline(boardId)) { showToast(`${board ? board.name : "Die Lampe"} ist gerade nicht erreichbar`); return false; }
  const snap = lamps[boardId] && lamps[boardId].groups ? { ...lamps[boardId] } : null;
  for (const t of winkTimers) clearTimeout(t);
  winkTimers = [];
  holdUntil = Date.now() + 5000;
  for (const step of winkSteps(snap)) {
    winkTimers.push(setTimeout(() => publishRaw({ ...step.payload, target: boardId }), step.at));
  }
  haptic([12, 40, 12, 40, 12]);
  showToast(`👋 ${board ? board.name : "Lampe"} winkt`);
  return true;
}

// ── Lampen-Morsen ────────────────────────────────────────────────────────────
// A rhythm tapped on the pad, played back as brightness pulses on one lamp,
// then the lamp goes back to what it was. taps are ms offsets from the first.
export const MORSE_MAX_TAPS = 14;
export const MORSE_PULSE_MS = 110;
export function morseSteps(taps, restore) {
  const t = (Array.isArray(taps) ? taps : []).map((x) => Math.max(0, Number(x) || 0)).slice(0, MORSE_MAX_TAPS);
  const steps = [];
  const hi = { on: true, brightness: 1.0, fade_steps: 1 };
  const lo = { brightness: 0.06, fade_steps: 1 };
  if (restore && restore.groups) hi.groups = restore.groups;
  for (const at of t) {
    steps.push({ at, payload: hi });
    steps.push({ at: at + MORSE_PULSE_MS, payload: lo });
  }
  const end = (t.length ? t[t.length - 1] : 0) + MORSE_PULSE_MS + 700;
  if (restore && restore.groups) {
    steps.push({ at: end, payload: { on: true, groups: restore.groups, brightness: restore.brightness, fade_steps: restore.fade_steps } });
    if (restore.on === false) steps.push({ at: end + 1200, payload: { on: false } });
  } else {
    steps.push({ at: end, payload: { on: false } });
  }
  return steps;
}
let morseTimers = [];
export function sendMorse(taps, boardId = "board_a") {
  const board = BOARDS.find((b) => b.id === boardId);
  if (!taps || !taps.length) return false;
  if (!lampOnline(boardId)) { showToast(`${board ? board.name : "Die Lampe"} ist gerade nicht erreichbar`); return false; }
  const snap = lamps[boardId] && lamps[boardId].groups ? { ...lamps[boardId] } : null;
  for (const t of morseTimers) clearTimeout(t);
  morseTimers = [];
  const steps = morseSteps(taps, snap);
  holdUntil = Date.now() + steps[steps.length - 1].at + 500;
  for (const step of steps) morseTimers.push(setTimeout(() => publishRaw({ ...step.payload, target: boardId }), step.at));
  haptic(taps.map(() => 18));
  showToast(`🥁 ${taps.length} ${taps.length === 1 ? "Schlag" : "Schläge"} unterwegs zu ${board ? board.name : "der Lampe"}`);
  return true;
}

// ── Pulsschlag ───────────────────────────────────────────────────────────────
// Press and hold a lamp pill: both lamps beat at a resting pulse for as long
// as the finger stays. Nothing is stored, nothing is sent after; the lamps
// go back to what they were on release. One cycle, repeated every second.
export const PULSE_PERIOD_MS = 1000;
export function heartbeatCycle() {
  return [
    { at: 0,   payload: { on: true, brightness: 1.0,  fade_steps: 4 } },
    { at: 180, payload: { brightness: 0.3,  fade_steps: 6 } },
    { at: 320, payload: { brightness: 0.85, fade_steps: 4 } },
    { at: 520, payload: { brightness: 0.22, fade_steps: 10 } }
  ];
}
let pulseInterval = null, pulseTimers = [], pulseSnap = null;
export function startPulse() {
  if (pulseInterval) return false;
  if (!client || !client.connected) { showToast("Keine Verbindung zu den Lampen"); return false; }
  pulseSnap = {};
  for (const b of BOARDS) if (lamps[b.id] && lamps[b.id].groups) pulseSnap[b.id] = { ...lamps[b.id] };
  const beat = () => {
    holdUntil = Date.now() + PULSE_PERIOD_MS + HOLD_MS;
    for (const step of heartbeatCycle()) pulseTimers.push(setTimeout(() => publishRaw(step.payload), step.at));
  };
  beat();
  pulseInterval = setInterval(beat, PULSE_PERIOD_MS);
  haptic([20, 120, 20]);
  if (mount) mount.classList.add("is-pulsing");
  return true;
}
export function stopPulse() {
  if (!pulseInterval) return;
  clearInterval(pulseInterval); pulseInterval = null;
  for (const t of pulseTimers) clearTimeout(t);
  pulseTimers = [];
  for (const b of BOARDS) {
    const s = pulseSnap && pulseSnap[b.id];
    if (!s) continue;
    publishRaw({ target: b.id, on: true, groups: s.groups, brightness: s.brightness, fade_steps: s.fade_steps });
    if (s.on === false) setTimeout(() => publishRaw({ target: b.id, on: false }), 1500);
  }
  pulseSnap = null;
  holdUntil = Date.now() + 2500;
  if (mount) mount.classList.remove("is-pulsing");
}

// ── Sonnenaufgang ────────────────────────────────────────────────────────────
// The firmware has alarms: a "sunrise" fades from deep red to warm white over
// duration_min, on the boards listed, on the days listed (Monday = 0). The
// lights page keeps the list on a retained topic; this manages exactly one
// entry in it, tagged gacha:"sunrise", and leaves every other alarm alone.
export const SUNRISE_DAYS = { werktags: [0, 1, 2, 3, 4], taeglich: [0, 1, 2, 3, 4, 5, 6], wochenende: [5, 6] };
export function localToUtc(lh, lm, now = new Date()) {
  const d = new Date(now); d.setHours(lh, lm, 0, 0);
  return [d.getUTCHours(), d.getUTCMinutes()];
}
export function sunriseAlarm(list, { time = "07:00", days = "werktags", boards, enabled = true, durationMin = 20 } = {}) {
  const [lh, lm] = String(time).split(":").map((x) => parseInt(x, 10));
  const [uh, um] = localToUtc(Number.isInteger(lh) ? lh : 7, Number.isInteger(lm) ? lm : 0);
  const others = (Array.isArray(list) ? list : []).filter((a) => !(a && a.gacha === "sunrise"));
  const mine = {
    gacha: "sunrise", enabled: !!enabled, type: "sunrise",
    hour: uh, minute: um, lh: Number.isInteger(lh) ? lh : 7, lm: Number.isInteger(lm) ? lm : 0,
    duration_min: durationMin, brightness: 0.9,
    days: SUNRISE_DAYS[days] || SUNRISE_DAYS.werktags,
    boards: Array.isArray(boards) && boards.length ? boards : BOARDS.map((b) => b.id)
  };
  return [...others, mine];
}
export function findSunrise(list) {
  return (Array.isArray(list) ? list : []).find((a) => a && a.gacha === "sunrise") || null;
}
export function daysPreset(days) {
  const key = JSON.stringify((days || []).slice().sort());
  for (const [name, list] of Object.entries(SUNRISE_DAYS)) if (JSON.stringify(list) === key) return name;
  return "werktags";
}
function publishAlarms(list) {
  if (!client || !client.connected) { showToast("Keine Verbindung zu den Lampen"); return false; }
  try {
    client.publish(topicAlarms(), JSON.stringify(list), { retain: true, qos: 1 });
    publishRaw({ set_alarms: list });
  } catch (_e) { showToast("Wecker konnte nicht gestellt werden"); return false; }
  alarms = list;
  return true;
}
export function setSunrise({ enabled, time, days } = {}) {
  const cur = findSunrise(alarms) || {};
  const next = sunriseAlarm(alarms, {
    time: time || (Number.isInteger(cur.lh) ? `${String(cur.lh).padStart(2, "0")}:${String(cur.lm || 0).padStart(2, "0")}` : "07:00"),
    days: days || daysPreset(cur.days),
    boards: sendTarget ? [sendTarget] : BOARDS.map((b) => b.id),
    enabled: enabled === undefined ? cur.enabled !== false : enabled
  });
  if (!publishAlarms(next)) return false;
  const mine = findSunrise(next);
  haptic([8, 20, 8]);
  showToast(mine.enabled ? `🌅 Sonnenaufgang um ${String(mine.lh).padStart(2, "0")}:${String(mine.lm).padStart(2, "0")} gestellt` : "🌅 Sonnenaufgang aus");
  renderLichtPanel();
  return true;
}

// ── Panel ────────────────────────────────────────────────────────────────────
let bound = false;
let brightnessTimer = null;

export function openLicht() {
  renderLichtPanel();
  bindLichtPanel();
  connect().catch(() => {});
  startNudging();
}

function bindLichtPanel() {
  if (bound || !mount) return;
  bound = true;
  const power = $("[data-ag-licht-power]");
  if (power) power.addEventListener("click", () => setPower(!anyOn()));
  const slider = $("[data-ag-licht-brightness]");
  if (slider) {
    slider.addEventListener("input", () => {
      holdUntil = Date.now() + HOLD_MS;
      clearTimeout(brightnessTimer);
      brightnessTimer = setTimeout(() => setBrightness(Number(slider.value) / 100), 120);
    });
  }
  const palette = $("[data-ag-licht-palette]");
  if (palette) {
    const pick = (e) => {
      const r = palette.getBoundingClientRect();
      if (!r.width) return;
      const x = (e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - r.left;
      setColour(Math.min(1, Math.max(0, x / r.width)), 0);
    };
    let dragging = false, lastPick = 0;
    palette.addEventListener("pointerdown", (e) => {
      dragging = true;
      try { palette.setPointerCapture(e.pointerId); } catch (_e) {}
      pick(e); lastPick = Date.now();
    });
    palette.addEventListener("pointermove", (e) => {
      if (!dragging || Date.now() - lastPick < 110) return;
      lastPick = Date.now(); pick(e);
    });
    const stop = () => { dragging = false; };
    palette.addEventListener("pointerup", stop);
    palette.addEventListener("pointercancel", stop);
    palette.addEventListener("keydown", (e) => {
      const cur = Number(palette.dataset.pos || 0);
      if (e.key === "ArrowRight") { e.preventDefault(); setColour(Math.min(1, cur + 1 / 29)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setColour(Math.max(0, cur - 1 / 29)); }
    });
  }
  const moods = $("[data-ag-licht-moods]");
  if (moods) {
    moods.innerHTML = "";
    for (const m of MOODS) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ag-licht-mood";
      b.dataset.mood = m.id;
      const [r, g, bl] = groupRgb(m.groups[0]);
      b.style.setProperty("--ag-mood", `rgb(${r},${g},${bl})`);
      b.innerHTML = `<span class="ag-licht-mood-dot" aria-hidden="true"></span><span>${m.emoji} ${m.label}</span>`;
      b.addEventListener("click", () => playMood(m));
      moods.appendChild(b);
    }
  }
  const sceneList = $("[data-ag-licht-scene-list]");
  if (sceneList) {
    sceneList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-scene]");
      if (!btn) return;
      const scene = scenes.find((s) => s.id === btn.dataset.scene);
      if (scene) playScene(scene);
    });
  }
  const winkBtn = $("[data-ag-licht-wink]");
  if (winkBtn) winkBtn.addEventListener("click", () => wink("board_a"));
  const target = $("[data-ag-licht-target]");
  if (target) target.addEventListener("click", (e) => {
    const b = e.target.closest("[data-target]");
    if (b) { setTarget(b.dataset.target); haptic(6); }
  });
  // A lamp pill: tap toggles that lamp, press and hold beats both.
  const lampsEl = $("[data-ag-licht-lamps]");
  if (lampsEl) {
    let pressTimer = null, pulsed = false, pressed = null;
    const endPress = (e) => {
      clearTimeout(pressTimer); pressTimer = null;
      if (pulsed) { stopPulse(); pulsed = false; }
      else if (pressed && conn === "connected") toggleLamp(pressed);
      pressed = null;
    };
    lampsEl.addEventListener("pointerdown", (e) => {
      const b = e.target.closest("[data-lamp]");
      if (!b || conn !== "connected") return;
      e.preventDefault();
      pressed = b.dataset.lamp; pulsed = false;
      try { b.setPointerCapture(e.pointerId); } catch (_e) {}
      pressTimer = setTimeout(() => { pulsed = startPulse(); }, 450);
    });
    lampsEl.addEventListener("pointerup", endPress);
    lampsEl.addEventListener("pointercancel", () => { clearTimeout(pressTimer); pressTimer = null; if (pulsed) { stopPulse(); pulsed = false; } pressed = null; });
  }
  const fade = $("[data-ag-licht-fade]");
  let fadeTimer = null;
  if (fade) fade.addEventListener("input", () => {
    holdUntil = Date.now() + HOLD_MS;
    const v = $("[data-ag-licht-fade-val]");
    if (v) v.textContent = `${(Number(fade.value) / 60).toFixed(1).replace(".", ",")} s`;
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => setFade(Number(fade.value)), 160);
  });
  const random = $("[data-ag-licht-random]");
  if (random) random.addEventListener("click", playRandom);
  // Morsen: taps on the pad, sent after a pause.
  const morseOpen = $("[data-ag-licht-morse-open]");
  const morse = $("[data-ag-morse]");
  const pad = $("[data-ag-morse-pad]");
  const dots = $("[data-ag-morse-dots]");
  let taps = [], firstTap = 0, morseTimer = null;
  const clearTaps = () => { taps = []; firstTap = 0; if (dots) dots.innerHTML = ""; };
  if (morseOpen && morse) morseOpen.addEventListener("click", () => { morse.hidden = !morse.hidden; clearTaps(); if (!morse.hidden) morse.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
  if (pad) pad.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const now = performance.now();
    if (!taps.length) firstTap = now;
    if (taps.length < MORSE_MAX_TAPS) taps.push(Math.round(now - firstTap));
    haptic(14);
    pad.classList.add("is-hit"); setTimeout(() => pad.classList.remove("is-hit"), 120);
    if (dots) { const i = document.createElement("i"); dots.appendChild(i); }
    clearTimeout(morseTimer);
    morseTimer = setTimeout(() => {
      const sent = sendMorse(taps, "board_a");
      clearTaps();
      if (sent && morse) morse.hidden = true;
    }, 1600);
  });
  // Sonnenaufgang.
  const srTime = $("[data-ag-sunrise-time]");
  const srDays = $("[data-ag-sunrise-days]");
  const srToggle = $("[data-ag-sunrise-toggle]");
  if (srToggle) srToggle.addEventListener("click", () => {
    const cur = findSunrise(alarms);
    setSunrise({ enabled: !(cur && cur.enabled !== false), time: srTime && srTime.value, days: srDays && srDays.value });
  });
  if (srTime) srTime.addEventListener("change", () => { if (findSunrise(alarms)) setSunrise({ time: srTime.value, days: srDays && srDays.value }); });
  if (srDays) srDays.addEventListener("change", () => { if (findSunrise(alarms)) setSunrise({ time: srTime && srTime.value, days: srDays.value }); });
  const saveBtn = $("[data-ag-licht-scene-save]");
  const nameIn = $("[data-ag-licht-scene-name]");
  if (saveBtn && nameIn) {
    const go = () => { if (saveScene(nameIn.value)) nameIn.value = ""; };
    saveBtn.addEventListener("click", go);
    nameIn.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); go(); } });
  }
  const retry = $("[data-ag-licht-conn]");
  if (retry) retry.addEventListener("click", () => { if (conn !== "connected") { disconnectLicht(); openLicht(); } });
  document.addEventListener("visibilitychange", () => {
    // Drop the socket in the background, and pick it up again the moment the
    // app is back with the tab still open — otherwise the panel came back
    // with an empty status and every control disabled.
    const panel = $("[data-ag-panel-licht]");
    if (document.visibilityState === "hidden") { if (client || connecting) disconnectLicht(); return; }
    if (panel && !panel.hidden) openLicht();
  });
}


export function renderLichtPanel() {
  if (!mount) return;
  const panel = $("[data-ag-panel-licht]");
  if (!panel || panel.hidden) return;

  const connEl = $("[data-ag-licht-conn]");
  if (connEl) {
    connEl.dataset.state = conn;
    const anyLampSeen = BOARDS.some((b) => lampOnline(b.id));
    const quiet = conn === "connected" && !anyLampSeen && connectedAt && Date.now() - connectedAt > 4000;
    connEl.textContent = conn === "connected" ? (quiet ? "verbunden · keine Lampe antwortet" : "verbunden")
      : conn === "connecting" ? "verbinde…"
      : conn === "error" ? (lastError ? `keine Verbindung (${lastError.slice(0, 40)}) · tippen` : "keine Verbindung · tippen")
      : "tippen zum Verbinden";
  }

  const lampsEl = $("[data-ag-licht-lamps]");
  if (lampsEl) {
    // Rebuilt only when the markup changes: every echo re-renders this panel,
    // and replacing the pill under a finger cancels the press (the heartbeat
    // never started on the real lamps because of exactly that).
    const html = BOARDS.map((b) => {
      const l = lamps[b.id];
      const online = lampOnline(b.id);
      const state = !online ? "offline" : (l && l.on === false) ? "standby" : "on";
      const sub = state === "offline" ? "offline" : state === "standby" ? "aus" : "an";
      return `<button type="button" class="ag-licht-lamp" data-lamp="${b.id}" data-state="${state}" title="${esc(b.name)} — tippen schaltet, halten pulsiert"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${esc(b.short)}<span class="ag-licht-lamp-sub">${sub}</span></button>`;
    }).join("");
    if (lampsEl.dataset.html !== html) { lampsEl.innerHTML = html; lampsEl.dataset.html = html; }
  }

  const ref = anyLamp();
  const on = anyOn();
  const strip = $("[data-ag-licht-strip]");
  if (strip) {
    const groups = ref && ref.groups ? ref.groups : stripGroups(0, 1);
    const cells = [];
    for (const g of groups) {
      const [r, gg, b] = groupRgb(g);
      for (let i = 0; i < Math.max(1, Math.round(g.size || 1)) && cells.length < NUM_LEDS; i++) cells.push(`rgb(${r},${gg},${b})`);
    }
    while (cells.length < NUM_LEDS) cells.push("rgb(60,60,60)");
    const bright = on ? (ref && typeof ref.brightness === "number" ? 0.35 + ref.brightness * 0.65 : 0.8) : 0.18;
    strip.innerHTML = cells.map((c) => `<i style="--ag-led:${c};opacity:${bright}"></i>`).join("");
    strip.classList.toggle("is-off", !on);
  }

  const power = $("[data-ag-licht-power]");
  if (power) {
    power.setAttribute("aria-pressed", on ? "true" : "false");
    power.classList.toggle("is-on", on);
    power.textContent = on ? "An" : "Aus";
    power.disabled = conn !== "connected";
  }
  const slider = $("[data-ag-licht-brightness]");
  if (slider && Date.now() >= holdUntil && ref && typeof ref.brightness === "number") {
    slider.value = String(Math.round(ref.brightness * 100));
  }
  if (slider) slider.disabled = conn !== "connected";
  const palette = $("[data-ag-licht-palette]");
  if (palette && ref && ref.groups && ref.groups.length) {
    const pos = Number(ref.groups[0].pos) || 0;
    palette.dataset.pos = String(pos);
    palette.style.setProperty("--ag-pick", `${(pos * 100).toFixed(1)}%`);
    palette.setAttribute("aria-valuenow", String(Math.round(pos * 29)));
  }
  for (const b of panel.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink], [data-ag-licht-morse-open], [data-ag-licht-random], [data-ag-licht-fade], [data-ag-licht-scene-name], [data-ag-licht-scene-save], [data-ag-sunrise-time], [data-ag-sunrise-days], [data-ag-sunrise-toggle]")) b.disabled = conn !== "connected";
  const sr = findSunrise(alarms);
  const srTime = $("[data-ag-sunrise-time]");
  const srDays = $("[data-ag-sunrise-days]");
  const srToggle = $("[data-ag-sunrise-toggle]");
  const srNote = $("[data-ag-sunrise-note]");
  if (sr && srTime && document.activeElement !== srTime) srTime.value = `${String(sr.lh ?? 7).padStart(2, "0")}:${String(sr.lm ?? 0).padStart(2, "0")}`;
  if (sr && srDays && document.activeElement !== srDays) srDays.value = daysPreset(sr.days);
  if (srToggle) {
    const on = !!(sr && sr.enabled !== false);
    srToggle.textContent = on ? "an" : "aus";
    srToggle.classList.toggle("is-on", on);
    srToggle.setAttribute("aria-pressed", on ? "true" : "false");
  }
  if (srNote) {
    const who = (sr && Array.isArray(sr.boards) ? sr.boards : BOARDS.map((b) => b.id)).map((id) => (BOARDS.find((b) => b.id === id) || {}).owner || id).join(" + ");
    const label = { werktags: "Mo–Fr", taeglich: "täglich", wochenende: "Sa+So" }[daysPreset(sr && sr.days)];
    srNote.textContent = sr && sr.enabled !== false
      ? `Aktiv ${label} um ${String(sr.lh ?? 7).padStart(2, "0")}:${String(sr.lm ?? 0).padStart(2, "0")}: ${sr.duration_min || 20} Minuten von tiefem Rot zu Warmweiss · ${who}`
      : sr ? "Gestellt, aber aus. Tippen auf „aus“ schaltet ihn ein."
      : "Zwanzig Minuten von tiefem Rot zu Warmweiss, auf den Lampen, die oben gewählt sind.";
  }
  for (const b of panel.querySelectorAll("[data-ag-licht-target] [data-target]")) {
    const active = (b.dataset.target || "") === sendTarget;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-checked", active ? "true" : "false");
  }
  const fade = $("[data-ag-licht-fade]");
  if (fade && Date.now() >= holdUntil && ref && typeof ref.fade_steps === "number") {
    fade.value = String(Math.round(ref.fade_steps));
    const v = $("[data-ag-licht-fade-val]");
    if (v) v.textContent = `${(ref.fade_steps / 60).toFixed(1).replace(".", ",")} s`;
  }

  const scenesWrap = $("[data-ag-licht-scenes]");
  const sceneList = $("[data-ag-licht-scene-list]");
  if (scenesWrap && sceneList) {
    scenesWrap.hidden = !scenes.length;
    sceneList.innerHTML = scenes.slice(0, 12).map((s) => {
      const groups = scenePayload(s).groups;
      const dots = groups.slice(0, 5).map((g) => { const [r, gg, b] = groupRgb(g); return `<i style="background:rgb(${r},${gg},${b})"></i>`; }).join("");
      return `<button type="button" class="ag-licht-scene" data-scene="${esc(s.id)}"${conn !== "connected" ? " disabled" : ""}><span class="ag-licht-scene-dots" aria-hidden="true">${dots}</span><span>${esc(s.name)}</span></button>`;
    }).join("");
  }
}
