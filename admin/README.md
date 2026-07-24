# Fionn Admin App

A standalone curator app for the Affektions-Gacha, separate from Lennart's page.
Lives at **`/fionn.html`** (e.g. `https://fionnf.github.io/Affections-gatcha/fionn.html`).

What it does:
- **Outcomes** — browse categories, edit/add/delete gacha outcomes, tweak
  category weight/label/tone, with live odds. Commits `config/outcomes.json`.
- **Tage** — edit/add/delete special days (date, label, tone, colors,
  unlock time, photo, confetti, PINs, outcomes). Commits `config/special-days.json`.
- **Eingänge** — a feed of what Lennart sends back (hugs 🫂, wishes, prompt
  answers, quest solves).
- **Notifications** — local push when Lennart sends a hug/wish while the app is
  open or installed as a PWA. Email stays the guaranteed channel.

Edits are committed straight to GitHub via the Contents API and go live in ~1 min.

## Setup (one-time)

### 1. Set the PIN
The page is gated by a PIN. Generate a hash and paste it into `config/admin.json`:

```bash
node scripts/hash-admin-pin.cjs <your-pin>
# → prints { "salt": "...", "pinHash": "..." }
```

Put `salt` and `pinHash` into `config/admin.json`. **Do not commit the PIN itself.**
(The default shipped PIN is a placeholder — change it.)

### 2. Create a GitHub token
Create a **fine-grained personal access token** scoped to this repo with
**Contents: Read and write**. Open `fionn.html` → **Einstellungen** → paste the
token → *Token speichern & prüfen*. It's stored only in that browser.

### 3. Enable the inbox feed (optional, for Eingänge + notifications)
The feed reads from the existing Google Apps Script backend. Re-deploy the
updated `scripts/backup-apps-script.js` (its `doGet` now returns an `activity`
array when called with `?feed=activity`). No new spreadsheet or secret needed.

### 4. Notifications (optional)
**Einstellungen → Benachrichtigungen aktivieren.** Best results when the page is
installed as a PWA (Add to Home Screen). Background polling uses periodic sync
(Chrome/installed-PWA only, throttled); the reliable path is a poll whenever you
open the app. iOS does not background-poll — email remains the alert channel.

## Build

`npm run build` builds both bundles:
- `dist/affection-gacha.js` (Lennart app, unchanged)
- `dist/fionn-admin.js` (this app)

Or just this one: `npm run build:admin`.

## Files
- `fionn.html`, `manifest-fionn.json`, `sw-fionn.js` — shell, PWA manifest, worker
- `admin/*.js` — app source (entry `admin/main.js`)
- `config/admin.json` — PIN hash + repo + poll interval
- `vite.config.admin.js` — build config for this bundle
