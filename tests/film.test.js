import test from "node:test";
import assert from "node:assert/strict";
import { WEEKS, FOLLOW } from "../film/content.js";
import { WEEK_START, PEOPLE, API } from "../film/config.js";
import { weekIndex, releasedWeeks, weekLabel, zurichToday } from "../film/weeks.js";

test("every week has a theme, a tip with something to try, and a challenge", () => {
  assert.equal(WEEKS.length, 26);
  const themes = new Set();
  for (const [i, w] of WEEKS.entries()) {
    const at = `week ${i + 1}`;
    assert.ok(w.theme && w.theme.length <= 24, at + " theme");
    assert.ok(!themes.has(w.theme), at + " theme repeats");
    themes.add(w.theme);
    assert.ok(w.tip.title && w.tip.tryIt, at + " tip");
    assert.ok(Array.isArray(w.tip.text) && w.tip.text.length >= 1 && w.tip.text.every((t) => t.length > 20), at + " tip text");
    assert.ok(w.challenge.title && w.challenge.how.length > 20, at + " challenge");
    assert.ok(w.challenge.rule === undefined || w.challenge.rule.length <= 60, at + " rule");
  }
});

test("week 1 starts on a Monday and the weeks count from it", () => {
  assert.equal(new Date(WEEK_START + "T12:00:00Z").getUTCDay(), 1, "a Monday");
  assert.equal(weekIndex("2026-11-23", WEEK_START), 1);
  assert.equal(weekIndex("2026-11-29", WEEK_START), 1, "Sunday still week 1");
  assert.equal(weekIndex("2026-11-30", WEEK_START), 2);
  assert.equal(weekIndex("2026-11-21", WEEK_START), 0, "before the start");
  assert.equal(releasedWeeks("2026-11-21", WEEK_START, 26), 1, "week 1 can be previewed");
  assert.equal(releasedWeeks("2027-05-17", WEEK_START, 26), 26);
  assert.equal(releasedWeeks("2030-01-01", WEEK_START, 26), 26, "never past the last card");
  assert.equal(weekLabel(WEEK_START, 1), "23. November");
  assert.equal(weekLabel(WEEK_START, 26), "17. Mai");
});

test("the day is read in Zurich time", () => {
  // 23:30 UTC on Sunday is already Monday in Zurich in winter.
  assert.equal(zurichToday(new Date("2026-11-22T23:30:00Z")), "2026-11-23");
  assert.equal(zurichToday(new Date("2026-11-22T22:30:00Z")), "2026-11-22");
});

test("the people match what the server accepts and the API is an https URL", () => {
  assert.deepEqual(PEOPLE.map((p) => p.id), ["fionn", "lennart", "natalie"]);
  assert.match(API, /^https:\/\/[a-z0-9]+\.supabase\.co\/functions\/v1\/film-api$/);
});

test("every week points at real examples and the follow list has usable links", () => {
  for (const [i, w] of WEEKS.entries()) {
    assert.ok(w.look && w.look.q.length > 5, `week ${i + 1} look.q`);
    assert.match(w.look.tag, /^[a-z0-9]+$/, `week ${i + 1} hashtag`);
  }
  assert.ok(FOLLOW.length >= 6);
  for (const f of FOLLOW) {
    assert.ok(f.name && f.focus, f.name);
    assert.ok(f.ig || f.site, `${f.name} needs a link`);
    if (f.ig) assert.match(f.ig, /^[A-Za-z0-9._]+$/, f.name);
    if (f.site) assert.match(f.site, /^https:\/\//, f.name);
  }
});
