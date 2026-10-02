// ── Aufkleber ────────────────────────────────────────────────────────────────
// The reaction is a sticker. Tap an emoji under the card and it peels off
// the row, lands on the card at a slight tilt, and from then on it goes
// wherever he drags it. Where he put it is kept per day, so the card looks
// the same tomorrow in the Verlauf as it did when he stuck it.
import { haptic } from "./haptic.js";
import { seededRandom } from "./utils.js";

const KEY = "affektions-gacha:aufkleber:v1";
const MIN = 0.04, MAX = 0.96;

export function readAufkleber() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_e) { return {}; }
}
function writeAufkleber(map) {
  try { window.localStorage.setItem(KEY, JSON.stringify(map)); } catch (_e) {}
}

export const clamp01 = (v) => Math.min(MAX, Math.max(MIN, Number(v) || 0));

// Where a fresh sticker lands: top right, tilted by the day.
export function defaultSpot(day) {
  const rot = Math.round((seededRandom(`aufkleber:${day}`) - 0.5) * 28);
  return { x: 0.86, y: 0.1, rot };
}

export function aufkleberFor(day) {
  const s = readAufkleber()[day];
  return s && typeof s === "object" ? s : null;
}

export function placeAufkleber(day, { emoji, x, y, rot }) {
  const map = readAufkleber();
  const prev = map[day] || {};
  const next = {
    emoji: emoji || prev.emoji || "",
    x: clamp01(x ?? prev.x ?? defaultSpot(day).x),
    y: clamp01(y ?? prev.y ?? defaultSpot(day).y),
    rot: Number.isFinite(rot) ? rot : (Number.isFinite(prev.rot) ? prev.rot : defaultSpot(day).rot)
  };
  map[day] = next;
  // Keep the map small: a year of days is plenty.
  const keys = Object.keys(map).sort();
  while (keys.length > 400) delete map[keys.shift()];
  writeAufkleber(map);
  return next;
}

function apply(el, s) {
  el.style.left = `${(s.x * 100).toFixed(2)}%`;
  el.style.top = `${(s.y * 100).toFixed(2)}%`;
  el.style.setProperty("--ag-aufkleber-rot", `${s.rot}deg`);
}

// Renders the day's sticker into the card's layer. `peelFrom` is the
// reaction button the sticker peels off; without it the sticker is simply
// there, as on a reload.
export function renderAufkleber(layer, day, emoji, { peelFrom = null } = {}) {
  if (!layer) return;
  layer.innerHTML = "";
  if (!emoji) return;
  const spot = aufkleberFor(day) || placeAufkleber(day, { emoji, ...defaultSpot(day) });
  if (spot.emoji !== emoji) placeAufkleber(day, { emoji });
  const el = document.createElement("span");
  el.className = "ag-aufkleber";
  el.textContent = emoji;
  el.title = "Aufkleber — zieh mich, wohin du willst";
  apply(el, spot);
  layer.appendChild(el);
  bindDrag(el, layer, day);
  if (peelFrom) {
    const a = peelFrom.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    if (a.width && b.width) {
      const dx = a.left + a.width / 2 - (b.left + b.width / 2);
      const dy = a.top + a.height / 2 - (b.top + b.height / 2);
      el.animate([
        { transform: `translate(calc(-50% + ${dx.toFixed(0)}px), calc(-50% + ${dy.toFixed(0)}px)) rotate(0deg) scale(.9)`, opacity: .6 },
        { transform: `translate(calc(-50% + ${(dx * .4).toFixed(0)}px), calc(-50% + ${(dy * .4 - 30).toFixed(0)}px)) rotate(${spot.rot * 2}deg) scale(1.5) rotateX(50deg)`, opacity: 1, offset: .55 },
        { transform: `translate(-50%,-50%) rotate(${spot.rot}deg) scale(1)`, opacity: 1 }
      ], { duration: 640, easing: "cubic-bezier(.2,.8,.2,1)" });
    }
  }
}

function bindDrag(el, layer, day) {
  let drag = null;
  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const r = layer.getBoundingClientRect();
    drag = { r, moved: false, x0: e.clientX, y0: e.clientY };
    el.classList.add("is-dragging");
    try { el.setPointerCapture(e.pointerId); } catch (_e) {}
  });
  el.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 4) drag.moved = true;
    const x = clamp01((e.clientX - drag.r.left) / drag.r.width);
    const y = clamp01((e.clientY - drag.r.top) / drag.r.height);
    el.style.left = `${(x * 100).toFixed(2)}%`;
    el.style.top = `${(y * 100).toFixed(2)}%`;
    drag.x = x; drag.y = y;
  });
  const end = () => {
    if (!drag) return;
    const d = drag; drag = null;
    el.classList.remove("is-dragging");
    if (d.moved && d.x !== undefined) {
      const rot = Math.round((Math.random() - 0.5) * 24);
      const s = placeAufkleber(day, { x: d.x, y: d.y, rot });
      apply(el, s);
      haptic(8);
    }
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("lostpointercapture", end);
}
