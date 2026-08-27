// ── Pull building ─────────────────────────────────────────────────────────────
import { state, $ } from "./state.js";
import { getToken, seededIndex, getPreviewDay, getPreviewCategory, dateKeyInTimezone } from "./utils.js";
import { readHistory, readFreikarteReroll } from "./storage.js";
import { computeStreak, pickWeightedWithStreak } from "./streak.js";
import { werkstattFor } from "./werkstatt.js";

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
    // Special days were written when Lennart's app was the only one. Now that
    // Fionn draws too, a capsule addressed to one of them would otherwise show
    // up in both apps. An entry with no "player" still goes to everybody, so
    // every existing entry keeps its current behaviour.
    if (entry.player && entry.player !== player) continue;
    return entry;
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

// The capsules a category actually offers this player. A category that the
// other player has hand-written capsules for (Kapsel-Werkstatt) is taken over
// by them entirely; everything else keeps the shipped pool from
// config/outcomes.json.
export function poolForCategory(category, token) {
  const written = werkstattFor(category.id, token);
  return written.length ? written : category.outcomes;
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

  const categoryPool = poolForCategory(category, token);

  const usedTitles = new Set(
    readHistory()
      .filter((e) => e.token === token && e.day < day && e.categoryId === category.id)
      .map((e) => e.title)
  );
  const unseen = (list) => list.filter((o) => !usedTitles.has(o.title));

  // Same promise as the shipped pool: nothing comes back until the pool is
  // used up. But a hand-written pool is small — often a single capsule — so
  // exhausting it must not mean handing back that same capsule every time
  // the category comes up. Once the written ones are spent, fall through to
  // the shipped outcomes this player hasn't seen, and only start repeating
  // when the whole category really is exhausted. When nothing is written,
  // both branches are the same list, so this is a no-op for Lennart.
  const unseenWritten = unseen(categoryPool);
  const unseenShipped = unseenWritten.length ? [] : unseen(category.outcomes);
  const outcomePool = unseenWritten.length ? unseenWritten
    : unseenShipped.length ? unseenShipped
    : categoryPool;

  // Seeding picks by index, so a pool that grows or shrinks re-rolls every
  // day that still uses it — including today, which the player may already
  // have opened. That was survivable while pools only changed on a deploy;
  // now that capsules are written live from a phone it isn't. If this day is
  // already in the history under the same category, the recorded title wins,
  // looked up in the current pool so pins, prompts and vouchers still come
  // from config rather than being reconstructed from the log.
  // The lookup spans both pools on purpose. The first capsule written for a
  // category evicts the shipped ones, so searching only the current pool
  // would fail to find a shipped outcome that was opened this morning —
  // exactly the case this guards against.
  const drawn = readHistory().find((e) => e.token === token && e.day === day);
  const alreadyDrawn = drawn && drawn.categoryId === category.id
    ? (categoryPool.find((o) => o.title === drawn.title)
       || category.outcomes.find((o) => o.title === drawn.title))
    : null;

  const outcome = alreadyDrawn
    || (rerollRecord && categoryPool.find((o) => o.title === rerollRecord.outcomeTitle))
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
