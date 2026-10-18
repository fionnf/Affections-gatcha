// ── Liste ────────────────────────────────────────────────────────────────────
// An outcome can carry `items`: a few things shown all at once under the
// message, each with a small picture, a title and a line or two. Unlike
// `steps` there is nothing to tap through and nothing is remembered; it is
// a list, not a course. Three things to do in a city, say.
import { escapeHtml } from "./utils.js";
import { figureHtml } from "./kursfiguren.js";

export function validItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((s) => s && typeof s === "object" && typeof s.title === "string" && typeof s.text === "string");
}

// Pure: the markup for a list, or "" when there is none.
export function listeHtml(items) {
  const list = validItems(items);
  if (!list.length) return "";
  return list.map((it) => {
    const fig = figureHtml(it.figure);
    return `<section class="ag-liste-item">${fig ? `<div class="ag-kurs-figure">${fig}</div>` : ""}<h3 class="ag-kurs-title">${escapeHtml(it.title)}</h3><p class="ag-liste-text">${escapeHtml(it.text).replace(/\n/g, "<br>")}</p></section>`;
  }).join("");
}

export function renderListe(el, pull) {
  if (!el) return;
  const html = listeHtml(pull && pull.outcome && pull.outcome.items);
  el.innerHTML = html;
  el.hidden = !html;
}
