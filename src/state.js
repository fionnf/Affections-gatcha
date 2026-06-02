// ── Shared mutable state ─────────────────────────────────────────────────────

export const state = {
  theme: null,
  outcomes: null,
  photos: null,
  specialDays: null,
  quest: null,
  missions: null,
  todaysPull: null,
  activeTab: "today",
  revealed: false,
  syncedHistory: null,   // in-memory fallback for restricted WebView localStorage
  baerlauch: {
    level: 1,
    locked: false,
    timerId: null,
    startedAt: null,
    durationMs: 8000
  }
};

// ── Mount element ────────────────────────────────────────────────────────────
export let mount = null;

export function setMount(el) {
  mount = el;
}

// ── DOM helper ───────────────────────────────────────────────────────────────
export function $(sel) {
  return mount.querySelector(sel);
}
