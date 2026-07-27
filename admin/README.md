# Fionn: Eingänge

A small PIN-gated panel that rides along on Fionn's page
(**`/fionn-gacha.html`**) as an extra 📥 tab.

What it does:
- **Eingänge** — a feed of what Lennart sends back (hugs 🫂, wishes, prompt
  answers, quest solves, Kapsel-Reaktionen).
- **Notifications** — local notification when a hug/wish arrives while the app
  is open or installed as a PWA. Email stays the guaranteed channel.

## What used to be here

This started as a curator app with **Outcomes** and **Tage** editors that
committed `config/outcomes.json` and `config/special-days.json` straight to
GitHub via the Contents API, using a fine-grained token pasted into the
browser. All of that is gone:

- Outcomes for Fionn are written by **Lennart**, in the Kapsel-Werkstatt
  (`src/werkstatt.js`) — a button at the bottom of his Heute tab. Those
  capsules go through the Apps Script sheet, so no token and no commit.
- Everything else in `config/` Fionn edits on GitHub directly.

No write credential is stored on the device any more.

## Setup (one-time)

### 1. Set the PIN
The panel is gated by a PIN. Generate a hash and paste it into
`config/admin.json`:

```bash
node scripts/hash-admin-pin.cjs <your-pin>
# → prints { "salt": "...", "pinHash": "..." }
```

Put `salt` and `pinHash` into `config/admin.json`. **Do not commit the PIN
itself.** (The default shipped PIN is a placeholder — change it.)

### 2. Enable the feed
The feed reads from the existing Google Apps Script backend. Re-deploy
`scripts/backup-apps-script.js` — its `doGet` returns an `activity` array when
called with `?feed=activity`. No new spreadsheet or secret needed.

### 3. Notifications
The 🔔 button at the top of the feed asks for permission. Best results when the
page is installed as a PWA (Add to Home Screen). Background polling uses
periodic sync (Chrome/installed-PWA only, throttled); the reliable path is a
poll whenever you open the app. iOS does not background-poll — email remains
the alert channel.

## Build

`npm run build` builds both bundles:
- `dist/affection-gacha.js` (the gacha app itself)
- `dist/fionn-admin.js` (this panel)

Or just this one: `npm run build:admin`.

## Files
- `fionn-gacha.html`, `manifest-fionn.json`, `sw-fionn.js` — shell, PWA manifest, worker
- `fionn.html` — redirect kept for old bookmarks and installed PWAs
- `admin/*.js` — source (entry `admin/main.js`)
- `config/admin.json` — PIN hash + poll interval
- `vite.config.admin.js` — build config for this bundle
