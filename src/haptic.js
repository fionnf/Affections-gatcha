// ── Haptic feedback ─────────────────────────────────────────────────────────

export function haptic(pattern) {
  if (!navigator.vibrate) return;
  try { navigator.vibrate(pattern); } catch (error) { /* ignore */ }
}

// One buzz signature per rarity, so the pull is recognisable with the phone
// face down: the quiet tones barely tick, the rare ones roll, the jackpot
// lands with a long final beat. Milestones override this in the caller.
const TONE_PATTERNS = {
  quiet:    [15],
  cursed:   [40, 30, 40],
  soft:     [20, 20, 40],
  quest:    [20, 20, 40],
  warm:     [20, 20, 40],
  photo:    [20, 15, 20, 15, 50],
  uncommon: [20, 15, 20, 15, 40],
  rare:     [25, 20, 25, 20, 70],
  jackpot:  [30, 20, 30, 20, 30, 20, 140],
  special:  [30, 20, 30, 20, 30, 20, 140]
};

export function hapticForTone(tone) {
  haptic(TONE_PATTERNS[tone] || TONE_PATTERNS.soft);
}
