// Outcomes editor: browse categories → outcomes, edit/add/delete, commit to GitHub.
import { state } from "./state.js";
import { h, field, textInput, select, status, confirmDialog } from "./ui.js";
import { buildOutcomeForm } from "./outcome-form.js";
import { KNOWN_TONES, OUTCOMES_PATH } from "./constants.js";
import { getFile, putFile, hasToken } from "./github.js";
import { validateOutcomes } from "./validate.js";

let container = null;
let dirty = false;
let view = { name: "list", categoryIndex: null, outcomeIndex: null };

export async function renderOutcomes(mount) {
  container = mount;
  container.innerHTML = "";
  if (!hasToken()) {
    container.appendChild(h("div", { class: "fa-card" }, [
      h("h3", { text: "Kein GitHub-Token" }),
      h("p", { class: "fa-muted", text: "Hinterlege zuerst einen GitHub-Token im Tab „Einstellungen“, um Outcomes zu laden und zu speichern." })
    ]));
    return;
  }
  if (!state.outcomes) {
    container.appendChild(h("p", { class: "fa-muted", text: "Lade outcomes.json…" }));
    try {
      state.outcomes = await getFile(OUTCOMES_PATH);
      dirty = false;
    } catch (e) {
      container.innerHTML = "";
      container.appendChild(h("div", { class: "fa-status err", text: `Laden fehlgeschlagen: ${e.message}` }));
      return;
    }
  }
  draw();
}

function draw() {
  container.innerHTML = "";
  if (view.name === "list") drawCategoryList();
  else if (view.name === "category") drawCategory();
  else if (view.name === "outcome") drawOutcome();
}

function totalWeight() {
  return state.outcomes.json.categories.reduce((s, c) => s + (Number(c.weight) || 0), 0);
}

function commitBar() {
  const msg = h("p", { class: "fa-status", hidden: true });
  const btn = h("button", { class: "fa-btn primary", disabled: !dirty, text: dirty ? "Änderungen committen" : "Keine Änderungen" });
  btn.addEventListener("click", async () => {
    const { errors, warnings } = validateOutcomes(state.outcomes.json);
    if (errors.length) {
      status(msg, "Validierung fehlgeschlagen:\n• " + errors.join("\n• "), "err");
      return;
    }
    btn.disabled = true;
    status(msg, "Committe…", "pending");
    try {
      const newSha = await putFile(OUTCOMES_PATH, state.outcomes.json, state.outcomes.sha, "chore(admin): update outcomes.json");
      state.outcomes.sha = newSha;
      dirty = false;
      let txt = "Gespeichert ✓ (live in ~1 Min)";
      if (warnings.length) txt += "\nHinweise:\n• " + warnings.join("\n• ");
      status(msg, txt, "ok");
      btn.textContent = "Keine Änderungen";
    } catch (e) {
      status(msg, `Commit fehlgeschlagen: ${e.message}`, "err");
      btn.disabled = false;
    }
  });
  return h("div", { class: "fa-card" }, [btn, msg]);
}

function markDirty() { dirty = true; }

// ── Category list ─────────────────────────────────────────────────────────────
function drawCategoryList() {
  container.appendChild(h("p", { class: "fa-section-title", text: "Kategorien" }));
  const total = totalWeight();
  state.outcomes.json.categories.forEach((cat, i) => {
    const pct = total > 0 ? ((cat.weight / total) * 100).toFixed(1) : "0";
    const item = h("div", { class: "fa-item", onclick: () => { view = { name: "category", categoryIndex: i }; draw(); } }, [
      h("h4", { text: `${cat.label} ` }),
      h("div", {}, [
        h("span", { class: "fa-pill", text: cat.tone }),
        h("span", { class: "fa-pill", text: `Gewicht ${cat.weight} · ${pct}%` }),
        h("span", { class: "fa-pill", text: `${(cat.outcomes || []).length} Outcomes` })
      ])
    ]);
    container.appendChild(item);
  });
  container.appendChild(commitBar());
}

