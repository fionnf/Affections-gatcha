// Affektions-Gacha service worker
// Handles scheduled push notifications and periodic sync.
// Supports multiple concurrent named timers via a tag field.

const scheduledTimers = {};

// ── Message handler ─────────────────────────────────────────────────────────
// SCHEDULE_NOTIFICATION: { type, targetTime, title, body, tag? }
// CANCEL_NOTIFICATION:   { type, tag? }
// SHOW_NOTIFICATION:     { type, title, body, tag? } — fire now, no timer
//
// A word on SCHEDULE_NOTIFICATION: the browser terminates an idle service
// worker after ~30 seconds and its timers die with it, so a target hours away
// is a hope, not a schedule. It survives only if the worker happens to stay
// alive, which in practice means the app is open — exactly when a reminder is
// least useful. The daily reminder and the evening streak warning are
// therefore sent server-side as real Web Push (scripts/push-due.cjs), and
// these timers are kept only as a free best-effort on top.

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

  // Fire now, no timer. Used by Fionn's Eingänge poll when a hug or wish
  // comes in while the app is open.
  if (type === "SHOW_NOTIFICATION") {
    event.waitUntil(fireNotification(title, body, tag));
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
  // Fionn's Eingänge poll: wake any open client and let it do the fetching,
  // since the feed logic and its last-seen bookkeeping live in the page.
  if (event.tag === "fionn-inbox-poll") {
    event.waitUntil((async () => {
      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clients) client.postMessage({ type: "POLL_INBOX" });
    })());
    return;
  }
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

// ── Real Web Push ─────────────────────────────────────────────────────────────
// Fires for a server-sent push while the app is fully closed (the piece local
// SW-timer notifications can never do). Dormant unless config/push.json is
// enabled and a sender is wired up — see PUSH-SETUP.md. Payload is JSON
// { title, body, url? }; a payloadless push still shows a gentle default.
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_e) {
    try { data = { body: event.data.text() }; } catch (_e2) { data = {}; }
  }
  const title = data.title || "Affektions-Gacha 🎲";
  const body = data.body || "Es gibt etwas Neues für dich.";
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "./media/icon-192.png",
      badge: "./media/icon-96.png",
      tag: data.tag || "ag-push",
      renotify: true,
      data: { url: data.url || "./" },
    })
  );
});

// If the browser rotates the subscription, tell any open client to re-register
// it (subscribeToPush runs on next open regardless, this just speeds it up).
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((c) => c.postMessage({ type: "PUSH_RESUBSCRIBE" }));
    })
  );
});

// ── Notification click ───────────────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
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

// ── Offline app shell ────────────────────────────────────────────────────────
// Network-first with cache fallback for same-origin GETs: online behaviour is
// identical to no service worker at all (every request hits the network and
// refreshes the cache), but an offline open still gets the last-seen shell,
// bundle and config — the day's pull is computed locally and deterministically,
// so the app genuinely works in airplane mode. Cross-origin requests (Apps
// Script, Google Photos) are never touched.
const SHELL_CACHE = "ag-shell-v1";

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        // Ignore the query string for bundles (?v= cache-bust) and navigations
        // (?player=/... identity params) — offline, the last-seen copy wins.
        const cached = await caches.match(req, { ignoreSearch: url.pathname.endsWith(".js") || req.mode === "navigate" });
        if (cached) return cached;
        // Navigations fall back to a cached entry page so a cold offline open
        // still boots instead of showing the browser error page — and only to
        // the page that was asked for: fionn-gacha.html is the Eingänge, not
        // the gacha, so neither may stand in for the other.
        if (req.mode === "navigate") {
          const shell = shellFor(url.pathname);
          if (shell) {
            const cached = await caches.match(shell, { ignoreSearch: true });
            if (cached) return cached;
          }
        }
        return Response.error();
      })
  );
});

// Which cached shell may stand in for a navigation. Anything not listed
// (lichter.html, media-preview.html) gets no substitute: showing the gacha in
// place of a different page is worse than an honest offline error.
function shellFor(pathname) {
  if (/fionn(-gacha)?\.html$/.test(pathname)) return "./fionn-gacha.html";
  if (/(^|\/)(index\.html)?$/.test(pathname)) return "./index.html";
  return null;
}

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(
  (async () => {
    // Drop caches from older shell versions, then take over open clients.
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n !== SHELL_CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })()
));
