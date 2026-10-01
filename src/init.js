// ── App initialisation ────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { getToken, dateKeyInTimezone, getPreviewDay } from "./utils.js";
import { readHistory } from "./storage.js";
import { fetchJson, syncFromSheets, resolveBase } from "./sync.js";
import { injectFonts } from "./theme.js";
import { injectStyles } from "./css.js";
import { renderShell } from "./template.js";
import { applyTheme, applySpecialDayColors } from "./theme.js";
import { hydrateCopy, renderOdds, renderWunschkapsel } from "./render.js";
import { bindEvents, retryPendingWishSend, renderError, showDrawnToday } from "./events.js";
import { registerServiceWorker, scheduleStreakWarning, showNotifPrompt } from "./notify.js";
import { restoreStimmung } from "./stimmung.js";
import { updateAppBadge } from "./badge.js";
import { hmInTimezone, setDayStartHour } from "./utils.js";
import { initInstallPrompt } from "./installPrompt.js";

const defaultPhotos = { photos: [] };

export function normalizePhotos(photosConfig) {
  const VIDEO_EXTS = /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;
  const photos = Array.isArray(photosConfig?.photos) ? photosConfig.photos : [];
  const base = resolveBase();
  return photos
    .map((photo) => {
      const resolvedUrl = new URL(photo.url, base).toString();
      const isVideo = photo.type === "video" || VIDEO_EXTS.test(resolvedUrl);
      return { ...photo, type: isVideo ? "video" : "image", url: resolvedUrl };
    })
    .filter((photo) => photo.url);
}

export async function init() {
  injectFonts();
  injectStyles();
  renderShell();
  try {
    const [theme, outcomes, photos, specialDays, wishInbox, backup, quest, push, skincare] = await Promise.all([
      fetchJson("config/theme.json"),
      fetchJson("config/outcomes.json"),
      fetchJson("config/photos.json", defaultPhotos),
      fetchJson("config/special-days.json", { days: [] }),
      fetchJson("config/wish-inbox.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/backup.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/quest.json", { enabled: false }),
      fetchJson("config/push.json", { enabled: false }),
      fetchJson("config/skincare.json", null)
    ]);
    state.theme = theme;
    state.outcomes = outcomes;
    state.photos = normalizePhotos(photos);
    state.specialDays = specialDays;
    setDayStartHour(theme.dayStartHour);
    state.wishInbox = wishInbox && typeof wishInbox === "object" ? wishInbox : { enabled: false, endpointUrl: "" };
    state.backup = backup && typeof backup === "object" ? backup : { enabled: false, endpointUrl: "" };
    state.quest = quest && typeof quest === "object" ? quest : { enabled: false };
    state.push = push && typeof push === "object" ? push : { enabled: false };
    // null when the file is absent — renderChips hides the chip rather than
    // offering one that opens an empty panel.
    state.skincare = skincare && typeof skincare === "object" ? skincare : null;
    applyTheme(theme);
    applySpecialDayColors(getPreviewDay() || dateKeyInTimezone(theme.timezone));
    restoreStimmung();
    hydrateCopy();
    renderOdds();
    renderWunschkapsel();
    bindEvents();
    initInstallPrompt();
    // Position the sliding pill after first layout
    requestAnimationFrame(() => {
      const pill = mount.querySelector(".ag-nav-pill");
      const activeBtn = mount.querySelector(".ag-bottomnav-btn.is-active");
      if (pill && activeBtn) {
        const nav = activeBtn.closest(".ag-bottomnav");
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const btnRect = activeBtn.getBoundingClientRect();
        if (navRect && btnRect.width) {
          pill.style.transition = "none";
          pill.style.left = `${btnRect.left - navRect.left}px`;
          pill.style.width = `${btnRect.width}px`;
          requestAnimationFrame(() => { pill.style.transition = ""; });
        }
      }
    });
    try { retryPendingWishSend(); } catch (_error) {}
    // The hero's orbit/shimmer loops run forever; when it's scrolled out of
    // view (reading Verlauf/Berge) they're pure wasted GPU work — noticeable
    // heat and jank on older phones. Pause them until the hero is back.
    try {
      const stage = mount.querySelector(".ag-stage");
      if (stage && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(([entry]) => {
          stage.classList.toggle("ag-stage-idle", !entry.isIntersecting);
        }, { threshold: 0.05 });
        io.observe(stage);
      }
    } catch (_error) {}
    registerServiceWorker();
    // iOS keeps an installed web app alive in the background for days. Resumed
    // the next morning, nothing here knew the date had changed: yesterday's
    // capsule stayed revealed, the button still said "Heute nochmal anzeigen",
    // and today's pull was unreachable without a manual reload. Every state
    // worth keeping lives in localStorage and the sheet, so a reload on the
    // first sight of a new day is the whole fix.
    state.renderedDay = dateKeyInTimezone(theme.timezone);
    const reloadOnNewDay = () => {
      if (getPreviewDay()) return;
      if (dateKeyInTimezone(theme.timezone) !== state.renderedDay) window.location.reload();
    };
    window.setInterval(reloadOnNewDay, 60000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      reloadOnNewDay();
      scheduleStreakWarning();
      updateAppBadge();
      applyEveningMode(theme.timezone);
      // Re-sync on focus so a Stimmung (or anything else) changed on the
      // other phone shows up when you come back, without a manual reload.
      syncFromSheets().catch(() => {});
    });
    mount.classList.add("is-ready");
    mount.style.transition = "opacity .18s ease";
    mount.style.opacity = "1";
    const todayKey = dateKeyInTimezone(theme.timezone);
    if (readHistory().some(e => e.token === getToken() && e.day === todayKey) && !getPreviewDay()) {
      showDrawnToday();
    }
    updateAppBadge();
    applyEveningMode(theme.timezone);
    syncFromSheets().catch(() => {});

    // Ask about notifications on load, not only after a draw — the draw is
    // exactly the moment the daily reminder is no longer useful, so asking
    // there meant the reminder never fired for anyone who hadn't already
    // said yes. A short delay keeps it clear of the first paint.
    window.setTimeout(() => { showNotifPrompt().catch(() => {}); }, 1800);
  } catch (error) {
    renderError(error);
  }
}

// Late in the evening the machine winds down: the orbit slows, the sparks
// dim, and the kicker says good night. Purely cosmetic, re-checked whenever
// the app comes back to the foreground so a phone left open overnight wakes
// up in the right mood.
export function applyEveningMode(timezone) {
  try {
    const { h } = hmInTimezone(timezone || "UTC");
    const evening = h >= 22 || h < 5;
    mount.classList.toggle("is-evening", evening);
    const kicker = mount.querySelector("[data-ag-kicker]");
    if (kicker) {
      const base = kicker.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/, "");
      kicker.textContent = evening ? base + "\u2009·\u2009Gute Nacht 🌙" : base;
    }
  } catch (_e) {}
}
