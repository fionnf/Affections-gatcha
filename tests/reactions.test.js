import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, dayKey } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const {
  mergeReactions, readReactions, writeReactions, sendReaction,
  reactionForEntry, myReactionFor, partnerToken
} = await import("../src/reactions.js");

state.theme = { timezone: "UTC" };
state.backup = { enabled: true, endpointUrl: "https://backend.test/exec" };

let _posts = [];
globalThis.fetch = async (_url, opts) => {
  if (opts && opts.method === "POST") _posts.push(JSON.parse(opts.body));
  return { ok: true, json: async () => ({ ok: true }) };
};

const today = dayKey(0);

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.partnerToday = null;
  _posts = [];
});

test("partnerToken is symmetric for both players", () => {
  assert.equal(partnerToken(), "fionn");
  env.setSearch("?player=fionn");
  assert.equal(partnerToken(), "lennart");
});

test("sendReaction writes an optimistic local row and POSTs it", () => {
  sendReaction("❤️", today);
  const mine = myReactionFor(today);
  assert.equal(mine.emoji, "❤️");
  assert.equal(mine.from, "lennart");
  assert.equal(mine.to, "fionn");
  assert.equal(_posts.length, 1);
  assert.equal(_posts[0].type, "reaction");
  assert.equal(_posts[0].emoji, "❤️");
});

test("re-reacting replaces the emoji instead of stacking rows", () => {
  sendReaction("❤️", today);
  sendReaction("😂", today);
  const rows = readReactions().filter((r) => r.day === today && r.from === "lennart");
  assert.equal(rows.length, 1, "one reaction per (day, from, to)");
  assert.equal(rows[0].emoji, "😂");
});

test("merge is two-way: incoming and outgoing rows coexist per day", () => {
  sendReaction("❤️", today); // lennart → fionn
  mergeReactions([
    { day: today, from: "fionn", to: "lennart", emoji: "🥹", updatedAt: "2026-01-01T10:00:00Z" },
  ]);
  const rows = readReactions().filter((r) => r.day === today);
  assert.equal(rows.length, 2, "both directions survive the merge");
  assert.equal(reactionForEntry({ day: today, token: "lennart" }).emoji, "🥹", "incoming reaction lands on my entry");
  assert.equal(myReactionFor(today).emoji, "❤️", "my outgoing reaction is untouched");
});

test("a fresh optimistic row survives a racing sync with stale server state", () => {
  // Server still has my old reaction from before the POST landed.
  sendReaction("😂", today); // updatedAt = now
  mergeReactions([
    { day: today, from: "lennart", to: "fionn", emoji: "❤️", updatedAt: "2020-01-01T00:00:00Z" },
  ]);
  assert.equal(myReactionFor(today).emoji, "😂", "newest updatedAt wins");
});

test("a newer server row replaces an older local one", () => {
  writeReactions([{ day: today, from: "fionn", to: "lennart", emoji: "❤️", updatedAt: "2026-01-01T10:00:00Z" }]);
  mergeReactions([
    { day: today, from: "fionn", to: "lennart", emoji: "😮", updatedAt: "2026-01-02T10:00:00Z" },
  ]);
  assert.equal(reactionForEntry({ day: today, token: "lennart" }).emoji, "😮");
});

test("first-ever sync sets a baseline without announcing old reactions", () => {
  const fresh = mergeReactions([
    { day: today, from: "fionn", to: "lennart", emoji: "❤️", updatedAt: "2026-01-01T10:00:00Z" },
  ]);
  assert.equal(fresh.length, 0, "no toast spam on a new device");

  const fresh2 = mergeReactions([
    { day: today, from: "fionn", to: "lennart", emoji: "😂", updatedAt: "2026-01-03T10:00:00Z" },
  ]);
  assert.equal(fresh2.length, 1, "a genuinely newer incoming reaction is announced");
  assert.equal(fresh2[0].emoji, "😂");

  const fresh3 = mergeReactions([
    { day: today, from: "fionn", to: "lennart", emoji: "😂", updatedAt: "2026-01-03T10:00:00Z" },
  ]);
  assert.equal(fresh3.length, 0, "re-syncing the same state announces nothing");
});

test("future days and malformed rows are ignored", () => {
  mergeReactions([
    { day: dayKey(2), from: "fionn", to: "lennart", emoji: "❤️", updatedAt: "2026-01-01T00:00:00Z" },
    { day: today, from: "", to: "lennart", emoji: "❤️", updatedAt: "2026-01-01T00:00:00Z" },
    { day: today, from: "fionn", to: "lennart", emoji: "", updatedAt: "2026-01-01T00:00:00Z" },
  ]);
  assert.equal(readReactions().length, 0);
});
