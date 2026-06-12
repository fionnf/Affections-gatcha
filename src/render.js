// ── Render helpers ────────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { getToken, dateKeyInTimezone, hmInTimezone, safeUrl, seededRandom, seededIndex, getPreviewDay, getMissionPlayer } from "./utils.js";
import { readHistory, writeHistory, readFavorites, writeFavorites, readTokens, resetToken, readQuestState, isPinUnlocked, persistPinUnlock, isMilestoneSeen, markMilestoneSeen } from "./storage.js";
import { computeStreak, streakInfo, boostedCategories, streakRestoreAvailable, writeStreakCache, readStreakRestore, writeStreakRestore } from "./streak.js";
import { fetchJson } from "./sync.js";
import { triggerConfetti } from "./confetti.js";
import { setCapsuleTone, emojiForTone, buildPull, imagePhotos, checkSpecialDay } from "./pull.js";
import { TOKEN_REWARDS } from "./constants.js";
import { backupToSheets } from "./sync.js";
import { extractDriveFileId } from "./utils.js";
import { isQuestAvailable, isMissionDoneToday } from "./mission.js";

// Module-level closures
let lightboxImgErrorHandler = null;

// ── Escape / format helpers ──────────────────────────────────────────────────

export function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function formatMsg(text) {
  if (!text) return "";
  const safe = escHtml(text);
  return safe.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
}

// ── displayNameFromToken (needed by several render functions) ────────────────

export function displayNameFromToken() {
  const token = getToken();
  return token
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase("de-CH") + part.slice(1))
    .join(" ") || state.theme.brand.displayNameDefault || "Lennart";
}

export function defaultChips() {
  return ["Bärlauch", "Rave 🪩", "Glossar 📖"];
}

// ── Today formatting ─────────────────────────────────────────────────────────

export function formatToday() {
  try {
    const date = new Date();
    return new Intl.DateTimeFormat("de-CH", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      timeZone: state.theme.timezone
    }).format(date);
  } catch (error) {
    return dateKeyInTimezone(state.theme.timezone);
  }
}

// ── Emoji orbit ──────────────────────────────────────────────────────────────

export const REQUIRED_EMOJIS = ["🚴", "🧄"];
export const EMOJI_POOL = [
  "🥾", "🌲", "🧗‍♂️", "✨",
  "📚", "💭", "🌙", "☕",
  "🔥", "💛", "🫶", "🌿",
  "🎿", "❄️", "😄", "🎶",
  "🌊", "🚤", "🍃", "🌍",
  "💌", "🥹", "🌈", "🕊️",
  "😏", "💫", "🧠", "⚡",
  "🍝", "🍷", "😋", "🌆",
  "🎧", "🎵", "💃", "🪩",
  "🌄", "🧭", "🚶‍♂️", "🍂",
  "💬", "👀", "🤍", "🔐",
  "🏔️", "🪨", "💪", "🌤️",
  "😂", "🤭", "🎯", "💥",
  "🛤️", "🌌", "🕯️", "📖",
  "❤️‍🔥", "😇", "😈",
  "🍓", "🍫", "😚",
  "🫂", "🌻", "🌞",
  "🐻", "🛌",
  "🎻", "👨‍❤️‍👨"
];

export function emojiSeedKey() {
  const day = dateKeyInTimezone(state.theme.timezone);
  const token = getToken();
  return `${state.theme.secret}|${token}|${day}|emoji`;
}

export function pickEmojiSet() {
  const seedBase = emojiSeedKey();
  const count = 3 + Math.floor(seededRandom(`${seedBase}|count`) * 3); // 3..5
  const pool = EMOJI_POOL.slice();
  const chosen = [];
  for (let i = 0; i < count && pool.length; i += 1) {
    const idx = Math.floor(seededRandom(`${seedBase}|pick|${i}`) * pool.length);
    chosen.push(pool.splice(idx, 1)[0]);
  }
  return [...REQUIRED_EMOJIS, ...chosen];
}

export function renderEmojiOrbit() {
  const orbit = $("[data-ag-emoji-orbit]");
  if (!orbit) return;
  orbit.innerHTML = "";
  const emojis = pickEmojiSet();
  const total = emojis.length;
  const seedBase = emojiSeedKey();
  emojis.forEach((emoji, i) => {
    const span = document.createElement("span");
    span.className = "ag-emoji";
    span.textContent = emoji;
    const baseAngle = (360 / total) * i;
    const jitter = (seededRandom(`${seedBase}|angle|${i}`) - 0.5) * 28;
    const angle = baseAngle + jitter;
    const radiusJitter = seededRandom(`${seedBase}|radius|${i}`) * 21 - 10.5;
    const duration = 16 + seededRandom(`${seedBase}|dur|${i}`) * 10; // 16..26s
    const delay = -seededRandom(`${seedBase}|delay|${i}`) * duration;
    const direction = seededRandom(`${seedBase}|dir|${i}`) > 0.5 ? 1 : -1;
    span.style.setProperty("--ag-emoji-angle", `${angle}deg`);
    span.style.setProperty("--ag-emoji-radius", `${250 + radiusJitter}%`);
    span.style.setProperty("--ag-emoji-duration", `${duration.toFixed(2)}s`);
    span.style.setProperty("--ag-emoji-delay", `${delay.toFixed(2)}s`);
    span.style.setProperty("--ag-emoji-direction", direction === 1 ? "normal" : "reverse");
    orbit.appendChild(span);
  });
}

// ── Streak rendering ─────────────────────────────────────────────────────────

