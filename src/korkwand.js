// ── Korkwand ─────────────────────────────────────────────────────────────────
// The Lieblinge are polaroids on a cork wall, each pinned at its own angle.
// A pinch on today's card (two fingers drawing together) shrinks it onto the
// wall: it becomes a favourite and a small copy flies into the star in the
// nav.
import { haptic } from "./haptic.js";
import { seededRandom } from "./utils.js";

export const PINCH_RATIO = 0.72;

// Each polaroid hangs at a fixed, slightly different angle.
export function pinAngle(day, token = "") {
  return Math.round((seededRandom(`pin:${day}:${token}`) - 0.5) * 9 * 10) / 10;
}

export function dressAsPolaroid(li, entry) {
  li.classList.add("ag-polaroid");
  li.style.setProperty("--ag-pin-rot", `${pinAngle(entry.day, entry.token)}deg`);
  const pin = document.createElement("i");
  pin.className = "ag-pin";
  pin.setAttribute("aria-hidden", "true");
  li.prepend(pin);
  return li;
}

// The pure part: given the starting and current distance between two
// fingers, has the card been pinched shut?
export function pinched(startDist, dist) {
  return startDist > 0 && dist / startDist <= PINCH_RATIO;
}

export function bindPinch(card, onPinch) {
  if (!card) return;
  const pts = new Map();
  let start = 0, done = false;
  const dist = () => {
    const [a, b] = [...pts.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  card.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) { start = dist(); done = false; }
  });
  card.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && !done && pinched(start, dist())) { done = true; onPinch(); }
  });
  const lift = (e) => { pts.delete(e.pointerId); if (pts.size < 2) start = 0; };
  card.addEventListener("pointerup", lift);
  card.addEventListener("pointercancel", lift);
  // iOS Safari's own two-finger gesture, for the touches the browser keeps.
  let gestureDone = false;
  card.addEventListener("gesturestart", () => { gestureDone = false; });
  card.addEventListener("gesturechange", (e) => {
    if (!gestureDone && e.scale && e.scale <= PINCH_RATIO) { gestureDone = true; onPinch(); }
  });
}

// A small copy of the card shrinks and flies into the Lieblinge star.
export function flyCardToWall(card) {
  const mount = card && card.closest(".ag-widget");
  const icon = mount && mount.querySelector('.ag-bottomnav-btn[data-ag-tab="lieblinge"] .ag-bottomnav-btn-icon');
  if (!card || !icon) return;
  const a = card.getBoundingClientRect();
  const b = icon.getBoundingClientRect();
  const ghost = document.createElement("div");
  ghost.className = "ag-polaroid-ghost";
  ghost.style.left = `${a.left}px`;
  ghost.style.top = `${a.top}px`;
  ghost.style.width = `${a.width}px`;
  ghost.style.height = `${Math.min(a.height, 260)}px`;
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + Math.min(a.height, 260) / 2);
  const anim = ghost.animate([
    { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: .9 },
    { transform: `translate(${(dx * .5).toFixed(0)}px, ${(dy * .5).toFixed(0)}px) scale(.4) rotate(-6deg)`, opacity: .9, offset: .6 },
    { transform: `translate(${dx.toFixed(0)}px, ${dy.toFixed(0)}px) scale(.05) rotate(4deg)`, opacity: .2 }
  ], { duration: 700, easing: "cubic-bezier(.3,.7,.3,1)", fill: "forwards" });
  anim.onfinish = () => {
    ghost.remove();
    icon.classList.add("is-clink");
    setTimeout(() => icon.classList.remove("is-clink"), 700);
    haptic([10, 40, 20]);
  };
}
