// ── Notifications ─────────────────────────────────────────────────────────────
// Local (service-worker-scheduled) reminders + the permission flow, extracted
// from events.js so the whole notification concern lives in one place. Also the
// home for real Web Push subscription (see subscribeToPush), which stays fully
// dormant until config/push.json is enabled — see PUSH-SETUP.md.
import { state, $ } from "./state.js";
import { NOTIF_KEY } from "./constants.js";
import { getToken, dateKeyInTimezone, hmInTimezone, dailyMsgIdx, currentQuestPeriod } from "./utils.js";
import { resolveBase } from "./sync.js";
import { displayNameFromToken } from "./render.js";
import { readHistory, readQuestState } from "./storage.js";
import { isQuestAvailable } from "./mission.js";

// Notification message pools
export const DAILY_REMINDER_POOL = [
  { title: "{name}s Kapsel wartet 🎲", body: "Heute noch keine Kapsel gezogen — zieh jetzt!" },
  { title: "Guten Morgen, {name} 🌿", body: "Deine tägliche Kapsel ist bereit." },
  { title: "Die Maschine dreht sich 🎲", body: "Du hast heute noch nicht gezogen — auf geht's!" },
  { title: "{name}s tägliche Kapsel ✨", body: "Eine neue Chance — die Maschine dreht sich." },
  { title: "Heute wartet etwas 🎲", body: "Die Kapsel des Tages ist für dich bereit." },
  { title: "Zeit für die Kapsel 🌿", body: "Zieh heute und sieh, was die Maschine bereithält." },
  { title: "Die Maschine ruft 🎰", body: "Deine Kapsel läuft nicht weg — aber der Tag schon." },
];

export const STREAK_WARN_POOL = [
  { title: "{name}s Kapsel läuft ab! 🎲", body: "Noch 3 Stunden — dann ist sie weg für heute." },
  { title: "Nicht vergessen! 🎲", body: "Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht." },
  { title: "Fast zu spät, {name}! 🌙", body: "21 Uhr — in 3 Stunden ist der Tag vorbei." },
  { title: "Die Maschine wartet auf dich 🎲", body: "Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät." },
  { title: "{name}s Streak wackelt! 💎", body: "Noch 3 Stunden — dann ist der Streak in Gefahr." },
];

export async function showNotifPrompt() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

  try {
    if (window.localStorage.getItem(NOTIF_KEY) === 'dismissed') return;
  } catch {}

  // Attempt native permission request directly — fires the browser dialog immediately
  // on Firefox and iOS PWA (allowed without user gesture there).
  // Chrome silently ignores it and keeps permission at 'default', so we fall through
  // to the in-app banner as a fallback.
  let result = 'default';
  try { result = await Notification.requestPermission(); } catch (_) {}

  if (result === 'granted') {
    try { window.localStorage.setItem(NOTIF_KEY, 'granted'); } catch {}
    await registerServiceWorker();
    return;
  }
  if (result === 'denied') {
    try { window.localStorage.setItem(NOTIF_KEY, 'dismissed'); } catch {}
    return;
  }

  // 'default' → browser blocked silent request → show in-app banner.
  // It lives at the bottom of the Heute panel, well below the fold on a
  // phone, so on its own it isn't really "being asked". Float it above the
  // bottom nav instead — it's still dismissible, just impossible to miss.
  const card = document.querySelector('[data-ag-notif-card]');
  if (card) {
    card.hidden = false;
    card.removeAttribute('hidden');
    card.classList.add('is-floating');
  }
}

function nextNotificationTimestamp() {
  const tz = state.theme?.timezone || "Europe/Zurich";
  const timeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false
  }).format(new Date());
  const [h, m] = timeStr.split(":").map(Number);
  const minutesSinceMidnight = h * 60 + m;
  const targetMinutes = 8 * 60;
  const minutesUntil = minutesSinceMidnight < targetMinutes
    ? targetMinutes - minutesSinceMidnight
    : 24 * 60 - minutesSinceMidnight + targetMinutes;
  return Date.now() + minutesUntil * 60 * 1000;
}

export async function scheduleStreakWarning() {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.active) return;
    const tz = state.theme?.timezone || "Europe/Zurich";
    const token = getToken();
    const today = dateKeyInTimezone(tz);
    const alreadyPulled = readHistory().some((e) => e.token === token && e.day === today);
    if (alreadyPulled) {
      reg.active.postMessage({ type: "CANCEL_NOTIFICATION", tag: "ag-streak-warn" });
      return;
    }
    const { h, m } = hmInTimezone(tz);
    if (h >= 21) return;
    const msUntil21 = ((21 - h) * 60 - m) * 60 * 1000 - new Date().getSeconds() * 1000;
    const name = displayNameFromToken();
    const warnMsg = STREAK_WARN_POOL[dailyMsgIdx(STREAK_WARN_POOL)];
    reg.active.postMessage({
      type: "SCHEDULE_NOTIFICATION",
      tag: "ag-streak-warn",
      targetTime: Date.now() + Math.max(0, msUntil21),
      title: warnMsg.title.replace("{name}", name),
      body: warnMsg.body.replace("{name}", name)
    });
  } catch (_) {}
}

