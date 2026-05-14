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
 * This script uses the SAME spreadsheet as the wish inbox.
 * It creates a new sheet called "Backup" automatically.
 */

const BACKUP_SPREADSHEET_ID = "1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4";
const BACKUP_SHEET_NAME = "Backup";

function doGet(e) {
  try {
    const token = (e.parameter && e.parameter.token) || "Lennart";
    const sheet = getOrCreateSheet_();
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === token) {
        return jsonOut_({
          ok: true,
          history: JSON.parse(values[i][1] || "[]"),
          favourites: JSON.parse(values[i][2] || "[]"),
          streak: values[i][3] || 0,
          lastUpdated: values[i][4]
        });
      }
    }
    return jsonOut_({ ok: false, error: "no data" });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type !== "gacha-backup") return jsonOut_({ ok: false, error: "unknown type" });

    const token = data.token || "Lennart";
    const history = JSON.stringify(data.history || []);
    const favourites = JSON.stringify(data.favourites || []);
    const timestamp = new Date().toISOString();

    const sheet = getOrCreateSheet_();
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === token) { rowIndex = i + 1; break; }
    }
    const streak = typeof data.streak === "number" ? data.streak : 0;
    if (rowIndex === -1) {
      sheet.appendRow([token, history, favourites, streak, timestamp]);
    } else {
      sheet.getRange(rowIndex, 1, 1, 5).setValues([[token, history, favourites, streak, timestamp]]);
    }
    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);
  let sheet = ss.getSheetByName(BACKUP_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(BACKUP_SHEET_NAME);
    sheet.appendRow(["Token", "History", "Favourites", "Streak", "LastUpdated"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
