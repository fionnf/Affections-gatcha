// ── Events / UI wiring ────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { getToken, dateKeyInTimezone, hmInTimezone, safeUrl, currentQuestPeriod, dailyMsgIdx } from "./utils.js";
import { readHistory, writeWish, readWish, addToken } from "./storage.js";
import { computeStreak, streakRestoreAvailable, streakRestoresLeft, birthdayBonusLeft, streakRestoreGapDay, restoreStreak } from "./streak.js";
import { buildPull, imagePhotos } from "./pull.js";
import { playPullSound } from "./sound.js";
import { getPreviewDay } from "./utils.js";
import { syncFromSheets, backupToSheets } from "./sync.js";
import { NOTIF_KEY } from "./constants.js";
import { triggerConfetti } from "./confetti.js";
import { haptic } from "./haptic.js";
import { renderHistory, renderStreak, renderStreakRestore, renderLieblinge, renderOdds, renderWunschkapsel, toggleFavorite, messageText, hydrateCopy, displayNameFromToken, closeLightbox, renderPull, renderMilestoneBanner, recordHistoryEntry, setHistoryFilter, MILESTONE_MESSAGES } from "./render.js";
import { emojiForTone } from "./pull.js";
import { renderBergePanel, addGipfelEntry, updateGipfelEntry, bindBergeEvents, invalidateGipfelMap } from "./berge.js";
import { openBaerlauchGame, closeBaerlauchGame } from "./baerlauch.js";
import { openGesprachPanel, closeGesprachPanel, showNextGesprach, sendGesprachToWhatsApp, openQuestPanel, closeQuestPanel, handleQuestPhoto, openMissionPanel, closeMissionPanel, markMissionDone, sendMissionFeedback, isFeedbackSentToday, isQuestAvailable, openLetter, closeLetter } from "./mission.js";
import { openGlossaryPanel, closeGlossaryPanel, renderGlossaryPanel, addGlossaryWord, updateGlossaryWord, uploadGlossaryAudio, fetchGlossaryFromSheet, _glossaryCurrentLang, _glossaryAudioBlob, _glossaryRecorder } from "./glossary.js";
import { openStimmungPanel, closeStimmungPanel, bindStimmungPanel } from "./stimmung.js";
import * as glossaryMod from "./glossary.js";
import { urlFor } from "./utils.js";
import { readQuestState } from "./storage.js";
import { currentWeekKey } from "./utils.js";
import { recoverHistory } from "./init.js";

// Notification message pools (from dist)
export const DAILY_REMINDER_POOL = [
  { title: "{name}s Kapsel wartet 🎲", body: "Heute noch keine Kapsel gezogen — zieh jetzt!" },
  { title: "Guten Morgen, {name} 🌿", body: "Deine tägliche Kapsel ist bereit." },
  { title: "Die Maschine dreht sich 🎲", body: "Du hast heute noch nicht gezogen — auf geht's!" },
  { title: "{name}s tägliche Kapsel ✨", body: "Eine neue Chance — die Maschine dreht sich." },
  { title: "Heute wartet etwas 🎲", body: "Die Kapsel des Tages ist für dich bereit." },
  { title: "Zeit für die Kapsel 🌿", body: "Zieh heute und sieh, was die Maschine bereithält." },
  { title: "Die Maschine ruft 🎰", body: "Deine Kapsel läuft nicht weg — aber der Tag schon." },
];

export const STREAK_WARN_POOL = [
  { title: "{name}s Kapsel läuft ab! 🎲", body: "Noch 3 Stunden — dann ist sie weg für heute." },
  { title: "Nicht vergessen! 🎲", body: "Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht." },
  { title: "Fast zu spät, {name}! 🌙", body: "21 Uhr — in 3 Stunden ist der Tag vorbei." },
  { title: "Die Maschine wartet auf dich 🎲", body: "Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät." },
  { title: "{name}s Streak wackelt! 💎", body: "Noch 3 Stunden — dann ist der Streak in Gefahr." },
];

export function showToast(msg) {
  const container = mount.querySelector("[data-ag-toasts]");
  if (!container) return;
  const el = document.createElement("div");
  el.className = "ag-toast";
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 300);
  }, 2400);
}

