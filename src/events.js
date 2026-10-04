// ── Events / UI wiring ────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { getToken, dateKeyInTimezone, formatHistoryDate } from "./utils.js";
import { readHistory, writeHistory, writeWish, readWish, addToken, addFreikarte, spendFreikarte, writeFreikarteReroll, addHugToLog, sealFlaschenpost } from "./storage.js";
import { fetchWeather, weatherForEntry } from "./wetter.js";
import { foldCardIntoVerlauf } from "./delights.js";
import { computeStreak, streakRestoreAvailable, streakRestoresLeft, birthdayBonusLeft, streakRestoreGapDay, restoreStreak, addVacation } from "./streak.js";
import { buildPull, rerollPullForDay } from "./pull.js";
import { playPullSound } from "./sound.js";
import { getPreviewDay } from "./utils.js";
import { syncFromSheets, backupToSheets } from "./sync.js";
import { NOTIF_KEY } from "./constants.js";
import { triggerConfetti } from "./confetti.js";
import { haptic, hapticForTone } from "./haptic.js";
import { updateAppBadge } from "./badge.js";
import { initMotion } from "./motion.js";
import { startRumble, stopRumble, playRevealSpectacle } from "./spectacle.js";
import { renderHistory, renderStreak, renderStreakRestore, renderLieblinge, renderWunschkapsel, toggleFavorite, isFavorite, messageText, closeLightbox, renderPull, renderMilestoneBanner, recordHistoryEntry, setHistoryFilter, renderTokenBank, MILESTONE_MESSAGES, renderFerien, renderWishReply } from "./render.js";
import { bindKnob } from "./knopf.js";
import { closeKursPanel } from "./kurs.js";
import { bindLightReactionsToggle } from "./einstellungen.js";
import { playClink } from "./sound.js";
import { lightCandle, blowOut, candleLit } from "./kerze.js";
import { bindPinch, flyCardToStar } from "./kneifen.js";
import { emojiForTone } from "./pull.js";
import { openSkincarePanel, closeSkincarePanel } from "./skincare.js";
import { renderBergePanel, addGipfelEntry, updateGipfelEntry, bindBergeEvents, invalidateGipfelMap } from "./berge.js";
import { openBaerlauchGame, closeBaerlauchGame } from "./baerlauch.js";
import { openGesprachPanel, closeGesprachPanel, showNextGesprach, sendGesprachToWhatsApp, openQuestPanel, closeQuestPanel, handleQuestPhoto, openLetter, closeLetter } from "./extras.js";
import { openGlossaryPanel, closeGlossaryPanel, renderGlossaryPanel, addGlossaryWord, updateGlossaryWord, uploadGlossaryAudio, fetchGlossaryFromSheet, glossaryUI } from "./glossary.js";
import { openStimmungPanel, closeStimmungPanel, bindStimmungPanel } from "./stimmung.js";
import { showNotifPrompt, scheduleStreakWarning, enableNotifications } from "./notify.js";
import { openLicht } from "./licht.js";
import { armConfirm } from "./confirm.js";
import { currentWeekKey } from "./utils.js";

// Moved to toast.js; re-exported so the existing importers stay unchanged.
export { showToast } from "./toast.js";
import { showToast } from "./toast.js";

