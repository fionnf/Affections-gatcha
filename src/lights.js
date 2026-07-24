// ── Lichtsteuerung ────────────────────────────────────────────────────────────
// Native mini-panel for the linked_friend_lights lamps (two Pico W boards
// syncing SK6812 strips over MQTT). Speaks the exact wire protocol of that
// project's web app: JSON on <prefix>/events via MQTT-over-WebSocket, with
// board state echoed back on the same topic. The full web app remains the
// place for scenes/alarms/board config — this covers the everyday 95%:
// on/off, brightness, colour.
//
// mqtt.js (~150 kB) is lazy-loaded from unpkg on first open, mirroring the
// Leaflet pattern in berge.js — people who never open the panel pay nothing,
// which keeps the old-phone budget intact.
import { $ } from "./state.js";
import { haptic } from "./haptic.js";

const BROKER = "wss://broker.hivemq.com:8884/mqtt";
const PREFIX = "picolight_lf26";
const TOPIC = `${PREFIX}/events`;
const NUM_LEDS = 10;
// Matches the standalone web UI so the boards treat both senders identically.
const FROM_ID = "web_app";
const BOARDS = [
  { id: "board_a", name: "FF" },
  { id: "board_b", name: "LS" },
];
const BOARD_TIMEOUT_MS = 70000;
const FULL_APP_URL = "https://fionnf.github.io/linked_friend_lights/";

// The boards' tint palette, verbatim from linked_friend_lights (config.py
// TINT_PALETTE / web_app PALETTE) so the slider colours match the real lamps.
const PALETTE = [
  [255,200,80],[255,160,0],[255,120,0],[255,60,0],
  [255,0,0],[255,0,60],[255,0,140],[200,0,200],
  [140,0,255],[80,0,255],[0,0,255],[0,60,255],
  [0,140,255],[0,200,255],[0,255,220],[0,255,160],
  [0,255,80],[0,220,0],[80,255,0],[160,255,0],
  [220,255,0],[255,240,0],[255,180,40],[255,100,80],
  [255,80,160],[180,40,255],[40,100,255],[0,180,180],
  [20,255,120],[255,220,120],
];
const BASE_W = [0, 0, 0, 200];

function lerp(a, b, t) { return a + (b - a) * t; }

export function paletteRGB(pos) {
  const n = PALETTE.length;
  const scaled = Math.min(pos, 0.9999) * (n - 1);
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const c1 = PALETTE[idx], c2 = PALETTE[Math.min(idx + 1, n - 1)];
  const tint = [0, 1, 2].map((i) => lerp(c1[i], c2[i], frac));
  const sat = pos;
  const r = Math.round(lerp(BASE_W[0], tint[0], sat));
  const g = Math.round(lerp(BASE_W[1], tint[1], sat));
  const b = Math.round(lerp(BASE_W[2], tint[2], sat));
  const w = Math.round(BASE_W[3] * (1 - sat));
  return [Math.min(255, r + w), Math.min(255, g + Math.round(w * 0.8)), Math.min(255, b + Math.round(w * 0.6))];
}

function paletteGradient() {
  const stops = [];
  for (let i = 0; i <= 24; i++) {
    const pos = i / 24;
    const [r, g, b] = paletteRGB(pos);
    stops.push(`rgb(${r},${g},${b}) ${Math.round(pos * 100)}%`);
  }
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

// ── Client state ─────────────────────────────────────────────────────────────
let _client = null;
let _mqttLoading = null;
let _powered = true;
let _brightness = 1.0;
const _boardSeen = {};   // boardId -> last-seen ms
const _boardPower = {};  // boardId -> last known on/off
let _pillTimer = null;

function _loadMqttLib() {
  if (window.mqtt) return Promise.resolve();
  if (_mqttLoading) return _mqttLoading;
  _mqttLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://unpkg.com/mqtt/dist/mqtt.min.js";
    s.onload = () => resolve();
    s.onerror = () => { _mqttLoading = null; reject(new Error("mqtt.js konnte nicht geladen werden")); };
    document.head.appendChild(s);
  });
  return _mqttLoading;
}

function _setStatus(cls, text) {
  const dot = $("[data-ag-lights-dot]");
  const label = $("[data-ag-lights-status]");
  if (dot) dot.dataset.agLightsState = cls;
  if (label) label.textContent = text;
}

function _updatePills() {
  const now = Date.now();
  for (const board of BOARDS) {
    const pill = $(`[data-ag-lights-board="${board.id}"]`);
    if (!pill) continue;
    const online = _boardSeen[board.id] && now - _boardSeen[board.id] < BOARD_TIMEOUT_MS;
    pill.classList.toggle("is-online", !!online);
    const power = _boardPower[board.id];
    pill.textContent = `${board.name} ${online ? (power === false ? "◦" : "●") : "–"}`;
    pill.title = online ? (power === false ? `${board.name}: aus` : `${board.name}: an`) : `${board.name}: nicht gesehen`;
  }
}

