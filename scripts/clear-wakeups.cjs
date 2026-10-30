#!/usr/bin/env node
// Keeps wake-up alarms off the lamps, whether or not anyone opens the app.
//
// The lamps hold their alarm schedule twice: as a retained list on the public
// MQTT broker (what the lights page and the app edit) and as a copy in their
// own flash. A board re-reads the retained list every time it connects and
// replaces its copy — but only if the broker still has one, and the firmware
// itself notes that the public broker sometimes drops retained messages. Then
// the boards keep firing whatever is in their flash, and a check that only
// looks at the retained list sees nothing to remove.
//
// So this reads both: the retained list, and the alarm count each board
// announces in its 30-second heartbeat ("alarms": N). It then
//   - removes every wake-up (anything not typed "sunset" — the firmware's own
//     rule, _sanitise_alarms in linked_friend_lights/main.py) from the list,
//   - clears the list when the broker has none but a lamp still holds some,
//   - resends the list when a lamp holds more alarms than the list has,
// publishing the result both retained and as set_alarms, then waits for the
// next heartbeats to confirm the lamps took it. Bedtime fades are kept.
//
//   MQTT_URL    default wss://broker.hivemq.com:8884/mqtt
//   COLLECT_MS  how long to listen first (default 36000: one heartbeat + slack)
//   VERIFY_MS   how long to wait for confirmation (default 40000)

const PREFIX = "picolight_lf26";
const T_ALARMS = `${PREFIX}/alarms`;
const T_EVENTS = `${PREFIX}/events`;
const BOARDS = ["board_a", "board_b"];

const isObj = (a) => !!a && typeof a === "object" && !Array.isArray(a);
const isWakeUp = (a) => isObj(a) && a.type !== "sunset";

// list: the retained alarm list, or null when the broker had none.
// boards: { board_a: { alarms: N }, ... } from heartbeats (only boards heard).
// Returns { publish: array|null, reason }.
function plan(list, boards) {
  const held = Object.values(boards || {}).map((b) => b && b.alarms).filter(Number.isInteger);
  const maxHeld = held.length ? Math.max(...held) : 0;
  if (list === null) {
    return maxHeld > 0
      ? { publish: [], reason: `the broker has no alarm list, but a lamp holds ${maxHeld} alarm(s) in memory — clearing them` }
      : { publish: null, reason: "no alarm list on the broker and the lamps hold none" };
  }
  const objs = list.filter(isObj);
  const kept = objs.filter((a) => !isWakeUp(a));
  const removed = objs.length - kept.length;
  if (removed > 0) return { publish: kept, reason: `removing ${removed} wake-up alarm(s) from the list` };
  if (held.some((n) => n > kept.length)) {
    return { publish: kept, reason: `a lamp holds ${maxHeld} alarm(s) but the list has ${kept.length} — resending the list` };
  }
  return { publish: null, reason: "no wake-ups; the lists agree" };
}

const pad = (n) => String(n).padStart(2, "0");
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
function describe(a) {
  if (!isObj(a)) return "(not an alarm)";
  const utc = `${pad(a.hour ?? 0)}:${pad(a.minute ?? 0)} UTC`;
  const local = Number.isInteger(a.lh) ? `${pad(a.lh)}:${pad(a.lm || 0)} Ortszeit der Seite` : "";
  const days = Array.isArray(a.days) ? a.days.map((d) => DAYS[d] || d).join(",") : "täglich";
  const boards = Array.isArray(a.boards) && a.boards.length ? a.boards.join("+") : "alle Lampen";
  return `${isWakeUp(a) ? "🌅 WECKER" : "🌙 Einschlafen"} ${a.enabled === false ? "(aus)" : "(an)"} ${utc}${local ? ` · ${local}` : ""} · ${days} · ${boards} · ${a.duration_min || "?"} min`;
}

async function main() {
  const mqtt = require("mqtt");
  const url = process.env.MQTT_URL || "wss://broker.hivemq.com:8884/mqtt";
  const collectMs = Number(process.env.COLLECT_MS || 36000);
  const verifyMs = Number(process.env.VERIFY_MS || 40000);
  const summary = [];
  const log = (s) => { console.log(s); summary.push(s); };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const client = mqtt.connect(url, { clientId: "alarm_guard_" + Math.random().toString(16).slice(2), clean: true, connectTimeout: 15000, reconnectPeriod: 0 });
  let list = null, listSeen = false;
  const boards = {};
  let beat = 0;
  client.on("message", (topic, msg) => {
    let d; try { d = JSON.parse(msg.toString()); } catch (_e) { return; }
    if (topic === T_ALARMS) { if (Array.isArray(d)) { list = d; listSeen = true; } return; }
    if (isObj(d) && d.heartbeat && BOARDS.includes(d.from)) { boards[d.from] = { alarms: d.alarms, fw: d.fw, at: ++beat }; }
  });

  try {
    await new Promise((resolve, reject) => {
      client.once("connect", resolve);
      client.once("error", reject);
      setTimeout(() => reject(new Error("connect timeout")), 20000);
    });
  } catch (e) {
    console.log(`::warning::MQTT broker unreachable (${e.message}); nothing checked, the next run retries.`);
    try { client.end(true); } catch (_e) {}
    return;
  }
  await new Promise((r) => client.subscribe([T_ALARMS, T_EVENTS], r));
  await sleep(collectMs);

  log(`Retained alarm list: ${listSeen ? `${list.length} entr${list.length === 1 ? "y" : "ies"}` : "none on the broker"}`);
  if (listSeen) list.forEach((a, i) => log(`  ${i + 1}. ${describe(a)}`));
  const heard = Object.keys(boards);
  log(heard.length ? `Lamps heard: ${heard.map((b) => `${b} holds ${boards[b].alarms ?? "?"} alarm(s) (fw ${boards[b].fw ?? "?"})`).join("; ")}` : "No lamp announced itself (offline, or quiet for this window).");

  const decision = plan(listSeen ? list : null, boards);
  log(`Decision: ${decision.reason}`);

  if (decision.publish !== null) {
    const before = beat;
    client.publish(T_ALARMS, JSON.stringify(decision.publish), { retain: true, qos: 1 });
    client.publish(T_EVENTS, JSON.stringify({ set_alarms: decision.publish, from: "alarm_guard" }), { qos: 1 });
    log(`Published ${decision.publish.length} alarm(s) (retained + set_alarms).`);
    // Wait for each heard lamp to announce itself again with the new count.
    const want = decision.publish.length;
    const until = Date.now() + verifyMs;
    const confirmed = () => heard.length === 0 || heard.every((b) => boards[b].at > before && boards[b].alarms === want);
    while (Date.now() < until && !confirmed()) await sleep(500);
    if (heard.length === 0) log("No lamp was awake to confirm; each takes the retained list when it next connects.");
    else if (confirmed()) log("Confirmed: every lamp now reports " + want + " alarm(s).");
    else log(`::warning::Not every lamp confirmed yet (${heard.map((b) => `${b}: ${boards[b].alarms}`).join(", ")}); they take the retained list when they next connect.`);
  }
  await sleep(300);
  await new Promise((r) => client.end(false, {}, r));

  if (process.env.GITHUB_STEP_SUMMARY) {
    try { require("fs").appendFileSync(process.env.GITHUB_STEP_SUMMARY, "### Alarm guard\n\n```\n" + summary.join("\n") + "\n```\n"); } catch (_e) {}
  }
}

module.exports = { plan, isWakeUp, describe };

if (require.main === module) {
  main().catch((e) => { console.log(`::warning::alarm guard failed: ${e && e.message ? e.message : e}`); process.exit(0); });
}
