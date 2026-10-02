/**
 * Affections-Gacha — Google Sheets Backup
 *
 * Paste this into your Google Apps Script editor (extensions → Apps Script),
 * then deploy as a Web App:
 *   - Execute as: Me
 *   - Who has access: Anyone
 *
 * After deploying, copy the web app URL into config/backup.json → endpointUrl
 * and set enabled: true.
 *
 * Sheet layout:
 *   "Backup"         — one row per token, stores metadata (streak, favourites, tokens, questPoints)
 *   "History"        — one row per history entry, never fully overwritten
 *   "Quests"         — one row per solved quest
 *   "BaerlauchScores"— one row per player, stores best level (upsert)
 *   "Wünsche"        — one row per wish or hug (append-only); triggers email to Fionn.
 *                      Columns G/H (Status, StatusAt) hold Fionn's reply to a
 *                      wish, set from the Eingänge; the app shows it to Lennart.
 *   "Gipfelbuch"     — one row per summit entry, upsert by id
 *   "Glossar"        — one row per word entry, upsert by id (shared by both players)
 *   "PromptAnswers"  — one row per prompt answer (append-only); triggers email to Fionn
 *
 * Retired sheets (left in place, no longer read or written): "MissionLog",
 * "MissionFeedback" and "Werkstatt" belonged to the two-player half of the
 * app, which was removed.
 *
 * Google Drive folder: "Glossar-Audio" — audio recordings for glossary words
 */

const BACKUP_SPREADSHEET_ID = "1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4";
const BACKUP_SHEET_NAME = "Backup";
const HISTORY_SHEET_NAME = "History";
const DAY_START_HOUR = 4;   // keep in step with config/theme.json dayStartHour
const WISH_SHEET_NAME = "Wünsche";

const FIONN_EMAIL = "fionn@fionnferreira.com";

// ── Wünsche rows ─────────────────────────────────────────────────────────────
// Two layouts live in the same sheet: this script writes six columns
// (Timestamp, Token, Type, Wish, Page URL, User Agent), the older standalone
// wish-inbox script wrote five with the text in column C. Normalise both so
// the feeds never show a page URL as somebody's wish. Columns G/H carry the
// reply (Status, StatusAt) in either layout.
const WISH_STATUSES = ["erfuellt", "irgendwann", "lieber-nicht"];
function tsStr_(v) {
  if (!v) return "";
  if (v instanceof Date) return v.toISOString();
  return String(v);
}
function wishRow_(row) {
  const c = (row[2] || "").toString();
  const key = c.toLowerCase();
  let type, text;
  if (key === "notfall-umarmung" || key === "hug") { type = "hug"; text = row[3] || ""; }
  else if (key === "wunschkapsel" || key === "wish") { type = "wish"; text = row[3] || ""; }
  else if (key === "voucher") { type = "voucher"; text = row[3] || ""; }
  else if (c.indexOf("[hug]") === 0) { type = "hug"; text = c.replace(/^\[hug\]\s*/, ""); }
  else { type = "wish"; text = c; }
  return {
    timestamp: tsStr_(row[0]),
    token: (row[1] || "").toString().toLowerCase(),
    type: type,
    text: text.toString(),
    status: (row[6] || "").toString(),
    statusAt: tsStr_(row[7])
  };
}

// ── GET: return full backup for a token ─────────────────────────────────────

