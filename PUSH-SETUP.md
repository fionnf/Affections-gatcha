# Real Web Push — finishing setup

The whole pipeline is now wired and the app side is **live** (a public VAPID
key is in `config/push.json`, `enabled: true`; devices subscribe on load). Three
small steps remain — all on your side, because they involve secrets and a
redeploy that can't be done from the repo:

```
[phone] subscribe ─► Apps Script sheet ─► [GitHub Action every ~5 min: push-poll.cjs] ─► push service ─► [phone, app closed]
```

## Step 1 — Redeploy the Apps Script

`scripts/backup-apps-script.js` gained: `push-subscribe` (stores device
subscriptions), `?feed=push-subs` (sender reads them), and `?feed=push-pending`
(returns un-pushed hugs/wishes and advances a pointer). Paste the file into the
Apps Script editor and redeploy the web app to the **same URL**.

## Step 2 — Add the secrets & turn the job on

In the GitHub repo → Settings → Secrets and variables → Actions:

**Secrets:**
- `VAPID_PRIVATE` — the private key printed by `node scripts/gen-vapid-keys.cjs`
  (the one already used here — I'll hand it to you; never commit it).
- `VAPID_PUBLIC` — must match `config/push.json`'s `vapidPublicKey`.
- `VAPID_SUBJECT` — `mailto:your-email`.
- `BACKUP_ENDPOINT` — the Apps Script `…/exec` URL.

**Variable** (not a secret): `PUSH_ENABLED` = `true` — this gates the workflow.

The `Push notifications` workflow then runs every ~5 min, sends a push to the
*other* player for each new hug/wish, and email keeps working as the guaranteed
channel. (Regenerate keys anytime with `node scripts/gen-vapid-keys.cjs` — put
the new public key in `config/push.json` and the private one in the secret.)

## Step 3 — Grant on each phone

Open the app, allow notifications. On the next load the device subscribes
itself. **iOS:** the app must be **installed to the home screen** first (the
existing install nudge covers this) — Safari tabs can't receive push.

## Notes

- Cron is best-effort; GitHub often delays it 5–15 min, so pushes aren't
  instant. For instant delivery, point Apps Script's hug handler at a tiny
  always-on signer (Cloudflare Worker running `web-push`) instead of polling —
  everything server-side is already in place for that.
- Expired subscriptions (410/404) are logged and self-heal: the device
  re-subscribes next time the app opens.
- Local reminders (daily 08:00, streak warning 21:00) already work through the
  service worker independently of any of this.
