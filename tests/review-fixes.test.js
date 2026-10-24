import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, outcomesFixture, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { buildPullForDay, currentRound } = await import("../src/pull.js");
const { recordHistoryEntry } = await import("../src/render.js");
const { syncFromSheets } = await import("../src/sync.js");
const { readHistory, writeHistory, readTokens, writeTokens, resetToken, writeFreikarteReroll } = await import("../src/storage.js");
const { dateKeyInTimezone, setDayStartHour, currentWeekKey } = await import("../src/utils.js");
const { configKurse } = await import("../src/kurs.js");

state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
state.outcomes = outcomesFixture();
state.specialDays = { days: [] };
state.photos = [];

let _nextPayload = null;
globalThis.fetch = async () => ({ ok: true, json: async () => _nextPayload });

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.syncedHistory = null;
  state.specialDays = { days: [] };
  state.photos = [];
  state.backup = undefined;
  setDayStartHour(0);
});

test("replaying today's capsule keeps what happened to its record since", () => {
  const day = "2026-08-10";
  const pull = buildPullForDay(day, 0);
  recordHistoryEntry(pull);
  const first = readHistory()[0];
  writeHistory([{ ...first, reaction: "🥹", used: true, usedAt: day, pfand: true, bestanden: true, promptAnswer: "ja", weather: { t: 3, c: 0, e: "☀️" } }]);

  recordHistoryEntry({ ...pull, promptAnswer: null, weather: null });
  const after = readHistory();
  assert.equal(after.length, 1);
  assert.equal(after[0].reaction, "🥹");
  assert.equal(after[0].used, true);
  assert.equal(after[0].pfand, true);
  assert.equal(after[0].bestanden, true);
  assert.equal(after[0].promptAnswer, "ja");
  assert.deepEqual(after[0].weather, { t: 3, c: 0, e: "☀️" });
  assert.equal(after[0].revealedAt, first.revealedAt, "the first-opened time stays");
});

test("anti-repeat starts a new round once a category is used up", () => {
  assert.deepEqual([...currentRound(["A", "B"], ["A", "B", "C"])].sort(), ["A", "B"]);
  // A, B, C closes a round; C carries into the next so it cannot come twice in a row.
  assert.deepEqual([...currentRound(["A", "B", "C"], ["A", "B", "C"])], ["C"]);
  assert.deepEqual([...currentRound(["A", "B", "C", "A"], ["A", "B", "C"])].sort(), ["A", "C"]);
  // Titles no longer in the config do not count.
  assert.deepEqual([...currentRound(["X", "A"], ["A", "B"])], ["A"]);

  env.setSearch("?player=lennart&preview-category=common");
  writeHistory([
    { day: "2026-08-01", token: "lennart", categoryId: "common", title: "A" },
    { day: "2026-08-02", token: "lennart", categoryId: "common", title: "B" },
    { day: "2026-08-03", token: "lennart", categoryId: "common", title: "C" },
    { day: "2026-08-04", token: "lennart", categoryId: "common", title: "A" },
  ]);
  const pull = buildPullForDay("2026-08-05", 0);
  assert.equal(pull.outcome.title, "B", "second round: only B is left");
});

test("an opened Foto-Drop keeps its photo when the album grows", () => {
  state.outcomes = {
    categories: [{ id: "photo", label: "Foto", weight: 1, tone: "photo", outcomes: [{ title: "P", message: "p" }] }]
  };
  try {
    state.photos = [{ url: "u1" }, { url: "u2" }, { url: "u3" }];
    const day = "2026-08-10";
    const pull = buildPullForDay(day, 0);
    recordHistoryEntry(pull);
    state.photos = [{ url: "u0" }, { url: "u1" }, { url: "u2" }, { url: "u3" }, { url: "u4" }, { url: "u5" }];
    assert.equal(buildPullForDay(day, 0).photo.url, pull.photo.url);
  } finally {
    state.outcomes = outcomesFixture();
  }
});

