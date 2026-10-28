// ── Mondfenster ──────────────────────────────────────────────────────────────
// At night the real moon hangs in the machine's window. The phase is
// computed, not fetched, from the mean lunation.

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
