import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { computeStreak, boostedCategories, pickWeightedWithStreak } = await import("../src/streak.js");
const { writeHistory } = await import("../src/storage.js");
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
