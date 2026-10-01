// ── Glossary ──────────────────────────────────────────────────────────────────
import { state } from "./state.js";
import { getToken, escapeHtml } from "./utils.js";
import { armConfirm } from "./confirm.js";
import { haptic } from "./haptic.js";
import { GLOSSARY_KEY } from "./constants.js";
import { markRecentWrite, withinGracePeriod } from "./sheetSync.js";

// Module-level state
// Mutable UI state shared with events.js. A single object whose properties
// are mutated (never reassigning an exported binding, which ES modules forbid
// from the importing side and Rollup flags on every build).
export const glossaryUI = { recorder: null, audioBlob: null, lang: "swabian" };

export function readGlossary() {
  try { return JSON.parse(window.localStorage.getItem(GLOSSARY_KEY) || "[]") || []; } catch (_) { return []; }
}

export function writeGlossary(words) {
  try { window.localStorage.setItem(GLOSSARY_KEY, JSON.stringify(words)); } catch (_) {}
}

export function addGlossaryWord(entry) {
  const words = readGlossary();
  words.unshift(entry);
  writeGlossary(words);
  markRecentWrite("glossary");
  postGlossaryToSheet("glossary-upsert", { ...entry, createdAt: new Date().toISOString() });
}

export function updateGlossaryWord(id, fields) {
  const words = readGlossary();
  const idx = words.findIndex(w => w.id === id);
  if (idx === -1) return;
  const updated = { ...words[idx], ...fields };
  words[idx] = updated;
  writeGlossary(words);
  markRecentWrite("glossary");
  postGlossaryToSheet("glossary-upsert", updated);
}

export function deleteGlossaryWord(id) {
  writeGlossary(readGlossary().filter(w => w.id !== id));
  markRecentWrite("glossary");
  postGlossaryToSheet("glossary-delete", { id });
}

// True while a sheet fetch is in flight. On a device with no cached words the
// panel used to render "Noch kein Wort hier" during that fetch — which reads
// as "the glossary is empty" when it actually means "not here yet", and the
// sheet round-trip is slow enough to be seen every time.
let glossaryLoading = false;

export async function fetchGlossaryFromSheet() {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return 0;
  try {
    const token = getToken();
    const url = `${cfg.endpointUrl}?token=${encodeURIComponent(token)}`;
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 12000);
    let res;
    try {
      res = await fetch(url, { cache: "no-store", signal: controller.signal });
    } finally {
      clearTimeout(tid);
    }
    if (!res.ok) return 0;
    const data = await res.json();
    if (!data.ok || !Array.isArray(data.glossary)) return 0;
    // The sheet is authoritative: overwrite local state so deletions and
    // edits made on another device actually propagate, instead of merging
    // and letting stale local entries linger. Skip the overwrite once if a
    // word was just added/edited here — this GET may have raced ahead of
    // that write actually landing in the sheet; the next sync picks it up.
    if (withinGracePeriod("glossary")) return data.glossary.length;
    writeGlossary(data.glossary.filter((e) => e.id));
    return data.glossary.length;
  } catch (_) { return 0; }
}

export function postGlossaryToSheet(type, payload) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
  const body = JSON.stringify({ type, token: getToken(), ...payload });
  fetch(cfg.endpointUrl, { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body })
    .catch(() => fetch(cfg.endpointUrl, { method: "POST", mode: "no-cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body }).catch(() => {}));
}

export async function _blobToDataUrl(blob) {
  return new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
}

export async function uploadGlossaryAudio(blob, wordId) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return _blobToDataUrl(blob);
  try {
    const dataUrl = await _blobToDataUrl(blob);
    const base64 = dataUrl.split(",")[1];
    const mimeType = blob.type || "audio/webm";
    const body = JSON.stringify({ type: "glossary-audio", token: getToken(), filename: `glossary-${wordId}.webm`, mimeType, data: base64 });
    const resp = await fetch(cfg.endpointUrl, { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body });
    const json = await resp.json();
    if (json.ok && json.url) return json.url;
    return dataUrl;
  } catch (_) {
    return _blobToDataUrl(blob);
  }
}

const LANG_LABELS = { swabian: "Schwäbisch", portuguese: "Português", irish: "Gaeilge", "deutsch-slang": "Deutsch Slang" };

export function renderGlossaryWord(word, showLang = false) {
  const card = document.createElement("div");
  card.className = "ag-glossary-card";
  card.dataset.agGlossaryId = word.id;
  // Word entries are sheet-synced (typed by either player on any device) —
  // escape everything interpolated into innerHTML.
  const langBadge = showLang && word.lang
    ? `<span class="ag-glossary-lang-badge">${escapeHtml(LANG_LABELS[word.lang] || word.lang)}</span>`
    : "";
  card.innerHTML = `
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${escapeHtml(word.word || "—")}${langBadge}</div>
        ${word.meaning ? `<div class="ag-glossary-meaning-text">${escapeHtml(word.meaning)}</div>` : ""}
      </div>
      <div class="ag-glossary-card-btns">
        ${word.audioUrl ? `<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${escapeHtml(word.id)}" aria-label="Abspielen">▶</button>` : ""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${escapeHtml(word.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${escapeHtml(word.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;
  const playBtn = card.querySelector("[data-ag-glossary-play]");
  if (playBtn && word.audioUrl) {
    playBtn.addEventListener("click", () => {
      const audio = new Audio(word.audioUrl);
      audio.play().catch(() => {});
      haptic(6);
    });
  }
  const editBtn = card.querySelector("[data-ag-glossary-edit]");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const form = document.getElementById("ag-glossary-form");
      const addBtn = document.getElementById("ag-glossary-add");
      if (!form) return;
      document.getElementById("ag-glossary-edit-id").value = word.id;
      document.getElementById("ag-glossary-word-input").value = word.word || "";
      document.getElementById("ag-glossary-meaning-input").value = word.meaning || "";
      const titleEl = document.getElementById("ag-glossary-form-title");
      if (titleEl) titleEl.textContent = "Wort bearbeiten";
      const labelEl = document.getElementById("ag-glossary-save-label");
      if (labelEl) labelEl.textContent = "Speichern";
      const statusEl = document.getElementById("ag-glossary-audio-status");
      if (statusEl) statusEl.textContent = word.audioUrl ? "Aufnahme vorhanden" : "";
      glossaryUI.audioBlob = null;
      form.hidden = false;
      if (addBtn) addBtn.hidden = true;
      form.scrollIntoView({ behavior: "smooth", block: "nearest" });
      document.getElementById("ag-glossary-word-input")?.focus();
      haptic(8);
    });
  }
  const delBtn = card.querySelector("[data-ag-glossary-del]");
  if (delBtn) {
    delBtn.addEventListener("click", () => {
      if (!armConfirm(delBtn, "Löschen? Nochmal tippen")) return;
      deleteGlossaryWord(word.id);
      renderGlossaryPanel(glossaryUI.lang);
      haptic(8);
    });
  }
  return card;
}

