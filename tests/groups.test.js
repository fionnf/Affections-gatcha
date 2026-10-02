// The strip's group arithmetic: every operation keeps the sizes summing to
// the strip and the colours where they were.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { normaliseGroups, cutsOf, groupAtLed, groupsFromCuts, toggleCut, splitGroup, mergeGroup, setGroupColour, NUM_LEDS, MAX_GROUPS } = await import("../src/licht.js");

const sum = (gs) => gs.reduce((n, g) => n + g.size, 0);

test("normaliseGroups repairs whatever comes in", () => {
  assert.equal(sum(normaliseGroups([])), NUM_LEDS);
  assert.equal(sum(normaliseGroups([{ pos: 0.2, w: 0, size: 3 }])), NUM_LEDS, "a short layout grows at the end");
  assert.equal(sum(normaliseGroups([{ size: 8 }, { size: 8 }])), NUM_LEDS, "a long layout is shaved");
  assert.deepEqual(normaliseGroups([{ pos: 2, w: -1, size: 0 }]), [{ pos: 1, w: 0, size: NUM_LEDS }]);
});

test("cuts and the group under a light", () => {
  const gs = [{ pos: 0, w: 0, size: 4 }, { pos: 0.5, w: 0, size: 6 }];
  assert.deepEqual(cutsOf(gs), [4]);
  assert.equal(groupAtLed(gs, 0), 0);
  assert.equal(groupAtLed(gs, 3), 0);
  assert.equal(groupAtLed(gs, 4), 1);
  assert.equal(groupAtLed(gs, 9), 1);
});

test("a cut splits, the same cut joins, colours stay with their lights", () => {
  const one = [{ pos: 0.3, w: 0, size: NUM_LEDS }];
  const two = toggleCut(one, 5);
  assert.deepEqual(two.map((g) => g.size), [5, 5]);
  assert.equal(two[1].pos, 0.3, "the new group inherits the colour");
  const coloured = setGroupColour(two, 1, 0.9, 0.2);
  assert.equal(coloured[0].pos, 0.3);
  assert.deepEqual(coloured[1], { pos: 0.9, w: 0.2, size: 5 });
  const three = toggleCut(coloured, 7);
  assert.deepEqual(three.map((g) => [g.size, g.pos]), [[5, 0.3], [2, 0.9], [3, 0.9]]);
  const back = toggleCut(three, 5);
  assert.deepEqual(back.map((g) => g.size), [7, 3]);
  assert.equal(back[0].pos, 0.3, "joining keeps the colour of the first light");
  assert.deepEqual(toggleCut(one, 0), one, "a cut at the edge is no cut");
  assert.deepEqual(toggleCut(one, NUM_LEDS), one);
});

test("split halves a group, merge folds it into a neighbour", () => {
  const one = [{ pos: 0.1, w: 0, size: NUM_LEDS }];
  const s = splitGroup(one, 0);
  assert.deepEqual(s.map((g) => g.size), [5, 5]);
  const s2 = splitGroup(s, 1);
  assert.deepEqual(s2.map((g) => g.size), [5, 3, 2]);
  assert.deepEqual(splitGroup([{ size: 1 }, { size: 9 }], 0).map((g) => g.size), [1, 9], "a single light cannot split");
  assert.deepEqual(mergeGroup(s2, 1).map((g) => g.size), [5, 5], "merges forward");
  assert.deepEqual(mergeGroup(s2, 2).map((g) => g.size), [5, 5], "the last merges backward");
  assert.deepEqual(mergeGroup(one, 0), normaliseGroups(one), "one group stays one");
  let gs = one;
  for (let i = 0; i < 20; i++) gs = splitGroup(gs, gs.reduce((b, g, k) => (g.size > gs[b].size ? k : b), 0));
  assert.equal(gs.length, MAX_GROUPS, "never more groups than lights");
  assert.equal(sum(gs), NUM_LEDS);
});

test("setGroupColour with no index paints the whole strip, keeping sizes", () => {
  const gs = [{ pos: 0, w: 0, size: 4 }, { pos: 0.5, w: 0.5, size: 6 }];
  const all = setGroupColour(gs, null, 0.7, undefined);
  assert.deepEqual(all, [{ pos: 0.7, w: 0, size: 4 }, { pos: 0.7, w: 0.5, size: 6 }]);
  assert.deepEqual(groupsFromCuts([3, 3, 12], gs).map((g) => g.size), [3, 7], "cuts are deduped and clamped");
});
