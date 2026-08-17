import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { elevationAnalogy, distanceAnalogy, gipfelComparison } = await import("../src/berge.js");
const { formatKm } = await import("../src/utils.js");

test("distance analogy picks the largest reference that fits", () => {
  assert.equal(distanceAnalogy(844), "≈ 1,1× Jakobsweg");
  assert.equal(distanceAnalogy(84.39), "≈ 2× Marathon");
  assert.equal(distanceAnalogy(42.195), "≈ 1× Marathon");
  assert.equal(distanceAnalogy(21.0975), "≈ 1× Halbmarathon");
  assert.equal(distanceAnalogy(10), "≈ 1× 10-km-Lauf");
});

test("every distance reference is actually reachable", () => {
  // An earlier ladder had 40 km sitting next to 42.195 km, so the smaller one
  // could only ever be selected inside a 1.5 km band. Walk the whole range and
  // assert each name shows up somewhere.
  const seen = new Set();
  for (let km = 1; km <= 2000; km += 0.5) {
    const a = distanceAnalogy(km);
    if (a) seen.add(a.replace(/^≈ [^ ]+× /, ""));
  }
  assert.deepEqual([...seen].sort(),
    ["10-km-Lauf", "Halbmarathon", "Jakobsweg", "Marathon"].sort());
});

test("distance analogy stays quiet rather than saying something silly", () => {
  // Under 70% of even the smallest reference there is no honest comparison.
  assert.equal(distanceAnalogy(3), null);
  assert.equal(distanceAnalogy(0), null);
  assert.equal(distanceAnalogy(-5), null);
  assert.equal(distanceAnalogy(undefined), null);
  assert.equal(distanceAnalogy("nope"), null);
});

test("Gipfel comparison measures against their own highest summit", () => {
  const entries = [
    { name: "Grosse Mythen", elevation: 1898, elevGain: 1000 },
    { name: "Üetliberg", elevation: 869, elevGain: 400 },
  ];
  assert.equal(gipfelComparison(3796, entries), "≈ 2× euer höchster Gipfel (Grosse Mythen)");
  assert.equal(gipfelComparison(2657, entries), "≈ 1,4× euer höchster Gipfel (Grosse Mythen)");
});

test("Gipfel comparison uses summit height, never elevation gain", () => {
  // An entry can carry a big gain and no summit height; comparing against a
  // gain would make the sentence "×  your highest peak" simply untrue.
  const entries = [
    { name: "Langer Tag", elevGain: 2200 },
    { name: "Rigi", elevation: 1797, elevGain: 300 },
  ];
  assert.equal(gipfelComparison(3594, entries), "≈ 2× euer höchster Gipfel (Rigi)");
});

test("Gipfel comparison is absent until there is something to compare to", () => {
  assert.equal(gipfelComparison(5000, []), null);
  assert.equal(gipfelComparison(5000, [{ name: "Nur Gain", elevGain: 900 }]), null);
  assert.equal(gipfelComparison(0, [{ elevation: 1000 }]), null);
  assert.equal(gipfelComparison(500, [{ elevation: 1000 }]), null, "below 70% stays quiet");
  assert.equal(gipfelComparison(5000, null), null);
});

test("a nameless entry still gets a comparison, just without the name", () => {
  assert.equal(gipfelComparison(2000, [{ elevation: 1000 }]), "≈ 2× euer höchster Gipfel");
});

test("kilometres read like a walk below 100 and drop the decimal above", () => {
  assert.equal(formatKm(7.42), "7.4");
  assert.equal(formatKm(0), "0.0");
  assert.equal(formatKm(99.9), "99.9");
  assert.equal(formatKm(248.3), "248");
  assert.equal(formatKm("nope"), "—");
});

test("the elevation analogy still behaves", () => {
  assert.equal(elevationAnalogy(8849), "≈ 1× Everest");
  assert.equal(elevationAnalogy(0), null);
});
