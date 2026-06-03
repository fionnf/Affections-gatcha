// ── Glossary ──────────────────────────────────────────────────────────────────
import { state } from "./state.js";
import { getToken } from "./utils.js";
import { haptic } from "./haptic.js";
import { GLOSSARY_KEY } from "./constants.js";

// Module-level state
export let _glossaryRecorder = null;
export let _glossaryAudioBlob = null;
export let _glossaryCurrentLang = "swabian";

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
  postGlossaryToSheet("glossary-upsert", { ...entry, createdAt: new Date().toISOString() });
}

export function updateGlossaryWord(id, fields) {
  const words = readGlossary();
  const idx = words.findIndex(w => w.id === id);
  if (idx === -1) return;
  const updated = { ...words[idx], ...fields };
  words[idx] = updated;
  writeGlossary(words);
  postGlossaryToSheet("glossary-upsert", updated);
}

export function deleteGlossaryWord(id) {
  writeGlossary(readGlossary().filter(w => w.id !== id));
  postGlossaryToSheet("glossary-delete", { id });
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

export function renderGlossaryWord(word) {
  const card = document.createElement("div");
  card.className = "ag-glossary-card";
  card.dataset.agGlossaryId = word.id;
  card.innerHTML = `
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${word.word || "—"}</div>
        ${word.meaning ? `<div class="ag-glossary-meaning-text">${word.meaning}</div>` : ""}
      </div>
      <div class="ag-glossary-card-btns">
        ${word.audioUrl ? `<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${word.id}" aria-label="Abspielen">▶</button>` : ""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${word.id}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${word.id}" aria-label="Löschen">✕</button>
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
      _glossaryAudioBlob = null;
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
      if (!window.confirm(`„${word.word}" löschen?`)) return;
      deleteGlossaryWord(word.id);
      renderGlossaryPanel(_glossaryCurrentLang);
      haptic(8);
    });
  }
  return card;
}

export function renderGlossaryPanel(lang) {
  _glossaryCurrentLang = lang || "swabian";
  const list = document.getElementById("ag-glossary-list");
  const empty = document.getElementById("ag-glossary-empty");
  if (!list) return;
  // Update tab active state
  document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.lang === _glossaryCurrentLang);
  });
  _glossaryMovePill();
  const words = readGlossary().filter(w => w.lang === _glossaryCurrentLang);
  list.innerHTML = "";
  if (!words.length) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  words.forEach(w => list.appendChild(renderGlossaryWord(w)));
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
  _glossaryCurrentLang = "swabian";
  renderGlossaryPanel("swabian");
  // reset pill after layout
  window.requestAnimationFrame(() => _glossaryMovePill());
  haptic(10);
}

export function closeGlossaryPanel() {
  const panel = document.getElementById("ag-glossary-panel");
  if (panel) panel.hidden = true;
  const form = document.getElementById("ag-glossary-form");
  if (form) form.hidden = true;
  const addBtn = document.getElementById("ag-glossary-add");
  if (addBtn) addBtn.hidden = false;
  _glossaryAudioBlob = null;
  if (_glossaryRecorder && _glossaryRecorder.state !== "inactive") {
    try { _glossaryRecorder.stop(); } catch (_) {}
  }
  _glossaryRecorder = null;
}
