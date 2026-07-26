// ── Kapsel-Werkstatt ──────────────────────────────────────────────────────────
// Lennart writes the capsules Fionn pulls. Everything here is the authoring
// side plus the shared store; the drawing side lives in pull.js.
//
// Storage goes through the existing Apps Script sheet rather than the GitHub
// Contents API, so writing a capsule needs no token, no commit and no build —
// Lennart types it on his phone and Fionn's next sync has it.
//
// Semantics are per category and deliberately simple: a category with at
// least one hand-written capsule is fully taken over by them, a category with
// none falls back to config/outcomes.json. So the first capsule Lennart writes
// for JACKPOT immediately *is* Fionn's jackpot, instead of being diluted to a
// one-in-ten chance among the shipped ones.
import { state } from "./state.js";
import { getToken, escapeHtml } from "./utils.js";
import { haptic } from "./haptic.js";
import { WERKSTATT_KEY } from "./constants.js";
import { markRecentWrite, withinGracePeriod } from "./sheetSync.js";

// Which player's pool the Werkstatt writes. Stored on every row so the
// reverse direction (Fionn writing for Lennart) is a value change, not a
// schema change.
export const WERKSTATT_TARGET = "fionn";

export function readWerkstatt() {
  try { return JSON.parse(window.localStorage.getItem(WERKSTATT_KEY) || "[]") || []; } catch (_) { return []; }
}

export function writeWerkstatt(list) {
  try { window.localStorage.setItem(WERKSTATT_KEY, JSON.stringify(list)); } catch (_) {}
  state.werkstatt = list;
}

// The capsules that replace a given category for a given player, or [] when
// none have been written yet (→ caller falls back to the shipped pool).
export function werkstattFor(categoryId, forToken) {
  return (state.werkstatt || []).filter(
    (c) => c && c.categoryId === categoryId && (c.forToken || WERKSTATT_TARGET) === forToken
  );
}

function postToSheet(type, payload) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
  const body = JSON.stringify({ type, token: getToken(), ...payload });
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  fetch(cfg.endpointUrl, opts)
    .catch(() => fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {}));
}

export function saveKapsel(entry) {
  const list = readWerkstatt();
  const idx = list.findIndex((c) => c.id === entry.id);
  const record = {
    id: entry.id,
    categoryId: entry.categoryId,
    forToken: entry.forToken || WERKSTATT_TARGET,
    title: (entry.title || "").trim(),
    message: (entry.message || "").trim(),
    link: (entry.link || "").trim() || null,
    voucher: !!entry.voucher,
    createdBy: getToken(),
    createdAt: (idx === -1 ? new Date().toISOString() : list[idx].createdAt) || new Date().toISOString()
  };
  if (idx === -1) list.unshift(record); else list[idx] = record;
  writeWerkstatt(list);
  markRecentWrite("werkstatt");
  postToSheet("werkstatt-upsert", record);
}

export function deleteKapsel(id) {
  writeWerkstatt(readWerkstatt().filter((c) => c.id !== id));
  markRecentWrite("werkstatt");
  postToSheet("werkstatt-delete", { id });
}

// The sheet is authoritative, same contract as Gipfelbuch/Glossar: an
// overwrite is skipped once if it lands inside the grace period after a local
// write, so a GET that raced ahead of the POST can't wipe a fresh capsule.
export function applySharedWerkstatt(list) {
  if (!Array.isArray(list)) return;
  if (withinGracePeriod("werkstatt")) return;
  writeWerkstatt(list.filter((c) => c && c.id && c.categoryId && c.title));
}

// ── Authoring UI ─────────────────────────────────────────────────────────────

const ui = { categoryId: null, editingId: null };

function categories() {
  return (state.outcomes && state.outcomes.categories) || [];
}

function targetName() {
  return WERKSTATT_TARGET.charAt(0).toLocaleUpperCase("de-CH") + WERKSTATT_TARGET.slice(1);
}

export function openWerkstatt() {
  const panel = document.getElementById("ag-werkstatt-panel");
  if (!panel) return;
  panel.hidden = false;
  ui.categoryId = ui.categoryId || (categories()[0] && categories()[0].id) || null;
  closeKapselForm();
  renderWerkstatt();
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
  haptic(10);
}

export function closeWerkstatt() {
  const panel = document.getElementById("ag-werkstatt-panel");
  if (panel) panel.hidden = true;
  closeKapselForm();
}

// Keeps the entry card's subtitle honest — it's the only place Lennart sees,
// at a glance, how much of Fionn's machine is his handwriting.
export function renderWerkstattEntry() {
  const sub = document.querySelector("[data-ag-werkstatt-entry-sub]");
  if (!sub) return;
  const mine = (state.werkstatt || []).filter((c) => (c.forToken || WERKSTATT_TARGET) === WERKSTATT_TARGET);
  if (!mine.length) {
    sub.textContent = "Noch keine — schreib die erste.";
    return;
  }
  const cats = new Set(mine.map((c) => c.categoryId)).size;
  sub.textContent = mine.length === 1
    ? "1 Kapsel von dir in seiner Maschine."
    : `${mine.length} Kapseln von dir, in ${cats} ${cats === 1 ? "Kategorie" : "Kategorien"}.`;
}

