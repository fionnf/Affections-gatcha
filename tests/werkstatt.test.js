import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, outcomesFixture, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=fionn");
const { state } = await import("../src/state.js");
const { buildPullForDay, poolForCategory } = await import("../src/pull.js");
const { writeWerkstatt, werkstattFor, applySharedWerkstatt, saveKapsel, answerKapsel, werkstattEnabled, openWerkstatt } = await import("../src/werkstatt.js");
const { writeHistory } = await import("../src/storage.js");
const { _resetRecentWrites } = await import("../src/sheetSync.js");

state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
state.outcomes = outcomesFixture();
state.specialDays = { days: [] };
state.photos = [];
state.backup = { enabled: false, endpointUrl: "" };

function kapsel(categoryId, title, extra = {}) {
  return {
    id: `k-${categoryId}-${title}`,
    categoryId,
    forToken: "fionn",
    title,
    message: `${title} message`,
    link: null,
    voucher: false,
    createdBy: "lennart",
    createdAt: "2026-07-01T10:00:00.000Z",
    ...extra
  };
}

function categoryById(id) {
  return state.outcomes.categories.find((c) => c.id === id);
}

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=fionn");
  state.syncedHistory = null;
  state.werkstatt = [];
  _resetRecentWrites();
});

// A local write opens a 6-second window in which sync deliberately skips the
// authoritative overwrite. These tests are about what happens AFTER it, so
// they step past it rather than sleeping.
function graceElapsed() { _resetRecentWrites(); }

test("a category with written capsules replaces the shipped pool for Fionn", () => {
  writeWerkstatt([kapsel("common", "Handgeschrieben")]);
  const pool = poolForCategory(categoryById("common"), "fionn");
  assert.deepEqual(pool.map((o) => o.title), ["Handgeschrieben"]);
});

test("categories nobody has written for keep the shipped pool", () => {
  writeWerkstatt([kapsel("common", "Handgeschrieben")]);
  const pool = poolForCategory(categoryById("jackpot"), "fionn");
  assert.deepEqual(pool.map((o) => o.title), ["J1"]);
});

test("capsules written for Fionn never reach Lennart's pool", () => {
  writeWerkstatt([kapsel("common", "Nur für Fionn")]);
  assert.equal(werkstattFor("common", "lennart").length, 0);
  const pool = poolForCategory(categoryById("common"), "lennart");
  assert.deepEqual(pool.map((o) => o.title), ["A", "B", "C"]);
});

test("Fionn draws a written capsule once one exists for the drawn category", () => {
  const day = "2026-07-14";
  const before = buildPullForDay(day, 0);
  // Take over exactly the category this day lands on, so the assertion does
  // not depend on which one the seed picks.
  writeWerkstatt([kapsel(before.category.id, "Von Lennart")]);
  const after = buildPullForDay(day, 0);
  assert.equal(after.category.id, before.category.id);
  assert.equal(after.outcome.title, "Von Lennart");
  assert.equal(after.outcome.message, "Von Lennart message");
});

test("a capsule written today does not rewrite a pull already opened today", () => {
  const day = "2026-07-15";
  const opened = buildPullForDay(day, 0);
  writeHistory([{
    day,
    token: "fionn",
    categoryId: opened.category.id,
    categoryLabel: opened.category.label,
    tone: opened.category.tone,
    title: opened.outcome.title,
    message: opened.outcome.message
  }]);
  // Lennart adds capsules to that same category mid-day. Fionn already saw
  // his result; reloading must not hand him a different one.
  writeWerkstatt([
    kapsel(opened.category.id, "Zu spät 1"),
    kapsel(opened.category.id, "Zu spät 2")
  ]);
  const reloaded = buildPullForDay(day, 0);
  assert.equal(reloaded.outcome.title, opened.outcome.title);
});

