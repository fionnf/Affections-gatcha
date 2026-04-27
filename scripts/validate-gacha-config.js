#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const configDir = path.join(__dirname, "..", "config");
const theme = readJson("theme.json");
const outcomes = readJson("outcomes.json");
const photosConfig = readJson("photos.json");

const errors = [];
const warnings = [];

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function assert(condition, message) {
  if (!condition) addError(message);
}

assert(theme.brand, "theme.brand is required.");
assert(Array.isArray(outcomes.categories), "outcomes.categories must be an array.");
assert(Array.isArray(photosConfig.photos), "photos.photos must be an array, even if empty.");

if (theme.brand) {
  assert(typeof theme.brand.machineName === "string" && theme.brand.machineName, "brand.machineName is required.");
  assert(typeof theme.brand.displayNameDefault === "string" && theme.brand.displayNameDefault, "brand.displayNameDefault is required.");
  assert(typeof theme.brand.fromName === "string" && theme.brand.fromName, "brand.fromName is required.");
  assert(typeof theme.brand.titleTemplate === "string" && theme.brand.titleTemplate.includes("{name}"), "brand.titleTemplate should include {name}.");
}

assert(typeof theme.secret === "string" && theme.secret.length >= 24, "theme.secret should be at least 24 characters.");
assert(theme.secret !== "AENDERN-geheimes-wort-damit-die-kapseln-nicht-vorhersagbar-sind", "Change theme.secret from the placeholder value.");
assert(typeof theme.timezone === "string" && theme.timezone, "theme.timezone is required.");
assert(typeof theme.tokenParam === "string" && theme.tokenParam, "theme.tokenParam is required.");
assert(typeof theme.messageTarget === "string" && theme.messageTarget, "theme.messageTarget is required.");
assert(Number.isInteger(theme.revealDelayMs) && theme.revealDelayMs >= 1000, "theme.revealDelayMs should be an integer >= 1000.");
assert(Array.isArray(theme.loadingSteps) && theme.loadingSteps.length > 0, "theme.loadingSteps must contain at least one step.");
assert(theme.colors && theme.darkColors, "theme.colors and theme.darkColors are required.");

if (Array.isArray(outcomes.categories)) {
  const ids = new Set();
  let totalWeight = 0;

  for (const category of outcomes.categories) {
    assert(typeof category.id === "string" && category.id, "Every category needs an id.");
    if (category.id) {
      if (ids.has(category.id)) addError(`Duplicate category id: ${category.id}`);
      ids.add(category.id);
    }

    assert(typeof category.label === "string" && category.label, `Category ${category.id || "(unknown)"} needs a label.`);
    assert(Number.isInteger(category.weight) && category.weight > 0, `Category ${category.id || "(unknown)"} needs a positive integer weight.`);
    assert(typeof category.tone === "string" && category.tone, `Category ${category.id || "(unknown)"} needs a tone.`);
    assert(Array.isArray(category.outcomes) && category.outcomes.length > 0, `Category ${category.id || "(unknown)"} needs at least one outcome.`);

    if (Number.isInteger(category.weight)) totalWeight += category.weight;

    if (Array.isArray(category.outcomes)) {
      category.outcomes.forEach((outcome, index) => {
        assert(typeof outcome.title === "string" && outcome.title.trim(), `Outcome ${category.id}[${index}] needs a title.`);
        assert(typeof outcome.message === "string" && outcome.message.trim(), `Outcome ${category.id}[${index}] needs a message.`);
        if (typeof outcome.message === "string" && outcome.message.length > 260) {
          addWarning(`Outcome ${category.id}[${index}] is long (${outcome.message.length} chars). Consider shortening for phone screens.`);
        }
      });
    }
  }

  assert(totalWeight > 0, "Total category weight must be positive.");
  if (totalWeight > 0) {
    console.log("Odds:");
    for (const category of outcomes.categories) {
      const percent = (category.weight / totalWeight) * 100;
      console.log(`- ${category.label}: ${percent.toFixed(2)}% (${category.weight}/${totalWeight})`);
    }
  }

  const photoCategory = outcomes.categories.find((category) => category.id === "photo");
  if (photoCategory && photoCategory.weight > 0 && photosConfig.photos.length === 0) {
    addWarning("Photo category has positive weight but photos[] is empty; photo pulls will fall back to common.");
  }
}

if (Array.isArray(photosConfig.photos)) {
  photosConfig.photos.forEach((photo, index) => {
    assert(typeof photo.url === "string" && photo.url.trim(), `photos[${index}].url is required.`);
    assert(typeof photo.alt === "string" && photo.alt.trim(), `photos[${index}].alt is required.`);
    if (photo.caption !== undefined && typeof photo.caption !== "string") {
      addError(`photos[${index}].caption should be a string when present.`);
    }
    if (photo.type !== undefined && photo.type !== "image" && photo.type !== "video") {
      addError(`photos[${index}].type must be "image" or "video" when present.`);
    }
    if (typeof photo.url === "string" && photo.url.includes("deine-webflow-domain.com")) {
      addWarning(`photos[${index}].url still looks like a placeholder.`);
    }
  });
}

if (warnings.length) {
  console.warn("\nWarnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("\nErrors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("\nConfig validation passed.");

function readJson(fileName) {
  const filePath = path.join(configDir, fileName);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${fileName} is not valid JSON or cannot be read: ${error.message}`);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