export function renderGlossaryPanel(lang) {
  glossaryUI.lang = lang || "swabian";
  const list = document.getElementById("ag-glossary-list");
  const empty = document.getElementById("ag-glossary-empty");
  if (!list) return;
  // Update tab active state
  document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.lang === glossaryUI.lang);
  });
  _glossaryMovePill();
  const query = (document.getElementById("ag-glossary-search")?.value || "").trim().toLowerCase();
  const allWords = readGlossary();
  const words = query
    ? allWords.filter(w =>
        (w.word || "").toLowerCase().includes(query) ||
        (w.meaning || "").toLowerCase().includes(query)
      )
    : allWords.filter(w => w.lang === glossaryUI.lang);
  list.innerHTML = "";
  if (!words.length) {
    if (empty) {
      empty.textContent = query
        ? "Kein Treffer."
        : glossaryLoading
          ? "Wörter werden geladen …"
          : "Noch kein Wort hier. Füg eins hinzu.";
      empty.classList.toggle("is-loading", glossaryLoading && !query);
      empty.hidden = false;
    }
    return;
  }
  if (empty) { empty.hidden = true; empty.classList.remove("is-loading"); }
  words.forEach(w => list.appendChild(renderGlossaryWord(w, !!query)));
}

export function _glossaryMovePill() {
  const pill = document.getElementById("ag-glossary-pill");
  const tabs = document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");
  if (!pill || !tabs.length) return;
  const activeBtn = document.querySelector(`#ag-glossary-tabs .ag-glossary-tab.is-active`);
  if (!activeBtn) return;
  pill.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  pill.style.width = `${activeBtn.offsetWidth}px`;
}

export function openGlossaryPanel() {
  const panel = document.getElementById("ag-glossary-panel");
  if (!panel) return;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  glossaryUI.lang = "swabian";
  const searchEl = document.getElementById("ag-glossary-search");
  if (searchEl) searchEl.value = "";
  // Render instantly from local cache, then refresh from the sheet in the
  // background so the panel always reflects words added on another device.
  glossaryLoading = true;
  renderGlossaryPanel("swabian");
  window.requestAnimationFrame(() => _glossaryMovePill());
  haptic(10);
  // Always re-render when the fetch settles, not just when it returned rows.
  // Gating on count > 0 left the spinner up for good whenever the sheet came
  // back empty, timed out, or errored.
  fetchGlossaryFromSheet()
    .catch(() => 0)
    .then(() => {
      glossaryLoading = false;
      renderGlossaryPanel(glossaryUI.lang);
    });
}

export function closeGlossaryPanel() {
  const panel = document.getElementById("ag-glossary-panel");
  if (panel) panel.hidden = true;
  const form = document.getElementById("ag-glossary-form");
  if (form) form.hidden = true;
  const addBtn = document.getElementById("ag-glossary-add");
  if (addBtn) addBtn.hidden = false;
  // If the add form was open its sheet backdrop is up — clear it, or it stays
  // covering the screen after the panel closes and blocks all taps.
  document.querySelector("[data-ag-sheet-backdrop]")?.classList.remove("is-open");
  glossaryUI.audioBlob = null;
  if (glossaryUI.recorder && glossaryUI.recorder.state !== "inactive") {
    try { glossaryUI.recorder.stop(); } catch (_) {}
  }
  glossaryUI.recorder = null;
}