export function setActiveTab(tab) {
  // Leaving the card: it folds into an envelope that flies into Verlauf.
  if (state.activeTab === "today" && tab !== "today" && state.revealed && state.todaysPull && !getPreviewDay()) {
    try { foldCardIntoVerlauf(state.todaysPull); } catch (_e) {}
  }
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
  for (const name of ["today", "history", "lieblinge", "berge", "licht"]) {
    const panel = $(`[data-ag-panel-${name}]`);
    if (!panel) continue;
    const show = tab === name;
    if (show && panel.hidden) {
      // A short rise-and-fade so the switch reads as one surface changing,
      // not a page being swapped. Re-triggered by removing and re-adding.
      panel.classList.remove("is-entering");
      void panel.offsetWidth;
      panel.classList.add("is-entering");
      panel.addEventListener("animationend", () => panel.classList.remove("is-entering"), { once: true });
    }
    panel.hidden = !show;
  }
  if (tab === "history") renderHistory();
  if (tab === "licht") openLicht();
  if (tab === "lieblinge") renderLieblinge();
  if (tab === "berge") {
    invalidateGipfelMap();
    // Paint from the local cache first, then refresh once the sheet answers —
    // the same order the Glossar uses. Rendering only in the .then() meant a
    // slow sheet left the header at "— m" with no entries, even though every
    // summit was already in localStorage.
    renderBergePanel({ loading: true });
    invalidateGipfelMap();
    syncFromSheets()
      .catch(() => {})
      .then(() => { renderBergePanel(); invalidateGipfelMap(); });
  }
  const fab = $("[data-ag-fab]");
  if (fab) fab.hidden = tab !== "berge";
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
  const sentAt = new Date().toISOString();
  const payload = {
    timestamp: sentAt,
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
  let logged = false;
  const onSuccess = () => {
    // Counted once it went through — a retry after a failure is the same hug.
    if (!logged) { logged = true; try { addHugToLog(sentAt); } catch (_e) {} }
    setHugStatus("Fionn wurde angestupst 🫂", "ok");
    // Both lamps answer: a red-orange chasing strobe for eight seconds.
    import("./lightsFx.js").then((m) => m.flashHugOnLamps()).catch(() => {});
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

// A phone-shaped image of the pulled photo with its caption, to set as the
// lock screen. Drawn from the same URL the app displays; if the host will
// not serve it with CORS the canvas is tainted and export throws, which is
// caught and explained rather than silently producing a blank file.
export async function downloadWallpaper(pull) {
  const W = 1170, H = 2532, PAD = 96;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  try {
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = pull.photo.url; });
  } catch (_e) {
    showToast("Foto konnte nicht geladen werden.");
    return;
  }
  // cover-fit
  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  // bottom veil for the caption
  const veil = ctx.createLinearGradient(0, H * 0.62, 0, H);
  veil.addColorStop(0, "rgba(8,20,14,0)");
  veil.addColorStop(1, "rgba(8,20,14,.82)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, H * 0.62, W, H * 0.38);
  const caption = pull.photo.caption || pull.photo.alt || "";
  ctx.font = "500 56px Boska, Georgia, serif";
  ctx.fillStyle = "#fffdf2";
  const lines = wrapText(ctx, caption, W - PAD * 2).slice(0, 3);
  let y = H - PAD - 160 - (lines.length - 1) * 68;
  for (const line of lines) { ctx.fillText(line, PAD, y); y += 68; }
  ctx.font = "500 34px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.62)";
  ctx.fillText(pull.day, PAD, H - PAD - 80);
  ctx.fillStyle = "rgba(255,255,255,.35)";
  ctx.font = "28px Satoshi, Inter, system-ui, sans-serif";
  ctx.fillText(state.theme?.brand?.machineName || "Affektions-Gacha", PAD, H - PAD - 30);

  let blob;
  try {
    blob = await new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(new Error("blob")), "image/jpeg", 0.92));
  } catch (_e) {
    showToast("Dieses Foto lässt sich nicht exportieren (CORS).");
    return;
  }
  const file = new File([blob], `gacha-hintergrund-${pull.day}.jpg`, { type: "image/jpeg" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: caption });
      return;
    } catch (err) {
      // AbortError is the user closing the sheet — done. Anything else
      // (typically NotAllowedError: the tap's activation expired while the
      // photo was loading) falls through to a plain download.
      if (err && err.name === "AbortError") return;
    }
  }
  const link = document.createElement("a");
  link.download = file.name;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 4000);
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

import { escapeHtml } from "./utils.js";
export { escapeHtml };


// Opening the app on a day that is already drawn: the card stays closed
// until he taps. Only the button gives it away — "Heute nochmal anzeigen"
// instead of "Kapsel ziehen" — and the tap replays the fall, on purpose.
// (For a while the card was rendered on load; it was asked back.)
export function markDrawnToday() {
  const buttonText = $("[data-ag-button-text]");
  if (buttonText) buttonText.textContent = state.theme.brand.buttonShown;
}

