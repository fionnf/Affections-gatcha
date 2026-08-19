import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { runsToday, todayShort } = await import("../src/skincare.js");

test("a step with no schedule runs every day", () => {
  for (const d of ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]) {
    assert.equal(runsToday({ name: "Serum" }, d), true);
    assert.equal(runsToday({ name: "Serum", when: "" }, d), true);
    assert.equal(runsToday({ name: "Serum", when: "daily" }, d), true);
    assert.equal(runsToday({ name: "Serum", when: "täglich" }, d), true);
  }
});

test("a scheduled step only runs on its days", () => {
  const retinol = { name: "Retinol", when: "Di, Fr" };
  assert.equal(runsToday(retinol, "Di"), true);
  assert.equal(runsToday(retinol, "Fr"), true);
  assert.equal(runsToday(retinol, "Mi"), false);
  assert.equal(runsToday(retinol, "So"), false);
});

test("the schedule is forgiving about spacing and case", () => {
  assert.equal(runsToday({ when: "di,fr" }, "Di"), true);
  assert.equal(runsToday({ when: "  Di ,  Fr  " }, "Fr"), true);
  assert.equal(runsToday({ when: "SO" }, "So"), true);
});

test("an unknown weekday shows everything rather than an empty routine", () => {
  // If the day cannot be resolved, dimming every scheduled step would leave a
  // routine that looks switched off. Better to show it all.
  assert.equal(runsToday({ when: "Di, Fr" }, null), true);
  assert.equal(runsToday({ when: "Di, Fr" }, ""), true);
});

test("junk steps do not throw", () => {
  assert.equal(runsToday(null, "Mi"), true);
  assert.equal(runsToday({}, "Mi"), true);
  assert.equal(runsToday({ when: 42 }, "Mi"), true);
});

test("todayShort returns a weekday the schedule can match", () => {
  const d = todayShort("Europe/Zurich");
  assert.ok(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].includes(d), `got ${d}`);
  assert.equal(todayShort("Definitely/NotAZone"), null, "a bad zone must not throw");
});
