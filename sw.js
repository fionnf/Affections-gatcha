// Affektions-Gacha service worker
// Handles scheduled push notifications and periodic sync.
// Supports multiple concurrent named timers via a tag field.

const scheduledTimers = {};

// ── Message handler ─────────────────────────────────────────────────────────
// SCHEDULE_NOTIFICATION: { type, targetTime, title, body, tag? }
// CANCEL_NOTIFICATION:   { type, tag? }

self.addEventListener("message", (event) => {
  if (!event.data) return;
  const { type, targetTime, title, body, tag = "default" } = event.data;

  if (type === "SCHEDULE_NOTIFICATION") {
    if (scheduledTimers[tag]) {
      clearTimeout(scheduledTimers[tag]);
      delete scheduledTimers[tag];
    }
    const delay = Math.max(0, targetTime - Date.now());
    scheduledTimers[tag] = setTimeout(() => {
      delete scheduledTimers[tag];
      fireNotification(title, body, tag);
    }, delay);
  }

  if (type === "CANCEL_NOTIFICATION") {
    if (scheduledTimers[tag]) {
      clearTimeout(scheduledTimers[tag]);
      delete scheduledTimers[tag];
    }
  }
});

// ── Periodic Background Sync ────────────────────────────────────────────────
const DAILY_SYNC_POOL = [
  { title: "Kapsel des Tages 🎲", body: "Die tägliche Kapsel wartet — heute noch nicht gezogen?" },
  { title: "Guten Morgen 🌿", body: "Deine tägliche Kapsel ist bereit." },
  { title: "Die Maschine dreht sich 🎲", body: "Heute noch keine Kapsel — auf geht's!" },
  { title: "Heute wartet etwas ✨", body: "Die Kapsel des Tages ist für dich bereit." },
  { title: "Tägliche Kapsel bereit 🌿", body: "Eine neue Kapsel wartet. Zieh sie noch heute." },
];

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "ag-daily-reminder") return;
  event.waitUntil((async () => {
    const now = new Date();
    const zurichHour = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Zurich",
        hour: "numeric",
        hour12: false
      }).format(now)
    );
    if (zurichHour >= 7 && zurichHour < 9) {
      const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
      const msg = DAILY_SYNC_POOL[doy % DAILY_SYNC_POOL.length];
      await fireNotification(msg.title, msg.body, "ag-daily");
    }
  })());
});

// ── Notification click ───────────────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});

// ── Helper ──────────────────────────────────────────────────────────────────

async function fireNotification(title, body, notifTag = "ag-daily") {
  if (self.registration.showNotification) {
    await self.registration.showNotification(title, {
      body,
      icon: "./media/icon-192.png",
      badge: "./media/icon-96.png",
      tag: notifTag,
      renotify: true,
      silent: true
    });
  }
}

// Minimal install/activate — no caching needed (assets are served from GitHub Pages).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