// "An Fionn schicken" with the photo attached. The wa.me link can only carry
// text, so when the capsule has a picture and the browser can share files,
// the tap goes to the system share sheet with the image and the same text.
// Anything that goes wrong — no CORS on the photo, the tap's activation
// expired while fetching, a browser without file sharing — falls back to the
// text link, so the button never does nothing. Returns true when it took
// the tap over.
export function canShareFiles() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof navigator.canShare === "function";
}
export function photoFileName(pull, mime) {
  const ext = (String(mime || "image/jpeg").split("/")[1] || "jpg").replace("jpeg", "jpg");
  return `gacha-${pull.day}.${ext}`;
}
export function sharePullWithPhoto(pull, fallbackHref) {
  const photo = pull && pull.photo;
  if (!photo || photo.type === "video" || !photo.url || !canShareFiles()) return false;
  (async () => {
    try {
      const res = await fetch(photo.url, { mode: "cors" });
      if (!res.ok) throw new Error("photo fetch " + res.status);
      const blob = await res.blob();
      const file = new File([blob], photoFileName(pull, blob.type), { type: blob.type || "image/jpeg" });
      if (!navigator.canShare({ files: [file] })) throw new Error("cannot share files");
      await navigator.share({ files: [file], text: messageText(pull), title: "Mein Gacha-Zug" });
    } catch (err) {
      if (err && err.name === "AbortError") return;
      try { showToast("Foto hing nicht dran — nur der Text geht raus"); } catch (_e) {}
      window.location.href = fallbackHref;
    }
  })();
  return true;
}

export function reveal() {
  if (!state.todaysPull) state.todaysPull = buildPull();

  const button = $("[data-ag-draw]");
  const buttonText = $("[data-ag-button-text]");
  const steps = state.theme.loadingSteps || ["Maschine rattert"];
  let stepIndex = 0;

  mount.classList.add("is-revealing");
  button.disabled = true;
  // The sky at pull time — the fetch has five seconds of fall to land in.
  if (!getPreviewDay()) fetchWeather().catch(() => {});
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

  // The machine shakes for the last stretch of the fall.
  const toneForFx = state.todaysPull?.category?.id === "special" ? "special" : state.todaysPull?.category?.tone;
  window.setTimeout(() => startRumble(toneForFx), Math.max(0, revealDuration - 900));

  window.setTimeout(() => {
    window.clearInterval(stepTimer);
    cancelAnimationFrame(rafId);
    stopRumble();
    playRevealSpectacle(toneForFx);
    emojiSpans.forEach((span, i) => {
      span.style.setProperty("--ag-emoji-duration", `${originalDurations[i].toFixed(2)}s`);
    });
    // Add reward token / Freikarte once — guard prevents double-increment on re-reveal
    const alreadyRecordedToday = readHistory().some(
      (e) => e.day === state.todaysPull.day && e.token === state.todaysPull.token
    );
    if (state.todaysPull.collectToken && !alreadyRecordedToday) {
      addToken(state.todaysPull.collectToken);
    }
    if (state.todaysPull.freikarte && !alreadyRecordedToday) {
      addFreikarte(state.todaysPull.token);
    }
    // The sky goes onto the pull before the card is drawn, so the date line
    // carries it from the first paint, and onto the record a moment later.
    if (!getPreviewDay()) {
      const w = weatherForEntry(state.weather);
      if (w && !state.todaysPull.weather) state.todaysPull.weather = w;
    }
    renderPull(state.todaysPull);
    mount.classList.remove("is-revealing");
    mount.classList.add("is-revealed");
    mount.classList.add("has-drawn");
    button.disabled = false;
    buttonText.textContent = state.theme.brand.buttonShown;
    state.revealed = true;
    if (!getPreviewDay()) recordHistoryEntry(state.todaysPull);
    // A Flaschenpost that just came out is no longer "unterwegs".
    if (state.todaysPull.flaschenpost) renderWunschkapsel();
    updateAppBadge();
    scheduleStreakWarning();
    const streak = computeStreak();
    renderStreak();
    renderMilestoneBanner(streak);
    // The header folds (CSS, on has-drawn) and the card rises into view, so
    // the thing that just happened is the thing on screen.
    // After the fold has finished (600 ms max-width transition), or the
    // scroll lands 80px past the card because its target moved mid-way.
    window.setTimeout(() => {
      try { $("[data-ag-result]").scrollIntoView({ behavior: "smooth", block: "start" }); } catch (_e) {}
    }, 680);

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

    // Both lamps glow green for ~10s, then return to exactly their prior
    // state. Best-effort and fully async — never blocks or breaks the reveal,
    // and skipped in preview/testing so we don't strobe the real lamps.
    if (!getPreviewDay()) {
      import("./lightsFx.js").then((m) => m.flashLightsForPull(pullCategoryId === "special" ? "special" : pullTone)).catch(() => {});
    }

    if (MILESTONE_MESSAGES[streak]) {
      haptic([30, 20, 30, 20, 60]);
    } else {
      hapticForTone(pullCategoryId === "special" ? "special" : pullTone);
    }
    if (state.activeTab === "history") renderHistory();
    showNotifPrompt();
  }, state.theme.revealDelayMs || 3200);
}

