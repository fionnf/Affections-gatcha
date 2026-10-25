import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const require = createRequire(import.meta.url);
const { validateConfig, loadRuntimeFacts, isRealDate } = require("../scripts/validate-gacha-config.cjs");

const facts = loadRuntimeFacts();
const readConfig = (name) => JSON.parse(readFileSync(new URL(`../config/${name}`, import.meta.url), "utf8"));

function baseConfig() {
  const cat = (id, tone, weight) => ({
    id, label: id, tone, weight,
    outcomes: [{ title: `${id} eins`, message: "Hallo." }]
  });
  return {
    theme: {
      brand: { machineName: "M", displayNameDefault: "L", fromName: "F", titleTemplate: "{name}s M" },
      secret: "ein-geheimnis-das-lang-genug-ist-2026",
      timezone: "Europe/Zurich",
      tokenParam: "token",
      messageTarget: "https://example.com/{text}",
      revealDelayMs: 1000,
      loadingSteps: ["x"],
      colors: {}, darkColors: {}
    },
    outcomes: {
      categories: [
        cat("niete", "quiet", 10), cat("common", "soft", 10), cat("uncommon", "warm", 10),
        cat("cursed", "cursed", 10), cat("rare", "rare", 10), cat("photo", "photo", 10), cat("jackpot", "jackpot", 1)
      ]
    },
    photosConfig: { photos: [{ url: "https://example.com/a.jpg", alt: "a" }] },
    specialDaysConfig: { days: [] },
    readme: null
  };
}

const day = (extra) => ({ date: "2026-08-19", label: "Tag", outcomes: [{ title: "T", message: "M" }], ...extra });
const run = (cfg, f = facts) => validateConfig(cfg, f);
const has = (list, re) => list.some((m) => re.test(m));

test("the base fixture is clean", () => {
  const { errors, warnings } = run(baseConfig());
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test("the real config in config/ passes", () => {
  const { errors } = run({
    theme: readConfig("theme.json"),
    outcomes: readConfig("outcomes.json"),
    photosConfig: readConfig("photos.json"),
    specialDaysConfig: readConfig("special-days.json"),
    readme: null
  });
  assert.deepEqual(errors, []);
});

test("CLI still exits 0 and prints the odds on the real config", () => {
  const out = execFileSync(process.execPath, ["scripts/validate-gacha-config.cjs"], {
    cwd: new URL("..", import.meta.url), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"]
  });
  assert.match(out, /^Odds:/);
  assert.match(out, /Special days: \d+ entries found\./);
  assert.match(out, /Config validation passed\./);
});

test("runtime facts are read from src/", () => {
  assert.ok(facts.liveTokens && facts.liveTokens.size > 0);
  assert.ok(facts.figureKeys && facts.figureKeys.has("blende") && facts.figureKeys.has("sunny16"));
  assert.deepEqual([...facts.playerTokens], ["lennart"]);
});

// ── special-day steps ────────────────────────────────────────────────────────

test("special-day steps are checked like outcome steps", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ outcomes: [{ title: "T", message: "M", steps: [{ title: "a" }, { title: "b", text: "c", figure: "nope" }, { title: "d", text: "e", figure: "sunny16" }] }] })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /special-days\[0\]\.outcomes\[0\] step 0 needs a title and a text/), errors.join("\n"));
  assert.ok(has(errors, /special-days\[0\]\.outcomes\[0\] step 1: figure "nope" is not a known figure/), errors.join("\n"));
  assert.ok(!has(errors, /step 2/), "a real figure with a digit (sunny16) is accepted");
});

test("special-day steps must be a non-empty array; items are checked too", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ outcomes: [{ title: "T", message: "M", steps: "x", items: [{ title: "a", text: "b", figure: "Kamera" }] }] })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /outcomes\[0\]: steps must be a non-empty array/));
  assert.ok(has(errors, /outcomes\[0\] item 0: figure must be a short lowercase name/));
});

