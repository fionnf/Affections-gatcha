// Poll the inbox + fire local notifications for new hugs/wishes.
// Foreground poll (on open + interval) is the reliable path; periodicsync is a
// best-effort background hook (Chrome-only, throttled). Email stays guaranteed.
import { state } from "./state.js";
import { LAST_SEEN_KEY, NOTIF_KEY } from "./constants.js";
import { fetchActivity, tsOf } from "./inbox.js";

let swReg = null;
let pollTimer = null;

function getLastSeen() {
  try { return Number(window.localStorage.getItem(LAST_SEEN_KEY)) || 0; } catch { return 0; }
}
function setLastSeen(ts) {
  try { window.localStorage.setItem(LAST_SEEN_KEY, String(ts)); } catch {}
}

// Uses the app's existing service worker rather than registering one of its
// own. Both would sit at the origin root, and a registration is keyed by
// scope — a second script there REPLACES the first, so this page would knock
// out sw.js (losing the offline shell and Web Push) and then get replaced
// right back on the next load. One worker per origin; sw.js handles the two
// messages this needs.
export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    swReg = await navigator.serviceWorker.ready;
    // Best-effort periodic background sync (Chrome installed-PWA only).
    if (swReg.periodicSync) {
      try {
        const status = await navigator.permissions.query({ name: "periodic-background-sync" });
        if (status.state === "granted") {
          await swReg.periodicSync.register("fionn-inbox-poll", { minInterval: 60 * 60 * 1000 });
        }
      } catch {}
    }
    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "POLL_INBOX") pollOnce();
    });
    return swReg;
  } catch { return null; }
}

export async function requestPermission() {
  if (!("Notification" in window)) return "unsupported";
  let result = Notification.permission;
  if (result === "default") {
    try { result = await Notification.requestPermission(); } catch {}
  }
  try { window.localStorage.setItem(NOTIF_KEY, result); } catch {}
  if (result === "granted") { await registerServiceWorker(); await subscribeToPush(); }
  return result;
}

// ── Web Push ──────────────────────────────────────────────────────────────────
// A hug or a wish from Lennart reaches this phone as a push, not only while
// the page is open: the Eingänge subscribe under the token "fionn", which is
// where the push-notify job already looks for the recipient of a hug. Same
// VAPID key and the same service worker as the gacha.
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
export async function subscribeToPush() {
  const cfg = state.push;
  if (!cfg || !cfg.enabled || !cfg.vapidPublicKey) return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return false;
  if (!("Notification" in window) || Notification.permission !== "granted") return false;
  const endpoint = (state.backup && state.backup.enabled && state.backup.endpointUrl) || "";
  if (!endpoint) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(cfg.vapidPublicKey) });
    }
    const body = JSON.stringify({ type: "push-subscribe", token: "fionn", subscription: sub.toJSON() });
    const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
    await fetch(endpoint, opts).catch(() => fetch(endpoint, { ...opts, mode: "no-cors" }));
    return true;
  } catch (e) {
    console.warn("[fionn-inbox] push subscription failed:", e && e.message);
    return false;
  }
}

function notify(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  if (swReg && swReg.active) {
    swReg.active.postMessage({ type: "SHOW_NOTIFICATION", title, body, tag: "fionn-inbox" });
  } else {
    try { new Notification(title, { body, icon: "./media/icon-192.png" }); } catch {}
  }
}

// Poll once; notify about hugs/wishes newer than last-seen. Returns the items.
export async function pollOnce({ silent = false } = {}) {
  let items = [];
  try { items = await fetchActivity(); } catch { return []; }
  state.activity = items;
  const lastSeen = getLastSeen();
  const fresh = items.filter((it) => tsOf(it) > lastSeen && (it.type === "hug" || it.type === "wish"));
  const newestTs = items.reduce((m, it) => Math.max(m, tsOf(it)), lastSeen);

  if (!silent && fresh.length) {
    const hug = fresh.find((f) => f.type === "hug");
    if (hug) notify("🫂 Lennart hat dich angestupst", hug.message || "Notfall-Umarmung gebraucht");
    const wishes = fresh.filter((f) => f.type === "wish");
    if (wishes.length) notify("✨ Neuer Wunsch", wishes[0].wish || wishes[0].message || "Lennart hat etwas gewünscht");
  }
  if (newestTs > lastSeen) setLastSeen(newestTs);
  return items;
}

export function startPolling() {
  // Already granted on an earlier visit: keep the push subscription fresh.
  if ("Notification" in window && Notification.permission === "granted") subscribeToPush().catch(() => {});
  const minutes = (state.admin && Number(state.admin.pollMinutes)) || 30;
  if (pollTimer) clearInterval(pollTimer);
  // First poll is silent so we don't re-announce history; mark baseline.
  if (!getLastSeen()) pollOnce({ silent: true });
  pollTimer = setInterval(() => pollOnce({ silent: false }), Math.max(5, minutes) * 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") pollOnce({ silent: false });
  });
}