function doGet(e) {
  try {
    const token = ((e.parameter && e.parameter.token) || "Lennart").toLowerCase();
    const ss = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);

    // Read metadata from Backup sheet
    const backupSheet = getOrCreateBackupSheet_(ss);
    const backupValues = backupSheet.getDataRange().getValues();
    let meta = null;
    for (let i = 1; i < backupValues.length; i++) {
      if ((backupValues[i][0] || "").toLowerCase() === token) {
        meta = {
          favourites: JSON.parse(backupValues[i][1] || "[]"),
          streak:     backupValues[i][2] || 0,
          tokens:     JSON.parse(backupValues[i][3] || "{}"),
          questPoints: backupValues[i][4] || 0,
          lastUpdated: backupValues[i][5],
          flaschenpost: (function () { try { return JSON.parse(backupValues[i][6] || "[]"); } catch (e) { return []; } })(),
          pfand: Number(backupValues[i][7]) || 0
        };
        break;
      }
    }

    // Read history from per-entry History sheet
    const histSheet = getOrCreateHistorySheet_(ss);
    const histValues = histSheet.getDataRange().getValues();
    const history = [];
    function normDay(d) {
      if (!d) return "";
      if (d instanceof Date) return Utilities.formatDate(d, "UTC", "yyyy-MM-dd");
      return String(d).slice(0, 10);
    }
    for (let i = 1; i < histValues.length; i++) {
      const row = histValues[i];
      if ((row[0] || "").toLowerCase() !== token) continue;
      history.push({
        token:         token,
        day:           normDay(row[1]),
        categoryId:    row[2],
        categoryLabel: row[3],
        tone:          row[4],
        title:         row[5],
        message:       row[6],
        link:          row[7] || null,
        unlockTime:    row[8] || null,
        photo:         row[9] ? JSON.parse(row[9]) : null,
        revealedAt:    row[10] || null,
        promptAnswer:  row[11] || null,
        used:          row[12] === "yes" || row[12] === true,
        usedAt:        row[13] || null,
        bestanden:     row[14] === "yes" || row[14] === true,
        bestandenAt:   row[15] || null,
        beweisUrl:     row[16] || null,
        pfand:         row[17] === "yes" || row[17] === true
      });
    }

    if (!meta && !history.length) {
      return jsonOut_({ ok: false, error: "no data" });
    }

    // Read Bärlauch scores
    const scoreSheet = getOrCreateBaerlauchScoresSheet_(ss);
    const scoreValues = scoreSheet.getDataRange().getValues();
    const baerlauchScores = {};
    for (let i = 1; i < scoreValues.length; i++) {
      if (scoreValues[i][0]) baerlauchScores[scoreValues[i][0]] = scoreValues[i][1] || 0;
    }

    const latestPing = PropertiesService.getScriptProperties().getProperty("latestPing") || null;

    // Read Gipfelbuch entries (all players share one log)
    const gipfelSheet = getOrCreateGipfelbuchSheet_(ss);
    const gipfelValues = gipfelSheet.getDataRange().getValues();
    const gipfelbuch = [];
    for (let i = 1; i < gipfelValues.length; i++) {
      const row = gipfelValues[i];
      if (!row[0]) continue;
      gipfelbuch.push({
        id:          row[0],
        name:        row[1] || "",
        elevation:   row[2] || null,
        date:        row[3] ? String(row[3]).slice(0, 10) : "",
        activityUrl: row[4] || null,
        notes:       row[5] || null,
        token:       row[6] || "",
        createdAt:   row[7] || "",
        distance:    row[8] || null,
        elevGain:    row[9] || null,
        lat:         row[10] || null,
        lng:         row[11] || null,
        locLabel:    row[12] || null,
        cover:       row[13] || null
      });
    }

    // Read Glossary entries (shared by both players)
    const glossarSheet = getOrCreateGlossarSheet_(ss);
    const glossarValues = glossarSheet.getDataRange().getValues();
    const glossary = [];
    for (let i = 1; i < glossarValues.length; i++) {
      const row = glossarValues[i];
      if (!row[0]) continue;
      glossary.push({
        id:        row[0],
        word:      row[1] || "",
        meaning:   row[2] || "",
        lang:      row[3] || "swabian",
        audioUrl:  row[4] || null,
        createdBy: row[5] || "",
        createdAt: row[6] || ""
      });
    }

    // Today's shared Stimmung colour (one row per day, set by either player).
    // Returned as {day, hex} or null; the client applies it if it's for today.
    let stimmung = null;
    try {
      const stimmungSheet = getOrCreateStimmungSheet_(ss);
      const sVals = stimmungSheet.getDataRange().getValues();
      for (let i = sVals.length - 1; i >= 1; i--) {
        const row = sVals[i];
        if (!row[0]) continue;
        const day = (row[0] instanceof Date)
          ? Utilities.formatDate(row[0], "Europe/Zurich", "yyyy-MM-dd")
          : String(row[0]).slice(0, 10);
        stimmung = { day: day, hex: row[1] || "", setBy: row[2] || "" };
        break;
      }
    } catch (errS) { stimmung = null; }

    // This token's own wishes, newest first, with Fionn's reply where there is
    // one. The app keeps the last few and shows a new reply on the next card.
    // …and every hug this token ever sent, as timestamps, for the hearts
    // at the bottom of Verlauf.
    let wishes = [];
    let hugs = [];
    try {
      const wSheet = getOrCreateWuenscheSheet_(ss);
      const wRows = wSheet.getDataRange().getValues();
      // Newest first, and never more than the last 2000 rows — a sync should
      // not grow with the sheet.
      for (let i = wRows.length - 1; i >= 1 && i > wRows.length - 2001; i--) {
        if (!wRows[i][0]) continue;
        const w = wishRow_(wRows[i]);
        if (w.token !== token) continue;
        if (w.type === "hug") { if (hugs.length < 500) hugs.push(w.timestamp); continue; }
        if (w.type === "wish" && wishes.length < 8) {
          wishes.push({ timestamp: w.timestamp, text: w.text, status: w.status, statusAt: w.statusAt });
        }
      }
    } catch (errW) { wishes = []; hugs = []; }

    // Activity feed for the Fionn admin app (only when explicitly requested,
    // so normal client syncs stay lightweight). Merges recent hugs/wishes,
    // prompt answers and quest solves into one time-sorted list.
    // Push-subscription feed for the sender job (a Node/web-push runner or
    // Worker). Returns every stored subscription, optionally filtered to one
    // recipient token with &for=fionn. See PUSH-SETUP.md.
    if (e.parameter && e.parameter.feed === "push-subs") {
      const pushSheet = getOrCreatePushSheet_(ss);
      const pVals = pushSheet.getDataRange().getValues();
      const wantToken = (e.parameter.for || "").toString().toLowerCase();
      const subs = [];
      for (let i = 1; i < pVals.length; i++) {
        const row = pVals[i];
        if (!row[1]) continue;
        const rowToken = (row[0] || "").toString().toLowerCase();
        if (wantToken && rowToken !== wantToken) continue;
        try { subs.push({ token: rowToken, subscription: JSON.parse(row[2]) }); } catch (err) {}
      }
      return jsonOut_({ ok: true, subscriptions: subs });
    }

    // Pending-push feed for the notifier job. Returns hugs/wishes newer than
    // the stored pointer and (unless &peek=1) advances the pointer, so the
    // poller sends each item exactly once without keeping its own state. See
    // PUSH-SETUP.md.
    if (e.parameter && e.parameter.feed === "push-pending") {
      const props = PropertiesService.getScriptProperties();
      const since = props.getProperty("lastPushTs") || "";
      const wuenscheSheet = getOrCreateWuenscheSheet_(ss);
      const wVals = wuenscheSheet.getDataRange().getValues();
      const pending = [];
      let maxTs = since;
      for (let i = 1; i < wVals.length; i++) {
        const row = wVals[i];
        if (!row[0]) continue;
        const w = wishRow_(row);
        const ts = w.timestamp;
        if (since && ts <= since) continue;
        pending.push({ timestamp: ts, from: w.token, type: w.type, text: w.text });
        if (ts > maxTs) maxTs = ts;
      }
      if (maxTs && maxTs !== since && !(e.parameter.peek === "1")) {
        props.setProperty("lastPushTs", maxTs);
      }
      return jsonOut_({ ok: true, pending: pending });
    }

    // ── Daily reminder / streak warning, server-side ─────────────────────────
    // The client schedules these with setTimeout inside the service worker,
    // which the browser kills after ~30s idle — a timer set for 08:00 the next
    // morning dies long before it fires. So the reminders only ever arrived if
    // the app happened to be open, which is exactly when you don't need them.
    //
    // Deciding it here instead: the sender asks who is due, we answer from the
    // History sheet and remember that we said so. The Zurich window is checked
    // server-side so it stays right across DST without any client involvement.
    if (e.parameter && e.parameter.feed === "push-due") {
      const props = PropertiesService.getScriptProperties();
      const zNow = new Date();
      const zHour = Number(Utilities.formatDate(zNow, "Europe/Zurich", "H"));
      // The app's day starts at DAY_START_HOUR, not midnight (theme.json
      // dayStartHour) — a 01:00 pull is filed under the evening before. The
      // "pulled today?" check has to use the same day, or a late pull would
      // earn a morning reminder for a capsule already opened.
      const zDay = Utilities.formatDate(new Date(zNow.getTime() - DAY_START_HOUR * 3600000), "Europe/Zurich", "yyyy-MM-dd");

      // Two windows an hour wide on either side, so an hourly cron that
      // GitHub delays by 10-15 minutes still lands inside one.
      let kind = "";
      if (zHour >= 7 && zHour < 10) kind = "morning";
      else if (zHour >= 20 && zHour < 23) kind = "evening";
      if (!kind) return jsonOut_({ ok: true, due: [], reason: "outside both windows" });

      const histSheet = getOrCreateHistorySheet_(ss);
      const hVals = histSheet.getDataRange().getValues();
      const pulledToday = {};
      for (let i = 1; i < hVals.length; i++) {
        const row = hVals[i];
        if (!row[0]) continue;
        if (normDay(row[1]) === zDay) pulledToday[(row[0] || "").toString().toLowerCase()] = true;
      }

      const due = [];
      ["lennart"].forEach(function (who) {
        if (pulledToday[who]) return;
        // One nudge per player, per kind, per day — a retry or a double cron
        // must not send twice.
        const key = "pushDue:" + who + ":" + kind;
        if (props.getProperty(key) === zDay) return;
        due.push({ token: who, kind: kind, day: zDay });
        if (!(e.parameter.peek === "1")) props.setProperty(key, zDay);
      });
      return jsonOut_({ ok: true, due: due });
    }

    let activity = [];
    if (e.parameter && e.parameter.feed === "activity") {
      function tsStr(v) {
        if (!v) return "";
        if (v instanceof Date) return v.toISOString();
        return String(v);
      }
      const FEED_LIMIT = 80;

      const wuenscheSheet = getOrCreateWuenscheSheet_(ss);
      const wVals = wuenscheSheet.getDataRange().getValues();
      for (let i = 1; i < wVals.length; i++) {
        const row = wVals[i];
        if (!row[0]) continue;
        const w = wishRow_(row);
        activity.push({
          timestamp: w.timestamp,
          token: w.token,
          type: w.type,
          message: w.text,
          wish: w.text,
          status: w.status,
          statusAt: w.statusAt
        });
      }

      const paSheet = getOrCreatePromptAnswersSheet_(ss);
      const paVals = paSheet.getDataRange().getValues();
      for (let i = 1; i < paVals.length; i++) {
        const row = paVals[i];
        if (!row[0]) continue;
        activity.push({
          timestamp: tsStr(row[0]),
          token: row[1] || "",
          type: "answer",
          day: normDay(row[2]),
          prompt: row[3] || "",
          answer: row[4] || ""
        });
      }

      const qSheet = getOrCreateQuestSheet_(ss);
      const qVals = qSheet.getDataRange().getValues();
      for (let i = 1; i < qVals.length; i++) {
        const row = qVals[i];
        if (!row[0]) continue;
        activity.push({
          timestamp: tsStr(row[0]),
          token: row[1] || "",
          type: "quest",
          challenge: row[2] || "",
          points: row[4] || 0
        });
      }

      activity.sort(function (a, b) {
        return (Date.parse(b.timestamp) || 0) - (Date.parse(a.timestamp) || 0);
      });
      if (activity.length > FEED_LIMIT) activity = activity.slice(0, FEED_LIMIT);
    }

    return jsonOut_({
      ok: true,
      history,
      favourites:    meta ? meta.favourites  : [],
      streak:        meta ? meta.streak      : 0,
      tokens:        meta ? meta.tokens      : {},
      questPoints:   meta ? meta.questPoints : 0,
      lastUpdated:   meta ? meta.lastUpdated : null,
      flaschenpost:  meta ? meta.flaschenpost : [],
      pfand:         meta ? meta.pfand : 0,
      baerlauchScores,
      latestPing,
      gipfelbuch,
      glossary,
      stimmung,
      wishes,
      hugs,
      activity,
    });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

// ── POST: upsert backup ──────────────────────────────────────────────────────

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);

    // ── Beweis-Foto upload ────────────────────────────────────────────────────
    // A quest's proof photo, sent by the app as base64 JPEG (compressed
    // client-side to ~1400px). Stored in a Drive folder, shared by link, and
    // the googleusercontent URL — the same form config/photos.json uses — is
    // written onto the day's History row and returned to the app.
    if (data.type === "beweis-upload") {
      const token = (data.token || "").toLowerCase();
      const day = String(data.day || "").slice(0, 10);
      if (!token || !day || !data.image) return jsonOut_({ ok: false, error: "missing fields" });

      const folder = getOrCreateBeweisFolder_();
      const bytes = Utilities.base64Decode(data.image);
      const name = token + "-" + day + ".jpg";
      // A re-upload replaces the earlier proof for the same day — trash the
      // old file rather than piling up near-duplicates in the folder.
      const dupes = folder.getFilesByName(name);
      while (dupes.hasNext()) dupes.next().setTrashed(true);
      const file = folder.createFile(Utilities.newBlob(bytes, data.mime || "image/jpeg", name));
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const url = "https://lh3.googleusercontent.com/d/" + file.getId();

      const histSheet = getOrCreateHistorySheet_(ss);
      const values = histSheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if ((values[i][0] || "").toLowerCase() !== token) continue;
        const d = values[i][1] instanceof Date
          ? Utilities.formatDate(values[i][1], "UTC", "yyyy-MM-dd")
          : String(values[i][1]).slice(0, 10);
        if (d !== day) continue;
        histSheet.getRange(i + 1, 17).setValue(url);
        break;
      }
      return jsonOut_({ ok: true, url: url, fileId: file.getId() });
    }

    // ── Prompt answer ─────────────────────────────────────────────────────────
    if (data.type === "prompt-answer") {
      const sheet = getOrCreatePromptAnswersSheet_(ss);
      const ts = new Date();
      const tsLocal = ts.toLocaleString("de-CH", { timeZone: "Europe/Zurich" });
      sheet.appendRow([
        ts.toISOString(),
        data.token || "",
        data.day   || "",
        data.prompt || "",
        data.answer || ""
      ]);
      try {
        MailApp.sendEmail({
          to: FIONN_EMAIL,
          subject: "💭 Neue Antwort von " + (data.token || "Lennart") + " (" + (data.day || "") + ")",
          body: "Frage: " + (data.prompt || "") + "\n\nAntwort:\n" + (data.answer || "") + "\n\n" + tsLocal
        });
      } catch (_mailErr) { /* answer safe in sheet */ }
      return jsonOut_({ ok: true });
    }

    // ── Bärlauch score ────────────────────────────────────────────────────────
    if (data.type === "baerlauch-score") {
      const player = data.player || "";
      const level  = typeof data.level === "number" ? data.level : 0;
      const sheet  = getOrCreateBaerlauchScoresSheet_(ss);
      const values = sheet.getDataRange().getValues();
      let rowIdx = -1;
      let existing = 0;
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === player) { rowIdx = i + 1; existing = values[i][1] || 0; break; }
      }
      if (level > existing) {
        if (rowIdx === -1) {
          sheet.appendRow([player, level, new Date().toISOString()]);
        } else {
          sheet.getRange(rowIdx, 1, 1, 3).setValues([[player, level, new Date().toISOString()]]);
        }
      }
      return jsonOut_({ ok: true });
    }

    // ── Gipfelbuch upsert ────────────────────────────────────────────────────
    if (data.type === "gipfel-upsert") {
      const sheet = getOrCreateGipfelbuchSheet_(ss);
      const values = sheet.getDataRange().getValues();
      const id = data.id || "";
      if (!id) return jsonOut_({ ok: false, error: "missing id" });
      let rowIdx = -1;
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === id) { rowIdx = i + 1; break; }
      }
      const row = [id, data.name || "", data.elevation || "", data.date || "", data.activityUrl || "", data.notes || "", data.token || "", data.createdAt || new Date().toISOString(), data.distance || "", data.elevGain || "", data.lat || "", data.lng || "", data.locLabel || "", data.cover || ""];
      if (rowIdx === -1) { sheet.appendRow(row); }
      else { sheet.getRange(rowIdx, 1, 1, row.length).setValues([row]); }
      return jsonOut_({ ok: true });
    }

    // ── Glossary upsert ──────────────────────────────────────────────────────
    if (data.type === "glossary-upsert") {
      const sheet = getOrCreateGlossarSheet_(ss);
      const values = sheet.getDataRange().getValues();
      const id = data.id || "";
      if (!id) return jsonOut_({ ok: false, error: "missing id" });
      let rowIdx = -1;
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === id) { rowIdx = i + 1; break; }
      }
      // Client sends the author as `token` (matching the Gipfelbuch payload
      // convention); accept `createdBy` too in case that ever changes.
      const row = [id, data.word || "", data.meaning || "", data.lang || "swabian", data.audioUrl || "", data.createdBy || data.token || "", data.createdAt || new Date().toISOString()];
      if (rowIdx === -1) { sheet.appendRow(row); }
      else { sheet.getRange(rowIdx, 1, 1, row.length).setValues([row]); }
      return jsonOut_({ ok: true });
    }

    // ── Glossary audio upload → Google Drive ────────────────────────────────
    if (data.type === "glossary-audio") {
      const base64 = data.data || "";
      const mimeType = data.mimeType || "audio/webm";
      const filename = data.filename || `glossary-${Date.now()}.webm`;
      if (!base64) return jsonOut_({ ok: false, error: "no audio data" });
      try {
        const bytes = Utilities.base64Decode(base64);
        const blob = Utilities.newBlob(bytes, mimeType, filename);
        let folder;
        const folderIter = DriveApp.getFoldersByName("Glossar-Audio");
        folder = folderIter.hasNext() ? folderIter.next() : DriveApp.createFolder("Glossar-Audio");
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const url = `https://drive.google.com/uc?id=${file.getId()}`;
        return jsonOut_({ ok: true, url });
      } catch (err) {
        return jsonOut_({ ok: false, error: err.message });
      }
    }

    // ── Glossary delete ──────────────────────────────────────────────────────
    if (data.type === "glossary-delete") {
      const sheet = getOrCreateGlossarSheet_(ss);
      const values = sheet.getDataRange().getValues();
      for (let i = values.length - 1; i >= 1; i--) {
        if (values[i][0] === data.id) { sheet.deleteRow(i + 1); break; }
      }
      return jsonOut_({ ok: true });
    }

    // ── Gipfelbuch delete ─────────────────────────────────────────────────────
    if (data.type === "gipfel-delete") {
      const sheet = getOrCreateGipfelbuchSheet_(ss);
      const values = sheet.getDataRange().getValues();
      for (let i = values.length - 1; i >= 1; i--) {
        if (values[i][0] === data.id) { sheet.deleteRow(i + 1); break; }
      }
      return jsonOut_({ ok: true });
    }

    // ── Stimmung (shared day colour) ──────────────────────────────────────────
    // One row per day, shared by both players: whoever sets the mood colour
    // sets it for that day, and the other's app picks it up on the next sync.
    if (data.type === "stimmung-set" && data.day) {
      const sheet = getOrCreateStimmungSheet_(ss);
      const values = sheet.getDataRange().getValues();
      const row = [data.day, data.hex || "", data.token || "", new Date().toISOString()];
      let rowIdx = -1;
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]).slice(0, 10) === data.day) { rowIdx = i + 1; break; }
      }
      if (rowIdx === -1) { sheet.appendRow(row); }
      else { sheet.getRange(rowIdx, 1, 1, row.length).setValues([row]); }
      return jsonOut_({ ok: true });
    }

    // ── Web Push subscription upsert ──────────────────────────────────────────
    // Stores one row per (token, endpoint) so a player can have several devices.
    // The push SENDER (a Node/web-push job or Cloudflare Worker — Apps Script
    // can't sign VAPID ES256) reads these via doGet ?feed=push-subs. See
    // PUSH-SETUP.md.
    if (data.type === "push-subscribe" && data.subscription && data.subscription.endpoint) {
      const sheet = getOrCreatePushSheet_(ss);
      const values = sheet.getDataRange().getValues();
      const endpoint = data.subscription.endpoint;
      const row = [data.token || "", endpoint, JSON.stringify(data.subscription), new Date().toISOString()];
      let rowIdx = -1;
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === endpoint) { rowIdx = i + 1; break; }
      }
      if (rowIdx === -1) { sheet.appendRow(row); }
      else { sheet.getRange(rowIdx, 1, 1, row.length).setValues([row]); }
      return jsonOut_({ ok: true });
    }

    // ── Fionn's reply on a wish ──────────────────────────────────────────────
    // Finds the wish by its timestamp (column A, as the feed reported it) and
    // writes Status/StatusAt into G/H. An empty status clears the reply.
    if (data.type === "wish-status") {
      const status = (data.status || "").toString();
      if (status && WISH_STATUSES.indexOf(status) === -1) return jsonOut_({ ok: false, error: "unknown status" });
      const want = (data.timestamp || "").toString();
      const wantMs = Date.parse(want);
      if (!want) return jsonOut_({ ok: false, error: "missing timestamp" });
      const sheet = getOrCreateWuenscheSheet_(ss);
      const values = sheet.getDataRange().getValues();
      for (let i = values.length - 1; i >= 1; i--) {
        const ts = tsStr_(values[i][0]);
        if (ts === want || (wantMs && Date.parse(ts) === wantMs)) {
          sheet.getRange(i + 1, 7, 1, 2).setValues([[status, status ? new Date().toISOString() : ""]]);
          return jsonOut_({ ok: true, status: status });
        }
      }
      return jsonOut_({ ok: false, error: "wish not found" });
    }

    // ── Stups from Fionn ─────────────────────────────────────────────────────
    // Nothing but a timestamp: the app compares it with the last one it saw
    // and shows a banner. Deliberately no row, no email.
    if (data.type === "ping") {
      PropertiesService.getScriptProperties().setProperty("latestPing", new Date().toISOString());
      return jsonOut_({ ok: true });
    }

    // ── Notfall-Umarmung & Wunschkapsel ──────────────────────────────────────
    if (data.type === "hug" || data.wish) {
      const isHug = data.type === "hug";
      const wishText = data.wish || data.message || "";
      const sender  = (data.token || "lennart");
      // The row keeps the client's own timestamp when it sends one: the app
      // logs a hug locally under that stamp, and the sync unions the sheet's
      // copy back — a server-side clock here made every hug count twice.
      const sentMs  = Date.parse(data.timestamp || "");
      const ts      = isNaN(sentMs) ? new Date() : new Date(sentMs);
      const tsLocal = ts.toLocaleString("de-CH", { timeZone: "Europe/Zurich" });

      const wishSheet = getOrCreateWuenscheSheet_(ss);
      wishSheet.appendRow([
        ts.toISOString(),
        sender,
        isHug ? "Notfall-Umarmung" : "Wunschkapsel",
        wishText,
        data.pageUrl || "",
        data.userAgent || ""
      ]);

      try {
        const subject = isHug
          ? `🫂 Notfall-Umarmung von ${sender}!`
          : `💌 Neuer Wunsch von ${sender}`;
        const body = isHug
          ? `${sender} braucht gerade eine Umarmung! 🫂\n\n${tsLocal}`
          : `Neuer Wunsch eingegangen:\n\n„${wishText}"\n\nVon: ${sender}\n${tsLocal}`;
        MailApp.sendEmail(FIONN_EMAIL, subject, body);
      } catch (_mailErr) { /* data is safe in sheet */ }

      return jsonOut_({ ok: true });
    }

    if (data.type !== "gacha-backup") return jsonOut_({ ok: false, error: "unknown type" });

    const token      = (data.token || "lennart").toLowerCase();
    const timestamp  = new Date().toISOString();

    // ── Write metadata to Backup sheet ──────────────────────────────────────
    const backupSheet  = getOrCreateBackupSheet_(ss);
    const backupValues = backupSheet.getDataRange().getValues();
    const favourites   = JSON.stringify(data.favourites || []);
    const tokensJson   = JSON.stringify(data.tokens || {});
    const questPoints  = typeof data.questPoints === "number" ? data.questPoints : 0;
    const incomingStreak = typeof data.streak === "number" ? data.streak : 0;

    let metaRow = -1;
    let existingStreak = 0;
    let existingPost = "[]";
    let existingPfand = 0;
    for (let i = 1; i < backupValues.length; i++) {
      if ((backupValues[i][0] || "").toLowerCase() === token) { metaRow = i + 1; existingStreak = backupValues[i][2] || 0; existingPost = backupValues[i][6] || "[]"; existingPfand = Number(backupValues[i][7]) || 0; break; }
    }
    // The Pfand count only ever grows; a client that does not send it keeps
    // the sheet's number.
    const pfandCount = typeof data.pfand === "number" ? Math.max(data.pfand, existingPfand) : existingPfand;
    // Flaschenposten: a client that does not send them (older build) must
    // not blank the column.
    const postJson = Array.isArray(data.flaschenpost) ? JSON.stringify(data.flaschenpost) : existingPost;
    // Latest wins. The old max() meant the sheet could only ever go up, and
    // since the app used the sheet's number as a floor, a missed day never
    // showed — the streak froze at its all-time high on every phone. The
    // client computes from the full synced history, so its number is right.
    const streak = incomingStreak;
    const metaRowData = [token, favourites, streak, tokensJson, questPoints, timestamp, postJson, pfandCount];
    if (metaRow === -1) {
      backupSheet.appendRow(metaRowData);
    } else {
      backupSheet.getRange(metaRow, 1, 1, metaRowData.length).setValues([metaRowData]);
    }

    // ── Write history entries — upsert by day, never delete absent days ────────
    if (Array.isArray(data.history) && data.history.length) {
      const histSheet  = getOrCreateHistorySheet_(ss);
      const histValues = histSheet.getDataRange().getValues();

      function normDay(d) {
        if (!d) return "";
        if (d instanceof Date) return Utilities.formatDate(d, "UTC", "yyyy-MM-dd");
        return String(d).slice(0, 10);
      }

      const existingByDay = {};
      const dupeRows = [];
      for (let i = histValues.length - 1; i >= 1; i--) {
        if ((histValues[i][0] || "").toLowerCase() !== token) continue;
        const day = normDay(histValues[i][1]);
        if (!day) continue;
        if (existingByDay[day] !== undefined) {
          dupeRows.push(i + 1);
        } else {
          existingByDay[day] = i + 1;
        }
      }

      for (const entry of data.history) {
        if (!entry || !entry.day || entry.title === "(wiederhergestellt)") continue;
        const day = String(entry.day || "").slice(0, 10);
        if (!day) continue;
        // Bestanden and the proof URL are one-way: a second device that
        // hasn't synced them yet backs up entries without them, and a plain
        // overwrite would blank what the first device earned. Keep the
        // existing cell whenever the incoming entry is silent about it.
        const prevRow = existingByDay[day]
          ? histSheet.getRange(existingByDay[day], 1, 1, 18).getValues()[0]
          : null;
        const bestanden   = entry.bestanden || (prevRow && prevRow[14] === "yes");
        const bestandenAt = entry.bestandenAt || (prevRow && prevRow[15]) || "";
        const beweisUrl   = entry.beweisUrl || (prevRow && prevRow[16]) || "";
        const pfand       = entry.pfand || (prevRow && prevRow[17] === "yes");
        const row = [
          token, day,
          entry.categoryId    || "",
          entry.categoryLabel || "",
          entry.tone          || "",
          entry.title         || "",
          entry.message       || "",
          entry.link          || "",
          entry.unlockTime    || "",
          entry.photo ? JSON.stringify(entry.photo) : "",
          entry.revealedAt    || "",
          entry.promptAnswer  || "",
          entry.used ? "yes" : "",
          entry.usedAt        || "",
          bestanden ? "yes" : "",
          bestandenAt,
          beweisUrl,
          pfand ? "yes" : ""
        ];
        if (existingByDay[day]) {
          histSheet.getRange(existingByDay[day], 1, 1, row.length).setValues([row]);
        } else {
          histSheet.appendRow(row);
          existingByDay[day] = histSheet.getLastRow();
        }
      }

      dupeRows.sort((a, b) => b - a);
      for (const rowNum of dupeRows) {
        histSheet.deleteRow(rowNum);
      }
    }

    // ── Log quest solves ────────────────────────────────────────────────────
    if (data.questLog) {
      const questSheet = getOrCreateQuestSheet_(ss);
      questSheet.appendRow([timestamp, token, data.questLog.challenge, data.questLog.attempts, data.questLog.points, data.questLog.period]);
    }

    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  } finally {
    lock.releaseLock();
  }
}