test("unknown figure in outcomes.json steps is an error", () => {
  const cfg = baseConfig();
  cfg.outcomes.categories[1].outcomes[0].steps = [{ title: "a", text: "b", figure: "blendee" }];
  const { errors } = run(cfg);
  assert.ok(has(errors, /^Outcome common\[0\] step 0: figure "blendee" is not a known figure/));
});

test("special-day link and token are still checked", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ outcomes: [{ title: "T", message: "M", link: "ftp://x", token: "☕" }] })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /outcomes\[0\]\.link must be a valid http\(s\) URL/));
  assert.ok(has(errors, /outcomes\[0\]\.token "☕" is not a live token type/));
});

// ── dates ────────────────────────────────────────────────────────────────────

test("isRealDate", () => {
  for (const ok of ["2026-02-28", "2024-02-29", "02-29", "12-31", "2026-01-01"]) assert.ok(isRealDate(ok), ok);
  for (const bad of ["2026-02-30", "2026-02-29", "13-45", "00-10", "04-31", "2026-13-01", "2026-00-10", "2026-01-00"]) assert.ok(!isRealDate(bad), bad);
});

test("impossible dates are rejected", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [
    day({ date: "2026-02-30" }),
    day({ date: "13-45", repeat: "yearly" }),
    day({ date: "02-29", repeat: "yearly" })
  ];
  const { errors } = run(cfg);
  assert.ok(has(errors, /special-days\[0\]\.date "2026-02-30" is not a real calendar date/));
  assert.ok(has(errors, /special-days\[1\]\.date "13-45" is not a real calendar date/));
  assert.ok(!has(errors, /special-days\[2\]/), errors.join("\n"));
});

// ── overlaps ─────────────────────────────────────────────────────────────────

test("a yearly entry ahead of a dated one on the same day makes the dated one unreachable", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ date: "08-19", repeat: "yearly", label: "Jährlich" }), day({ label: "Einmal" })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /special-days\[1\] \("Einmal"\) can never fire: special-days\[0\] \("Jährlich"\) matches 2026-08-19 first/), errors.join("\n"));
});

test("a dated entry ahead of a yearly one only warns, naming the winner", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ label: "Einmal" }), day({ date: "08-19", repeat: "yearly", label: "Jährlich" })];
  const { errors, warnings } = run(cfg);
  assert.deepEqual(errors, []);
  assert.ok(has(warnings, /special-days\[0\] \("Einmal"\) wins there because it comes first/), warnings.join("\n"));
});

test("an exact duplicate date in the same scope is unreachable", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ player: "lennart" }), day()];
  const { errors } = run(cfg);
  assert.ok(has(errors, /special-days\[1\] .* can never fire/), errors.join("\n"));
});

test("different calendar days do not overlap", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ date: "08-20", repeat: "yearly" }), day(), day({ date: "2027-08-19" })];
  const { errors, warnings } = run(cfg);
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test("an earlier entry scoped to another token would not shadow (scope-aware)", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ player: "fionn" }), day()];
  const { errors } = run(cfg, { ...facts, playerTokens: new Set(["lennart", "fionn"]) });
  assert.ok(!has(errors, /can never fire/), errors.join("\n"));
});

// ── player ───────────────────────────────────────────────────────────────────

test("player must be the token getToken returns", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ player: "Lennart" }), day({ date: "2026-08-20", player: "fionn" }), day({ date: "2026-08-21", player: "lennart" })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /special-days\[0\]\.player "Lennart" never matches/));
  assert.ok(has(errors, /special-days\[1\]\.player "fionn" never matches/));
  assert.ok(!has(errors, /special-days\[2\]/));
});

// ── categories ───────────────────────────────────────────────────────────────

test("missing hard-coded category ids warn, reserved ids error", () => {
  const cfg = baseConfig();
  cfg.outcomes.categories = cfg.outcomes.categories.filter((c) => !["jackpot", "common", "cursed", "niete"].includes(c.id));
  cfg.outcomes.categories.push({ id: "special", label: "S", tone: "warm", weight: 1, outcomes: [{ title: "s", message: "m" }] });
  const { errors, warnings } = run(cfg);
  for (const id of ["jackpot", "common", "cursed", "niete"]) {
    assert.ok(has(warnings, new RegExp(`No category with id "${id}"`)), `${id}: ${warnings.join("\n")}`);
  }
  assert.ok(has(errors, /Category id "special" is reserved/));
});

