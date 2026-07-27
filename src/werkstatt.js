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
import { showToast } from "./toast.js";

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

// pendingSince is local bookkeeping — whether THIS device has seen its write
// come back. Posting it would store it in the sheet and hand it to every
// client, which would then believe a long-confirmed capsule was still in
// flight. Strip it, and send only the fields the sheet has columns for.
function toSheetRow(c) {
  return {
    id: c.id, categoryId: c.categoryId, forToken: c.forToken,
    title: c.title, message: c.message, prompt: c.prompt, link: c.link,
    voucher: c.voucher, answer: c.answer, answeredAt: c.answeredAt,
    createdBy: c.createdBy, createdAt: c.createdAt
  };
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
    prompt: (entry.prompt || "").trim() || null,
    link: (entry.link || "").trim() || null,
    voucher: !!entry.voucher,
    // An answer belongs to the capsule, not to the edit — preserve whatever
    // is already there so editing the wording doesn't erase his reply.
    answer: (idx === -1 ? null : list[idx].answer) || null,
    answeredAt: (idx === -1 ? null : list[idx].answeredAt) || null,
    createdBy: getToken(),
    createdAt: (idx === -1 ? new Date().toISOString() : list[idx].createdAt) || new Date().toISOString(),
    // Unconfirmed until the sheet hands it back. postToSheet is
    // fire-and-forget with a no-cors retry that always looks like it worked,
    // so this is the only way to know a capsule actually landed.
    pendingSince: Date.now()
  };
  if (idx === -1) list.unshift(record); else list[idx] = record;
  writeWerkstatt(list);
  markRecentWrite("werkstatt");
  postToSheet("werkstatt-upsert", toSheetRow(record));
}

// Fionn answered a question capsule. The generic prompt-answer path files it
// in the PromptAnswers sheet and emails Fionn — fine when Fionn wrote the
// question, useless when Lennart did, because the answer then never reaches
// the person who asked. This puts it back on the capsule itself, so it shows
// up under the question in the Werkstatt.
export function answerKapsel(id, answer) {
  const list = readWerkstatt();
  const idx = list.findIndex((c) => c.id === id);
  if (idx === -1) return;
  const answeredAt = new Date().toISOString();
  // Pending for the same reason a new capsule is: if this POST is lost, the
  // next sync would overwrite the answer with the sheet's blank one and it
  // would be gone for good. Marked, so the retry re-sends it.
  list[idx] = { ...list[idx], answer, answeredAt, pendingSince: Date.now() };
  writeWerkstatt(list);
  markRecentWrite("werkstatt");
  postToSheet("werkstatt-answer", { id, answer, answeredAt });
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
  // The form refuses duplicate titles, but the sheet is hand-editable and is
  // the authority here, so a clash can still arrive from that side. Drop it
  // on the way in rather than letting the anti-repeat filter silently treat
  // two rows as one capsule.
  const fromSheet = list.filter((c) => c && c.id && c.categoryId && c.title);

  // A local write that the sheet hasn't echoed back did not make it — the
  // endpoint was down, the script wasn't deployed, the phone was offline. An
  // authoritative overwrite would erase it in front of the person who typed
  // it. Keep those, and post them again.
  //
  // "Echoed back" has to cover more than the row existing: an answer posted
  // to a capsule the sheet already holds would otherwise look confirmed the
  // moment that row came back, and the sheet's empty Answer would win.
  const sheetById = new Map(fromSheet.map((c) => [c.id, c]));
  const unsent = readWerkstatt().filter((c) => {
    if (!c.pendingSince) return false;
    const row = sheetById.get(c.id);
    return !row || (row.answer || null) !== (c.answer || null);
  });
  for (const c of unsent.slice(0, 5)) postToSheet("werkstatt-upsert", toSheetRow(c));

  // Dedupe across both, unsent first so a still-unconfirmed local capsule
  // isn't dropped in favour of a same-titled row from the sheet.
  // Unsent entries go in first and win any clash — by id (the sheet's older
  // copy of the same capsule) or by title (the anti-repeat filter can't tell
  // two identical titles apart, so a hand-edited sheet mustn't create one).
  const keptIds = new Set();
  const keptTitles = new Set();
  const clean = [];
  const titleKey = (c) =>
    `${c.forToken || WERKSTATT_TARGET}|${c.categoryId}|${String(c.title).trim().toLocaleLowerCase("de-CH")}`;

  for (const c of unsent) {
    keptIds.add(c.id);
    keptTitles.add(titleKey(c));
    clean.push(c);
  }
  for (const c of fromSheet) {
    if (keptIds.has(c.id) || keptTitles.has(titleKey(c))) continue;
    keptIds.add(c.id);
    keptTitles.add(titleKey(c));
    clean.push(c);
  }
  writeWerkstatt(clean);
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
      // While the form is open the tabs are the capsule's category picker,
      // not a navigation away from it. Closing the form here used to throw
      // away everything typed so far, with no warning and no undo.
      if (isFormOpen()) syncFormCategoryLabel();
      else closeKapselForm();
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
  mine.forEach((kapsel, i) => list.appendChild(renderKapselCard(kapsel, i)));

  // Keep the selected category in view without scrolling the page — only the
  // strip moves, so tapping the last tab never yanks the panel around.
  const activeTab = tabs.querySelector(".is-active");
  if (activeTab && tabs.scrollWidth > tabs.clientWidth) {
    tabs.scrollTo({
      left: Math.max(0, activeTab.offsetLeft - (tabs.clientWidth - activeTab.offsetWidth) / 2),
      behavior: "smooth"
    });
  }
}

