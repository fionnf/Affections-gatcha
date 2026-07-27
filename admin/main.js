// ── Fionn's Eingänge ──────────────────────────────────────────────────────────
// What's left of the curator app. It used to edit config/outcomes.json and
// config/special-days.json through the GitHub Contents API with a fine-grained
// token pasted into the browser; all of that is gone. Outcomes for Fionn are
// now written by Lennart in the Kapsel-Werkstatt (src/werkstatt.js), and Fionn
// edits the repo's config through GitHub itself — so nothing here needs write
// access to anything, and no token is stored on the device any more.
//
// What remains is the read-only activity feed: hugs, wishes, prompt answers
// and quest solves coming in from Lennart, plus the local notification poll
// that announces them.
import { state, setMount, setConfigBase } from "./state.js";
import { injectCss } from "./css.js";
import { h } from "./ui.js";
import { renderGate, hasSession } from "./auth.js";
import { renderInbox } from "./inbox.js";
import { startPolling, registerServiceWorker } from "./notify.js";

const script = document.currentScript;
const isTabMode = script?.dataset.mode === "tab";
const mountSelector = script?.dataset.mount || "#fionn-admin";
const baseUrl = script?.dataset.configBase || "./";

async function fetchJson(path, fallback) {
  try {
    const res = await fetch(`${state.configBase}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}

function renderShell(mount, tabMode = false) {
  mount.innerHTML = "";
  const app = h("div", { class: tabMode ? "fa-app fa-tab-mode" : "fa-app" });

  if (!tabMode) {
    app.appendChild(h("header", { class: "fa-header" }, [
      h("h1", { text: "Affektions-Gacha · Fionn" }),
      h("p", { class: "fa-sub", text: "Eingänge" })
    ]));
  }

  const content = h("main", {});
  app.appendChild(content);
  mount.appendChild(app);

  Promise.resolve(renderInbox(content)).catch((e) => {
    content.appendChild(h("div", { class: "fa-status err", text: `Fehler: ${e.message}` }));
  });
}

async function loadAdminConfig() {
  try {
    state.admin = await fetchJson("config/admin.json");
  } catch (e) {
    throw new Error("config/admin.json fehlt oder ist ungültig.");
  }
  state.backup = await fetchJson("config/backup.json", { enabled: false });
}

// ── Tab-inject mode ───────────────────────────────────────────────────────────

function waitFor(selector) {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    const obs = new MutationObserver(() => {
      const found = document.querySelector(selector);
      if (found) { obs.disconnect(); resolve(found); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
}

async function bootTabMode() {
  setConfigBase(baseUrl);
  injectCss();

  try {
    await loadAdminConfig();
  } catch (e) {
    console.error("[fionn-inbox]", e.message);
    return;
  }

  await waitFor(".ag-bottomnav");
  injectInboxTab();

  startPolling();
}

let inboxRendered = false;

function injectInboxTab() {
  const bottomNav = document.querySelector(".ag-bottomnav");
  const agContent = document.querySelector(".ag-content");
  if (!bottomNav || !agContent) return;

  const panel = document.createElement("section");
  panel.className = "ag-panel";
  panel.setAttribute("data-ag-panel-admin", "");
  panel.hidden = true;
  agContent.appendChild(panel);
  setMount(panel);

  const btn = document.createElement("button");
  btn.className = "ag-bottomnav-btn";
  btn.type = "button";
  btn.setAttribute("role", "tab");
  btn.setAttribute("aria-selected", "false");
  btn.dataset.agTab = "admin";
  btn.innerHTML = `<span class="ag-bottomnav-btn-icon" aria-hidden="true">📥</span><span class="ag-bottomnav-btn-label">Eingänge</span>`;
  bottomNav.appendChild(btn);

  function activateTab() {
    bottomNav.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    const pill = document.querySelector(".ag-nav-pill");
    if (pill) {
      const PILL_W = 54;
      const navRect = bottomNav.getBoundingClientRect();
      const icon = btn.querySelector(".ag-bottomnav-btn-icon") || btn;
      const iconRect = icon.getBoundingClientRect();
      if (navRect && iconRect.width) {
        const centre = iconRect.left - navRect.left + iconRect.width / 2;
        pill.style.width = `${PILL_W}px`;
        pill.style.left = `${centre - PILL_W / 2}px`;
      }
    }

    ["today", "history", "lieblinge", "berge"].forEach((name) => {
      const el = document.querySelector(`[data-ag-panel-${name}]`);
      if (el) el.hidden = true;
    });
    const fab = document.querySelector("[data-ag-fab]");
    if (fab) fab.hidden = true;

    panel.hidden = false;
    showInbox(panel);
    // The decorative hero above eats most of a phone viewport and the nav pill
    // is positioned independent of scroll, so a short panel can otherwise open
    // entirely behind it.
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  btn.addEventListener("click", activateTab);

  bottomNav.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach((b) => {
    if (b !== btn) {
      b.addEventListener("click", () => {
        panel.hidden = true;
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });
    }
  });
}

async function showInbox(panel) {
  if (inboxRendered && hasSession()) return;

  if (!hasSession()) {
    inboxRendered = false;
    await renderGate(panel);
  }

  if (!inboxRendered) {
    renderShell(panel, true);
    inboxRendered = true;
  }
}

// ── Standalone mode ───────────────────────────────────────────────────────────

async function boot() {
  injectCss();
  const mount = document.querySelector(mountSelector) || (() => {
    const el = document.createElement("section");
    el.id = "fionn-admin";
    document.body.appendChild(el);
    return el;
  })();
  setMount(mount);
  setConfigBase(baseUrl);

  try {
    await loadAdminConfig();
  } catch (e) {
    mount.innerHTML = `<div class="fa-app"><div class="fa-status err">${e.message}</div></div>`;
    return;
  }

  if (!hasSession()) {
    await renderGate(mount);
  }

  renderShell(mount, false);
  registerServiceWorker();
  startPolling();
}

if (isTabMode) {
  bootTabMode();
} else {
  boot();
}
