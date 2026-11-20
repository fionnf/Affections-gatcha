import test from "node:test";
import assert from "node:assert/strict";
import {
  APERTURES, SHUTTERS, ISOS, LIGHTS, evOfSettings, requiredEv, exposureStops, judge,
  suggestShutter, shutterLabel, apertureLabel, blurOf, brightnessOf, shutterReach, neededShutter
} from "../lugano/exposure.js";
import { TRIP, STOPS, PACK, PARTS, LESSONS, TASKS, BINGO, QUIZ, QUIZ_RATING } from "../lugano/content.js";

test("Sunny 16: bright sun, f/16, one over the ISO", () => {
  const sun = LIGHTS.find((l) => l.id === "sonne").ev;
  assert.equal(shutterLabel(suggestShutter(sun, 100, 16)), "1/125");
  assert.equal(shutterLabel(suggestShutter(sun, 200, 16)), "1/250");
  assert.equal(shutterLabel(suggestShutter(sun, 400, 16)), "1/500");
  const clouds = LIGHTS.find((l) => l.id === "bewoelkt").ev;
  assert.equal(shutterLabel(suggestShutter(clouds, 400, 8)), "1/500", "overcast is f/8 at 1/ISO, a stop more at ISO 400");
});

test("a stop more aperture and a stop shorter time give the same exposure", () => {
  const a = evOfSettings(8, 1 / 125), b = evOfSettings(5.6, 1 / 250);
  assert.ok(Math.abs(a - b) < 0.1);
  const sun = 15;
  assert.ok(Math.abs(exposureStops(sun, 200, 16, 1 / 250)) < 0.1, "ISO 200, f/16, 1/250 is right in the sun");
  assert.ok(exposureStops(sun, 200, 2, 1 / 250) > 3, "f/2 at 1/250 in the sun is far too bright");
  assert.ok(exposureStops(sun, 200, 16, 1 / 1000) < -1.5, "1/1000 at f/16 is too dark");
});

test("a faster film needs less light", () => {
  assert.equal(requiredEv(10, 400) - requiredEv(10, 100), 2);
  // Same settings, three stops faster film (ISO 800 vs 100): three stops more exposure.
  assert.ok(Math.abs(exposureStops(10, 800, 4, 1 / 250) - exposureStops(10, 100, 4, 1 / 250) - 3) < 1e-9);
});

test("the verdict reads in plain words", () => {
  assert.equal(judge(0).level, "ok");
  assert.equal(judge(0.4).level, "ok");
  assert.equal(judge(1).level, "over1");
  assert.match(judge(-1).text, /dunkel/);
  assert.equal(judge(2).level, "over2");
  assert.equal(judge(-3).level, "under3");
  assert.match(judge(3).text, /Viel zu hell/);
});

test("blur follows the settings: wide aperture blurs the depth, long time smears motion", () => {
  assert.ok(blurOf(2, 1 / 250).dof > blurOf(16, 1 / 250).dof);
  assert.equal(blurOf(16, 1 / 250).dof, 0);
  assert.ok(blurOf(8, 1 / 15).motion > blurOf(8, 1 / 500).motion);
  assert.ok(blurOf(8, 1 / 1000).motion < 1.2);
  const lo = brightnessOf(-9), hi = brightnessOf(9);
  assert.ok(lo >= 0.18 && hi <= 2.6, "kept readable");
  assert.ok(brightnessOf(1) > brightnessOf(0) && brightnessOf(0) === 1);
});

test("labels", () => {
  assert.equal(shutterLabel(1 / 250), "1/250");
  assert.equal(shutterLabel(1), '1"');
  assert.equal(apertureLabel(2.8), "f/2.8");
  assert.equal(APERTURES.length, 7);
  assert.equal(SHUTTERS.length, 7);
  assert.deepEqual(ISOS, [100, 200, 400, 800]);
});

