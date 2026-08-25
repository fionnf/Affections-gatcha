// ── All localStorage read/write functions ─────────────────────────────────
import {
  STORAGE_KEY, FAVORITES_KEY, TOKENS_KEY, TOKENS_SENT_KEY, STREAK_CACHE_KEY, STREAK_SYNCED_KEY,
  STREAK_RESTORE_KEY, WISH_KEY, MILESTONE_KEY,
  BAERLAUCH_SCORE_KEY, BAERLAUCH_HISTORY_KEY, MISSION_LOG_KEY,
  GIPFELBUCH_KEY, QUEST_STORAGE_KEY, QUEST_POINTS_KEY,
  FREIKARTE_KEY, FREIKARTE_REROLL_KEY
} from "./constants.js";
import { state } from "./state.js";
import { dateKeyInTimezone, getToken } from "./utils.js";

// Several pieces of state (Sammelkapsel tokens, streak caches, quest
// state/points, the in-flight wish) used to live under one shared
// localStorage key with no player dimension at all. Lennart's and Fionn's
// devices stayed independent in practice (separate localStorage), but any
// value under these keys would silently clobber the other player's if the
// app were ever opened on one shared device/browser — and a sync always
// overwrote the whole key regardless. Nest these under the current
// player's slot instead, migrating a pre-existing flat value into this
// device's current player once, on first read after the change ships.
function readPlayerSlot(baseKey, emptyValue) {
  try {
    const raw = localStorage.getItem(baseKey);
    if (raw === null) return emptyValue;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)
        && ("lennart" in parsed || "fionn" in parsed)) {
      const val = parsed[getToken()];
      return val === undefined ? emptyValue : val;
    }
    // Pre-migration flat value — replace the key outright with the nested
    // shape (a plain merge-write would treat the still-flat value as the
    // outer per-player map and leave its keys stranded at the top level).
    localStorage.setItem(baseKey, JSON.stringify({ [getToken()]: parsed }));
    return parsed;
  } catch (_e) { return emptyValue; }
}

function writePlayerSlot(baseKey, value) {
  try {
    const raw = localStorage.getItem(baseKey);
    let parsed = null;
    try { parsed = raw !== null ? JSON.parse(raw) : null; } catch (_e) { parsed = null; }
    const all = (parsed && typeof parsed === "object" && !Array.isArray(parsed)) ? parsed : {};
    all[getToken()] = value;
    localStorage.setItem(baseKey, JSON.stringify(all));
  } catch (_e) {}
}

export function readHistory() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return state.syncedHistory || [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return state.syncedHistory || [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return state.syncedHistory || [];
    const entries = parsed
      .filter((entry) =>
        entry && typeof entry.day === "string" && typeof entry.token === "string"
      )
      .map((entry) => (entry.token === entry.token.toLowerCase()
        ? entry
        : { ...entry, token: entry.token.toLowerCase() }));
    return entries.length ? entries : (state.syncedHistory || []);
  } catch (error) {
    return state.syncedHistory || [];
  }
}

export function writeHistory(entries) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    /* localStorage unavailable or full — ignore */
  }
}

// Beweisstück: mark today's quest as passed. One-way, like a voucher's
// "used" — a trophy once earned is never silently taken back, which is also
// what makes the sync-side union merge safe. Returns the updated entry, or
// null when no matching history record exists yet (nothing was pulled, or a
// preview day that never wrote one).
export function markQuestBestanden(day, token) {
  const history = readHistory();
  const match = history.find((e) => e.day === day && e.token === token);
  if (!match) return null;
  if (!match.bestanden) {
    match.bestanden = true;
    match.bestandenAt = dateKeyInTimezone(state.theme?.timezone || "UTC");
    writeHistory(history);
  }
  return match;
}

// Attach the proof photo's URL to a day's entry. Replacing an earlier proof
// is allowed — a better photo of the same quest is still the same proof.
export function setBeweisUrl(day, token, url) {
  const history = readHistory();
  const match = history.find((e) => e.day === day && e.token === token);
  if (!match) return null;
  match.beweisUrl = url;
  writeHistory(history);
  return match;
}

export function readFavorites() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const today = state.theme?.timezone
      ? dateKeyInTimezone(state.theme.timezone)
      : new Date().toISOString().slice(0, 10);
    return parsed.filter((entry) =>
      entry && typeof entry.day === "string" && typeof entry.token === "string"
      && entry.day <= today
    );
  } catch (error) {
    return [];
  }
}

export function writeFavorites(entries) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(entries));
  } catch (error) {
    /* localStorage unavailable or full — ignore */
  }
}

