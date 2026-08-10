// ── Storage keys ────────────────────────────────────────────────────────────
export const STORAGE_KEY           = "affektions-gacha:history:v1";
export const FAVORITES_KEY         = "affektions-gacha:favourites:v1";
export const TOKENS_KEY            = "affektions-gacha:tokens:v1";
export const STREAK_CACHE_KEY      = "affektions-gacha:streak-cache:v1";
export const STREAK_SYNCED_KEY     = "affektions-gacha:streak-synced:v1";
export const STREAK_RESTORE_KEY    = "affektions-gacha:streak-restore:v1";
export const WISH_KEY              = "affektions-gacha:wish:v1";
export const MILESTONE_KEY         = "affektions-gacha:milestones:v1";
// v2: bumping the key re-asks once on the next load. A "dismissed" written
// against v1 was permanent, so anyone who ever tapped "Nicht jetzt" could
// never be offered notifications again — including before the reminders
// actually worked end to end.
export const NOTIF_KEY             = "affektions-gacha:notif:v2";
export const PIN_UNLOCK_PREFIX     = "affektions-gacha:pin-unlock:";
export const BAERLAUCH_SCORE_KEY   = "affektions-gacha:baerlauch-scores:v1";
export const BAERLAUCH_HISTORY_KEY = "affektions-gacha:baerlauch-history:v1";
export const MISSION_LOG_KEY       = "affektions-gacha:mission-log:v1";
export const MISSION_DONE_KEY      = "affektions-gacha:mission-done:v1";
export const MISSION_FEEDBACK_KEY  = "affektions-gacha:mission-feedback:v1";
export const GESPRACH_IDX_KEY      = "affektions-gacha:gesprach-idx:v1";
export const LAST_PING_KEY         = "affektions-gacha:last-ping:v1";
export const SOUND_KEY             = "affektions-gacha:sound:v1";
export const GIPFELBUCH_KEY        = "affektions-gacha:gipfelbuch:v1";
export const QUEST_STORAGE_KEY     = "affektions-gacha:quest:v1";
export const QUEST_POINTS_KEY      = "affektions-gacha:quest-points:v1";
export const CACHE_VERSION_KEY     = "affektions-gacha:cache-version:v1";

// ── Numeric constants ────────────────────────────────────────────────────────
export const CACHE_VERSION           = "2026-05-22-v2";
export const TOKEN_GOAL              = 5;   // default when a type has no goal
export const STREAK_RESTORE_THRESHOLD = 20;
export const QUEST_POINTS_SCHEDULE   = [100, 75, 50, 25];
export const GLOSSARY_KEY            = "affektions-gacha:glossary:v1";
export const STIMMUNG_KEY            = "affektions-gacha:stimmung:v1";
export const FREIKARTE_KEY           = "affektions-gacha:freikarte:v1";
export const FREIKARTE_REROLL_KEY    = "affektions-gacha:freikarte-reroll:v1";
export const WERKSTATT_KEY           = "affektions-gacha:werkstatt:v1";

// Each token type is one reward, and each reward costs a different number of
// tokens — a film night shouldn't take as long to earn as a weekend away.
// Goals were only ever LOWERED from the old flat 5, never raised: raising one
// would turn somebody's finished set back into an unfinished one.
export const TOKEN_REWARDS = {
  "🌿": { goal: 5, reward: "Fionn kocht dir ein Abendessen nach Wahl" },
  "🔥": { goal: 5, reward: "Wochenend-Abenteuer — Ziel nach deiner Wahl" },
  "⭐": { goal: 5, reward: "Fionns Überraschung — er entscheidet" },
  "☁️": { goal: 4, reward: "Ein ganzer fauler Tag ohne Pläne" },
  "🏔": { goal: 5, reward: "Eine richtige Bergtour, Hütte inklusive" },
  "☕": { goal: 4, reward: "Ein Ausflug in dein Traumcafé, egal wo" },
  "💚": { goal: 3, reward: "Ein langer, handgeschriebener Brief" },
  "🎬": { goal: 3, reward: "Filmabend — du wählst, ich mache Popcorn" },
  "🍕": { goal: 3, reward: "Essen kommt ins Haus, du bestimmst was" },
  "🎧": { goal: 5, reward: "Konzert oder DJ-Abend, Tickets gehen auf mich" },
  "🛁": { goal: 4, reward: "Ein Wellness-Abend, komplett vorbereitet" },
  "✈️": { goal: 7, reward: "Ein Städtetrip — ein ganzes Wochenende weg" }
};

// How many of one emoji a reward costs. Unknown emoji fall back to the old
// flat goal so a token from an older build can never become uncollectable.
export function tokenGoal(emoji) {
  const entry = TOKEN_REWARDS[emoji];
  return (entry && entry.goal) || TOKEN_GOAL;
}

export function tokenReward(emoji) {
  const entry = TOKEN_REWARDS[emoji];
  return (entry && entry.reward) || "";
}
