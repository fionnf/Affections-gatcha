// The knob's winding, the moon's phase and shape, the sticker store, the
// pinch, the candle's rules.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { KnobTurn, TURN_DEG, DETENT_DEG, LOCKED_GIVE_DEG } = await import("../src/knopf.js");
const { moonPhase, isFullMoonDay, moonPath, moonEmoji, fullMoonLine, moonOctant, fullMoonInstant } = await import("../src/mond.js");
const { placeAufkleber, aufkleberFor, defaultSpot, clamp01 } = await import("../src/aufkleber.js");
const { pinched, PINCH_RATIO } = await import("../src/kneifen.js");
const { isCandleHour, isBlow } = await import("../src/kerze.js");
const { candleCycle, CANDLE_PERIOD_MS, hugGroups, hugChoreography, HUG_MS } = await import("../src/lightsFx.js");
const { NUM_LEDS } = await import("../src/licht.js");

test.beforeEach(() => env.localStorage.clear());

test("a full clockwise turn fires once; detents click every eighth", () => {
  const t = new KnobTurn();
  let detents = 0, fired = 0;
  for (let a = -90; a <= 280; a += 10) {
    const r = t.move(a);
    detents += r.detent; if (r.fired) fired++;
  }
  assert.equal(fired, 1);
  assert.equal(detents, TURN_DEG / DETENT_DEG);
  assert.equal(t.move(290).fired, false, "fires once per grip");
});

test("the wrap at ±180 is a small step, not a jump; winding back unwinds", () => {
  const t = new KnobTurn();
  t.move(170); t.move(-170);
  assert.ok(Math.abs(t.wound - 20) < 1e-9, `wrapped delta is 20, got ${t.wound}`);
  t.move(-180);
  assert.ok(Math.abs(t.wound - 10) < 1e-9, "turning back unwinds");
  t.move(170); t.move(100);
  assert.equal(t.wound, 0, "never below zero");
});

test("a locked knob gives a little and never fires", () => {
  const t = new KnobTurn({ locked: true });
  let fired = false;
  for (let a = 0; a <= 360; a += 15) if (t.move(a).fired) fired = true;
  assert.equal(fired, false);
  assert.equal(t.wound, LOCKED_GIVE_DEG);
});

test("the moon: a known full moon and a known new moon", () => {
  // Full moons 2024-01-25 17:54, 2024-02-24 12:30, 2024-03-25 07:00 UTC;
  // new moon 2024-01-11 11:57 UTC. The mean phase drifts up to half a day
  // from the true one; the exact instants come from Meeus.
  assert.ok(Math.abs(moonPhase(new Date(Date.UTC(2024, 0, 25, 17, 54))).phase - 0.5) < 0.03);
  const nm = moonPhase(new Date(Date.UTC(2024, 0, 11, 11, 57))).phase;
  assert.ok(nm < 0.03 || nm > 0.97);
  for (const [k, iso] of [[297, "2024-01-25T17:54Z"], [298, "2024-02-24T12:30Z"], [299, "2024-03-25T07:00Z"]]) {
    const err = Math.abs(fullMoonInstant(k) - Date.parse(iso)) / 60000;
    assert.ok(err < 20, `lunation ${k}: ${err.toFixed(0)} min off`);
  }
  assert.equal(isFullMoonDay("2024-01-25"), true);
  assert.equal(isFullMoonDay("2024-01-26"), false);
  assert.equal(isFullMoonDay("2024-01-28"), false);
  assert.equal(isFullMoonDay("2024-02-24"), true);
  assert.equal(isFullMoonDay("not-a-day"), false);
  assert.equal(moonEmoji(new Date(Date.UTC(2024, 0, 25, 17, 54))), "🌕");
  assert.equal(moonOctant(0.26), 2);
  assert.ok(fullMoonLine("2024-01-25").startsWith("🌕"));
  assert.equal(fullMoonLine("2024-01-28"), "");
});

test("the moon's lit shape: nothing at new, the whole disc at full, the right half waxing", () => {
  const r = 20;
  assert.equal(moonPath(0, r), "M20,0 A20,20 0 0 1 20,40 A20.00,20 0 0 0 20,0 Z", "terminator back along the limb");
  assert.equal(moonPath(0.5, r), "M20,0 A20,20 0 0 1 20,40 A20.00,20 0 0 1 20,0 Z", "two half-circles: a full disc");
  assert.match(moonPath(0.25, r), /A0\.00,20 0 0 [01] 20,0/, "a straight terminator at the quarter");
  assert.match(moonPath(0.75, r), /^M20,0 A20,20 0 0 0 20,40/, "waning: the left limb");
});

test("stickers land top right with a tilt, move where dragged, and stay inside", () => {
  const spot = defaultSpot("2026-10-02");
  assert.equal(spot.x, 0.86);
  assert.ok(Math.abs(spot.rot) <= 14);
  assert.equal(aufkleberFor("2026-10-02"), null);
  const s = placeAufkleber("2026-10-02", { emoji: "🥹" });
  assert.deepEqual(aufkleberFor("2026-10-02"), s);
  const moved = placeAufkleber("2026-10-02", { x: 1.4, y: -0.2, rot: 5 });
  assert.equal(moved.emoji, "🥹", "the emoji is kept");
  assert.equal(moved.x, 0.96); assert.equal(moved.y, 0.04); assert.equal(moved.rot, 5);
  assert.equal(clamp01("junk"), 0.04);
  const swapped = placeAufkleber("2026-10-02", { emoji: "😂" });
  assert.equal(swapped.x, 0.96, "a new emoji keeps the old spot");
});

test("a pinch is a decisive squeeze", () => {
  assert.equal(pinched(200, 200 * PINCH_RATIO), true);
  assert.equal(pinched(200, 190), false);
  assert.equal(pinched(0, 10), false);
});

test("the hug strobe: red and orange chasing along the strip, every other step dim", () => {
  const g0 = hugGroups(0);
  assert.equal(g0.reduce((n, g) => n + g.size, 0), NUM_LEDS);
  assert.ok(g0.every((g) => g.pos >= 0 && g.pos <= 5 / 29), "only reds and oranges");
  assert.ok(g0.length >= 4, "short segments, not one block");
  assert.notDeepEqual(hugGroups(1), g0, "the pattern moves");
  assert.deepEqual(hugGroups(NUM_LEDS), g0, "and comes round");
  const steps = hugChoreography();
  assert.ok(steps.length > 30);
  assert.ok(steps.every((s) => s.at < HUG_MS && s.payload.groups.reduce((n, g) => n + g.size, 0) === NUM_LEDS));
  assert.equal(steps[0].payload.brightness, 1.0);
  assert.ok(steps[1].payload.brightness < 0.3, "strobe");
});

test("the candle: evening hours, a swipe, a cycle that breathes low and warm", () => {
  assert.equal(isCandleHour(20), true);
  assert.equal(isCandleHour(4), true);
  assert.equal(isCandleHour(5), false);
  assert.equal(isCandleHour(14), false);
  assert.equal(isBlow(70, 0, 300), true);
  assert.equal(isBlow(0, -60, 500), true);
  assert.equal(isBlow(20, 10, 300), false, "a tap is not a blow");
  assert.equal(isBlow(90, 0, 1200), false, "a slow drag is not a blow");
  const cycle = candleCycle(() => 0.5);
  assert.equal(cycle[0].payload.groups[0].size, NUM_LEDS);
  assert.ok(cycle.every((s) => s.at < CANDLE_PERIOD_MS));
  assert.ok(cycle.every((s) => s.payload.brightness > 0.15 && s.payload.brightness < 0.5), "low, never bright");
});
