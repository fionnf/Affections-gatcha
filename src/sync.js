// ── Sync / network functions ────────────────────────────────────────────────
import { state, mount } from "./state.js";
import {
  readHistory, writeHistory, readFavorites, writeFavorites,
  readTokens, applySharedTokens, writeTokensSent, readGipfelbuch, writeGipfelbuch,
  readBaerlauchScores,
  readQuestState, writeQuestState, readQuestPoints, writeQuestPoints
} from "./storage.js";
import { dateKeyInTimezone, normaliseDay, getToken, currentChallenge, currentQuestPeriod } from "./utils.js";
import { computeStreak, writeStreakCache, writeSyncedStreak } from "./streak.js";
import { BAERLAUCH_SCORE_KEY } from "./constants.js";
import { withinGracePeriod } from "./sheetSync.js";
import { applySharedStimmung } from "./stimmung.js";

let _baseUrl = "";
let _resolveBase = null;

export function initSync(baseUrl, resolveBaseFn) {
  _baseUrl = baseUrl;
  _resolveBase = resolveBaseFn;
}

export function resolveBase() {
  if (_resolveBase) return _resolveBase();
  if (!_baseUrl) return window.location.href;
  try {
    return new URL(_baseUrl, window.location.href).toString();
  } catch (_error) {
    return window.location.href;
  }
}

export function fetchJson(file, fallback = null) {
  const url = new URL(file, resolveBase()).toString();
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) {
      if (fallback !== null) return fallback;
      throw new Error(`${file}: HTTP ${response.status}`);
    }
    return response.json();
  });
}

// Quiet one-line sync indicator at the bottom of the page. Failures used to
// be completely invisible — data just silently didn't arrive. Now the app
// always shows when it last heard from the sheet, or that it's offline.
function setSyncStatus(ok) {
  try {
    const el = mount && mount.querySelector("[data-ag-sync-status]");
    if (!el) return;
    el.hidden = false;
    if (ok) {
      const t = new Intl.DateTimeFormat("de-CH", {
        timeZone: state.theme?.timezone || "Europe/Zurich",
        hour: "2-digit", minute: "2-digit"
      }).format(new Date());
      el.textContent = `Synchronisiert ${t} ✓`;
      el.dataset.agSyncState = "ok";
    } else {
      el.textContent = "Offline — zeigt lokalen Stand";
      el.dataset.agSyncState = "error";
    }
  } catch (_e) {}
}

