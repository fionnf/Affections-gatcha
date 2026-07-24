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
import { bindEvents, retryPendingWishSend, registerServiceWorker, scheduleStreakWarning, renderError } from "./events.js";
import { restoreStimmung } from "./stimmung.js";
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
    const [theme, outcomes, photos, specialDays, wishInbox, backup, quest, missions] = await Promise.all([
      fetchJson("config/theme.json"),
      fetchJson("config/outcomes.json"),
      fetchJson("config/photos.json", defaultPhotos),
      fetchJson("config/special-days.json", { days: [] }),
      fetchJson("config/wish-inbox.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/backup.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/quest.json", { enabled: false }),
      fetchJson("config/missions.json", { pairs: [] })
    ]);
    state.theme = theme;
    state.outcomes = outcomes;
    state.photos = normalizePhotos(photos);
    state.specialDays = specialDays;
    state.wishInbox = wishInbox && typeof wishInbox === "object" ? wishInbox : { enabled: false, endpointUrl: "" };
    state.backup = backup && typeof backup === "object" ? backup : { enabled: false, endpointUrl: "" };
    state.quest = quest && typeof quest === "object" ? quest : { enabled: false };
    state.missions = missions && Array.isArray(missions.pairs) ? missions : { pairs: [] };
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
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleStreakWarning();
    });
    mount.classList.add("is-ready");
    mount.style.transition = "opacity .18s ease";
    mount.style.opacity = "1";
    const todayKey = dateKeyInTimezone(theme.timezone);
    if (readHistory().some(e => e.token === getToken() && e.day === todayKey)) {
      mount.classList.add("has-drawn");
    }
    syncFromSheets().catch(() => {});
  } catch (error) {
    renderError(error);
  }
}
