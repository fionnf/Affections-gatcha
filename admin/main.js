// ── Fionn admin app entry point ───────────────────────────────────────────────
import { state, setMount, setConfigBase } from "./state.js";
import { injectCss } from "./css.js";
import { h } from "./ui.js";
import { renderGate, hasSession } from "./auth.js";
import { renderInbox } from "./inbox.js";
import { renderOutcomes } from "./editor-outcomes.js";
import { renderSpecial } from "./editor-special.js";
import { renderSettings } from "./settings.js";
import { startPolling, registerServiceWorker } from "./notify.js";

const script = document.currentScript;
const isTabMode = script?.dataset.mode === "tab";
const mountSelector = script?.dataset.mount || "#fionn-admin";
const baseUrl = script?.dataset.configBase || "./";

const TABS = [
  { id: "inbox", label: "Eingänge", ico: "📥", render: renderInbox },
  { id: "outcomes", label: "Outcomes", ico: "🎰", render: renderOutcomes },
  { id: "special", label: "Tage", ico: "📅", render: renderSpecial },
  { id: "settings", label: "Einstellungen", ico: "⚙️", render: renderSettings }
];

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

let contentEl = null;

function renderShell(mount, tabMode = false) {
  mount.innerHTML = "";
  const app = h("div", { class: tabMode ? "fa-app fa-tab-mode" : "fa-app" });

  if (!tabMode) {
    app.appendChild(h("header", { class: "fa-header" }, [
      h("h1", { text: "Affektions-Gacha · Fionn" }),
      h("p", { class: "fa-sub", text: "Kuratoren-App" })
    ]));
  }

  // In tab mode the sub-nav goes at the top; in standalone it's a fixed bottom bar.
  const tabBar = h("nav", { class: "fa-tabs" });
  for (const tab of TABS) {
    const btn = h("button", { class: "fa-tab", "data-tab": tab.id }, [
      h("span", { class: "fa-ico", text: tab.ico }),
      h("span", { text: tab.label })
    ]);
    btn.addEventListener("click", () => switchTab(tab.id));
    tabBar.appendChild(btn);
  }

  contentEl = h("main", {});

  if (tabMode) {
    // Sub-nav first, content below
    app.appendChild(tabBar);
    app.appendChild(contentEl);
  } else {
    app.appendChild(contentEl);
    app.appendChild(tabBar);
  }

  mount.appendChild(app);
  switchTab(state.activeTab || "inbox");
}

function switchTab(id) {
  state.activeTab = id;
  document.querySelectorAll(".fa-tab").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-tab") === id);
  });
  const tab = TABS.find((t) => t.id === id);
  if (!tab || !contentEl) return;
  contentEl.innerHTML = "";
  Promise.resolve(tab.render(contentEl)).catch((e) => {
    contentEl.appendChild(h("div", { class: "fa-status err", text: `Fehler: ${e.message}` }));
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
    console.error("[fionn-admin]", e.message);
    return;
  }

  await waitFor(".ag-bottomnav");
  injectAdminTab();

  startPolling();
}

let adminRendered = false;

function injectAdminTab() {
  const bottomNav = document.querySelector(".ag-bottomnav");
  const agContent = document.querySelector(".ag-content");
  if (!bottomNav || !agContent) return;

  // Create the admin panel section inside ag-content.
  const adminPanel = document.createElement("section");
  adminPanel.className = "ag-panel";
  adminPanel.setAttribute("data-ag-panel-admin", "");
  adminPanel.hidden = true;
  agContent.appendChild(adminPanel);
  setMount(adminPanel);

  // Create the Admin tab button.
  const adminBtn = document.createElement("button");
  adminBtn.className = "ag-bottomnav-btn";
  adminBtn.type = "button";
  adminBtn.setAttribute("role", "tab");
  adminBtn.setAttribute("aria-selected", "false");
  adminBtn.dataset.agTab = "admin";
  adminBtn.innerHTML = `<span class="ag-bottomnav-btn-icon" aria-hidden="true">⚙️</span><span class="ag-bottomnav-btn-label">Admin</span>`;
  bottomNav.appendChild(adminBtn);

  function activateAdminTab() {
    // Update active classes across all bottom-nav buttons.
    bottomNav.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach((b) => {
      const active = b === adminBtn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    // Slide the pill to the admin button.
    const pill = document.querySelector(".ag-nav-pill");
    if (pill) {
      const PILL_W = 54;
      const navRect = bottomNav.getBoundingClientRect();
      const icon = adminBtn.querySelector(".ag-bottomnav-btn-icon") || adminBtn;
      const iconRect = icon.getBoundingClientRect();
      if (navRect && iconRect.width) {
        const centre = iconRect.left - navRect.left + iconRect.width / 2;
        pill.style.width = `${PILL_W}px`;
        pill.style.left = `${centre - PILL_W / 2}px`;
      }
    }

    // Hide main app panels and FAB.
    ["today", "history", "lieblinge", "berge"].forEach((name) => {
      const el = document.querySelector(`[data-ag-panel-${name}]`);
      if (el) el.hidden = true;
    });
    const fab = document.querySelector("[data-ag-fab]");
    if (fab) fab.hidden = true;

    adminPanel.hidden = false;
    showAdminContent(adminPanel);
    // Short admin tabs (e.g. Einstellungen) can end above the fixed floating
    // bottom nav on first render, since that pill is positioned independent
    // of scroll and the decorative hero above eats most of a phone viewport.
    // Scrolling the panel to the top clears it and gives the tools more room.
    adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  adminBtn.addEventListener("click", activateAdminTab);

  // When any other bottom-nav tab is clicked, hide the admin panel.
  bottomNav.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach((b) => {
    if (b !== adminBtn) {
      b.addEventListener("click", () => {
        adminPanel.hidden = true;
        adminBtn.classList.remove("is-active");
        adminBtn.setAttribute("aria-selected", "false");
      });
    }
  });
}

async function showAdminContent(panel) {
  // If already rendered and session is still valid, nothing to do.
  if (adminRendered && hasSession()) return;

  if (!hasSession()) {
    adminRendered = false;
    await renderGate(panel);
  }

  if (!adminRendered) {
    renderShell(panel, true);
    adminRendered = true;
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