// ── Category detail ───────────────────────────────────────────────────────────
function drawCategory() {
  const cat = state.outcomes.json.categories[view.categoryIndex];
  container.appendChild(h("div", { class: "fa-row", style: "margin-top:8px" }, [
    h("button", { class: "fa-btn ghost sm", text: "← Kategorien", onclick: () => { view = { name: "list" }; draw(); } })
  ]));

  const labelEl = textInput(cat.label);
  const weightEl = textInput(String(cat.weight), { inputmode: "numeric" });
  const toneEl = select(cat.tone, KNOWN_TONES);
  labelEl.addEventListener("input", () => { cat.label = labelEl.value; markDirty(); });
  weightEl.addEventListener("input", () => { const n = parseInt(weightEl.value, 10); cat.weight = Number.isFinite(n) ? n : cat.weight; markDirty(); });
  toneEl.addEventListener("change", () => { cat.tone = toneEl.value; markDirty(); });

  container.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: `Kategorie: ${cat.id}` }),
    field("Label", labelEl),
    h("div", { class: "fa-two" }, [field("Gewicht", weightEl), field("Tone", toneEl)])
  ]));

  container.appendChild(h("p", { class: "fa-section-title", text: "Outcomes" }));
  (cat.outcomes || []).forEach((o, oi) => {
    container.appendChild(h("div", { class: "fa-item", onclick: () => { view = { name: "outcome", categoryIndex: view.categoryIndex, outcomeIndex: oi }; draw(); } }, [
      h("h4", { text: o.title || "(ohne Titel)" }),
      h("p", { text: o.message || "" })
    ]));
  });

  container.appendChild(h("button", {
    class: "fa-btn gold", style: "margin-top:8px", text: "+ Outcome hinzufügen",
    onclick: () => {
      cat.outcomes.push({ title: "", message: "" });
      markDirty();
      view = { name: "outcome", categoryIndex: view.categoryIndex, outcomeIndex: cat.outcomes.length - 1 };
      draw();
    }
  }));
  container.appendChild(commitBar());
}

// ── Single outcome ────────────────────────────────────────────────────────────
function drawOutcome() {
  const cat = state.outcomes.json.categories[view.categoryIndex];
  const outcome = cat.outcomes[view.outcomeIndex];
  container.appendChild(h("div", { class: "fa-row", style: "margin-top:8px" }, [
    h("button", { class: "fa-btn ghost sm", text: `← ${cat.label}`, onclick: () => { view = { name: "category", categoryIndex: view.categoryIndex }; draw(); } })
  ]));

  const { wrap, read } = buildOutcomeForm(outcome, { special: false });
  const msg = h("p", { class: "fa-status", hidden: true });

  const save = h("button", { class: "fa-btn primary", text: "Übernehmen" });
  save.addEventListener("click", () => {
    const next = read();
    if (!next.title || !next.message) { status(msg, "Titel und Nachricht sind erforderlich.", "err"); return; }
    cat.outcomes[view.outcomeIndex] = next;
    markDirty();
    view = { name: "category", categoryIndex: view.categoryIndex };
    draw();
  });

  const del = h("button", { class: "fa-btn danger", text: "Löschen" });
  del.addEventListener("click", () => {
    if (!confirmDialog("Dieses Outcome löschen?")) return;
    cat.outcomes.splice(view.outcomeIndex, 1);
    markDirty();
    view = { name: "category", categoryIndex: view.categoryIndex };
    draw();
  });

  container.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "Outcome bearbeiten" }),
    wrap,
    msg,
    h("div", { class: "fa-row wrap", style: "margin-top:10px" }, [save, del])
  ]));
  container.appendChild(h("p", { class: "fa-muted", style: "font-size:.78rem", text: "Hinweis: „Übernehmen“ ändert nur lokal. Erst „committen“ schreibt nach GitHub." }));
}
