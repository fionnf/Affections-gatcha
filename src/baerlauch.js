// ── Bärlauch mini-game ────────────────────────────────────────────────────────
import { state, $ } from "./state.js";
import { getToken } from "./utils.js";
import { triggerConfetti } from "./confetti.js";
import { imagePhotos } from "./pull.js";
import { renderMediaInto } from "./render.js";
import { readBaerlauchScores, readBaerlauchHistory } from "./storage.js";
import { dateKeyInTimezone } from "./utils.js";

export const BAERLAUCH_LEVELS = [
  { timeMs: 20000, good: 10, bad: 8, speedMin: 3.2, speedMax: 3.7 },
  { timeMs: 17000, good: 10, bad: 12, speedMin: 3.0, speedMax: 3.7 },
  { timeMs: 14500, good: 12, bad: 18, speedMin: 2.8, speedMax: 3.6 },
  { timeMs: 12200, good: 14, bad: 20, speedMin: 2.6, speedMax: 3.3 },
  { timeMs: 10200, good: 14, bad: 25, speedMin: 1.45, speedMax: 2.05 },
  { timeMs: 8500, good: 16, bad: 25, speedMin: 1.3, speedMax: 1.85 },
  { timeMs: 7000, good: 18, bad: 28, speedMin: 1.15, speedMax: 1.65 },
  { timeMs: 5800, good: 20, bad: 30, speedMin: 1.0, speedMax: 1.45 },
  { timeMs: 4700, good: 22, bad: 30, speedMin: 0.9, speedMax: 1.25 },
  { timeMs: 3800, good: 30, bad: 30, speedMin: 0.4, speedMax: 0.8 }
];

export function baerlauchConfigForLevel(level) {
  return BAERLAUCH_LEVELS[Math.min(level - 1, BAERLAUCH_LEVELS.length - 1)];
}

export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function updateBaerlauchLevelText() {
  const el = $("#ag-baerlauch-level");
  if (el) el.textContent = `Level ${state.baerlauch.level}`;
}

export function stopBaerlauchTimer() {
  if (state.baerlauch.timerId) {
    clearInterval(state.baerlauch.timerId);
    state.baerlauch.timerId = null;
  }
}

export function failBaerlauchGame(reason) {
  const field = $("#ag-baerlauch-field");
  const success = $("#ag-baerlauch-success");
  const reward = $("#ag-baerlauch-reward");
  const rewardPhoto = $("#ag-baerlauch-photo");
  const rewardText = $("#ag-baerlauch-text");
  const actions = $("#ag-baerlauch-actions");

  if (actions) actions.hidden = true;

  stopBaerlauchTimer();
  state.baerlauch.locked = true;

  if (field) {
    field.innerHTML = `<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>`;
  }

  if (reward) reward.hidden = true;
  if (rewardPhoto) rewardPhoto.innerHTML = "";
  if (rewardText) rewardText.textContent = "";

  if (success) {
    success.hidden = false;
    success.style.color = "#fff";
    success.textContent =
      reason === "timeout"
        ? "Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei."
        : "Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei.";
  }
  saveBaerlauchRound(getToken(), state.baerlauch.level, false);
  updateBaerlauchScoreDisplay();
}