export async function syncFromSheets() {
  try {
    const cfg = state.backup;
    if (!cfg || !cfg.enabled || !cfg.endpointUrl) return false;
    const token = getToken();
    const url = `${cfg.endpointUrl}?token=${encodeURIComponent(token)}`;
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 12000);
    let res;
    try {
      res = await fetch(url, { cache: "no-store", signal: controller.signal });
    } finally {
      clearTimeout(tid);
    }
    if (!res.ok) { setSyncStatus(false); return false; }
    const data = await res.json();
    if (!data.ok) { setSyncStatus(false); return false; }

    const today = dateKeyInTimezone(state.theme?.timezone || "UTC");

    const localRaw = readHistory();
    const cleaned = localRaw.filter((e) => e.title !== "(wiederhergestellt)" && e.day <= today);
    if (cleaned.length !== localRaw.length) writeHistory(cleaned);

    const localFavsRaw = readFavorites();
    const cleanedFavs = localFavsRaw.filter((e) => e.day <= today);
    if (cleanedFavs.length !== localFavsRaw.length) writeFavorites(cleanedFavs);

    if (Array.isArray(data.history) && data.history.length) {
      const local = readHistory();
      // Keyed by day+token, not day alone — a day-only key would let one
      // player's entry silently replace the other's the moment local
      // storage ever holds both (shared device, testing), even though the
      // backend already filters History by the requesting token itself.
      const localByDay = new Map(local.map((e) => [`${e.day}|${e.token}`, e]));
      for (const entry of data.history) {
        if (entry.title === "(wiederhergestellt)") continue;
        const day = normaliseDay(entry.day);
        if (!day || day > today) continue;
        const normToken = typeof entry.token === "string" ? entry.token.toLowerCase() : entry.token;
        const key = `${day}|${normToken}`;
        const next = { ...entry, day, token: normToken };
        // Bestanden is a one-way flag, and the deployed Apps Script may
        // predate its column — a sheet row without the field means "the sheet
        // does not know", not "not passed". Blindly taking the sheet copy here
        // would strip a trophy minutes after it was earned, so the union keeps
        // a local true. A sheet that does carry the flag simply agrees; it can
        // never carry a false that has to win, because nothing ever unsets it.
        const prev = localByDay.get(key);
        if (prev && prev.bestanden && !next.bestanden) {
          next.bestanden = true;
          next.bestandenAt = prev.bestandenAt || null;
        }
        // Same union for the proof photo: a sheet row without the field means
        // the deployed script doesn't know the column, not that the proof is
        // gone. When both sides carry one, the sheet stays authoritative.
        if (prev && prev.beweisUrl && !next.beweisUrl) {
          next.beweisUrl = prev.beweisUrl;
        }
        if (prev && prev.reaction && !next.reaction) {
          next.reaction = prev.reaction;
        }
        localByDay.set(key, next);
      }
      const merged = Array.from(localByDay.values()).sort((a, b) => b.day.localeCompare(a.day));
      writeHistory(merged);
      state.syncedHistory = merged;
      writeStreakCache(computeStreak());
    }

    if (Array.isArray(data.favourites) && data.favourites.length) {
      const localFavs = readFavorites();
      const favsByDay = new Map(localFavs.map((e) => [`${e.day}|${e.token}`, e]));
      for (const entry of data.favourites) {
        if (entry.day > today) continue;
        const normToken = typeof entry.token === "string" ? entry.token.toLowerCase() : entry.token;
        favsByDay.set(`${entry.day}|${normToken}`, { ...entry, token: normToken });
      }
      writeFavorites(Array.from(favsByDay.values()).sort((a, b) => b.day.localeCompare(a.day)));
    }

    if (data.tokens && typeof data.tokens === "object") {
      // Merges rather than overwrites, and tells us whether we are still
      // holding tokens the sheet has not got. If so, push them now instead of
      // waiting for whatever the player happens to do next — that wait was how
      // an unsent token stayed unsent long enough to be lost.
      if (applySharedTokens(data.tokens)) backupToSheets();
    }

    if (typeof data.questPoints === "number" && data.questPoints > readQuestPoints()) {
      writeQuestPoints(data.questPoints);
    }

    // Kept only as the fresh-device placeholder computeStreak uses before
    // any history exists; it no longer raises anything once the log is here.
    if (typeof data.streak === "number" && data.streak > 0) {
      writeSyncedStreak(data.streak);
    }

    if (data.baerlauchScores && typeof data.baerlauchScores === "object") {
      const localScores = readBaerlauchScores();
      let changed = false;
      for (const [player, level] of Object.entries(data.baerlauchScores)) {
        if (typeof level === "number" && level > (localScores[player] || 0)) {
          localScores[player] = level;
          changed = true;
        }
      }
      if (changed) {
        try { localStorage.setItem(BAERLAUCH_SCORE_KEY, JSON.stringify(localScores)); } catch (_) {}
      }
    }

    if (typeof data.latestPing === "string" && data.latestPing) {
      try {
        const LAST_PING_KEY = "affektions-gacha:last-ping:v1";
        const lastSeen = window.localStorage.getItem(LAST_PING_KEY) || "";
        if (data.latestPing > lastSeen) {
          window.localStorage.setItem(LAST_PING_KEY, data.latestPing);
          // Will be handled by ag-synced event handler
          state._newPing = true;
        }
      } catch (_le) {}
    }

    // Shared day colour: whoever picked it last (either player, any time of
    // day) wins, and it lands here on this sync.
    if (data.stimmung) {
      try { applySharedStimmung(data.stimmung); } catch (_e) {}
    }

    if (Array.isArray(data.gipfelbuch) && !withinGracePeriod("gipfelbuch")) {
      const sorted = data.gipfelbuch
        .filter((e) => e.id)
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      writeGipfelbuch(sorted);
    }

    // Dispatch event instead of calling render functions directly
    if (mount) {
      mount.dispatchEvent(new CustomEvent("ag-synced", {
        bubbles: false,
        detail: { data }
      }));
    }

    setSyncStatus(true);
    return Array.isArray(data.history) ? data.history.length : 0;
  } catch (_e) { setSyncStatus(false); return -1; }
}

export function backupToSheets() {
  try {
    const cfg = state.backup;
    if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
    const token = getToken();
    const history = readHistory().filter((e) => (e.token || "").toLowerCase() === token.toLowerCase());
    // Favourites need the same filter as history — otherwise, the moment
    // local storage ever holds both players' favourites (shared device,
    // testing), a sync would tag the other player's entries under this
    // player's backup row on the server.
    const favourites = readFavorites().filter((e) => (e.token || "").toLowerCase() === token.toLowerCase());
    // Snapshotted before the POST goes out, and recorded only once the request
    // comes back, so a failed send leaves the tokens marked unsent.
    const tokensSent = readTokens();
    const qs = readQuestState(() => currentQuestPeriod(state));
    const questLog = (qs.solved && qs.pointsEarned && !qs._logged) ? {
      challenge: currentChallenge(state),
      attempts: qs.attempts,
      points: qs.pointsEarned,
      period: qs.period
    } : undefined;
    if (questLog) { qs._logged = true; writeQuestState(qs); }
    const body = JSON.stringify({
      type: "gacha-backup",
      token,
      history,
      favourites,
      streak: computeStreak(),
      tokens: tokensSent,
      questPoints: readQuestPoints(),
      ...(questLog ? { questLog } : {})
    });
    const opts = {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body
    };
    // A resolved fetch means the request reached Apps Script — readable in
    // cors mode, opaque in the no-cors fallback, but either way it went. Only
    // then are the tokens marked sent; a rejection (offline, blocked) leaves
    // the mark where it was, which is what keeps the next sync from treating
    // the sheet's older copy as the truth.
    return fetch(cfg.endpointUrl, opts)
      .then(() => { writeTokensSent(tokensSent); })
      .catch(() =>
        fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" })
          .then(() => { writeTokensSent(tokensSent); })
          .catch(() => {})
      );
  } catch (_e) {}
}
