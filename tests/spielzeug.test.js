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
const { clampStep, validSteps, readKursIndex, writeKursIndex, rememberKurs, readLastKurs, kursAsPull, configKurse } = await import("../src/kurs.js");
const { isWhite, isColoured, rememberColour, recallColour, forgetColour, restorePayload, inSunriseGrace, MEMORY_MAX_AGE_MS } = await import("../src/farbe.js");
const { lightReactionsEnabled, setLightReactions } = await import("../src/einstellungen.js");
const { figureHtml, FIGURE_KEYS } = await import("../src/kursfiguren.js");
const { readFileSync } = await import("node:fs");
const { stopPoints, sceneHeight, trailPath, ridgePolygons, firstLine, climbProgress, stopMark, STOP_GAP, TOP_PAD, BOTTOM_PAD } = await import("../src/wanderweg.js");
const { candleCycle, CANDLE_PERIOD_MS, hugGroups, hugChoreography, HUG_MS } = await import("../src/lightsFx.js");
const { NUM_LEDS, flickerStep, flickerGap, FLICKER_MIN, FLICKER_MAX, FLICKER_GAP_MS, rainbowGroups, RAINBOW_STEP } = await import("../src/licht.js");

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

test("the Wanderweg: stops zigzag down from the summit, the trail joins them, the scene fits", () => {
  const pts = stopPoints(4, 300);
  assert.deepEqual(pts.map((p) => p.left), [true, false, true, false]);
  assert.equal(pts[0].y, TOP_PAD);
  assert.equal(pts[3].y, TOP_PAD + 3 * STOP_GAP);
  assert.equal(sceneHeight(4), TOP_PAD + 3 * STOP_GAP + BOTTOM_PAD);
  assert.equal(sceneHeight(1), TOP_PAD + BOTTOM_PAD);
  const open = stopPoints(4, 300, { after: 1, extra: 200 });
  assert.deepEqual(open.map((p) => p.y), [TOP_PAD, TOP_PAD + STOP_GAP, TOP_PAD + 2 * STOP_GAP + 200, TOP_PAD + 3 * STOP_GAP + 200], "an open stop pushes the ones below it down");
  assert.equal(sceneHeight(4, 200), sceneHeight(4) + 200);
  assert.equal(sceneHeight(0, 200), sceneHeight(0), "no stops, no room needed");
  const d = trailPath(pts, 300, sceneHeight(4));
  assert.match(d, /^M150,\d+ C/, "starts at the bottom centre");
  assert.ok(d.endsWith("150,58"), "ends at the summit");
  assert.equal((d.match(/ C/g) || []).length, 5, "a curve per leg");
  const ridges = ridgePolygons(300, 800);
  assert.ok(ridges.length >= 3);
  assert.deepEqual(ridges, ridgePolygons(300, 800), "the same mountains every visit");
  assert.ok(ridges[0].opacity < ridges[ridges.length - 1].opacity, "nearer ridges are darker");
});

test("the Wanderweg: a stop's line is the first sentence; the hiker climbs with the scroll", () => {
  assert.equal(firstLine("Wendeltreppen drehen rechts. Du verteidigst heute alles."), "Wendeltreppen drehen rechts.");
  assert.equal(firstLine("  Kein   Punkt hier  "), "Kein Punkt hier");
  assert.equal(firstLine("a".repeat(100)).length, 72);
  assert.equal(firstLine(""), "");
  assert.equal(climbProgress(0, 1000, 800), 0.6, "viewport middle at 400px of 1000: 60% of the way up");
  assert.equal(climbProgress(-800, 1000, 800), 0, "scrolled past the bottom: at the start");
  assert.equal(climbProgress(500, 1000, 800), 1, "scene below the fold: at the summit");
  assert.equal(stopMark({ photo: { url: "x" } }), "📷");
  assert.equal(stopMark({ tone: "jackpot" }), "💎");
  assert.equal(stopMark({ tone: "whatever" }), "🌿");
});

test("the lamp flicker: a bounded random walk with gusts, at irregular gaps", () => {
  let level = 0.36;
  const seen = new Set();
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 400; i++) {
    const s = flickerStep(level, rand);
    assert.ok(s.brightness >= FLICKER_MIN && s.brightness <= FLICKER_MAX, `step ${i}: ${s.brightness}`);
    assert.ok(s.fade_steps >= 8 && s.fade_steps <= 44);
    seen.add(s.brightness);
    level = s.brightness;
  }
  assert.ok(seen.size > 100, "it wanders");
  assert.ok(flickerStep(0.4, () => 0.0).brightness < 0.3, "a gust dips hard");
  assert.equal(flickerStep(0.4, () => 0.0).fade_steps, 8, "and fast");
  for (let i = 0; i < 50; i++) { const g = flickerGap(rand); assert.ok(g >= FLICKER_GAP_MS[0] && g <= FLICKER_GAP_MS[1]); }
});