test("a pull not yet opened is free to change when the pool does", () => {
  const day = "2026-07-16";
  const before = buildPullForDay(day, 0);
  writeWerkstatt([kapsel(before.category.id, "Frisch geschrieben")]);
  assert.equal(buildPullForDay(day, 0).outcome.title, "Frisch geschrieben");
});

// ── No repeats ───────────────────────────────────────────────────────────────

// Drives the same category across many days by forcing it through the
// existing ?preview-category= hook, and reports the titles drawn in order.
// Each day is recorded so the next day sees it.
function drawSeries(categoryId, days, player = "fionn") {
  env.setSearch(`?player=${player}&preview-category=${categoryId}`);
  const drawn = [];
  const history = [];
  for (const day of days) {
    const pull = buildPullForDay(day, 0);
    drawn.push(pull.outcome.title);
    history.unshift({
      day, token: player, categoryId: pull.category.id,
      categoryLabel: pull.category.label, tone: pull.category.tone,
      title: pull.outcome.title, message: pull.outcome.message
    });
    writeHistory(history.slice());
  }
  return drawn;
}

test("written capsules do not repeat while unseen ones are left", () => {
  writeWerkstatt([
    kapsel("common", "Eins"), kapsel("common", "Zwei"), kapsel("common", "Drei")
  ]);
  const drawn = drawSeries("common", ["2026-07-01", "2026-07-02", "2026-07-03"]);
  assert.deepEqual([...drawn].sort(), ["Drei", "Eins", "Zwei"]);
});

