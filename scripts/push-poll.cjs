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
const { requireEnv, fetchFeed, run, warn, AuthError } = require("./push-lib.cjs");

requireEnv(["VAPID_PUBLIC", "VAPID_PRIVATE", "BACKUP_ENDPOINT"]);
const { VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, BACKUP_ENDPOINT } = process.env;
webpush.setVapidDetails(VAPID_SUBJECT || "mailto:example@example.com", VAPID_PUBLIC, VAPID_PRIVATE);

const NAME = { lennart: "Lennart", fionn: "Fionn" };
const other = (t) => (t === "fionn" ? "lennart" : "fionn");

async function subsFor(token) {
  const data = await fetchFeed(
    `${BACKUP_ENDPOINT}?feed=push-subs&for=${encodeURIComponent(token)}`,
    { label: `push-subs(${token})` }
  );
  return (data && data.subscriptions) || [];
}

function messageFor(item) {
  const who = NAME[item.from] || "Jemand";
  if (item.type === "hug") return { title: "🫂 Ein Stups", body: `${who} denkt gerade an dich.` };
  return { title: "✨ Neuer Wunsch", body: `${who} hat einen Wunsch geschickt.` };
}

run(async () => {
  const data = await fetchFeed(`${BACKUP_ENDPOINT}?feed=push-pending`, { label: "push-pending" });
  const pending = (data && data.pending) || [];
  if (!pending.length) { console.log("Nothing pending."); return; }

  let sent = 0, gone = 0, failed = 0, authFailed = 0;
  for (const item of pending) {
    // The row may name a recipient; otherwise it implies "the other one".
    const recipient = NAME[item.to] ? item.to : other(item.from);
    const subs = await subsFor(recipient);
    if (!subs.length) continue;
    const { title, body } = messageFor(item);
    const payload = JSON.stringify({ title, body, url: `./?player=${recipient}` });
    for (const entry of subs) {
      try { await webpush.sendNotification(entry.subscription, payload); sent++; }
      catch (err) {
        const status = err && err.statusCode;
        // 404/410: the browser threw the subscription away (app deleted,
        // permission revoked). Expected, and nothing to do about it.
        if (status === 404 || status === 410) gone++;
        else {
          failed++;
          if (status === 401 || status === 403) authFailed++;
          console.error("send error:", status || (err && err.message));
        }
      }
    }
  }
  console.log(`Pending ${pending.length} → sent ${sent}, expired ${gone}, failed ${failed}.`);

  // A single push refused by one browser's endpoint is noise. Every single one
  // refused as unauthorised is a broken VAPID key, which no retry will fix and
  // which stops all notifications until someone rotates it — worth the mail.
  if (failed && authFailed === failed && sent === 0) {
    throw new AuthError(`all ${failed} sends rejected as unauthorised — check VAPID_PUBLIC/VAPID_PRIVATE`);
  }
  if (failed) warn(`${failed} push send(s) failed; see log above.`);
});