export function renderStreak() {
  const el = $("[data-ag-streak]");
  const streak = computeStreak();

  const r = readStreakRestore();
  if (streak > (r.maxStreak || 0)) {
    writeStreakRestore({ ...r, maxStreak: streak });
  }

  if (el) {
    const info = streakInfo(streak);
    if (!info) {
      el.hidden = true;
    } else {
      el.hidden = false;
      el.textContent = `${info.emoji} ${info.label}`;
      el.dataset.agStreakTier = info.tier;
    }
  }

  renderStreakRestore();
}

export function renderStreakRestore() {
  const btn = $("[data-ag-streak-restore]");
  if (!btn) return;
  btn.hidden = !streakRestoreAvailable();
}

// ── Milestone banner ─────────────────────────────────────────────────────────

export const MILESTONE_MESSAGES = {
  7:   "🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",
  14:  "🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",
  21:  "✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",
  30:  "💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",
  50:  "🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",
  60:  "🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",
  75:  "✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",
  100: "💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",
  150: "🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",
  200: "🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",
  365: "💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."
};

export function renderMilestoneBanner(streak) {
  const el = $("[data-ag-milestone]");
  if (!el) return;
  const msg = MILESTONE_MESSAGES[streak];
  if (!msg) { el.hidden = true; return; }
  const token = getToken();
  if (isMilestoneSeen(token, streak)) { el.hidden = true; return; }
  $("[data-ag-milestone-text]").textContent = msg;
  el.hidden = false;
  markMilestoneSeen(token, streak);
}

// ── Ping banner ──────────────────────────────────────────────────────────────

export function showPingBanner() {
  const banner = $("[data-ag-ping-banner]");
  if (!banner) return;
  banner.hidden = false;
  window.setTimeout(() => { if (banner) banner.hidden = true; }, 7000);
}

// ── PIN gates ────────────────────────────────────────────────────────────────

export function buildPromptGate(prompt, onSubmit) {
  const wrap = document.createElement("div");
  wrap.className = "ag-prompt-gate";
  const q = document.createElement("p");
  q.className = "ag-prompt-question";
  q.textContent = "💭 " + prompt;
  const textarea = document.createElement("textarea");
  textarea.className = "ag-prompt-textarea";
  textarea.placeholder = "Schreib hier deine Antwort...";
  textarea.rows = 4;
  const err = document.createElement("p");
  err.className = "ag-pin-err";
  err.hidden = true;
  err.textContent = "Bitte erst antworten.";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ag-button";
  btn.style.cssText = "width:100%;margin-top:4px";
  btn.textContent = "Kapsel öffnen ✨";
  function attempt() {
    const val = textarea.value.trim();
    if (!val) {
      err.hidden = false;
      textarea.classList.add("ag-pin-shake");
      setTimeout(() => textarea.classList.remove("ag-pin-shake"), 450);
      return;
    }
    onSubmit(val);
  }
  btn.addEventListener("click", attempt);
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) attempt();
  });
  wrap.appendChild(q);
  wrap.appendChild(textarea);
  wrap.appendChild(err);
  wrap.appendChild(btn);
  return wrap;
}

function _firePromptNotification(pull, answer) {
  try {
    const cfg = state.backup;
    if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
    const body = JSON.stringify({ type: "prompt-answer", token: pull.token, day: pull.day, prompt: pull.outcome.prompt, answer });
    const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
    fetch(cfg.endpointUrl, opts).catch(() => { fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {}); });
  } catch (_e) {}
}

export function buildPinGate(pin, onUnlock, hintText) {
  const wrap = document.createElement("div");
  wrap.className = "ag-pin-gate";
  const hint = document.createElement("p");
  hint.className = "ag-pin-hint";
  hint.textContent = hintText || "🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";
  const row = document.createElement("div");
  row.className = "ag-pin-row";
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.maxLength = 4;
  input.className = "ag-pin-input";
  input.placeholder = "_ _ _ _";
  input.autocomplete = "off";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ag-secondary";
  btn.textContent = "Öffnen";
  const err = document.createElement("p");
  err.className = "ag-pin-err";
  err.hidden = true;
  err.textContent = "Falsche Zahl. Noch einmal.";
  function attempt() {
    if (input.value.trim() === pin) {
      persistPinUnlock(pin);
      onUnlock();
    } else {
      err.hidden = false;
      input.classList.add("ag-pin-shake");
      input.value = "";
      setTimeout(() => input.classList.remove("ag-pin-shake"), 450);
    }
  }
  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); });
  row.appendChild(input);
  row.appendChild(btn);
  wrap.appendChild(hint);
  wrap.appendChild(row);
  wrap.appendChild(err);
  return wrap;
}

export function buildLinkPinGate(pin, linkWrap, pull) {
  const wrap = document.createElement("div");
  wrap.className = "ag-pin-gate";
  const lockLine = document.createElement("span");
  lockLine.className = "ag-outcome-link-locked";
  lockLine.textContent = `🔒 Ab ${pull.unlockTime} verfügbar`;
  const hint = document.createElement("p");
  hint.className = "ag-pin-hint";
  hint.style.marginTop = "10px";
  hint.textContent = "Oder: erste drei Buchstaben deines Ziels 🗺️";
  const row = document.createElement("div");
  row.className = "ag-pin-row";
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 3;
  input.className = "ag-pin-input";
  input.placeholder = "_ _ _";
  input.autocomplete = "off";
  input.spellcheck = false;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ag-secondary";
  btn.textContent = "Öffnen";
  const err = document.createElement("p");
  err.className = "ag-pin-err";
  err.hidden = true;
  err.textContent = "Nicht ganz. Versuch nochmal.";
  function attempt() {
    if (input.value.trim().toLowerCase() === pin.toLowerCase()) {
      persistPinUnlock("link-" + pin);
      wrap.remove();
      renderLinkInto(linkWrap, pull.outcome.link);
    } else {
      err.hidden = false;
      input.classList.add("ag-pin-shake");
      input.value = "";
      setTimeout(() => input.classList.remove("ag-pin-shake"), 450);
    }
  }
  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); });
  row.appendChild(input);
  row.appendChild(btn);
  wrap.appendChild(lockLine);
  wrap.appendChild(hint);
  wrap.appendChild(row);
  wrap.appendChild(err);
  return wrap;
}