export function setActiveTab(tab) {
  state.activeTab = tab;
  const tabs = mount.querySelectorAll("[data-ag-tab]");
  tabs.forEach((node) => {
    const isActive = node.dataset.agTab === tab;
    node.classList.toggle("is-active", isActive);
    node.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  // Slide the liquid glass pill to the active button's icon centre
  const PILL_W = 54;
  const activeBtn = mount.querySelector(".ag-bottomnav-btn.is-active");
  const pill = mount.querySelector(".ag-nav-pill");
  if (pill && activeBtn) {
    const nav = activeBtn.closest(".ag-bottomnav");
    const navRect = nav ? nav.getBoundingClientRect() : null;
    const icon = activeBtn.querySelector(".ag-bottomnav-btn-icon") || activeBtn;
    const iconRect = icon.getBoundingClientRect();
    if (navRect && iconRect.width) {
      const centre = iconRect.left - navRect.left + iconRect.width / 2;
      pill.style.width = `${PILL_W}px`;
      pill.style.left = `${centre - PILL_W / 2}px`;
    }
  }
  $("[data-ag-panel-today]").hidden = tab !== "today";
  $("[data-ag-panel-history]").hidden = tab !== "history";
  $("[data-ag-panel-lieblinge]").hidden = tab !== "lieblinge";
  $("[data-ag-panel-berge]").hidden = tab !== "berge";
  if (tab === "history") renderHistory();
  if (tab === "lieblinge") renderLieblinge();
  if (tab === "berge") {
    invalidateGipfelMap();
    syncFromSheets()
      .then(() => { renderBergePanel(); invalidateGipfelMap(); })
      .catch(() => renderBergePanel());
  }
  const fab = $("[data-ag-fab]");
  if (fab) fab.hidden = tab !== "berge";
}

export function sendPingToBackend() {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
  const button = $("[data-ag-ping-send]");
  const status = $("[data-ag-ping-status]");
  if (button) button.disabled = true;
  if (status) { status.hidden = false; status.textContent = "Wird gesendet…"; delete status.dataset.agHugState; }
  const body = JSON.stringify({
    type: "ping",
    token: getToken(),
    pageUrl: (typeof window !== "undefined" && window.location) ? window.location.href : "",
    userAgent: (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : ""
  });
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  fetch(cfg.endpointUrl, opts)
    .then((r) => {
      if (status) { status.textContent = "Stups gesendet 👋"; status.dataset.agHugState = "ok"; }
      if (button) window.setTimeout(() => { button.disabled = false; }, 4000);
    })
    .catch(() => {
      fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {});
      if (status) { status.textContent = "Stups gesendet 👋"; status.dataset.agHugState = "ok"; }
      if (button) window.setTimeout(() => { button.disabled = false; }, 4000);
    });
}

export function setHugStatus(text, hugState) {
  const el = $("[data-ag-hug-status]");
  if (!el) return;
  if (!text) {
    el.hidden = true;
    el.textContent = "";
    delete el.dataset.agHugState;
    return;
  }
  el.hidden = false;
  el.textContent = text;
  if (hugState) el.dataset.agHugState = hugState;
  else delete el.dataset.agHugState;
}

export function sendHugToInbox() {
  const config = state.wishInbox;
  const button = $("[data-ag-hug-send]");
  const message = "🫂 Notfall-Umarmung gebraucht";
  const payload = {
    timestamp: new Date().toISOString(),
    token: getToken(),
    type: "hug",
    event: "hug",
    wish: message,
    message,
    pageUrl: (typeof window !== "undefined" && window.location) ? window.location.href : "",
    userAgent: (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : ""
  };

  if (!config || !config.enabled) {
    setHugStatus("Fionn wurde angestupst 🫂 (offline notiert)", "ok");
    return;
  }
  const endpoint = typeof config.endpointUrl === "string" ? config.endpointUrl.trim() : "";
  if (!endpoint) {
    setHugStatus("Fionn wurde angestupst 🫂 (offline notiert)", "ok");
    return;
  }

  if (button) button.disabled = true;
  setHugStatus("Stups wird gesendet…", "pending");

  const body = JSON.stringify(payload);
  const onSuccess = () => {
    setHugStatus("Fionn wurde angestupst 🫂", "ok");
    if (button) {
      window.setTimeout(() => { button.disabled = false; }, 4000);
    }
  };
  const onFailure = () => {
    setHugStatus("Konnte gerade nicht gesendet werden – bitte gleich nochmal.", "error");
    if (button) button.disabled = false;
  };

  fetch(endpoint, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body
  })
    .then((response) => {
      if (response && response.ok) {
        onSuccess();
      } else {
        onFailure();
      }
    })
    .catch(() => {
      try {
        fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          credentials: "omit",
          cache: "no-store",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body
        }).then(onSuccess).catch(onFailure);
      } catch (_error) {
        onFailure();
      }
    });
}

// Nudge the partner (via the wish-inbox endpoint, which emails Fionn) when a
// voucher is redeemed. Best-effort, never blocks the UI.
export function notifyPartnerVoucherRedeemed(entry) {
  const token = getToken();
  if (token === "fionn") return; // avoid Fionn emailing himself
  const config = state.wishInbox;
  if (!config || !config.enabled) return;
  const endpoint = typeof config.endpointUrl === "string" ? config.endpointUrl.trim() : "";
  if (!endpoint) return;

  const title = (entry && entry.title) ? entry.title : "Gutschein";
  const message = `🎟️ Gutschein eingelöst: ${title}`;
  const payload = {
    timestamp: new Date().toISOString(),
    token,
    type: "voucher",
    event: "voucher-redeemed",
    wish: message,
    message,
    pageUrl: (typeof window !== "undefined" && window.location) ? window.location.href : "",
    userAgent: (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : ""
  };
  const body = JSON.stringify(payload);
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  fetch(endpoint, opts).catch(() => {
    fetch(endpoint, { ...opts, mode: "no-cors" }).catch(() => {});
  });
}

export function sendWishToInbox(wish) {
  const config = state.wishInbox;
  if (!config || !config.enabled) return;
  const endpoint = typeof config.endpointUrl === "string" ? config.endpointUrl.trim() : "";
  if (!endpoint) return;

  const payload = {
    timestamp: new Date(wish.submittedAt || Date.now()).toISOString(),
    token: getToken(),
    wish: wish.text,
    pageUrl: (typeof window !== "undefined" && window.location) ? window.location.href : "",
    userAgent: (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : ""
  };

  const body = JSON.stringify(payload);
  const setStatus = (status) => {
    const stored = readWish();
    if (!stored || stored.week !== wish.week) return;
    writeWish({ ...stored, remoteStatus: status, remoteUpdatedAt: Date.now() });
    renderWunschkapsel();
  };

  setStatus("pending");

  fetch(endpoint, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body
  })
    .then((response) => {
      if (response && response.ok) {
        setStatus("sent");
      } else {
        setStatus("failed");
      }
    })
    .catch(() => {
      try {
        fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          credentials: "omit",
          cache: "no-store",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body
        })
          .then(() => setStatus("sent"))
          .catch(() => setStatus("failed"));
      } catch (_error) {
        setStatus("failed");
      }
    });
}

export function retryPendingWishSend() {
  const wish = readWish();
  if (!wish || wish.week !== currentWeekKey()) return;
  if (wish.remoteStatus === "sent") return;
  sendWishToInbox(wish);
}

export async function showNotifPrompt() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

  try {
    if (window.localStorage.getItem(NOTIF_KEY) === 'dismissed') return;
  } catch {}

  // Attempt native permission request directly — fires the browser dialog immediately
  // on Firefox and iOS PWA (allowed without user gesture there).
  // Chrome silently ignores it and keeps permission at 'default', so we fall through
  // to the in-app banner as a fallback.
  let result = 'default';
  try { result = await Notification.requestPermission(); } catch (_) {}

  if (result === 'granted') {
    try { window.localStorage.setItem(NOTIF_KEY, 'granted'); } catch {}
    await registerServiceWorker();
    return;
  }
  if (result === 'denied') {
    try { window.localStorage.setItem(NOTIF_KEY, 'dismissed'); } catch {}
    return;
  }

  // 'default' → browser blocked silent request → show in-app banner
  const card = document.querySelector('[data-ag-notif-card]');
  if (card) { card.hidden = false; card.removeAttribute('hidden'); }
}

function nextNotificationTimestamp() {
  const tz = state.theme?.timezone || "Europe/Zurich";
  const timeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false
  }).format(new Date());
  const [h, m] = timeStr.split(":").map(Number);
  const minutesSinceMidnight = h * 60 + m;
  const targetMinutes = 8 * 60;
  const minutesUntil = minutesSinceMidnight < targetMinutes
    ? targetMinutes - minutesSinceMidnight
    : 24 * 60 - minutesSinceMidnight + targetMinutes;
  return Date.now() + minutesUntil * 60 * 1000;
}