export function winBaerlauchGame() {
  const success = $("#ag-baerlauch-success");
  const reward = $("#ag-baerlauch-reward");
  const rewardPhoto = $("#ag-baerlauch-photo");
  const rewardText = $("#ag-baerlauch-text");
  const actions = $("#ag-baerlauch-actions");
  const nextButton = $("#ag-baerlauch-next");

  stopBaerlauchTimer();

  state.baerlauch.level += 1;
  const isNewHighscore = saveBaerlauchScore(getToken(), state.baerlauch.level);
  saveBaerlauchRound(getToken(), state.baerlauch.level, true);
  updateBaerlauchScoreDisplay();
  updateBaerlauchLevelText();
  if (isNewHighscore) triggerConfetti();

  if (success) {
    success.hidden = false;
    success.textContent = "Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚";
  }

  if (reward && rewardPhoto && rewardText && state.photos && state.photos.length) {
    const imgs = imagePhotos();
    const photo = imgs.length ? imgs[Math.floor(Math.random() * imgs.length)] : null;
    renderMediaInto(rewardPhoto, photo);
    reward.hidden = false;

    const lines = [
      "Du bist eindeutig mein Lieblingsfund.",
      "Mit dir würde ich jederzeit wieder Bärlauch sammeln.",
      "Sehr beruhigend, dass du uns nicht vergiftet hast.",
      "Wald mit dir > fast alles andere.",
      "Das war ausgesprochen sammel-kompetent von dir.",
      "Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.",
      "Du sammelst Bärlauch so gut wie du alles andere machst.",
      "Nächstes Mal bring ich Käse. Du bringst dich.",
      "Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.",
      "So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.",
      "Rekord. Und du weißt genau, dass ich damit dich meine.",
      "Botanik-Talent plus gute Gesellschaft. Was will man mehr.",
      "Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.",
      "Pesto später? Verdient."
    ];
    rewardText.textContent = lines[Math.floor(Math.random() * lines.length)];
  }
  if (nextButton) {
    nextButton.textContent = `Level ${state.baerlauch.level} starten`;
  }

  if (actions) {
    actions.hidden = false;
  }
}

export function startBaerlauchTimer(onTimeout) {
  const timerEl = $("#ag-baerlauch-timer");
  const darknessEl = $("#ag-baerlauch-darkness");
  const config = baerlauchConfigForLevel(state.baerlauch.level);
  const durationMs = config.timeMs;

  state.baerlauch.durationMs = durationMs;
  state.baerlauch.startedAt = performance.now();

  stopBaerlauchTimer();

  state.baerlauch.timerId = setInterval(() => {
    const elapsed = performance.now() - state.baerlauch.startedAt;
    const remaining = Math.max(0, durationMs - elapsed);
    const progress = Math.min(1, elapsed / durationMs);

    if (timerEl) timerEl.textContent = (remaining / 1000).toFixed(1);
    if (darknessEl) darknessEl.style.opacity = String(Math.pow(progress, 1.5) * 0.92);

    const items = document.querySelectorAll(".ag-forage-item");
    const itemDarkness = Math.pow(progress, 1.4);

    items.forEach((item) => {
      item.style.filter = `brightness(${1 - itemDarkness * 0.72}) saturate(${1 - itemDarkness * 0.45}) hue-rotate(${itemDarkness * 8}deg)`;
      item.style.opacity = String(1 - itemDarkness * 0.28);
    });

    if (remaining <= 0) {
      stopBaerlauchTimer();
      onTimeout();
    }
  }, 50);
}

export function openBaerlauchGame() {
  const panel = $("#ag-baerlauch-panel");
  const field = $("#ag-baerlauch-field");
  const success = $("#ag-baerlauch-success");
  const reward = $("#ag-baerlauch-reward");
  const rewardPhoto = $("#ag-baerlauch-photo");
  const rewardText = $("#ag-baerlauch-text");
  const actions = $("#ag-baerlauch-actions");

  if (!panel || !field || !success || !reward || !rewardPhoto || !rewardText) return;

  panel.hidden = false;
  updateBaerlauchScoreDisplay();
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (state.baerlauch.locked) {
    success.hidden = false;
    success.textContent = "Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";
    return;
  }

  field.innerHTML = `<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>`;
  success.hidden = true;
  reward.hidden = true;
  rewardPhoto.innerHTML = "";
  rewardText.textContent = "";
  if (actions) actions.hidden = true;
  updateBaerlauchLevelText();

  const config = baerlauchConfigForLevel(state.baerlauch.level);

  const goodPool = [
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃",
    "🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱",
    "🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"
  ];

  const badPool = [
    "🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂",
    "💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸",
    "☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄",
    "🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂",
     "🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂",
    "💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸",
    "☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄",
    "🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂",
     "🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂",
    "💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸",
    "☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄",
    "🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"
  ];

  const items = [
    ...goodPool.slice(0, config.good).map((emoji) => ({ emoji, good: true })),
    ...badPool.slice(0, config.bad).map((emoji) => ({ emoji, good: false }))
  ];

  let collectedGood = 0;
  const totalGood = items.filter((item) => item.good).length;

  items.forEach((entry) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "ag-forage-item";
    item.textContent = entry.emoji;
    item.dataset.good = entry.good ? "true" : "false";

    item.style.left = `${randomBetween(8, 82)}%`;
    item.style.top = `${randomBetween(10, 72)}%`;
    item.style.setProperty("--dx", `${randomBetween(-320, 320)}px`);
    item.style.setProperty("--dy", `${randomBetween(-220, 220)}px`);
    item.style.setProperty("--dur", `${randomBetween(config.speedMin, config.speedMax)}s`);
    item.style.setProperty("--delay", `${randomBetween(-1.8, 0)}s`);

    item.addEventListener("click", () => {
      if (state.baerlauch.locked) return;

      if (item.dataset.good === "true") {
        item.classList.add("is-picked");
        item.disabled = true;
        collectedGood += 1;

        setTimeout(() => item.remove(), 140);

        if (collectedGood === totalGood) {
          winBaerlauchGame();
        }
      } else {
        failBaerlauchGame("poison");
      }
    });

    field.appendChild(item);
  });

  startBaerlauchTimer(() => failBaerlauchGame("timeout"));
}

