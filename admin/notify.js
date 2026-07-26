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

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    swReg = await navigator.serviceWorker.register("./sw-fionn.js");
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
  if (result === "granted") await registerServiceWorker();
  return result;
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
  const fresh = items.filter((it) => tsOf(it) > lastSeen && (it.type === "hug" || it.type === "wish" || it.type === "reaction"));
  const newestTs = items.reduce((m, it) => Math.max(m, tsOf(it)), lastSeen);

  if (!silent && fresh.length) {
    const hug = fresh.find((f) => f.type === "hug");
    if (hug) notify("🫂 Lennart hat dich angestupst", hug.message || "Notfall-Umarmung gebraucht");
    const wishes = fresh.filter((f) => f.type === "wish");
    if (wishes.length) notify("✨ Neuer Wunsch", wishes[0].wish || wishes[0].message || "Lennart hat etwas gewünscht");
    // Reactions appear in the feed from BOTH players — only announce Lennart's.
    const reaction = fresh.find((f) => f.type === "reaction" && (f.token || "").toLowerCase() === "lennart");
    if (reaction) notify(`${reaction.emoji || "💛"} Kapsel-Reaktion`, reaction.message || "Lennart hat auf deine Kapsel reagiert");
  }
  if (newestTs > lastSeen) setLastSeen(newestTs);
  return items;
}

export function startPolling() {
  const minutes = (state.admin && Number(state.admin.pollMinutes)) || 30;
  if (pollTimer) clearInterval(pollTimer);
  // First poll is silent so we don't re-announce history; mark baseline.
  if (!getLastSeen()) pollOnce({ silent: true });
  pollTimer = setInterval(() => pollOnce({ silent: false }), Math.max(5, minutes) * 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") pollOnce({ silent: false });
  });
}