export function readTokens() {
  const val = readPlayerSlot(TOKENS_KEY, {});
  return val && typeof val === "object" && !Array.isArray(val) ? val : {};
}

export function writeTokens(tokens) {
  writePlayerSlot(TOKENS_KEY, tokens);
}

export function addToken(token) {
  const tokens = readTokens();
  tokens[token] = (tokens[token] || 0) + 1;
  writeTokens(tokens);
  return tokens[token];
}

export function resetToken(token) {
  const tokens = readTokens();
  tokens[token] = 0;
  writeTokens(tokens);
}

// ── Token sync ───────────────────────────────────────────────────────────────
// Tokens were the one synced collection the sheet overwrote outright. History
// and favourites merge, streak and questPoints only move upward, and the Apps
// Script even guards the streak with Math.max — but tokens were assigned
// straight from the sheet. So a token earned while the backup POST could not
// land (offline, a dropped request, the app closed before it went out) was
// deleted by the next sync, which is the one thing a collectible must never do.

function numTokens(map) {
  const out = {};
  if (!map || typeof map !== "object") return out;
  for (const [k, v] of Object.entries(map)) {
    const n = typeof v === "number" && Number.isFinite(v) ? Math.trunc(v) : 0;
    if (n > 0) out[k] = n;
  }
  return out;
}

// null (rather than {}) means "never recorded", which is not the same as
// "recorded as empty" — see applySharedTokens for why that distinction matters.
export function readTokensSent() {
  const val = readPlayerSlot(TOKENS_SENT_KEY, null);
  return val && typeof val === "object" && !Array.isArray(val) ? numTokens(val) : null;
}

export function writeTokensSent(tokens) {
  writePlayerSlot(TOKENS_SENT_KEY, numTokens(tokens));
}

// Three-way merge of the sheet's copy against ours, using the last confirmed
// send as the common base. Per emoji: whatever the sheet has, plus whatever we
// have changed since we last successfully sent.
//
// With nothing unsent, local equals the base and the result is the sheet
// exactly — so a redeem on the other phone still lands here. With something
// unsent, the delta rides on top of the sheet instead of being thrown away,
// and a redeem (which zeroes the count) carries across as a negative delta
// rather than being undone.
export function applySharedTokens(sheetTokens) {
  const sheet = numTokens(sheetTokens);
  const local = numTokens(readTokens());
  let base = readTokensSent();

  // First run after this shipped: there is no record of what was sent, and
  // assuming "nothing" would add every local token on top of the sheet's copy
  // of those same tokens. Seed the base from local instead — that reproduces
  // the old sheet-wins behaviour exactly once, and every later sync is tracked.
  if (base === null) {
    base = local;
    writeTokensSent(local);
  }

  const emojis = new Set([...Object.keys(sheet), ...Object.keys(local), ...Object.keys(base)]);
  const merged = {};
  for (const emoji of emojis) {
    const value = (sheet[emoji] || 0) + ((local[emoji] || 0) - (base[emoji] || 0));
    if (value > 0) merged[emoji] = value;
  }
  writeTokens(merged);

  // The base has to move to the sheet's copy, not stay where it was. Whatever
  // the sheet just told us is now known-shared, so the only thing that should
  // count as a local delta from here on is what we change next. Leaving the
  // base behind makes the merge re-apply the same difference on every sync:
  // an offline run took 🌿 from 2 to 4 that way, because the 2 the sheet had
  // sent us was still being read back as 2 we had earned.
  writeTokensSent(sheet);

  // Anything left over the sheet's copy is ours and still unsent.
  return [...emojis].some((e) => (merged[e] || 0) !== (sheet[e] || 0));
}

