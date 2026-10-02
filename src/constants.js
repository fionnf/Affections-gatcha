// ── Storage keys ────────────────────────────────────────────────────────────
export const STORAGE_KEY           = "affektions-gacha:history:v1";
export const FAVORITES_KEY         = "affektions-gacha:favourites:v1";
export const TOKENS_KEY            = "affektions-gacha:tokens:v1";
// The token map as of the last backup POST that actually came back. It is the
// common base for the three-way merge in applySharedTokens — without it a sync
// cannot tell "the sheet is ahead of me" from "I hold a token the sheet has
// never seen", and the second case loses the token.
export const TOKENS_SENT_KEY       = "affektions-gacha:tokens-sent:v1";
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
export const BAERLAUCH_SCORE_KEY   = "affektions-gacha:baerlauch-scores:v1";
export const BAERLAUCH_HISTORY_KEY = "affektions-gacha:baerlauch-history:v1";
export const GESPRACH_IDX_KEY      = "affektions-gacha:gesprach-idx:v1";
export const LAST_PING_KEY         = "affektions-gacha:last-ping:v1";
export const SOUND_KEY             = "affektions-gacha:sound:v1";
export const GIPFELBUCH_KEY        = "affektions-gacha:gipfelbuch:v1";
export const QUEST_STORAGE_KEY     = "affektions-gacha:quest:v1";
export const QUEST_POINTS_KEY      = "affektions-gacha:quest-points:v1";

// ── Numeric constants ────────────────────────────────────────────────────────
export const TOKEN_GOAL              = 5;   // default when a type has no goal
export const STREAK_RESTORE_THRESHOLD = 20;
export const QUEST_POINTS_SCHEDULE   = [100, 75, 50, 25];
export const GLOSSARY_KEY            = "affektions-gacha:glossary:v1";
export const STIMMUNG_KEY            = "affektions-gacha:stimmung:v1";
export const FREIKARTE_KEY           = "affektions-gacha:freikarte:v1";
export const FREIKARTE_REROLL_KEY    = "affektions-gacha:freikarte-reroll:v1";

// Each token type is one reward, and each reward costs a different number of
// tokens. Six types, not twelve: with the one-in-five token rate spread
// twelve ways, every reward took six months to a year to complete and the
// bank was twelve bars that crawled. Six bars at goals of 3-6 complete a set
// every three to five weeks. The old twelve fold into these (TOKEN_MERGES),
// and counts already earned are carried over, never lost.
export const TOKEN_REWARDS = {
  "🌿": { goal: 4, reward: "Essen: Fionn kocht, oder ein Café deiner Wahl" },
  "🏔": { goal: 5, reward: "Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg" },
  "🎬": { goal: 4, reward: "Ein Abend aus: Film, Konzert oder DJ — du wählst" },
  "🛁": { goal: 3, reward: "Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag" },
  "💚": { goal: 4, reward: "Eine Überraschung von Fionn, mit handgeschriebenem Brief" },
  "✈️": { goal: 6, reward: "Ein Städtetrip — ein ganzes Wochenende weg" }
};

// Where each retired token goes. Applied on every read, so a count earned
// under the old emoji keeps counting under the new one, on this phone and
// from the sheet alike.
export const TOKEN_MERGES = {
  "☕": "🌿", "🔥": "🏔", "🎧": "🎬", "🍕": "🛁", "☁️": "🛁", "⭐": "💚"
};
export function canonicalToken(emoji) {
  return TOKEN_MERGES[emoji] || emoji;
}

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

// Pfand: every tenth empty Niete capsule returned to the machine pays a
// token. The humble one — a home evening — for the humble capsules.
export const PFAND_EVERY = 10;
export const PFAND_TOKEN = "🛁";
