// ── Einstellungen ────────────────────────────────────────────────────────────
// The few switches the app keeps for itself, at the bottom of the page.
//
// Lichtreaktionen: whether the lamps answer what happens in the app, the
// green flash of a pull, the colour of a tapped reaction, the red-orange
// strobe of a hug. Off, the app leaves the lamps alone for those; the Licht
// tab, the candle and the colour memory are deliberate lamp actions and
// stay as they are.
import { haptic } from "./haptic.js";
import { showToast } from "./toast.js";

const LIGHTS_KEY = "affektions-gacha:einstellung:lichtreaktionen";

export function lightReactionsEnabled() {
  try { return window.localStorage.getItem(LIGHTS_KEY) !== "aus"; } catch (_e) { return true; }
}
export function setLightReactions(on) {
  try {
    if (on) window.localStorage.removeItem(LIGHTS_KEY);
    else window.localStorage.setItem(LIGHTS_KEY, "aus");
  } catch (_e) {}
  return lightReactionsEnabled();
}

export function bindLightReactionsToggle(input) {
  if (!input) return;
  input.checked = lightReactionsEnabled();
  input.addEventListener("change", () => {
    const on = setLightReactions(input.checked);
    input.checked = on;
    haptic(6);
    showToast(on ? "💡 Die Lampen reagieren wieder auf die App" : "💡 Die Lampen bleiben bei App-Aktionen ruhig");
  });
}
