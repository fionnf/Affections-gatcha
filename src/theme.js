// ── Theme helpers ─────────────────────────────────────────────────────────────
import { mount } from "./state.js";

export function injectFonts() {
  if (document.querySelector("[data-ag-fonts]")) return;
  const link = document.createElement("link");
  link.dataset.agFonts = "true";
  link.rel = "stylesheet";
  link.href = "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap";
  document.head.appendChild(link);
}

export function applyTheme(theme) {
  const set = (name, value) => mount.style.setProperty(name, value);
  const colors = theme.colors || {};
  const dark = theme.darkColors || colors;
  set("--ag-bg", colors.background);
  set("--ag-surface", colors.surface);
  set("--ag-surface-2", colors.surfaceAlt);
  set("--ag-text", colors.text);
  set("--ag-muted", colors.muted);
  set("--ag-border", colors.border);
  set("--ag-primary", colors.primary);
  set("--ag-primary-dark", colors.primaryDark);
  set("--ag-gold", colors.gold);
  set("--ag-green", colors.green);
  set("--ag-blue", colors.blue);
  set("--ag-sky", colors.sky);
  set("--ag-mountain", colors.mountain);
  set("--ag-dark-bg", dark.background);
  set("--ag-dark-surface", dark.surface);
  set("--ag-dark-surface-2", dark.surfaceAlt);
  set("--ag-dark-text", dark.text);
  set("--ag-dark-muted", dark.muted);
  set("--ag-dark-border", dark.border);
  set("--ag-dark-primary", dark.primary);
  set("--ag-dark-primary-dark", dark.primaryDark);
  set("--ag-dark-gold", dark.gold);
  set("--ag-dark-green", dark.green);
  set("--ag-dark-blue", dark.blue);
  set("--ag-dark-sky", dark.sky);
  set("--ag-dark-mountain", dark.mountain);
}

export const COLOR_VAR_MAP = {
  background: "--ag-bg",
  surface: "--ag-surface",
  surfaceAlt: "--ag-surface-2",
  text: "--ag-text",
  muted: "--ag-muted",
  border: "--ag-border",
  primary: "--ag-primary",
  primaryDark: "--ag-primary-dark",
  gold: "--ag-gold",
  green: "--ag-green",
  blue: "--ag-blue",
  sky: "--ag-sky",
  mountain: "--ag-mountain"
};

export const DARK_COLOR_VAR_MAP = {
  background: "--ag-dark-bg",
  surface: "--ag-dark-surface",
  surfaceAlt: "--ag-dark-surface-2",
  text: "--ag-dark-text",
  muted: "--ag-dark-muted",
  border: "--ag-dark-border",
  primary: "--ag-dark-primary",
  primaryDark: "--ag-dark-primary-dark",
  gold: "--ag-dark-gold",
  green: "--ag-dark-green",
  blue: "--ag-dark-blue",
  sky: "--ag-dark-sky",
  mountain: "--ag-dark-mountain"
};

export function applySpecialDayColors(day) {
  const special = checkSpecialDay(day);
  if (!special) return;
  const set = (name, value) => mount.style.setProperty(name, value);
  if (special.colors && typeof special.colors === "object") {
    for (const [key, value] of Object.entries(special.colors)) {
      if (COLOR_VAR_MAP[key] && typeof value === "string") set(COLOR_VAR_MAP[key], value);
    }
  }
  if (special.darkColors && typeof special.darkColors === "object") {
    for (const [key, value] of Object.entries(special.darkColors)) {
      if (DARK_COLOR_VAR_MAP[key] && typeof value === "string") set(DARK_COLOR_VAR_MAP[key], value);
    }
  }
}

// Note: checkSpecialDay is imported lazily to avoid circular deps.
// We import it from pull.js which defines it. To avoid circular,
// we accept it as a parameter from init.js or inline it here.
// The dist bundles this inline, so we inline it here too.
import { state } from "./state.js";

function checkSpecialDay(day) {
  const days = Array.isArray(state.specialDays && state.specialDays.days) ? state.specialDays.days : [];
  const mmdd = day.slice(5);
  for (const entry of days) {
    if (entry.date === day || entry.date === mmdd) return entry;
  }
  return null;
}
