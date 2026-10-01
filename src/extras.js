// ── Gespräch / Quest / Letter ────────────────────────────────────────────────
// The daily missions that used to live here went with the two-player half of
// the app; what is left are the conversation prompt, the (currently disabled)
// photo quest and the hidden letter.
import { state, $ } from "./state.js";
import { currentChallenge } from "./utils.js";
import { readQuestState, writeQuestState, readQuestPoints, addQuestPoints } from "./storage.js";
import { QUEST_POINTS_SCHEDULE, GESPRACH_IDX_KEY } from "./constants.js";
import { backupToSheets } from "./sync.js";
import { imagePhotos } from "./pull.js";
import { haptic } from "./haptic.js";

export const GESPRACH_QUESTIONS = [
  "Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?",
  "Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?",
  "Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?",
  "Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?",
  "Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?",
  "In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?",
  "Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?",
  "Was macht dich gerade in deinem Leben am stolzesten?",
  "Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?",
  "Wann fühlst du dich bei mir am geborgensten?",
  "Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?",
  "Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?",
  "Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?",
  "Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?",
  "Was würde die Version von uns in 10 Jahren über uns heute denken?",
  "Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?",
  "Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?",
  "Was ist etwas, das du von mir gelernt hast?",
  "Was fehlt dir gerade, und wie könnte ich helfen?",
  "Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?",
  "Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?",
  "Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?",
  "Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?",
  "Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?",
  "Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?",
  "Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?",
  "Welchen meiner Züge findest du am lustigsten?",
  "Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?",
  "Wenn ich ein Tier wäre — welches, und warum genau das?",
  "Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?",
  // Sixty more: a month of questions was a month before the first repeat.
  "Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?",
  "Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?",
  "Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?",
  "Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?",
  "Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?",
  "Welches Lied erinnert dich an uns, ohne dass ich das je wusste?",
  "Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?",
  "Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?",
  "Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?",
  "Woran merkst du, dass ich gerade einen guten Tag habe?",
  "Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?",
  "Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?",
  "Was ist etwas, das du als Kind geliebt hast und heute vergisst?",
  "Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?",
  "Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?",
  "Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?",
  "Welcher Streit war im Nachhinein der nützlichste?",
  "Was macht dich an mir manchmal nervös, und ist das schlimm?",
  "Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?",
  "Was ist dein Lieblingsbild von uns, und warum genau das?",
  "Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?",
  "Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?",
  "Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?",
  "Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?",
  "Was wünschst du dir für mich, das nichts mit dir zu tun hat?",
  "Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?",
  "Was war das Erste, das dir an meiner Wohnung aufgefallen ist?",
  "Welche Angewohnheit von mir hast du inzwischen übernommen?",
  "Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?",
  "Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?",
  "Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?",
  "Welcher Geruch gehört für dich zu mir?",
  "Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?",
  "Worauf freust du dich im Winter, worauf im Sommer?",
  "Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?",
  "Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?",
  "Wann hast du zuletzt gedacht: genau das hier, so soll es sein?",
  "Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?",
  "Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?",
  "Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?",
  "Welchen Teil deines Alltags würdest du mir gern öfter zeigen?",
  "Was glaubst du, worin ich dich unterschätze?",
  "Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?",
  "Welche Jahreszeit passt zu uns, und warum?",
  "Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?",
  "Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?",
  "Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?",
  "Was ist eine Tradition, die wir uns ausdenken sollten?",
  "Was macht dich zuverlässig fröhlich, und mache ich davon genug?",
  "Welche Seite von dir glaubst du, kenne ich noch gar nicht?",
  "Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?",
  "Was wäre dein perfekter Sonntagmorgen, bis ins Detail?",
  "Was ist eine Sache, über die wir nie reden, und sollten wir?",
  "Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?",
  "Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?",
  "Was würdest du gern öfter von mir hören?",
  "Welche Ecke von Zürich fühlt sich am meisten nach uns an?",
  "Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?",
  "Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?",
  "Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"
];

export const LETTER_FALLBACKS = [
  ["Du bist mein Lieblingsmensch.", "Jeden Tag ein bisschen mehr als am Tag davor.", "Pass auf dich auf."],
  ["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.", "Ich find es schön, dass wir so sind. Einfach so."],
  ["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.", "Das wollte ich irgendwo festhalten."],
  ["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.", "Aber hier, wo es niemand sieht: Du machst alles besser."],
  ["Nicht jeder findet seine Geheimverstecke. Du schon.", "Danke, dass du so bist wie du bist."],
  ["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.", "Kein Drama, kein Aufwand — einfach sehr gut."],
  ["Ich bin froh, dass du in meinem Leben bist.", "So einfach ist das."]
];

let gesprachCurrentIndex = -1;

export function openGesprachPanel() {
  const panel = $("#ag-gesprach-panel");
  if (!panel) return;
  panel.hidden = false;
  // Restore saved question; only pick a new one if none saved yet
  try {
    const saved = localStorage.getItem(GESPRACH_IDX_KEY);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (Number.isFinite(idx) && idx >= 0 && idx < GESPRACH_QUESTIONS.length) {
        gesprachCurrentIndex = idx;
        const el = $("#ag-gesprach-question");
        if (el) el.textContent = GESPRACH_QUESTIONS[idx];
        return;
      }
    }
  } catch (_) {}
  showNextGesprach();
}