test("a special day added after the capsule was opened does not replace it", () => {
  const day = "2026-08-10";
  const pull = buildPullForDay(day, 0);
  recordHistoryEntry(pull);
  state.specialDays = { days: [{ date: day, label: "Spezial", outcomes: [{ title: "S", message: "s" }] }] };
  assert.equal(buildPullForDay(day, 0).outcome.title, pull.outcome.title);
  env.localStorage.clear();
  assert.equal(buildPullForDay(day, 0).category.id, "special", "an unopened day still gets it");
});

test("redeeming a token reward keeps the surplus", () => {
  writeTokens({ "🌿": 8 });
  resetToken("🌿", 6);
  assert.equal(readTokens()["🌿"] || 0, 2);
  resetToken("🌿");
  assert.equal(readTokens()["🌿"] || 0, 0);
});

test("sync keeps a redeemed voucher redeemed and a Freikarte reroll rerolled", async () => {
  state.theme = { secret: TEST_SECRET, timezone: "UTC" };
  state.backup = { enabled: true, endpointUrl: "https://backend.test/exec" };
  try {
    writeHistory([
      { day: "2026-07-01", token: "lennart", categoryId: "rare", title: "R1", used: true, usedAt: "2026-07-02" },
      { day: "2026-07-03", token: "lennart", categoryId: "common", title: "B", promptAnswer: "x" },
    ]);
    writeFreikarteReroll("lennart", "2026-07-03", { categoryId: "common", outcomeTitle: "B" });
    _nextPayload = { ok: true, history: [
      { day: "2026-07-01", token: "lennart", categoryId: "rare", title: "R1", used: false },
      { day: "2026-07-03", token: "lennart", categoryId: "niete", title: "N1" },
    ] };
    await syncFromSheets();
    const byDay = Object.fromEntries(readHistory().map((e) => [e.day, e]));
    assert.equal(byDay["2026-07-01"].used, true);
    assert.equal(byDay["2026-07-01"].usedAt, "2026-07-02");
    assert.equal(byDay["2026-07-03"].categoryId, "common");
    assert.equal(byDay["2026-07-03"].title, "B");
    assert.equal(byDay["2026-07-03"].promptAnswer, "x");
  } finally {
    state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
  }
});

test("the day starts at dayStartHour on the wall clock, DST days included", () => {
  setDayStartHour(4);
  const tz = "Europe/Zurich";
  // Spring forward: 04:30 CEST is the new day, 03:59 CEST is not.
  assert.equal(dateKeyInTimezone(tz, new Date("2026-03-29T02:30:00Z")), "2026-03-29");
  assert.equal(dateKeyInTimezone(tz, new Date("2026-03-29T01:59:00Z")), "2026-03-28");
  // Fall back: 03:30 CET is still the old day, 04:00 CET the new one.
  assert.equal(dateKeyInTimezone(tz, new Date("2026-10-25T02:30:00Z")), "2026-10-24");
  assert.equal(dateKeyInTimezone(tz, new Date("2026-10-25T03:00:00Z")), "2026-10-25");
  // Month and year boundaries.
  assert.equal(dateKeyInTimezone(tz, new Date("2026-03-01T01:00:00Z")), "2026-02-28");
  assert.equal(dateKeyInTimezone(tz, new Date("2026-01-01T02:00:00Z")), "2025-12-31");
});

test("the week key follows the app's timezone", () => {
  assert.match(currentWeekKey("Europe/Zurich"), /^\d{4}-W\d{2}$/);
  assert.equal(currentWeekKey("UTC"), currentWeekKey());
});

test("a course written for a later day stays hidden until then", () => {
  const days = [
    { date: "2026-09-01", label: "Alt", tone: "quest", outcomes: [{ title: "A", message: "m", steps: [{ title: "x", text: "y" }] }] },
    { date: "2026-12-24", label: "Bald", tone: "quest", outcomes: [{ title: "B", message: "m", steps: [{ title: "x", text: "y" }] }] }
  ];
  assert.deepEqual(configKurse(days, "2026-10-24").map((k) => k.title), ["A"]);
  assert.deepEqual(configKurse(days, "2026-12-24").map((k) => k.title), ["B", "A"]);
});
