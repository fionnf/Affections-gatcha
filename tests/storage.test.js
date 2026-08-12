import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const {
  readTokens, writeTokens, addToken, resetToken,
  applySharedTokens, readTokensSent, writeTokensSent,
  readQuestPoints, addQuestPoints,
  readWish, writeWish,
  readStreakCache, writeStreakCache,
  readFreikarten, addFreikarte, spendFreikarte, freikarteCount,
} = await import("../src/storage.js");
const { TOKENS_KEY } = await import("../src/constants.js");

state.theme = { timezone: "Europe/Zurich" };

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
});

test("legacy flat token value migrates into the acting player's slot", () => {
  env.localStorage.setItem(TOKENS_KEY, JSON.stringify({ "🌿": 3 }));
  const tokens = readTokens();
  assert.deepEqual(tokens, { "🌿": 3 });
  const stored = JSON.parse(env.localStorage.getItem(TOKENS_KEY));
  assert.deepEqual(stored, { lennart: { "🌿": 3 } }, "flat value must be replaced by the nested shape");
});

test("players' Sammelkapsel counts stay isolated in shared localStorage", () => {
  addToken("🌿");
  addToken("🌿");
  env.setSearch("?player=fionn");
  assert.deepEqual(readTokens(), {}, "fionn must not see lennart's tokens");
  addToken("🔥");
  env.setSearch("?player=lennart");
  assert.deepEqual(readTokens(), { "🌿": 2 }, "lennart's slot untouched by fionn's write");
  env.setSearch("?player=fionn");
  assert.deepEqual(readTokens(), { "🔥": 1 });
});

test("quest points, wish and streak cache are per-player too", () => {
  addQuestPoints(50);
  writeWish({ day: "2026-08-01", text: "wish-l" });
  writeStreakCache(7);

  env.setSearch("?player=fionn");
  assert.equal(readQuestPoints(), 0);
  assert.equal(readWish(), null);
  assert.equal(readStreakCache(), 0);

  env.setSearch("?player=lennart");
  assert.equal(readQuestPoints(), 50);
  assert.equal(readWish()?.text, "wish-l");
  assert.equal(readStreakCache(), 7);
});

test("Freikarte spend is refused at zero and never goes negative", () => {
  assert.equal(spendFreikarte("lennart"), false);
  addFreikarte("lennart");
  assert.equal(freikarteCount("lennart"), 1);
  assert.equal(spendFreikarte("lennart"), true);
  assert.equal(freikarteCount("lennart"), 0);
  assert.equal(spendFreikarte("lennart"), false);
  assert.equal(freikarteCount("lennart"), 0);
});

test("writeTokens for one player preserves the other's existing slot", () => {
  writeTokens({ "🌿": 4 });
  env.setSearch("?player=fionn");
  writeTokens({ "💚": 1 });
  const raw = JSON.parse(env.localStorage.getItem(TOKENS_KEY));
  assert.deepEqual(raw, { lennart: { "🌿": 4 }, fionn: { "💚": 1 } });
});

// ── Token sync ───────────────────────────────────────────────────────────────
// Regression cover for the one collection the sheet used to overwrite outright.

test("a sync does not delete a token the sheet has never seen", () => {
  // Everything so far is confirmed on the sheet.
  writeTokens({ "🌿": 2 });
  writeTokensSent({ "🌿": 2 });
  // Earn one while the backup POST cannot land — so it stays unsent.
  addToken("⭐");
  // The sheet answers with its older copy, which knows nothing about the ⭐.
  const pending = applySharedTokens({ "🌿": 2 });
  assert.deepEqual(readTokens(), { "🌿": 2, "⭐": 1 }, "the unsent ⭐ must survive");
  assert.equal(pending, true, "caller must be told to re-post");
});