export function closeGesprachPanel() {
  const panel = $("#ag-gesprach-panel");
  if (panel) panel.hidden = true;
}

export function showNextGesprach() {
  let idx;
  do {
    idx = Math.floor(Math.random() * GESPRACH_QUESTIONS.length);
  } while (idx === gesprachCurrentIndex && GESPRACH_QUESTIONS.length > 1);
  gesprachCurrentIndex = idx;
  try { localStorage.setItem(GESPRACH_IDX_KEY, String(idx)); } catch (_) {}
  const el = $("#ag-gesprach-question");
  if (el) el.textContent = GESPRACH_QUESTIONS[idx];
}

export function sendGesprachToWhatsApp() {
  const question = GESPRACH_QUESTIONS[gesprachCurrentIndex] || "";
  if (!question) return;
  const template = (state.theme && state.theme.messageTarget) || "https://wa.me/?text={text}";
  const text = encodeURIComponent("💬 Gespräch-Frage:\n\n" + question + "\n\n(via Affektions-Gacha)");
  const url = template.replace("{text}", text);
  window.location.href = url;
}

export function isQuestAvailable() {
  return !!(state.quest?.enabled && currentChallenge(state));
}

export function openQuestPanel() {
  const panel = $("#ag-quest-panel");
  if (!panel) return;
  panel.hidden = false;
  renderQuestPanel();
}

export function closeQuestPanel() {
  const panel = $("#ag-quest-panel");
  if (panel) panel.hidden = true;
}

export function renderQuestPanel() {
  const challengeObj = currentChallenge(state);
  const qs = readQuestState();
  const challengeEl = $("#ag-quest-challenge");
  const historyEl   = $("#ag-quest-hint-history");
  const loadingEl   = $("#ag-quest-loading");
  const actionsEl   = $("#ag-quest-actions");
  const resultEl    = $("#ag-quest-result");
  const pointsEl    = $("#ag-quest-points");
  const copyEl      = $("#ag-quest-copy");
  const titleEl     = $("#ag-quest-title");
  const prompt      = challengeObj?.prompt || "";

  if (!challengeObj) {
    if (titleEl) titleEl.textContent = "Keine Aufgabe";
    if (copyEl) copyEl.textContent = "Schau später nochmal vorbei.";
    if (challengeEl) challengeEl.textContent = "";
    if (actionsEl) actionsEl.hidden = true;
    return;
  }

  if (challengeEl) challengeEl.textContent = prompt;
  if (loadingEl) loadingEl.hidden = true;

  // Hint history
  if (historyEl) {
    if (qs.hints && qs.hints.length > 0) {
      historyEl.innerHTML = qs.hints.map((h, i) =>
        `<div class="ag-hint-item"><span class="ag-hint-num">${i + 1}</span><p>${h}</p></div>`
      ).join("");
      historyEl.hidden = false;
    } else {
      historyEl.hidden = true;
    }
  }

  if (qs.solved) {
    if (titleEl) titleEl.textContent = "Aufgabe gelöst ✓";
    if (copyEl) copyEl.textContent = "Gut gemacht.";
    if (actionsEl) actionsEl.hidden = true;
    if (resultEl) { resultEl.textContent = qs.successMessage || ""; resultEl.hidden = false; }
    if (pointsEl) {
      pointsEl.textContent = `+${qs.pointsEarned} Punkte · Gesamt: ${readQuestPoints()}`;
      pointsEl.hidden = false;
    }
    return;
  }

  if (titleEl) titleEl.textContent = "Foto-Aufgabe 📷";
  if (copyEl) copyEl.textContent = qs.attempts === 0
    ? "Fotografiere und schick mir das Resultat."
    : `Versuch ${qs.attempts + 1} — du schaffst das.`;
  if (actionsEl) actionsEl.hidden = false;
  if (resultEl) resultEl.hidden = true;
  if (pointsEl) pointsEl.hidden = true;
}

