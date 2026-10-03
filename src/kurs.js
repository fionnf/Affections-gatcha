// ── Kurs ─────────────────────────────────────────────────────────────────────
// An outcome can carry `steps`: a short course read one step at a time, with
// Weiter and Zurück under the card's message. Where he got to is kept per
// day, so a course can be picked up again after lunch. Nothing else changes:
// the message is the introduction, the steps follow it.
import { haptic } from "./haptic.js";
import { escapeHtml } from "./utils.js";
import { figureHtml } from "./kursfiguren.js";

// Paragraphs and line breaks, nothing more; the text comes from config.
export function stepHtml(text) {
  return String(text || "").split(/\n{2,}/).map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br>")}</p>`).join("");
}

const KEY = "affektions-gacha:kurs:v1";
const LAST_KEY = "affektions-gacha:kurs:last";

function readAll() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_e) { return {}; }
}
export function readKursIndex(day) {
  const v = readAll()[day];
  return Number.isInteger(v) && v >= 0 ? v : 0;
}
export function writeKursIndex(day, index) {
  try {
    const all = readAll();
    all[day] = index;
    const keys = Object.keys(all).sort();
    while (keys.length > 60) delete all[keys.shift()];
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch (_e) {}
}

// The last course seen, kept whole, so the chip can reopen it on a later
// day when the capsule itself is long in the Verlauf.
export function rememberKurs(pull) {
  const steps = validSteps(pull && pull.outcome && pull.outcome.steps);
  if (!steps.length) return;
  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify({
      day: pull.day, title: pull.outcome.title || "", label: (pull.category && pull.category.label) || "",
      steps, done: pull.outcome.done || ""
    }));
  } catch (_e) {}
}
export function readLastKurs() {
  try {
    const k = JSON.parse(window.localStorage.getItem(LAST_KEY) || "null");
    if (!k || typeof k.day !== "string" || !validSteps(k.steps).length) return null;
    return k;
  } catch (_e) { return null; }
}
// What renderKurs needs, rebuilt from the stored course.
export function kursAsPull(k) {
  return { day: k.day, category: { label: k.label }, outcome: { title: k.title, steps: k.steps, done: k.done } };
}

// The chip on the hero that reopens the course. Added once a course has
// been seen; it binds its own click, so it can arrive after bindEvents.
export function ensureKursChip() {
  const chips = document.querySelector("[data-ag-chips]");
  if (!chips || chips.querySelector("#ag-btn-kurs") || !readLastKurs()) return;
  const li = document.createElement("li");
  li.id = "ag-btn-kurs";
  li.textContent = "Kurs 🎞️";
  li.tabIndex = 0;
  li.setAttribute("role", "button");
  li.setAttribute("aria-label", "Kurs nochmal öffnen");
  li.classList.add("ag-chip-clickable");
  const open = () => { haptic(6); openKursPanel(); };
  li.addEventListener("click", open);
  li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  chips.appendChild(li);
}

export function openKursPanel() {
  const panel = document.querySelector("#ag-kurs-panel");
  const k = readLastKurs();
  if (!panel || !k) return;
  const title = panel.querySelector("#ag-kurs-panel-title");
  if (title) title.textContent = k.title || "Kurs";
  const sub = panel.querySelector("#ag-kurs-panel-copy");
  if (sub) sub.textContent = k.label ? `${k.label} · ${k.day}` : k.day;
  renderKurs(panel.querySelector("[data-ag-kurs-panel-block]"), kursAsPull(k), { remember: false });
  panel.hidden = false;
  try { panel.scrollIntoView({ block: "start", behavior: "smooth" }); } catch (_e) {}
}
export function closeKursPanel() {
  const panel = document.querySelector("#ag-kurs-panel");
  if (panel) panel.hidden = true;
}

// The pure part: where a Weiter or Zurück lands. `count` steps, plus one
// final "done" position after the last step.
export function clampStep(index, count) {
  if (!Number.isFinite(index) || count <= 0) return 0;
  return Math.min(count, Math.max(0, Math.round(index)));
}
export function validSteps(steps) {
  if (!Array.isArray(steps)) return [];
  return steps.filter((s) => s && typeof s === "object" && typeof s.title === "string" && typeof s.text === "string");
}

// Renders the course block for a pull, or hides it when the outcome has no
// steps. Buttons re-render in place; the block scrolls itself into view so a
// long step starts at its title.
export function renderKurs(block, pull, { remember = true } = {}) {
  if (!block) return;
  const steps = validSteps(pull && pull.outcome && pull.outcome.steps);
  if (!steps.length) { block.hidden = true; return; }
  block.hidden = false;
  if (remember) { rememberKurs(pull); ensureKursChip(); }
  const day = pull.day;
  const paint = (scroll) => {
    const i = clampStep(readKursIndex(day), steps.length);
    const done = i >= steps.length;
    const step = done ? null : steps[i];
    block.classList.toggle("is-done", done);
    block.querySelector("[data-ag-kurs-count]").textContent = done ? `${steps.length} von ${steps.length} · fertig` : `Schritt ${i + 1} von ${steps.length}`;
    block.querySelector("[data-ag-kurs-title]").textContent = done ? "Alle Schritte durch 🎞️" : step.title;
    const fig = block.querySelector("[data-ag-kurs-figure]");
    if (fig) {
      const html = done ? "" : figureHtml(step.figure);
      fig.innerHTML = html;
      fig.hidden = !html;
    }
    block.querySelector("[data-ag-kurs-text]").innerHTML = done
      ? stepHtml(pull.outcome.done || "Das war der Kurs. Jetzt gilt nur noch das Notizbuch und der Film.")
      : stepHtml(step.text);
    block.querySelector("[data-ag-kurs-dots]").innerHTML = steps.map((_, k) =>
      `<i class="${k < i ? "is-past" : k === i && !done ? "is-now" : ""}"></i>`).join("");
    const prev = block.querySelector("[data-ag-kurs-prev]");
    const next = block.querySelector("[data-ag-kurs-next]");
    prev.disabled = i === 0;
    next.hidden = done;
    next.textContent = i === steps.length - 1 ? "Fertig ✓" : "Weiter ›";
    if (scroll) {
      try { block.scrollIntoView({ block: "start", behavior: "smooth" }); } catch (_e) {}
    }
  };
  const go = (delta) => {
    const i = clampStep(readKursIndex(day) + delta, steps.length);
    writeKursIndex(day, i);
    haptic(delta > 0 ? [8, 20, 8] : 6);
    paint(true);
  };
  block.querySelector("[data-ag-kurs-prev]").onclick = () => go(-1);
  block.querySelector("[data-ag-kurs-next]").onclick = () => go(1);
  paint(false);
}