test("photos without a photo category warn", () => {
  const cfg = baseConfig();
  cfg.outcomes.categories = cfg.outcomes.categories.filter((c) => c.id !== "photo");
  const { warnings } = run(cfg);
  assert.ok(has(warnings, /no category with id "photo"/));
});

// ── time, timezone, URLs ─────────────────────────────────────────────────────

test("unlockTime must be a real HH:MM and should gate a link", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [
    day({ unlockTime: "25:00", outcomes: [{ title: "T", message: "M", link: "https://x.ch" }] }),
    day({ date: "2026-08-20", unlockTime: "11:30" })
  ];
  const { errors, warnings } = run(cfg);
  assert.ok(has(errors, /special-days\[0\]\.unlockTime must be "HH:MM"/));
  assert.ok(has(warnings, /special-days\[1\]\.unlockTime only locks an outcome's link/));
});

test("timezones must be IANA zones", () => {
  const cfg = baseConfig();
  cfg.theme.timezone = "Europe/Zürich";
  cfg.specialDaysConfig.days = [day({ unlockTime: "11:30", unlockTimezone: "Mars/Olympus", outcomes: [{ title: "T", message: "M", link: "https://x.ch" }] })];
  const { errors } = run(cfg);
  assert.ok(has(errors, /theme\.timezone "Europe\/Zürich" is not a recognised IANA timezone/));
  assert.ok(has(errors, /special-days\[0\]\.unlockTimezone "Mars\/Olympus" is not a recognised IANA timezone/));
});

test("special-day photo: relative path must exist, odd schemes rejected", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [
    day({ photo: { url: "media/fehlt.jpg", alt: "x" } }),
    day({ date: "2026-08-20", photo: { url: "media/da.jpg", alt: "x" } }),
    day({ date: "2026-08-21", photo: { url: "javascript:alert(1)", alt: "x" } }),
    day({ date: "2026-08-22", photo: { url: "https://example.com/x.jpg", alt: "x" } })
  ];
  const { errors } = run(cfg, { ...facts, fileExists: (p) => p === "media/da.jpg" });
  assert.ok(has(errors, /special-days\[0\]\.photo\.url "media\/fehlt\.jpg" does not exist/));
  assert.ok(!has(errors, /special-days\[1\]/));
  assert.ok(has(errors, /special-days\[2\]\.photo\.url must be an http\(s\) URL or a relative path/));
  assert.ok(!has(errors, /special-days\[3\]/));
});

test("photos.json url with a non-http scheme is an error, plain http warns", () => {
  const cfg = baseConfig();
  cfg.photosConfig.photos.push({ url: "data:image/png;base64,AAAA", alt: "d" }, { url: "http://example.com/b.jpg", alt: "b" });
  const { errors, warnings } = run(cfg);
  assert.ok(has(errors, /photos\[1\]\.url must be an http\(s\) URL/));
  assert.ok(has(warnings, /photos\[2\]\.url is plain http/));
});

test("photoAlt that matches no image warns", () => {
  const cfg = baseConfig();
  cfg.specialDaysConfig.days = [day({ photoAlt: "gibt es nicht" })];
  const { warnings } = run(cfg);
  assert.ok(has(warnings, /photoAlt "gibt es nicht" matches no image/));
});

test("malformed entries are reported, not thrown", () => {
  const cfg = baseConfig();
  cfg.outcomes.categories[0].outcomes.push(null);
  cfg.specialDaysConfig.days = [null, day({ outcomes: [null] })];
  cfg.photosConfig.photos.push(null);
  const { errors } = run(cfg);
  assert.ok(has(errors, /Outcome niete\[1\] must be an object/));
  assert.ok(has(errors, /special-days\[0\] must be an object/));
  assert.ok(has(errors, /special-days\[1\]\.outcomes\[0\] must be an object/));
  assert.ok(has(errors, /photos\[1\] must be an object/));
});
