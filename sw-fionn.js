// Fionn admin service worker
// Separate file/scope from sw.js so the two PWAs never collide.
// Handles local scheduled notifications and a periodic inbox-poll hook.

const scheduledTimers = {};

// ── Message handler ─────────────────────────────────────────────────────────
// SHOW_NOTIFICATION:     { type, title, body, tag? }  — fire immediately
// SCHEDULE_NOTIFICATION: { type, targetTime, title, body, tag? }
// CANCEL_NOTIFICATION:   { type, tag? }
self.addEventListener("message", (event) => {
  if (!event.data) return;
  const { type, targetTime, title, body, tag = "fionn-default" } = event.data;

  if (type === "SHOW_NOTIFICATION") {
    event.waitUntil(fireNotification(title, body, tag));
    return;
  }

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
// The page registers a "fionn-inbox-poll" periodicsync. When it fires we ask any
// open client to do the actual fetch (it holds the endpoint + last-seen state).
// If no client is open we can't poll (no credentials here) — email remains the
// guaranteed channel. Chrome-only, throttled, requires installed PWA.
self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "fionn-inbox-poll") return;
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      client.postMessage({ type: "POLL_INBOX" });
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
      if (self.clients.openWindow) return self.clients.openWindow("./fionn-gacha.html");
    })
  );
});

// ── Helper ──────────────────────────────────────────────────────────────────
async function fireNotification(title, body, notifTag = "fionn-inbox") {
  if (self.registration.showNotification) {
    await self.registration.showNotification(title || "Affektions-Gacha · Fionn", {
      body: body || "",
      icon: "./media/icon-192.png",
      badge: "./media/icon-192.png",
      tag: notifTag,
      renotify: true
    });
  }
}

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
