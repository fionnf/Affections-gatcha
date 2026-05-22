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
 *   "Backup"  — one row per token, stores metadata (streak, favourites, tokens, questPoints)
 *   "History" — one row per history entry, never fully overwritten
 *   "Quests"  — one row per solved quest
 */

const BACKUP_SPREADSHEET_ID = "1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4";
const BACKUP_SHEET_NAME = "Backup";
const HISTORY_SHEET_NAME = "History";

// ── GET: return full backup for a token ─────────────────────────────────────

function doGet(e) {
  try {
    const token = (e.parameter && e.parameter.token) || "Lennart";
    const ss = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);

    // Read metadata from Backup sheet
    const backupSheet = getOrCreateBackupSheet_(ss);
    const backupValues = backupSheet.getDataRange().getValues();
    let meta = null;
    for (let i = 1; i < backupValues.length; i++) {
      if (backupValues[i][0] === token) {
        meta = {
          favourites: JSON.parse(backupValues[i][1] || "[]"),
          streak:     backupValues[i][2] || 0,
          tokens:     JSON.parse(backupValues[i][3] || "{}"),
          questPoints: backupValues[i][4] || 0,
          lastUpdated: backupValues[i][5]
        };
        break;
      }
    }

    // Read history from per-entry History sheet
    const histSheet = getOrCreateHistorySheet_(ss);
    const histValues = histSheet.getDataRange().getValues();
    const history = [];
    // Sheets auto-converts date strings to Date objects; use Utilities.formatDate for those.
    function normDay(d) {
      if (!d) return "";
      if (d instanceof Date) return Utilities.formatDate(d, "UTC", "yyyy-MM-dd");
      return String(d).slice(0, 10);
    }
    for (let i = 1; i < histValues.length; i++) {
      const row = histValues[i];
      if (row[0] !== token) continue;
      history.push({
        token:         row[0],
        day:           normDay(row[1]),
        categoryId:    row[2],
        categoryLabel: row[3],
        tone:          row[4],
        title:         row[5],
        message:       row[6],
        link:          row[7] || null,
        unlockTime:    row[8] || null,
        photo:         row[9] ? JSON.parse(row[9]) : null,
        revealedAt:    row[10] || null
      });
    }

    if (!meta && !history.length) {
      return jsonOut_({ ok: false, error: "no data" });
    }

    return jsonOut_({
      ok: true,
      history,
      favourites:  meta ? meta.favourites  : [],
      streak:      meta ? meta.streak      : 0,
      tokens:      meta ? meta.tokens      : {},
      questPoints: meta ? meta.questPoints : 0,
      lastUpdated: meta ? meta.lastUpdated : null
    });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

// ── POST: upsert backup ──────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type !== "gacha-backup") return jsonOut_({ ok: false, error: "unknown type" });

    const token      = data.token || "Lennart";
    const timestamp  = new Date().toISOString();
    const ss         = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);

    // ── Write metadata to Backup sheet ──────────────────────────────────────
    const backupSheet  = getOrCreateBackupSheet_(ss);
    const backupValues = backupSheet.getDataRange().getValues();
    const favourites   = JSON.stringify(data.favourites || []);
    const tokensJson   = JSON.stringify(data.tokens || {});
    const questPoints  = typeof data.questPoints === "number" ? data.questPoints : 0;
    const streak       = typeof data.streak === "number" ? data.streak : 0;

    let metaRow = -1;
    for (let i = 1; i < backupValues.length; i++) {
      if (backupValues[i][0] === token) { metaRow = i + 1; break; }
    }
    const metaRowData = [token, favourites, streak, tokensJson, questPoints, timestamp];
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

      // Build index of existing rows for this token (scan backwards; keep last, mark dupes)
      const existingByDay = {};
      const dupeRows = [];
      for (let i = histValues.length - 1; i >= 1; i--) {
        if (histValues[i][0] !== token) continue;
        const day = normDay(histValues[i][1]);
        if (!day) continue;
        if (existingByDay[day] !== undefined) {
          dupeRows.push(i + 1); // older duplicate — delete
        } else {
          existingByDay[day] = i + 1;
        }
      }

      // Upsert — only touch rows whose day appears in the incoming payload
      for (const entry of data.history) {
        if (!entry || !entry.day || entry.title === "(wiederhergestellt)") continue;
        const day = String(entry.day || "").slice(0, 10);
        if (!day) continue;
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
          entry.revealedAt    || ""
        ];
        if (existingByDay[day]) {
          histSheet.getRange(existingByDay[day], 1, 1, row.length).setValues([row]);
        } else {
          histSheet.appendRow(row);
          existingByDay[day] = -1; // prevent double-append within this call
        }
      }

      // Remove duplicates (bottom-up so row indices stay valid)
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
  }
}

// ── Sheet helpers ────────────────────────────────────────────────────────────

function getOrCreateBackupSheet_(ss) {
  let sheet = ss.getSheetByName(BACKUP_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(BACKUP_SHEET_NAME);
    sheet.appendRow(["Token", "Favourites", "Streak", "Tokens", "QuestPoints", "LastUpdated"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateHistorySheet_(ss) {
  let sheet = ss.getSheetByName(HISTORY_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(HISTORY_SHEET_NAME);
    sheet.appendRow(["Token", "Day", "CategoryId", "CategoryLabel", "Tone", "Title", "Message", "Link", "UnlockTime", "Photo", "RevealedAt"]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(7, 400); // Message column wider
  }
  return sheet;
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

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
