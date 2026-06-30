// ── Admin storage keys ───────────────────────────────────────────────────────
export const TOKEN_KEY      = "fionn-admin:gh-token:v1";
export const SESSION_KEY    = "fionn-admin:session:v1";
export const LAST_SEEN_KEY  = "fionn-admin:inbox-last-seen:v1";
export const NOTIF_KEY      = "fionn-admin:notif:v1";

// Known tones — kept in sync with scripts/validate-gacha-config.js
export const KNOWN_TONES = ["quiet", "soft", "quest", "warm", "cursed", "rare", "photo", "jackpot"];

// Color keys used by special-day colors / darkColors objects
export const COLOR_KEYS = ["background", "surface", "surfaceAlt", "primary", "primaryDark", "gold"];

// Config file paths in the repo
export const OUTCOMES_PATH = "config/outcomes.json";
export const SPECIAL_PATH  = "config/special-days.json";
