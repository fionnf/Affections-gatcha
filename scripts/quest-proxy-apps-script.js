/**
 * Affections-Gacha — Quest Vision Proxy
 *
 * Paste into a NEW Google Apps Script project (separate from the backup script).
 * Deploy as a Web App:
 *   - Execute as: Me
 *   - Who has access: Anyone
 *
 * After deploying, copy the web app URL into config/quest.json → proxyUrl.
 *
 * Set your OpenAI API key below.
 */

const OPENAI_API_KEY = "sk-YOUR_KEY_HERE";
const OPENAI_MODEL   = "gpt-4o-mini";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Hidden letter: generate a fresh personal note from Fionn to Lennart
    if (data.type === "letter") {
      const systemPrompt =
        `Du bist Fionn, ein irischer Mann der in Zürich lebt und eine romantische Gacha-App für seinen Partner Lennart gebaut hat. ` +
        `Schreib eine sehr kurze, persönliche Nachricht an Lennart — warm, direkt, kein Drama, keine Floskeln. ` +
        `Auf Deutsch. Niemals "Ich liebe dich" — das haben wir noch nicht gesagt. ` +
        `Antworte NUR mit einem JSON-Objekt: {"paragraphs": ["...", "..."]} ` +
        `mit genau 2 kurzen Sätzen/Absätzen. Gesamt unter 70 Wörter. Jedes Mal etwas anderes. ` +
        `Themen: kleine Momente, Dinge die dir an Lennart auffallen, warum du die Maschine gebaut hast, ` +
        `Erinnerungen (Zürich, Fahrrad, essen gehen, Reisen), wie froh du bist dass es ihn gibt.`;

      const payload = {
        model: OPENAI_MODEL,
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "Schreib die Nachricht." }],
        max_tokens: 180,
        temperature: 1.1,
        response_format: { type: "json_object" }
      };

      const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
        method: "post",
        contentType: "application/json",
        headers: { Authorization: "Bearer " + OPENAI_API_KEY },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });

      const json = JSON.parse(response.getContentText());
      if (json.error) return jsonOut_({ ok: false, error: json.error.message });
      const content = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
      const result = JSON.parse(content || "{}");
      return jsonOut_({ ok: true, ...result });
    }

    const { base64, challenge, solution, attemptNumber, previousHints } = data;
    if (!base64 || !challenge) return jsonOut_({ ok: false, error: "missing fields" });

    const hintsText = previousHints && previousHints.length
      ? "\n\nHints already given (do NOT repeat these, each new hint must be more concrete):\n" +
        previousHints.map((h, i) => `${i + 1}. ${h}`).join("\n")
      : "";

    const systemPrompt =
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
      `Respond ONLY in German with a JSON object.\n` +
      `If the photo fulfills the challenge: {"success": true, "message": "..."} — ` +
      `a short poetic confirmation, max 2 sentences, warm and personal.\n` +
      `If not: {"success": false, "hint": "..."} — ` +
      `one cryptic sentence that nudges without giving away. Never start with "Versuch" or "Du solltest".`;

    const payload = {
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "data:image/jpeg;base64," + base64, detail: "low" } }
          ]
        }
      ],
      max_tokens: 120,
      response_format: { type: "json_object" }
    };

    const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + OPENAI_API_KEY },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const json = JSON.parse(response.getContentText());
    if (json.error) return jsonOut_({ ok: false, error: json.error.message });

    const content = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
    const result = JSON.parse(content || "{}");
    return jsonOut_({ ok: true, ...result });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  }
}

function doGet() {
  return jsonOut_({ ok: true, hint: "POST {base64, challenge, attemptNumber, previousHints[]}" });
}

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
