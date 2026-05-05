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
 * IMPORTANT: redeploy after editing
 * ---------------------------------
 * Apps Script web apps are versioned at deploy time. After changing this file
 * (e.g. to enable hug emails) you MUST redeploy:
 *   Deploy → Manage deployments → ✏️ → Version: New version → Deploy.
 * The /exec URL stays the same. The first time the script tries to send mail
 * Google will pop a one-time authorization dialog asking for permission to
 * "Send email as you" — accept it (this is why "Execute as: Me" is required).
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
 *
 * Events
 * ------
 * The script handles two payload shapes, distinguished by `type` / `event`:
 *   - `wish` (default, legacy): a Wunschkapsel submission. Logged only.
 *   - `hug`: a Notfall-Umarmung ping from Lennart. Logged AND emailed to
 *     HUG_EMAIL_TO so Fionn gets a real notification without Lennart needing
 *     to open Mail/WhatsApp on his side.
 *
 * Both shapes are stored in the same 5-column sheet for backward compatibility
 * (Timestamp | Token | Wish | Page URL | User Agent). For hug events the
 * "Wish" cell is prefixed with "[hug] " so they are easy to spot at a glance.
 */

var SPREADSHEET_ID = "1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4";
var WORKSHEET_NAME = "Wünsche";
var HUG_EMAIL_TO = "fionn@fionnferreira.com";
var HUG_EMAIL_SUBJECT = "🫂 Notfall-Umarmung von Lennart";

function doPost(e) {
  try {
    var data = parsePayload(e);
    var type = normaliseType_(data);
    var sheet = getSheet_();

    var timestamp = data.timestamp || new Date().toISOString();
    var token = data.token || "";
    var pageUrl = data.pageUrl || "";
    var userAgent = data.userAgent || "";
    var text = data.wish || data.message || "";

    var sheetText = type === "hug"
      ? ("[hug] " + (text || "🫂 Notfall-Umarmung gebraucht"))
      : text;

    sheet.appendRow([timestamp, token, sheetText, pageUrl, userAgent]);

    if (type === "hug") {
      try {
        sendHugEmail_({
          timestamp: timestamp,
          token: token,
          message: text || "🫂 Notfall-Umarmung gebraucht",
          pageUrl: pageUrl,
          userAgent: userAgent
        });
      } catch (mailErr) {
        // Logging only; the row is already saved so the ping is not lost.
        console.error("Hug email failed: " + (mailErr && mailErr.message ? mailErr.message : mailErr));
      }
    }

    return jsonResponse_({ ok: true, type: type });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doGet(e) {
  // Useful for a quick browser smoke test once deployed.
  return jsonResponse_({
    ok: true,
    hint: "POST JSON {timestamp, token, type, wish|message, pageUrl, userAgent}. type=\"hug\" also emails " + HUG_EMAIL_TO + "."
  });
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

function normaliseType_(data) {
  var raw = (data && (data.type || data.event)) || "";
  var t = String(raw).toLowerCase().trim();
  if (t === "hug" || t === "umarmung" || t === "emergency-hug") return "hug";
  return "wish";
}

function sendHugEmail_(info) {
  var who = info.token || "Lennart";
  var when = info.timestamp || new Date().toISOString();
  var body =
    "Hallo Fionn,\n\n" +
    who + " hat gerade die Notfall-Umarmung im Affektions-Automaten gedrückt 🫂\n\n" +
    "Botschaft: " + info.message + "\n" +
    "Zeitpunkt: " + when + "\n" +
    (info.pageUrl ? ("Seite: " + info.pageUrl + "\n") : "") +
    (info.userAgent ? ("Gerät: " + info.userAgent + "\n") : "") +
    "\n— der Affektions-Automat";

  var htmlBody =
    "<p>Hallo Fionn,</p>" +
    "<p><strong>" + escapeHtml_(who) + "</strong> hat gerade die <em>Notfall-Umarmung</em> im Affektions-Automaten gedrückt 🫂</p>" +
    "<p style=\"font-size:1.1em\">" + escapeHtml_(info.message) + "</p>" +
    "<p style=\"color:#666;font-size:.9em\">Zeitpunkt: " + escapeHtml_(when) +
    (info.pageUrl ? ("<br>Seite: <a href=\"" + escapeHtml_(info.pageUrl) + "\">" + escapeHtml_(info.pageUrl) + "</a>") : "") +
    (info.userAgent ? ("<br>Gerät: " + escapeHtml_(info.userAgent)) : "") +
    "</p>" +
    "<p style=\"color:#888;font-size:.85em\">— der Affektions-Automat</p>";

  MailApp.sendEmail({
    to: HUG_EMAIL_TO,
    subject: HUG_EMAIL_SUBJECT,
    body: body,
    htmlBody: htmlBody,
    name: "Affektions-Automat"
  });
}

function escapeHtml_(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
