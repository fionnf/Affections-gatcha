import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { syncFromSheets, backupToSheets } = await import("../src/sync.js");
const { addGlossaryWord, deleteGlossaryWord, readGlossary, writeGlossary, fetchGlossaryFromSheet } = await import("../src/glossary.js");
const { addGipfelEntry, deleteGipfelEntry } = await import("../src/berge.js");
const { readGipfelbuch, writeGipfelbuch, readTokens, writeTokens, writeTokensSent, readTokensSent, readFavorites, writeFavorites } = await import("../src/storage.js");
const { readPendingOps, flushSheetOps, _resetRecentWrites } = await import("../src/sheetSync.js");

const ENDPOINT = "https://backend.test/exec";
state.theme = { timezone: "UTC" };
state.backup = { enabled: true, endpointUrl: ENDPOINT };

// One fetch stub for both directions. GETs answer with whatever the test set
// as the sheet's content (or a promise the test resolves later, to stand in
// for a slow read); POSTs either fail like a phone without signal, succeed
// with Apps Script's {ok:true}, or get through only in no-cors mode.
let sheet = null;
let pendingGet = null;
let postMode = "ok";
let posted = [];
globalThis.fetch = async (url, opts = {}) => {
  if (opts.method === "POST") {
    if (postMode === "fail") throw new TypeError("Failed to fetch");
    if (postMode === "no-cors-only") {
      if (opts.mode !== "no-cors") throw new TypeError("CORS blocked");
      posted.push(JSON.parse(opts.body));
      return { ok: false, status: 0, type: "opaque", json: async () => { throw new SyntaxError("opaque"); } };
    }
    posted.push(JSON.parse(opts.body));
    return { ok: true, json: async () => ({ ok: true }) };
  }
  if (pendingGet) return pendingGet;
  return { ok: true, json: async () => sheet };
};

function deferredGet() {
  let resolve;
  pendingGet = new Promise((r) => { resolve = r; });
  return (payload) => { pendingGet = null; resolve({ ok: true, json: async () => payload }); };
}

test.beforeEach(() => {
  env.localStorage.clear();
  _resetRecentWrites();
  sheet = { ok: true, glossary: [], gipfelbuch: [] };
  pendingGet = null;
  postMode = "ok";
  posted = [];
});

test("a glossary word added while the POST fails survives a sync that does not have it", async () => {
  postMode = "fail";
  addGlossaryWord({ id: "w1", lang: "swabian", word: "Grüß Gott", meaning: "Hallo", audioUrl: null, token: "lennart" });
  await flushSheetOps("glossary", ENDPOINT);
  assert.equal(readPendingOps("glossary").length, 1, "the unsent word stays queued");

  // Well past the six-second grace: this is the read that used to wipe it.
  _resetRecentWrites();
  sheet = { ok: true, glossary: [{ id: "w0", lang: "swabian", word: "Ade", meaning: "Tschüss" }] };
  await fetchGlossaryFromSheet();
  await flushSheetOps("glossary", ENDPOINT);

  const ids = readGlossary().map((w) => w.id);
  assert.deepEqual(ids.sort(), ["w0", "w1"], "the sheet's word arrives and ours is kept");
  assert.equal(readPendingOps("glossary").length, 1, "still unconfirmed, still queued");

  // Signal is back: the next panel load re-sends it, and only a confirmed
  // POST takes it off the queue.
  postMode = "ok";
  sheet = { ok: true, glossary: [{ id: "w0", lang: "swabian", word: "Ade", meaning: "Tschüss" }] };
  await fetchGlossaryFromSheet();
  await flushSheetOps("glossary", ENDPOINT);
  const sent = posted.find((b) => b.type === "glossary-upsert" && b.id === "w1");
  assert.ok(sent, "the word was re-sent");
  assert.equal(sent.word, "Grüß Gott");
  assert.equal(readPendingOps("glossary").length, 0, "confirmed, so dropped from the queue");

  // From here on the sheet is authoritative again for that word.
  sheet = { ok: true, glossary: [{ id: "w1", lang: "swabian", word: "Grüß Gott", meaning: "Hallo" }] };
  await fetchGlossaryFromSheet();
  assert.deepEqual(readGlossary().map((w) => w.id), ["w1"]);
});

test("an opaque no-cors POST does not confirm a pending word", async () => {
  postMode = "no-cors-only";
  addGlossaryWord({ id: "w2", lang: "irish", word: "Dia dhuit", meaning: null, audioUrl: null, token: "lennart" });
  await flushSheetOps("glossary", ENDPOINT);
  assert.equal(posted.length, 1, "the no-cors fallback still went out");
  assert.equal(readPendingOps("glossary").length, 1, "but the op stays queued for a replay");
});

