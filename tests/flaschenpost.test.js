// Flaschenpost dates and delivery, the reaction light, the heartbeat cycle.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, outcomesFixture, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { sealFlaschenpost, dueDayFor, dueFlaschenpost, markFlaschenpostDelivered, mergeFlaschenpost, readFlaschenpost } = await import("../src/storage.js");
const { buildPullForDay, rerollPullForDay } = await import("../src/pull.js");
const { reactionChoreography, REACTION_MS } = await import("../src/lightsFx.js");
const { heartbeatCycle, PULSE_PERIOD_MS, NUM_LEDS } = await import("../src/licht.js");

state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
state.outcomes = outcomesFixture();
state.specialDays = { days: [] };
state.photos = [];
test.beforeEach(() => { env.localStorage.clear(); state.syncedHistory = null; state.specialDays = { days: [] }; });

test("in 30 Tagen is thirty days to the day; irgendwann is 20–90 days, fixed per post", () => {
  assert.equal(dueDayFor("30", "2026-01-31", "x"), "2026-03-02");
  const a = dueDayFor("irgendwann", "2026-05-01", "abc");
  assert.equal(a, dueDayFor("irgendwann", "2026-05-01", "abc"), "deterministic");
  const days = (Date.parse(a) - Date.parse("2026-05-01")) / 86400000;
  assert.ok(days >= 20 && days <= 90, `irgendwann landed ${days} days out`);
});

test("a sealed post comes out as the day's capsule once it is due, and only once", () => {
  const post = sealFlaschenpost("  Ruf Oma an.  ", "30", "2026-06-01");
  assert.equal(post.text, "Ruf Oma an.");
  assert.equal(post.dueDay, "2026-07-01");
  assert.equal(dueFlaschenpost("2026-06-30"), null, "not yet");
  assert.equal(dueFlaschenpost("2026-07-01").id, post.id);
  assert.equal(dueFlaschenpost("2026-07-05").id, post.id, "still waiting if he didn't pull on the day");
  const pull = buildPullForDay("2026-07-05", 0);
  assert.equal(pull.category.id, "flaschenpost");
  assert.equal(pull.flaschenpost, post.id);
  assert.ok(pull.outcome.message.includes("Ruf Oma an."));
  assert.equal(rerollPullForDay("2026-07-05", 0).category.id !== "flaschenpost", true, "a Freikarte reroll never produces one");
  assert.equal(markFlaschenpostDelivered(post.id, "2026-07-05"), true);
  assert.equal(dueFlaschenpost("2026-07-05").id, post.id, "the delivery day keeps showing it");
  assert.equal(dueFlaschenpost("2026-07-06"), null, "gone the day after");
  assert.equal(buildPullForDay("2026-07-06", 0).category.id !== "flaschenpost", true);
  assert.equal(markFlaschenpostDelivered(post.id, "2026-07-09"), false);
});

test("a special day wins and the post waits", () => {
  const post = sealFlaschenpost("Hallo", "30", "2026-06-01");
  state.specialDays = { days: [{ date: "2026-07-01", label: "S", tone: "jackpot", outcomes: [{ title: "S1", message: "s" }] }] };
  assert.equal(buildPullForDay("2026-07-01", 0).category.id, "special");
  assert.equal(buildPullForDay("2026-07-02", 0).flaschenpost, post.id);
});

test("the oldest due post goes first; the merge keeps deliveries from either side", () => {
  const b = sealFlaschenpost("B", "30", "2026-06-10");
  const a = sealFlaschenpost("A", "30", "2026-06-01");
  assert.equal(dueFlaschenpost("2026-08-01").id, a.id);
  mergeFlaschenpost([{ ...b, deliveredDay: "2026-07-20" }, { id: "new", text: "C", mode: "irgendwann", createdDay: "2026-06-05", dueDay: "2026-07-30", deliveredDay: null }, { id: "junk" }]);
  const posts = readFlaschenpost();
  assert.equal(posts.length, 3);
  assert.equal(posts.find((p) => p.id === b.id).deliveredDay, "2026-07-20");
  assert.equal(sealFlaschenpost("   ", "30", "2026-06-01"), null);
});

test("every reaction has a colour on the strip and the show ends in time", () => {
  for (const emoji of ["🥹", "😂", "🙃", "❓"]) {
    const steps = reactionChoreography(emoji);
    assert.equal(steps[0].payload.groups.reduce((n, g) => n + g.size, 0), NUM_LEDS, emoji);
    assert.ok(steps.every((s) => s.at < REACTION_MS), emoji);
    assert.equal(steps.filter((s) => s.payload.brightness === 1.0).length, 3, "full, breathe, full, breathe, full");
  }
});

test("the heartbeat is a lub-dub inside one period", () => {
  const cycle = heartbeatCycle();
  assert.equal(cycle[0].payload.brightness, 1.0);
  assert.ok(cycle.every((s) => s.at < PULSE_PERIOD_MS));
  assert.ok(cycle[cycle.length - 1].payload.brightness < 0.3, "ends low so the next beat reads");
});

test("a post that becomes due after today's capsule was opened waits for tomorrow", async () => {
  const { writeHistory } = await import("../src/storage.js");
  writeHistory([{ day: "2026-07-05", token: "lennart", categoryId: "common", categoryLabel: "x", tone: "soft", title: "A", message: "a" }]);
  const post = sealFlaschenpost("Später", "30", "2026-06-01");
  assert.notEqual(buildPullForDay("2026-07-05", 0).category.id, "flaschenpost", "the recorded capsule wins");
  assert.equal(buildPullForDay("2026-07-06", 0).flaschenpost, post.id);
});
