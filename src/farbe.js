// ── Farbgedächtnis ───────────────────────────────────────────────────────────
// The lamps boot in warm white, and the lights page's reset puts them there
// too. A power cut, a broker hiccup, a reboot: the room comes back white and
// stays white until someone opens an app. This remembers the last colour
// each lamp showed, and whoever talks to the lamps next (the Licht tab, a
// pull flash, the start-up check) puts the colour back when a lamp turns up
// white without anyone having asked for white.
//
// White chosen on purpose (the Weiß mood, the Weissanteil slider) forgets
// the memory for those lamps, so it is not undone. A sunrise alarm ends in
// warm white by design; for three hours after it the Licht tab leaves white
// alone.

const KEY = "affektions-gacha:licht:farbe:v1";
export const MEMORY_MAX_AGE_MS = 7 * 86400000;
export const WHITE_W = 0.85;
export const SUNRISE_GRACE_MS = 3 * 3600000;

export function isWhite(state) {
  const gs = state && Array.isArray(state.groups) ? state.groups : null;
  if (!gs || !gs.length) return false;
  return gs.every((g) => (Number(g.w) || 0) >= WHITE_W);
}
export function isColoured(state) {
  const gs = state && Array.isArray(state.groups) ? state.groups : null;
  if (!gs || !gs.length) return false;
  if (state.on === false) return false;
  return gs.some((g) => (Number(g.w) || 0) < WHITE_W);
}

function readAll() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_e) { return {}; }
}
function writeAll(all) {
  try { window.localStorage.setItem(KEY, JSON.stringify(all)); } catch (_e) {}
}

// Keeps a coloured state for a lamp; a white or off state is ignored.
export function rememberColour(id, state, now = Date.now()) {
  if (!id || !isColoured(state)) return false;
  const all = readAll();
  all[id] = {
    groups: state.groups.map((g) => ({ pos: Number(g.pos) || 0, w: Number(g.w) || 0, size: Math.max(1, Math.round(Number(g.size) || 1)) })),
    brightness: typeof state.brightness === "number" ? state.brightness : undefined,
    fade_steps: typeof state.fade_steps === "number" ? state.fade_steps : undefined,
    at: now
  };
  writeAll(all);
  return true;
}
// The remembered colour, if it is not too old.
export function recallColour(id, now = Date.now()) {
  const m = readAll()[id];
  if (!m || !Array.isArray(m.groups) || !m.groups.length) return null;
  if (now - (m.at || 0) > MEMORY_MAX_AGE_MS) return null;
  return m;
}
export function forgetColour(ids) {
  const all = readAll();
  for (const id of ids || []) delete all[id];
  writeAll(all);
}

// The payload that puts a remembered colour back on one lamp.
export function restorePayload(id, m) {
  const p = { target: id, on: true, groups: m.groups, fade_steps: typeof m.fade_steps === "number" ? m.fade_steps : 40 };
  if (typeof m.brightness === "number") p.brightness = m.brightness;
  return p;
}

// Within the grace window after a sunrise alarm (local hour and minute,
// enabled), white is what the morning asked for.
export function inSunriseGrace(alarm, now = new Date()) {
  if (!alarm || !alarm.enabled || !Number.isInteger(alarm.lh)) return false;
  const end = new Date(now);
  end.setHours(alarm.lh, alarm.lm || 0, 0, 0);
  end.setMinutes(end.getMinutes() + (Number(alarm.duration_min) || 20));
  const since = now - end;
  return since >= 0 && since <= SUNRISE_GRACE_MS;
}