// ── Sheet helpers ────────────────────────────────────────────────────────────

function getOrCreateBackupSheet_(ss) {
  let sheet = ss.getSheetByName(BACKUP_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(BACKUP_SHEET_NAME);
    sheet.appendRow(["Token", "Favourites", "Streak", "Tokens", "QuestPoints", "LastUpdated", "Flaschenpost", "Pfand"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateHistorySheet_(ss) {
  let sheet = ss.getSheetByName(HISTORY_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(HISTORY_SHEET_NAME);
    sheet.appendRow(["Token", "Day", "CategoryId", "CategoryLabel", "Tone", "Title", "Message", "Link", "UnlockTime", "Photo", "RevealedAt", "PromptAnswer", "Used", "UsedAt", "Bestanden", "BestandenAt", "BeweisUrl"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(7, 400);
    sheet.setColumnWidth(12, 400);
  }
  // Sheets created before the Bestanden columns existed get the two headers
  // filled in, so the columns are labelled rather than mystery cells.
  if (sheet.getRange(1, 15).getValue() === "") {
    sheet.getRange(1, 15, 1, 2).setValues([["Bestanden", "BestandenAt"]]);
  }
  if (sheet.getRange(1, 17).getValue() === "") {
    sheet.getRange(1, 17).setValue("BeweisUrl");
  }
  return sheet;
}

function getOrCreateBeweisFolder_() {
  const it = DriveApp.getFoldersByName("Gacha Beweise");
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder("Gacha Beweise");
}

function getOrCreateQuestSheet_(ss) {
  let sheet = ss.getSheetByName("Quests");
  if (!sheet) {
    sheet = ss.insertSheet("Quests");
    sheet.appendRow(["Timestamp", "Token", "Challenge", "Attempts", "Points", "Period"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateBaerlauchScoresSheet_(ss) {
  let sheet = ss.getSheetByName("BaerlauchScores");
  if (!sheet) {
    sheet = ss.insertSheet("BaerlauchScores");
    sheet.appendRow(["Player", "BestLevel", "LastUpdated"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateWuenscheSheet_(ss) {
  let sheet = ss.getSheetByName(WISH_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(WISH_SHEET_NAME);
    sheet.appendRow(["Timestamp", "Token", "Type", "Wish", "Page URL", "User Agent", "Status", "StatusAt"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(4, 400);
  }
  return sheet;
}

function getOrCreatePromptAnswersSheet_(ss) {
  let sheet = ss.getSheetByName("PromptAnswers");
  if (!sheet) {
    sheet = ss.insertSheet("PromptAnswers");
    sheet.appendRow(["Timestamp", "Token", "Day", "Prompt", "Answer"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(4, 350);
    sheet.setColumnWidth(5, 450);
  }
  return sheet;
}

function getOrCreateGlossarSheet_(ss) {
  let sheet = ss.getSheetByName("Glossar");
  if (!sheet) {
    sheet = ss.insertSheet("Glossar");
    sheet.appendRow(["ID", "Word", "Meaning", "Lang", "AudioUrl", "CreatedBy", "CreatedAt"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 300);
    sheet.setColumnWidth(5, 300);
  }
  return sheet;
}

function getOrCreateGipfelbuchSheet_(ss) {
  let sheet = ss.getSheetByName("Gipfelbuch");
  if (!sheet) {
    sheet = ss.insertSheet("Gipfelbuch");
    sheet.appendRow(["ID", "Name", "Elevation", "Date", "ActivityURL", "Notes", "Token", "CreatedAt", "Distance", "ElevGain", "Lat", "Lng", "LocLabel", "Cover"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(5, 300);
    sheet.setColumnWidth(6, 300);
  }
  return sheet;
}

// Was referenced twice — once in doGet, once by the "stimmung-set" POST — but
// never actually defined. The read is inside a try/catch, so the shared day
// colour just silently came back null forever; the write is not, so setting a
// colour threw. Columns match the row the POST handler writes.
function getOrCreateStimmungSheet_(ss) {
  let sheet = ss.getSheetByName("Stimmung");
  if (!sheet) {
    sheet = ss.insertSheet("Stimmung");
    sheet.appendRow(["Day", "Hex", "SetBy", "UpdatedAt"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 110);
    sheet.setColumnWidth(4, 200);
  }
  return sheet;
}

function getOrCreatePushSheet_(ss) {
  let sheet = ss.getSheetByName("PushSubscriptions");
  if (!sheet) {
    sheet = ss.insertSheet("PushSubscriptions");
    sheet.appendRow(["Token", "Endpoint", "SubscriptionJSON", "UpdatedAt"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 320);
    sheet.setColumnWidth(3, 400);
  }
  return sheet;
}

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
