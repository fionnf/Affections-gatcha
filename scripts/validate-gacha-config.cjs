#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.join(__dirname, "..");
const configDir = path.join(rootDir, "config");

const KNOWN_TONES = new Set(["quiet", "soft", "quest", "warm", "cursed", "rare", "photo", "jackpot"]);
const DATE_MMDD = /^\d{2}-\d{2}$/;
const DATE_YYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
// clockReached (src/utils.js) splits on ":" and compares hours; "25:00" or
// "9:5" is accepted by a looser pattern and then never unlocks, or unlocks
// at a time nobody wrote.
const TIME_HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;

// Category ids the history uses for capsules that are not draws. A config
// category under one of these names would be mistaken for a special day
// (left out of the pity count, replayed through the special-day branch) or
// for a Flaschenpost (replaced by a due post on replay).
const RESERVED_CATEGORY_IDS = {
  special: "special-day capsules are recorded under it (src/pull.js)",
  flaschenpost: "Flaschenpost capsules are recorded under it (src/pull.js)"
};

// Category ids the runtime looks up by name. Every lookup falls back
// quietly when the id is missing, so a renamed category does not crash —
// it just switches a feature off without a word. Hence warnings.
const HARD_CODED_CATEGORY_IDS = {
  jackpot: "the jackpot pity timer (src/pull.js jackpotPityDue) and the streak boost (src/streak.js) look it up by id; without it neither does anything",
  niete: "Pfand (src/render.js), the streak boost's damping and Streak-Retter days (recorded as \"niete\", src/streak.js) key on it",
  cursed: "the Freikarte reroll (src/pull.js rerollPullForDay) excludes it by id; without it a Freikarte can land on the same kind of capsule",
  rare: "the streak boost (src/streak.js) and the save-image button (src/render.js) key on it",
  uncommon: "the streak boost (src/streak.js) keys on it"
};

