// ── Pull building ─────────────────────────────────────────────────────────────
import { state, $ } from "./state.js";
import { getToken, seededIndex, getPreviewDay, getPreviewCategory, dateKeyInTimezone, isVoucherEntry } from "./utils.js";
import { readHistory, readFreikarteReroll } from "./storage.js";
import { computeStreak, pickWeightedWithStreak } from "./streak.js";

export function checkSpecialDay(day) {
  const days = Array.isArray(state.specialDays && state.specialDays.days) ? state.specialDays.days : [];
  const mmdd = day.slice(5); // "MM-DD" from "YYYY-MM-DD"
  const player = getToken();
  for (const entry of days) {
    // A bare "MM-DD" only recurs when the entry says so. Most special days are
    // written for one occasion and read wrong a year later, so recurrence is
    // opt-in via "repeat": "yearly" rather than a side effect of how the date
    // happened to be typed. validate-gacha-config rejects a bare date without it.
    const recurs = entry.repeat === "yearly";
    const matches = entry.date === day || (recurs && entry.date === mmdd);
    if (!matches) continue;
    // "player" is kept as an optional scope so an entry can be addressed to
    // one token (always "lennart" now). An entry without it goes to everybody.
    if (entry.player && entry.player !== player) continue;
    return entry;
  }
  return null;
}

// JACKPOT is one draw in two hundred; the balancer can lean it to about one
// in a hundred but never promises it. This does: a player with 270 recorded
// draws and no jackpot among them gets one. Special days are not draws and
// do not count, and a player with fewer than 270 draws is simply new.
const JACKPOT_PITY_DRAWS = 270;
export function jackpotPityDue(token, day) {
  const draws = readHistory()
    .filter((e) => e.token === token && e.day < day && typeof e.categoryId === "string" && e.categoryId !== "special")
    .sort((a, b) => b.day.localeCompare(a.day))
    .slice(0, JACKPOT_PITY_DRAWS);
  if (draws.length < JACKPOT_PITY_DRAWS) return false;
  return !draws.some((e) => e.categoryId === "jackpot");
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

// How many unredeemed vouchers may be open before new ones are held back.
export const OPEN_VOUCHER_CAP = 4;
export function openVoucherCount(token, day) {
  return readHistory().filter((e) => e.token === token && e.day < day && isVoucherEntry(e) && !e.used).length;
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
    // An inline "photo" beats photoAlt: photos.json is regenerated wholesale
    // by the shared-album sync ("manual edits will be overwritten"), so a
    // capsule that must show one specific picture carries it itself, with the
    // file committed under media/ where the sync never reaches.
    const specialPhoto = (special.photo && special.photo.url)
      ? { type: "image", ...special.photo }
      : (special.photoAlt && state.photos.length)
        ? (imagePhotos().find((p) => p.alt === special.photoAlt) || null)
        : null;
    // collectToken is threaded through here so a special day can hand out a
    // Sammeltoken like any other capsule. The ordinary return below builds it
    // from outcome.token; this branch returns early and used to drop it, so a
    // token written into special-days.json was silently ignored.
    return {
      day, token, category, outcome,
      photo: specialPhoto,
      collectToken: outcome.token || null,
      unlockTime: special.unlockTime || null,
      // A capsule on a trip unlocks on the trip's clock, not Zurich's — the
      // written time is what their phones show where they are.
      unlockTimezone: special.unlockTimezone || null
    };
  }

  // A Freikarte reroll already happened for this day — reproduce the same
  // result on every subsequent call (e.g. after a page reload) instead of
  // recomputing the original deterministic (and now-discarded) pull.
  const rerollRecord = !seedSuffix ? readFreikarteReroll(token, day) : null;

  // The day's record, if it was already opened. It pins the category below,
  // and the outcome further down.
  const drawn = !seedSuffix ? readHistory().find((e) => e.token === token && e.day === day) : null;

  let category;
  if (rerollRecord) {
    category = state.outcomes.categories.find((c) => c.id === rerollRecord.categoryId);
  }
  // Weights are not constant for a day: the streak boost steps at 5/10/20,
  // and today's draw is what pushes the streak over the step — so the same
  // seed rolled before and after the draw can land in different categories.
  // The history balancer makes weights depend on the log outright. Either
  // way, the capsule that was opened is the capsule; the record wins over a
  // recomputation. (The reroll path skips this: its record is the original
  // pull, not the rerolled one.)
  if (!category && drawn && drawn.categoryId) {
    category = state.outcomes.categories.find((c) => c.id === drawn.categoryId) || null;
  }
  if (!category) {
    category = pickWeightedWithStreak(`${baseSeed}|category`, streak || 0, excludeCategoryIds, { token, day });
    if (!seedSuffix && jackpotPityDue(token, day)) {
      category = state.outcomes.categories.find((c) => c.id === "jackpot") || category;
    }
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
  const unseen = category.outcomes.filter((o) => !usedTitles.has(o.title));
  // Nothing comes back until the whole category is used up.
  let outcomePool = unseen.length ? unseen : category.outcomes;

  // Vouchers pile up: a Gutschein is only worth something once it is used,
  // and a stack of open ones turns each new one into noise. With OPEN_VOUCHER_CAP
  // of them unredeemed, voucher capsules step aside for the plain texts in the
  // same category — the odds between categories are untouched, only which
  // text comes out. Once some are used the vouchers come back on their own.
  // A day already opened is pinned above (alreadyDrawn), so the cap can never
  // rewrite a card that was seen.
  if (!seedSuffix && openVoucherCount(token, day) >= OPEN_VOUCHER_CAP) {
    const plain = outcomePool.filter((o) => o.voucher !== true);
    if (plain.length) outcomePool = plain;
  }

  // Seeding picks by index, so a pool that grows or shrinks re-rolls every
  // day that still uses it — including today, which the player may already
  // have opened. If this day is already in the history under the same
  // category, the recorded title wins, looked up in the config so pins,
  // prompts and vouchers still come from the source rather than being
  // reconstructed from the log.
  const alreadyDrawn = drawn && drawn.categoryId === category.id
    ? category.outcomes.find((o) => o.title === drawn.title)
    : null;

  const outcome = alreadyDrawn
    || (rerollRecord && category.outcomes.find((o) => o.title === rerollRecord.outcomeTitle))
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
