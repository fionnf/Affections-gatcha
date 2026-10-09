/**
 * Affections-Gacha — Quest Vision Proxy (Claude)
 *
 * Paste into a NEW Google Apps Script project (separate from the backup script).
 * Deploy as a Web App:
 *   - Execute as: Me
 *   - Who has access: Anyone
 *
 * After deploying, copy the web app URL into config/quest.json → proxyUrl.
 *
 * API key: put it in the project's Script Properties as ANTHROPIC_API_KEY
 * (Project Settings → Script properties), or paste it into the constant
 * below. Script Properties win when both are set.
 *
 * Two jobs, both answered by Claude through the Messages API:
 *   - {type: "letter"}                      → {ok, paragraphs: [..., ...]}
 *   - {base64, challenge, solution, ...}    → {ok, success, message | hint}
 *
 * Run testLetter() / testJudge() from the editor to check the key and the
 * model before deploying.
 */

const ANTHROPIC_API_KEY_FALLBACK = "sk-ant-YOUR_KEY_HERE";
const CLAUDE_MODEL = "claude-opus-5-5";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
// Server-side refusal fallback: if the model declines for a safety reason the
// API re-runs the request on a fallback model inside the same call.
const ANTHROPIC_BETA = "server-side-fallback-2026-07-01";

// Nudges that keep the letters different from one another now that the
// request carries no sampling temperature.
const LETTER_THEMES = [
  "ein kleiner Moment von heute oder gestern",
  "etwas, das dir an Lennart auffällt und das er selbst nicht merkt",
  "warum du die Maschine überhaupt gebaut hast",
  "eine Erinnerung an Zürich",
  "eine Fahrradfahrt",
  "ein Abend beim Essen",
  "eine Reise, die ihr gemacht habt oder machen wollt",
  "wie froh du bist, dass es ihn gibt",
  "ein Geräusch oder ein Geruch, der dich an ihn erinnert",
  "etwas, worauf du dich mit ihm freust"
];
const LETTER_TONES = ["leise", "verschmitzt", "nüchtern und warm", "ein bisschen albern", "direkt"];

function apiKey_() {
  try {
    const k = PropertiesService.getScriptProperties().getProperty("ANTHROPIC_API_KEY");
    if (k) return k;
  } catch (_e) {}
  return ANTHROPIC_API_KEY_FALLBACK;
}