function renderKapselCard(kapsel, index) {
  // The whole card is the edit affordance. A per-card ✎/✕ column cost about
  // a third of the width on a phone, wrapped every title, and stacked a row
  // of red crosses down the list; deleting lives in the form instead, behind
  // the edit the user already has to open.
  const card = document.createElement("button");
  card.type = "button";
  card.className = "ag-werkstatt-card";
  // Stagger, capped so a long list doesn't turn into a slow cascade.
  card.style.setProperty("--ag-i", String(index));
  card.setAttribute("aria-label", `${kapsel.title} bearbeiten`);
  // Capsules round-trip through the shared sheet, so treat every field as
  // untrusted text on the way back in.
  // A capsule is pending for a few seconds after every save, until the next
  // sync confirms it — flagging that immediately would just be noise. Only
  // say so once it has been unconfirmed long enough to mean something.
  const stale = kapsel.pendingSince && (Date.now() - kapsel.pendingSince > 90000);
  const answered = kapsel.prompt && kapsel.answer
    ? `<div class="ag-werkstatt-answer"><span class="ag-werkstatt-block-label">Seine Antwort</span>${escapeHtml(kapsel.answer)}</div>`
    : kapsel.prompt
      ? `<div class="ag-werkstatt-card-pending">Noch nicht beantwortet</div>`
      : "";
  card.innerHTML = `
    <div class="ag-werkstatt-card-title">${escapeHtml(kapsel.title)}</div>
    <div class="ag-werkstatt-card-msg">${escapeHtml(kapsel.message)}</div>
    ${kapsel.prompt ? `<div class="ag-werkstatt-card-prompt"><span class="ag-werkstatt-block-label">Frage</span>${escapeHtml(kapsel.prompt)}</div>` : ""}
    ${answered}
    <div class="ag-werkstatt-card-tags">
      ${kapsel.voucher ? `<span class="ag-werkstatt-tag is-voucher">Gutschein</span>` : ""}
      ${kapsel.link ? `<span class="ag-werkstatt-tag">Link</span>` : ""}
      ${stale ? `<span class="ag-werkstatt-tag is-unsent">Noch nicht übertragen</span>` : ""}
    </div>
  `;
  card.addEventListener("click", () => openKapselForm(kapsel));
  return card;
}

function isFormOpen() {
  const form = document.getElementById("ag-werkstatt-form");
  return !!form && !form.hidden;
}

