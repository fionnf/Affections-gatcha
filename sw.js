// Affektions-Gacha service worker
// Handles scheduled daily 8 AM push notifications and periodic sync.

const CACHE_NAME = "ag-sw-v1";
let scheduledTimer = null;

// ── Message handler ─────────────────────────────────────────────────────────
// The main page posts { type: "SCHEDULE_NOTIFICATION", targetTime, title, body }
// after the user grants permission.  We cancel any previous timer and set a
// new one for targetTime (ms since epoch).

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "SCHEDULE_NOTIFICATION") return;
  const { targetTime, title, body } = event.data;
  if (scheduledTimer !== null) {
    clearTimeout(scheduledTimer);
    scheduledTimer = null;
  }
  const delay = Math.max(0, targetTime - Date.now());
  scheduledTimer = setTimeout(() => {
    scheduledTimer = null;
    fireNotification(title, body);
  }, delay);
});

// ── Periodic Background Sync ────────────────────────────────────────────────
// Fires when the browser wakes the SW on the "ag-daily-reminder" tag (Chrome
// only, requires permission).  We fire a notification if it looks like morning
// in local time (between 07:45 and 09:00 as a rough guard against duplicate
// firings at odd hours).

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "ag-daily-reminder") return;
  event.waitUntil((async () => {
    const h = new Date().getHours();
    if (h >= 7 && h < 9) {
      await fireNotification(
        "Kapsel des Tages 🎲",
        "Die tägliche Kapsel wartet — heute noch nicht gezogen?"
      );
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

async function fireNotification(title, body) {
  if (self.registration.showNotification) {
    await self.registration.showNotification(title, {
      body,
      icon: "./media/icon-192.png",
      badge: "./media/icon-96.png",
      tag: "ag-daily",
      renotify: true,
      silent: true
    });
  }
}

// Minimal install/activate — no caching needed (assets are served from GitHub Pages).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