export function renderWerkstatt() {
  renderWerkstattEntry();
  const tabs = document.getElementById("ag-werkstatt-tabs");
  const list = document.getElementById("ag-werkstatt-list");
  const note = document.getElementById("ag-werkstatt-note");
  if (!tabs || !list) return;

  const cats = categories();
  if (!ui.categoryId && cats.length) ui.categoryId = cats[0].id;

  tabs.innerHTML = "";
  for (const cat of cats) {
    const count = werkstattFor(cat.id, WERKSTATT_TARGET).length;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ag-werkstatt-tab" + (cat.id === ui.categoryId ? " is-active" : "");
    btn.dataset.agWerkstattCat = cat.id;
    btn.innerHTML = `${escapeHtml(cat.label)}${count ? ` <span class="ag-werkstatt-count">${count}</span>` : ""}`;
    btn.addEventListener("click", () => {
      ui.categoryId = cat.id;
      closeKapselForm();
      renderWerkstatt();
      haptic(6);
    });
    tabs.appendChild(btn);
  }

  const cat = cats.find((c) => c.id === ui.categoryId);
  const mine = ui.categoryId ? werkstattFor(ui.categoryId, WERKSTATT_TARGET) : [];
  const name = targetName();

  if (note) {
    if (mine.length === 1) {
      note.textContent = `${name} zieht hier nur noch deine eine Kapsel.`;
    } else if (mine.length > 1) {
      note.textContent = `${name} zieht hier nur noch aus deinen ${mine.length} Kapseln.`;
    } else {
      note.textContent = `Noch nichts von dir — ${name} zieht hier aus den ${cat ? cat.outcomes.length : 0} Standardkapseln. Schreib eine, und sie gehört dir.`;
    }
  }

  list.innerHTML = "";
  for (const kapsel of mine) {
    list.appendChild(renderKapselCard(kapsel));
  }
}

function renderKapselCard(kapsel) {
  const card = document.createElement("div");
  card.className = "ag-werkstatt-card";
  // Capsules round-trip through the shared sheet, so treat every field as
  // untrusted text on the way back in.
  card.innerHTML = `
    <div class="ag-werkstatt-card-text">
      <div class="ag-werkstatt-card-title">${escapeHtml(kapsel.title)}${kapsel.voucher ? ` <span class="ag-werkstatt-badge">Gutschein</span>` : ""}</div>
      <div class="ag-werkstatt-card-msg">${escapeHtml(kapsel.message)}</div>
      ${kapsel.link ? `<div class="ag-werkstatt-card-link">🔗 ${escapeHtml(kapsel.link)}</div>` : ""}
    </div>
    <div class="ag-werkstatt-card-btns">
      <button class="ag-werkstatt-edit" type="button" aria-label="Kapsel bearbeiten" title="Bearbeiten">✎</button>
      <button class="ag-werkstatt-del" type="button" aria-label="Kapsel löschen" title="Löschen">✕</button>
    </div>
  `;
  card.querySelector(".ag-werkstatt-edit").addEventListener("click", () => openKapselForm(kapsel));
  card.querySelector(".ag-werkstatt-del").addEventListener("click", () => {
    if (!window.confirm(`„${kapsel.title}" löschen?`)) return;
    deleteKapsel(kapsel.id);
    renderWerkstatt();
    haptic(8);
  });
  return card;
}

export function openKapselForm(kapsel) {
  const form = document.getElementById("ag-werkstatt-form");
  const addBtn = document.getElementById("ag-werkstatt-add");
  if (!form) return;
  ui.editingId = kapsel ? kapsel.id : null;
  document.getElementById("ag-werkstatt-title").value = kapsel ? kapsel.title : "";
  document.getElementById("ag-werkstatt-message").value = kapsel ? kapsel.message : "";
  document.getElementById("ag-werkstatt-link").value = (kapsel && kapsel.link) || "";
  document.getElementById("ag-werkstatt-voucher").checked = !!(kapsel && kapsel.voucher);
  const titleEl = document.getElementById("ag-werkstatt-form-title");
  if (titleEl) titleEl.textContent = kapsel ? "Kapsel bearbeiten" : "Neue Kapsel";
  const errEl = document.getElementById("ag-werkstatt-error");
  if (errEl) errEl.hidden = true;
  form.hidden = false;
  if (addBtn) addBtn.hidden = true;
  form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  document.getElementById("ag-werkstatt-title")?.focus();
  haptic(8);
}

export function closeKapselForm() {
  const form = document.getElementById("ag-werkstatt-form");
  const addBtn = document.getElementById("ag-werkstatt-add");
  if (form) form.hidden = true;
  if (addBtn) addBtn.hidden = false;
  ui.editingId = null;
}

export function submitKapselForm() {
  const title = (document.getElementById("ag-werkstatt-title")?.value || "").trim();
  const message = (document.getElementById("ag-werkstatt-message")?.value || "").trim();
  const link = (document.getElementById("ag-werkstatt-link")?.value || "").trim();
  const voucher = !!document.getElementById("ag-werkstatt-voucher")?.checked;
  const errEl = document.getElementById("ag-werkstatt-error");

  function fail(msg) {
    if (errEl) { errEl.textContent = msg; errEl.hidden = false; }
    haptic([20, 40, 20]);
  }
  if (!title) return fail("Die Kapsel braucht einen Titel.");
  if (!message) return fail("Schreib noch einen Satz dazu.");
  if (link && !/^https?:\/\//i.test(link)) return fail("Der Link muss mit http:// oder https:// anfangen.");
  if (!ui.categoryId) return fail("Wähl zuerst eine Kategorie.");

  saveKapsel({
    id: ui.editingId || `k-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    categoryId: ui.categoryId,
    forToken: WERKSTATT_TARGET,
    title, message, link, voucher
  });
  closeKapselForm();
  renderWerkstatt();
  haptic([10, 30, 10]);
}
