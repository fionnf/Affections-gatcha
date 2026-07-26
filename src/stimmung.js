import { STIMMUNG_KEY } from "./constants.js";
import { state } from "./state.js";
import { getToken, dateKeyInTimezone } from "./utils.js";
import { markRecentWrite, withinGracePeriod } from "./sheetSync.js";

// The Stimmung is shared: whoever picks the day's colour picks it for both.
// Uses the app's timezone (not UTC) so "today" flips at the same moment as
// every other day-keyed thing in the app.
function todayKey() {
  return dateKeyInTimezone(state.theme?.timezone || "Europe/Zurich");
}

function postStimmungToSheet(day, hex) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
  const body = JSON.stringify({ type: "stimmung-set", day, hex, token: getToken() });
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  fetch(cfg.endpointUrl, opts)
    .catch(() => fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {}));
}

// Called from the sync handler with the sheet's {day, hex} for the shared
// colour. Applies it when it's for today and differs from what's showing —
// so the other person's pick lands here on the next sync.
export function applySharedStimmung(shared) {
  if (!shared || typeof shared !== "object") return;
  // Don't let an in-flight sync stomp a colour just chosen on this device.
  if (withinGracePeriod("stimmung")) return;
  const today = todayKey();
  if (shared.day !== today) return;
  const hex = typeof shared.hex === "string" ? shared.hex.trim() : "";
  if (!hex) {
    // Cleared on the other device — clear here too.
    if (readStimmung()) { clearStimmung(); resetStimmung(); }
    return;
  }
  if (readStimmung() === hex) return;
  writeStimmungLocal(hex);
  applyStimmung(hex);
}

// Mix the chosen colour (30%) into the dark base #0a1410
function _tintBg(hex) {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  const mix = (c, base) => Math.round(base + (c - base) * 0.30);
  return `rgb(${mix(r, 10)},${mix(g, 20)},${mix(b, 16)})`;
}

export function applyStimmung(hex) {
  document.body.style.background = _tintBg(hex);
  updateStimmungChip(hex);
}

export function resetStimmung() {
  document.body.style.removeProperty("background");
  updateStimmungChip(null);
}

export function readStimmung() {
  try {
    const raw = localStorage.getItem(STIMMUNG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.day !== todayKey()) return null;
    return parsed.hex || null;
  } catch { return null; }
}

// Local-only write (no sheet post) — used when applying someone else's pick.
function writeStimmungLocal(hex) {
  try {
    localStorage.setItem(STIMMUNG_KEY, JSON.stringify({ day: todayKey(), hex }));
  } catch (_e) {}
}

// A pick made on this device: store it and share it for the day. Can happen
// any number of times a day — the sheet row is upserted per day, so the most
// recent choice always wins and reaches the other person on their next sync.
export function writeStimmung(hex) {
  const day = todayKey();
  writeStimmungLocal(hex);
  markRecentWrite("stimmung");
  postStimmungToSheet(day, hex);
}

export function clearStimmung() {
  try { localStorage.removeItem(STIMMUNG_KEY); } catch (_e) {}
}

// Reset shares the cleared state too, so "Zurücksetzen" clears it for both.
export function clearStimmungShared() {
  const day = todayKey();
  clearStimmung();
  markRecentWrite("stimmung");
  postStimmungToSheet(day, "");
}

export function restoreStimmung() {
  const hex = readStimmung();
  if (hex) applyStimmung(hex);
}

export function updateStimmungChip(hex) {
  const chip = document.getElementById("ag-btn-stimmung");
  if (!chip) return;
  if (hex) {
    chip.classList.add("ag-chip-stimmung-set");
    chip.style.setProperty("--chip-dot-color", hex);
  } else {
    chip.classList.remove("ag-chip-stimmung-set");
    chip.style.removeProperty("--chip-dot-color");
  }
}

export function openStimmungPanel() {
  const panel = document.getElementById("ag-stimmung-panel");
  if (!panel) return;
  panel.hidden = false;
  const savedHex = readStimmung() || "#4aaa5a";
  _syncInputs(panel, savedHex);
  _updatePreview(panel, savedHex);
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// X button: hide the panel and revert any live preview to the last saved colour.
export function closeStimmungPanel() {
  const panel = document.getElementById("ag-stimmung-panel");
  if (panel) panel.hidden = true;
  const saved = readStimmung();
  if (saved) applyStimmung(saved);
  else resetStimmung();
}

export function bindStimmungPanel() {
  const panel = document.getElementById("ag-stimmung-panel");
  if (!panel) return;
  const picker = panel.querySelector("#ag-stimmung-picker");
  const hexInput = panel.querySelector("#ag-stimmung-hex");
  const applyBtn = panel.querySelector("#ag-stimmung-apply");
  const resetBtn = panel.querySelector("#ag-stimmung-reset");

  function livePreview(hex) {
    _updatePreview(panel, hex);
    applyStimmung(hex);
  }

  if (picker) {
    picker.addEventListener("input", () => {
      if (hexInput) hexInput.value = picker.value;
      livePreview(picker.value);
    });
  }

  if (hexInput) {
    hexInput.addEventListener("input", () => {
      const val = _normaliseHex(hexInput.value);
      if (val) {
        if (picker) picker.value = val;
        livePreview(val);
      }
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const val = picker?.value || _normaliseHex(hexInput?.value || "") || "#4aaa5a";
      writeStimmung(val);
      applyStimmung(val);
      if (panel) panel.hidden = true;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearStimmungShared();
      resetStimmung();
      _syncInputs(panel, "#4aaa5a");
      _updatePreview(panel, "#4aaa5a");
    });
  }
}

function _syncInputs(panel, hex) {
  const picker = panel.querySelector("#ag-stimmung-picker");
  const hexInput = panel.querySelector("#ag-stimmung-hex");
  if (picker) picker.value = hex;
  if (hexInput) hexInput.value = hex;
}

function _updatePreview(panel, hex) {
  const preview = panel.querySelector(".ag-stimmung-preview");
  if (preview) preview.style.background = _tintBg(hex);
}

function _normaliseHex(raw) {
  const s = raw.trim();
  const long = s.startsWith("#") ? s : `#${s}`;
  if (/^#[0-9a-fA-F]{6}$/.test(long)) return long.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(long)) {
    const [, r, g, b] = long;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}
