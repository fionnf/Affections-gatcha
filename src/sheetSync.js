// ── Sheet-sync race guard ─────────────────────────────────────────────────────
// Shared by any "sheet-authoritative" collection (Gipfelbuch, Glossar): the
// write path posts to the sheet fire-and-forget, while the read path
// overwrites local state with whatever the sheet currently has. If a GET
// happens to land between the POST being sent and Apps Script actually
// persisting it, an authoritative overwrite would silently wipe the entry
// that was just added.
//
// Fix: remember when each collection last had a local write, and skip one
// overwrite pass if it lands within a short grace period afterwards — the
// next sync (a few seconds later) picks up the now-persisted change anyway.

const _recentWrites = new Map();

export function markRecentWrite(collection) {
  _recentWrites.set(collection, Date.now());
}

export function withinGracePeriod(collection, graceMs = 6000) {
  const t = _recentWrites.get(collection);
  return typeof t === "number" && Date.now() - t < graceMs;
}

// Test seam: lets a test stand at "the grace period has elapsed" without
// sleeping through it. Nothing in the app calls this.
