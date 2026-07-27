// ── Sync / network functions ────────────────────────────────────────────────
import { state, mount } from "./state.js";
import {
  readHistory, writeHistory, readFavorites, writeFavorites,
  writeTokens, readTokens, readGipfelbuch, writeGipfelbuch,
  readBaerlauchScores, readMissionLog, writeMissionLog,
  readQuestState, writeQuestState, readQuestPoints, writeQuestPoints
} from "./storage.js";
import { dateKeyInTimezone, normaliseDay, getToken, currentChallenge, currentQuestPeriod } from "./utils.js";
import { computeStreak, writeStreakCache, writeSyncedStreak } from "./streak.js";
import { BAERLAUCH_SCORE_KEY } from "./constants.js";
import { withinGracePeriod } from "./sheetSync.js";
import { applySharedStimmung } from "./stimmung.js";
import { applySharedWerkstatt } from "./werkstatt.js";

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
        localByDay.set(`${day}|${normToken}`, { ...entry, day, token: normToken });
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
      writeTokens(data.tokens);
    }

    if (typeof data.questPoints === "number" && data.questPoints > readQuestPoints()) {
      writeQuestPoints(data.questPoints);
    }

    if (typeof data.streak === "number" && data.streak > 0) {
      writeSyncedStreak(data.streak);
      if (data.streak > computeStreak()) writeStreakCache(data.streak);
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

    if (Array.isArray(data.missionLog) && data.missionLog.length) {
      const local = readMissionLog();
      const byKey = new Map(local.map(e => [`${e.day}|${e.player}`, e]));
      for (const entry of data.missionLog) {
        if (!entry.day || !entry.player) continue;
        byKey.set(`${entry.day}|${entry.player}`, entry);
      }
      const merged = Array.from(byKey.values()).sort((a, b) => b.day.localeCompare(a.day));
      writeMissionLog(merged);
    }

    if (typeof data.latestPing === "string" && data.latestPing && getToken() !== "fionn") {
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

    // Capsules one player wrote for the other. Both sides need them: the
    // author to list and edit them, the recipient to draw from them.
    if (Array.isArray(data.werkstatt)) {
      try { applySharedWerkstatt(data.werkstatt); } catch (_e) {}
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
      tokens: readTokens(),
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
    fetch(cfg.endpointUrl, opts).catch(() => {
      fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {});
    });
  } catch (_e) {}
}
