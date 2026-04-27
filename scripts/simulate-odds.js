#!/usr/bin/env node

/*
  Simulates the same category picker used in the Webflow embed.
  This does not replace the exact weighted formula check; it is a sanity check
  that the deterministic seeded RNG behaves as expected over many dates.
*/

const fs = require("node:fs");
const path = require("node:path");

const DAYS = Number(process.argv[2] || 10000);
const TOKEN = process.argv[3] || "test-token";
const configDir = path.join(__dirname, "..", "config");
const theme = JSON.parse(fs.readFileSync(path.join(configDir, "theme.json"), "utf8"));
const outcomes = JSON.parse(fs.readFileSync(path.join(configDir, "outcomes.json"), "utf8"));
const totalWeight = outcomes.categories.reduce((sum, category) => sum + category.weight, 0);
const counts = Object.fromEntries(outcomes.categories.map((category) => [category.id, 0]));

function hashStringToUint32(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRandom(seedText) {
  return mulberry32(hashStringToUint32(seedText))();
}

function pickWeighted(seedText) {
  const roll = Math.floor(seededRandom(seedText) * totalWeight);
  let cursor = 0;
  for (const category of outcomes.categories) {
    cursor += category.weight;
    if (roll < cursor) return category;
  }
  return config.categories[config.categories.length - 1];
}

function dateFromOffset(offset) {
  const date = new Date(Date.UTC(2026, 0, 1 + offset));
  return date.toISOString().slice(0, 10);
}

for (let day = 0; day < DAYS; day += 1) {
  const date = dateFromOffset(day);
  const category = pickWeighted(`${theme.secret}|${TOKEN}|${date}|category`);
  counts[category.id] += 1;
}

console.log(`Simulated ${DAYS} days for token "${TOKEN}".\n`);
console.log("| Kategorie | Erwartet | Simuliert | Abweichung |");
console.log("|---|---:|---:|---:|");

let hasLargeDeviation = false;
for (const category of outcomes.categories) {
  const expected = category.weight / totalWeight;
  const actual = counts[category.id] / DAYS;
  const delta = actual - expected;
  if (Math.abs(delta) > 0.015) hasLargeDeviation = true;
  console.log(
    `| ${category.label} | ${(expected * 100).toFixed(2)}% | ${(actual * 100).toFixed(2)}% | ${(delta * 100).toFixed(2)} pp |`
  );
}

if (hasLargeDeviation) {
  console.warn("\nWarning: at least one category deviated by more than 1.5 percentage points. Increase simulated days or inspect RNG changes.");
}
