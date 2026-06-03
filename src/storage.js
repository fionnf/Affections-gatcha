// ── All localStorage read/write functions ─────────────────────────────────
import {
  STORAGE_KEY, FAVORITES_KEY, TOKENS_KEY, STREAK_CACHE_KEY, STREAK_SYNCED_KEY,
  STREAK_RESTORE_KEY, WISH_KEY, MILESTONE_KEY,
  BAERLAUCH_SCORE_KEY, BAERLAUCH_HISTORY_KEY, MISSION_LOG_KEY,
  GIPFELBUCH_KEY, QUEST_STORAGE_KEY, QUEST_POINTS_KEY
} from "./constants.js";
import { state } from "./state.js";
import { dateKeyInTimezone } from "./utils.js";

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
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (_e) { return {}; }
}

export function writeTokens(tokens) {
  try { localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens)); } catch (_e) {}
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

export function readWish() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(WISH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    return null;
  }
}

export function writeWish(entry) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(entry));
  } catch (error) {
    /* localStorage unavailable — ignore */
  }
}

export function readStreakRestore() {
  try { return JSON.parse(localStorage.getItem(STREAK_RESTORE_KEY) || "{}") || {}; }
  catch (_) { return {}; }
}

export function writeStreakRestore(obj) {
  try { localStorage.setItem(STREAK_RESTORE_KEY, JSON.stringify(obj)); } catch (_) {}
}

export function readStreakCache() {
  try { return parseInt(localStorage.getItem(STREAK_CACHE_KEY) || "0", 10) || 0; } catch (_) { return 0; }
}

export function writeStreakCache(n) {
  try { localStorage.setItem(STREAK_CACHE_KEY, String(n)); } catch (_) {}
}

export function readSyncedStreak() {
  try { return parseInt(localStorage.getItem(STREAK_SYNCED_KEY) || "0", 10) || 0; } catch (_) { return 0; }
}

export function writeSyncedStreak(n) {
  try { localStorage.setItem(STREAK_SYNCED_KEY, String(n)); } catch (_) {}
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
    const raw = localStorage.getItem(QUEST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const period = currentQuestPeriodFn();
    if (parsed.period !== period) return { period, solved: false, attempts: 0, hints: [] };
    return parsed;
  } catch (_e) { return { period: currentQuestPeriodFn(), solved: false, attempts: 0, hints: [] }; }
}

export function writeQuestState(qs) {
  try { localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(qs)); } catch (_e) {}
}

export function readQuestPoints() {
  try { return parseInt(localStorage.getItem(QUEST_POINTS_KEY) || "0", 10); } catch (_e) { return 0; }
}

export function addQuestPoints(pts) {
  try {
    const total = readQuestPoints() + pts;
    localStorage.setItem(QUEST_POINTS_KEY, String(total));
    return total;
  } catch (_e) { return pts; }
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

export function isPinUnlocked(pin) {
  try { return localStorage.getItem("affektions-gacha:pin-unlock:" + pin) === "1"; } catch (_) { return false; }
}

export function persistPinUnlock(pin) {
  try { localStorage.setItem("affektions-gacha:pin-unlock:" + pin, "1"); } catch (_) {}
}
