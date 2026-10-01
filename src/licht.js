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
  { id: "board_a", name: "Fionns Lampe", short: "FF" },
  { id: "board_b", name: "Lennarts Lampe", short: "LS" }
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
let conn = "idle";         // idle | connecting | connected | error

function topicEvents() { return `${PREFIX}/events`; }
function topicStatus() { return `${PREFIX}/status/+`; }
function topicScenes() { return `${PREFIX}/scenes`; }

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
      c.subscribe([topicEvents(), topicStatus(), topicScenes()], () => {});
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
  if (t === topicScenes()) {
    const list = Array.isArray(d.scenes) ? d.scenes : [];
    const dead = new Set(Array.isArray(d.deleted) ? d.deleted : []);
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
function send(payload, target = null) {
  holdUntil = Date.now() + HOLD_MS;
  const ids = target ? [target] : BOARDS.map((b) => b.id);
  for (const id of ids) {
    const l = lamps[id] = { ...(lamps[id] || {}) };
    if (payload.on !== undefined) l.on = !!payload.on;
    if (typeof payload.brightness === "number") l.brightness = payload.brightness;
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
    palette.addEventListener("click", pick);
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
    lampsEl.innerHTML = BOARDS.map((b) => {
      const l = lamps[b.id];
      const online = lampOnline(b.id);
      const state = !online ? "offline" : (l && l.on === false) ? "standby" : "on";
      const sub = state === "offline" ? "offline" : state === "standby" ? "aus" : "an";
      return `<span class="ag-licht-lamp" data-state="${state}" title="${esc(b.name)}"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${esc(b.short)}<span class="ag-licht-lamp-sub">${sub}</span></span>`;
    }).join("");
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
  for (const b of panel.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink]")) b.disabled = conn !== "connected";

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