test("a glossary delete that failed does not bring the word back", async () => {
  writeGlossary([{ id: "w3", lang: "swabian", word: "Bruddler" }]);
  postMode = "fail";
  deleteGlossaryWord("w3");
  await flushSheetOps("glossary", ENDPOINT);
  _resetRecentWrites();
  sheet = { ok: true, glossary: [{ id: "w3", lang: "swabian", word: "Bruddler" }] };
  await fetchGlossaryFromSheet();
  await flushSheetOps("glossary", ENDPOINT);
  assert.equal(readGlossary().some((w) => w.id === "w3"), false);
});

test("a deleted gipfel entry does not resurrect on the next sync", async () => {
  writeGipfelbuch([
    { id: "g1", name: "Säntis", date: "2026-08-01" },
    { id: "g2", name: "Pilatus", date: "2026-07-01" },
  ]);
  postMode = "fail";
  deleteGipfelEntry("g1");
  await flushSheetOps("gipfelbuch", ENDPOINT);
  _resetRecentWrites();

  // The sheet never got the delete and still lists both.
  sheet = { ok: true, gipfelbuch: [
    { id: "g1", name: "Säntis", date: "2026-08-01" },
    { id: "g2", name: "Pilatus", date: "2026-07-01" },
  ]};
  await syncFromSheets();
  await flushSheetOps("gipfelbuch", ENDPOINT);
  assert.deepEqual(readGipfelbuch().map((e) => e.id), ["g2"], "the delete holds");

  // Once a sync can send it, it goes out and leaves the queue.
  postMode = "ok";
  await syncFromSheets();
  await flushSheetOps("gipfelbuch", ENDPOINT);
  assert.ok(posted.some((b) => b.type === "gipfel-delete" && b.id === "g1"));
  assert.equal(readPendingOps("gipfelbuch").length, 0);
  assert.deepEqual(readGipfelbuch().map((e) => e.id), ["g2"]);
});

test("a summit logged offline survives a sync past the grace period", async () => {
  postMode = "fail";
  addGipfelEntry({ id: "g3", name: "Rigi", date: "2026-09-01", token: "lennart" });
  await flushSheetOps("gipfelbuch", ENDPOINT);
  _resetRecentWrites();
  sheet = { ok: true, gipfelbuch: [{ id: "g4", name: "Napf", date: "2026-06-01" }] };
  await syncFromSheets();
  await flushSheetOps("gipfelbuch", ENDPOINT);
  assert.deepEqual(readGipfelbuch().map((e) => e.id), ["g3", "g4"]);
});

test("a sheet read that started before a confirmed backup cannot take tokens away", async () => {
  // Five 🌿 here, four of them already on the sheet.
  writeTokens({ "🌿": 5 });
  writeTokensSent({ "🌿": 4 });

  // A sync leaves and reads the sheet as it is now (4)...
  const answer = deferredGet();
  const sync = syncFromSheets();
  // ...the backup with 5 lands and is confirmed while that read is out...
  await backupToSheets();
  assert.deepEqual(readTokensSent(), { "🌿": 5 }, "the base moved on the confirmed send");
  // ...and only then does the old answer arrive.
  answer({ ok: true, tokens: { "🌿": 4 } });
  await sync;

  assert.deepEqual(readTokens(), { "🌿": 5 }, "the stale 4 must not replace the 5 just sent");

  // The next, fresh read applies normally.
  sheet = { ok: true, tokens: { "🌿": 5 } };
  await syncFromSheets();
  assert.deepEqual(readTokens(), { "🌿": 5 });
});

test("a backup the sheet answers with ok:false leaves the tokens unsent", async () => {
  writeTokens({ "🌿": 3 });
  writeTokensSent({ "🌿": 2 });
  const saved = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false, error: "busy" }) });
  try { await backupToSheets(); } finally { globalThis.fetch = saved; }
  assert.deepEqual(readTokensSent(), { "🌿": 2 }, "nothing was saved, so the base must not move");
});

test("an un-starred favourite does not come back before its backup is confirmed", async () => {
  const fav = { day: "2026-07-02", token: "lennart", title: "Fav" };
  writeFavorites([fav]);
  writeFavorites([]); // un-star

  // The backup did not land; the sheet still lists it.
  sheet = { ok: true, favourites: [fav] };
  postMode = "fail";
  await syncFromSheets();
  assert.equal(readFavorites().length, 0, "the un-star holds");

  // A confirmed backup sends the list without it; after that the sheet
  // agrees, and starring it again on another device works as before.
  postMode = "ok";
  await backupToSheets();
  sheet = { ok: true, favourites: [fav] };
  await syncFromSheets();
  assert.equal(readFavorites().length, 1, "once confirmed, a sheet favourite merges in again");
});
