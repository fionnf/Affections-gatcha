import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const {
  readTokens, writeTokens, addToken,
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