test("a spent written pool falls through to unseen shipped capsules, not back to itself", () => {
  // The degenerate case: one written capsule in the category. Without the
  // fallback, every draw of that category returns it forever.
  writeWerkstatt([kapsel("common", "Die einzige")]);
  const drawn = drawSeries("common", ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04"]);
  assert.equal(drawn[0], "Die einzige");
  assert.deepEqual(drawn.slice(1).sort(), ["A", "B", "C"]);
  assert.equal(new Set(drawn).size, drawn.length, `repeated: ${drawn.join(", ")}`);
});

test("only a fully exhausted category may repeat", () => {
  writeWerkstatt([kapsel("common", "Die einzige")]);
  // 4 capsules exist in total (1 written + 3 shipped); the 5th day has to
  // reuse one rather than come back empty.
  const drawn = drawSeries("common", ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05"]);
  assert.equal(new Set(drawn.slice(0, 4)).size, 4);
  assert.ok(drawn[4], "a fifth day still returns something");
});

test("Lennart's anti-repeat is untouched when nothing is written for him", () => {
  writeWerkstatt([kapsel("common", "Nur für Fionn")]);
  const drawn = drawSeries("common", ["2026-07-01", "2026-07-02", "2026-07-03"], "lennart");
  assert.deepEqual([...drawn].sort(), ["A", "B", "C"]);
});

test("the sheet is authoritative and drops malformed rows", () => {
  writeWerkstatt([kapsel("common", "Alt")]);
  applySharedWerkstatt([
    kapsel("rare", "Neu"),
    { id: "", categoryId: "common", title: "keine id" },
    { id: "x", categoryId: "", title: "keine kategorie" },
    { id: "y", categoryId: "common", title: "" }
  ]);
  assert.deepEqual(state.werkstatt.map((c) => c.title), ["Neu"]);
});

test("a duplicate title hand-added to the sheet is dropped on the way in", () => {
  applySharedWerkstatt([
    kapsel("common", "Doppelt", { id: "a" }),
    kapsel("common", "  doppelt  ", { id: "b" }),   // same capsule to the filter
    kapsel("rare", "Doppelt", { id: "c" })          // other category, keep
  ]);
  assert.deepEqual(state.werkstatt.map((c) => c.id), ["a", "c"]);
});

// ── Nothing written is lost ──────────────────────────────────────────────────

test("a capsule the sheet never received survives the authoritative overwrite", () => {
  // saveKapsel marks it pendingSince; the sheet comes back without it,
  // which is what a failed POST looks like from here.
  saveKapsel({ id: "lost", categoryId: "common", title: "Ging verloren", message: "m" });
  graceElapsed();
  applySharedWerkstatt([kapsel("rare", "Vom Blatt", { id: "ok" })]);
  const titles = state.werkstatt.map((c) => c.title);
  assert.ok(titles.includes("Ging verloren"), `dropped: ${titles.join(", ")}`);
  assert.ok(titles.includes("Vom Blatt"));
});

test("once the sheet has it, the capsule stops being treated as unsent", () => {
  saveKapsel({ id: "k9", categoryId: "common", title: "Angekommen", message: "m" });
  assert.ok(state.werkstatt.find((c) => c.id === "k9").pendingSince);
  graceElapsed();
  applySharedWerkstatt([kapsel("common", "Angekommen", { id: "k9" })]);
  const stored = state.werkstatt.filter((c) => c.id === "k9");
  assert.equal(stored.length, 1, "kept exactly once, not duplicated");
  assert.ok(!stored[0].pendingSince, "no longer pending");
});

test("a capsule deleted on the other device is still dropped", () => {
  // Only locally-written, unconfirmed capsules are protected — a confirmed
  // one missing from the sheet means the other phone deleted it.
  applySharedWerkstatt([kapsel("common", "Da", { id: "d1" })]);
  applySharedWerkstatt([]);
  assert.deepEqual(state.werkstatt, []);
});

test("an unsent answer is not overwritten by the sheet's blank one", () => {
  applySharedWerkstatt([kapsel("common", "Mit Frage", { id: "q1", prompt: "Wie war's?" })]);
  answerKapsel("q1", "Schön.");
  graceElapsed();
  // The sheet still has no answer — the POST didn't land.
  applySharedWerkstatt([kapsel("common", "Mit Frage", { id: "q1", prompt: "Wie war's?" })]);
  const stored = state.werkstatt.find((c) => c.id === "q1");
  assert.equal(stored.answer, "Schön.");
});

test("a deletion on the other device propagates instead of lingering", () => {
  writeWerkstatt([kapsel("common", "Alt")]);
  applySharedWerkstatt([]);
  assert.deepEqual(state.werkstatt, []);
  assert.deepEqual(poolForCategory(categoryById("common"), "fionn").map((o) => o.title), ["A", "B", "C"]);
});

// ── Feature flag ─────────────────────────────────────────────────────────────

test("the Werkstatt flag gates authoring but never the existing pool", () => {
  const base = { secret: TEST_SECRET, timezone: "Europe/Zurich" };

  state.theme = { ...base };                       // no features block at all
  assert.equal(werkstattEnabled(), true, "a config without the key keeps the feature");
  state.theme = { ...base, features: {} };
  assert.equal(werkstattEnabled(), true, "an empty features block keeps the feature");
  state.theme = { ...base, features: { werkstatt: true } };
  assert.equal(werkstattEnabled(), true);
  state.theme = { ...base, features: { werkstatt: false } };
  assert.equal(werkstattEnabled(), false, "only an explicit false turns it off");

  // Capsules already written stay drawable, so flipping the flag back on
  // loses nothing and flipping it off does not silently rewrite Fionn's pool.
  writeWerkstatt([kapsel("common", "Handwritten")]);
  const pool = poolForCategory(state.outcomes.categories.find((c) => c.id === "common"), "fionn");
  assert.deepEqual(pool.map((o) => o.title), ["Handwritten"]);

  state.theme = { ...base };
});

test("opening the Werkstatt is inert while the flag is off", () => {
  state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich", features: { werkstatt: false } };
  let opened = false;
  global.document = {
    getElementById: (id) => (id === "ag-werkstatt-panel"
      ? { set hidden(v) { opened = v === false; }, scrollIntoView() {} } : null),
    querySelector: () => null,
  };
  openWerkstatt();
  assert.equal(opened, false, "the panel must not be revealed");
  delete global.document;
  state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
});
