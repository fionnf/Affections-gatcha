// Special-days editor: browse days → outcomes, edit/add/delete, commit to GitHub.
import { state } from "./state.js";
import { h, field, textInput, textArea, select, checkbox, status, confirmDialog } from "./ui.js";
import { buildOutcomeForm } from "./outcome-form.js";
import { KNOWN_TONES, COLOR_KEYS, SPECIAL_PATH } from "./constants.js";
import { getFile, putFile, hasToken } from "./github.js";
import { validateSpecialDays } from "./validate.js";

let container = null;
let dirty = false;
let view = { name: "list", dayIndex: null, outcomeIndex: null };

export async function renderSpecial(mount) {
  container = mount;
  container.innerHTML = "";
  if (!hasToken()) {
    container.appendChild(h("div", { class: "fa-card" }, [
      h("h3", { text: "Kein GitHub-Token" }),
      h("p", { class: "fa-muted", text: "Hinterlege zuerst einen GitHub-Token im Tab „Einstellungen“." })
    ]));
    return;
  }
  if (!state.special) {
    container.appendChild(h("p", { class: "fa-muted", text: "Lade special-days.json…" }));
    try {
      state.special = await getFile(SPECIAL_PATH);
      if (!state.special.json.days) state.special.json.days = [];
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
  if (view.name === "list") drawList();
  else if (view.name === "day") drawDay();
  else if (view.name === "outcome") drawOutcome();
}

function markDirty() { dirty = true; }

function commitBar() {
  const msg = h("p", { class: "fa-status", hidden: true });
  const btn = h("button", { class: "fa-btn primary", disabled: !dirty, text: dirty ? "Änderungen committen" : "Keine Änderungen" });
  btn.addEventListener("click", async () => {
    const { errors, warnings } = validateSpecialDays(state.special.json);
    if (errors.length) { status(msg, "Validierung fehlgeschlagen:\n• " + errors.join("\n• "), "err"); return; }
    btn.disabled = true;
    status(msg, "Committe…", "pending");
    try {
      const newSha = await putFile(SPECIAL_PATH, state.special.json, state.special.sha, "chore(admin): update special-days.json");
      state.special.sha = newSha;
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

// ── Day list ──────────────────────────────────────────────────────────────────
function drawList() {
  container.appendChild(h("p", { class: "fa-section-title", text: "Special Days" }));
  state.special.json.days.forEach((day, i) => {
    container.appendChild(h("div", { class: "fa-item", onclick: () => { view = { name: "day", dayIndex: i }; draw(); } }, [
      h("h4", { text: `${day.label || "(ohne Label)"}` }),
      h("div", {}, [
        h("span", { class: "fa-pill", text: day.date || "??" }),
        day.tone ? h("span", { class: "fa-pill", text: day.tone }) : null,
        h("span", { class: "fa-pill", text: `${(day.outcomes || []).length} Outcomes` })
      ])
    ]));
  });
  container.appendChild(h("button", {
    class: "fa-btn gold", style: "margin-top:8px", text: "+ Special Day hinzufügen",
    onclick: () => {
      state.special.json.days.push({ date: "", label: "", tone: "warm", outcomes: [{ title: "", message: "" }] });
      markDirty();
      view = { name: "day", dayIndex: state.special.json.days.length - 1 };
      draw();
    }
  }));
  container.appendChild(commitBar());
}

// ── Day detail ────────────────────────────────────────────────────────────────
function drawDay() {
  const day = state.special.json.days[view.dayIndex];
  container.appendChild(h("div", { class: "fa-row", style: "margin-top:8px" }, [
    h("button", { class: "fa-btn ghost sm", text: "← Special Days", onclick: () => { view = { name: "list" }; draw(); } })
  ]));

  const dateEl = textInput(day.date || "", { placeholder: "MM-DD oder YYYY-MM-DD" });
  const labelEl = textInput(day.label || "");
  const toneEl = select(day.tone || "warm", KNOWN_TONES);
  const unlockEl = textInput(day.unlockTime || "", { placeholder: "HH:MM" });
  const photoAltEl = textInput(day.photoAlt || "", { placeholder: "z.B. Erinnerung 131" });
  const confettiEl = checkbox("Konfetti deaktivieren", day.confetti === false);

  dateEl.addEventListener("input", () => { day.date = dateEl.value.trim(); markDirty(); });
  labelEl.addEventListener("input", () => { day.label = labelEl.value; markDirty(); });
  toneEl.addEventListener("change", () => { day.tone = toneEl.value; markDirty(); });
  unlockEl.addEventListener("input", () => { const v = unlockEl.value.trim(); if (v) day.unlockTime = v; else delete day.unlockTime; markDirty(); });
  photoAltEl.addEventListener("input", () => { const v = photoAltEl.value.trim(); if (v) day.photoAlt = v; else delete day.photoAlt; markDirty(); });
  confettiEl.input.addEventListener("change", () => { if (confettiEl.input.checked) day.confetti = false; else delete day.confetti; markDirty(); });

  container.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "Tag" }),
    h("div", { class: "fa-two" }, [field("Datum", dateEl), field("Tone", toneEl)]),
    field("Label", labelEl),
    h("div", { class: "fa-two" }, [field("Freischalt-Zeit (optional)", unlockEl), field("Foto-Alt (optional)", photoAltEl)]),
    confettiEl
  ]));

  // Color overrides
  container.appendChild(buildColorCard("Farben (Light, optional)", day, "colors"));
  container.appendChild(buildColorCard("Farben (Dark, optional)", day, "darkColors"));

  // Outcomes
  container.appendChild(h("p", { class: "fa-section-title", text: "Outcomes" }));
  (day.outcomes || []).forEach((o, oi) => {
    container.appendChild(h("div", { class: "fa-item", onclick: () => { view = { name: "outcome", dayIndex: view.dayIndex, outcomeIndex: oi }; draw(); } }, [
      h("h4", { text: o.title || "(ohne Titel)" }),
      h("p", { text: o.message || "" })
    ]));
  });
  container.appendChild(h("button", {
    class: "fa-btn gold", style: "margin-top:8px", text: "+ Outcome hinzufügen",
    onclick: () => {
      if (!day.outcomes) day.outcomes = [];
      day.outcomes.push({ title: "", message: "" });
      markDirty();
      view = { name: "outcome", dayIndex: view.dayIndex, outcomeIndex: day.outcomes.length - 1 };
      draw();
    }
  }));

  const del = h("button", { class: "fa-btn danger", style: "margin-top:14px", text: "Diesen Tag löschen" });
  del.addEventListener("click", () => {
    if (!confirmDialog("Diesen Special Day löschen?")) return;
    state.special.json.days.splice(view.dayIndex, 1);
    markDirty();
    view = { name: "list" };
    draw();
  });
  container.appendChild(del);
  container.appendChild(commitBar());
}

function buildColorCard(title, day, key) {
  const enabled = !!day[key];
  const toggle = checkbox(title, enabled);
  const body = h("div", { hidden: !enabled });
  const colors = day[key] || {};
  const inputs = {};
  COLOR_KEYS.forEach((ck) => {
    const inp = textInput(colors[ck] || "", { placeholder: "#rrggbb" });
    inp.addEventListener("input", () => {
      if (!day[key]) day[key] = {};
      const v = inp.value.trim();
      if (v) day[key][ck] = v; else delete day[key][ck];
      markDirty();
    });
    inputs[ck] = inp;
    body.appendChild(field(ck, inp));
  });
  toggle.input.addEventListener("change", () => {
    if (toggle.input.checked) { if (!day[key]) day[key] = {}; body.hidden = false; }
    else { delete day[key]; body.hidden = true; }
    markDirty();
  });
  return h("div", { class: "fa-card" }, [toggle, body]);
}

// ── Single outcome (special fields enabled) ───────────────────────────────────
function drawOutcome() {
  const day = state.special.json.days[view.dayIndex];
  const outcome = day.outcomes[view.outcomeIndex];
  container.appendChild(h("div", { class: "fa-row", style: "margin-top:8px" }, [
    h("button", { class: "fa-btn ghost sm", text: `← ${day.label || day.date}`, onclick: () => { view = { name: "day", dayIndex: view.dayIndex }; draw(); } })
  ]));

  const { wrap, read } = buildOutcomeForm(outcome, { special: true });
  const msg = h("p", { class: "fa-status", hidden: true });

  const save = h("button", { class: "fa-btn primary", text: "Übernehmen" });
  save.addEventListener("click", () => {
    const next = read();
    if (!next.title || !next.message) { status(msg, "Titel und Nachricht sind erforderlich.", "err"); return; }
    day.outcomes[view.outcomeIndex] = next;
    markDirty();
    view = { name: "day", dayIndex: view.dayIndex };
    draw();
  });

  const del = h("button", { class: "fa-btn danger", text: "Löschen" });
  del.addEventListener("click", () => {
    if (!confirmDialog("Dieses Outcome löschen?")) return;
    day.outcomes.splice(view.outcomeIndex, 1);
    markDirty();
    view = { name: "day", dayIndex: view.dayIndex };
    draw();
  });

  container.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "Outcome bearbeiten" }),
    wrap,
    msg,
    h("div", { class: "fa-row wrap", style: "margin-top:10px" }, [save, del])
  ]));
}