test("every id is unique and every reference points somewhere", () => {
  const uniq = (xs) => new Set(xs).size === xs.length;
  assert.ok(uniq(STOPS.map((s) => s.id)));
  assert.ok(uniq(PACK.map((s) => s.id)));
  assert.ok(uniq(PARTS.map((s) => s.id)));
  assert.ok(uniq(LESSONS.map((s) => s.id)));
  assert.ok(uniq(TASKS.map((s) => s.id)));
  assert.ok(uniq(QUIZ.map((s) => s.id)));
  const stops = new Set(STOPS.map((s) => s.id));
  const people = new Set([...TRIP.people.map((p) => p.id), "all"]);
  for (const t of TASKS) {
    assert.ok(stops.has(t.stop), `${t.id}: unknown stop ${t.stop}`);
    assert.ok(people.has(t.who), `${t.id}: unknown person ${t.who}`);
    assert.ok(t.frames >= 1 && t.title && t.how && t.skill, t.id);
  }
});

test("each person has a full list, and the shared list covers the day", () => {
  for (const p of TRIP.people) assert.ok(TASKS.filter((t) => t.who === p.id).length >= 8, p.id);
  assert.ok(TASKS.filter((t) => t.who === "all").length >= 3);
  // Nobody's list needs more than a roll's worth of frames, with room to spare.
  for (const p of TRIP.people) {
    const frames = TASKS.filter((t) => t.who === p.id || t.who === "all").reduce((n, t) => n + t.frames, 0);
    assert.ok(frames <= 24, `${p.id} would need ${frames} frames`);
  }
});

test("every question has an answer that exists, and a reason", () => {
  for (const q of QUIZ) {
    assert.ok(q.options.length >= 3 && q.correct >= 0 && q.correct < q.options.length, q.id);
    assert.ok(q.why.length > 10, q.id);
  }
  for (const l of LESSONS) {
    const c = l.check;
    assert.ok(c.correct >= 0 && c.correct < c.options.length, l.id);
    assert.ok(l.blocks.length >= 1);
  }
  assert.equal(QUIZ_RATING[QUIZ_RATING.length - 1].min, 0, "someone always gets a rating");
  assert.ok(QUIZ_RATING.every((r, i) => i === 0 || r.min < QUIZ_RATING[i - 1].min), "ratings run high to low");
});

test("the correct answers are not always in the same spot", () => {
  const spots = new Set(QUIZ.map((q) => q.correct));
  const lessonSpots = new Set(LESSONS.map((l) => l.check.correct));
  assert.ok(spots.size >= 2 && lessonSpots.size >= 2, "someone will notice a pattern");
  assert.equal(BINGO.length, 9);
  assert.equal(PARTS.length, 8);
});

test("the shared link points at this page", () => {
  assert.match(TRIP.url, /^https:\/\/fionnf\.github\.io\/Affections-gatcha\/lugano\.html$/);
});

test("the calculator says when the dial cannot do it", () => {
  const sun = LIGHTS.find((l) => l.id === "sonne").ev;
  assert.equal(shutterReach(sun, 200, 16), "ok");
  assert.equal(shutterReach(sun, 400, 16), "ok", "1/500");
  assert.equal(shutterReach(sun, 400, 11), "ok", "1/1000 is the end of the dial and exactly right");
  assert.equal(shutterReach(sun, 400, 8), "zu-schnell", "f/8 in the sun on ISO 400 needs about 1/2000");
  assert.equal(shutterReach(sun, 800, 8), "zu-schnell");
  const dark = LIGHTS.find((l) => l.id === "innen").ev;
  assert.equal(shutterReach(dark, 100, 2.8), "ok", "a dim room on ISO 100 at f/2.8 needs about a quarter second");
  assert.equal(shutterReach(dark, 100, 8), "zu-langsam", "at f/8 the same room needs about two seconds");
  assert.ok(neededShutter(sun, 100, 16) > neededShutter(sun, 400, 16));
});