// ── Link / token / media ─────────────────────────────────────────────────────

function buildSpotifyEmbed(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "open.spotify.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const type = parts[0];
    const id = parts[1];
    const validTypes = ["track", "album", "playlist", "artist", "episode", "show"];
    if (!validTypes.includes(type)) return null;
    const iframe = document.createElement("iframe");
    iframe.src = `https://open.spotify.com/embed/${type}/${id}`;
    iframe.width = "100%";
    iframe.height = (type === "track" || type === "episode") ? "80" : "152";
    iframe.setAttribute("frameborder", "0");
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("title", "Spotify player");
    iframe.className = "ag-spotify-iframe";
    return iframe;
  } catch (e) {
    return null;
  }
}

function buildGenericLink(url) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  a.className = "ag-outcome-link ag-secondary";
  a.textContent = "🔗 Link öffnen";
  return a;
}

export function renderLinkInto(container, link) {
  container.innerHTML = "";
  if (!link) { container.hidden = true; return; }
  const safe = safeUrl(link);
  if (!safe) { container.hidden = true; return; }
  const spotifyEl = buildSpotifyEmbed(safe);
  container.appendChild(spotifyEl || buildGenericLink(safe));
  container.hidden = false;
}

export function renderTokenInto(container, pull) {
  container.innerHTML = "";
  if (!pull.collectToken) { container.hidden = true; return; }
  const t = pull.collectToken;
  const count = readTokens()[t] || 0;
  const reward = TOKEN_REWARDS[t] || "";
  const TOKEN_GOAL = 5;
  const redeemed = count >= TOKEN_GOAL;

  if (redeemed) {
    container.innerHTML = `
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${t.repeat(TOKEN_GOAL)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${reward}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`;
    container.hidden = false;
    container.querySelector("#ag-token-redeem").addEventListener("click", () => {
      resetToken(t);
      backupToSheets();
      container.innerHTML = `<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>`;
      if (state.wishInbox && state.wishInbox.enabled) {
        const body = JSON.stringify({ timestamp: new Date().toISOString(), token: getToken(), wish: `🎁 Sammelkapsel eingelöst: ${t} × ${TOKEN_GOAL} — ${reward}`, pageUrl: location.href, userAgent: navigator.userAgent });
        fetch(state.wishInbox.endpointUrl, { method: "POST", mode: "cors", credentials: "omit", headers: { "Content-Type": "text/plain;charset=utf-8" }, body }).catch(() => {});
      }
    });
  } else {
    const remaining = TOKEN_GOAL - count;
    container.innerHTML = `
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${t.repeat(count)}${"⬜".repeat(TOKEN_GOAL - count)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${remaining} × ${t} bis: <em>${reward}</em></p>
      </div>`;
    container.hidden = false;
  }
}


export function renderMediaInto(container, photo) {
  container.innerHTML = "";
  if (!photo || photo.type === "video") return;
  const altText = photo.alt || "Foto von uns";
  const stage = document.createElement("div");
  stage.className = "ag-media-frame";

  const backdrop = document.createElement("div");
  backdrop.className = "ag-media-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  if (photo.type !== "video") {
    backdrop.style.backgroundImage = `url("${photo.url}")`;
  }
  stage.appendChild(backdrop);

  let mediaEl;
  if (photo.type === "video") {
    const driveId = extractDriveFileId(photo.url);
    if (driveId) {
      const wrapper = document.createElement("div");
      wrapper.className = "ag-media-content ag-drive-poster";
      wrapper.setAttribute("role", "button");
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("aria-label", `${altText} abspielen`);

      const poster = document.createElement("img");
      poster.src = `https://lh3.googleusercontent.com/d/${driveId}`;
      poster.alt = altText;
      poster.className = "ag-drive-poster-img";
      poster.addEventListener("error", () => poster.remove(), { once: true });
      wrapper.appendChild(poster);

      const playBtn = document.createElement("div");
      playBtn.className = "ag-drive-play-btn";
      playBtn.setAttribute("aria-hidden", "true");
      wrapper.appendChild(playBtn);

      const activate = () => {
        wrapper.removeEventListener("click", activate);
        wrapper.removeEventListener("keydown", onKey);
        wrapper.removeAttribute("role");
        wrapper.removeAttribute("tabindex");
        wrapper.style.cursor = "";
        wrapper.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.src = `https://drive.google.com/file/d/${driveId}/preview?autoplay=1`;
        iframe.allow = "autoplay";
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("aria-label", altText);
        iframe.className = "ag-drive-iframe";
        wrapper.appendChild(iframe);
      };
      const onKey = (e) => { if (e.key === "Enter" || e.key === " ") activate(); };
      wrapper.addEventListener("click", activate);
      wrapper.addEventListener("keydown", onKey);

      mediaEl = wrapper;
    } else {
      mediaEl = document.createElement("video");
      mediaEl.src = safeUrl(photo.url);
      mediaEl.controls = true;
      mediaEl.muted = true;
      mediaEl.playsInline = true;
      mediaEl.setAttribute("playsinline", "");
      mediaEl.setAttribute("preload", "metadata");
      mediaEl.setAttribute("aria-label", altText);
      mediaEl.className = "ag-media-content";
    }
  } else {
    mediaEl = document.createElement("img");
    mediaEl.alt = altText;
    mediaEl.loading = "eager";
    mediaEl.decoding = "auto";
    mediaEl.className = "ag-media-content";

    mediaEl.addEventListener("load", () => {
      const ratio = mediaEl.naturalWidth && mediaEl.naturalHeight
        ? mediaEl.naturalWidth / mediaEl.naturalHeight : 1;
      stage.dataset.orientation = ratio < 0.95 ? "portrait" : ratio > 1.15 ? "landscape" : "square";
    }, { once: true });

    mediaEl.addEventListener("error", () => {
      fetchJson("config/photos.json", { photos: [] }).then((fresh) => {
        const { normalizePhotos } = _getNormalizePhotos();
        const freshPhotos = normalizePhotos(fresh);
        const match =
          freshPhotos.find((p) => p.alt === photo.alt && p.type !== "video") ||
          freshPhotos.find((p) => p.type !== "video") ||
          null;
        if (match && match.url) {
          backdrop.style.backgroundImage = `url("${match.url}")`;
          mediaEl.src = safeUrl(match.url);
          state.photos = freshPhotos;
        } else {
          const wrap = mediaEl.closest("[data-ag-photo-wrap]");
          if (wrap) wrap.hidden = true;
        }
      }).catch(() => {
        const wrap = mediaEl.closest("[data-ag-photo-wrap]");
        if (wrap) wrap.hidden = true;
      });
    }, { once: true });

    mediaEl.src = safeUrl(photo.url);
  }

  stage.appendChild(mediaEl);
  container.appendChild(stage);
}

