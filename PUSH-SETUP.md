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

It also gained `getOrCreateStimmungSheet_`, which was referenced twice and
never defined — the shared colour of the day has been silently broken until
this redeploy, reading back `null` and throwing on write.

## Step 2 — Add the secrets & turn the job on

In the GitHub repo → Settings → Secrets and variables → Actions:

**Secrets:**
- `VAPID_PRIVATE` — the private key printed by `node scripts/gen-vapid-keys.cjs`
  (the one already used here — I'll hand it to you; never commit it).
- `VAPID_PUBLIC` — must match `config/push.json`'s `vapidPublicKey`.
- `VAPID_SUBJECT` — `mailto:your-email`.
- `BACKUP_ENDPOINT` — the Apps Script `…/exec` URL.
- `BACKUP_ADMIN_KEY` — the same passphrase as the Script Property
  `ADMIN_KEY` (see the README, *Fionn's Eingänge*). Optional until that
  property is set; once it is, the push feeds refuse requests without it and
  the jobs fail loudly saying so.

**Variable** (not a secret): `PUSH_ENABLED` = `true` — this gates the workflow.

The `Push notifications` workflow then runs two jobs: every ~5 min it sends a
push for each new wish to the *other* player and for each Notfall-Umarmung to
*every* subscribed device, and hourly it sends the morning reminder and the
evening streak warning to whoever hasn't drawn yet. Email stays the
guaranteed channel for wishes; a hug is push only. (Regenerate keys anytime with `node scripts/gen-vapid-keys.cjs` — put
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
- Expired subscriptions (410/404) are removed from the sheet by the job that
  hit them; the device re-subscribes next time the app opens.
- **Nothing is marked sent until it was sent.** The jobs read the pending
  hugs/wishes and due reminders with `mode=ack` and confirm afterwards
  (`push-ack`, `push-due-ack`). A run that dies halfway resends the rest on
  the next run instead of dropping it. The pointer follows the server's own
  receive time (column I of `Wünsche`), so a wish retried hours after it was
  written is still pushed, and a phone with its clock set ahead cannot push
  the pointer into the future.
- **A failing run does not always mean something is wrong.** Apps Script
  intermittently answers a GET with an HTML error page; the jobs retry three
  times, then warn and finish green rather than mailing you about a blip they
  cannot fix. They exit non-zero — and so mail — only for a missing secret, or
  for every push being rejected 401/403 with nothing delivered, which means the
  VAPID key is dead. See the table in the README's Notifications section.
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

## Deploying the Apps Script from GitHub

`.github/workflows/deploy-apps-script.yml` pushes `scripts/backup-apps-script.js`
(and the wish-inbox script) to their Google projects whenever they change on
`master`, and moves the existing web-app deployment onto the new code — the
`/exec` URL stays the same. One-time setup:

1. Turn on the Apps Script API for your Google account:
   <https://script.google.com/home/usersettings> → *Google Apps Script API* → On.
2. On your computer: `npx @google/clasp@3.4.1 login`. It opens the browser,
   then writes `~/.clasprc.json`. Paste that file's whole content into the
   GitHub secret `CLASPRC_JSON`. It is a login to your Google account — keep
   it in the secret only, never in the repo.
3. In the Apps Script editor: *Project Settings* → copy the **Script ID** into
   `GAS_BACKUP_SCRIPT_ID`; *Deploy → Manage deployments* → copy the active web
   app's **Deployment ID** into `GAS_BACKUP_DEPLOYMENT_ID`. Same for the
   wish-inbox project (`GAS_WISH_SCRIPT_ID`, `GAS_WISH_DEPLOYMENT_ID`) if it is
   still deployed separately.
4. *Actions → Deploy Apps Script → Run workflow* once to check it.

The project ends up holding exactly the repo file; its manifest is read back
and kept. Script Properties (`ADMIN_KEY`, the push pointer) live outside the
code and are untouched. A new scope (the first time the weekly snapshot needs
Drive) still needs one manual run of `installSnapshotTrigger` in the editor to
grant it.

