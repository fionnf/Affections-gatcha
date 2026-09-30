import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { choreography } = await import("../src/lightsFx.js");

test("every lamp step keeps the ten LEDs accounted for and runs in order", () => {
  for (const tone of ["jackpot", "rare", "quest", "cursed", "photo", "quiet", "soft", "special"]) {
    const steps = choreography(tone);
    assert.ok(steps.length >= 7, `${tone}: rattle plus reveal at least`);
    let last = -1;
    for (const s of steps) {
      assert.ok(s.at > last, `${tone}: steps must be strictly ordered`);
      last = s.at;
      const leds = s.payload.groups.reduce((n, g) => n + g.size, 0);
      assert.equal(leds, 10, `${tone}: group sizes must sum to the strip`);
      assert.ok(s.at < 18000, `${tone}: nothing fires after the restore`);
    }
  }
});

test("the rare tones shimmer, the ordinary ones just hold", () => {
  assert.ok(choreography("jackpot").length > choreography("soft").length);
  assert.ok(choreography("rare").length > choreography("quest").length);
  // A Foto-Drop's base is white, so its sparks must be a colour, not more white.
  const photoSpark = choreography("photo")[0].payload.groups[1];
  assert.equal(photoSpark.w, 0);
});
