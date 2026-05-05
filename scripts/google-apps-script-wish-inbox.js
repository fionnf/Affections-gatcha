/**
 * Wunschkapsel inbox — Google Apps Script.
 *
 * Setup
 * -----
 * 1. Open https://script.google.com and create a new project.
 * 2. Replace the contents of Code.gs with this file.
 * 3. Confirm SPREADSHEET_ID and WORKSHEET_NAME below match the target sheet.
 *    Sheet:     https://docs.google.com/spreadsheets/d/1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4/edit
 *    Worksheet: "Wünsche"
 *    Headers:   Timestamp | Token | Wish | Page URL | User Agent
 * 4. Deploy → New deployment → Type: Web app
 *      - Description: "Wunschkapsel inbox"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the resulting Web app URL (it ends in /exec) and paste it into
 *    config/wish-inbox.json -> endpointUrl. Commit + push.
 *
 * Notes
 * -----
 * - The widget POSTs JSON in the request body with Content-Type
 *   "text/plain;charset=utf-8" so the browser does not send a CORS preflight.
 *   The script accepts both that and application/json.
 * - The script falls back to e.parameter.payload (form-encoded) for completeness.
 * - The response is JSON; CORS-friendly headers are not configurable on
 *   ContentService, but `mode: "cors"` works for /exec endpoints because
 *   Apps Script returns Access-Control-Allow-Origin: *. If a future Google
 *   change breaks that, the widget retries with mode: "no-cors" so rows still
 *   arrive even when the response is opaque.
 */

var SPREADSHEET_ID = "1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4";
var WORKSHEET_NAME = "Wünsche";

function doPost(e) {
  try {
    var data = parsePayload(e);
    var sheet = getSheet_();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.token || "",
      data.wish || "",
      data.pageUrl || "",
      data.userAgent || ""
    ]);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doGet(e) {
  // Useful for a quick browser smoke test once deployed.
  return jsonResponse_({ ok: true, hint: "POST JSON {timestamp, token, wish, pageUrl, userAgent}" });
}

function parsePayload(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents) || {};
    } catch (_err) {
      // fall through to form parsing
    }
  }
  if (e.parameter && e.parameter.payload) {
    try {
      return JSON.parse(e.parameter.payload) || {};
    } catch (_err) {
      // ignore
    }
  }
  return e.parameter || {};
}

function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(WORKSHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(WORKSHEET_NAME);
    sheet.appendRow(["Timestamp", "Token", "Wish", "Page URL", "User Agent"]);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
