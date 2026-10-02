// ── Mondfenster ──────────────────────────────────────────────────────────────
// At night the real moon hangs in the machine's window. The phase is
// computed, not fetched: from a reference new moon and the synodic month,
// which is good to a few hours for decades either side. A full-moon night
// gets one extra line on the card.

const SYNODIC_DAYS = 29.530588853;
// New moon, 2000-01-06 18:14 UTC.
const REF_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);
const DAY_MS = 86400000;

// Phase as a fraction of the cycle: 0 new, 0.25 first quarter, 0.5 full.
export function moonPhase(date = new Date()) {
  const t = date instanceof Date ? date.getTime() : Date.parse(date);
  const days = (t - REF_NEW_MOON_MS) / DAY_MS;
  const age = ((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS;
  const phase = age / SYNODIC_DAYS;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  return { age, phase, illumination };
}

const NAMES = ["Neumond", "Zunehmende Sichel", "Erstes Viertel", "Zunehmender Mond", "Vollmond", "Abnehmender Mond", "Letztes Viertel", "Abnehmende Sichel"];
const EMOJI = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

export function moonOctant(phase) {
  return Math.round(phase * 8) % 8;
}
export function moonName(date) { return NAMES[moonOctant(moonPhase(date).phase)]; }
export function moonEmoji(date) { return EMOJI[moonOctant(moonPhase(date).phase)]; }

// The exact instant of a full moon, after Meeus (Astronomical Algorithms,
// ch. 49), with the main periodic terms: good to a few minutes. `k` counts
// lunations from January 2000; the full moon is lunation k + 0.5.
const rad = (d) => (d * Math.PI) / 180;
export function fullMoonInstant(k) {
  const kk = Math.floor(k) + 0.5;
  const T = kk / 1236.85;
  const jde0 = 2451550.09766 + 29.530588861 * kk + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = rad(2.5534 + 29.1053567 * kk - 0.0000014 * T * T - 0.00000011 * T ** 3);
  const Mp = rad(201.5643 + 385.81693528 * kk + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4);
  const F = rad(160.7108 + 390.67050284 * kk - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4);
  const O = rad(124.7746 - 1.56375588 * kk + 0.0020672 * T * T + 0.00000215 * T ** 3);
  const s = Math.sin;
  const corr =
    -0.40614 * s(Mp) + 0.17302 * E * s(M) + 0.01614 * s(2 * Mp) + 0.01043 * s(2 * F)
    + 0.00734 * E * s(Mp - M) - 0.00515 * E * s(Mp + M) + 0.00209 * E * E * s(2 * M)
    - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F) + 0.00056 * E * s(2 * Mp + M)
    - 0.00042 * s(3 * Mp) + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F)
    - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(O) - 0.00007 * s(Mp + 2 * M)
    + 0.00004 * s(2 * Mp - 2 * F) + 0.00004 * s(3 * M) + 0.00003 * s(Mp + M - 2 * F)
    + 0.00003 * s(2 * Mp + 2 * F) - 0.00003 * s(Mp + M + 2 * F) + 0.00003 * s(Mp - M + 2 * F)
    - 0.00002 * s(Mp - M - 2 * F) - 0.00002 * s(3 * Mp + M) + 0.00002 * s(4 * Mp);
  const jde = jde0 + corr;
  return new Date((jde - 2440587.5) * DAY_MS);
}

function dayKeyIn(date, timezone) {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  } catch (_e) { return date.toISOString().slice(0, 10); }
}

// A full-moon day: the exact full moon falls on that calendar day, in the
// app's timezone. Takes a day key like 2026-10-26.
export function isFullMoonDay(dayKey, timezone = "Europe/Zurich") {
  const noon = Date.parse(`${dayKey}T12:00:00Z`);
  if (isNaN(noon)) return false;
  const year = new Date(noon).getUTCFullYear() + (new Date(noon).getUTCMonth() + 0.5) / 12;
  const k0 = Math.floor((year - 2000) * 12.3685);
  for (const k of [k0 - 1, k0, k0 + 1]) {
    if (dayKeyIn(fullMoonInstant(k), timezone) === dayKey) return true;
  }
  return false;
}

// The lit part of the disc as an SVG path, for a circle of radius r centred
// at (r, r). The terminator is an ellipse whose width follows cos(phase):
// a waxing moon is lit on the right, a waning one on the left.
export function moonPath(phase, r = 20) {
  const p = ((phase % 1) + 1) % 1;
  const waxing = p <= 0.5;
  const k = Math.cos(2 * Math.PI * p);           // 1 new … -1 full
  const rx = Math.abs(k) * r;
  const cx = r, top = 0, bottom = 2 * r;
  // Outer limb: the lit side's semicircle.
  const limbSweep = waxing ? 1 : 0;
  // Terminator: bulges toward the lit side when more than half is lit.
  const bulgeToLit = k < 0;
  const termSweep = waxing ? (bulgeToLit ? 1 : 0) : (bulgeToLit ? 0 : 1);
  return `M${cx},${top} A${r},${r} 0 0 ${limbSweep} ${cx},${bottom} A${rx.toFixed(2)},${r} 0 0 ${termSweep} ${cx},${top} Z`;
}

const FULL_MOON_LINES = [
  "🌕 Vollmondnacht. Die Kapsel hat im Mondlicht gelegen.",
  "🌕 Heute ist Vollmond. Die Maschine hat etwas heller geleuchtet.",
  "🌕 Vollmond über Zürich. Einmal rausschauen, bevor du schläfst."
];
export function fullMoonLine(dayKey) {
  if (!isFullMoonDay(dayKey)) return "";
  const n = dayKey.split("-").reduce((a, b) => a + Number(b), 0);
  return FULL_MOON_LINES[n % FULL_MOON_LINES.length];
}

// Draws tonight's moon into the window. Called with the evening flag so the
// moon only appears after dark; by day the element stays empty.
export function renderMoon(el, { evening = false, date = new Date() } = {}) {
  if (!el) return;
  if (!evening) { el.innerHTML = ""; el.hidden = true; return; }
  const { phase, illumination } = moonPhase(date);
  const r = 20;
  el.hidden = false;
  el.title = `${NAMES[moonOctant(phase)]} · ${Math.round(illumination * 100)}%`;
  el.innerHTML = `<svg viewBox="0 0 ${2 * r} ${2 * r}" aria-hidden="true">
    <circle cx="${r}" cy="${r}" r="${r}" class="ag-moon-dark"/>
    <path d="${moonPath(phase, r)}" class="ag-moon-lit"/>
  </svg>`;
  el.classList.toggle("is-full", illumination > 0.97);
}