function _publish(payload) {
  if (!_client || !_client.connected) return;
  payload.from = FROM_ID;
  if (payload.on !== undefined) {
    for (const b of BOARDS) _boardPower[b.id] = payload.on;
    _updatePills();
  }
  _client.publish(TOPIC, JSON.stringify(payload));
}

function _connect() {
  if (_client) return;
  _setStatus("connecting", "Verbinde…");
  _client = window.mqtt.connect(BROKER, {
    clientId: "gacha_" + Math.random().toString(16).slice(2),
    clean: true,
  });
  _client.on("connect", () => {
    _setStatus("connected", "Verbunden");
    _client.subscribe(TOPIC);
  });
  _client.on("message", (t, msg) => {
    try {
      const d = JSON.parse(msg.toString());
      if (d.from && d.from !== FROM_ID) {
        _boardSeen[d.from] = Date.now();
        if (d.on !== undefined) _boardPower[d.from] = d.on;
        if (d.on !== undefined) { _powered = d.on; _syncPowerBtn(); }
        if (d.brightness !== undefined) { _brightness = d.brightness; _syncBrightness(); }
        _updatePills();
        clearTimeout(_pillTimer);
        _pillTimer = setTimeout(_updatePills, BOARD_TIMEOUT_MS + 500);
      }
    } catch (_e) {}
  });
  _client.on("error", () => _setStatus("disconnected", "Fehler"));
  _client.on("close", () => _setStatus("disconnected", "Getrennt"));
  _client.on("reconnect", () => _setStatus("connecting", "Verbinde neu…"));
}

function _disconnect() {
  if (_client) {
    try { _client.end(true); } catch (_e) {}
    _client = null;
  }
  _setStatus("disconnected", "Getrennt");
}

// ── UI sync ──────────────────────────────────────────────────────────────────
function _syncPowerBtn() {
  const btn = $("[data-ag-lights-power]");
  if (!btn) return;
  btn.classList.toggle("is-on", _powered);
  btn.textContent = _powered ? "💡 An" : "💤 Aus";
}

function _syncBrightness() {
  const slider = $("[data-ag-lights-brightness]");
  if (slider && document.activeElement !== slider) slider.value = String(Math.round(_brightness * 100));
}

function _sendColour(pos) {
  _publish({
    on: true,
    groups: [{ pos, w: 1.0, size: NUM_LEDS }],
  });
  _powered = true;
  _syncPowerBtn();
}

// ── Panel wiring ─────────────────────────────────────────────────────────────
export function openLightsPanel() {
  const panel = document.getElementById("ag-lights-panel");
  if (!panel) return;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  haptic(10);
  _updatePills();
  _loadMqttLib()
    .then(() => _connect())
    .catch(() => _setStatus("disconnected", "Offline — Verbindung nicht möglich"));
}

export function closeLightsPanel() {
  const panel = document.getElementById("ag-lights-panel");
  if (panel) panel.hidden = true;
  // Keep the broker connection for the session — reopening is instant, and a
  // lone idle WebSocket is cheap. It dies with the page.
}

export function bindLightsPanel() {
  const panel = document.getElementById("ag-lights-panel");
  if (!panel) return;

  const colour = panel.querySelector("[data-ag-lights-colour]");
  if (colour) colour.style.background = paletteGradient();

  let brightnessTimer = null;
  let colourTimer = null;

  panel.querySelector("[data-ag-lights-power]")?.addEventListener("click", () => {
    // A colour drag finishing an instant before this click would re-power
    // the lamps via its debounce timer — the explicit toggle wins.
    clearTimeout(colourTimer);
    _powered = !_powered;
    _publish({ on: _powered });
    _syncPowerBtn();
    haptic(8);
  });

  panel.querySelector("[data-ag-lights-brightness]")?.addEventListener("input", (e) => {
    _brightness = Math.max(0.05, Number(e.target.value) / 100);
    clearTimeout(brightnessTimer);
    brightnessTimer = setTimeout(() => _publish({ brightness: _brightness }), 150);
  });
  colour?.addEventListener("input", (e) => {
    const pos = Number(e.target.value) / 100;
    const [r, g, b] = paletteRGB(pos);
    const preview = panel.querySelector("[data-ag-lights-preview]");
    if (preview) preview.style.background = `rgb(${r},${g},${b})`;
    clearTimeout(colourTimer);
    colourTimer = setTimeout(() => _sendColour(pos), 150);
  });

  panel.querySelector("[data-ag-lights-random]")?.addEventListener("click", () => {
    const pos = Math.random();
    if (colour) colour.value = String(Math.round(pos * 100));
    const [r, g, b] = paletteRGB(pos);
    const preview = panel.querySelector("[data-ag-lights-preview]");
    if (preview) preview.style.background = `rgb(${r},${g},${b})`;
    _sendColour(pos);
    haptic([10, 15, 10]);
  });

  document.getElementById("ag-lights-close")?.addEventListener("click", closeLightsPanel);

  // Reconnect politely if the tab was backgrounded long enough for the
  // broker to drop us.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !document.getElementById("ag-lights-panel")?.hidden) {
      if (window.mqtt && !_client) _connect();
    }
  });
}

export const _internals = { _disconnect };
