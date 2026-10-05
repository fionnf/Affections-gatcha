// ── Pure utility functions — no DOM, no state mutations ─────────────────────

// The machine's day does not start at midnight. A capsule pulled at 01:00
// belongs to the evening it was pulled in, and the new one arrives at
// dayStartHour (theme.json, 4 = 04:00). Every day key in the app — pull
// seed, history, streak, badge, the new-day reload — comes through here,
// so the shift lives here and nowhere else. Set once from init.
let _dayStartHour = 0;
export function setDayStartHour(h) {
  _dayStartHour = Number.isInteger(h) && h >= 0 && h < 24 ? h : 0;
}
export function dayStartHour() { return _dayStartHour; }

export function dateKeyInTimezone(timezone, date) {
  const instant = (date || new Date()).getTime() - _dayStartHour * 3600000;
  const parts = new Intl.DateTimeFormat("de-CH", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(instant));
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

// One formatter, not one per history row: Intl.DateTimeFormat construction
// is the expensive part, formatting is cheap.
let _historyDateFmt = null;
// The clock time a capsule was first opened, in the app's timezone, as
// "09:14". Takes the epoch milliseconds the entry records (or an ISO
// string, which is what comes back from the sheet); "" when unknown.
const _historyTimeFmts = new Map();
export function formatHistoryTime(revealedAt, timezone = "Europe/Zurich") {
  const ms = typeof revealedAt === "number" ? revealedAt : Date.parse(revealedAt || "");
  if (!Number.isFinite(ms) || ms <= 0) return "";
  try {
    let fmt = _historyTimeFmts.get(timezone);
    if (!fmt) { fmt = new Intl.DateTimeFormat("de-CH", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: timezone }); _historyTimeFmts.set(timezone, fmt); }
    return fmt.format(new Date(ms));
  } catch (_e) {
    return "";
  }
}

export function formatHistoryDate(dayKey) {
  const [y, m, d] = dayKey.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  try {
    _historyDateFmt ||= new Intl.DateTimeFormat("de-CH", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
    return _historyDateFmt.format(date);
  } catch (error) {
    return dayKey;
  }
}

export function formatBergeDate(iso) {
  if (!iso) return "";
  try {
    const s = String(iso).trim();
    // Normalize: strip time component if present (Sheets returns full ISO timestamps)
    const dateOnly = /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s;
    const d = new Date(dateOnly + "T12:00:00");
    if (isNaN(d.getTime())) return s;
    return d.toLocaleDateString("de-CH", { day: "numeric", month: "long", year: "numeric" });
  } catch (_) { return String(iso); }
}

export function formatElev(m) {
  if (!m && m !== 0) return "—";
  return Number(m).toLocaleString("de-CH") + " m";
}

// Kilometres for the Gipfelbuch header. One decimal below 100 km (7,4 km reads
// like a real walk), none above (248 km, not 248,3) — the extra digit stops
// carrying information once the number is that big.
export function formatKm(km) {
  const n = Number(km);
  if (!Number.isFinite(n)) return "—";
  return n < 100
    ? n.toLocaleString("de-CH", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : Math.round(n).toLocaleString("de-CH");
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

// One player. The token still travels on every history row, backup payload
// and sheet column (that is how the data is keyed), it just never changes.
export function getToken() {
  return "lennart";
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

// Decide whether a history entry is a redeemable voucher (Gutschein).
// A capsule is a voucher when config says so: "voucher": true on the outcome,
// recorded onto the history entry at pull time. There used to be a keyword
// fallback (Gutschein, "lädt dich ein"…) for entries recorded before the flag
// existed; it also caught texts that only mention a voucher, so the Benutzen
// button appeared on capsules that weren't one. Now every voucher in
// config/outcomes.json carries the flag, and an old entry without one is
// recognised by its title instead — registered from the config at load, so
// a renamed outcome simply stops matching rather than guessing.
const VOUCHER_TITLES = new Set();
export function registerVoucherTitles(outcomes) {
  VOUCHER_TITLES.clear();
  const cats = Array.isArray(outcomes && outcomes.categories) ? outcomes.categories : [];
  for (const c of cats) {
    for (const o of (Array.isArray(c.outcomes) ? c.outcomes : [])) {
      if (o && o.voucher === true && o.title) VOUCHER_TITLES.add(o.title);
    }
  }
}
export function isVoucherEntry(entry) {
  if (!entry) return false;
  if (entry.voucher === true) return true;
  if (entry.voucher === false) return false;
  return !!entry.title && VOUCHER_TITLES.has(entry.title);
}

// Escape text for interpolation into innerHTML template strings. Sheet-synced
// content (glossary words, Gipfelbuch entries, prompt answers) is written by
// the two players but still must never be interpretable as markup.
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}
