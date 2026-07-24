import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, outcomesFixture, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { buildPullForDay, rerollPullForDay } = await import("../src/pull.js");
const { writeHistory } = await import("../src/storage.js");

state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
state.outcomes = outcomesFixture();
state.specialDays = { days: [] };
state.photos = [];

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.syncedHistory = null;
  state.specialDays = { days: [] };
});

test("same day + token + secret always produces the same pull", () => {
  for (let i = 1; i <= 12; i++) {
    const day = `2026-08-${String(i).padStart(2, "0")}`;
    const a = buildPullForDay(day, 0);
    const b = buildPullForDay(day, 0);
    assert.equal(a.category.id, b.category.id, `category differs on ${day}`);
    assert.equal(a.outcome.title, b.outcome.title, `outcome differs on ${day}`);
  }
});

test("players get independent pulls from the same day", () => {
  const day = "2026-08-05";
  const lennart = buildPullForDay(day, 0);
  env.setSearch("?player=fionn");
  const fionnA = buildPullForDay(day, 0);
  const fionnB = buildPullForDay(day, 0);
  // Fionn's pull is deterministic too, seeded by his own token — it must not
  // depend on (or equal, by construction rather than chance) Lennart's seed.
  assert.equal(fionnA.outcome.title, fionnB.outcome.title);
  assert.equal(lennart.token, "lennart");
  assert.equal(fionnA.token, "fionn");
});

test("anti-repeat: a category never repeats a title before exhausting the pool", () => {
  env.setSearch("?player=lennart&preview-category=common");
  writeHistory([
    { day: "2026-08-01", token: "lennart", categoryId: "common", title: "A", message: "a" },
    { day: "2026-08-02", token: "lennart", categoryId: "common", title: "B", message: "b" },
  ]);
  const pull = buildPullForDay("2026-08-03", 0);
  assert.equal(pull.category.id, "common");
  assert.equal(pull.outcome.title, "C", "only unused title must be picked");
});

test("anti-repeat: exhausted pool falls back to the full category, never throws", () => {
  env.setSearch("?player=lennart&preview-category=common");
  writeHistory([
    { day: "2026-08-01", token: "lennart", categoryId: "common", title: "A", message: "a" },
    { day: "2026-08-02", token: "lennart", categoryId: "common", title: "B", message: "b" },
    { day: "2026-08-03", token: "lennart", categoryId: "common", title: "C", message: "c" },
  ]);
  const pull = buildPullForDay("2026-08-04", 0);
  assert.ok(["A", "B", "C"].includes(pull.outcome.title));
});

test("special day (full date) overrides the weighted pull exactly once", () => {
  state.specialDays = { days: [
    { date: "2026-08-10", label: "Testtag", tone: "warm",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  const onDay = buildPullForDay("2026-08-10", 0);
  assert.equal(onDay.category.id, "special");
  assert.equal(onDay.outcome.title, "S1");
  const nextYear = buildPullForDay("2027-08-10", 0);
  assert.notEqual(nextYear.category.id, "special", "YYYY-MM-DD date must not recur");
});

test("Freikarte reroll never lands on Niete or Verflucht", () => {
  for (let i = 1; i <= 28; i++) {
    const day = `2026-09-${String(i).padStart(2, "0")}`;
    const rerolled = rerollPullForDay(day, 0);
    assert.ok(
      rerolled.category.id !== "niete" && rerolled.category.id !== "cursed",
      `reroll on ${day} landed on ${rerolled.category.id}`
    );
  }
});