export function bindEvents() {
  let knobGlowTimer = null;
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
  // Tilt feeds the foil sheen on rare/jackpot cards via two custom
  // properties. (Shake-to-draw lived here too; removed on request.)
  initMotion({
    onTilt: (x, y) => {
      mount.style.setProperty("--ag-foil-x", x.toFixed(1) + "%");
      mount.style.setProperty("--ag-foil-y", y.toFixed(1) + "%");
    }
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
    renderGlossaryPanel(glossaryUI.lang);
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
    renderGlossaryPanel(glossaryUI.lang);
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
      glossaryUI.audioBlob = null;
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
    glossaryUI.audioBlob = null;
    if (glossaryUI.recorder && glossaryUI.recorder.state !== "inactive") {
      try { glossaryUI.recorder.stop(); } catch (_) {}
    }
    glossaryUI.recorder = null;
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
    if (glossaryUI.audioBlob) {
      if (statusEl) statusEl.textContent = "Wird hochgeladen…";
      const newId = editId || `${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
      audioUrl = await uploadGlossaryAudio(glossaryUI.audioBlob, newId);
    }
    haptic([20, 20, 40]);
    if (editId) {
      const fields = { word, meaning: meaning || null };
      if (audioUrl !== null) fields.audioUrl = audioUrl;
      updateGlossaryWord(editId, fields);
    } else {
      addGlossaryWord({ id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`, lang: glossaryUI.lang, word, meaning: meaning || null, audioUrl, token: getToken() });
    }
    if (glossaryForm) glossaryForm.hidden = true;
    if (glossaryAddBtn) glossaryAddBtn.hidden = false;
    // Clear the full-screen sheet backdrop the add form opened — without this
    // it stays up after saving and swallows every tap, so the app looks frozen.
    $("[data-ag-sheet-backdrop]")?.classList.remove("is-open");
    document.getElementById("ag-glossary-edit-id").value = "";
    glossaryUI.audioBlob = null;
    glossaryUI.recorder = null;
    renderGlossaryPanel(glossaryUI.lang);
    showToast("Wort gespeichert ✓");
  });

  // Audio record
  const recordBtn = document.getElementById("ag-glossary-record");
  if (recordBtn) {
    recordBtn.addEventListener("click", async () => {
      if (glossaryUI.recorder && glossaryUI.recorder.state === "recording") {
        glossaryUI.recorder.stop();
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        glossaryUI.recorder = new MediaRecorder(stream);
        glossaryUI.recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        glossaryUI.recorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          glossaryUI.audioBlob = new Blob(chunks, { type: glossaryUI.recorder.mimeType || "audio/webm" });
          const statusEl = document.getElementById("ag-glossary-audio-status");
          if (statusEl) statusEl.textContent = "✓ Aufnahme bereit";
          const playPrev = document.getElementById("ag-glossary-play-preview");
          if (playPrev) playPrev.hidden = false;
          recordBtn.textContent = "🎙 Neu aufnehmen";
        };
        glossaryUI.recorder.start();
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
    if (!glossaryUI.audioBlob) return;
    const url = URL.createObjectURL(glossaryUI.audioBlob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.play().catch(() => {});
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
  $("#ag-kurs-close")?.addEventListener("click", closeKursPanel);
  bindLightReactionsToggle($("[data-ag-lights-toggle]"));
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
  $("[data-ag-send]").addEventListener("click", (e) => {
    if (!state.todaysPull) return;
    haptic(8);
    if (sharePullWithPhoto(state.todaysPull, e.currentTarget.href)) e.preventDefault();
  });
  $("[data-ag-star]").addEventListener("click", () => {
    haptic(8);
    toggleFavorite(state.todaysPull);
  });
  $("[data-ag-wallpaper]")?.addEventListener("click", () => {
    if (!state.todaysPull || !state.todaysPull.photo) return;
    haptic(8);
    downloadWallpaper(state.todaysPull);
  });

  // Sync status is a dot; the sentence shows on tap, briefly.
  const syncStatus = $("[data-ag-sync-status]");
  if (syncStatus) {
    let syncOpenTimer = null;
    syncStatus.addEventListener("click", () => {
      syncStatus.classList.add("is-open");
      clearTimeout(syncOpenTimer);
      syncOpenTimer = setTimeout(() => syncStatus.classList.remove("is-open"), 2500);
    });
  }

  // Ferien-Schutz opens from its icon only — the label is a label.
  const ferienToggle = $("[data-ag-ferien-toggle]");
  const ferienBody = $("[data-ag-ferien-body]");
  if (ferienToggle && ferienBody) {
    ferienToggle.addEventListener("click", () => {
      const open = ferienBody.hidden;
      ferienBody.hidden = !open;
      ferienToggle.setAttribute("aria-expanded", String(open));
      haptic(6);
    });
  }

  // Ferien-Schutz: declare a holiday window in Verlauf.
  $("[data-ag-ferien-add]")?.addEventListener("click", () => {
    const from = ($("[data-ag-ferien-from]")?.value || "").trim();
    const to = ($("[data-ag-ferien-to]")?.value || from).trim();
    if (!from) { showToast("Erst ein Datum wählen"); return; }
    const added = addVacation(from, to);
    if (!added) { showToast("Höchstens 60 Tage am Stück"); return; }
    haptic([12, 20, 12]);
    renderFerien();
    renderStreak();
  });

  // Press-and-hold on the capsule itself: the machine is physical, the
  // capsule is the thing you want to touch. Holding charges it (haptic
  // ticks quicken, the capsule swells and glows); letting go after the
  // charge pulls. A short tap does nothing, so a stray touch cannot draw.
  // The draw button keeps the 3 s hold for the hidden letter untouched.
  const capsule = $("[data-capsule]");
  if (capsule) {
    const HOLD_MS = 650;
    let holdTimer = null, tickTimer = null, armed = false, ticks = 0;
    const drawable = () => !mount.classList.contains("has-drawn") && !mount.classList.contains("is-revealing") && !getPreviewDay();
    const stop = () => {
      clearTimeout(holdTimer); clearInterval(tickTimer);
      holdTimer = tickTimer = null; ticks = 0;
      mount.classList.remove("is-charging", "is-charged");
    };
    capsule.addEventListener("pointerdown", (e) => {
      if (!drawable()) return;
      e.preventDefault();
      armed = false;
      mount.classList.add("is-charging");
      tickTimer = setInterval(() => { ticks++; haptic(6 + ticks * 2); }, 130);
      holdTimer = setTimeout(() => { armed = true; mount.classList.add("is-charged"); haptic([20, 30, 40]); }, HOLD_MS);
    });
    const release = () => {
      const fire = armed && drawable();
      stop();
      armed = false;
      if (fire) reveal();
    };
    capsule.addEventListener("pointerup", release);
    capsule.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && drawable()) { e.preventDefault(); haptic(12); reveal(); }
    });
    capsule.addEventListener("pointercancel", () => { stop(); armed = false; });
    capsule.addEventListener("pointerleave", () => { stop(); armed = false; });
  }

  // The knob: one full clockwise turn drops the capsule, like the real
  // machine. Locked once today's is out; it gives a few degrees and clacks.
  bindKnob($("[data-ag-knob]"), {
    drawable: () => !mount.classList.contains("has-drawn") && !mount.classList.contains("is-revealing") && !getPreviewDay(),
    onFire: () => reveal(),
    onHold: openLetter,
    onTick: (n, locked) => {
      if (locked) return;
      mount.classList.add("is-charging");
      clearTimeout(knobGlowTimer);
      knobGlowTimer = setTimeout(() => mount.classList.remove("is-charging"), 600);
      if (n % 4 === 0) playClink();
    }
  });

  // The candle, after dark.
  const candleBtn = $("[data-ag-candle]");
  candleBtn?.addEventListener("click", () => {
    if (candleLit()) blowOut();
    else lightCandle({ onChange: (on) => candleBtn.classList.toggle("is-lit", on) });
  });

  // Two fingers drawing together on the card save it as a Liebling.
  bindPinch($("[data-ag-result]"), () => {
    const pull = state.todaysPull;
    if (!pull || getPreviewDay()) return;
    if (!isFavorite(pull)) toggleFavorite(pull);
    flyCardToStar($("[data-ag-result]"));
    showToast("Als Liebling gespeichert ⭐");
  });

  $("[data-ag-freikarte-redeem]")?.addEventListener("click", () => {
    const pull = state.todaysPull;
    if (!pull) return;
    const tone = pull.category.tone;
    if (tone !== "quiet" && tone !== "cursed") return;
    if (!spendFreikarte(pull.token)) return;

    const streak = computeStreak();
    const rerolled = rerollPullForDay(pull.day, streak);
    writeFreikarteReroll(pull.token, pull.day, {
      categoryId: rerolled.category.id,
      outcomeTitle: rerolled.outcome.title
    });

    state.todaysPull = {
      ...pull,
      category: rerolled.category,
      outcome: rerolled.outcome,
      photo: rerolled.photo,
      collectToken: rerolled.collectToken,
      voucher: rerolled.voucher,
      freikarte: rerolled.freikarte,
      unlockTime: null,
      promptAnswer: null
    };

    const history = readHistory();
    const idx = history.findIndex((e) => e.day === pull.day && e.token === pull.token);
    if (idx !== -1) {
      history[idx] = {
        ...history[idx],
        categoryId: rerolled.category.id,
        categoryLabel: rerolled.category.label,
        tone: rerolled.category.tone,
        title: rerolled.outcome.title,
        message: rerolled.outcome.message,
        link: rerolled.outcome.link || null,
        unlockTime: null,
        promptAnswer: null,
        photo: rerolled.photo
          ? {
              url: rerolled.photo.url,
              alt: rerolled.photo.alt || "",
              caption: (rerolled.photo.caption || "").trim(),
              type: rerolled.photo.type === "video" ? "video" : "image"
            }
          : null,
        voucher: rerolled.voucher || false
      };
      writeHistory(history);
    }
    // Credit the token first. The backup sends readTokens() as it stands when
    // it is called, so backing up before the token existed left it out of the
    // payload — it then sat unsent until some unrelated action happened to
    // push it, which on the old overwrite-from-sheet path meant losing it.
    if (state.todaysPull.collectToken) addToken(state.todaysPull.collectToken);
    if (state.todaysPull.freikarte) addFreikarte(state.todaysPull.token);
    backupToSheets();

    renderPull(state.todaysPull);
    if (state.activeTab === "history") renderHistory();
    triggerConfetti(50);
    showToast("Freikarte eingelöst — nochmal gezogen! 🎟️✨");
    haptic([20, 20, 40]);
  });

  const restoreBtn = $("[data-ag-streak-restore]");
  if (restoreBtn) {
    restoreBtn.addEventListener("click", () => {
      if (!streakRestoreAvailable()) { renderStreakRestore(); return; }
      const gapDay = streakRestoreGapDay();
      const left = streakRestoresLeft();
      const isBirthdayBonus = birthdayBonusLeft() > 0 && (left - birthdayBonusLeft()) <= 0;
      // Two taps instead of confirm(): iOS swallows the dialog in an installed
      // app, and the button sat there doing nothing.
      const rest = left - 1;
      const label = isBirthdayBonus
        ? `🎂 Geschenk: ${formatHistoryDate(gapDay)} retten? Nochmal tippen`
        : `${formatHistoryDate(gapDay)} retten${rest > 0 ? ` (${rest} übrig)` : ", der letzte"}? Nochmal tippen`;
      if (!armConfirm(restoreBtn, label)) return;
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

  // ── The nav stays where the eye expects it ─────────────────────────────────
  // position:fixed is measured against the layout viewport; on iOS the
  // visual viewport is what the eye sees, and the two drift apart with the
  // keyboard, the toolbar and the rubber-band at the end of the page. The
  // nav was then "lost": pinned to a bottom edge that was not the bottom
  // of the screen. Pinned to the visual viewport instead, and out of the
  // way while the keyboard is up.
  (function keepNavInViewport() {
    const nav = mount.querySelector(".ag-bottomnav");
    const vv = window.visualViewport;
    if (!nav || !vv) return;
    const apply = () => {
      const keyboard = vv.height < window.innerHeight * 0.72;
      nav.classList.toggle("is-keyboard", keyboard);
      const gap = Math.max(0, Math.round(window.innerHeight - (vv.offsetTop + vv.height)));
      nav.style.setProperty("--ag-nav-shift", `${keyboard ? 0 : gap}px`);
    };
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    window.addEventListener("orientationchange", () => setTimeout(apply, 350));
    document.addEventListener("focusout", () => setTimeout(apply, 250));
    window.addEventListener("pageshow", apply);
    apply();
  })();

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

  mount.addEventListener("ag-synced", () => {
    try {
      // Token counts are sheet-authoritative — a token earned on another
      // device shows up here as soon as the sync lands.
      renderTokenBank();
      // A reply on a wish that landed since the last sync.
      if (state.todaysPull && state.revealed) renderWishReply(state.todaysPull);
      renderWunschkapsel();
      // A Stups from Fionn's Eingänge. The sync noted a newer ping than the
      // last one seen; the banner used to be wired to nothing.
      if (state._newPing) {
        state._newPing = false;
        const banner = $("[data-ag-ping-banner]");
        if (banner) banner.hidden = false;
        try { haptic([10, 40, 10]); } catch (_err) {}
      }
    } catch (_e) {}
  });

  // ── Stimmung ─────────────────────────────────────────────────────────────────
  $("#ag-btn-skincare")?.addEventListener("click", openSkincarePanel);
  $("#ag-btn-skincare")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSkincarePanel(); }
  });
  $("#ag-skincare-close")?.addEventListener("click", closeSkincarePanel);

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

  // Ping dismiss button
  const pingDismiss = $("[data-ag-ping-dismiss]");
  if (pingDismiss) {
    pingDismiss.addEventListener("click", () => {
      const banner = $("[data-ag-ping-banner]");
      if (banner) banner.hidden = true;
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

  // Flaschenpost: a line to himself, sealed, returned by the machine.
  const postOpen = $("[data-ag-post-open]");
  const postForm = $("[data-ag-post-form]");
  const postIdle = $("[data-ag-post-idle]");
  let postMode = "30";
  if (postOpen && postForm && postIdle) {
    postOpen.addEventListener("click", () => {
      haptic(8);
      postIdle.hidden = true; postForm.hidden = false;
      const input = $("[data-ag-post-input]");
      if (input) input.focus();
    });
    $("[data-ag-post-cancel]")?.addEventListener("click", () => { postForm.hidden = true; postIdle.hidden = false; });
    for (const b of postForm.querySelectorAll("[data-ag-post-mode]")) {
      b.addEventListener("click", () => {
        postMode = b.dataset.agPostMode;
        for (const x of postForm.querySelectorAll("[data-ag-post-mode]")) {
          const on = x === b;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-checked", on ? "true" : "false");
        }
        haptic(6);
      });
    }
    $("[data-ag-post-seal]")?.addEventListener("click", () => {
      const input = $("[data-ag-post-input]");
      const text = (input && input.value || "").trim();
      if (!text) { if (input) input.focus(); return; }
      const today = dateKeyInTimezone(state.theme.timezone);
      const post = sealFlaschenpost(text, postMode, today);
      if (!post) return;
      if (input) input.value = "";
      postForm.hidden = true; postIdle.hidden = false;
      haptic([20, 30, 40]);
      try { triggerConfetti(40, ["#8fcf9e", "#e0a75d", "#fff"]); } catch (_e) {}
      showToast(postMode === "30" ? "🍾 Versiegelt. In dreissig Tagen kommt sie zurück." : "🍾 Versiegelt. Die Maschine gibt sie dir zurück, wann sie will.");
      renderWunschkapsel();
      backupToSheets();
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