test("with nothing unsent the sheet wins, so the other phone's redeem lands", () => {
  writeTokens({ "⭐": 5 });
  writeTokensSent({ "⭐": 5 });
  const pending = applySharedTokens({ "⭐": 0, "🌿": 1 });
  assert.deepEqual(readTokens(), { "🌿": 1 }, "sheet is authoritative when we hold nothing new");
  assert.equal(pending, false);
});

test("a local redeem is not undone by a sheet that still shows the full count", () => {
  writeTokens({ "⭐": 5 });
  writeTokensSent({ "⭐": 5 });
  resetToken("⭐");
  applySharedTokens({ "⭐": 5 });
  assert.deepEqual(readTokens(), {}, "redeeming must not be reversed by the stale sheet");
});

test("an earn here and an earn there both survive the merge", () => {
  writeTokens({ "🌿": 1 });
  writeTokensSent({ "🌿": 1 });
  addToken("🌿");                          // ours, unsent  → 2
  applySharedTokens({ "🌿": 2 });          // theirs, on the sheet → 2
  assert.deepEqual(readTokens(), { "🌿": 3 }, "neither earn may be dropped");
});

test("first sync after upgrading seeds the base instead of double-counting", () => {
  // No tokens-sent record exists yet, but these tokens are already on the
  // sheet — adding them on top would hand out free collectibles.
  writeTokens({ "🌿": 3 });
  assert.equal(readTokensSent(), null);
  applySharedTokens({ "🌿": 3 });
  assert.deepEqual(readTokens(), { "🌿": 3 });
  assert.deepEqual(readTokensSent(), { "🌿": 3 }, "base is seeded for later syncs");
});

test("token counts stay per player through a merge", () => {
  writeTokens({ "🌿": 2 });
  writeTokensSent({ "🌿": 2 });
  env.setSearch("?player=fionn");
  writeTokens({ "💚": 1 });
  writeTokensSent({ "💚": 1 });
  addToken("💚");
  applySharedTokens({ "💚": 1 });
  assert.deepEqual(readTokens(), { "💚": 2 });
  env.setSearch("?player=lennart");
  assert.deepEqual(readTokens(), { "🌿": 2 }, "Lennart's bank is untouched by Fionn's merge");
});

test("junk from the sheet never yields a negative or non-numeric balance", () => {
  writeTokens({ "🌿": 2 });
  writeTokensSent({ "🌿": 2 });
  addToken("⭐");                                        // unsent
  applySharedTokens({ "🌿": "nope", "⭐": -4, "🔥": null });
  // Unreadable sheet values count as zero, exactly as the old overwrite treated
  // them — but the unsent ⭐ still rides on top, and nothing goes negative.
  assert.deepEqual(readTokens(), { "⭐": 1 });
  for (const n of Object.values(readTokens())) {
    assert.ok(Number.isInteger(n) && n > 0, `bad count ${n}`);
  }
});

test("repeated syncs are idempotent — an unsent token is not re-added each time", () => {
  // The offline case, which is where this went wrong: the sheet stays stale
  // because our POSTs never land, and sync runs again on every app open.
  writeTokens({});
  applySharedTokens({ "🌿": 2 });                 // first sync seeds from the sheet
  assert.deepEqual(readTokens(), { "🌿": 2 });
  addToken("⭐");                                  // earned offline, never sent
  for (let i = 0; i < 5; i++) applySharedTokens({ "🌿": 2 });
  assert.deepEqual(readTokens(), { "🌿": 2, "⭐": 1 },
    "🌿 must not grow, and the unsent ⭐ must not be dropped");
});

test("a confirmed send makes the sheet authoritative again", () => {
  writeTokens({});
  applySharedTokens({ "🌿": 2 });
  addToken("⭐");
  assert.equal(applySharedTokens({ "🌿": 2 }), true, "still unsent");
  // The backup lands: writeTokensSent records exactly what went out.
  writeTokensSent(readTokens());
  assert.equal(applySharedTokens({ "🌿": 2, "⭐": 1 }), false, "nothing left pending");
  assert.deepEqual(readTokens(), { "🌿": 2, "⭐": 1 });
});
