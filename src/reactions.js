// ── Kapsel-Echo: emoji reactions on each other's daily pull ──────────────────
// Both players see the partner's pull of the day as a small card on the Heute
// tab and can answer it with one emoji. Reactions travel through the existing
// Sheet backend (POST type "reaction", GET → data.reactions + data.partnerToday)
// and work symmetrically in both directions — Lennart reacts to Fionn's Kapsel
// exactly like Fionn reacts to Lennart's.
//
// Storage model: one reaction per (day, from, to), newest updatedAt wins. Local
// writes are optimistic with a fresh timestamp, so a sync that races the POST
// can never resurrect a stale server row.
import { state, mount, $ } from "./state.js";
import { REACTIONS_KEY, REACTION_SEEN_KEY } from "./constants.js";
import { getToken, getPreviewDay, dateKeyInTimezone, normaliseDay } from "./utils.js";
import { markRecentWrite } from "./sheetSync.js";
import { emojiForTone } from "./pull.js";

export const DEFAULT_REACTION_EMOJIS = ["❤️", "😂", "🥹", "😮", "🫂"];

export function reactionEmojis() {
  const fromTheme = state.theme && state.theme.reactionEmojis;
  return (Array.isArray(fromTheme) && fromTheme.length) ? fromTheme : DEFAULT_REACTION_EMOJIS;
}

export function partnerToken() {
  return getToken() === "fionn" ? "lennart" : "fionn";
}

export function partnerDisplayName() {
  const t = partnerToken();
  return t.charAt(0).toLocaleUpperCase("de-CH") + t.slice(1);
}

function todayKey() {
  return dateKeyInTimezone(state.theme?.timezone || "UTC");
}

function reactionKey(r) {
  return `${r.day}|${r.from}|${r.to}`;
}

// ── localStorage ──────────────────────────────────────────────────────────────

export function readReactions() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(REACTIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) =>
      r && typeof r.day === "string" && typeof r.from === "string" && typeof r.to === "string" && r.emoji
    );
  } catch (_e) { return []; }
}

export function writeReactions(entries) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(REACTIONS_KEY, JSON.stringify(entries));
  } catch (_e) {}
}

// Last incoming updatedAt this device has already announced. `null` means the
// key was never written (fresh device) — the first sync then sets a baseline
// without toasting historical reactions.
function readReactionSeen() {
  try {
    const v = window.localStorage.getItem(REACTION_SEEN_KEY);
    return v === null ? null : v;
  } catch (_e) { return null; }
}

function writeReactionSeen(ts) {
  try { window.localStorage.setItem(REACTION_SEEN_KEY, String(ts)); } catch (_e) {}
}

// ── Merge (server → local) ────────────────────────────────────────────────────
// Returns the list of genuinely NEW incoming reactions (addressed to me, newer
// than anything this device has announced before) so the caller can toast.

export function mergeReactions(incoming) {
  const me = getToken();
  const today = todayKey();
  const byKey = new Map(readReactions().map((r) => [reactionKey(r), r]));

  for (const raw of Array.isArray(incoming) ? incoming : []) {
    if (!raw) continue;
    const day = normaliseDay(raw.day);
    const from = String(raw.from || "").toLowerCase();
    const to = String(raw.to || "").toLowerCase();
    const emoji = String(raw.emoji || "").slice(0, 16);
    if (!day || day > today || !from || !to || !emoji) continue;
    const cand = { day, from, to, emoji, updatedAt: String(raw.updatedAt || "") };
    const existing = byKey.get(reactionKey(cand));
    // Newest timestamp wins — an optimistic local row (stamped "now") always
    // survives a racing sync that still carries the pre-POST server state.
    if (!existing || String(existing.updatedAt || "") <= cand.updatedAt) {
      byKey.set(reactionKey(cand), cand);
    }
  }

  const merged = Array.from(byKey.values())
    .sort((a, b) => b.day.localeCompare(a.day))
    .slice(0, 120);
  writeReactions(merged);

  const seen = readReactionSeen();
  const fresh = [];
  let newest = seen || "";
  for (const r of merged) {
    if (r.to !== me) continue;
    const ts = String(r.updatedAt || "");
    if (ts > newest) newest = ts;
    if (seen !== null && ts > seen) fresh.push(r);
  }
  if (seen === null || newest !== seen) writeReactionSeen(newest);
  fresh.sort((a, b) => String(a.updatedAt).localeCompare(String(b.updatedAt)));
  return fresh;
}

// ── Lookups ───────────────────────────────────────────────────────────────────

