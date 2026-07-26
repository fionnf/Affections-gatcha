#!/usr/bin/env node
// Notifier job: ask the backend for hugs/wishes that haven't been pushed yet
// (the backend advances its own pointer, so no state is kept here), then push
// each one to the OTHER player's devices via Web Push. Meant to run on a
// schedule from GitHub Actions. Apps Script can't sign VAPID (ES256), so the
// actual send happens here with the `web-push` library.
//
//   npm install web-push
//   VAPID_PUBLIC=… VAPID_PRIVATE=… VAPID_SUBJECT=mailto:you@x \
//   BACKUP_ENDPOINT=https://script.google.com/…/exec \
//   node scripts/push-poll.cjs
const webpush = require("web-push");

const { VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, BACKUP_ENDPOINT } = process.env;
if (!VAPID_PUBLIC || !VAPID_PRIVATE || !BACKUP_ENDPOINT) {
  console.error("Missing env: VAPID_PUBLIC, VAPID_PRIVATE, BACKUP_ENDPOINT.");
  process.exit(1);
}
webpush.setVapidDetails(VAPID_SUBJECT || "mailto:example@example.com", VAPID_PUBLIC, VAPID_PRIVATE);

const NAME = { lennart: "Lennart", fionn: "Fionn" };
const other = (t) => (t === "fionn" ? "lennart" : "fionn");

async function subsFor(token) {
  const res = await fetch(`${BACKUP_ENDPOINT}?feed=push-subs&for=${encodeURIComponent(token)}`, { cache: "no-store" });
  const data = await res.json();
  return (data && data.subscriptions) || [];
}

function messageFor(item) {
  const who = NAME[item.from] || "Jemand";
  if (item.type === "hug") return { title: "🫂 Ein Stups", body: `${who} denkt gerade an dich.` };
  if (item.type === "reaction") {
    return { title: `${item.text || "💛"} von ${who}`, body: `${who} hat auf deine Kapsel reagiert.` };
  }
  return { title: "✨ Neuer Wunsch", body: `${who} hat einen Wunsch geschickt.` };
}

(async () => {
  const res = await fetch(`${BACKUP_ENDPOINT}?feed=push-pending`, { cache: "no-store" });
  const data = await res.json();
  const pending = (data && data.pending) || [];
  if (!pending.length) { console.log("Nothing pending."); return; }

  let sent = 0, gone = 0, failed = 0;
  for (const item of pending) {
    // Reactions carry an explicit recipient; hugs/wishes imply "the other one".
    const recipient = NAME[item.to] ? item.to : other(item.from);
    const subs = await subsFor(recipient);
    if (!subs.length) continue;
    const { title, body } = messageFor(item);
    const payload = JSON.stringify({ title, body, url: `./?player=${recipient}` });
    for (const entry of subs) {
      try { await webpush.sendNotification(entry.subscription, payload); sent++; }
      catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) gone++;
        else { failed++; console.error("send error:", err && err.statusCode); }
      }
    }
  }
  console.log(`Pending ${pending.length} → sent ${sent}, expired ${gone}, failed ${failed}.`);
})().catch((e) => { console.error(e); process.exit(1); });
