// Two-tap confirm: first tap arms and restores itself after the window, the
// second tap confirms. No DOM needed beyond what a button exposes.
import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { armConfirm, disarm, ARM_MS } = await import("../src/confirm.js");

function fakeButton(html = "<b>Benutzen</b>") {
  const classes = new Set();
  return {
    innerHTML: html,
    get textContent() { return this.innerHTML; },
    set textContent(v) { this.innerHTML = v; },
    classList: { add: (c) => classes.add(c), remove: (c) => classes.delete(c), contains: (c) => classes.has(c) }
  };
}

test("first tap arms, second tap confirms and restores the label", () => {
  const btn = fakeButton();
  assert.equal(armConfirm(btn, "Sicher?"), false);
  assert.equal(btn.innerHTML, "Sicher?");
  assert.ok(btn.classList.contains("is-armed"));
  assert.equal(armConfirm(btn, "Sicher?"), true);
  assert.equal(btn.innerHTML, "<b>Benutzen</b>");
  assert.ok(!btn.classList.contains("is-armed"));
});

test("an armed button disarms itself after the window", async () => {
  const btn = fakeButton();
  const realTimeout = globalThis.setTimeout;
  let fire = null;
  globalThis.setTimeout = (fn, ms) => { assert.equal(ms, ARM_MS); fire = fn; return 1; };
  try {
    assert.equal(armConfirm(btn), false);
    fire();
    assert.equal(btn.innerHTML, "<b>Benutzen</b>");
    assert.ok(!btn.classList.contains("is-armed"));
    // After the window a tap arms again rather than confirming.
    assert.equal(armConfirm(btn), false);
  } finally {
    globalThis.setTimeout = realTimeout;
  }
  disarm(btn);
  assert.equal(btn.innerHTML, "<b>Benutzen</b>");
});

test("no button means no gate", () => {
  assert.equal(armConfirm(null), true);
});