export async function handleQuestPhoto(file) {
  if (!file) return;
  const actionsEl  = $("#ag-quest-actions");
  const loadingEl  = $("#ag-quest-loading");
  const resultEl   = $("#ag-quest-result");
  const pointsEl   = $("#ag-quest-points");
  const copyEl     = $("#ag-quest-copy");

  if (actionsEl) actionsEl.hidden = true;
  if (loadingEl) loadingEl.hidden = false;
  if (resultEl) resultEl.hidden = true;

  const base64 = await fileToBase64(file);
  const qs = readQuestState();
  const challengeObj = currentChallenge(state);
  const challenge = challengeObj?.prompt || "";
  const solution  = challengeObj?.solution || "";

  try {
    const result = await callQuestProxy(base64, challenge, solution, qs.attempts + 1, qs.hints);
    qs.attempts += 1;

    if (result.success) {
      const pts = QUEST_POINTS_SCHEDULE[Math.min(qs.attempts - 1, QUEST_POINTS_SCHEDULE.length - 1)];
      const total = addQuestPoints(pts);
      qs.solved = true;
      qs.pointsEarned = pts;
      qs.successMessage = result.message || "Perfekt.";
      writeQuestState(qs);
      backupToSheets();
      if (resultEl) { resultEl.textContent = result.message || "Perfekt."; resultEl.hidden = false; }
      if (pointsEl) { pointsEl.textContent = `+${pts} Punkte · Gesamt: ${total}`; pointsEl.hidden = false; }
      if (loadingEl) loadingEl.hidden = true;
      if (copyEl) copyEl.textContent = "Aufgabe gelöst ✓";
      if (actionsEl) actionsEl.hidden = true;
      const chip = $("#ag-btn-quest");
      if (chip) chip.classList.remove("ag-chip-quest-active");
      haptic([20, 20, 40, 20, 60]);
    } else {
      if (loadingEl) loadingEl.hidden = true;
      qs.hints = [...(qs.hints || []), result.hint || "Versuch nochmal."];
      writeQuestState(qs);
      renderQuestPanel();
    }
  } catch (_e) {
    if (loadingEl) loadingEl.hidden = true;
    if (resultEl) { resultEl.textContent = "Fehler — versuch nochmal."; resultEl.hidden = false; }
    if (actionsEl) actionsEl.hidden = false;
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function callQuestProxy(base64, challenge, solution, attemptNumber, previousHints) {
  const url = state.quest?.proxyUrl;
  if (!url) throw new Error("no proxy");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ base64, challenge, solution, attemptNumber, previousHints })
  });
  if (!res.ok) throw new Error("proxy error");
  return res.json();
}

export function playLetterSound() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const t = ctx.currentTime;

    // Soft filtered noise whoosh
    const bufLen = Math.floor(ctx.sampleRate * 0.9);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const bd = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) bd[i] = Math.random() * 2 - 1;
    const ns = ctx.createBufferSource();
    ns.buffer = buf;
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass"; nf.Q.value = 1.2;
    nf.frequency.setValueAtTime(500, t);
    nf.frequency.exponentialRampToValueAtTime(2200, t + 0.55);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t);
    ng.gain.linearRampToValueAtTime(0.055, t + 0.06);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
    ns.connect(nf); nf.connect(ng); ng.connect(ctx.destination);
    ns.start(t); ns.stop(t + 0.9);

    // Three staggered ascending tones (chord opening)
    [[290, 640, 0, 1.5, 0.12], [435, 870, 0.07, 1.3, 0.08], [580, 1100, 0.14, 1.1, 0.05]].forEach(([f0, f1, delay, dur, vol]) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f0, t + delay);
      osc.frequency.exponentialRampToValueAtTime(f1, t + delay + dur * 0.55);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t + delay);
      g.gain.linearRampToValueAtTime(vol, t + delay + 0.09);
      g.gain.exponentialRampToValueAtTime(0.001, t + delay + dur);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t + delay); osc.stop(t + delay + dur + 0.05);
    });
  } catch (_) {}
}

export function showLetterLoading(el) {
  const text = "you didn't see this message coming did you…";
  const p = document.createElement("p");
  p.className = "ag-letter-prelude";
  text.split(" ").forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "ag-letter-word";
    span.textContent = word;
    span.style.animationDelay = `${320 + i * 155}ms`;
    p.appendChild(span);
    p.appendChild(document.createTextNode(" "));
  });
  el.innerHTML = "";
  el.appendChild(p);
}

export function revealLetterContent(body, paras) {
  body.innerHTML = paras.map((p) => `<p>${p}</p>`).join("") +
    '<p class="ag-letter-sign">— Fionn 🍀</p>';
  body.style.animation = "none";
  body.getBoundingClientRect();
  body.style.animation = "";
}

export function openLetter() {
  const overlay = $("#ag-letter-overlay");
  if (!overlay) return;
  overlay.hidden = false;
  overlay.focus();
  haptic([20, 60, 20]);
  playLetterSound();

  const img = $("#ag-letter-photo");
  if (img && state.photos && state.photos.length) {
    const imgs = imagePhotos();
    const photo = imgs.length ? imgs[Math.floor(Math.random() * imgs.length)] : null;
    if (photo) { img.src = photo.url; img.hidden = false; }
  }

  renderLetterMessage();
}

export async function renderLetterMessage() {
  const body = $("#ag-letter-body");
  if (!body) return;
  showLetterLoading(body);

  const proxyUrl = state.quest?.proxyUrl;
  if (proxyUrl) {
    try {
      const res = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ type: "letter" })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.paragraphs && data.paragraphs.length) {
          revealLetterContent(body, data.paragraphs);
          return;
        }
      }
    } catch (_) {}
  }

  const paras = LETTER_FALLBACKS[Math.floor(Math.random() * LETTER_FALLBACKS.length)];
  revealLetterContent(body, paras);
}

export function closeLetter() {
  const overlay = $("#ag-letter-overlay");
  if (overlay) overlay.hidden = true;
}
