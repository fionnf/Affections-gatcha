#!/usr/bin/env node
// Notifier job: ask the backend for hugs/wishes that haven't been pushed yet
// (the backend advances its own pointer, so no state is kept here), then push
// each one via Web Push: a wish to the OTHER player's devices, a
// Notfall-Umarmung to EVERY subscribed device, the sender's own included,
// so it lands on whichever phone or tablet is nearest. Meant to run on a
// schedule from GitHub Actions. Apps Script can't sign VAPID (ES256), so the
// actual send happens here with the `web-push` library.
//
//   npm install web-push
//   VAPID_PUBLIC=… VAPID_PRIVATE=… VAPID_SUBJECT=mailto:you@x \
//   BACKUP_ENDPOINT=https://script.google.com/…/exec \
//   node scripts/push-poll.cjs
const webpush = require("web-push");
const { requireEnv, fetchAdminFeed, postBackend, run, warn, AuthError } = require("./push-lib.cjs");

requireEnv(["VAPID_PUBLIC", "VAPID_PRIVATE", "BACKUP_ENDPOINT"]);
const { VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, BACKUP_ENDPOINT } = process.env;
webpush.setVapidDetails(VAPID_SUBJECT || "mailto:example@example.com", VAPID_PUBLIC, VAPID_PRIVATE);

const NAME = { lennart: "Lennart", fionn: "Fionn" };
const other = (t) => (t === "fionn" ? "lennart" : "fionn");

// Without a token the feed returns every stored subscription (all players,
// all devices); with one, that player's devices only.
async function subsFor(token) {
  const query = token ? `&for=${encodeURIComponent(token)}` : "";
  const data = await fetchAdminFeed(
    `${BACKUP_ENDPOINT}?feed=push-subs${query}`,
    { label: `push-subs(${token || "all"})` }
  );
  return (data && data.subscriptions) || [];
}

// The words depend on who is holding the phone: the sender's own devices get
// a confirmation, everyone else the hug itself.
function messageFor(item, recipient) {
  const who = NAME[item.from] || "Jemand";
  if (item.type === "hug") {
    if (recipient === item.from) return { title: "🫂 Umarmung unterwegs", body: "Deine Notfall-Umarmung ist raus." };
    return { title: "🫂 Notfall-Umarmung", body: `${who} braucht gerade eine Umarmung.` };
  }
  if (item.type === "voucher") return { title: "🎟️ Gutschein eingelöst", body: item.text || `${who} hat einen Gutschein eingelöst.` };
  return { title: "✨ Neuer Wunsch", body: `${who} hat einen Wunsch geschickt.` };
}

// Where an item goes: a hug to every device, a wish to the named recipient
// or, failing that, to the other player.
async function deliveriesFor(item) {
  if (item.type === "hug") {
    const subs = await subsFor(null);
    return subs.map((entry) => ({ entry, recipient: entry.token || other(item.from) }));
  }
  const recipient = NAME[item.to] ? item.to : other(item.from);
  const subs = await subsFor(recipient);
  return subs.map((entry) => ({ entry, recipient }));
}

run(async () => {
  // mode=ack: the backend keeps the items until we confirm them below, so a
  // run that dies halfway resends instead of dropping the rest. An older
  // backend ignores the mode, advances on the read and sends no upTo.
  const data = await fetchAdminFeed(`${BACKUP_ENDPOINT}?feed=push-pending&mode=ack`, { label: "push-pending" });
  const pending = (data && data.pending) || [];
  const acking = !!(data && data.upTo);
  if (!pending.length) { console.log("Nothing pending."); return; }

  let sent = 0, gone = 0, failed = 0, authFailed = 0;
  const dead = new Set();
  let ackedTo = "";
  const ack = async () => {
    if (acking && ackedTo) await postBackend(BACKUP_ENDPOINT, { type: "push-ack", upTo: ackedTo });
  };
  for (const item of pending) {
    let deliveries;
    try { deliveries = await deliveriesFor(item); }
    catch (err) { await ack(); throw err; }  // keep what went out; retry the rest next run
    for (const { entry, recipient } of deliveries) {
      const { title, body } = messageFor(item, recipient);
      const url = recipient === "fionn" ? "./fionn-gacha.html" : `./?player=${recipient}`;
      const payload = JSON.stringify({ title, body, url, tag: item.type === "hug" ? "ag-hug" : "ag-wish" });
      try { await webpush.sendNotification(entry.subscription, payload); sent++; }
      catch (err) {
        const status = err && err.statusCode;
        // 404/410: the browser threw the subscription away (app deleted,
        // permission revoked). Expected; the endpoint is pruned below.
        if (status === 404 || status === 410) { gone++; dead.add(entry.subscription && entry.subscription.endpoint); }
        else {
          failed++;
          if (status === 401 || status === 403) authFailed++;
          console.error("send error:", status || (err && err.message));
        }
      }
    }
    ackedTo = item.at || item.timestamp || ackedTo;
  }
  await ack();
  // A subscription the push service called gone (404/410) never comes back;
  // without this every run sent into it, 288 times a day, forever.
  for (const endpoint of dead) if (endpoint) await postBackend(BACKUP_ENDPOINT, { type: "push-unsubscribe", endpoint });
  console.log(`Pending ${pending.length} → sent ${sent}, expired ${gone}, failed ${failed}.`);

  // A single push refused by one browser's endpoint is noise. Every single one
  // refused as unauthorised is a broken VAPID key, which no retry will fix and
  // which stops all notifications until someone rotates it — worth the mail.
  if (failed && authFailed === failed && sent === 0) {
    throw new AuthError(`all ${failed} sends rejected as unauthorised — check VAPID_PUBLIC/VAPID_PRIVATE`);
  }
  if (failed) warn(`${failed} push send(s) failed; see log above.`);
});
