import { STIMMUNG_KEY } from "./constants.js";

// Vars cleared on reset — keep in sync with applyStimmung
const STIMMUNG_VARS = ["--ag-bg", "--ag-dark-bg"];

export function applyStimmung(hex) {
  const mount = document.querySelector(".ag-widget");
  if (!mount) return;
  mount.style.setProperty("--ag-bg", hex);
  mount.style.setProperty("--ag-dark-bg", hex);
  updateStimmungChip(hex);
}

export function resetStimmung() {
  const mount = document.querySelector(".ag-widget");
  if (mount) STIMMUNG_VARS.forEach((v) => mount.style.removeProperty(v));
  updateStimmungChip(null);
}

export function readStimmung() {
  try {
    const raw = localStorage.getItem(STIMMUNG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.day !== today) return null;
    return parsed.hex || null;
  } catch { return null; }
}

export function writeStimmung(hex) {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(STIMMUNG_KEY, JSON.stringify({ day: today, hex }));
}

export function clearStimmung() {
  localStorage.removeItem(STIMMUNG_KEY);
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
  syncInputs(panel, savedHex);
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

export function closeStimmungPanel() {
  const panel = document.getElementById("ag-stimmung-panel");
  if (panel) panel.hidden = true;
}

// Called once by bindEvents to wire the panel's internal controls
export function bindStimmungPanel() {
  const panel = document.getElementById("ag-stimmung-panel");
  if (!panel) return;
  const picker = panel.querySelector("#ag-stimmung-picker");
  const hexInput = panel.querySelector("#ag-stimmung-hex");
  const applyBtn = panel.querySelector("#ag-stimmung-apply");
  const resetBtn = panel.querySelector("#ag-stimmung-reset");

  if (picker) {
    picker.addEventListener("input", () => {
      if (hexInput) hexInput.value = picker.value;
    });
  }

  if (hexInput) {
    hexInput.addEventListener("input", () => {
      const val = normaliseHex(hexInput.value);
      if (val && picker) picker.value = val;
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const val = picker?.value || normaliseHex(hexInput?.value || "") || "#4aaa5a";
      applyStimmung(val);
      writeStimmung(val);
      closeStimmungPanel();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearStimmung();
      resetStimmung();
    });
  }
}

function syncInputs(panel, hex) {
  const picker = panel.querySelector("#ag-stimmung-picker");
  const hexInput = panel.querySelector("#ag-stimmung-hex");
  if (picker) picker.value = hex;
  if (hexInput) hexInput.value = hex;
}

function normaliseHex(raw) {
  const s = raw.trim();
  const long = s.startsWith("#") ? s : `#${s}`;
  if (/^#[0-9a-fA-F]{6}$/.test(long)) return long.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(long)) {
    const [, r, g, b] = long;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}