export function closeBaerlauchGame() {
  const panel = $("#ag-baerlauch-panel");
  stopBaerlauchTimer();
  if (panel) panel.hidden = true;
}

export function saveBaerlauchScore(player, level) {
  const scores = readBaerlauchScores();
  const isNew = (scores[player] || 0) < level;
  if (isNew) {
    scores[player] = level;
    try { localStorage.setItem("affektions-gacha:baerlauch-scores:v1", JSON.stringify(scores)); } catch (_) {}
    const url = state.backup?.endpointUrl;
    if (url) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ type: "baerlauch-score", player, level }),
        headers: { "Content-Type": "application/json" }
      }).catch(() => {});
    }
  }
  return isNew;
}

export function saveBaerlauchRound(player, level, won) {
  const history = readBaerlauchHistory();
  const tz = state.theme?.timezone || "UTC";
  const date = dateKeyInTimezone(tz);
  history.unshift({ date, player, level, won });
  if (history.length > 50) history.splice(50);
  try { localStorage.setItem("affektions-gacha:baerlauch-history:v1", JSON.stringify(history)); } catch (_) {}
}

export function updateBaerlauchScoreDisplay() {
  const el = $("#ag-baerlauch-scores");
  if (!el) return;
  const player = getToken();
  const myKey = player === "fionn" ? "fionn" : "lennart";
  const theirName = myKey === "lennart" ? "Fionn" : "Lennart";
  const scores = readBaerlauchScores();
  const history = readBaerlauchHistory();
  const theirKey = myKey === "fionn" ? "lennart" : "fionn";
  const hasScores = (myKey in scores) || (theirKey in scores);
  if (!hasScores && !history.length) { el.hidden = true; return; }
  el.hidden = false;
  const tz = state.theme?.timezone || "UTC";
  const fmt = (d) => {
    try { return new Intl.DateTimeFormat("de-CH", { day: "numeric", month: "short", timeZone: tz }).format(new Date(d + "T12:00:00Z")); }
    catch (_) { return d; }
  };
  let html = "";
  if (hasScores) {
    const myBest = scores[myKey] ?? 0;
    const theirBest = scores[theirKey] ?? 0;
    html += `<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${myBest || "—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${theirName}</span><span class="ag-score-result">Level ${theirBest || "—"}</span></div>
    </div>`;
  }
  if (history.length) {
    const rows = history.slice(0, 8).map(r => {
      const isMe = r.player === myKey;
      const nameClass = isMe ? "ag-score-mine" : "ag-score-theirs";
      const name = isMe ? "Du" : theirName;
      const result = r.won ? `✓ Level ${r.level}` : `✗ Level ${r.level - 1 >= 1 ? r.level - 1 : "–"}`;
      return `<div class="ag-score-row"><span class="ag-score-date">${fmt(r.date)}</span><span class="ag-score-pill ${nameClass}">${name}</span><span class="ag-score-result">${result}</span></div>`;
    }).join("");
    html += `<div class="ag-score-table">${rows}</div>`;
  }
  el.innerHTML = html;
}
