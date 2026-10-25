import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { buildBackup, applyBackup } = await import("../src/sicherung.js");

// localStorage with key()/length, which the shared shim leaves out.
function storage(init = {}) {
  const m = new Map(Object.entries(init));
  return {
    get length() { return m.size; },
    key: (i) => Array.from(m.keys())[i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    dump: () => Object.fromEntries(m),
  };
}

test("a Sicherung carries every app key and nothing else", () => {
  const s = storage({ "affektions-gacha:history:v1": "[1]", "affektions-gacha:kurs:v1": "{}", "other-site": "x" });
  const b = buildBackup(s, new Date("2026-10-25T10:00:00Z"));
  assert.equal(b.format, "affektions-gacha-sicherung");
  assert.equal(b.exportedAt, "2026-10-25T10:00:00.000Z");
  assert.deepEqual(Object.keys(b.data).sort(), ["affektions-gacha:history:v1", "affektions-gacha:kurs:v1"]);
});

test("restoring writes the file's keys back and leaves the rest", () => {
  const src = storage({ "affektions-gacha:history:v1": "[1,2]", "affektions-gacha:tokens:v1": "{\"🌿\":3}" });
  const backup = JSON.parse(JSON.stringify(buildBackup(src)));
  const dst = storage({ "affektions-gacha:history:v1": "[]", "affektions-gacha:sound:v1": "off" });
  assert.equal(applyBackup(backup, dst), 2);
  assert.deepEqual(dst.dump(), {
    "affektions-gacha:history:v1": "[1,2]",
    "affektions-gacha:sound:v1": "off",
    "affektions-gacha:tokens:v1": "{\"🌿\":3}",
  });
});

test("restoring refuses foreign files, newer versions and foreign keys", () => {
  const dst = storage();
  assert.throws(() => applyBackup({ hello: 1 }, dst), /keine Sicherung/);
  assert.throws(() => applyBackup({ format: "affektions-gacha-sicherung", version: 2, data: {} }, dst), /neueren Version/);
  assert.throws(() => applyBackup({ format: "affektions-gacha-sicherung", version: 1, data: { "evil": "x" } }, dst), /leer/);
  assert.equal(dst.length, 0);
});
