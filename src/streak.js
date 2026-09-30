// ── Streak helpers ──────────────────────────────────────────────────────────
import { STREAK_RESTORE_THRESHOLD } from "./constants.js";
import { state } from "./state.js";
import {
  readHistory, writeHistory, readStreakCache, writeStreakCache,
  readSyncedStreak, writeSyncedStreak, readStreakRestore, writeStreakRestore
} from "./storage.js";
import { dateKeyInTimezone, getToken, seededRandom } from "./utils.js";

export { readStreakCache, writeStreakCache, readSyncedStreak, writeSyncedStreak, readStreakRestore, writeStreakRestore };

export function computeStreak() {
  const token = getToken();
  const history = readHistory().filter((e) => e.token === token);
  // No history at all means a fresh device before its first sync — the
  // last number the sheet knew is a better placeholder than 0 for the few
  // seconds until the log arrives and this recomputes from it.
  if (!history.length) return Math.max(readStreakCache(), readSyncedStreak());
  const tz = state.theme?.timezone || "UTC";
  const today = dateKeyInTimezone(tz);
  const pulledDays = new Set(history.map((e) => e.day));

  const [y, m, d] = today.split("-").map(Number);
  let cur = new Date(Date.UTC(y, m - 1, d));

  let dayKey = today;
  if (!pulledDays.has(dayKey)) {
    cur.setUTCDate(cur.getUTCDate() - 1);
    dayKey = cur.toISOString().slice(0, 10);
  }

  let streak = 0;
  while (pulledDays.has(dayKey)) {
    streak++;
    cur.setUTCDate(cur.getUTCDate() - 1);
    dayKey = cur.toISOString().slice(0, 10);
  }
  // The history is the only truth. This used to be max(streak, cache,
  // synced), and both of those were themselves written from this function
  // (or from the sheet, which kept its own max) — so nothing could ever go
  // down, and after a missed day the number stayed frozen at the all-time
  // high. Restored days are real history rows, so they count on their own.
  return streak;
}

export function streakInfo(streak) {
  if (streak <= 0) return null;
  const tagWord = streak === 1 ? "Tag" : "Tage";
  if (streak >= 20) return { emoji: "💎", label: `${streak} ${tagWord}`, tier: 3 };
  if (streak >= 10) return { emoji: "🔥", label: `${streak} ${tagWord}`, tier: 2 };
  if (streak >= 5)  return { emoji: "✨", label: `${streak} ${tagWord}`, tier: 1 };
  return { emoji: "🌱", label: `${streak} ${tagWord}`, tier: 0 };
}

export function boostedCategories(streak) {
  if (streak < 5) return state.outcomes.categories;
  const boosts = streak >= 20
    ? { niete: 0.4, jackpot: 2.0, rare: 1.5, uncommon: 1.3 }
    : streak >= 10
    ? { niete: 0.6, jackpot: 1.5, rare: 1.3, uncommon: 1.2 }
    : { niete: 0.8, jackpot: 1.2, rare: 1.15, uncommon: 1.1 };
  return state.outcomes.categories.map((cat) => ({
    ...cat,
    weight: Math.max(1, Math.round(cat.weight * (boosts[cat.id] || 1)))
  }));
}

// How far back the balancer looks, and how hard it is allowed to lean.
// 45 days is long enough that a 0.5% category has a real expectation in it
// and short enough that last winter's luck stops mattering by spring.
const BALANCE_WINDOW_DAYS = 45;
const BALANCE_MIN_PULLS = 10;
const BALANCE_FACTOR_MIN = 0.5;
const BALANCE_FACTOR_MAX = 1.8;

// Nudges each category's weight toward what this player has actually seen
// lately: a category that came up more often than its odds say gets lighter,
// a starved one gets heavier. Laplace-smoothed ((expected+1)/(observed+1))
// so a 0.24-expected jackpot cannot blow up to infinity on a lucky month,
// and clamped so the correction stays a nudge rather than a guarantee. Only
// entries with a categoryId count, which leaves special days out — they are
// not draws. Below BALANCE_MIN_PULLS there is nothing to correct yet.
export function historyBalancedCategories(cats, token, day) {
  if (!token || !day) return cats;
  // Only real draws count: a special day is recorded with its own
  // categoryId and no odds, so it is neither expected nor observed here.
  const ids = new Set(cats.map((c) => c.id));
  const recent = readHistory()
    .filter((e) => e.token === token && e.day < day && ids.has(e.categoryId))
    .sort((a, b) => b.day.localeCompare(a.day))
    .slice(0, BALANCE_WINDOW_DAYS);
  if (recent.length < BALANCE_MIN_PULLS) return cats;
  const total = cats.reduce((sum, c) => sum + c.weight, 0);
  if (!total) return cats;
  const observed = {};
  for (const e of recent) observed[e.categoryId] = (observed[e.categoryId] || 0) + 1;
  return cats.map((c) => {
    const expected = recent.length * c.weight / total;
    const factor = Math.min(BALANCE_FACTOR_MAX, Math.max(BALANCE_FACTOR_MIN,
      (expected + 1) / ((observed[c.id] || 0) + 1)));
    return { ...c, weight: Math.max(1, Math.round(c.weight * factor)) };
  });
}

