// ── Haptic feedback ─────────────────────────────────────────────────────────

export function haptic(pattern) {
  if (!navigator.vibrate) return;
  try { navigator.vibrate(pattern); } catch (error) { /* ignore */ }
}
