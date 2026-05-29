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
self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "ag-daily-reminder") return;
  event.waitUntil((async () => {
    const zurichHour = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Zurich",
        hour: "numeric",
        hour12: false
      }).format(new Date())
    );
    if (zurichHour >= 7 && zurichHour < 9) {
      await fireNotification(
        "Kapsel des Tages 🎲",
        "Die tägliche Kapsel wartet — heute noch nicht gezogen?",
        "ag-daily"
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