function pick_(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Sniffs the image type from the first base64 characters; the app sends
// JPEG, but a raw upload might not.
function imageMediaType_(base64) {
  if (/^iVBOR/.test(base64)) return "image/png";
  if (/^R0lGOD/.test(base64)) return "image/gif";
  if (/^UklGR/.test(base64)) return "image/webp";
  return "image/jpeg";
}

// One Messages API call that must come back as JSON matching `schema`.
// Throws with a readable message on an API error, a refusal, or a cut-off
// answer; the caller turns that into {ok: false, error}.
function askClaude_(system, content, schema, maxTokens) {
  const payload = {
    model: CLAUDE_MODEL,
    max_tokens: maxTokens || 1024,
    system: system,
    messages: [{ role: "user", content: content }],
    output_config: {
      effort: "low",
      format: { type: "json_schema", schema: schema }
    },
    fallbacks: "default"
  };
  const response = UrlFetchApp.fetch(ANTHROPIC_URL, {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-api-key": apiKey_(),
      "anthropic-version": ANTHROPIC_VERSION,
      "anthropic-beta": ANTHROPIC_BETA
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  const json = JSON.parse(response.getContentText());
  if (json.type === "error" || json.error) {
    throw new Error((json.error && json.error.message) || ("Claude HTTP " + response.getResponseCode()));
  }
  if (json.stop_reason === "refusal") {
    const cat = json.stop_details && json.stop_details.category;
    throw new Error("Claude hat abgelehnt" + (cat ? " (" + cat + ")" : ""));
  }
  if (json.stop_reason === "max_tokens") throw new Error("Antwort abgeschnitten");
  const text = (json.content || []).filter(function (b) { return b.type === "text"; }).map(function (b) { return b.text; }).join("");
  return JSON.parse(text || "{}");
}

// Hidden letter: a fresh personal note from Fionn to Lennart.
function letter_() {
  const system =
    `Du bist Fionn, ein irischer Mann der in Zürich lebt und eine romantische Gacha-App für seinen Partner Lennart gebaut hat. ` +
    `Schreib eine sehr kurze, persönliche Nachricht an Lennart — warm, direkt, kein Drama, keine Floskeln. ` +
    `Auf Deutsch. Niemals "Ich liebe dich" — das haben wir noch nicht gesagt. ` +
    `Genau 2 kurze Absätze, je ein bis zwei Sätze. Gesamt unter 70 Wörter. Jedes Mal etwas anderes. ` +
    `Themen: kleine Momente, Dinge die dir an Lennart auffallen, warum du die Maschine gebaut hast, ` +
    `Erinnerungen (Zürich, Fahrrad, essen gehen, Reisen), wie froh du bist dass es ihn gibt.`;
  const user =
    `Schreib die Nachricht. Thema diesmal: ${pick_(LETTER_THEMES)}. Ton: ${pick_(LETTER_TONES)}. ` +
    `Fang nicht mit "Lennart," an.`;
  const schema = {
    type: "object",
    properties: { paragraphs: { type: "array", items: { type: "string" } } },
    required: ["paragraphs"],
    additionalProperties: false
  };
  const result = askClaude_(system, user, schema, 512);
  const paragraphs = (result.paragraphs || []).filter(function (p) { return typeof p === "string" && p.trim(); }).slice(0, 2);
  if (!paragraphs.length) throw new Error("leere Nachricht");
  return { ok: true, paragraphs: paragraphs };
}

// Photo challenge: does the picture fulfil the task? Hints never give the
// answer away.
function judge_(data) {
  const base64 = data.base64;
  const challenge = data.challenge;
  const solution = data.solution;
  const attemptNumber = data.attemptNumber;
  const previousHints = data.previousHints;
  if (!base64 || !challenge) return { ok: false, error: "missing fields" };

  const hintsText = previousHints && previousHints.length
    ? "\n\nHints already given (do NOT repeat these, each new hint must be more concrete):\n" +
      previousHints.map(function (h, i) { return (i + 1) + ". " + h; }).join("\n")
    : "";

  const system =
    `You are judging a photo challenge for a romantic app. ` +
    `The challenge (shown to the user): "${challenge}". ` +
    `What counts as a correct answer (NEVER reveal this to the user): "${solution}". ` +
    `This is attempt ${attemptNumber}.` + hintsText + `\n\n` +
    `STRICT RULES:\n` +
    `- NEVER say the answer, name the correct subject, or give away what to photograph.\n` +
    `- NEVER make hints too easy — this should take up to 10 attempts.\n` +
    `- Each hint must be slightly more concrete than the last, but still cryptic.\n` +
    `- First hints should be poetic and atmospheric. Later hints can be more direct but still oblique.\n` +
    `- Accept any photo that genuinely fulfills the spirit of the challenge.\n\n` +
    `Answer in German, as JSON.\n` +
    `If the photo fulfills the challenge: success true, and in "message" a short poetic confirmation, ` +
    `max 2 sentences, warm and personal; leave "hint" empty.\n` +
    `If not: success false, and in "hint" one cryptic sentence that nudges without giving away. ` +
    `Never start with "Versuch" or "Du solltest"; leave "message" empty.`;

  const content = [
    { type: "image", source: { type: "base64", media_type: imageMediaType_(base64), data: base64 } },
    { type: "text", text: "Hier ist das Foto. Beurteile es." }
  ];
  const schema = {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      hint: { type: "string" }
    },
    required: ["success", "message", "hint"],
    additionalProperties: false
  };
  const result = askClaude_(system, content, schema, 512);
  return result.success
    ? { ok: true, success: true, message: result.message || "" }
    : { ok: true, success: false, hint: result.hint || "" };
}

function handle_(data) {
  if (data && data.type === "letter") return letter_();
  return judge_(data || {});
}

function doPost(e) {
  try {
    return jsonOut_(handle_(JSON.parse(e.postData.contents)));
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

function doGet() {
  return jsonOut_({ ok: true, hint: "POST {base64, challenge, solution, attemptNumber, previousHints[]} or {type: \"letter\"}" });
}

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Editor checks ───────────────────────────────────────────────────────────
function testLetter() {
  Logger.log(JSON.stringify(letter_()));
}
function testJudge() {
  // A 1×1 white JPEG; expect success false and a hint.
  const tiny = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AVN//2Q==";
  Logger.log(JSON.stringify(judge_({
    base64: tiny, challenge: "Fotografiere eine leere Bank mit Aussicht.",
    solution: "An empty bench with a view behind it.", attemptNumber: 1, previousHints: []
  })));
}
