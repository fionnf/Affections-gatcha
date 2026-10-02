// ── Der Knopf ────────────────────────────────────────────────────────────────
// A gashapon has a knob, not a button: you turn it a full round and the
// capsule drops. The knob below the window is that. A drag around its centre
// winds it clockwise with a detent every eighth of a turn; one full turn
// fires the draw. Let go early and it springs back. Once today's capsule is
// out, the knob is locked: it gives a few degrees and clacks back.
import { haptic } from "./haptic.js";

export const TURN_DEG = 360;
export const DETENT_DEG = 45;
export const LOCKED_GIVE_DEG = 22;

// The pure part: a turn in progress. Feed it absolute pointer angles (in
// degrees, any range) and it keeps the clockwise distance wound so far.
export class KnobTurn {
  constructor({ locked = false } = {}) {
    this.locked = locked;
    this.wound = 0;
    this.last = null;
    this.detents = 0;
    this.fired = false;
  }
  // Returns what happened on this move: { detent: n|0, fired: bool }.
  move(angleDeg) {
    if (this.last === null) { this.last = angleDeg; return { detent: 0, fired: false }; }
    let d = angleDeg - this.last;
    while (d > 180) d -= 360;
    while (d <= -180) d += 360;
    this.last = angleDeg;
    if (this.fired) return { detent: 0, fired: false };
    const max = this.locked ? LOCKED_GIVE_DEG : TURN_DEG;
    this.wound = Math.min(max, Math.max(0, this.wound + d));
    const detents = Math.floor(this.wound / DETENT_DEG);
    const detent = detents > this.detents ? detents - this.detents : 0;
    this.detents = detents;
    const fired = !this.locked && this.wound >= TURN_DEG;
    if (fired) this.fired = true;
    return { detent, fired };
  }
}

export function pointerAngle(el, clientX, clientY) {
  const r = el.getBoundingClientRect();
  return (Math.atan2(clientY - (r.top + r.height / 2), clientX - (r.left + r.width / 2)) * 180) / Math.PI;
}

export const HOLD_MS = 3000;
export const HOLD_STILL_DEG = 8;

// Wires a knob element. `drawable()` says whether a turn may fire; `onFire`
// is the draw; `onTick` runs on each detent (sound, glow); `onHold` runs
// when the knob is held three seconds without turning (the hidden letter).
export function bindKnob(el, { drawable, onFire, onTick, onHold } = {}) {
  if (!el) return;
  let turn = null;
  let holdTimer = null;
  const stopHold = () => { clearTimeout(holdTimer); holdTimer = null; };
  const setAngle = (deg) => el.style.setProperty("--ag-knob-angle", `${deg.toFixed(1)}deg`);
  const springBack = () => {
    el.classList.add("is-springing");
    setAngle(0);
    setTimeout(() => el.classList.remove("is-springing"), 420);
  };
  el.addEventListener("pointerdown", (e) => {
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    const can = drawable ? drawable() : true;
    turn = new KnobTurn({ locked: !can });
    turn.move(pointerAngle(el, e.clientX, e.clientY));
    el.classList.remove("is-springing");
    el.classList.add("is-turning");
    el.classList.toggle("is-locked", !can);
    try { el.setPointerCapture(e.pointerId); } catch (_e) {}
    stopHold();
    if (onHold) holdTimer = setTimeout(() => { if (turn && turn.wound < HOLD_STILL_DEG) { release(); onHold(); } }, HOLD_MS);
  });
  el.addEventListener("pointermove", (e) => {
    if (!turn) return;
    const { detent, fired } = turn.move(pointerAngle(el, e.clientX, e.clientY));
    if (turn.wound >= HOLD_STILL_DEG) stopHold();
    setAngle(turn.wound);
    if (detent) {
      haptic(turn.locked ? 4 : 6 + turn.detents);
      if (onTick) onTick(turn.detents, turn.locked);
    }
    if (fired) {
      const t = turn;
      turn = null;
      el.classList.remove("is-turning");
      el.classList.add("is-fired");
      haptic([20, 30, 50]);
      setTimeout(() => { el.classList.remove("is-fired"); springBack(); }, 500);
      if (onFire && (!drawable || drawable())) onFire();
      void t;
    }
  });
  const release = () => {
    stopHold();
    if (!turn) return;
    const wasLocked = turn.locked && turn.wound > 4;
    turn = null;
    el.classList.remove("is-turning");
    if (wasLocked) haptic([8, 30, 8]);
    springBack();
  };
  el.addEventListener("pointerup", release);
  el.addEventListener("pointercancel", release);
  el.addEventListener("lostpointercapture", release);
  el.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && (!drawable || drawable())) { e.preventDefault(); haptic(12); if (onFire) onFire(); }
  });
}
