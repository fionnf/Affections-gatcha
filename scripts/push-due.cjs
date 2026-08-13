#!/usr/bin/env node
// Sends the daily reminder and the evening streak warning as real Web Push.
//
// These used to be scheduled client-side with setTimeout inside the service
// worker. A worker is killed after ~30 seconds idle, so a timer set for 08:00
// tomorrow died long before it fired — the reminders only ever showed up if
// the app was already open. This runs on a schedule instead, so it reaches a
// closed phone, which is the entire point of a reminder.
//
// The backend decides who is due (?feed=push-due): it knows who has pulled
// today, checks the Europe/Zurich window itself so DST can't skew it, and
// records that it answered, so a delayed or repeated cron can't double-send.
// This script just delivers what it is told.
//
//   npm install web-push
//   VAPID_PRIVATE=… VAPID_PUBLIC=… VAPID_SUBJECT=mailto:you@x \
//   BACKUP_ENDPOINT=https://script.google.com/…/exec \
//   node scripts/push-due.cjs
const webpush = require("web-push");
const { requireEnv, fetchFeed, run, warn, AuthError } = require("./push-lib.cjs");

requireEnv(["VAPID_PUBLIC", "VAPID_PRIVATE", "BACKUP_ENDPOINT"]);
const { VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, BACKUP_ENDPOINT } = process.env;
webpush.setVapidDetails(VAPID_SUBJECT || "mailto:fionn@fionnferreira.com", VAPID_PUBLIC, VAPID_PRIVATE);

const NAME = { lennart: "Lennart", fionn: "Fionn" };

// Rotated by day so the same sentence doesn't arrive every morning forever.
const MORNING = [
  { title: "{name}s Kapsel wartet 🎲", body: "Heute noch nicht gezogen — die Maschine steht bereit." },
  { title: "Guten Morgen, {name} 🌿", body: "Deine tägliche Kapsel ist da." },
  { title: "Die Maschine dreht sich 🎰", body: "Eine neue Kapsel wartet auf dich." },
  { title: "Heute wartet etwas ✨", body: "Die Kapsel des Tages ist für dich bereit." },
];
const EVENING = [
  { title: "Noch drei Stunden, {name} 🌙", body: "Die heutige Kapsel läuft um Mitternacht ab." },
  { title: "Fast zu spät 🎲", body: "Heute noch nicht gezogen — der Tag ist gleich vorbei." },
  { title: "{name}s Streak wackelt 💎", body: "Zieh noch heute, sonst reißt die Serie." },
];

function messageFor(item) {
  const pool = item.kind === "evening" ? EVENING : MORNING;
  const name = NAME[item.token] || "Du";
  // Seeded by the date so both players get a stable pick for the day.
  const idx = Math.abs(hash(`${item.day}|${item.kind}`)) % pool.length;
  const msg = pool[idx];
  return { title: msg.title.replace("{name}", name), body: msg.body.replace("{name}", name) };
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}

async function subsFor(token) {
  const data = await fetchFeed(
    `${BACKUP_ENDPOINT}?feed=push-subs&for=${encodeURIComponent(token)}`,
    { label: `push-subs(${token})` }
  );
  return (data && data.subscriptions) || [];
}

run(async () => {
  const data = await fetchFeed(`${BACKUP_ENDPOINT}?feed=push-due`, { label: "push-due" });
  const due = (data && data.due) || [];
  if (!due.length) {
    console.log(`Nobody due${data && data.reason ? ` (${data.reason})` : ""}.`);
    return;
  }

  let sent = 0, gone = 0, failed = 0, authFailed = 0;
  for (const item of due) {
    const subs = await subsFor(item.token);
    if (!subs.length) {
      console.log(`${item.token}: due (${item.kind}) but no subscribed device.`);
      continue;
    }
    const { title, body } = messageFor(item);
    const payload = JSON.stringify({ title, body, url: `./?player=${item.token}`, tag: `ag-${item.kind}` });
    for (const entry of subs) {
      try {
        await webpush.sendNotification(entry.subscription, payload);
        sent++;
      } catch (err) {
        // 404/410 mean the browser threw the subscription away (app deleted,
        // permission revoked). Not an error worth failing the run over.
        const status = err && err.statusCode;
        if (status === 404 || status === 410) gone++;
        else {
          failed++;
          if (status === 401 || status === 403) authFailed++;
          console.error(`${item.token}: ${status || ""} ${err.message}`);
        }
      }
    }
  }
  console.log(`sent ${sent}, expired ${gone}, failed ${failed}`);

  // This used to be `if (failed) process.exitCode = 1`, so one browser refusing
  // one notification failed the hourly run and sent mail. Only a wholesale
  // authorisation failure — nothing delivered, everything rejected — actually
  // needs a human, because that is a dead VAPID key rather than a bad day.
  if (failed && authFailed === failed && sent === 0) {
    throw new AuthError(`all ${failed} sends rejected as unauthorised — check VAPID_PUBLIC/VAPID_PRIVATE`);
  }
  if (failed) warn(`${failed} push send(s) failed; see log above.`);
});
