// Client-side validation mirroring scripts/validate-gacha-config.js.
// Returns { errors: string[], warnings: string[] }. Keep aligned with the script.
import { KNOWN_TONES } from "./constants.js";

const DATE_MMDD = /^\d{2}-\d{2}$/;
const DATE_YYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;

function isValidHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
}

function validateOutcome(outcome, prefix, errors, warnings) {
  if (!(typeof outcome.title === "string" && outcome.title.trim())) {
    errors.push(`${prefix} needs a title.`);
  }
  if (!(typeof outcome.message === "string" && outcome.message.trim())) {
    errors.push(`${prefix} needs a message.`);
  }
  if (outcome.link !== undefined && outcome.link !== "" && outcome.link !== null) {
    if (!(typeof outcome.link === "string" && isValidHttpUrl(outcome.link))) {
      errors.push(`${prefix}.link must be a valid http(s) URL when present.`);
    }
  }
  if (typeof outcome.message === "string" && outcome.message.length > 260) {
    warnings.push(`${prefix} is long (${outcome.message.length} chars). Consider shortening for phone screens.`);
  }
}

export function validateOutcomes(outcomes) {
  const errors = [];
  const warnings = [];
  if (!outcomes || !Array.isArray(outcomes.categories)) {
    errors.push("outcomes.json: 'categories' must be an array.");
    return { errors, warnings };
  }
  const ids = new Set();
  let totalWeight = 0;
  for (const category of outcomes.categories) {
    const id = category.id || "(unknown)";
    if (!(typeof category.id === "string" && category.id)) errors.push("Every category needs an id.");
    else {
      if (ids.has(category.id)) errors.push(`Duplicate category id: ${category.id}`);
      ids.add(category.id);
    }
    if (!(typeof category.label === "string" && category.label)) errors.push(`Category ${id} needs a label.`);
    if (!(Number.isInteger(category.weight) && category.weight > 0)) errors.push(`Category ${id} needs a positive integer weight.`);
    if (!(typeof category.tone === "string" && category.tone)) errors.push(`Category ${id} needs a tone.`);
    else if (!KNOWN_TONES.includes(category.tone)) warnings.push(`Category ${id} tone "${category.tone}" is not a recognised tone.`);
    if (!(Array.isArray(category.outcomes) && category.outcomes.length > 0)) errors.push(`Category ${id} needs at least one outcome.`);

    if (Number.isInteger(category.weight)) totalWeight += category.weight;
    if (Array.isArray(category.outcomes)) {
      category.outcomes.forEach((o, i) => validateOutcome(o, `Outcome ${id}[${i}]`, errors, warnings));
    }
  }
  if (!(totalWeight > 0)) errors.push("Total category weight must be positive.");
  return { errors, warnings };
}

export function validateSpecialDays(config) {
  const errors = [];
  const warnings = [];
  if (!config || !Array.isArray(config.days)) {
    errors.push("special-days.json: 'days' must be an array.");
    return { errors, warnings };
  }
  const seen = new Set();
  config.days.forEach((entry, index) => {
    const prefix = `special-days[${index}]`;
    if (!(typeof entry.date === "string" && (DATE_MMDD.test(entry.date) || DATE_YYYYMMDD.test(entry.date)))) {
      errors.push(`${prefix}.date must be "MM-DD" (yearly) or "YYYY-MM-DD" (one-off).`);
    } else {
      if (seen.has(entry.date)) warnings.push(`${prefix}: duplicate date "${entry.date}".`);
      seen.add(entry.date);
    }
    if (!(typeof entry.label === "string" && entry.label.trim())) errors.push(`${prefix}.label is required.`);
    if (!(Array.isArray(entry.outcomes) && entry.outcomes.length > 0)) {
      errors.push(`${prefix}.outcomes must be a non-empty array.`);
    } else {
      entry.outcomes.forEach((o, oi) => validateOutcome(o, `${prefix}.outcomes[${oi}]`, errors, warnings));
    }
    if (entry.tone !== undefined && !KNOWN_TONES.includes(entry.tone)) {
      warnings.push(`${prefix}.tone "${entry.tone}" is not a recognised tone.`);
    }
  });
  return { errors, warnings };
}
