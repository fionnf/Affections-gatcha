// ── Sound engine (Web Audio API, no external files) ─────────────────────────
import { SOUND_KEY } from "./constants.js";

export let _audioCtx = null;

export function _getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
  }
  return _audioCtx;
}

export function soundEnabled() {
  try { return window.localStorage.getItem(SOUND_KEY) !== "off"; } catch (_) { return true; }
}

export function _playNote(ctx, freq, startSec, dur, vol = 0.15, type = "sine") {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  const t = ctx.currentTime + startSec;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

export function playPullSound(tone) {
  if (!soundEnabled()) return;
  const ctx = _getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  switch (tone) {
    case "quiet":
      _playNote(ctx, 280, 0,    0.18, 0.08, "sine");
      _playNote(ctx, 210, 0.12, 0.22, 0.06, "sine");
      break;
    case "cursed":
      _playNote(ctx, 220, 0,    0.12, 0.10, "triangle");
      _playNote(ctx, 170, 0.09, 0.28, 0.07, "triangle");
      break;
    case "uncommon":
      _playNote(ctx, 523, 0,    0.14, 0.14, "sine");
      _playNote(ctx, 784, 0.10, 0.22, 0.12, "sine");
      break;
    case "rare":
      _playNote(ctx, 523, 0,    0.12, 0.14, "sine");
      _playNote(ctx, 659, 0.09, 0.12, 0.14, "sine");
      _playNote(ctx, 1047,0.18, 0.30, 0.12, "sine");
      break;
    case "jackpot":
      [523, 659, 784, 1047, 1319].forEach((f, i) => _playNote(ctx, f, i * 0.09, 0.18, 0.13, "sine"));
      _playNote(ctx, 2093, 0.40, 0.40, 0.04, "sine");
      break;
    case "special":
      [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => _playNote(ctx, f, i * 0.08, 0.16, 0.13, "sine"));
      _playNote(ctx, 2093, 0.45, 0.50, 0.05, "sine");
      break;
    default: // common, quest, collect, photo
      _playNote(ctx, 523, 0,    0.12, 0.13, "sine");
      _playNote(ctx, 659, 0.09, 0.18, 0.10, "sine");
      break;
  }
}

// A coin into the slot: two bright, short partials, the second a fifth up.
export function playClink() {
  if (!soundEnabled()) return;
  const ctx = _getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  _playNote(ctx, 1760, 0,    0.09, 0.10, "triangle");
  _playNote(ctx, 2637, 0.05, 0.14, 0.07, "sine");
  _playNote(ctx, 1319, 0.11, 0.22, 0.05, "sine");
}
