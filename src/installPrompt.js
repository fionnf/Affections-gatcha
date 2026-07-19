// ── Install-to-home-screen nudge ──────────────────────────────────────────────
// Web Push only works on iOS Safari when the PWA is actually installed to the
// home screen — a bookmarked tab never receives push. This nudges toward that
// state on any entry point (Lennart's or Fionn's), platform-generically:
// Chrome/Android gets a real one-tap install via `beforeinstallprompt`; iOS
// (which never fires that event) gets static "Teilen → Zum Home-Bildschirm"
// instructions instead.
import { $ } from "./state.js";

const DISMISS_KEY = "affektions-gacha:install-dismissed:v1";
let deferredPrompt = null;

function isStandalone() {
  try {
    return window.matchMedia?.("(display-mode: standalone)")?.matches
      || window.navigator.standalone === true;
  } catch { return false; }
}

function isIOS() {
  try {
    const ua = window.navigator.userAgent || "";
    const isAppleTouchDevice = /iPad|iPhone|iPod/.test(ua);
    const isIPadDesktopMode = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return isAppleTouchDevice || isIPadDesktopMode;
  } catch { return false; }
}

function isDismissed() {
  try { return window.localStorage.getItem(DISMISS_KEY) === "1"; } catch { return false; }
}

function dismiss() {
  try { window.localStorage.setItem(DISMISS_KEY, "1"); } catch {}
  const card = $("[data-ag-install-nudge]");
  if (card) card.hidden = true;
}

function showCard(installable) {
  if (isDismissed()) return;
  const card = $("[data-ag-install-nudge]");
  if (!card) return;
  const copyEl = $("[data-ag-install-copy]");
  const actionBtn = $("[data-ag-install-action]");
  if (copyEl) {
    copyEl.textContent = installable
      ? "Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen."
      : "Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“.";
  }
  if (actionBtn) {
    actionBtn.hidden = !installable;
    actionBtn.onclick = async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      dismiss();
    };
  }
  card.hidden = false;
}

export function initInstallPrompt() {
  if (isStandalone() || isDismissed()) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showCard(true);
  });

  // iOS Safari never fires beforeinstallprompt — show static instructions.
  if (isIOS()) showCard(false);

  $("[data-ag-install-dismiss]")?.addEventListener("click", dismiss);
}