export function readFreikarten() {
  try {
    const raw = localStorage.getItem(FREIKARTE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (_e) { return {}; }
}

export function writeFreikarten(entries) {
  try { localStorage.setItem(FREIKARTE_KEY, JSON.stringify(entries)); } catch (_e) {}
}

export function freikarteCount(token) {
  return readFreikarten()[token] || 0;
}

export function addFreikarte(token) {
  const entries = readFreikarten();
  entries[token] = (entries[token] || 0) + 1;
  writeFreikarten(entries);
  return entries[token];
}

// Spends one Freikarte for `token`. Returns false (and spends nothing) if
// none are available.
export function spendFreikarte(token) {
  const entries = readFreikarten();
  if (!(entries[token] > 0)) return false;
  entries[token] -= 1;
  writeFreikarten(entries);
  return true;
}

// Freikarte reroll record: once a bad day's pull is rerolled, remember which
// category/outcome won so reloading the page reproduces the same result
// instead of recomputing the original (deterministic) niete/cursed pull.
export function readFreikarteReroll(token, day) {
  try {
    const raw = localStorage.getItem(FREIKARTE_REROLL_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return (parsed && typeof parsed === "object" && parsed[`${token}|${day}`]) || null;
  } catch (_e) { return null; }
}

export function writeFreikarteReroll(token, day, record) {
  try {
    const raw = localStorage.getItem(FREIKARTE_REROLL_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const all = parsed && typeof parsed === "object" ? parsed : {};
    all[`${token}|${day}`] = record;
    localStorage.setItem(FREIKARTE_REROLL_KEY, JSON.stringify(all));
  } catch (_e) {}
}

export function readWish() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const val = readPlayerSlot(WISH_KEY, null);
  return val && typeof val === "object" ? val : null;
}

export function writeWish(entry) {
  if (typeof window === "undefined" || !window.localStorage) return;
  writePlayerSlot(WISH_KEY, entry);
}

export function readStreakRestore() {
  const val = readPlayerSlot(STREAK_RESTORE_KEY, {});
  return val && typeof val === "object" && !Array.isArray(val) ? val : {};
}

export function writeStreakRestore(obj) {
  writePlayerSlot(STREAK_RESTORE_KEY, obj);
}

export function readStreakCache() {
  const val = readPlayerSlot(STREAK_CACHE_KEY, 0);
  return typeof val === "number" ? val : parseInt(val, 10) || 0;
}

export function writeStreakCache(n) {
  writePlayerSlot(STREAK_CACHE_KEY, n);
}

export function readSyncedStreak() {
  const val = readPlayerSlot(STREAK_SYNCED_KEY, 0);
  return typeof val === "number" ? val : parseInt(val, 10) || 0;
}

export function writeSyncedStreak(n) {
  writePlayerSlot(STREAK_SYNCED_KEY, n);
}

export function readGipfelbuch() {
  try {
    const raw = window.localStorage.getItem(GIPFELBUCH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) { return []; }
}

export function writeGipfelbuch(entries) {
  try { window.localStorage.setItem(GIPFELBUCH_KEY, JSON.stringify(entries)); } catch (_) {}
}

export function readMissionLog() {
  try {
    const raw = localStorage.getItem(MISSION_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) { return []; }
}

export function writeMissionLog(entries) {
  try { localStorage.setItem(MISSION_LOG_KEY, JSON.stringify(entries)); } catch (_) {}
}

export function readBaerlauchScores() {
  try {
    const raw = localStorage.getItem(BAERLAUCH_SCORE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (_) { return {}; }
}

export function readBaerlauchHistory() {
  try {
    const raw = localStorage.getItem(BAERLAUCH_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) { return []; }
}

export function readQuestState(currentQuestPeriodFn) {
  try {
    const parsed = readPlayerSlot(QUEST_STORAGE_KEY, {});
    const period = currentQuestPeriodFn();
    if (!parsed || parsed.period !== period) return { period, solved: false, attempts: 0, hints: [] };
    return parsed;
  } catch (_e) { return { period: currentQuestPeriodFn(), solved: false, attempts: 0, hints: [] }; }
}

export function writeQuestState(qs) {
  writePlayerSlot(QUEST_STORAGE_KEY, qs);
}

export function readQuestPoints() {
  const val = readPlayerSlot(QUEST_POINTS_KEY, 0);
  return typeof val === "number" ? val : parseInt(val, 10) || 0;
}

export function addQuestPoints(pts) {
  try {
    const total = readQuestPoints() + pts;
    writePlayerSlot(QUEST_POINTS_KEY, total);
    return total;
  } catch (_e) { return pts; }
}

export function writeQuestPoints(total) {
  writePlayerSlot(QUEST_POINTS_KEY, total);
}

export function readMilestones() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(MILESTONE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function writeMilestones(entries) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(MILESTONE_KEY, JSON.stringify(entries));
  } catch (error) {
    /* ignore */
  }
}

export function isMilestoneSeen(token, streak) {
  return readMilestones().includes(`${token}|${streak}`);
}

export function markMilestoneSeen(token, streak) {
  const key = `${token}|${streak}`;
  const seen = readMilestones();
  if (!seen.includes(key)) writeMilestones([...seen, key]);
}

export function isPinUnlocked(_pin) {
  return false;
}

export function persistPinUnlock(_pin) {
  // intentionally not persisted — require unlock every time
}