export async function scheduleStreakWarning() {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.active) return;
    const tz = state.theme?.timezone || "Europe/Zurich";
    const token = getToken();
    const today = dateKeyInTimezone(tz);
    const alreadyPulled = readHistory().some((e) => e.token === token && e.day === today);
    if (alreadyPulled) {
      reg.active.postMessage({ type: "CANCEL_NOTIFICATION", tag: "ag-streak-warn" });
      return;
    }
    const { h, m } = hmInTimezone(tz);
    if (h >= 21) return;
    const msUntil21 = ((21 - h) * 60 - m) * 60 * 1000 - new Date().getSeconds() * 1000;
    const name = displayNameFromToken();
    const warnMsg = STREAK_WARN_POOL[dailyMsgIdx(STREAK_WARN_POOL)];
    reg.active.postMessage({
      type: "SCHEDULE_NOTIFICATION",
      tag: "ag-streak-warn",
      targetTime: Date.now() + Math.max(0, msUntil21),
      title: warnMsg.title.replace("{name}", name),
      body: warnMsg.body.replace("{name}", name)
    });
  } catch (_) {}
}

export async function scheduleNotification() {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const name = displayNameFromToken();
    const dailyMsg = DAILY_REMINDER_POOL[dailyMsgIdx(DAILY_REMINDER_POOL)];
    reg.active?.postMessage({
      type: "SCHEDULE_NOTIFICATION",
      tag: "ag-daily",
      targetTime: nextNotificationTimestamp(),
      title: dailyMsg.title.replace("{name}", name),
      body: dailyMsg.body.replace("{name}", name)
    });
    // Push quest notification if a new period just started and not yet solved
    if (state.quest?.enabled && isQuestAvailable()) {
      const qs = readQuestState();
      const lastNotifPeriod = (() => { try { return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1") || "-1", 10); } catch (_e) { return -1; } })();
      if (!qs.solved && lastNotifPeriod !== currentQuestPeriod(state)) {
        try { localStorage.setItem("affektions-gacha:quest-notif:v1", String(currentQuestPeriod(state))); } catch (_e) {}
        reg.active?.postMessage({
          type: "SCHEDULE_NOTIFICATION",
          targetTime: Date.now() + 500,
          title: state.quest.pushTitle || "Neue Foto-Aufgabe 📷",
          body: state.quest.pushBody || "Die Maschine hat eine neue Aufgabe für dich."
        });
      }
    }
  } catch (error) {
    /* ignore */
  }
}

export async function tryPeriodicSync() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!("periodicSync" in reg)) return;
    await reg.periodicSync.register("ag-daily-reminder", {
      minInterval: 20 * 60 * 60 * 1000
    });
  } catch (error) {
    /* Periodic Background Sync not supported — ignore */
  }
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const swUrl = urlFor("sw.js");
    if (new URL(swUrl).origin !== window.location.origin) return;
    await navigator.serviceWorker.register(swUrl, {
      scope: new URL("./", swUrl).pathname
    });
    if (Notification.permission === "granted") {
      await scheduleNotification();
      await scheduleStreakWarning();
      await tryPeriodicSync();
    }
  } catch (error) {
    /* SW not supported or cross-origin — silent fail */
  }
}

export async function enableNotifications() {
  const notifCard = $("[data-ag-notif-card]");
  if (!("Notification" in window)) {
    if (notifCard) notifCard.hidden = true;
    return;
  }
  const permission = await Notification.requestPermission();
  if (notifCard) notifCard.hidden = true;
  if (permission !== "granted") {
    try { window.localStorage.setItem(NOTIF_KEY, "dismissed"); } catch (error) { /* ignore */ }
    return;
  }
  try { window.localStorage.setItem(NOTIF_KEY, "granted"); } catch (error) { /* ignore */ }
  await registerServiceWorker();
}