test("the rainbow: one hue per light across the palette, sliding with the offset", () => {
  const g = rainbowGroups(0);
  assert.equal(g.length, NUM_LEDS);
  assert.equal(g.reduce((n, x) => n + x.size, 0), NUM_LEDS);
  assert.deepEqual(g.map((x) => x.pos), [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
  const moved = rainbowGroups(RAINBOW_STEP);
  assert.ok(moved.every((x, i) => Math.abs(x.pos - ((g[i].pos + RAINBOW_STEP) % 1)) < 0.002), "every light moves the same step");
  assert.deepEqual(rainbowGroups(1), g, "a full offset is a full cycle");
  assert.ok(rainbowGroups(0.95)[1].pos < 0.1, "wraps around the palette");
});

test("the course: steps clamp to the done page, bad steps are dropped, the place is kept per day", () => {
  assert.equal(clampStep(-1, 5), 0);
  assert.equal(clampStep(3, 5), 3);
  assert.equal(clampStep(9, 5), 5, "one past the last step is the done page");
  assert.equal(clampStep(2, 0), 0);
  assert.equal(validSteps([{ title: "a", text: "b" }, { title: 1 }, null, "x"]).length, 1);
  assert.equal(validSteps("nope").length, 0);
  assert.equal(readKursIndex("2026-10-03"), 0);
  writeKursIndex("2026-10-03", 4);
  assert.equal(readKursIndex("2026-10-03"), 4);
  assert.equal(readKursIndex("2026-10-04"), 0, "another day starts at the top");
  assert.equal(readLastKurs(), null);
  rememberKurs({ day: "2026-10-03", category: { label: "Film" }, outcome: { title: "T", message: "m", steps: [{ title: "a", text: "b" }], done: "d" } });
  const last = readLastKurs();
  assert.equal(last.day, "2026-10-03");
  assert.equal(last.steps.length, 1);
  assert.deepEqual(kursAsPull(last).outcome.steps, last.steps);
  assert.equal(kursAsPull(last).category.label, "Film");
  rememberKurs({ day: "2026-10-05", outcome: { title: "no steps" } });
  assert.equal(readLastKurs().day, "2026-10-03", "an outcome without steps does not replace the course");
  const days = [
    { date: "2026-09-01", label: "Alt", outcomes: [{ title: "A", message: "m", steps: [{ title: "x", text: "y" }] }] },
    { date: "2026-10-03", label: "Neu", outcomes: [{ title: "B", message: "m", steps: [{ title: "x", text: "y" }, { title: "z", text: "w" }] }] },
    { date: "2026-10-04", label: "Ohne", outcomes: [{ title: "C", message: "m" }] }
  ];
  const kurse = configKurse(days);
  assert.deepEqual(kurse.map((k) => k.title), ["B", "A"], "newest first, outcomes without steps skipped");
  assert.equal(kurse[0].steps.length, 2);
  assert.equal(configKurse(undefined).length, 0);
});

test("the course figures: every key draws an svg, unknown keys draw nothing, the config only names real ones", () => {
  assert.ok(FIGURE_KEYS.length >= 12);
  for (const k of FIGURE_KEYS) assert.match(figureHtml(k), /^<svg [^>]*viewBox="0 0 320 \d+"/, k);
  assert.equal(figureHtml("nope"), "");
  assert.equal(figureHtml(undefined), "");
  const days = JSON.parse(readFileSync(new URL("../config/special-days.json", import.meta.url), "utf8")).days;
  for (const d of days) for (const o of d.outcomes || []) for (const s of o.steps || []) {
    if (s.figure) assert.ok(FIGURE_KEYS.includes(s.figure), `${d.date}: unknown figure ${s.figure}`);
  }
});

test("the colour memory: white is white, colour is kept per lamp, forgotten on purpose, aged out", () => {
  const white = { on: true, groups: [{ pos: 0, w: 1, size: 10 }] };
  const colour = { on: true, brightness: 0.6, fade_steps: 60, groups: [{ pos: 0.3, w: 0, size: 4 }, { pos: 0.7, w: 0.2, size: 6 }] };
  assert.equal(isWhite(white), true);
  assert.equal(isWhite({ groups: [{ pos: 0, w: 0.9, size: 5 }, { pos: 0, w: 0.3, size: 5 }] }), false, "one coloured group is colour");
  assert.equal(isColoured(colour), true);
  assert.equal(isColoured({ ...colour, on: false }), false, "off is not a colour to remember");
  assert.equal(isColoured(white), false);
  assert.equal(rememberColour("board_a", white), false);
  assert.equal(recallColour("board_a"), null);
  assert.equal(rememberColour("board_a", colour, 1000), true);
  const m = recallColour("board_a", 2000);
  assert.deepEqual(m.groups, colour.groups);
  assert.equal(m.brightness, 0.6);
  assert.deepEqual(restorePayload("board_a", m), { target: "board_a", on: true, groups: colour.groups, fade_steps: 60, brightness: 0.6 });
  assert.equal(recallColour("board_a", 1000 + MEMORY_MAX_AGE_MS + 1), null, "a week-old colour is not forced back");
  assert.equal(recallColour("board_b"), null, "each lamp its own");
  forgetColour(["board_a"]);
  assert.equal(recallColour("board_a", 2000), null);
});

test("the light-reactions switch: on by default, off is kept, on clears the key", () => {
  assert.equal(lightReactionsEnabled(), true);
  assert.equal(setLightReactions(false), false);
  assert.equal(lightReactionsEnabled(), false);
  assert.equal(env.localStorage.getItem("affektions-gacha:einstellung:lichtreaktionen"), "aus");
  assert.equal(setLightReactions(true), true);
  assert.equal(env.localStorage.getItem("affektions-gacha:einstellung:lichtreaktionen"), null);
});

test("the colour memory leaves a fresh sunrise alone", () => {
  const alarm = { enabled: true, lh: 7, lm: 0, duration_min: 20 };
  const at = (h, m) => { const d = new Date(2026, 9, 4); d.setHours(h, m, 0, 0); return d; };
  assert.equal(inSunriseGrace(alarm, at(7, 30)), true, "ten minutes after it ended");
  assert.equal(inSunriseGrace(alarm, at(9, 50)), true, "still inside three hours");
  assert.equal(inSunriseGrace(alarm, at(10, 30)), false);
  assert.equal(inSunriseGrace(alarm, at(6, 50)), false, "before it ended");
  assert.equal(inSunriseGrace({ ...alarm, enabled: false }, at(7, 30)), false);
  assert.equal(inSunriseGrace(null, at(7, 30)), false);
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
