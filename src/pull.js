// ── Pull building ─────────────────────────────────────────────────────────────
import { state, $ } from "./state.js";
import { getToken, seededIndex, getPreviewDay, getPreviewCategory, dateKeyInTimezone } from "./utils.js";
import { readHistory, readFreikarteReroll } from "./storage.js";
import { computeStreak, pickWeightedWithStreak } from "./streak.js";

export function checkSpecialDay(day) {
  const days = Array.isArray(state.specialDays && state.specialDays.days) ? state.specialDays.days : [];
  const mmdd = day.slice(5); // "MM-DD" from "YYYY-MM-DD"
  for (const entry of days) {
    if (entry.date === day || entry.date === mmdd) return entry;
  }
  return null;
}

export function emojiForTone(tone) {
  const map = {
    quiet: "🌙",
    soft: "🌿",
    quest: "🧭",
    warm: "✨",
    cursed: "😈",
    rare: "💫",
    photo: "📸",
    jackpot: "🎰"
  };
  return map[tone] || "❤️";
}

export function setCapsuleTone(tone) {
  const capsule = $("[data-capsule]");
  if (!capsule) return;
  const colors = {
    quiet: "linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",
    soft: "linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",
    quest: "linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",
    warm: "linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",
    cursed: "linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",
    rare: "linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",
    photo: "linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",
    jackpot: "linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"
  };
  capsule.style.background = colors[tone] || colors.soft;
}

export function imagePhotos() {
  return (state.photos || []).filter((p) => p.type !== "video");
}

export function buildPullForDay(day, streak, opts = {}) {
  const { excludeCategoryIds = [], seedSuffix = "" } = opts;
  const token = getToken();
  const baseSeed = `${state.theme.secret}|${token}|${day}${seedSuffix ? "|" + seedSuffix : ""}`;

  const special = checkSpecialDay(day);
  if (special && !seedSuffix) {
    const specialOutcomes = Array.isArray(special.outcomes) && special.outcomes.length
      ? special.outcomes
      : [{ title: special.label, message: "" }];
    const outcome = specialOutcomes[seededIndex(`${baseSeed}|special|outcome`, specialOutcomes.length)];
    const category = {
      id: "special",
      label: special.label,
      weight: 0,
      tone: special.tone || "jackpot",
      outcomes: specialOutcomes
    };
    const specialPhoto = (special.photoAlt && state.photos.length)
      ? (imagePhotos().find((p) => p.alt === special.photoAlt) || null)
      : null;
    return { day, token, category, outcome, photo: specialPhoto, unlockTime: special.unlockTime || null };
  }

  // A Freikarte reroll already happened for this day — reproduce the same
  // result on every subsequent call (e.g. after a page reload) instead of
  // recomputing the original deterministic (and now-discarded) pull.
  const rerollRecord = !seedSuffix ? readFreikarteReroll(token, day) : null;

  let category;
  if (rerollRecord) {
    category = state.outcomes.categories.find((c) => c.id === rerollRecord.categoryId);
  }
  if (!category) {
    category = pickWeightedWithStreak(`${baseSeed}|category`, streak || 0, excludeCategoryIds);
  }

  const previewCategory = getPreviewCategory();
  if (previewCategory) {
    const forced = state.outcomes.categories.find((c) => c.id === previewCategory);
    if (forced) category = forced;
  }

  if (category.id === "photo" && !imagePhotos().length) {
    category = state.outcomes.categories.find((item) => item.id === "common") || category;
  }

  const usedTitles = new Set(
    readHistory()
      .filter((e) => e.token === token && e.day < day && e.categoryId === category.id)
      .map((e) => e.title)
  );
  const availableOutcomes = category.outcomes.filter((o) => !usedTitles.has(o.title));
  const outcomePool = availableOutcomes.length > 0 ? availableOutcomes : category.outcomes;
  const outcome = (rerollRecord && category.outcomes.find((o) => o.title === rerollRecord.outcomeTitle))
    || outcomePool[seededIndex(`${baseSeed}|${category.id}|outcome`, outcomePool.length)];

  const imgs = imagePhotos();
  let photo = null;
  if (category.id === "photo" && imgs.length) {
    const seenUrls = new Set(
      readHistory()
        .filter((e) => e.token === token && e.day < day && e.photo)
        .map((e) => e.photo.url)
    );
    const unseenImgs = imgs.filter((p) => !seenUrls.has(p.url));
    const pool = unseenImgs.length > 0 ? unseenImgs : imgs;
    photo = pool[seededIndex(`${baseSeed}|photo`, pool.length)];
  }

  return {
    day, token, category, outcome, photo,
    collectToken: outcome.token || null,
    voucher: outcome.voucher || false,
    freikarte: outcome.freikarte === true
  };
}

export function buildPull() {
  const day = getPreviewDay() || dateKeyInTimezone(state.theme.timezone);
  const streak = computeStreak();
  return buildPullForDay(day, streak);
}

// Rerolls today's pull excluding Niete/Verflucht, for spending a Freikarte
// on a bad day. Deterministic per day (a Freikarte redemption always lands
// on the same alternate result), independent of the original pull's seed.
export function rerollPullForDay(day, streak) {
  return buildPullForDay(day, streak, { excludeCategoryIds: ["niete", "cursed"], seedSuffix: "freikarte" });
}
