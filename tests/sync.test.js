import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { syncFromSheets } = await import("../src/sync.js");
const { readHistory, writeHistory, readFavorites, writeFavorites } = await import("../src/storage.js");

state.theme = { timezone: "UTC" };
state.backup = { enabled: true, endpointUrl: "https://backend.test/exec" };

// Stub the network: every syncFromSheets call resolves with whatever payload
// the current test queued. mount stays null (setMount never called), so the
// DOM-touching bits of syncFromSheets are guarded no-ops.
let _nextPayload = null;
globalThis.fetch = async () => ({ ok: true, json: async () => _nextPayload });

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.syncedHistory = null;
  _nextPayload = null;
});

test("history merge keeps both players' same-day entries (day+token key)", async () => {
  // Local storage already holds BOTH players' entry for the same day — the
  // exact shared-device situation the day-only merge key used to corrupt.
  writeHistory([
    { day: "2026-07-01", token: "lennart", categoryId: "common", title: "L", message: "l" },
    { day: "2026-07-01", token: "fionn", categoryId: "rare", title: "F", message: "f" },
  ]);
  // Server returns the requesting player's row for that day (backend filters
  // by token); the merge must not let it evict the other player's local row.
  _nextPayload = { ok: true, history: [
    { day: "2026-07-01", token: "lennart", categoryId: "common", title: "L2", message: "l2" },
  ]};

  await syncFromSheets();

  const days = readHistory().filter((e) => e.day === "2026-07-01");
  const byToken = Object.fromEntries(days.map((e) => [e.token, e.title]));
  assert.equal(byToken.lennart, "L2", "lennart's row updated from the server");
  assert.equal(byToken.fionn, "F", "fionn's same-day row must survive the merge");
  assert.equal(days.length, 2, "exactly one row per player, none dropped");
});

test("a sheet row without bestanden cannot strip a local trophy", async () => {
  // The deployed Apps Script may predate the Bestanden column, so the sheet
  // echoes quest entries without the flag. Bestanden is one-way; the union
  // must keep the local true or a trophy vanishes minutes after it's earned.
  writeHistory([
    { day: "2026-07-27", token: "lennart", categoryId: "special", tone: "quest",
      title: "Drei Aufträge im Rost", message: "m", bestanden: true, bestandenAt: "2026-07-27" },
  ]);
  _nextPayload = { ok: true, history: [
    { day: "2026-07-27", token: "lennart", categoryId: "special", tone: "quest",
      title: "Drei Aufträge im Rost", message: "m" },
  ]};

  await syncFromSheets();

  const entry = readHistory().find((e) => e.day === "2026-07-27" && e.token === "lennart");
  assert.equal(entry.bestanden, true, "the sheet's ignorance must not unset the flag");
  assert.equal(entry.bestandenAt, "2026-07-27", "the earned date survives too");
});

test("a sheet row that does carry bestanden applies it to a fresh device", async () => {
  writeHistory([
    { day: "2026-07-27", token: "lennart", categoryId: "special", tone: "quest",
      title: "Drei Aufträge im Rost", message: "m" },
  ]);
  _nextPayload = { ok: true, history: [
    { day: "2026-07-27", token: "lennart", categoryId: "special", tone: "quest",
      title: "Drei Aufträge im Rost", message: "m", bestanden: true, bestandenAt: "2026-07-27" },
  ]};

  await syncFromSheets();

  const entry = readHistory().find((e) => e.day === "2026-07-27" && e.token === "lennart");
  assert.equal(entry.bestanden, true, "a redeployed backend's flag reaches a device that never tapped the button");
});

test("the proof URL survives a sheet that does not know the column, and arrives from one that does", async () => {
  writeHistory([
    { day: "2026-07-27", token: "lennart", tone: "quest", title: "Q", message: "m",
      bestanden: true, bestandenAt: "2026-07-27", beweisUrl: "https://lh3.googleusercontent.com/d/abc" },
  ]);
  _nextPayload = { ok: true, history: [
    { day: "2026-07-27", token: "lennart", tone: "quest", title: "Q", message: "m" },
  ]};
  await syncFromSheets();
  let entry = readHistory().find((e) => e.day === "2026-07-27");
  assert.equal(entry.beweisUrl, "https://lh3.googleusercontent.com/d/abc", "a silent sheet must not drop the proof");

  // And the other direction: a redeployed backend delivers it to a device
  // that never uploaded anything.
  writeHistory([{ day: "2026-07-27", token: "lennart", tone: "quest", title: "Q", message: "m" }]);
  _nextPayload = { ok: true, history: [
    { day: "2026-07-27", token: "lennart", tone: "quest", title: "Q", message: "m",
      beweisUrl: "https://lh3.googleusercontent.com/d/xyz" },
  ]};
  await syncFromSheets();
  entry = readHistory().find((e) => e.day === "2026-07-27");
  assert.equal(entry.beweisUrl, "https://lh3.googleusercontent.com/d/xyz");
});

test("favourites merge is also keyed by day+token", async () => {
  writeFavorites([
    { day: "2026-07-02", token: "lennart", title: "LFav" },
    { day: "2026-07-02", token: "fionn", title: "FFav" },
  ]);
  _nextPayload = { ok: true, favourites: [
    { day: "2026-07-02", token: "lennart", title: "LFav-updated" },
  ]};

  await syncFromSheets();

  const favs = readFavorites().filter((e) => e.day === "2026-07-02");
  const byToken = Object.fromEntries(favs.map((e) => [e.token, e.title]));
  assert.equal(byToken.lennart, "LFav-updated");
  assert.equal(byToken.fionn, "FFav", "fionn's favourite must survive");
  assert.equal(favs.length, 2);
});

test("a failed sync leaves local history untouched and reports -1", async () => {
  writeHistory([{ day: "2026-07-03", token: "lennart", categoryId: "common", title: "keep", message: "k" }]);
  globalThis.fetch = async () => { throw new Error("offline"); };

  const result = await syncFromSheets();
  assert.equal(result, -1, "network failure returns the -1 sentinel");
  assert.equal(readHistory()[0].title, "keep", "local data preserved on failure");

  // Restore the happy-path stub for later tests.
  globalThis.fetch = async () => ({ ok: true, json: async () => _nextPayload });
});

test("server rows for a future day are ignored", async () => {
  _nextPayload = { ok: true, history: [
    { day: "2999-01-01", token: "lennart", categoryId: "jackpot", title: "future", message: "f" },
  ]};
  await syncFromSheets();
  assert.equal(readHistory().some((e) => e.day === "2999-01-01"), false);
});
