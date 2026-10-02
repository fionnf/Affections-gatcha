# Fionn: Eingänge

Fionn's side of the machine: a small PIN-gated page at **`/fionn-gacha.html`**
(the file name is historical — it was his gacha once, and the installed
home-screen app still points there).

What it does:
- **Eingänge** — a feed of what Lennart sends back: hugs 🫂, wishes ✨,
  reactions, prompt answers and redeemed vouchers.
- **Reply on a wish** — *✓ erfüllt*, *🕰 irgendwann* or *✗ lieber nicht*. The
  choice is stored on the wish row in the sheet and shows up on Lennart's next
  capsule as one quiet line.
- **Stups** — a 👋 that appears as a banner on Lennart's next open.
- **Notifications** — local notification when a hug/wish arrives while the
  page is open or installed as a PWA. Email stays the guaranteed channel.

## What used to be here

This started as a curator app with **Outcomes** and **Tage** editors that
committed `config/outcomes.json` and `config/special-days.json` straight to
GitHub via the Contents API, using a fine-grained token pasted into the
browser. Then it rode along as a tab inside a second gacha app for Fionn,
whose capsules Lennart wrote in a Werkstatt. All of that is gone: config is
edited on GitHub, there is one player, and no write credential is stored on
the device.

## Setup (one-time)

### 1. Set the PIN
The page is gated by a PIN. Generate a hash and paste it into
`config/admin.json`:

```bash
node scripts/hash-admin-pin.cjs <your-pin>
# → prints { "salt": "...", "pinHash": "..." }
```

Put `salt` and `pinHash` into `config/admin.json`. **Do not commit the PIN
itself.** (The default shipped PIN is a placeholder — change it.)

### 2. The backend
Everything here talks to the Apps Script in `scripts/backup-apps-script.js`
through `config/backup.json`: `?feed=activity` for the feed, `wish-status` to
reply on a wish, `ping` for a Stups. Redeploy the script after pulling a change
to it (Deploy → Manage deployments → ✏️ → New version).

### 3. Notifications
The 🔔 button at the top of the feed asks for permission, and with it the page
subscribes to **Web Push** under the token `fionn` (same VAPID key as the
gacha, `config/push.json`; same service worker). From then on a Notfall-Umarmung
or a wish from Lennart arrives on this phone as a push within five minutes,
sent by the `notify` job in `push-notify.yml`, whether the page is open or not
(on iOS the page has to be installed to the home screen for push). The
foreground poll stays as the instant path while the page is open, and email
stays the guaranteed one.

## Build

`npm run build` builds both bundles:
- `dist/affection-gacha.js` (the gacha app itself)
- `dist/fionn-admin.js` (this page)

Or just this one: `npm run build:admin`.

## Files
- `fionn-gacha.html`, `manifest-fionn.json` — shell and PWA manifest
- The app's own `sw.js` serves this page too; there is no separate worker
- `fionn.html` — redirect kept for old bookmarks and installed PWAs
- `admin/*.js` — source (entry `admin/main.js`)
- `config/admin.json` — PIN hash + poll interval
- `vite.config.admin.js` — build config for this bundle
