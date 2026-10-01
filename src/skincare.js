// ── Skincare ──────────────────────────────────────────────────────────────────
// A read-only routine behind the Skincare chip. The content lives in
// config/skincare.json so it can be edited from the GitHub web editor with no
// rebuild, exactly like outcomes and missions.
//
// Steps carry an optional `when`: absent means every day, otherwise a list of
// German weekday abbreviations. Anything not scheduled for today is dimmed
// rather than hidden — seeing that Friday is a retinol night is the useful
// part, and hiding it would make the list look different every day.
import { state } from "./state.js";
import { escapeHtml } from "./utils.js";
import { haptic } from "./haptic.js";
import { dateKeyInTimezone } from "./utils.js";

const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

// The routine follows the machine's day: a retinoid night at 01:00 is still
// the evening of the weekday it started on.
export function todayShort(timezone) {
  try {
    const [y, m, d] = dateKeyInTimezone(timezone || "UTC").split("-").map(Number);
    const name = new Intl.DateTimeFormat("en-CH", { weekday: "short", timeZone: "UTC" })
      .format(new Date(Date.UTC(y, m - 1, d, 12)));
    return DAYS[["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name)] || null;
  } catch (_e) { return null; }
}

// True when the step runs today. No `when` at all means daily, which is what
// most steps are — the field only exists for the handful that are not.
export function runsToday(step, short) {
  const when = step && typeof step.when === "string" ? step.when.trim() : "";
  if (!when || when.toLowerCase() === "daily" || when.toLowerCase() === "täglich") return true;
  if (!short) return true;
  return when.split(",").map((d) => d.trim().toLowerCase()).includes(short.toLowerCase());
}

function renderBlock(block, short) {
  if (!block || !Array.isArray(block.steps) || !block.steps.length) return "";
  const rows = block.steps.map((step, i) => {
    const on = runsToday(step, short);
    const when = step.when && !/^(daily|täglich)$/i.test(step.when)
      ? `<span class="ag-skin-when">${escapeHtml(step.when)}</span>` : "";
    return `
      <li class="ag-skin-step${on ? "" : " is-off"}">
        <span class="ag-skin-num">${i + 1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${escapeHtml(step.name || "")}${when}</span>
          ${step.note ? `<span class="ag-skin-note">${escapeHtml(step.note)}</span>` : ""}
        </span>
      </li>`;
  }).join("");
  return `
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${escapeHtml(block.title || "")}</p>
      <ol class="ag-skin-steps">${rows}</ol>
    </div>`;
}

export function renderSkincare() {
  const body = document.getElementById("ag-skincare-body");
  if (!body) return;
  const cfg = state.skincare;
  if (!cfg || (!cfg.morning && !cfg.evening)) {
    body.innerHTML = `<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>`;
    return;
  }
  const short = todayShort(state.theme && state.theme.timezone);
  body.innerHTML =
    renderBlock(cfg.morning, short) +
    renderBlock(cfg.evening, short) +
    (cfg.footer ? `<p class="ag-skin-footer">${escapeHtml(cfg.footer)}</p>` : "");
}

export function openSkincarePanel() {
  const panel = document.getElementById("ag-skincare-panel");
  if (!panel) return;
  panel.hidden = false;
  renderSkincare();
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  haptic(10);
}

export function closeSkincarePanel() {
  const panel = document.getElementById("ag-skincare-panel");
  if (panel) panel.hidden = true;
}
