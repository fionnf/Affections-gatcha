// ── Motion: tilt for the foil ────────────────────────────────────────────────
// On a rare or jackpot card the holographic sheen follows the tilt of the
// phone. (Shaking the phone used to pull the capsule as well; that is gone —
// the draw button and the capsule hold are the two ways in.)
//
// iOS gates the sensor behind a permission dialog; it is not asked for any
// more. Android and desktop just listen.
import { mount } from "./state.js";

let _onTilt = null;
let _listening = false;

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

export function initMotion({ onTilt } = {}) {
  _onTilt = onTilt || null;
  if (typeof window === "undefined") return;
  const Orient = window.DeviceOrientationEvent;
  if (!Orient) return;
  // Where the sensor is free (Android, desktop) the foil follows the tilt.
  // Where it sits behind a permission dialog (iOS) nothing is asked: the
  // popup was not worth a sheen, and the foil sweeps on its own there.
  if (typeof Orient.requestPermission !== "function") listen();
}