export function pickWeightedWithStreak(seedText, streak, excludeIds = [], balance = null) {
  const boosted = boostedCategories(streak);
  const allCats = balance ? historyBalancedCategories(boosted, balance.token, balance.day) : boosted;
  const cats = excludeIds.length ? allCats.filter((c) => !excludeIds.includes(c.id)) : allCats;
  const pool = cats.length ? cats : allCats;
  const total = pool.reduce((sum, cat) => sum + cat.weight, 0);
  const roll = Math.floor(seededRandom(seedText) * total);
  let cursor = 0;
  for (const cat of pool) {
    cursor += cat.weight;
    if (roll < cursor) {
      return state.outcomes.categories.find((c) => c.id === cat.id) || cat;
    }
  }
  return state.outcomes.categories[state.outcomes.categories.length - 1];
}

export function streakRestoresEarned() {
  const r = readStreakRestore();
  return Math.floor((r.maxStreak || 0) / STREAK_RESTORE_THRESHOLD);
}

export function birthdayBonusLeft() {
  const r = readStreakRestore();
  if (r.birthdayBonus2026Used) return 0;
  const tz = state.theme?.timezone || "UTC";
  const today = dateKeyInTimezone(tz);
  return today === "2026-05-29" ? 1 : 0;
}

export function streakRestoresLeft() {
  const r = readStreakRestore();
  return Math.max(0, streakRestoresEarned() - (r.used || 0)) + birthdayBonusLeft();
}

export function streakRestoreGapDay() {
  const token = getToken();
  const tz = state.theme?.timezone || "UTC";
  const today = dateKeyInTimezone(tz);
  const pulled = new Set(
    readHistory().filter((e) => e.token === token && e.day <= today).map((e) => e.day)
  );
  if (!pulled.size) return null;
  const firstDay = [...pulled].sort()[0];

  const [y, m, d] = today.split("-").map(Number);
  const cur = new Date(Date.UTC(y, m - 1, d));
  let key = today;
  if (!pulled.has(key)) {
    cur.setUTCDate(cur.getUTCDate() - 1);
    key = cur.toISOString().slice(0, 10);
  }
  while (pulled.has(key)) {
    cur.setUTCDate(cur.getUTCDate() - 1);
    key = cur.toISOString().slice(0, 10);
  }
  if (key < firstDay) return null;
  return key;
}

export function streakRestoreAvailable() {
  return streakRestoresLeft() > 0 && streakRestoreGapDay() !== null;
}

export function restoreStreak(backupToSheetsFn) {
  if (streakRestoresLeft() <= 0) return null;
  const gapDay = streakRestoreGapDay();
  if (!gapDay) return null;
  const token = getToken();
  const placeholder = {
    day: gapDay,
    token,
    categoryId: "niete",
    categoryLabel: "Streak gerettet",
    tone: "quiet",
    title: "Streak gerettet 💎",
    message: "Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",
    link: null,
    photo: null,
    unlockTime: null,
    revealedAt: new Date(gapDay + "T12:00:00").getTime(),
    restored: true
  };
  const seen = new Set();
  const merged = [placeholder, ...readHistory()]
    .filter((item) => {
      const key = `${item.day}|${item.token}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
  writeHistory(merged);
  const r = readStreakRestore();
  const earnedLeft = Math.max(0, streakRestoresEarned() - (r.used || 0));
  const usingBirthday = earnedLeft === 0 && birthdayBonusLeft() > 0;
  writeStreakRestore({
    ...r,
    used: usingBirthday ? (r.used || 0) : (r.used || 0) + 1,
    birthdayBonus2026Used: usingBirthday ? true : (r.birthdayBonus2026Used || false),
    usedAt: Date.now()
  });
  writeStreakCache(computeStreak());
  if (backupToSheetsFn) backupToSheetsFn();
  return gapDay;
}
