import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { dateKeyInTimezone, setDayStartHour } = await import("../src/utils.js");

const TZ = "Europe/Zurich";
// 2026-09-30 in Zurich is CEST (UTC+2), so local = UTC + 2h.
const zurich = (iso) => new Date(iso);

test("with the day starting at 04:00, the small hours belong to the evening before", () => {
  setDayStartHour(4);
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-29T23:30:00Z")), "2026-09-29", "01:30 Zurich is still the 29th");
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-30T01:59:00Z")), "2026-09-29", "03:59 Zurich is still the 29th");
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-30T02:00:00Z")), "2026-09-30", "04:00 Zurich turns the day");
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-30T20:00:00Z")), "2026-09-30", "an ordinary evening is unaffected");
  setDayStartHour(0);
});

test("a day start of 0 is plain midnight, and nonsense falls back to it", () => {
  setDayStartHour(0);
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-29T23:30:00Z")), "2026-09-30");
  setDayStartHour(27);
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-29T23:30:00Z")), "2026-09-30");
  setDayStartHour("4");
  assert.equal(dateKeyInTimezone(TZ, zurich("2026-09-29T23:30:00Z")), "2026-09-30", "a string is not an hour");
});
