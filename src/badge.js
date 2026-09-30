// ── App icon badge ────────────────────────────────────────────────────────────
// A red 1 on the home-screen icon while today's capsule is unpulled, gone the
// moment it is drawn. The Badging API works for installed web apps (iOS 16.4+
// ties it to notification permission; Android just shows it). No permission
// prompt of its own, no backend, nothing to schedule — the nudge push
// notifications were meant to be, working today. Everything is best-effort:
// a browser without the API, or one that rejects, changes nothing.
import { state } from "./state.js";
import { readHistory } from "./storage.js";
import { getToken, dateKeyInTimezone } from "./utils.js";

export function updateAppBadge() {
  try {
    if (typeof navigator === "undefined" || typeof navigator.setAppBadge !== "function") return;
    const today = dateKeyInTimezone(state.theme?.timezone || "UTC");
    const token = getToken();
    const drawn = readHistory().some((e) => e.token === token && e.day === today);
    const p = drawn ? navigator.clearAppBadge() : navigator.setAppBadge(1);
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch (_e) { /* not installed, not supported — fine */ }
}
