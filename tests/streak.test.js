import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { computeStreak, boostedCategories, pickWeightedWithStreak, historyBalancedCategories } = await import("../src/streak.js");
const { writeHistory, writeStreakCache, writeSyncedStreak } = await import("../src/storage.js");
const { dateKeyInTimezone } = await import("../src/utils.js");

const TZ = "Europe/Zurich";
state.theme = { secret: TEST_SECRET, timezone: TZ };

// Walk back N days from today's Zurich date key, staying in pure date math.
function zurichDay(offset) {
  const today = dateKeyInTimezone(TZ);
  const [y, m, d] = today.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + offset));
  return dt.toISOString().slice(0, 10);
}

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.syncedHistory = null;
});

test("streak counts consecutive days back from today", () => {
  writeHistory([0, -1, -2].map((off) => ({
    day: zurichDay(off), token: "lennart", categoryId: "common", title: `T${off}`, message: "m",
  })));
  assert.equal(computeStreak(), 3);
});

test("a gap breaks the streak", () => {
  writeHistory([0, -1, -3, -4].map((off) => ({
    day: zurichDay(off), token: "lennart", categoryId: "common", title: `T${off}`, message: "m",
  })));
  assert.equal(computeStreak(), 2);
});

test("not having pulled today yet keeps yesterday's streak alive", () => {
  writeHistory([-1, -2].map((off) => ({
    day: zurichDay(off), token: "lennart", categoryId: "common", title: `T${off}`, message: "m",
  })));
  assert.equal(computeStreak(), 2);
});

test("the other player's pulls never count toward this player's streak", () => {
  writeHistory([
    { day: zurichDay(0), token: "fionn", categoryId: "common", title: "F", message: "m" },
    { day: zurichDay(-1), token: "lennart", categoryId: "common", title: "L", message: "m" },
  ]);
  assert.equal(computeStreak(), 1);
});

test("streak boosts shrink Niete weight and never remove a category", () => {
  state.outcomes = { categories: [
    { id: "niete", label: "Niete", weight: 100, tone: "quiet", outcomes: [{ title: "N", message: "n" }] },
    { id: "jackpot", label: "JACKPOT", weight: 30, tone: "jackpot", outcomes: [{ title: "J", message: "j" }] },
  ]};
  const base = boostedCategories(0);
  const boosted = boostedCategories(20);
  assert.equal(base.length, boosted.length);
  const nieteBase = base.find((c) => c.id === "niete").weight;
  const nieteBoosted = boosted.find((c) => c.id === "niete").weight;
  const jackpotBoosted = boosted.find((c) => c.id === "jackpot").weight;
  assert.ok(nieteBoosted < nieteBase, "Niete must shrink at high streak");
  assert.ok(jackpotBoosted > 30, "JACKPOT must grow at high streak");
});

test("excludeIds in pickWeightedWithStreak really excludes", () => {
  state.outcomes = { categories: [
    { id: "niete", label: "Niete", weight: 1000, tone: "quiet", outcomes: [{ title: "N", message: "n" }] },
    { id: "common", label: "Gewöhnlich", weight: 1, tone: "soft", outcomes: [{ title: "A", message: "a" }] },
  ]};
  for (let i = 0; i < 40; i++) {
    const cat = pickWeightedWithStreak(`seed-${i}`, 0, ["niete"]);
    assert.equal(cat.id, "common", "heavily-weighted excluded category must never be picked");
  }
});

test("history balancing starves a flooded category and feeds a starved one, within clamps", () => {
  const cats = [
    { id: "photo",   label: "Foto",    weight: 520, tone: "photo",   outcomes: [{ title: "P", message: "p" }] },
    { id: "common",  label: "Gew.",    weight: 270, tone: "soft",    outcomes: [{ title: "C", message: "c" }] },
    { id: "jackpot", label: "JACKPOT", weight: 8,   tone: "jackpot", outcomes: [{ title: "J", message: "j" }] },
  ];
  // 30 recent days: 2 photos where ~20 were due, 5 jackpots where ~0.3 were due.
  const hist = [];
  for (let i = 1; i <= 30; i++) {
    const categoryId = i <= 2 ? "photo" : i <= 7 ? "jackpot" : "common";
    hist.push({ day: zurichDay(-i), token: "lennart", categoryId, title: "x", message: "m" });
  }
  writeHistory(hist);
  const out = Object.fromEntries(historyBalancedCategories(cats, "lennart", zurichDay(0)).map((c) => [c.id, c.weight]));
  assert.equal(out.photo, Math.round(520 * 1.8), "starved photo hits the upper clamp");
  assert.equal(out.jackpot, 4, "five jackpots in a month halves the weight (lower clamp)");
  assert.equal(out.common, 135, "23 of 30 where ~10 were due: pinned to the lower clamp, never below");
});

test("history balancing is inert below ten recorded pulls and ignores special days", () => {
  const cats = [{ id: "photo", label: "Foto", weight: 520, tone: "photo", outcomes: [{ title: "P", message: "p" }] }];
  writeHistory([
    ...Array.from({ length: 6 }, (_, i) => ({ day: zurichDay(-1 - i), token: "lennart", categoryId: "photo", title: "x", message: "m" })),
    ...Array.from({ length: 20 }, (_, i) => ({ day: zurichDay(-10 - i), token: "lennart", categoryId: "special", title: "s", message: "m" })),
  ]);
  // 26 entries, but only 6 are draws (special days carry no odds) — not enough.
  const out = historyBalancedCategories(cats, "lennart", zurichDay(0));
  assert.equal(out[0].weight, 520);
});

test("a missed day resets the streak even when the cache and the sheet remember a bigger number", () => {
  // The bug on the phone: cache and synced value were floors, so after a
  // gap the display stayed at the all-time high for good.
  writeStreakCache(23);
  writeSyncedStreak(23);
  writeHistory([
    { day: zurichDay(0),  token: "lennart", categoryId: "common", title: "t", message: "m" },
    { day: zurichDay(-1), token: "lennart", categoryId: "common", title: "y", message: "m" },
    // zurichDay(-2) missing — the gap
    { day: zurichDay(-3), token: "lennart", categoryId: "common", title: "x", message: "m" },
  ]);
  assert.equal(computeStreak(), 2, "two consecutive days is two, whatever the cache says");
});

test("with no history yet, the sheet's last number stands in until the log arrives", () => {
  writeStreakCache(0);
  writeSyncedStreak(9);
  writeHistory([]);
  assert.equal(computeStreak(), 9);
});