export function drawRoundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    const radii = Array.isArray(r) ? r : [r, r, r, r];
    const [tl, tr, br, bl] = radii.map((v) => Math.min(v, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + tl, y);
    ctx.lineTo(x + w - tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
    ctx.lineTo(x + w, y + h - br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    ctx.lineTo(x + bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
    ctx.lineTo(x, y + tl);
    ctx.quadraticCurveTo(x, y, x + tl, y);
    ctx.closePath();
  }
}

export function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function downloadResultAsImage(pull) {
  const W = 640;
  const H = 340;
  const PAD = 40;
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // Background
  const isJackpot = pull.category.id === "jackpot";
  const bg1 = isJackpot ? "#2d1f00" : "#0d2b1c";
  const bg2 = isJackpot ? "#1a1000" : "#061510";
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, bg1);
  grad.addColorStop(1, bg2);
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, W, H, 20);
  ctx.fill();

  // Accent stripe at top
  const accentColor = isJackpot ? "#b9782e" : "#2f7a4f";
  ctx.fillStyle = accentColor;
  drawRoundRect(ctx, 0, 0, W, 5, [20, 20, 0, 0]);
  ctx.fill();

  // Badge
  const badgeText = pull.category.label;
  const emoji = emojiForTone(pull.category.tone);
  ctx.font = "bold 13px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillStyle = isJackpot ? "#d4a24c" : "#5aba7e";
  ctx.fillText(`${emoji} ${badgeText}`, PAD, PAD + 22);

  // Date
  const dateText = pull.day;
  ctx.font = "13px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  const dateW = ctx.measureText(dateText).width;
  ctx.fillText(dateText, W - PAD - dateW, PAD + 22);

  // Divider
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, PAD + 36);
  ctx.lineTo(W - PAD, PAD + 36);
  ctx.stroke();

  // Title
  ctx.font = "bold 24px Boska, Georgia, serif";
  ctx.fillStyle = "#ffffff";
  const titleLines = wrapText(ctx, pull.outcome.title, W - PAD * 2);
  let y = PAD + 68;
  for (const line of titleLines) {
    ctx.fillText(line, PAD, y);
    y += 32;
  }

  // Message
  ctx.font = "15px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  const msgLines = wrapText(ctx, pull.outcome.message, W - PAD * 2);
  y += 4;
  for (const line of msgLines) {
    if (y > H - PAD - 30) break;
    ctx.fillText(line, PAD, y);
    y += 22;
  }

  // Branding watermark
  ctx.font = "11px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  const brand = state.theme?.brand?.machineName || "Affektions-Gacha";
  ctx.fillText(brand, PAD, H - 16);

  const link = document.createElement("a");
  link.download = `gacha-${pull.category.id}-${pull.day}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function renderError(error) {
  mount.style.opacity = "1";
  mount.style.background = "#0a1410";
  mount.style.minHeight = "100vh";
  mount.style.display = "flex";
  mount.style.alignItems = "center";
  mount.style.justifyContent = "center";
  mount.style.padding = "24px";
  mount.innerHTML = `
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${escapeHtml(error.message || String(error))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `;
}

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}


export function reveal() {
  if (!state.todaysPull) state.todaysPull = buildPull();

  const button = $("[data-ag-draw]");
  const buttonText = $("[data-ag-button-text]");
  const steps = state.theme.loadingSteps || ["Maschine rattert"];
  let stepIndex = 0;

  mount.classList.add("is-revealing");
  button.disabled = true;
  buttonText.textContent = steps[stepIndex];
  const stepTimer = window.setInterval(() => {
    stepIndex = Math.min(stepIndex + 1, steps.length - 1);
    buttonText.textContent = steps[stepIndex];
  }, Math.max(420, Math.floor((state.theme.revealDelayMs || 3200) / steps.length)));

  // Speed up emoji orbits with an increasing rate during the reveal
  const revealDuration = state.theme.revealDelayMs || 3200;
  const emojiSpans = Array.from(($("[data-ag-emoji-orbit]") || { children: [] }).children);
  const originalDurations = emojiSpans.map(
    (span) => parseFloat(span.style.getPropertyValue("--ag-emoji-duration")) || 20
  );
  const startTime = performance.now();
  let rafId;
  function rampEmojis(now) {
    const progress = Math.min((now - startTime) / revealDuration, 1);
    const speedMultiplier = 1 + 5 * progress * progress;
    emojiSpans.forEach((span, i) => {
      span.style.setProperty("--ag-emoji-duration", `${(originalDurations[i] / speedMultiplier).toFixed(3)}s`);
    });
    if (progress < 1) rafId = requestAnimationFrame(rampEmojis);
  }
  rafId = requestAnimationFrame(rampEmojis);

  window.setTimeout(() => {
    window.clearInterval(stepTimer);
    cancelAnimationFrame(rafId);
    emojiSpans.forEach((span, i) => {
      span.style.setProperty("--ag-emoji-duration", `${originalDurations[i].toFixed(2)}s`);
    });
    // Add reward token once — guard prevents double-increment on re-reveal
    if (state.todaysPull.collectToken) {
      const alreadyRecorded = readHistory().some(
        (e) => e.day === state.todaysPull.day && e.token === state.todaysPull.token
      );
      if (!alreadyRecorded) addToken(state.todaysPull.collectToken);
    }
    renderPull(state.todaysPull);
    mount.classList.remove("is-revealing");
    mount.classList.add("is-revealed");
    mount.classList.add("has-drawn");
    button.disabled = false;
    buttonText.textContent = state.theme.brand.buttonShown;
    state.revealed = true;
    if (!getPreviewDay()) recordHistoryEntry(state.todaysPull);
    scheduleStreakWarning();
    const streak = computeStreak();
    renderStreak();
    renderMilestoneBanner(streak);

    const pullCategoryId = state.todaysPull?.category?.id;
    const pullTone = state.todaysPull?.category?.tone;
    if (pullCategoryId === "special") {
      const rainbow = ["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];
      triggerConfetti(130, rainbow);
      setTimeout(() => triggerConfetti(90, rainbow), 700);
      playPullSound("special");
    } else if (pullTone === "jackpot") {
      const golds = ["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];
      triggerConfetti(120, golds);
      setTimeout(() => triggerConfetti(80, golds), 650);
      playPullSound("jackpot");
    } else if (pullTone === "rare") {
      triggerConfetti(70);
      playPullSound("rare");
    } else {
      playPullSound(pullTone || "common");
    }

    if (MILESTONE_MESSAGES[streak]) {
      haptic([30, 20, 30, 20, 60]);
    } else {
      haptic([20, 20, 40]);
    }
    if (state.activeTab === "history") renderHistory();
    showNotifPrompt();
  }, state.theme.revealDelayMs || 3200);
}

export function bindEvents() {
  // Hold draw button 3 s to reveal hidden letter
  let letterHoldTimer = null;
  const drawBtn = $("[data-ag-draw]");
  drawBtn.addEventListener("pointerdown", () => {
    letterHoldTimer = setTimeout(openLetter, 3000);
  });
  drawBtn.addEventListener("pointerup", () => clearTimeout(letterHoldTimer));
  drawBtn.addEventListener("pointerleave", () => clearTimeout(letterHoldTimer));
  drawBtn.addEventListener("pointercancel", () => clearTimeout(letterHoldTimer));

  // Tap title 5 times to reveal hidden letter
  let titleTapCount = 0, titleTapTimer = null;
  $("[data-ag-main-title]").addEventListener("click", () => {
    titleTapCount++;
    clearTimeout(titleTapTimer);
    if (titleTapCount >= 5) { titleTapCount = 0; openLetter(); return; }
    titleTapTimer = setTimeout(() => { titleTapCount = 0; }, 1800);
  });

  $("[data-ag-draw]").addEventListener("click", () => {
    haptic(12);
    reveal();
  });
  $("#ag-btn-rave")?.addEventListener("click", () => {
    window.open("https://rave-board.vercel.app/", "_blank", "noopener");
  });
  $("#ag-btn-rave")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open("https://rave-board.vercel.app/", "_blank", "noopener");
    }
  });

  $("#ag-btn-baerlauch")?.addEventListener("click", openBaerlauchGame);
  $("#ag-baerlauch-close")?.addEventListener("click", closeBaerlauchGame);
  $("#ag-baerlauch-next")?.addEventListener("click", openBaerlauchGame);
  $("#ag-btn-baerlauch")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBaerlauchGame();
    }
  });
  $("#ag-btn-gesprach")?.addEventListener("click", openGesprachPanel);

  // ── Glossary ────────────────────────────────────────────────────────────────
  $("#ag-btn-glossary")?.addEventListener("click", openGlossaryPanel);
  $("#ag-btn-glossary")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGlossaryPanel(); }
  });
  $("#ag-glossary-close")?.addEventListener("click", closeGlossaryPanel);

  // Glossary refresh from Google Sheets
  document.getElementById("ag-glossary-refresh")?.addEventListener("click", async () => {
    const btn = document.getElementById("ag-glossary-refresh");
    if (btn) { btn.disabled = true; btn.textContent = "⏳"; }
    haptic(6);
    const count = await fetchGlossaryFromSheet();
    renderGlossaryPanel(glossaryMod._glossaryCurrentLang);
    if (btn) {
      btn.textContent = count > 0 ? `↻${count}` : "↻";
      setTimeout(() => { btn.textContent = "↻"; btn.disabled = false; }, 3000);
    }
    if (count > 0) showToast(`${count} Wörter aktualisiert ✓`);
  });

  // Language tabs
  document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const searchEl = document.getElementById("ag-glossary-search");
      if (searchEl) searchEl.value = "";
      renderGlossaryPanel(btn.dataset.lang);
      haptic(4);
    });
  });

  // Search
  document.getElementById("ag-glossary-search")?.addEventListener("input", () => {
    renderGlossaryPanel(glossaryMod._glossaryCurrentLang);
  });

  // Add button
  const glossaryAddBtn = document.getElementById("ag-glossary-add");
  const glossaryForm = document.getElementById("ag-glossary-form");
  if (glossaryAddBtn) {
    glossaryAddBtn.addEventListener("click", () => {
      if (!glossaryForm) return;
      document.getElementById("ag-glossary-edit-id").value = "";
      document.getElementById("ag-glossary-word-input").value = "";
      document.getElementById("ag-glossary-meaning-input").value = "";
      const titleEl = document.getElementById("ag-glossary-form-title");
      if (titleEl) titleEl.textContent = "Neues Wort";
      const labelEl = document.getElementById("ag-glossary-save-label");
      if (labelEl) labelEl.textContent = "Eintragen";
      const statusEl = document.getElementById("ag-glossary-audio-status");
      if (statusEl) statusEl.textContent = "";
      glossaryMod._glossaryAudioBlob = null;
      const playPrev = document.getElementById("ag-glossary-play-preview");
      if (playPrev) playPrev.hidden = true;
      glossaryForm.hidden = false;
      glossaryAddBtn.hidden = true;
      $("[data-ag-sheet-backdrop]")?.classList.add("is-open");
      document.getElementById("ag-glossary-word-input")?.focus();
      haptic(8);
    });
  }

  // Form cancel
  document.getElementById("ag-glossary-form-cancel")?.addEventListener("click", () => {
    if (glossaryForm) glossaryForm.hidden = true;
    if (glossaryAddBtn) glossaryAddBtn.hidden = false;
    $("[data-ag-sheet-backdrop]")?.classList.remove("is-open");
    document.getElementById("ag-glossary-edit-id").value = "";
    glossaryMod._glossaryAudioBlob = null;
    if (glossaryMod._glossaryRecorder && glossaryMod._glossaryRecorder.state !== "inactive") {
      try { glossaryMod._glossaryRecorder.stop(); } catch (_) {}
    }
    glossaryMod._glossaryRecorder = null;
    haptic(6);
  });

  // Form save
  document.getElementById("ag-glossary-form-save")?.addEventListener("click", async () => {
    const word = (document.getElementById("ag-glossary-word-input")?.value || "").trim();
    const meaning = (document.getElementById("ag-glossary-meaning-input")?.value || "").trim();
    const editId = (document.getElementById("ag-glossary-edit-id")?.value || "").trim();
    if (!word) { document.getElementById("ag-glossary-word-input")?.focus(); return; }
    const statusEl = document.getElementById("ag-glossary-audio-status");
    let audioUrl = null;
    if (glossaryMod._glossaryAudioBlob) {
      if (statusEl) statusEl.textContent = "Wird hochgeladen…";
      const newId = editId || `${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
      audioUrl = await uploadGlossaryAudio(glossaryMod._glossaryAudioBlob, newId);
    }
    haptic([20, 20, 40]);
    if (editId) {
      const fields = { word, meaning: meaning || null };
      if (audioUrl !== null) fields.audioUrl = audioUrl;
      updateGlossaryWord(editId, fields);
    } else {
      addGlossaryWord({ id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`, lang: glossaryMod._glossaryCurrentLang, word, meaning: meaning || null, audioUrl, token: getToken() });
    }
    if (glossaryForm) glossaryForm.hidden = true;
    if (glossaryAddBtn) glossaryAddBtn.hidden = false;
    document.getElementById("ag-glossary-edit-id").value = "";
    glossaryMod._glossaryAudioBlob = null;
    glossaryMod._glossaryRecorder = null;
    renderGlossaryPanel(glossaryMod._glossaryCurrentLang);
    showToast("Wort gespeichert ✓");
  });

  // Audio record
  const recordBtn = document.getElementById("ag-glossary-record");
  if (recordBtn) {
    recordBtn.addEventListener("click", async () => {
      if (glossaryMod._glossaryRecorder && glossaryMod._glossaryRecorder.state === "recording") {
        glossaryMod._glossaryRecorder.stop();
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        glossaryMod._glossaryRecorder = new MediaRecorder(stream);
        glossaryMod._glossaryRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        glossaryMod._glossaryRecorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          glossaryMod._glossaryAudioBlob = new Blob(chunks, { type: glossaryMod._glossaryRecorder.mimeType || "audio/webm" });
          const statusEl = document.getElementById("ag-glossary-audio-status");
          if (statusEl) statusEl.textContent = "✓ Aufnahme bereit";
          const playPrev = document.getElementById("ag-glossary-play-preview");
          if (playPrev) playPrev.hidden = false;
          recordBtn.textContent = "🎙 Neu aufnehmen";
        };
        glossaryMod._glossaryRecorder.start();
        recordBtn.textContent = "⏹ Stop";
        const statusEl = document.getElementById("ag-glossary-audio-status");
        if (statusEl) statusEl.textContent = "● REC";
        haptic(10);
      } catch (_) {
        const statusEl = document.getElementById("ag-glossary-audio-status");
        if (statusEl) statusEl.textContent = "Mikrofon nicht verfügbar";
      }
    });
  }

  // Preview playback
  document.getElementById("ag-glossary-play-preview")?.addEventListener("click", () => {
    if (!glossaryMod._glossaryAudioBlob) return;
    const url = URL.createObjectURL(glossaryMod._glossaryAudioBlob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.play().catch(() => {});
  });

  $("#ag-btn-mission")?.addEventListener("click", openMissionPanel);
  $("#ag-btn-mission")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMissionPanel(); }
  });
  $("#ag-mission-close")?.addEventListener("click", closeMissionPanel);
  $("#ag-mission-done")?.addEventListener("click", () => {
    markMissionDone();
    const actionsEl = $("#ag-mission-actions");
    const feedbackEl = $("#ag-mission-feedback");
    const doneNote = $("#ag-mission-done-note");
    const chip = $("#ag-btn-mission");
    if (actionsEl) actionsEl.hidden = true;
    if (doneNote) doneNote.hidden = false;
    if (feedbackEl && !isFeedbackSentToday()) feedbackEl.hidden = false;
    if (chip) chip.classList.remove("ag-chip-mission-active");
  });
  $("#ag-mission-panel")?.querySelectorAll(".ag-mission-rate-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $("#ag-mission-panel")?.querySelectorAll(".ag-mission-rate-btn")
        .forEach(b => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
    });
  });
  $("#ag-mission-feedback-send")?.addEventListener("click", () => {
    const panel = $("#ag-mission-panel");
    const selected = panel?.querySelector(".ag-mission-rate-btn.is-selected");
    const rating = selected?.dataset.rating || null;
    const comment = ($("#ag-mission-comment")?.value || "").trim();
    sendMissionFeedback(rating, comment);
    const sentEl = $("#ag-mission-feedback-sent");
    panel?.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label")
      .forEach(el => { el.hidden = true; });
    if (sentEl) sentEl.hidden = false;
  });
  $("#ag-letter-close")?.addEventListener("click", closeLetter);
  $("#ag-letter-overlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeLetter();
  });
  $("#ag-lightbox-close")?.addEventListener("click", () => { closeLightbox(); });
  $("#ag-lightbox")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { closeLightbox(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLetter(); closeLightbox(); }
  });

  $("#ag-gesprach-close")?.addEventListener("click", closeGesprachPanel);
  $("#ag-gesprach-next")?.addEventListener("click", showNextGesprach);
  $("#ag-gesprach-wa")?.addEventListener("click", sendGesprachToWhatsApp);
  $("#ag-btn-gesprach")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGesprachPanel();
    }
  });
  $("#ag-btn-quest")?.addEventListener("click", openQuestPanel);
  $("#ag-quest-close")?.addEventListener("click", closeQuestPanel);
  $("#ag-btn-quest")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openQuestPanel();
    }
  });
  $("#ag-quest-file")?.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleQuestPhoto(file);
  });
  $("[data-ag-copy]").addEventListener("click", async () => {
    if (!state.todaysPull) return;
    haptic(8);
    const text = messageText(state.todaysPull);
    try {
      await navigator.clipboard.writeText(text);
      $("[data-ag-copy]").textContent = "Kopiert";
      window.setTimeout(() => {
        $("[data-ag-copy]").textContent = "Resultat kopieren";
      }, 1400);
    } catch (error) {
      window.prompt("Resultat kopieren:", text);
    }
  });
  $("[data-ag-save-img]").addEventListener("click", () => {
    if (!state.todaysPull) return;
    haptic(8);
    downloadResultAsImage(state.todaysPull);
  });
  $("[data-ag-star]").addEventListener("click", () => {
    haptic(8);
    toggleFavorite(state.todaysPull);
  });

  const recoverBtn = $("[data-ag-recover-btn]");
  if (recoverBtn) {
    recoverBtn.addEventListener("click", () => {
      recoverBtn.textContent = "⏳";
      recoverBtn.disabled = true;
      const added = recoverHistory();
      renderHistory();
      renderStreak();
      recoverBtn.textContent = added > 0 ? `↺${added}` : "✓";
      setTimeout(() => { recoverBtn.textContent = "↺"; recoverBtn.disabled = false; }, 3000);
    });
  }

  const restoreBtn = $("[data-ag-streak-restore]");
  if (restoreBtn) {
    restoreBtn.addEventListener("click", () => {
      if (!streakRestoreAvailable()) { renderStreakRestore(); return; }
      const gapDay = streakRestoreGapDay();
      const left = streakRestoresLeft();
      const isBirthdayBonus = birthdayBonusLeft() > 0 && (left - birthdayBonusLeft()) <= 0;
      const confirmMsg = isBirthdayBonus
        ? `🎂 Geburtstagsgeschenk! Verpassten Tag (${gapDay}) auffüllen und deinen Streak wiederherstellen?`
        : `Verpassten Tag (${gapDay}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${left - 1} Streak-Retter übrig.`;
      const ok = window.confirm(confirmMsg);
      if (!ok) return;
      restoreBtn.disabled = true;
      const mended = restoreStreak();
      renderHistory();
      renderStreak();
      if (mended) {
        const golds = ["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];
        triggerConfetti(110, golds);
        haptic([30, 20, 30, 20, 60]);
      }
      renderStreakRestore();
      restoreBtn.disabled = false;
    });
  }

  const syncBtn = $("[data-ag-sync-btn]");
  if (syncBtn) {
    syncBtn.addEventListener("click", async () => {
      syncBtn.textContent = "⏳";
      syncBtn.disabled = true;
      const result = await syncFromSheets();
      renderHistory();
      syncBtn.textContent = result < 0 ? "✗" : `✓${result}`;
      setTimeout(() => { syncBtn.textContent = "☁"; syncBtn.disabled = false; }, 3000);
    });
  }

  mount.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      haptic(5);
      setHistoryFilter(chip.dataset.agFilter);
    });
  });

  mount.querySelectorAll("[data-ag-tab]").forEach((node) => {
    node.addEventListener("click", () => {
      haptic(6);
      setActiveTab(node.dataset.agTab);
    });
  });

  // ── Drag-to-switch on the floating nav pill ─────────────────────────────────
  const bottomNav = mount.querySelector(".ag-bottomnav");
  if (bottomNav) {
    const pill = bottomNav.querySelector(".ag-nav-pill");
    const navBtns = [...bottomNav.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];
    let drag = null;

    bottomNav.addEventListener("pointerdown", (e) => {
      const navRect = bottomNav.getBoundingClientRect();
      const pw = parseFloat(pill?.style.width) || 54;
      drag = {
        id: e.pointerId,
        startX: e.clientX - navRect.left,
        pillStartCentre: (parseFloat(pill?.style.left) || 0) + pw / 2,
        pillWidth: pw,
        moved: false,
        suppress: false,
        captured: false
      };
    });

    bottomNav.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const navRect = bottomNav.getBoundingClientRect();
      const dx = (e.clientX - navRect.left) - drag.startX;
      if (!drag.moved && Math.abs(dx) < 6) return;
      // Only capture the pointer once real dragging is confirmed — capturing
      // on every tap retargets the resulting click event to bottomNav instead
      // of the tapped button, silently breaking plain taps (incl. any button
      // injected later, like the Fionn admin tab).
      if (!drag.captured) {
        bottomNav.setPointerCapture(e.pointerId);
        drag.captured = true;
      }
      drag.moved = true;
      drag.suppress = true;
      if (!pill) return;
      pill.style.transition = "none";
      const navRect2 = bottomNav.getBoundingClientRect();
      const centre = drag.pillStartCentre + dx;
      const hw = drag.pillWidth / 2;
      let left = centre - hw;
      if (left < 0) left = left * 0.25;
      else if (left + drag.pillWidth > navRect2.width) left = navRect2.width - drag.pillWidth + (left + drag.pillWidth - navRect2.width) * 0.25;
      pill.style.left = `${left}px`;
    });

    const finishDrag = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const didMove = drag.moved;
      const suppress = drag.suppress;
      drag = null;
      if (pill) pill.style.transition = "";
      if (!didMove) return;

      // Snap to the tab whose centre is closest to release X
      const navRect = bottomNav.getBoundingClientRect();
      const releaseX = e.clientX - navRect.left;
      let nearest = navBtns[0];
      let nearestDist = Infinity;
      navBtns.forEach((btn) => {
        const r = btn.getBoundingClientRect();
        const centre = r.left - navRect.left + r.width / 2;
        const d = Math.abs(releaseX - centre);
        if (d < nearestDist) { nearestDist = d; nearest = btn; }
      });
      haptic(6);
      setActiveTab(nearest.dataset.agTab);

      // Block the tap that fires on the button after pointerup
      if (suppress) {
        const once = (ev) => { ev.stopImmediatePropagation(); ev.preventDefault(); };
        bottomNav.addEventListener("click", once, { capture: true, once: true });
      }
    };

    bottomNav.addEventListener("pointerup", finishDrag);
    bottomNav.addEventListener("pointercancel", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      if (pill) pill.style.transition = "";
      setActiveTab(state.activeTab); // re-snap to current
    });
  }

  // ── Stimmung ─────────────────────────────────────────────────────────────────
  $("#ag-btn-stimmung")?.addEventListener("click", openStimmungPanel);
  $("#ag-btn-stimmung")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openStimmungPanel(); }
  });
  $("#ag-stimmung-close")?.addEventListener("click", closeStimmungPanel);
  bindStimmungPanel();

  // Berge / Gipfelbuch
  const bergeAddBtn = $("[data-ag-berge-add]");
  const bergeForm = $("[data-ag-berge-form]");
  const bergeCancel = $("[data-ag-berge-cancel]");
  const bergeSave = $("[data-ag-berge-save]");
  if (bergeAddBtn) {
    bergeAddBtn.addEventListener("click", () => {
      haptic(8);
      const dateInput = $("[data-ag-berge-date]");
      if (dateInput && !dateInput.value) dateInput.value = dateKeyInTimezone(state.theme?.timezone || "Europe/Zurich");
      bergeForm.hidden = false;
      bergeAddBtn.hidden = true;
      $("[data-ag-sheet-backdrop]")?.classList.add("is-open");
      $("[data-ag-berge-name]").focus();
    });
  }
  if (bergeCancel) {
    bergeCancel.addEventListener("click", () => {
      haptic(6);
      bergeForm.hidden = true;
      bergeAddBtn.hidden = false;
      $("[data-ag-sheet-backdrop]")?.classList.remove("is-open");
      ["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach((sel) => {
        const el = $(sel); if (el) el.value = "";
      });
      const locSearchEl = $("[data-ag-loc-search]");
      if (locSearchEl) locSearchEl.value = "";
      const locDrop = $("[data-ag-loc-dropdown]");
      if (locDrop) { locDrop.hidden = true; locDrop.innerHTML = ""; }
      const formTitle = $("[data-ag-berge-form-title]");
      if (formTitle) formTitle.textContent = "Neuer Gipfeleintrag";
      const saveSpan = $("[data-ag-berge-save] span:last-child");
      if (saveSpan) saveSpan.textContent = "Eintragen";
    });
  }
  if (bergeSave) {
    bergeSave.addEventListener("click", () => {
      const name = ($("[data-ag-berge-name]")?.value || "").trim();
      const dist = parseFloat($("[data-ag-berge-dist]")?.value || "");
      const gain = parseInt($("[data-ag-berge-gain]")?.value || "", 10);
      const date = $("[data-ag-berge-date]")?.value || dateKeyInTimezone(state.theme?.timezone || "Europe/Zurich");
      const url   = ($("[data-ag-berge-url]")?.value || "").trim();
      const cover = ($("[data-ag-berge-cover]")?.value || "").trim();
      const notes = ($("[data-ag-berge-notes]")?.value || "").trim();
      const editId = ($("[data-ag-berge-edit-id]")?.value || "").trim();
      const lat = ($("[data-ag-berge-lat]")?.value || "").trim() || null;
      const lng = ($("[data-ag-berge-lng]")?.value || "").trim() || null;
      const locLabel = ($("[data-ag-berge-loc-label]")?.value || "").trim() || null;
      if (!name) { $("[data-ag-berge-name]")?.focus(); return; }
      haptic([20, 20, 40]);
      const fields = { name, elevation: null, distance: isNaN(dist) ? null : dist, elevGain: isNaN(gain) ? null : gain, date, activityUrl: url || null, cover: cover || null, notes: notes || null, lat, lng, locLabel };
      if (editId) {
        updateGipfelEntry(editId, fields);
      } else {
        addGipfelEntry({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...fields, token: getToken() });
      }
      // reset form
      ["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach((sel) => {
        const el = $(sel); if (el) el.value = "";
      });
      const locSearchEl = $("[data-ag-loc-search]");
      if (locSearchEl) locSearchEl.value = "";
      const formTitle = $("[data-ag-berge-form-title]");
      if (formTitle) formTitle.textContent = "Neuer Gipfeleintrag";
      const saveSpan = $("[data-ag-berge-save] span:last-child");
      if (saveSpan) saveSpan.textContent = "Eintragen";
      bergeForm.hidden = true;
      bergeAddBtn.hidden = false;
      $("[data-ag-sheet-backdrop]")?.classList.remove("is-open");
      renderBergePanel();
      showToast("Gipfel gespeichert ✓");
    });
  }

  // Bind berge-specific events (location search, etc.)
  bindBergeEvents();

  // Show Fionn's ping card only for Fionn token (when backup is enabled)
  const pingCard = $("[data-ag-ping-card]");
  if (pingCard) {
    pingCard.hidden = !(getToken() === "fionn" && state.backup?.enabled);
  }

  // Ping dismiss button
  const pingDismiss = $("[data-ag-ping-dismiss]");
  if (pingDismiss) {
    pingDismiss.addEventListener("click", () => {
      const banner = $("[data-ag-ping-banner]");
      if (banner) banner.hidden = true;
    });
  }

  // Fionn ping send button
  const pingSend = $("[data-ag-ping-send]");
  if (pingSend) {
    pingSend.addEventListener("click", () => {
      haptic([20, 30, 20]);
      try { sendPingToBackend(); } catch (_error) { /* never block UI */ }
    });
  }

  // Notfall-Umarmung
  const hugSend = $("[data-ag-hug-send]");
  if (hugSend) {
    hugSend.addEventListener("click", () => {
      haptic([20, 30, 20]);
      try { sendHugToInbox(); } catch (_error) { /* never block UI */ }
    });
  }

  // Wunschkapsel
  const wishOpen = $("[data-ag-wish-open]");
  const wishCancel = $("[data-ag-wish-cancel]");
  const wishSubmit = $("[data-ag-wish-submit]");
  if (wishOpen) {
    wishOpen.addEventListener("click", () => {
      haptic(8);
      $("[data-ag-wish-idle]").hidden = true;
      $("[data-ag-wish-form]").hidden = false;
      const input = $("[data-ag-wish-input]");
      if (input) window.setTimeout(() => input.focus(), 60);
    });
  }
  if (wishCancel) {
    wishCancel.addEventListener("click", () => {
      haptic(6);
      $("[data-ag-wish-form]").hidden = true;
      $("[data-ag-wish-idle]").hidden = false;
    });
  }
  if (wishSubmit) {
    wishSubmit.addEventListener("click", () => {
      const input = $("[data-ag-wish-input]");
      const text = (input?.value || "").trim();
      if (!text) return;
      haptic([20, 20, 40]);
      const entry = { week: currentWeekKey(), text, submittedAt: Date.now(), remoteStatus: "idle" };
      writeWish(entry);
      renderWunschkapsel();
      try { sendWishToInbox(entry); } catch (_error) { /* never block local confirmation */ }
    });
  }

  // Notification prompt
  const notifEnable = $("[data-ag-notif-enable]");
  const notifDismiss = $("[data-ag-notif-dismiss]");
  if (notifEnable) {
    notifEnable.addEventListener("click", () => {
      haptic(10);
      enableNotifications();
    });
  }
  if (notifDismiss) {
    notifDismiss.addEventListener("click", () => {
      haptic(6);
      try { window.localStorage.setItem(NOTIF_KEY, "dismissed"); } catch (error) { /* ignore */ }
      const card = $("[data-ag-notif-card]");
      if (card) card.hidden = true;
    });
  }

  // ── Sheet backdrop click → close open form ──────────────────────────────────
  const backdrop = $("[data-ag-sheet-backdrop]");
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      haptic(6);
      const bf = $("[data-ag-berge-form]");
      const ba = $("[data-ag-berge-add]");
      if (bf && !bf.hidden) { bf.hidden = true; if (ba) ba.hidden = false; }
      const gf = document.getElementById("ag-glossary-form");
      const ga = document.getElementById("ag-glossary-add");
      if (gf && !gf.hidden) { gf.hidden = true; if (ga) ga.hidden = false; }
      backdrop.classList.remove("is-open");
    });
  }

  // ── FAB: open add form for active tab ───────────────────────────────────────
  const fab = $("[data-ag-fab]");
  if (fab) {
    fab.addEventListener("click", () => {
      haptic(8);
      const addBtn = $("[data-ag-berge-add]");
      if (addBtn && !addBtn.hidden) addBtn.click();
    });
  }

  // ── Swipe left/right to switch tabs ─────────────────────────────────────────
  const tabOrder = ["today", "history", "lieblinge", "berge"];
  let _swipeX = 0, _swipeY = 0;
  const _swipeTarget = $(".ag-content") || mount;
  _swipeTarget.addEventListener("touchstart", (e) => {
    _swipeX = e.touches[0].clientX;
    _swipeY = e.touches[0].clientY;
  }, { passive: true });
  _swipeTarget.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - _swipeX;
    const dy = Math.abs(e.changedTouches[0].clientY - _swipeY);
    if (Math.abs(dx) > 52 && dy < 44) {
      const cur = tabOrder.indexOf(state.activeTab);
      const next = dx < 0 ? Math.min(cur + 1, tabOrder.length - 1) : Math.max(cur - 1, 0);
      if (next !== cur) { haptic(6); setActiveTab(tabOrder[next]); }
    }
  }, { passive: true });

  // ── Pull-to-refresh ──────────────────────────────────────────────────────────
  const ptr = $("[data-ag-ptr]");
  let _ptrStartY = 0, _ptrTriggered = false;
  document.addEventListener("touchstart", (e) => {
    if (window.scrollY === 0) _ptrStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener("touchmove", (e) => {
    if (!_ptrStartY) return;
    const dy = e.touches[0].clientY - _ptrStartY;
    if (dy > 64 && !_ptrTriggered && ptr) {
      _ptrTriggered = true;
      ptr.classList.add("is-visible");
    }
  }, { passive: true });
  document.addEventListener("touchend", async () => {
    if (_ptrTriggered && ptr) {
      ptr.classList.add("is-loading");
      await syncFromSheets();
      if (state.activeTab === "berge") renderBergePanel();
      if (state.activeTab === "history") renderHistory();
      ptr.classList.remove("is-visible", "is-loading");
      showToast("Aktualisiert ✓");
    }
    _ptrStartY = 0;
    _ptrTriggered = false;
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    const mount = document.querySelector(".ag-widget");
    mount?.classList.toggle("ag-paused", document.hidden);
  });
}
