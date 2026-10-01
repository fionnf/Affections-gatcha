// Voucher flag + title lookup, the open-voucher cap, the weekly Bärlauch
// token flag, and the hidden-letter hint cadence.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv, outcomesFixture, TEST_SECRET } from "./helpers.js";

const env = setupBrowserEnv("?player=lennart");
const { state } = await import("../src/state.js");
const { isVoucherEntry, registerVoucherTitles } = await import("../src/utils.js");
const { buildPullForDay, openVoucherCount, OPEN_VOUCHER_CAP } = await import("../src/pull.js");
const { writeHistory, baerlauchWeekClaimed, markBaerlauchWeekClaimed } = await import("../src/storage.js");
const { letterHintDue, LETTER_HINT_EVERY } = await import("../src/extras.js");

state.theme = { secret: TEST_SECRET, timezone: "Europe/Zurich" };
state.outcomes = outcomesFixture();
state.specialDays = { days: [] };
state.photos = [];
registerVoucherTitles(state.outcomes);

test.beforeEach(() => {
  env.localStorage.clear();
  env.setSearch("?player=lennart");
  state.syncedHistory = null;
  state.outcomes = outcomesFixture();
  registerVoucherTitles(state.outcomes);
});

// ── Vouchers ─────────────────────────────────────────────────────────────────

test("a voucher is the flag, or a title the config flags — never the wording", () => {
  assert.equal(isVoucherEntry({ title: "X", message: "Ein Gutschein für dich", voucher: true }), true);
  assert.equal(isVoucherEntry({ title: "X", message: "Ein Gutschein für dich", voucher: false }), false);
  // An entry recorded before the flag existed: recognised by its title.
  assert.equal(isVoucherEntry({ title: "R1", message: "r1", categoryId: "rare" }), true);
  // Text that merely mentions a Gutschein is not one.
  assert.equal(isVoucherEntry({ title: "Nur Text", message: "Die Maschine lädt dich ein, kein Gutschein aber" }), false);
  assert.equal(isVoucherEntry(null), false);
});

test("registerVoucherTitles follows the config: a renamed outcome stops matching", () => {
  registerVoucherTitles({ categories: [{ id: "rare", outcomes: [{ title: "Neu", voucher: true }] }] });
  assert.equal(isVoucherEntry({ title: "R1" }), false);
  assert.equal(isVoucherEntry({ title: "Neu" }), true);
});

function openVoucherHistory(n, used = false) {
  const entries = [];
  for (let i = 1; i <= n; i++) {
    entries.push({ day: `2026-07-${String(i).padStart(2, "0")}`, token: "lennart", categoryId: "rare",
      title: `Alt ${i}`, message: "", voucher: true, used, usedAt: used ? "2026-07-20" : undefined });
  }
  writeHistory(entries);
}

test("openVoucherCount counts unredeemed vouchers before the day", () => {
  openVoucherHistory(3);
  assert.equal(openVoucherCount("lennart", "2026-08-01"), 3);
  assert.equal(openVoucherCount("lennart", "2026-07-02"), 1, "only days before the one asked about");
  openVoucherHistory(3, true);
  assert.equal(openVoucherCount("lennart", "2026-08-01"), 0);
});

test("with the cap reached, voucher outcomes step aside for plain ones in the same category", () => {
  state.outcomes.categories.find((c) => c.id === "rare").outcomes = [
    { title: "R1", message: "r1", voucher: true },
    { title: "R2", message: "r2" },
    { title: "R3", message: "r3" }
  ];
  env.setSearch("?player=lennart&preview-category=rare");
  openVoucherHistory(OPEN_VOUCHER_CAP);
  for (let i = 1; i <= 20; i++) {
    const pull = buildPullForDay(`2026-08-${String(i).padStart(2, "0")}`, 0);
    assert.equal(pull.category.id, "rare");
    assert.notEqual(pull.outcome.title, "R1", `day ${i} handed out a voucher past the cap`);
  }
});

test("once vouchers are used the cap lifts and vouchers return", () => {
  state.outcomes.categories.find((c) => c.id === "rare").outcomes = [
    { title: "R1", message: "r1", voucher: true },
    { title: "R2", message: "r2" }
  ];
  env.setSearch("?player=lennart&preview-category=rare");
  openVoucherHistory(OPEN_VOUCHER_CAP, true);
  let sawVoucher = false;
  for (let i = 1; i <= 20 && !sawVoucher; i++) {
    sawVoucher = buildPullForDay(`2026-08-${String(i).padStart(2, "0")}`, 0).outcome.title === "R1";
  }
  assert.ok(sawVoucher, "R1 never came back although nothing is open");
});

test("a category with only vouchers still hands one out under the cap", () => {
  env.setSearch("?player=lennart&preview-category=rare");
  openVoucherHistory(OPEN_VOUCHER_CAP + 2);
  assert.equal(buildPullForDay("2026-08-01", 0).outcome.title, "R1");
});

// ── Bärlauch weekly token ─────────────────────────────────────────────────────

test("the weekly Bärlauch flag is per ISO week", () => {
  assert.equal(baerlauchWeekClaimed("2026-W10"), false);
  markBaerlauchWeekClaimed("2026-W10");
  assert.equal(baerlauchWeekClaimed("2026-W10"), true);
  assert.equal(baerlauchWeekClaimed("2026-W11"), false, "a new week earns again");
});

// ── Letter hint ──────────────────────────────────────────────────────────────

test("the letter hint shows on every tenth pull until the letter was opened", () => {
  assert.equal(letterHintDue(0), false);
  assert.equal(letterHintDue(3), false);
  assert.equal(letterHintDue(LETTER_HINT_EVERY), true);
  assert.equal(letterHintDue(LETTER_HINT_EVERY * 3), true);
  env.localStorage.setItem("affektions-gacha:letter-opened:v1", "yes");
  assert.equal(letterHintDue(LETTER_HINT_EVERY), false);
});
