# Real Web Push — finishing setup

The whole pipeline is now wired and the app side is **live** (a public VAPID
key is in `config/push.json`, `enabled: true`; devices subscribe on load). Three
small steps remain — all on your side, because they involve secrets and a
redeploy that can't be done from the repo:

```
[phone] subscribe ─► Apps Script sheet ─┬─ every ~5 min: push-poll.cjs ─┐
                                        │   hugs and wishes            ├─► push service ─► [phone, app closed]
                                        └─ hourly: push-due.cjs ───────┘
                                            daily reminder + streak warning
```

## Step 1 — Redeploy the Apps Script

`scripts/backup-apps-script.js` gained: `push-subscribe` (stores device
subscriptions), `?feed=push-subs` (sender reads them), `?feed=push-pending`
(returns un-pushed hugs/wishes and advances a pointer), and `?feed=push-due`
(returns who still hasn't pulled today, inside the Zurich morning/evening
window, once per player per day). Paste the file into the Apps Script editor
and redeploy the web app to the **same URL**.

## Step 2 — Add the secrets & turn the job on

In the GitHub repo → Settings → Secrets and variables → Actions:

**Secrets:**
- `VAPID_PRIVATE` — the private key printed by `node scripts/gen-vapid-keys.cjs`
  (the one already used here — I'll hand it to you; never commit it).
- `VAPID_PUBLIC` — must match `config/push.json`'s `vapidPublicKey`.
- `VAPID_SUBJECT` — `mailto:your-email`.
- `BACKUP_ENDPOINT` — the Apps Script `…/exec` URL.

**Variable** (not a secret): `PUSH_ENABLED` = `true` — this gates the workflow.

The `Push notifications` workflow then runs two jobs: every ~5 min it sends a
push to the *other* player for each new hug/wish, and hourly it sends the
morning reminder and the evening streak warning to whoever hasn't drawn yet.
Email keeps working as the guaranteed channel for hugs and wishes. (Regenerate keys anytime with `node scripts/gen-vapid-keys.cjs` — put
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
- **The daily reminder and streak warning depend on this pipeline.** They were
  previously scheduled in the browser with `setTimeout` inside the service
  worker, which the browser terminates after ~30 seconds idle — so a timer set
  for 08:00 tomorrow died long before it fired, and the reminders only ever
  appeared when the app was already open. The client timers are still there as
  a free best-effort, but until `PUSH_ENABLED` is on, no reminder reaches a
  closed phone.
- Two windows, checked server-side in `Europe/Zurich` so DST needs no
  attention: **07:00–10:00** for the morning nudge, **20:00–23:00** for the
  streak warning. Each fires at most once per player per day, so a cron that
  GitHub delays — or runs twice — can't double-send.