// The partner's reaction to one of MY history entries (or today's pull).
export function reactionForEntry(entry) {
  if (!entry || !entry.day || !entry.token) return null;
  return readReactions().find((r) => r.to === entry.token && r.day === entry.day) || null;
}

// My own reaction to the partner's pull of `day` (defaults to today).
export function myReactionFor(day) {
  const d = day || todayKey();
  const me = getToken();
  return readReactions().find((r) => r.from === me && r.day === d) || null;
}

// ── Send ──────────────────────────────────────────────────────────────────────

export function sendReaction(emoji, day) {
  const me = getToken();
  const to = partnerToken();
  const d = day
    || (state.partnerToday && state.partnerToday.day)
    || todayKey();
  const row = { day: d, from: me, to, emoji, updatedAt: new Date().toISOString() };

  const list = readReactions().filter((r) => reactionKey(r) !== reactionKey(row));
  list.unshift(row);
  writeReactions(list);
  markRecentWrite("reactions");

  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl || getPreviewDay()) return row;
  const body = JSON.stringify({ type: "reaction", ...row });
  const opts = {
    method: "POST", mode: "cors", credentials: "omit", cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, body
  };
  fetch(cfg.endpointUrl, opts).catch(() => {
    fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {});
  });
  return row;
}

// ── Rendering ─────────────────────────────────────────────────────────────────

// Partner card on the Heute tab: shows what the partner pulled today (once the
// sync knows it) plus the emoji bar to react with.
export function renderPartnerCard() {
  if (!mount) return;
  const card = $("[data-ag-partner-card]");
  if (!card) return;

  // Without the Sheet backend there is nothing to show or send.
  if (!state.backup || !state.backup.enabled) { card.hidden = true; return; }

  const pName = partnerDisplayName();
  const titleEl = $("[data-ag-partner-title]");
  if (titleEl) titleEl.textContent = `${pName}s Kapsel heute`;

  const badgeEl = $("[data-ag-partner-badge]");
  const pullEl = $("[data-ag-partner-pull]");
  const barEl = $("[data-ag-reaction-bar]");
  const noteEl = $("[data-ag-partner-note]");
  if (!pullEl || !barEl) return;

  const today = todayKey();
  const pt = state.partnerToday;
  const hasPull = !!(pt && pt.day === today && pt.title);

  if (!hasPull) {
    if (badgeEl) badgeEl.hidden = true;
    pullEl.textContent = `Noch keine Kapsel heute — sobald ${pName} zieht, siehst du sie hier.`;
    pullEl.classList.add("is-waiting");
    barEl.hidden = true;
    if (noteEl) noteEl.hidden = true;
    card.hidden = false;
    return;
  }

  if (badgeEl) {
    badgeEl.textContent = pt.categoryLabel || "Kapsel";
    badgeEl.hidden = false;
  }
  pullEl.classList.remove("is-waiting");
  pullEl.textContent = `${emojiForTone(pt.tone)} „${pt.title}“`;

  const mine = myReactionFor(today);
  barEl.innerHTML = "";
  for (const emoji of reactionEmojis()) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ag-reaction-btn" + (mine && mine.emoji === emoji ? " is-selected" : "");
    btn.dataset.agReaction = emoji;
    btn.textContent = emoji;
    btn.setAttribute("aria-label", `Mit ${emoji} reagieren`);
    if (mine && mine.emoji === emoji) btn.setAttribute("aria-pressed", "true");
    barEl.appendChild(btn);
  }
  barEl.hidden = false;

  if (noteEl) {
    if (mine) {
      noteEl.textContent = `Deine Reaktion ist bei ${pName} gelandet 💌`;
      noteEl.hidden = false;
    } else {
      noteEl.textContent = "Tipp ein Emoji — es erscheint drüben auf der Kapsel.";
      noteEl.hidden = false;
    }
  }
  card.hidden = false;
}

// Badge inside MY result card: the partner's reaction to today's pull.
export function renderReactionOnResult() {
  if (!mount) return;
  const slot = $("[data-ag-reaction-received]");
  if (!slot) return;
  const r = reactionForEntry({ day: todayKey(), token: getToken() });
  if (!r) { slot.hidden = true; slot.textContent = ""; return; }
  slot.innerHTML = "";
  const big = document.createElement("span");
  big.className = "ag-reaction-received-emoji";
  big.textContent = r.emoji;
  const text = document.createElement("span");
  text.textContent = `${partnerDisplayName()} hat auf deine Kapsel reagiert`;
  slot.appendChild(big);
  slot.appendChild(text);
  slot.hidden = false;
}
