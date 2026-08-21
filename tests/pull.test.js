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

test("a bare MM-DD date does not fire unless it opts into repeating", () => {
  // Most special days are written for one occasion. A bare "MM-DD" used to
  // recur forever purely because of how the date was typed, so a capsule about
  // a specific trip would resurface twelve months later reading like nonsense.
  // Recurrence is now opt-in, and validate-gacha-config rejects a bare date
  // without the flag — this covers the app half of that guarantee.
  state.specialDays = { days: [
    { date: "08-10", label: "Testtag", tone: "warm",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  assert.notEqual(buildPullForDay("2026-08-10", 0).category.id, "special",
    "a bare MM-DD without repeat:yearly must not fire at all");
});

test("repeat:yearly brings a MM-DD date back every year", () => {
  state.specialDays = { days: [
    { date: "05-29", label: "Geburtstag", tone: "jackpot", repeat: "yearly",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  for (const year of ["2026", "2027", "2031"]) {
    assert.equal(buildPullForDay(`${year}-05-29`, 0).category.id, "special",
      `birthday must fire in ${year}`);
  }
  assert.notEqual(buildPullForDay("2026-05-30", 0).category.id, "special",
    "the day after is an ordinary day");
});

test("repeat:yearly on a full date still fires only that year", () => {
  // The validator calls this combination an error, but the app should not
  // start recurring a dated entry if one slips through by hand.
  state.specialDays = { days: [
    { date: "2026-08-10", label: "Testtag", tone: "warm", repeat: "yearly",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  assert.equal(buildPullForDay("2026-08-10", 0).category.id, "special");
  assert.notEqual(buildPullForDay("2027-08-10", 0).category.id, "special",
    "a dated entry must not recur even when flagged yearly");
});

test("a special day can hand out a Sammeltoken", () => {
  // The special branch returns early, and it used to build its result without
  // collectToken — so a token written into special-days.json was accepted by
  // the validator, rendered nowhere, and never credited.
  state.specialDays = { days: [
    { date: "2026-08-12", label: "Testtag", tone: "jackpot",
      outcomes: [{ title: "S1", message: "s1", token: "⭐" }] },
  ]};
  assert.equal(buildPullForDay("2026-08-12", 0).collectToken, "⭐");

  state.specialDays = { days: [
    { date: "2026-08-12", label: "Testtag", tone: "jackpot",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  assert.equal(buildPullForDay("2026-08-12", 0).collectToken, null,
    "a special day without a token must not invent one");
});

test("a special day can be addressed to one player", () => {
  state.specialDays = { days: [
    { date: "2026-08-12", label: "Nur für Lennart", tone: "jackpot", player: "lennart",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  assert.equal(buildPullForDay("2026-08-12", 0).category.id, "special");
  env.setSearch("?player=fionn");
  assert.notEqual(buildPullForDay("2026-08-12", 0).category.id, "special",
    "an entry addressed to Lennart must not fire in Fionn's app");

  // No "player" key means both, which is what every pre-existing entry relies on.
  state.specialDays = { days: [
    { date: "2026-08-12", label: "Für beide", tone: "warm",
      outcomes: [{ title: "S1", message: "s1" }] },
  ]};
  assert.equal(buildPullForDay("2026-08-12", 0).category.id, "special");
  env.setSearch("?player=lennart");
  assert.equal(buildPullForDay("2026-08-12", 0).category.id, "special");
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
