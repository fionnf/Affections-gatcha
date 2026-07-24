# Real Web Push — setup

The app already contains the whole **device side** of Web Push: it subscribes,
stores the subscription, and the service worker shows a notification when one
arrives while the app is fully closed. It ships **disabled**
(`config/push.json` → `"enabled": false`) and does nothing until you complete
the steps below.

Web Push (unlike the app's existing local notifications) can reach a phone with
the app closed — but it needs one thing the Google Apps Script backend can't
provide: **VAPID request signing (ES256)**. So the *sender* runs as a tiny Node
job (the `web-push` library) somewhere you control — a GitHub Action is the
easiest. No Firebase project required.

```
[phone] subscribe ──► Apps Script sheet ──► [Node sender: web-push] ──► push service ──► [phone, app closed]
```

## 1. Generate a VAPID key pair

```bash
node scripts/gen-vapid-keys.cjs
```

- **Public key** → paste into `config/push.json` as `vapidPublicKey`, set
  `"enabled": true`, commit. (Public — safe to commit.)
- **Private key** → keep OUT of the repo. It goes only in the sender's secrets.

## 2. Deploy the updated Apps Script

`scripts/backup-apps-script.js` now handles `type: "push-subscribe"` (stores
subscriptions in a new **PushSubscriptions** sheet) and serves them back to the
sender at `?feed=push-subs`. Paste the file into the Apps Script editor and
redeploy the web app (same URL).

## 3. Turn it on for a device

With `config/push.json` enabled and live, open the app on the phone and grant
notifications. On the next load `subscribeToPush()` registers the device and
POSTs its subscription to the sheet. (iOS: the app must be **installed to the
home screen** first — the existing install nudge covers this.)

## 4. Send a push

By hand, to test:

```bash
npm install web-push
VAPID_PUBLIC=…  VAPID_PRIVATE=…  VAPID_SUBJECT=mailto:you@example.com \
BACKUP_ENDPOINT=https://script.google.com/macros/s/…/exec \
node scripts/send-push.cjs fionn "🫂 Ein Stups" "Lennart denkt an dich" "./?player=fionn"
```

To make it automatic (e.g. push Fionn when Lennart taps a hug), add a scheduled
**GitHub Action** that polls the activity feed (`?feed=activity`), diffs against
the last-seen timestamp it stored, and calls `send-push.cjs` for anything new.
Put `VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT`, and `BACKUP_ENDPOINT` in
the repo's Actions **secrets** — never in the tree.

## Notes

- **Email stays the guaranteed channel.** Push is best-effort; a phone that's
  been offline for days may miss one.
- Expired subscriptions (HTTP 410/404) are just logged; the device re-subscribes
  itself the next time the app opens, so the sheet self-heals.
- Everything here is inert while `config/push.json` is disabled — shipping this
  changed nothing about the live app until you do step 1–3.
