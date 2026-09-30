// ── Motion: shake to draw, tilt for the foil ─────────────────────────────────
// Gacha machines are physical. Shaking the phone pulls the capsule, and on a
// rare or jackpot card the holographic sheen follows the tilt of the phone.
//
// iOS gates both sensors behind DeviceMotionEvent/DeviceOrientationEvent
// .requestPermission(), which must be called from a user gesture — and the
// answer is remembered by Safari, so a second call after a grant resolves
// without a prompt but still needs the gesture. So: the first pointerdown on
// the page asks once (never again after a denial), Android and desktop just
// listen. The draw button stays; this is an extra way in, not the only one.
import { mount } from "./state.js";

const MOTION_KEY = "affektions-gacha:motion:v1";
const SHAKE_THRESHOLD = 22;       // m/s² incl. gravity — a real shake, not a bus
const SHAKE_COOLDOWN_MS = 1500;

let _onShake = null;
let _onTilt = null;
let _listening = false;
let _lastShake = 0;

function remembered() {
  try { return window.localStorage.getItem(MOTION_KEY) || ""; } catch (_e) { return ""; }
}
function remember(v) {
  try { window.localStorage.setItem(MOTION_KEY, v); } catch (_e) {}
}

function handleMotion(e) {
  const a = e.accelerationIncludingGravity;
  if (!a || a.x === null) return;
  const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  if (mag < SHAKE_THRESHOLD) return;
  const now = Date.now();
  if (now - _lastShake < SHAKE_COOLDOWN_MS) return;
  _lastShake = now;
  if (_onShake) _onShake();
}

function handleOrientation(e) {
  if (!_onTilt || e.gamma === null || e.beta === null) return;
  // gamma: left/right −90..90, beta: front/back −180..180. Map to 0..100%.
  const x = Math.max(0, Math.min(100, (e.gamma + 45) / 90 * 100));
  const y = Math.max(0, Math.min(100, (e.beta + 30) / 120 * 100));
  _onTilt(x, y);
}

function listen() {
  if (_listening) return;
  _listening = true;
  window.addEventListener("devicemotion", handleMotion, { passive: true });
  window.addEventListener("deviceorientation", handleOrientation, { passive: true });
  if (mount) mount.classList.add("has-tilt");
}

async function askOnce() {
  const Motion = window.DeviceMotionEvent;
  const needsAsk = Motion && typeof Motion.requestPermission === "function";
  if (!needsAsk) { listen(); return; }
  if (remembered() === "denied") return;
  try {
    const r = await Motion.requestPermission();
    const Orient = window.DeviceOrientationEvent;
    if (Orient && typeof Orient.requestPermission === "function") {
      try { await Orient.requestPermission(); } catch (_e) {}
    }
    remember(r === "granted" ? "granted" : "denied");
    if (r === "granted") listen();
  } catch (_e) {
    // Not from a gesture, or dismissed — try again on the next tap.
  }
}

export function initMotion({ onShake, onTilt } = {}) {
  _onShake = onShake || null;
  _onTilt = onTilt || null;
  if (typeof window === "undefined") return;
  const Motion = window.DeviceMotionEvent;
  if (!Motion) return;
  if (typeof Motion.requestPermission !== "function") { listen(); return; }
  // iOS: wait for the first real tap anywhere in the app.
  const onFirstTap = () => {
    askOnce().then(() => { if (_listening || remembered() === "denied") document.removeEventListener("pointerdown", onFirstTap); });
  };
  document.addEventListener("pointerdown", onFirstTap);
}
