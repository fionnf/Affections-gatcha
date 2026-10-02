// The pure parts of the delights: weather mapping and text, the word picker,
// the night words, random lamp groups, a scene built from a lamp, the hug log.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { weatherEmoji, weatherMood, weatherText, weatherForEntry } = await import("../src/wetter.js");
const { wordAt, nachtWort, NACHT_WORTE } = await import("../src/delights.js");
const { randomGroups, sceneFromLamp, NUM_LEDS } = await import("../src/licht.js");
const { readHugLog, mergeHugLog, addHugToLog } = await import("../src/storage.js");

test.beforeEach(() => env.localStorage.clear());

test("weather codes map to an emoji, day and night, and to a hero mood", () => {
  assert.equal(weatherEmoji(0, true), "☀️");
  assert.equal(weatherEmoji(0, false), "🌙");
  assert.equal(weatherEmoji(45), "🌫");
  assert.equal(weatherEmoji(63), "🌧");
  assert.equal(weatherEmoji(73), "🌨");
  assert.equal(weatherEmoji(95), "⛈");
  assert.equal(weatherEmoji(999), "🌡", "an unknown code still draws something");
  assert.equal(weatherMood(61), "rain");
  assert.equal(weatherMood(85), "snow");
  assert.equal(weatherMood(48), "fog");
  assert.equal(weatherMood(99), "storm");
  assert.equal(weatherMood(1), null);
});

test("weatherText rounds and keeps the pair as one token", () => {
  assert.equal(weatherText({ t: 3.6, c: 61, e: "🌧" }), "4° 🌧");
  assert.equal(weatherText({ t: -0.4, c: 71 }), "0° 🌨", "falls back to the code's emoji");
  assert.equal(weatherText(null), "");
  assert.deepEqual(weatherForEntry({ t: 12.345, c: 2, d: true, at: 1 }), { t: 12.3, c: 2, e: "⛅" });
  assert.equal(weatherForEntry(null), null);
});

test("wordAt expands to the word under the offset, hyphens and apostrophes included", () => {
  const txt = "Du bist heute offiziell süß, Lieblings-Mensch.";
  assert.equal(wordAt(txt, 10), "heute");
  assert.equal(wordAt(txt, 26), "süß");
  assert.equal(wordAt(txt, 32), "Lieblings-Mensch");
  assert.equal(wordAt(txt, 0), "Du");
  assert.equal(wordAt("", 0), "");
  assert.equal(wordAt(txt, 28), "", "between a comma and a space there is no word");
});

test("nachtWort picks from the pool for any seed", () => {
  assert.ok(NACHT_WORTE.includes(nachtWort(0)));
  assert.ok(NACHT_WORTE.includes(nachtWort(0.999)));
  assert.ok(NACHT_WORTE.includes(nachtWort()));
});

test("randomGroups always covers the strip with two to four groups", () => {
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 200; i++) {
    const g = randomGroups(rand);
    assert.ok(g.length >= 2 && g.length <= 4, `groups ${g.length}`);
    assert.equal(g.reduce((n, x) => n + x.size, 0), NUM_LEDS);
    for (const x of g) assert.ok(x.pos >= 0 && x.pos <= 1 && x.w >= 0 && x.w <= 1 && x.size >= 1);
  }
});

test("sceneFromLamp stores what the lights page expects", () => {
  const scene = sceneFromLamp("Abend", { groups: [{ pos: 0.2, w: 0, size: 4 }, { pos: 0.8, w: 0.5, size: 6 }], brightness: 0.4, fade_steps: 90, on: true }, 1000);
  assert.equal(scene.name, "Abend");
  assert.equal(scene.updated, 1000);
  assert.deepEqual(scene.boundaries, [4]);
  assert.deepEqual(scene.groupPositions, [0.2, 0.8]);
  assert.deepEqual(scene.groupWLevels, [0, 0.5]);
  assert.equal(scene.brightness, 0.4);
  assert.equal(scene.fadeSteps, 90);
  assert.equal(scene.on, true);
  const bare = sceneFromLamp("Leer", null);
  assert.equal(bare.groups.reduce((n, x) => n + x.size, 0), NUM_LEDS);
  assert.deepEqual(bare.boundaries, []);
});

test("the hug log unions, sorts and never shrinks", () => {
  addHugToLog("2026-08-02T10:00:00.000Z");
  mergeHugLog(["2026-07-01T09:00:00.000Z", "2026-08-02T10:00:00.000Z", "", 42]);
  assert.deepEqual(readHugLog(), ["2026-07-01T09:00:00.000Z", "2026-08-02T10:00:00.000Z"]);
  mergeHugLog([]);
  assert.equal(readHugLog().length, 2);
});
