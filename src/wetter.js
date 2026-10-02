// ── Kapsel-Wetter ────────────────────────────────────────────────────────────
// The machine knows what the sky was doing when the capsule fell. Open-Meteo,
// no key, one request, cached half an hour. The result rides on the history
// entry ("gezogen bei 4° 🌫"), shows on the card and in Verlauf, and tints the
// hero: rain streaks, snow drifting, fog. Everything is best-effort — no
// network, no weather, and nothing else notices.
import { state, mount } from "./state.js";

const CACHE_KEY = "affektions-gacha:wetter:v1";
const TTL_MS = 30 * 60 * 1000;
const TIMEOUT_MS = 5000;

// WMO weather codes, as Open-Meteo reports them.
export function weatherEmoji(code, isDay = true) {
  const c = Number(code);
  if (c === 0) return isDay ? "☀️" : "🌙";
  if (c === 1) return isDay ? "🌤" : "🌙";
  if (c === 2) return isDay ? "⛅" : "☁️";
  if (c === 3) return "☁️";
  if (c === 45 || c === 48) return "🌫";
  if (c >= 51 && c <= 57) return "🌦";
  if (c >= 61 && c <= 67) return "🌧";
  if (c >= 71 && c <= 77) return "🌨";
  if (c >= 80 && c <= 82) return "🌧";
  if (c === 85 || c === 86) return "🌨";
  if (c >= 95 && c <= 99) return "⛈";
  return "🌡";
}

// What the hero does about it.
export function weatherMood(code) {
  const c = Number(code);
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return "rain";
  if ((c >= 71 && c <= 77) || c === 85 || c === 86) return "snow";
  if (c === 45 || c === 48) return "fog";
  if (c >= 95) return "storm";
  return null;
}

// "4° 🌫" — thin space between, so it reads as one token on the date line.
export function weatherText(w) {
  if (!w || typeof w.t !== "number") return "";
  return `${Math.round(w.t)}° ${w.e || weatherEmoji(w.c, w.d !== false)}`;
}

export function readCachedWeather() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const w = JSON.parse(raw);
    return w && typeof w.t === "number" && typeof w.at === "number" ? w : null;
  } catch (_e) { return null; }
}
function writeCachedWeather(w) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(w)); } catch (_e) {}
}

// Returns {t, c, e, d, at} or null. Honours the cache unless `force`.
export async function fetchWeather({ force = false } = {}) {
  const cfg = state.theme && state.theme.weather;
  if (!cfg || typeof cfg.latitude !== "number" || typeof cfg.longitude !== "number") return null;
  const cached = readCachedWeather();
  if (cached && !force && Date.now() - cached.at < TTL_MS) { state.weather = cached; return cached; }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cfg.latitude}&longitude=${cfg.longitude}&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(state.theme.timezone || "Europe/Zurich")}`;
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!res.ok) throw new Error("weather " + res.status);
    const data = await res.json();
    const cur = data && data.current;
    if (!cur || typeof cur.temperature_2m !== "number") throw new Error("weather shape");
    const w = { t: cur.temperature_2m, c: Number(cur.weather_code) || 0, d: cur.is_day !== 0, at: Date.now() };
    w.e = weatherEmoji(w.c, w.d);
    writeCachedWeather(w);
    state.weather = w;
    return w;
  } catch (_e) {
    // A stale cache is better than nothing on the card.
    if (cached) { state.weather = cached; return cached; }
    return null;
  } finally {
    clearTimeout(tid);
  }
}

// The weather that goes onto a history entry: just the three fields.
export function weatherForEntry(w) {
  if (!w || typeof w.t !== "number") return null;
  return { t: Math.round(w.t * 10) / 10, c: w.c, e: w.e || weatherEmoji(w.c, w.d !== false) };
}

const MOOD_CLASSES = ["is-raining", "is-snowing", "is-foggy", "is-stormy"];
export function applyWeatherMood(w) {
  if (!mount) return;
  for (const c of MOOD_CLASSES) mount.classList.remove(c);
  const mood = w ? weatherMood(w.c) : null;
  if (mood === "rain") mount.classList.add("is-raining");
  if (mood === "snow") mount.classList.add("is-snowing");
  if (mood === "fog") mount.classList.add("is-foggy");
  if (mood === "storm") mount.classList.add("is-stormy", "is-raining");
}
