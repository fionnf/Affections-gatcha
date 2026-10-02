// Pfand counting, the Morse timeline, and the sunrise alarm entry.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { readPfand, addPfand, markPfand, pfandProgress, writeHistory, readHistory } = await import("../src/storage.js");
const { PFAND_EVERY } = await import("../src/constants.js");
const { morseSteps, MORSE_PULSE_MS, MORSE_MAX_TAPS, sunriseAlarm, findSunrise, daysPreset, SUNRISE_DAYS, NUM_LEDS } = await import("../src/licht.js");

state.theme = { timezone: "Europe/Zurich" };
test.beforeEach(() => { env.localStorage.clear(); state.syncedHistory = null; });

test("every tenth returned capsule earns, the counter shows the cycle", () => {
  assert.deepEqual(pfandProgress(0), { inCycle: 0, every: PFAND_EVERY, earned: false });
  assert.deepEqual(pfandProgress(3), { inCycle: 3, every: PFAND_EVERY, earned: false });
  assert.deepEqual(pfandProgress(10), { inCycle: 0, every: PFAND_EVERY, earned: true });
  assert.deepEqual(pfandProgress(23), { inCycle: 3, every: PFAND_EVERY, earned: false });
  let last = null;
  for (let i = 0; i < PFAND_EVERY; i++) last = addPfand();
  assert.equal(last.count, PFAND_EVERY);
  assert.equal(last.earned, true);
  assert.equal(readPfand().count, PFAND_EVERY);
});

test("a day's capsule is returned once", () => {
  writeHistory([{ day: "2026-08-03", token: "lennart", categoryId: "niete", title: "N", message: "" }]);
  assert.equal(markPfand("2026-08-03", "lennart"), true);
  assert.equal(readHistory()[0].pfand, true);
  assert.equal(markPfand("2026-08-03", "lennart"), false, "second return refused");
  assert.equal(markPfand("2026-08-04", "lennart"), false, "unknown day refused");
});

test("the Morse timeline pulses once per tap and puts the lamp back", () => {
  const snap = { on: true, groups: [{ pos: 0.3, w: 0, size: NUM_LEDS }], brightness: 0.5, fade_steps: 60 };
  const steps = morseSteps([0, 300, 450], snap);
  const bright = steps.filter((s) => s.payload.brightness === 1.0);
  assert.equal(bright.length, 3);
  assert.deepEqual(bright.map((s) => s.at), [0, 300, 450]);
  assert.equal(steps.filter((s) => s.payload.brightness === 0.06).length, 3);
  assert.equal(steps[1].at, MORSE_PULSE_MS);
  const restore = steps[steps.length - 1];
  assert.deepEqual(restore.payload.groups, snap.groups);
  assert.equal(restore.payload.brightness, 0.5);
  let last = -1;
  for (const s of steps) { assert.ok(s.at >= last); last = s.at; }
  const off = morseSteps([0, 200], { ...snap, on: false });
  assert.equal(off[off.length - 1].payload.on, false, "a lamp that was off goes back off");
  assert.equal(morseSteps(new Array(40).fill(0).map((_, i) => i * 100)).filter((s) => s.payload.brightness === 1.0).length, MORSE_MAX_TAPS, "capped");
  assert.equal(morseSteps([], null)[0].payload.brightness, 0.6, "no snapshot: settle, never switch off a lamp that was on");
});

test("sunriseAlarm manages one tagged entry and leaves the others alone", () => {
  const theirs = { enabled: true, type: "sunset", hour: 21, minute: 0, lh: 23, lm: 0, duration_min: 30, days: [0, 1], boards: ["board_b"] };
  const list = sunriseAlarm([theirs], { time: "06:45", days: "taeglich", boards: ["board_a"], enabled: true });
  assert.equal(list.length, 2);
  assert.equal(list[0], theirs);
  const mine = findSunrise(list);
  assert.equal(mine.type, "sunrise");
  assert.equal(mine.gacha, "sunrise");
  assert.equal(mine.lh, 6); assert.equal(mine.lm, 45);
  assert.ok(Number.isInteger(mine.hour) && Number.isInteger(mine.minute), "UTC fields derived");
  assert.deepEqual(mine.days, SUNRISE_DAYS.taeglich);
  assert.deepEqual(mine.boards, ["board_a"]);
  assert.equal(mine.duration_min, 20);
  // A second call replaces, never duplicates.
  const again = sunriseAlarm(list, { time: "07:10", days: "wochenende", enabled: false });
  assert.equal(again.length, 2);
  assert.equal(findSunrise(again).enabled, false);
  assert.deepEqual(findSunrise(again).days, SUNRISE_DAYS.wochenende);
  assert.deepEqual(findSunrise(again).boards.sort(), ["board_a", "board_b"], "no boards given: both");
  assert.equal(daysPreset([4, 3, 2, 1, 0]), "werktags");
  assert.equal(daysPreset([5, 6]), "wochenende");
  assert.equal(daysPreset([2]), "werktags", "anything else reads as the default");
});
