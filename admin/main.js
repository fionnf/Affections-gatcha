// ── Fionn's Eingänge ──────────────────────────────────────────────────────────
// Fionn's side of the machine, served standalone from fionn-gacha.html. It
// used to ride along as a tab inside a second gacha app; that app is gone.
// Config is edited on GitHub, so nothing here needs write access to the repo
// and no token is stored on the device.
//
// What it does: the activity feed (hugs, wishes, reactions, prompt answers)
// coming in from Lennart, a reply on each wish that his app shows him, a
// Stups button back to his phone, and the local notification poll.
import { state, setMount, setConfigBase } from "./state.js";
import { injectCss } from "./css.js";
import { h } from "./ui.js";
import { renderGate, hasSession } from "./auth.js";
import { renderInbox } from "./inbox.js";
import { startPolling, registerServiceWorker } from "./notify.js";

const script = document.currentScript;
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

function renderShell(mount) {
  mount.innerHTML = "";
  const app = h("div", { class: "fa-app" });
  app.appendChild(h("header", { class: "fa-header" }, [
    h("h1", { text: "Affektions-Gacha · Fionn" }),
    h("p", { class: "fa-sub", text: "Eingänge" })
  ]));

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

  renderShell(mount);
  registerServiceWorker();
  startPolling();
}

boot();
