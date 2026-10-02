// ── Motion: tilt for the foil ────────────────────────────────────────────────
// On a rare or jackpot card the holographic sheen follows the tilt of the
// phone. (Shaking the phone used to pull the capsule as well; that is gone —
// the draw button and the capsule hold are the two ways in.)
//
// iOS gates the sensor behind DeviceOrientationEvent.requestPermission(),
// which must be called from a user gesture — and the answer is remembered by
// Safari, so a second call after a grant resolves without a prompt but still
// needs the gesture. So: the first click on the page asks once (never again
// after a denial), Android and desktop just listen. click, not pointerdown:
// WebKit only counts click/touchend as user activation, and requestPermission()
// from anything else rejects silently.
import { mount } from "./state.js";

const MOTION_KEY = "affektions-gacha:motion:v1";

let _onTilt = null;
let _listening = false;

function remembered() {
  try { return window.localStorage.getItem(MOTION_KEY) || ""; } catch (_e) { return ""; }
}
function remember(v) {
  try { window.localStorage.setItem(MOTION_KEY, v); } catch (_e) {}
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
  window.addEventListener("deviceorientation", handleOrientation, { passive: true });
  if (mount) mount.classList.add("has-tilt");
}

async function askOnce() {
  const Orient = window.DeviceOrientationEvent;
  const needsAsk = Orient && typeof Orient.requestPermission === "function";
  if (!needsAsk) { listen(); return; }
  if (remembered() === "denied") return;
  try {
    const r = await Orient.requestPermission();
    remember(r === "granted" ? "granted" : "denied");
    if (r === "granted") listen();
  } catch (_e) {
    // Not from a gesture, or dismissed — try again on the next tap.
  }
}

export function initMotion({ onTilt } = {}) {
  _onTilt = onTilt || null;
  if (typeof window === "undefined") return;
  const Orient = window.DeviceOrientationEvent;
  if (!Orient) return;
  if (typeof Orient.requestPermission !== "function") { listen(); return; }
  // iOS: wait for the first real tap anywhere in the app.
  const onFirstTap = () => {
    askOnce().then(() => { if (_listening || remembered() === "denied") document.removeEventListener("click", onFirstTap); });
  };
  document.addEventListener("click", onFirstTap);
}
