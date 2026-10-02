// ── Kerzenmodus ──────────────────────────────────────────────────────────────
// After dark a candle appears beside the draw button. Lit, it dims the whole
// app to a flicker and puts a warm, breathing scene on both lamps. A swipe
// across the flame blows it out: the flame leans the way you swiped, the
// room comes back, the lamps return to what they were.
import { haptic } from "./haptic.js";

export const CANDLE_FROM = 20, CANDLE_TO = 5;
export function isCandleHour(h) { return h >= CANDLE_FROM || h < CANDLE_TO; }

export const SWIPE_PX = 56;
export const SWIPE_MS = 700;
// The pure part of the swipe: a quick, decisive move in any direction.
export function isBlow(dx, dy, ms) {
  return ms <= SWIPE_MS && Math.hypot(dx, dy) >= SWIPE_PX;
}

let lit = false;
let stopLights = null;
let veil = null;
let changed = null;

export function candleLit() { return lit; }

export function lightCandle({ onChange } = {}) {
  if (lit) return;
  lit = true;
  changed = onChange || null;
  veil = document.querySelector("[data-ag-candle-veil]");
  if (veil) {
    veil.hidden = false;
    veil.classList.remove("is-blown");
    requestAnimationFrame(() => veil.classList.add("is-lit"));
    bindBlow(veil, (dx, dy) => blowOut({ dx, dy }));
  }
  document.documentElement.classList.add("is-candle");
  haptic([10, 40, 10]);
  import("./lightsFx.js").then((m) => { stopLights = m.startCandleLights(); }).catch(() => {});
  if (onChange) onChange(true);
}

export function blowOut({ dx = 0, dy = -1 } = {}) {
  if (!lit) return;
  lit = false;
  const onChange = changed;
  changed = null;
  if (veil) {
    veil.style.setProperty("--ag-blow-x", `${Math.max(-1, Math.min(1, dx / 120)).toFixed(2)}`);
    veil.style.setProperty("--ag-blow-y", `${Math.max(-1, Math.min(1, dy / 120)).toFixed(2)}`);
    veil.classList.add("is-blown");
    veil.classList.remove("is-lit");
    const v = veil;
    setTimeout(() => { if (!lit) { v.hidden = true; v.classList.remove("is-blown"); } }, 900);
  }
  document.documentElement.classList.remove("is-candle");
  haptic([30, 20, 10]);
  if (stopLights) { try { stopLights(); } catch (_e) {} stopLights = null; }
  if (onChange) onChange(false);
}

function bindBlow(el, onBlow) {
  if (el.dataset.bound) return;
  el.dataset.bound = "1";
  let start = null;
  el.addEventListener("pointerdown", (e) => { start = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  el.addEventListener("pointerup", (e) => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y, ms = performance.now() - start.t;
    start = null;
    if (isBlow(dx, dy, ms)) onBlow(dx, dy);
  });
  el.addEventListener("pointercancel", () => { start = null; });
  el.querySelector("[data-ag-candle-out]")?.addEventListener("click", () => onBlow(0, -1));
  // Backgrounded: a candle nobody watches is out, and the lamps come back.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && lit) blowOut({});
  });
}
