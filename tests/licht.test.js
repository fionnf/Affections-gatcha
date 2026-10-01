// The Licht tab's pure parts: palette maths, mood and scene payloads the
// firmware accepts (group sizes sum to the strip), the wink timeline, and
// the online rule for a lamp.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { paletteRgb, groupRgb, MOODS, moodPayload, scenePayload, stripGroups, winkSteps, NUM_LEDS } = await import("../src/licht.js");

test("paletteRgb stays inside 0–255 across the whole bar and clamps outside it", () => {
  for (let i = 0; i <= 40; i++) {
    const rgb = paletteRgb(i / 40);
    assert.equal(rgb.length, 3);
    for (const v of rgb) assert.ok(Number.isInteger(v) && v >= 0 && v <= 255, `pos ${i / 40}: ${rgb}`);
  }
  assert.deepEqual(paletteRgb(-1), paletteRgb(0));
  assert.deepEqual(paletteRgb(2), paletteRgb(1));
  assert.deepEqual(paletteRgb(0), [255, 200, 80], "pos 0 is the golden yellow");
});

test("white level pulls a group towards white", () => {
  const [r, g, b] = groupRgb({ pos: 10 / 29, w: 1 });
  assert.ok(r > 240 && g > 230 && b > 200);
  assert.deepEqual(groupRgb({ pos: 0, w: 0 }), paletteRgb(0));
});

test("every mood is a full strip the firmware will take", () => {
  for (const m of MOODS) {
    const p = moodPayload(m);
    assert.equal(p.on, true);
    assert.ok(p.brightness > 0 && p.brightness <= 1, m.id);
    assert.equal(p.groups.reduce((n, g) => n + g.size, 0), NUM_LEDS, `${m.id}: group sizes must sum to the strip`);
    for (const g of p.groups) assert.ok(g.pos >= 0 && g.pos <= 1 && g.w >= 0 && g.w <= 1, m.id);
  }
  assert.deepEqual(stripGroups(0.5), [{ pos: 0.5, w: 0, size: NUM_LEDS }]);
});

test("a saved scene plays as stored, or rebuilt from positions and boundaries", () => {
  const stored = scenePayload({ name: "A", groups: [{ pos: 0.2, w: 0, size: 4 }, { pos: 0.7, w: 0.5, size: 6 }], brightness: 0.4, fadeSteps: 20 });
  assert.deepEqual(stored, { on: true, brightness: 0.4, fade_steps: 20, groups: [{ pos: 0.2, w: 0, size: 4 }, { pos: 0.7, w: 0.5, size: 6 }] });

  const legacy = scenePayload({ name: "B", groupPositions: [0.1, 0.9, 0.5], groupWLevels: [0, 1, 0], boundaries: [7, 3], on: false });
  assert.equal(legacy.on, false, "an explicit off is kept");
  assert.equal(legacy.brightness, 0.6);
  assert.deepEqual(legacy.groups.map((g) => g.size), [3, 4, 3]);
  assert.deepEqual(legacy.groups.map((g) => g.pos), [0.1, 0.9, 0.5]);

  const bare = scenePayload({ name: "C" });
  assert.equal(bare.groups.reduce((n, g) => n + g.size, 0), NUM_LEDS);
});

test("the wink pulses three times and puts the lamp back, off lamps included", () => {
  const snap = { on: false, groups: [{ pos: 0.3, w: 0, size: 10 }], brightness: 0.5, fade_steps: 60 };
  const steps = winkSteps(snap);
  let last = -1;
  for (const s of steps) { assert.ok(s.at > last); last = s.at; }
  assert.equal(steps.filter((s) => s.payload.brightness === 1.0).length, 3, "three bright beats");
  const restore = steps.find((s) => s.payload.groups && s.at > 2000);
  assert.deepEqual(restore.payload.groups, snap.groups);
  assert.equal(steps[steps.length - 1].payload.on, false, "a lamp that was off goes back off");
  assert.equal(winkSteps(null)[winkSteps(null).length - 1].payload.on, false, "no snapshot: end dark rather than stuck green");
});