// Forward reference resolved at call time
function _getNormalizePhotos() {
  // normalizePhotos is in init.js — import it lazily
  // We use a dynamic approach since init.js imports render.js (circular)
  // Instead, inline a minimal version that mirrors the dist logic
  return {
    normalizePhotos: (photosConfig) => {
      const VIDEO_EXTS = /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;
      const photos = Array.isArray(photosConfig?.photos) ? photosConfig.photos : [];
      return photos.map((photo) => {
        const isVideo = photo.type === "video" || VIDEO_EXTS.test(photo.url || "");
        return { ...photo, type: isVideo ? "video" : "image" };
      }).filter((photo) => photo.url);
    }
  };
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

export function openLightbox(url, caption, isVideo, altHint) {
  const lb = $("#ag-lightbox");
  const img = $("#ag-lightbox-img");
  const cap = $("#ag-lightbox-caption");
  const driveLink = $("#ag-lightbox-drive-link");
  if (!lb || !img) return;
  lb.querySelector(".ag-lightbox-iframe")?.remove();
  lb.querySelector(".ag-lightbox-video")?.remove();
  if (lightboxImgErrorHandler) {
    img.removeEventListener("error", lightboxImgErrorHandler);
    lightboxImgErrorHandler = null;
  }
  img.onerror = null;
  if (driveLink) driveLink.hidden = true;

  const driveId = isVideo ? extractDriveFileId(url) : null;
  if (driveId) {
    img.hidden = true;
    const iframe = document.createElement("iframe");
    iframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
    iframe.allow = "autoplay";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("frameborder", "0");
    iframe.className = "ag-lightbox-iframe";
    lb.insertBefore(iframe, cap);
    if (driveLink) {
      driveLink.href = `https://drive.google.com/file/d/${driveId}/view`;
      driveLink.hidden = false;
    }
  } else if (isVideo) {
    img.hidden = true;
    const safe = safeUrl(url);
    if (!safe) return;
    const video = document.createElement("video");
    video.src = safe;
    video.controls = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.className = "ag-lightbox-video";
    video.setAttribute("aria-label", caption || "");
    lb.insertBefore(video, cap);
  } else {
    img.hidden = false;
    const safe = safeUrl(url);
    if (!safe) return;
    img.src = safe;
    img.alt = caption || "";
    lightboxImgErrorHandler = () => {
      const lookupAlt = altHint || caption;
      fetchJson("config/photos.json", { photos: [] }).then((fresh) => {
        const { normalizePhotos } = _getNormalizePhotos();
        const freshPhotos = normalizePhotos(fresh);
        const match = freshPhotos.find((p) => p.alt === lookupAlt) || null;
        if (match && match.url) {
          img.src = safeUrl(match.url);
          state.photos = freshPhotos;
        }
      }).catch(() => {});
    };
    img.addEventListener("error", lightboxImgErrorHandler, { once: true });
  }

  cap.textContent = caption || "";
  cap.hidden = !caption;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}

export function closeLightbox() {
  const lb = $("#ag-lightbox");
  if (!lb) return;
  lb.querySelector(".ag-lightbox-iframe")?.remove();
  lb.querySelector(".ag-lightbox-video")?.remove();
  const lbImg = lb.querySelector(".ag-lightbox-img");
  if (lbImg) {
    if (lightboxImgErrorHandler) {
      lbImg.removeEventListener("error", lightboxImgErrorHandler);
      lightboxImgErrorHandler = null;
    }
    lbImg.hidden = false;
  }
  lb.hidden = true;
  document.body.style.overflow = "";
}

// ── Message text (for sharing) ────────────────────────────────────────────────

export function messageText(pull) {
  const emoji = emojiForTone(pull.category.tone);
  return [
    `${emoji} ${displayNameFromToken()}s ${state.theme.brand.machineName}: ${pull.category.label}`,
    pull.outcome.title,
    pull.outcome.message,
    (pull.outcome.link && (!pull.unlockTime || (() => {
      const [h, m] = pull.unlockTime.split(":").map(Number);
      const now = hmInTimezone(state.theme?.timezone || "UTC");
      return now.h > h || (now.h === h && now.m >= m);
    })()))
      ? `🔗 ${pull.outcome.link}` : "",
    pull.photo ? `📸 ${pull.photo.caption || pull.photo.alt || "Foto-Drop"}` : "",
    `Tag: ${pull.day}`
  ]
    .filter(Boolean)
    .join("\n");
}

// ── renderPull ────────────────────────────────────────────────────────────────

export function renderPull(pull) {
  mount.dataset.tone = pull.category.tone;
  setCapsuleTone(pull.category.tone);
  $("[data-ag-rarity]").textContent = pull.category.label;
  $("[data-ag-date]").textContent = pull.day;
  $("[data-ag-title]").textContent = pull.outcome.title;
  const msgEl = $("[data-ag-message]");
  if (!msgEl) return;
  msgEl.innerHTML = formatMsg(pull.outcome.message);
  msgEl.hidden = false;

  // Prompt gate: shown after animation, hides content until answered
  if (pull.outcome.prompt && !pull.promptAnswer) {
    msgEl.hidden = true;
    const promptGate = buildPromptGate(pull.outcome.prompt, (answer) => {
      pull.promptAnswer = answer;
      _firePromptNotification(pull, answer);
      if (!getPreviewDay()) {
        const hist = readHistory();
        const entry = hist.find(e => e.day === pull.day && e.token === pull.token);
        if (entry) { entry.promptAnswer = answer; writeHistory(hist); }
      }
      promptGate.remove();
      renderPull(pull);
    });
    msgEl.parentNode.insertBefore(promptGate, msgEl);
    return;
  }

  const resultEl = $("[data-ag-result]");
  const oldGate = resultEl ? resultEl.querySelector("[data-ag-pin-gate]") : null;
  if (oldGate) oldGate.remove();

  const linkWrap = $("[data-ag-link-wrap]");

  if (pull.outcome.pin) {
    const hasSeparateMsg = !!pull.outcome.pinMessage;
    if (!hasSeparateMsg) msgEl.hidden = !isPinUnlocked(pull.outcome.pin);

    if (!isPinUnlocked(pull.outcome.pin)) {
      let pinMsgEl = null;
      if (hasSeparateMsg) {
        pinMsgEl = document.createElement("div");
        pinMsgEl.className = "ag-message";
        pinMsgEl.hidden = true;
        pinMsgEl.innerHTML = formatMsg(pull.outcome.pinMessage);
        msgEl.parentNode.insertBefore(pinMsgEl, msgEl.nextSibling);
      }
      const gate = buildPinGate(pull.outcome.pin, () => {
        gate.remove();
        if (hasSeparateMsg) { pinMsgEl.hidden = false; }
        else { msgEl.hidden = false; }
        if (pull.outcome.link && linkWrap) renderLinkInto(linkWrap, pull.outcome.link);
      }, pull.outcome.pinHint);
      gate.setAttribute("data-ag-pin-gate", "");
      const anchor = hasSeparateMsg ? pinMsgEl : msgEl;
      anchor.parentNode.insertBefore(gate, anchor);
    } else if (hasSeparateMsg) {
      const pinMsgEl = document.createElement("div");
      pinMsgEl.className = "ag-message";
      pinMsgEl.innerHTML = formatMsg(pull.outcome.pinMessage);
      msgEl.parentNode.insertBefore(pinMsgEl, msgEl.nextSibling);
    }
  }

  const photoWrap = $("[data-ag-photo-wrap]");
  const photoMedia = $("[data-ag-photo-media]");
  const photoCaption = $("[data-ag-photo-caption]");

  if (pull.outcome.link && (pull.unlockTime || (pull.outcome.pin && isPinUnlocked(pull.outcome.pin)))) {
    const [h, m] = pull.unlockTime.split(":").map(Number);
    const now = hmInTimezone(state.theme?.timezone || "UTC");
    const lpin = pull.outcome.linkPin;
    if (lpin) {
      if (isPinUnlocked("link-" + lpin)) {
        renderLinkInto(linkWrap, pull.outcome.link);
      } else {
        const pinAvailable = (() => {
          if (!pull.outcome.linkPinFrom) return true;
          const [ph, pm] = pull.outcome.linkPinFrom.split(":").map(Number);
          return now.h > ph || (now.h === ph && now.m >= pm);
        })();
        if (pinAvailable) {
          const gate = buildLinkPinGate(lpin, linkWrap, pull);
          linkWrap.innerHTML = "";
          linkWrap.appendChild(gate);
          linkWrap.hidden = false;
        } else {
          const lockSpan = document.createElement("span");
          lockSpan.className = "ag-outcome-link-locked";
          lockSpan.textContent = `🔒 Ab ${pull.unlockTime} verfügbar`;
          linkWrap.innerHTML = "";
          linkWrap.appendChild(lockSpan);
          linkWrap.hidden = false;
        }
      }
    } else {
      const unlockedByTime = now.h > h || (now.h === h && now.m >= m);
      if (unlockedByTime) {
        renderLinkInto(linkWrap, pull.outcome.link);
      } else {
        const lockSpan = document.createElement("span");
        lockSpan.className = "ag-outcome-link-locked";
        lockSpan.textContent = `🔒 Ab ${pull.unlockTime} verfügbar`;
        linkWrap.innerHTML = "";
        linkWrap.appendChild(lockSpan);
        linkWrap.hidden = false;
      }
    }
  } else {
    const blockedByPin = pull.outcome.pin && !isPinUnlocked(pull.outcome.pin);
    if (!blockedByPin) renderLinkInto(linkWrap, pull.outcome.link || null);
  }

  renderTokenInto($("[data-ag-token-wrap]"), pull);

  if (pull.photo) {
    renderMediaInto(photoMedia, pull.photo);
    const caption = (pull.photo.caption || "").trim();
    if (caption) {
      photoCaption.textContent = caption;
      photoCaption.hidden = false;
    } else {
      photoCaption.textContent = "";
      photoCaption.hidden = true;
    }
    photoWrap.hidden = false;
  } else {
    photoMedia.innerHTML = "";
    photoCaption.textContent = "";
    photoCaption.hidden = true;
    photoWrap.hidden = true;
  }

  const text = messageText(pull);
  const encodedSubject = encodeURIComponent("Mein Gacha-Zug");
  const encodedBody = encodeURIComponent(text);
  const sendLink = $("[data-ag-send]");
  if (state.theme.messageTarget.startsWith("mailto:")) {
    sendLink.href = `${state.theme.messageTarget}?subject=${encodedSubject}&body=${encodedBody}`;
  } else {
    sendLink.href = state.theme.messageTarget.replace("{text}", encodedBody);
  }

  const saveImgBtn = $("[data-ag-save-img]");
  if (saveImgBtn) {
    saveImgBtn.hidden = !(pull.category.id === "rare" || pull.category.id === "jackpot");
  }

  $("[data-ag-result]").hidden = false;
  updateStarButton();
}

// ── Favorites ────────────────────────────────────────────────────────────────

export function isFavorite(pull) {
  if (!pull) return false;
  return readFavorites().some((f) => f.day === pull.day && f.token === pull.token);
}

export function isFavoriteEntry(entry) {
  return readFavorites().some((f) => f.day === entry.day && f.token === entry.token);
}

export function updateStarButton() {
  const btn = $("[data-ag-star]");
  if (!btn) return;
  const starred = isFavorite(state.todaysPull);
  btn.textContent = starred ? "★" : "☆";
  btn.classList.toggle("is-starred", starred);
  btn.title = starred ? "Aus Lieblingen entfernen" : "Als Lieblingspreis speichern";
}

export function toggleFavoriteFromEntry(entry, starBtn) {
  const favs = readFavorites();
  const idx = favs.findIndex((f) => f.day === entry.day && f.token === entry.token);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.unshift({
      day: entry.day,
      token: entry.token,
      categoryId: entry.categoryId,
      categoryLabel: entry.categoryLabel,
      tone: entry.tone,
      title: entry.title,
      message: entry.message,
      link: entry.link || null,
      unlockTime: entry.unlockTime || null,
      photo: entry.photo || null,
      starredAt: Date.now()
    });
  }
  writeFavorites(favs);
  backupToSheets();
  const starred = isFavoriteEntry(entry);
  starBtn.textContent = starred ? "★" : "☆";
  starBtn.classList.toggle("is-starred", starred);
  starBtn.title = starred ? "Aus Lieblingen entfernen" : "Als Lieblingspreis speichern";
  if (state.activeTab === "lieblinge") renderLieblinge();
}