export async function scheduleNotification() {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const name = displayNameFromToken();
    const dailyMsg = DAILY_REMINDER_POOL[dailyMsgIdx(DAILY_REMINDER_POOL)];
    reg.active?.postMessage({
      type: "SCHEDULE_NOTIFICATION",
      tag: "ag-daily",
      targetTime: nextNotificationTimestamp(),
      title: dailyMsg.title.replace("{name}", name),
      body: dailyMsg.body.replace("{name}", name)
    });
    // Push quest notification if a new period just started and not yet solved
    if (state.quest?.enabled && isQuestAvailable()) {
      const qs = readQuestState();
      const lastNotifPeriod = (() => { try { return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1") || "-1", 10); } catch (_e) { return -1; } })();
      if (!qs.solved && lastNotifPeriod !== currentQuestPeriod(state)) {
        try { localStorage.setItem("affektions-gacha:quest-notif:v1", String(currentQuestPeriod(state))); } catch (_e) {}
        reg.active?.postMessage({
          type: "SCHEDULE_NOTIFICATION",
          targetTime: Date.now() + 500,
          title: state.quest.pushTitle || "Neue Foto-Aufgabe 📷",
          body: state.quest.pushBody || "Die Maschine hat eine neue Aufgabe für dich."
        });
      }
    }
  } catch (error) {
    /* ignore */
  }
}

export async function tryPeriodicSync() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!("periodicSync" in reg)) return;
    await reg.periodicSync.register("ag-daily-reminder", {
      minInterval: 20 * 60 * 60 * 1000
    });
  } catch (error) {
    /* Periodic Background Sync not supported — ignore */
  }
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    // Was urlFor("sw.js"). urlFor's third parameter is the resolver it calls,
    // and this was the only caller — passing one argument made it throw
    // "resolveBase is not a function" on every single load. The catch below
    // swallowed it, so the service worker never registered at all: no offline
    // shell, no daily reminder, no streak warning, no Web Push. Silently, for
    // as long as the offline support has existed.
    const swUrl = new URL("sw.js", resolveBase()).toString();
    if (new URL(swUrl).origin !== window.location.origin) return;
    await navigator.serviceWorker.register(swUrl, {
      scope: new URL("./", swUrl).pathname
    });
    if (Notification.permission === "granted") {
      await scheduleNotification();
      await scheduleStreakWarning();
      await tryPeriodicSync();
      await subscribeToPush();
    }
  } catch (error) {
    // Genuinely unsupported browsers land here too, so this stays non-fatal —
    // but it is no longer silent. The bug above hid for months behind a bare
    // comment.
    console.warn("[ag] service worker registration failed:", error && error.message);
  }
}

export async function enableNotifications() {
  const notifCard = $("[data-ag-notif-card]");
  if (!("Notification" in window)) {
    if (notifCard) notifCard.hidden = true;
    return;
  }
  const permission = await Notification.requestPermission();
  if (notifCard) notifCard.hidden = true;
  if (permission !== "granted") {
    try { window.localStorage.setItem(NOTIF_KEY, "dismissed"); } catch (error) { /* ignore */ }
    return;
  }
  try { window.localStorage.setItem(NOTIF_KEY, "granted"); } catch (error) { /* ignore */ }
  await registerServiceWorker();
}

// ── Real Web Push (opt-in, dormant until configured) ─────────────────────────
// Standard Web Push: PushManager.subscribe with a VAPID public key, then POST
// the subscription to the backend, which stores it per player. The service
// worker's own 'push' handler (sw.js) shows the notification. No Firebase SDK
// and no CDN dependency in the client or SW — the subscription.endpoint already
// routes to the right push service (FCM/Mozilla/Apple).
//
// Entirely gated on state.push.enabled, so with the shipped config
// (config/push.json → { "enabled": false }) this is a no-op. Full activation
// steps — including the one server-side piece Apps Script can't do natively
// (VAPID ES256 signing) — are in PUSH-SETUP.md.
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
  if (!cfg || !cfg.enabled || !cfg.vapidPublicKey) return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(cfg.vapidPublicKey),
      });
    }
    const endpoint = (state.backup && state.backup.endpointUrl) || "";
    if (!endpoint) return;
    const body = JSON.stringify({
      type: "push-subscribe",
      token: getToken(),
      subscription: sub.toJSON(),
    });
    const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
    fetch(endpoint, opts).catch(() =>
      fetch(endpoint, { ...opts, mode: "no-cors" }).catch(() => {}));
  } catch (error) {
    // Unsupported browsers and blocked permissions land here legitimately, so
    // this must not throw — but it is not silent. A push subscription that
    // quietly fails looks exactly like one that succeeded, and the reminders
    // simply never arrive with nothing anywhere to say why.
    console.warn("[ag] push subscription failed:", error && error.message);
  }
}
