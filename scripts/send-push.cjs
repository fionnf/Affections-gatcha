#!/usr/bin/env node
// Web Push sender — the one piece that can't live in Apps Script (VAPID needs
// ES256 signing, which Apps Script's Utilities can't do). Run it from anywhere
// with Node: a GitHub Action, a cron box, or by hand.
//
//   npm install web-push          # one-off, not a repo dependency
//   VAPID_PRIVATE=… VAPID_PUBLIC=… VAPID_SUBJECT=mailto:you@x \
//   BACKUP_ENDPOINT=https://script.google.com/…/exec \
//   node scripts/send-push.cjs fionn "🫂 Ein Stups" "Lennart denkt an dich" "./?player=fionn"
//
// Args: <recipientToken> <title> <body> [clickUrl]
// Reads that recipient's stored subscriptions from the backend's
// ?feed=push-subs and pushes the notification to each device. Prunes are
// left to the next subscribe (410/404 just logged). See PUSH-SETUP.md.
const webpush = require("web-push");

const [, , recipient, title, body, clickUrl] = process.argv;
if (!recipient || !title || !body) {
  console.error("usage: node scripts/send-push.cjs <token> <title> <body> [clickUrl]");
  process.exit(1);
}

const { VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, BACKUP_ENDPOINT } = process.env;
if (!VAPID_PUBLIC || !VAPID_PRIVATE || !BACKUP_ENDPOINT) {
  console.error("Missing env: VAPID_PUBLIC, VAPID_PRIVATE, BACKUP_ENDPOINT (and ideally VAPID_SUBJECT).");
  process.exit(1);
}

webpush.setVapidDetails(VAPID_SUBJECT || "mailto:example@example.com", VAPID_PUBLIC, VAPID_PRIVATE);

(async () => {
  const url = `${BACKUP_ENDPOINT}?feed=push-subs&for=${encodeURIComponent(recipient)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const subs = (data && data.subscriptions) || [];
  if (!subs.length) { console.log(`No subscriptions for ${recipient}.`); return; }

  const payload = JSON.stringify({ title, body, url: clickUrl || "./" });
  let ok = 0, gone = 0, failed = 0;
  for (const entry of subs) {
    try {
      await webpush.sendNotification(entry.subscription, payload);
      ok++;
    } catch (err) {
      if (err && (err.statusCode === 404 || err.statusCode === 410)) { gone++; }
      else { failed++; console.error("send error:", err && err.statusCode, err && err.body); }
    }
  }
  console.log(`Sent ${ok}, expired ${gone}, failed ${failed} for ${recipient}.`);
})().catch((e) => { console.error(e); process.exit(1); });
