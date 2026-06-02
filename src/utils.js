// ── Pure utility functions — no DOM, no state mutations ─────────────────────

export function dateKeyInTimezone(timezone, date) {
  const parts = new Intl.DateTimeFormat("de-CH", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date || new Date());
  const get = (type) => parts.find((part) => part.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function hmInTimezone(timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { h: get("hour"), m: get("minute") };
}

export function formatHistoryDate(dayKey) {
  const [y, m, d] = dayKey.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  try {
    return new Intl.DateTimeFormat("de-CH", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  } catch (error) {
    return dayKey;
  }
}

export function formatBergeDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("de-CH", { day: "numeric", month: "long", year: "numeric" });
  } catch (_) { return iso; }
}

export function formatElev(m) {
  if (!m && m !== 0) return "—";
  return Number(m).toLocaleString("de-CH") + " m";
}

export function safeUrl(url) {
  if (typeof url !== "string") return "";
  try {
    const parsed = new URL(url, window.location.href);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") ? parsed.href : "";
  } catch (error) {
    return "";
  }
}

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

export function seededRandom(seedText) {
  return mulberry32(hashStringToUint32(seedText))();
}

export function seededIndex(seedText, length) {
  if (!length) return 0;
  return Math.floor(seededRandom(seedText) * length);
}

export function extractKomootId(url) {
  const m = url.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);
  return m ? m[1] : null;
}

export function extractDriveFileId(url) {
  if (typeof url !== "string") return null;
  const m = /drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(url);
  return m ? (m[1] || m[2]) : null;
}

export function urlFor(file, baseUrl, resolveBase) {
  return new URL(file, resolveBase()).toString();
}

export function getToken() {
  return getMissionPlayer() === "fionn" ? "fionn" : "lennart";
}

export function getMissionPlayer() {
  try {
    const p = new URLSearchParams(window.location.search).get("player");
    return p === "fionn" ? "fionn" : "lennart";
  } catch (_) { return "lennart"; }
}

export function getPreviewDay() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("preview-day");
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  if (/^\d{2}-\d{2}$/.test(raw)) {
    const year = new Date().getFullYear().toString();
    return `${year}-${raw}`;
  }
  return null;
}

export function getPreviewCategory() {
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("preview-category") || "").trim().toLowerCase();
  if (!raw) return null;
  return raw;
}

export function currentWeekKey() {
  const d = new Date();
  const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  utc.setUTCDate(utc.getUTCDate() + 4 - (utc.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc - yearStart) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function currentQuestPeriod(state) {
  const tz = state.theme?.timezone || "UTC";
  const today = dateKeyInTimezone(tz);
  const [y, m, d] = today.split("-").map(Number);
  const epochDays = Math.floor(new Date(Date.UTC(y, m - 1, d)).getTime() / 86400000);
  return Math.floor(epochDays / ((state.quest?.periodDays) || 2));
}

export function currentChallenge(state) {
  const challenges = state.quest?.challenges;
  if (!Array.isArray(challenges) || !challenges.length) return null;
  const period = currentQuestPeriod(state);
  const entry = challenges[period % challenges.length];
  if (typeof entry === "string") return { prompt: entry, solution: "" };
  return entry;
}

export function dailyMsgIdx(pool) {
  const now = new Date();
  const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return doy % pool.length;
}

// Normalise any day value the GAS might send.
export function normaliseDay(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s.slice(0, 10);
  const MONTHS = { Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",
                   Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12" };
  const m = s.match(/([A-Za-z]{3})\s+(\d{1,2})/);
  if (m && MONTHS[m[1]]) {
    const year = new Date().getFullYear();
    return `${year}-${MONTHS[m[1]]}-${String(m[2]).padStart(2, "0")}`;
  }
  return "";
}
