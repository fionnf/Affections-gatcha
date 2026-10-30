import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const { plan, isWakeUp, describe } = createRequire(import.meta.url)("../scripts/clear-wakeups.cjs");

const rise = { enabled: true, type: "sunrise", hour: 4, minute: 30, lh: 5, lm: 30, days: [0, 1, 2, 3, 4], boards: ["board_a"] };
const untyped = { enabled: true, hour: 5, minute: 15 };
const sleep = { enabled: true, type: "sunset", hour: 21, minute: 0, lh: 22, lm: 0 };

test("wake-ups are anything not typed sunset, as the firmware reads it", () => {
  assert.equal(isWakeUp(rise), true);
  assert.equal(isWakeUp(untyped), true);
  assert.equal(isWakeUp({ type: "Sunrise" }), true);
  assert.equal(isWakeUp(sleep), false);
  assert.equal(isWakeUp(null), false);
});

test("a wake-up on the list is removed, bedtime stays", () => {
  const p = plan([rise, sleep, untyped], { board_a: { alarms: 3 }, board_b: { alarms: 3 } });
  assert.deepEqual(p.publish, [sleep]);
  assert.match(p.reason, /removing 2/);
});

test("the broker lost the list but a lamp still holds alarms: clear them", () => {
  const p = plan(null, { board_a: { alarms: 2 } });
  assert.deepEqual(p.publish, []);
  assert.match(p.reason, /holds 2/);
});

test("nothing to do when the lamps hold none and there is no list", () => {
  assert.equal(plan(null, { board_a: { alarms: 0 } }).publish, null);
  assert.equal(plan(null, {}).publish, null, "no lamp heard");
});

test("a lamp holding more than the list has gets the list again", () => {
  const p = plan([sleep], { board_a: { alarms: 2 }, board_b: { alarms: 1 } });
  assert.deepEqual(p.publish, [sleep]);
  assert.match(p.reason, /resending/);
});

test("a clean list that the lamps agree with is left alone, including when a lamp holds fewer", () => {
  assert.equal(plan([sleep], { board_a: { alarms: 1 }, board_b: { alarms: 1 } }).publish, null);
  assert.equal(plan([sleep], { board_a: { alarms: 0 } }).publish, null, "fewer is not stale");
  assert.equal(plan([sleep], { board_a: { fw: "old" } }).publish, null, "old firmware reports no count");
  assert.equal(plan([], {}).publish, null);
});

test("the log line shows when an alarm fires", () => {
  const s = describe(rise);
  assert.match(s, /WECKER/);
  assert.match(s, /04:30 UTC/);
  assert.match(s, /05:30/);
  assert.match(describe(sleep), /Einschlafen/);
});
