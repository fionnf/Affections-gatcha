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

function renderShell(mount) {
  mount.innerHTML = "";
  const app = h("div", { class: "fa-app" });

  app.appendChild(h("header", { class: "fa-header" }, [
    h("h1", { text: "Affektions-Gacha · Fionn" }),
    h("p", { class: "fa-sub", text: "Kuratoren-App" })
  ]));

  contentEl = h("main", {});
  app.appendChild(contentEl);

  const tabBar = h("nav", { class: "fa-tabs" });
  for (const tab of TABS) {
    const btn = h("button", { class: "fa-tab", "data-tab": tab.id }, [
      h("span", { class: "fa-ico", text: tab.ico }),
      h("span", { text: tab.label })
    ]);
    btn.addEventListener("click", () => switchTab(tab.id));
    tabBar.appendChild(btn);
  }
  app.appendChild(tabBar);
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

  // Load admin + backup config
  try {
    state.admin = await fetchJson("config/admin.json");
  } catch (e) {
    mount.innerHTML = `<div class="fa-app"><div class="fa-status err">config/admin.json fehlt oder ist ungültig.</div></div>`;
    return;
  }
  state.backup = await fetchJson("config/backup.json", { enabled: false });

  // PIN gate
  if (!hasSession()) {
    await renderGate(mount);
  }

  renderShell(mount);

  // Notifications + polling (best-effort; never blocks UI)
  registerServiceWorker();
  startPolling();
}

boot();
