// The Licht tab's pure parts: palette maths, mood and scene payloads the
// firmware accepts (group sizes sum to the strip), the wink timeline, and
// the online rule for a lamp.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { paletteRgb, groupRgb, lampRgb, paletteGradient, MOODS, moodPayload, scenePayload, stripGroups, winkSteps, NUM_LEDS, DEFAULT_W, randomGroups } = await import("../src/licht.js");

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

test("the strip preview shows what the lamp shows: low positions are near white, w lifts towards white", () => {
  const [r0, g0, b0] = lampRgb(0);
  assert.ok(r0 >= g0 && g0 >= b0 && b0 >= 110, `pos 0 is warm white: ${[r0, g0, b0]}`);
  // pos is also saturation: the far end is the vivid tint, the near end is not.
  const sat = (c) => Math.max(...c) - Math.min(...c);
  assert.ok(sat(lampRgb(0.9)) > sat(lampRgb(0.1)));
  const dim = groupRgb({ pos: 0.5, w: 0 }), lit = groupRgb({ pos: 0.5, w: 1 });
  assert.ok(lit.reduce((a, b) => a + b) > dim.reduce((a, b) => a + b), "the white LED adds light");
  assert.deepEqual(groupRgb({ pos: 0.3, w: 0 }), lampRgb(0.3));
  assert.match(paletteGradient(4), /^linear-gradient\(to right, rgb\(\d+,\d+,\d+\) 0%,.* 100%\)$/);
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

test("a fresh colour starts at half white; the dice stay near it", () => {
  assert.equal(DEFAULT_W, 0.5);
  let k = 0;
  const seq = [0.9, 0.3, 0.7, 0.1, 0.5, 0.95, 0.2, 0.6, 0.4, 0.8, 0.05, 0.5, 0.33];
  const rand = () => seq[k++ % seq.length];
  const gs = randomGroups(rand);
  assert.equal(gs.reduce((n, g) => n + g.size, 0), NUM_LEDS);
  for (const g of gs) {
    assert.ok(g.w >= DEFAULT_W - 0.2 && g.w <= DEFAULT_W + 0.2, `w ${g.w} within ±0.2 of the default`);
    assert.ok(g.pos >= 0 && g.pos <= 1);
  }
});
