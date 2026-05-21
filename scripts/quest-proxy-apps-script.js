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

    const { base64, challenge, attemptNumber, previousHints } = data;
    if (!base64 || !challenge) return jsonOut_({ ok: false, error: "missing fields" });

    const hintsText = previousHints && previousHints.length
      ? "\n\nPrevious hints already given:\n" + previousHints.map((h, i) => `${i + 1}. ${h}`).join("\n")
      : "";

    const systemPrompt =
      `Du bist der Richter einer romantischen Foto-Aufgabe für eine App. ` +
      `Die Aufgabe lautet: "${challenge}". ` +
      `Dies ist Versuch ${attemptNumber}.` + hintsText + `\n\n` +
      `Beurteile das Foto auf Deutsch. Antworte NUR mit einem JSON-Objekt.\n` +
      `Wenn das Foto die Aufgabe erfüllt: {"success": true, "message": "..."} — ` +
      `eine kurze, poetische Bestätigung, maximal 2 Sätze, warm und persönlich.\n` +
      `Wenn nicht: {"success": false, "hint": "..."} — ` +
      `ein subtiler Hinweis, der näher führt aber nie die Antwort verrät. ` +
      `Jeder Hinweis soll konkreter sein als der vorherige. Maximal 1 Satz.`;

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
