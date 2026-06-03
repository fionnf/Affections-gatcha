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
  if (!history.length) return 0;
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
  return Math.max(streak, readStreakCache(), readSyncedStreak());
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

export function pickWeightedWithStreak(seedText, streak) {
  const cats = boostedCategories(streak);
  const total = cats.reduce((sum, cat) => sum + cat.weight, 0);
  const roll = Math.floor(seededRandom(seedText) * total);
  let cursor = 0;
  for (const cat of cats) {
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