// What the app itself knows, read from src/ so the validator cannot drift
// from it. Each piece is null when the source cannot be parsed, and the
// checks that need it are skipped rather than guessing.
function loadRuntimeFacts(root = rootDir) {
  const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

  // The live token types: a retired emoji in config would credit a bar
  // nobody can see.
  const liveTokens = (() => {
    try {
      const block = read("src/constants.js").split("export const TOKEN_REWARDS = {")[1].split("\n};")[0];
      return new Set([...block.matchAll(/"([^"]+)": \{ goal:/g)].map((m) => m[1]));
    } catch (_e) { return null; }
  })();

  // FIGURE_KEYS: figureHtml returns "" for an unknown key, so a typo'd
  // figure just leaves a step without its picture.
  const figureKeys = (() => {
    try {
      const block = read("src/kursfiguren.js").split("export const FIGUREN = {")[1].split("\n};")[0];
      const keys = [...block.matchAll(/^ {2}([A-Za-z0-9_]+): \(\) =>/gm)].map((m) => m[1]);
      return keys.length ? new Set(keys) : null;
    } catch (_e) { return null; }
  })();

  // getToken: checkSpecialDay skips an entry whose player is not this token.
  const playerTokens = (() => {
    try {
      const m = read("src/utils.js").match(/export function getToken\(\) \{\s*return "([^"]+)";\s*\}/);
      return m ? new Set([m[1]]) : null;
    } catch (_e) { return null; }
  })();

  const fileExists = (rel) => {
    try { return fs.statSync(path.join(root, rel)).isFile(); } catch (_e) { return false; }
  };

  return { liveTokens, figureKeys, playerTokens, fileExists };
}

// The core checks, on already-parsed config. Returns the messages instead of
// printing them so tests can call it; the CLI below prints and exits.
//   config: { theme, outcomes, photosConfig, specialDaysConfig (null = no file), readme (null = skip drift check) }
//   facts:  loadRuntimeFacts() output; any piece may be null to skip its checks
function validateConfig(config, facts = loadRuntimeFacts()) {
  const theme = (config && config.theme) || {};
  const outcomes = (config && config.outcomes) || {};
  const photosConfig = (config && config.photosConfig) || {};
  const specialDaysConfig = config && config.specialDaysConfig !== undefined ? config.specialDaysConfig : null;
  const readme = (config && typeof config.readme === "string") ? config.readme : null;
  const { liveTokens = null, figureKeys = null, playerTokens = null, fileExists = null } = facts || {};

  const errors = [];
  const warnings = [];
  const log = [];

  function addError(message) {
    errors.push(message);
  }

  function addWarning(message) {
    warnings.push(message);
  }

  function assert(condition, message) {
    if (!condition) addError(message);
  }

  // steps (src/kurs.js validSteps) and items (src/liste.js validItems) are
  // filtered the same way at runtime: anything without a string title and
  // text is dropped without a word, and an unknown figure draws nothing.
  // `where` is the outcome's label, e.g. "Outcome common[3]".
  function checkStepList(list, kind, where) {
    assert(Array.isArray(list) && list.length > 0, `${where}: ${kind}s must be a non-empty array.`);
    if (!Array.isArray(list)) return;
    list.forEach((step, k) => {
      assert(step && typeof step === "object" && typeof step.title === "string" && step.title.trim() && typeof step.text === "string" && step.text.trim(),
        `${where} ${kind} ${k} needs a title and a text.`);
      if (step && typeof step === "object" && step.figure !== undefined) {
        if (typeof step.figure !== "string" || !/^[a-z0-9]+$/.test(step.figure)) {
          addError(`${where} ${kind} ${k}: figure must be a short lowercase name.`);
        } else if (figureKeys && !figureKeys.has(step.figure)) {
          addError(`${where} ${kind} ${k}: figure "${step.figure}" is not a known figure (see FIGUREN in src/kursfiguren.js) — it would draw nothing.`);
        }
      }
    });
  }

  // What an outcome can carry beyond title and message, the same in
  // outcomes.json and special-days.json.
  function checkOutcomeExtras(outcome, where) {
    if (outcome.steps !== undefined) checkStepList(outcome.steps, "step", where);
    if (outcome.items !== undefined) checkStepList(outcome.items, "item", where);
    // renderLinkInto drops a link it cannot parse and hides the button
    // rather than showing a broken one, so a typo'd URL costs the whole
    // point of the capsule and looks like nothing went wrong.
    if (outcome.link !== undefined) {
      assert(typeof outcome.link === "string" && isValidHttpUrl(outcome.link), `${where}.link must be a valid http(s) URL when present.`);
    }
    if (outcome.linkPinFrom !== undefined && !TIME_HHMM.test(String(outcome.linkPinFrom))) {
      addError(`${where}.linkPinFrom must be "HH:MM" (got ${JSON.stringify(outcome.linkPinFrom)}).`);
    }
    if (outcome.token !== undefined && liveTokens && !liveTokens.has(outcome.token)) {
      addError(`${where}.token "${outcome.token}" is not a live token type (see TOKEN_REWARDS in src/constants.js).`);
    }
  }

  // photo URLs go through safeUrl (src/utils.js): http(s) or a path relative
  // to the page; any other scheme renders as an empty image.
  function checkMediaUrl(url, where, { mustExist }) {
    if (typeof url !== "string" || !url.trim()) return;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
      if (!isValidHttpUrl(url)) {
        addError(`${where} must be an http(s) URL or a relative path (got ${JSON.stringify(url)}).`);
      } else if (url.startsWith("http:")) {
        addWarning(`${where} is plain http — the app is served over https, so the browser may block it as mixed content.`);
      }
    } else if (mustExist && fileExists && !url.startsWith("//")) {
      const rel = url.split(/[?#]/)[0].replace(/^\.?\//, "");
      if (!fileExists(rel)) addError(`${where} "${url}" does not exist in the repo — commit the file (under media/) or fix the path.`);
    }
  }

  assert(theme.brand, "theme.brand is required.");
  assert(Array.isArray(outcomes.categories), "outcomes.categories must be an array.");
  assert(Array.isArray(photosConfig.photos), "photos.photos must be an array, even if empty.");
  const photos = Array.isArray(photosConfig.photos) ? photosConfig.photos : [];

  if (theme.brand) {
    assert(typeof theme.brand.machineName === "string" && theme.brand.machineName, "brand.machineName is required.");
    assert(typeof theme.brand.displayNameDefault === "string" && theme.brand.displayNameDefault, "brand.displayNameDefault is required.");
    assert(typeof theme.brand.fromName === "string" && theme.brand.fromName, "brand.fromName is required.");
    assert(typeof theme.brand.titleTemplate === "string" && theme.brand.titleTemplate.includes("{name}"), "brand.titleTemplate should include {name}.");
  }

  assert(typeof theme.secret === "string" && theme.secret.length >= 24, "theme.secret should be at least 24 characters.");
  assert(theme.secret !== "AENDERN-geheimes-wort-damit-die-kapseln-nicht-vorhersagbar-sind", "Change theme.secret from the placeholder value.");
  assert(typeof theme.timezone === "string" && theme.timezone, "theme.timezone is required.");
  // dateKeyInTimezone builds an Intl.DateTimeFormat from it on every load;
  // an unknown zone throws there and the machine never draws.
  if (typeof theme.timezone === "string" && theme.timezone && !isValidTimeZone(theme.timezone)) {
    addError(`theme.timezone ${JSON.stringify(theme.timezone)} is not a recognised IANA timezone.`);
  }
  if (theme.dayStartHour !== undefined) {
    assert(Number.isInteger(theme.dayStartHour) && theme.dayStartHour >= 0 && theme.dayStartHour < 24,
      "theme.dayStartHour must be a whole hour from 0 to 23 (the hour the machine's day begins).");
  }
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
        if (Object.prototype.hasOwnProperty.call(RESERVED_CATEGORY_IDS, category.id)) {
          addError(`Category id "${category.id}" is reserved: ${RESERVED_CATEGORY_IDS[category.id]}. Rename the category.`);
        }
      }

      assert(typeof category.label === "string" && category.label, `Category ${category.id || "(unknown)"} needs a label.`);
      assert(Number.isInteger(category.weight) && category.weight > 0, `Category ${category.id || "(unknown)"} needs a positive integer weight.`);
      assert(typeof category.tone === "string" && category.tone, `Category ${category.id || "(unknown)"} needs a tone.`);
      assert(Array.isArray(category.outcomes) && category.outcomes.length > 0, `Category ${category.id || "(unknown)"} needs at least one outcome.`);

      if (Number.isInteger(category.weight)) totalWeight += category.weight;

      if (Array.isArray(category.outcomes)) {
        const seenTitles = new Set();
        category.outcomes.forEach((outcome, index) => {
          if (!outcome || typeof outcome !== "object") {
            addError(`Outcome ${category.id}[${index}] must be an object.`);
            return;
          }
          assert(typeof outcome.title === "string" && outcome.title.trim(), `Outcome ${category.id}[${index}] needs a title.`);
          assert(typeof outcome.message === "string" && outcome.message.trim(), `Outcome ${category.id}[${index}] needs a message.`);
          checkOutcomeExtras(outcome, `Outcome ${category.id}[${index}]`);
          if (typeof outcome.message === "string" && outcome.message.length > 260) {
            addWarning(`Outcome ${category.id}[${index}] is long (${outcome.message.length} chars). Consider shortening for phone screens.`);
          }
          // The pull's anti-repeat logic (src/pull.js buildPullForDay) filters
          // by category + exact title to avoid repeating a flavor text before
          // the whole category is exhausted — an in-category duplicate title
          // silently breaks that guarantee (both entries look identical to
          // that filter, so the "no repeats until exhausted" promise shrinks
          // by one slot without anyone noticing).
          if (typeof outcome.title === "string" && outcome.title.trim()) {
            const title = outcome.title.trim();
            if (seenTitles.has(title)) {
              addError(`Duplicate outcome title within ${category.id}: "${title}" — the anti-repeat pool can't tell these apart.`);
            }
            seenTitles.add(title);
          }
        });
      }
    }

    for (const [id, why] of Object.entries(HARD_CODED_CATEGORY_IDS)) {
      if (!ids.has(id)) addWarning(`No category with id "${id}": ${why}.`);
    }
    // A photo pull with no pictures falls back to "common"; without it the
    // photo category's own text comes out with an empty frame.
    if (ids.has("photo") && !ids.has("common")) {
      addWarning("No category with id \"common\": a photo pull with no image in photos[] falls back to it (src/pull.js); without it the photo text shows with no picture.");
    }
    if (!ids.has("photo") && photos.length > 0) {
      addWarning("photos[] has entries but there is no category with id \"photo\" — only that category ever shows them.");
    }

    const titleToCategories = new Map();
    for (const category of outcomes.categories) {
      if (!Array.isArray(category.outcomes)) continue;
      for (const outcome of category.outcomes) {
        const title = outcome && typeof outcome.title === "string" ? outcome.title.trim() : "";
        if (!title) continue;
        if (!titleToCategories.has(title)) titleToCategories.set(title, []);
        titleToCategories.get(title).push(category.id);
      }
    }
    for (const [title, categoryIds] of titleToCategories) {
      if (categoryIds.length > 1) {
        addWarning(`Outcome title "${title}" appears in multiple categories (${categoryIds.join(", ")}) — probably a copy-paste, not intentional.`);
      }
    }

    assert(totalWeight > 0, "Total category weight must be positive.");
    if (totalWeight > 0) {
      log.push("Odds:");
      for (const category of outcomes.categories) {
        const percent = (category.weight / totalWeight) * 100;
        log.push(`- ${category.label}: ${percent.toFixed(2)}% (${category.weight}/${totalWeight})`);
      }
    }

    const photoCategory = outcomes.categories.find((category) => category.id === "photo");
    if (photoCategory && photoCategory.weight > 0 && photos.length === 0) {
      addWarning("Photo category has positive weight but photos[] is empty; photo pulls will fall back to common.");
    }
  }

  if (Array.isArray(photosConfig.photos)) {
    photosConfig.photos.forEach((photo, index) => {
      if (!photo || typeof photo !== "object") {
        addError(`photos[${index}] must be an object.`);
        return;
      }
      assert(typeof photo.url === "string" && photo.url.trim(), `photos[${index}].url is required.`);
      checkMediaUrl(photo.url, `photos[${index}].url`, { mustExist: false });
      assert(typeof photo.alt === "string" && photo.alt.trim(), `photos[${index}].alt is required.`);
      if (photo.caption !== undefined && typeof photo.caption !== "string") {
        addError(`photos[${index}].caption should be a string when present.`);
      }
      if (photo.type !== undefined && photo.type !== "image" && photo.type !== "video") {
        addError(`photos[${index}].type must be "image" or "video" when present.`);
      }

      if (photo.type === "video" && typeof photo.url === "string") {
        const url = photo.url;
        const isGooglePhotosHost = /googleusercontent\.com\//.test(url);
        const isDriveViewUrl = /drive\.google\.com\/uc\?/.test(url) && /export=view/.test(url);
        const looksLikeGoogleVideo = /=(dv|m\d+)(?:$|[?&])/.test(url);
        const looksLikeGoogleImage = /=s\d+(?:$|[?&-])/.test(url) || /=w\d+/.test(url);
        const looksLikeStaticImageUrl = /\.(jpe?g|png|gif|webp|heic|heif|avif)(?:$|[?#])/i.test(url);
        if (isGooglePhotosHost && !looksLikeGoogleVideo) {
          addWarning(
            `photos[${index}] is type "video" but URL ${looksLikeGoogleImage ? "looks like a Google Photos image thumbnail" : "is a googleusercontent URL without a video suffix (=dv or =m18)"} — it likely will not play. Re-run npm run sync:album, or switch to an iCloud public shared album for reliable video URLs.`
          );
        } else if (!isGooglePhotosHost && !isDriveViewUrl && looksLikeStaticImageUrl) {
          addWarning(
            `photos[${index}] is type "video" but URL ends with an image extension — it will not play as a video. Either change "type" to "image" or replace with a real video URL.`
          );
        }
      }
    });

    const videoCount = photosConfig.photos.filter((p) => p && p.type === "video").length;
    const source = photosConfig.source;
    if (source && source.provider === "google" && photosConfig.photos.length > 0 && videoCount === 0) {
      addWarning(
        "photos source is Google Photos and no items are typed as video. Possible causes: (a) the album really has no videos, (b) clips were shorter than the 20s duration threshold (Live Photos are filtered out by default — adjust 'videoMinDurationMs' in config/album-source.json to lower the cutoff), or (c) the public share page did not expose playable MP4 URLs. iCloud public shared albums tend to be more reliable for video."
      );
    }
  }

  if (specialDaysConfig !== null) {
    assert(specialDaysConfig && Array.isArray(specialDaysConfig.days), "special-days.json: 'days' must be an array.");

    if (specialDaysConfig && Array.isArray(specialDaysConfig.days)) {
      specialDaysConfig.days.forEach((entry, index) => {
        const prefix = `special-days[${index}]`;
        if (!entry || typeof entry !== "object") {
          addError(`${prefix} must be an object.`);
          return;
        }
        assert(
          typeof entry.date === "string" && (DATE_MMDD.test(entry.date) || DATE_YYYYMMDD.test(entry.date)),
          `${prefix}.date must be "YYYY-MM-DD" (one-off) or "MM-DD" with "repeat": "yearly".`
        );
        // The pattern lets "2026-02-30" and "13-45" through; the app compares
        // date strings, so such an entry simply never comes.
        if (typeof entry.date === "string" && (DATE_MMDD.test(entry.date) || DATE_YYYYMMDD.test(entry.date)) && !isRealDate(entry.date)) {
          addError(`${prefix}.date "${entry.date}" is not a real calendar date, so it never fires.`);
        }
        if (entry.repeat !== undefined && entry.repeat !== "yearly") {
          addError(`${prefix}.repeat must be "yearly" if it is set at all (got ${JSON.stringify(entry.repeat)}).`);
        }
        // A bare "MM-DD" fires again every year. Almost every special day here was
        // written for one occasion and reads wrong twelve months later, so the
        // recurring ones have to say so out loud. Without this a one-off quietly
        // resurfaces long after anyone remembers writing it.
        if (typeof entry.date === "string" && DATE_MMDD.test(entry.date) && entry.repeat !== "yearly") {
          addError(
            `${prefix}.date "${entry.date}" has no year, so it fires every year. ` +
            `Write it as "20XX-${entry.date}" for a one-off, or add "repeat": "yearly" if it really should come back.`
          );
        }
        if (typeof entry.date === "string" && DATE_YYYYMMDD.test(entry.date) && entry.repeat === "yearly") {
          addError(`${prefix}: "repeat": "yearly" needs a bare "MM-DD" date, but the date is "${entry.date}".`);
        }
        // checkSpecialDay skips an entry whose player is not getToken(), and
        // that is always the one token — anything else is a day that never comes.
        if (entry.player !== undefined && playerTokens && !(typeof entry.player === "string" && playerTokens.has(entry.player))) {
          addError(
            `${prefix}.player ${JSON.stringify(entry.player)} never matches: the app's only player token is ` +
            `${[...playerTokens].map((t) => `"${t}"`).join(", ")} (getToken in src/utils.js). Use that or omit player.`
          );
        }
        assert(typeof entry.label === "string" && entry.label.trim(), `${prefix}.label is required.`);
        assert(
          Array.isArray(entry.outcomes) && entry.outcomes.length > 0,
          `${prefix}.outcomes must be a non-empty array.`
        );
        if (Array.isArray(entry.outcomes)) {
          entry.outcomes.forEach((outcome, oi) => {
            if (!outcome || typeof outcome !== "object") {
              addError(`${prefix}.outcomes[${oi}] must be an object.`);
              return;
            }
            assert(typeof outcome.title === "string" && outcome.title.trim(), `${prefix}.outcomes[${oi}].title is required.`);
            assert(typeof outcome.message === "string" && outcome.message.trim(), `${prefix}.outcomes[${oi}].message is required.`);
            checkOutcomeExtras(outcome, `${prefix}.outcomes[${oi}]`);
          });
        }
        if (entry.photo !== undefined) {
          if (!entry.photo || typeof entry.photo.url !== "string" || !entry.photo.url.trim()) {
            addError(`${prefix}.photo needs a url.`);
          } else {
            checkMediaUrl(entry.photo.url, `${prefix}.photo.url`, { mustExist: true });
          }
          if (!entry.photo || typeof entry.photo.alt !== "string" || !entry.photo.alt.trim()) {
            addError(`${prefix}.photo needs an alt.`);
          }
        }
        // photoAlt is looked up among the image entries of photos.json, which
        // the album sync regenerates — a stale alt shows no picture at all.
        if (entry.photoAlt !== undefined && !(entry.photo && entry.photo.url)) {
          if (!photos.some((p) => p && p.type !== "video" && p.alt === entry.photoAlt)) {
            addWarning(`${prefix}.photoAlt ${JSON.stringify(entry.photoAlt)} matches no image in photos.json, so the capsule shows no picture. Prefer an inline "photo".`);
          }
        }
        if (entry.unlockTime !== undefined && !TIME_HHMM.test(String(entry.unlockTime))) {
          addError(`${prefix}.unlockTime must be "HH:MM" (got ${JSON.stringify(entry.unlockTime)}).`);
        }
        // The unlock time only ever locks a link (src/render.js); the message
        // shows regardless.
        if (entry.unlockTime !== undefined && Array.isArray(entry.outcomes) && !entry.outcomes.some((o) => o && o.link)) {
          addWarning(`${prefix}.unlockTime only locks an outcome's link, and none of this day's outcomes has one — it does nothing.`);
        }
        if (entry.unlockTimezone !== undefined) {
          if (typeof entry.unlockTimezone !== "string" || !isValidTimeZone(entry.unlockTimezone)) {
            addError(`${prefix}.unlockTimezone ${JSON.stringify(entry.unlockTimezone)} is not a recognised IANA timezone.`);
          }
          if (entry.unlockTime === undefined) {
            addWarning(`${prefix}.unlockTimezone does nothing without unlockTime.`);
          }
        }
        if (entry.tone !== undefined && !KNOWN_TONES.has(entry.tone)) {
          addWarning(`${prefix}.tone "${entry.tone}" is not a recognised tone. Known tones: ${[...KNOWN_TONES].join(", ")}.`);
        }
      });

      checkSpecialDayOverlaps(specialDaysConfig.days, playerTokens, addError, addWarning);

      log.push(`Special days: ${specialDaysConfig.days.length} entr${specialDaysConfig.days.length === 1 ? "y" : "ies"} found.`);
    }
  }

  // ── README drift ─────────────────────────────────────────────────────────────
  // The odds table in the README is hand-maintained and has been wrong before —
  // once by a whole category. It is the first thing anyone reads to decide what
  // to edit, so a stale row is worse than no table. Warn (not fail) when a row
  // no longer matches config: docs lagging a config change is a nudge, not a
  // reason to block a commit.
  if (readme !== null && Array.isArray(outcomes.categories)) {
    for (const category of outcomes.categories) {
      if (typeof category.id !== "string" || !category.id) continue;
      const row = new RegExp(
        `^\\|[^|]*\\|\\s*\`${category.id}\`\\s*\\|([^|]*)\\|([^|]*)\\|([^|]*)\\|`, "m");
      const m = readme.match(row);
      if (!m) { addWarning(`README has no odds row for "${category.id}".`); continue; }
      const weight = Number(m[1].trim());
      const count = Number(m[3].trim());
      if (weight !== category.weight) {
        addWarning(`README weight for "${category.id}" is ${weight}, config says ${category.weight}.`);
      }
      if (Array.isArray(category.outcomes) && count !== category.outcomes.length) {
        addWarning(`README outcome count for "${category.id}" is ${count}, config says ${category.outcomes.length}.`);
      }
    }
  }

  return { errors, warnings, log };
}

// checkSpecialDay walks days[] in order and returns the first entry whose
// date matches (a dated entry on that day, or a yearly "MM-DD") and whose
// player scope admits the token. A later entry for the same day is never
// consulted: if an earlier one covers every day and player it could fire
// for, it is dead config (error); if it only loses some years, warn.
function checkSpecialDayOverlaps(days, playerTokens, addError, addWarning) {
  const describe = (i) => `special-days[${i}] (${JSON.stringify(days[i].label || days[i].date)})`;
  // What an entry can match at runtime: null when it can never fire anyway
  // (bad date, bare MM-DD, impossible date) — those already have their error.
  const reach = days.map((entry) => {
    if (!entry || typeof entry !== "object" || typeof entry.date !== "string" || !isRealDate(entry.date)) return null;
    const yearly = DATE_MMDD.test(entry.date);
    if (yearly && entry.repeat !== "yearly") return null;
    if (!yearly && !DATE_YYYYMMDD.test(entry.date)) return null;
    let players = null; // null = every player
    if (entry.player) {
      players = new Set([entry.player]);
      if (playerTokens) players = new Set([...players].filter((p) => playerTokens.has(p)));
      if (!players.size) return null;
    }
    return { yearly, mmdd: yearly ? entry.date : entry.date.slice(5), date: entry.date, players };
  });
  const allPlayers = playerTokens || null;
  const playersOf = (r) => r.players || allPlayers;
  const sharesPlayer = (a, b) => {
    const pa = playersOf(a), pb = playersOf(b);
    if (!pa || !pb) return true;
    return [...pb].some((p) => pa.has(p));
  };
  const coversPlayers = (a, b) => {
    const pa = playersOf(a), pb = playersOf(b);
    if (!pa) return true;
    if (!pb) return false;
    return [...pb].every((p) => pa.has(p));
  };

  for (let j = 0; j < days.length; j++) {
    const b = reach[j];
    if (!b) continue;
    for (let i = 0; i < j; i++) {
      const a = reach[i];
      if (!a || a.mmdd !== b.mmdd || !sharesPlayer(a, b)) continue;
      // Two dated entries only meet on the very same date.
      if (!a.yearly && !b.yearly && a.date !== b.date) continue;
      // a matches every day b matches when the dates are identical, or a is
      // yearly and b is one occurrence of it.
      const coversDates = a.date === b.date || (a.yearly && !b.yearly);
      if (coversDates && coversPlayers(a, b)) {
        addError(
          `${describe(j)} can never fire: ${describe(i)} matches ${b.yearly ? `every ${b.date}` : b.date} first, ` +
          "and the first matching entry in the array wins. Remove one, or move the one that should win above the other."
        );
        break;
      }
      const when = a.yearly ? b.date : a.date;
      addWarning(
        `${describe(i)} and ${describe(j)} both match ${when}; ${describe(i)} wins there because it comes first in the array` +
        (b.yearly && !a.yearly ? ` (the yearly entry still fires in other years).` : ".")
      );
    }
  }
}

function isRealDate(s) {
  let y, m, d;
  if (DATE_YYYYMMDD.test(s)) [y, m, d] = s.split("-").map(Number);
  else if (DATE_MMDD.test(s)) { [m, d] = s.split("-").map(Number); y = 2000; } // a leap year: "02-29" is a real birthday
  else return false;
  if (m < 1 || m > 12 || d < 1) return false;
  return d <= new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function isValidTimeZone(tz) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch (_e) { return false; }
}

function isValidHttpUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch { return false; }
}

function readJson(fileName) {
  const filePath = path.join(configDir, fileName);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${fileName} is not valid JSON or cannot be read: ${error.message}`);
  }
}

function readJsonOptional(fileName) {
  const filePath = path.join(configDir, fileName);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    fail(`${fileName} is not valid JSON or cannot be read: ${error.message}`);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function main() {
  const theme = readJson("theme.json");
  const outcomes = readJson("outcomes.json");
  const photosConfig = readJson("photos.json");
  const specialDaysConfig = readJsonOptional("special-days.json");
  let readme = null;
  try { readme = fs.readFileSync(path.join(rootDir, "README.md"), "utf8"); } catch (_e) { /* no README, or unreadable — not this script's problem */ }

  const { errors, warnings, log } = validateConfig({ theme, outcomes, photosConfig, specialDaysConfig, readme });

  for (const line of log) console.log(line);

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
}

module.exports = { validateConfig, loadRuntimeFacts, isRealDate };

if (require.main === module) main();