export function toggleFavorite(pull) {
  if (!pull) return;
  const favs = readFavorites();
  const idx = favs.findIndex((f) => f.day === pull.day && f.token === pull.token);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.unshift({
      day: pull.day,
      token: pull.token,
      categoryId: pull.category.id,
      categoryLabel: pull.category.label,
      tone: pull.category.tone,
      title: pull.outcome.title,
      message: pull.outcome.message,
      link: pull.outcome.link || null,
      photo: pull.photo
        ? {
            url: pull.photo.url,
            alt: pull.photo.alt || "",
            caption: (pull.photo.caption || "").trim(),
            type: pull.photo.type === "video" ? "video" : "image"
          }
        : null,
      starredAt: Date.now()
    });
  }
  writeFavorites(favs);
  backupToSheets();
  updateStarButton();
  if (state.activeTab === "lieblinge") renderLieblinge();
}

export function recordHistoryEntry(pull) {
  if (!pull) return;
  const entry = {
    day: pull.day,
    token: pull.token,
    categoryId: pull.category.id,
    categoryLabel: pull.category.label,
    tone: pull.category.tone,
    title: pull.outcome.title,
    message: pull.outcome.message,
    link: pull.outcome.link || null,
    unlockTime: pull.unlockTime || null,
    promptAnswer: pull.promptAnswer || null,
    photo: pull.photo
      ? {
          url: pull.photo.url,
          alt: pull.photo.alt || "",
          caption: (pull.photo.caption || "").trim(),
          type: pull.photo.type === "video" ? "video" : "image"
        }
      : null,
    revealedAt: Date.now()
  };
  const existing = readHistory();
  const seen = new Set();
  const merged = [entry, ...existing].filter((item) => {
    if (!item || typeof item.day !== "string" || typeof item.token !== "string") return false;
    const key = `${item.day}|${item.token}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  merged.sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
  writeHistory(merged);
  writeStreakCache(0);
  backupToSheets();
}

// ── History items ────────────────────────────────────────────────────────────

function buildHistoryLink(entry) {
  if (!entry.link) return null;
  if (entry.unlockTime) {
    const now = new Date();
    const [h, m] = entry.unlockTime.split(":").map(Number);
    const unlocked = now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m);
    if (!unlocked) {
      const span = document.createElement("span");
      span.className = "ag-outcome-link-locked";
      span.textContent = `🔒 Ab ${entry.unlockTime} verfügbar`;
      return span;
    }
  }
  const safeLink = safeUrl(entry.link);
  return safeLink ? buildGenericLink(safeLink) : null;
}

export function renderHistoryItemEl(entry) {
  const li = document.createElement("li");
  li.className = "ag-history-item";
  li.dataset.tone = entry.tone || "soft";

  const head = document.createElement("div");
  head.className = "ag-history-head";
  const date = document.createElement("span");
  date.className = "ag-history-date";
  const { formatHistoryDate } = _getFormatHistoryDate();
  date.textContent = formatHistoryDate(entry.day);
  const badge = document.createElement("span");
  badge.className = "ag-history-badge";
  badge.textContent = entry.categoryLabel || "Kapsel";

  const starBtn = document.createElement("button");
  starBtn.type = "button";
  starBtn.className = "ag-history-star" + (isFavoriteEntry(entry) ? " is-starred" : "");
  starBtn.textContent = isFavoriteEntry(entry) ? "★" : "☆";
  starBtn.title = isFavoriteEntry(entry) ? "Aus Lieblingen entfernen" : "Als Lieblingspreis speichern";
  starBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleFavoriteFromEntry(entry, starBtn);
  });

  head.appendChild(date);
  head.appendChild(badge);
  head.appendChild(starBtn);

  const title = document.createElement("p");
  title.className = "ag-history-title";
  title.textContent = entry.title || "";

  const message = document.createElement("div");
  message.className = "ag-history-message";
  message.innerHTML = formatMsg(entry.message || "");

  let answerEl = null;
  if (entry.promptAnswer) {
    answerEl = document.createElement("blockquote");
    answerEl.className = "ag-history-answer";
    answerEl.textContent = entry.promptAnswer;
  }

  li.appendChild(head);

  const VIDEO_EXTS_HIST = /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;
  const isVideoPhoto = entry.photo &&
    (entry.photo.type === "video" || VIDEO_EXTS_HIST.test(entry.photo.url || ""));

  if (entry.photo && !isVideoPhoto) {
    const body = document.createElement("div");
    body.className = "ag-history-body";

    const thumb = document.createElement("div");
    thumb.className = "ag-history-thumb";
    const img = document.createElement("img");
    img.src = safeUrl(entry.photo.url);
    img.alt = entry.photo.alt || "Foto-Drop";
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", function () {
      fetchJson("config/photos.json", { photos: [] }).then((fresh) => {
        const { normalizePhotos } = _getNormalizePhotos();
        const freshPhotos = normalizePhotos(fresh);
        const match =
          freshPhotos.find((p) => p.alt === entry.photo.alt && p.type !== "video") ||
          freshPhotos.find((p) => p.type !== "video") ||
          null;
        if (match && match.url) {
          entry.photo.url = match.url;
          img.src = safeUrl(match.url);
          state.photos = freshPhotos;
        } else {
          thumb.classList.add("is-broken");
          img.remove();
          const icon = document.createElement("span");
          icon.className = "ag-history-thumb-broken";
          icon.textContent = "📷";
          thumb.appendChild(icon);
        }
      }).catch(() => {
        thumb.classList.add("is-broken");
        img.remove();
        const icon = document.createElement("span");
        icon.className = "ag-history-thumb-broken";
        icon.textContent = "📷";
        thumb.appendChild(icon);
      });
    }, { once: true });
    thumb.appendChild(img);
    thumb.style.cursor = "pointer";
    thumb.title = "Vollansicht";
    thumb.addEventListener("click", () => openLightbox(entry.photo.url, entry.photo.caption || entry.photo.alt || "", false, entry.photo.alt));

    const text = document.createElement("div");
    text.className = "ag-history-text";
    text.appendChild(title);
    text.appendChild(message);
    if (answerEl) text.appendChild(answerEl);
    if (entry.link) {
      const linkEl = buildHistoryLink(entry);
      if (linkEl) text.appendChild(linkEl);
    }

    body.appendChild(thumb);
    body.appendChild(text);
    li.appendChild(body);
  } else {
    li.appendChild(title);
    li.appendChild(message);
    if (answerEl) li.appendChild(answerEl);
    if (entry.link) {
      const linkEl = buildHistoryLink(entry);
      if (linkEl) li.appendChild(linkEl);
    }
  }

  return li;
}

function _getFormatHistoryDate() {
  return {
    formatHistoryDate: (dayKey) => {
      const [y, m, d] = dayKey.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      try {
        return new Intl.DateTimeFormat("de-CH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }).format(date);
      } catch (error) {
        return dayKey;
      }
    }
  };
}

export function renderHistory() {
  const list = $("[data-ag-history]");
  const empty = $("[data-ag-history-empty]");
  const note = $("[data-ag-history-note]");
  list.innerHTML = "";

  const token = getToken();
  const today = dateKeyInTimezone(state.theme?.timezone || "UTC");
  const entries = readHistory()
    .filter((e) => e.token === token && e.day <= today)
    .slice()
    .sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));

  note.textContent = "Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";

  if (!entries.length) {
    empty.hidden = false;
    empty.textContent =
      "Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.";
    return;
  }
  empty.hidden = true;

  for (const entry of entries) {
    list.appendChild(renderHistoryItemEl(entry));
  }
}

export function renderLieblinge() {
  const list = $("[data-ag-lieblinge]");
  const empty = $("[data-ag-lieblinge-empty]");
  const note = $("[data-ag-lieblinge-note]");
  list.innerHTML = "";

  const favs = readFavorites();
  note.textContent = "Deine gespeicherten Lieblingspreise — per Stern markiert.";

  if (!favs.length) {
    empty.hidden = false;
    empty.textContent = "Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";
    return;
  }
  empty.hidden = true;

  for (const entry of favs) {
    list.appendChild(renderHistoryItemEl(entry));
  }
}

// ── Odds ──────────────────────────────────────────────────────────────────────

export function renderOdds() {
  const oddsList = $("[data-ag-odds]");
  oddsList.innerHTML = "";
  const streak = computeStreak();
  const cats = boostedCategories(streak);
  const total = cats.reduce((sum, cat) => sum + cat.weight, 0);
  for (const cat of cats) {
    const li = document.createElement("li");
    li.textContent = `${cat.label}: ${(cat.weight / total * 100).toFixed(1)} %`;
    oddsList.appendChild(li);
  }
  if (streak >= 5) {
    const info = streakInfo(streak);
    const li = document.createElement("li");
    li.textContent = `${info.emoji} Streak-Bonus aktiv (${streak} ${streak === 1 ? "Tag" : "Tage"} am Stück)`;
    li.style.fontWeight = "800";
    oddsList.appendChild(li);
  }
}

// ── Wunschkapsel ──────────────────────────────────────────────────────────────

import { readWish, writeWish } from "./storage.js";
import { currentWeekKey } from "./utils.js";

function wishMetaText(remoteStatus) {
  const baseline = "Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";
  if (remoteStatus === "sent") {
    return "Die Maschine hat es notiert und an Fionn weitergeleitet.";
  }
  if (remoteStatus === "pending") {
    return "Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…";
  }
  if (remoteStatus === "failed") {
    return "Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.";
  }
  return baseline;
}

export function renderWunschkapsel() {
  const idle = $("[data-ag-wish-idle]");
  const form = $("[data-ag-wish-form]");
  const done = $("[data-ag-wish-done]");
  if (!idle || !form || !done) return;
  const wish = readWish();
  const wishThisWeek = wish && wish.week === currentWeekKey();
  if (wishThisWeek) {
    idle.hidden = true;
    form.hidden = true;
    done.hidden = false;
    $("[data-ag-wish-done-title]").textContent = "✨ Wunsch eingereicht";
    $("[data-ag-wish-done-note]").textContent = `„${wish.text}"`;
    $("[data-ag-wish-done-meta]").textContent = wishMetaText(wish.remoteStatus);
  } else {
    idle.hidden = false;
    form.hidden = true;
    done.hidden = true;
  }
}

// ── hydrateCopy ───────────────────────────────────────────────────────────────

export function hydrateCopy() {
  const isFionn = getMissionPlayer() === "fionn";
  const name = isFionn ? state.theme.brand.fromName : displayNameFromToken();
  const recipientName = isFionn ? displayNameFromToken() : state.theme.brand.fromName;
  const elTitle = $("[data-ag-main-title]"); if (elTitle) elTitle.textContent = state.theme.brand.titleTemplate.replace("{name}", name);
  const elKicker = $("[data-ag-kicker]"); if (elKicker) elKicker.textContent = `${state.theme.brand.kicker} · ${state.photos.length} Erinnerungen`;
  const elIntro = $("[data-ag-intro]"); if (elIntro) elIntro.textContent = state.theme.brand.intro;
  const elBtn = $("[data-ag-button-text]"); if (elBtn) elBtn.textContent = state.theme.brand.buttonIdle;
  const elRulesTitle = $("[data-ag-rules-title]"); if (elRulesTitle) elRulesTitle.textContent = state.theme.brand.rulesTitle;
  const elRulesText = $("[data-ag-rules-text]"); if (elRulesText) elRulesText.textContent = state.theme.brand.rulesText;
  const elSend = $("[data-ag-send]"); if (elSend) elSend.textContent = `An ${recipientName} schicken`;
  const elPill = $("[data-ag-today-pill]"); if (elPill) elPill.textContent = formatToday();
  const elHint = $("[data-ag-draw-hint]"); if (elHint) elHint.textContent = "Eine Kapsel · ein Tag · ein Souvenir.";

  const chips = $("[data-ag-chips]");
  if (chips) chips.innerHTML = "";
  const chipList = (Array.isArray(state.theme.stickers) && state.theme.stickers.length)
    ? state.theme.stickers
    : defaultChips();

  for (const chip of chips ? chipList : []) {
    const li = document.createElement("li");
    li.textContent = chip;

    if (chip.toLowerCase().includes("bärlauch") || chip.toLowerCase().includes("barlauch")) {
      li.id = "ag-btn-baerlauch";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", "Bärlauch öffnen");
      li.classList.add("ag-chip-clickable");
    }

    if (chip.toLowerCase().includes("gespräch") || chip.toLowerCase().includes("gesprach")) {
      li.id = "ag-btn-gesprach";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", "Gespräch öffnen");
      li.classList.add("ag-chip-clickable");
    }

    if (chip.toLowerCase().includes("rave")) {
      li.id = "ag-btn-rave";
      li.tabIndex = 0;
      li.setAttribute("role", "link");
      li.setAttribute("aria-label", "Rave Board öffnen");
      li.classList.add("ag-chip-clickable");
    }

    if (chip.toLowerCase() === "quest") {
      li.id = "ag-btn-quest";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", "Quest öffnen");
      li.classList.add("ag-chip-clickable");
      if (state.quest?.enabled && isQuestAvailable()) {
        const qs = readQuestState();
        if (!qs.solved) li.classList.add("ag-chip-quest-active");
      }
    }

    if (chip.toLowerCase().includes("glossar")) {
      li.id = "ag-btn-glossary";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", "Glossar öffnen");
      li.classList.add("ag-chip-clickable");
    }

    if (chip.toLowerCase() === "mission") {
      li.id = "ag-btn-mission";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", "Mission öffnen");
      li.classList.add("ag-chip-clickable");
      if (!isMissionDoneToday()) li.classList.add("ag-chip-mission-active");
    }

    chips.appendChild(li);
  }

  renderEmojiOrbit();
  renderStreak();
}