// The heading names the category the capsule will land in, so switching tabs
// mid-write reads as a choice rather than as something going wrong.
function syncFormCategoryLabel() {
  const el = document.getElementById("ag-werkstatt-form-title");
  if (!el) return;
  const cat = categories().find((c) => c.id === ui.categoryId);
  const what = ui.editingId ? "Kapsel bearbeiten" : "Neue Kapsel";
  el.textContent = cat ? `${what} · ${cat.label}` : what;
}

export function openKapselForm(kapsel) {
  const form = document.getElementById("ag-werkstatt-form");
  const addBtn = document.getElementById("ag-werkstatt-add");
  if (!form) return;
  ui.editingId = kapsel ? kapsel.id : null;
  if (kapsel && kapsel.categoryId) ui.categoryId = kapsel.categoryId;
  document.getElementById("ag-werkstatt-title").value = kapsel ? kapsel.title : "";
  document.getElementById("ag-werkstatt-message").value = kapsel ? kapsel.message : "";
  document.getElementById("ag-werkstatt-prompt").value = (kapsel && kapsel.prompt) || "";
  document.getElementById("ag-werkstatt-link").value = (kapsel && kapsel.link) || "";
  document.getElementById("ag-werkstatt-voucher").checked = !!(kapsel && kapsel.voucher);
  syncFormCategoryLabel();
  const errEl = document.getElementById("ag-werkstatt-error");
  if (errEl) errEl.hidden = true;
  // Delete only exists while editing, and starts un-armed: the first tap
  // turns it into a confirmation. Replaces a window.confirm() — the one
  // native dialog left in the app, and the least elegant thing in it.
  const delBtn = document.getElementById("ag-werkstatt-delete");
  if (delBtn) {
    delBtn.hidden = !kapsel;
    delBtn.textContent = "Kapsel löschen";
    delBtn.classList.remove("is-armed");
  }
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
  const delBtn = document.getElementById("ag-werkstatt-delete");
  if (delBtn) { delBtn.hidden = true; delBtn.classList.remove("is-armed"); }
  ui.editingId = null;
}

// Two-step, in place: tap once to arm, again to delete.
export function requestKapselDelete() {
  const btn = document.getElementById("ag-werkstatt-delete");
  if (!btn || !ui.editingId) return;
  if (!btn.classList.contains("is-armed")) {
    btn.classList.add("is-armed");
    btn.textContent = "Wirklich löschen?";
    haptic(12);
    return;
  }
  deleteKapsel(ui.editingId);
  closeKapselForm();
  renderWerkstatt();
  haptic([12, 40, 12]);
  showToast("Kapsel gelöscht");
}

export function submitKapselForm() {
  const title = (document.getElementById("ag-werkstatt-title")?.value || "").trim();
  const message = (document.getElementById("ag-werkstatt-message")?.value || "").trim();
  const prompt = (document.getElementById("ag-werkstatt-prompt")?.value || "").trim();
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

  // The anti-repeat filter in pull.js keys on category + exact title, so two
  // capsules sharing one title look like a single capsule to it and quietly
  // cost a slot from the "nothing repeats until the pool is spent" promise.
  // scripts/validate-gacha-config.cjs rejects this in config/outcomes.json;
  // capsules never pass through that validator, so the check lives here.
  const norm = (s) => (s || "").trim().toLocaleLowerCase("de-CH");
  const clash = norm(title);
  const mine = werkstattFor(ui.categoryId, WERKSTATT_TARGET)
    .some((c) => c.id !== ui.editingId && norm(c.title) === clash);
  if (mine) return fail("Eine Kapsel mit diesem Titel gibt es hier schon.");
  const shipped = (categories().find((c) => c.id === ui.categoryId)?.outcomes || [])
    .some((o) => norm(o.title) === clash);
  if (shipped) return fail("So heisst schon eine Standardkapsel in dieser Kategorie.");

  saveKapsel({
    id: ui.editingId || `k-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    categoryId: ui.categoryId,
    forToken: WERKSTATT_TARGET,
    title, message, prompt, link, voucher
  });
  const wasEdit = !!ui.editingId;
  closeKapselForm();
  renderWerkstatt();
  haptic([10, 30, 10]);
  showToast(wasEdit ? "Kapsel geändert ✓" : `Kapsel gespeichert — ${targetName()} kann sie ziehen ✓`);
}
