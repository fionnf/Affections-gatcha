// ── Geheimfach ───────────────────────────────────────────────────────────────
// A long press on the coin slot opens a hidden drawer under the machine.
// Inside is one note from Fionn, set in config/theme.json under
// "geheimfach": { "id": "...", "text": "..." }. Once read, the drawer is
// empty until Fionn puts in a note with a new id.
import { haptic } from "./haptic.js";
import { playClink } from "./sound.js";

const KEY = "affektions-gacha:geheimfach:read";
export const HOLD_MS = 700;

export function readFachId() {
  try { return window.localStorage.getItem(KEY) || ""; } catch (_e) { return ""; }
}
export function markFachRead(id) {
  try { window.localStorage.setItem(KEY, String(id || "")); } catch (_e) {}
}

// What the drawer holds right now: the note, or nothing.
export function fachContents(theme, readId = readFachId()) {
  const f = theme && theme.geheimfach;
  if (!f || typeof f !== "object") return { note: "", id: "", empty: true };
  const id = String(f.id || "");
  const text = String(f.text || "").trim();
  if (!id || !text || readId === id) return { note: "", id, empty: true };
  return { note: text, id, empty: false };
}

export function bindCoinSlot(slot, onOpen) {
  if (!slot) return;
  let timer = null;
  const cancel = () => { clearTimeout(timer); timer = null; slot.classList.remove("is-pressing"); };
  slot.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    slot.classList.add("is-pressing");
    timer = setTimeout(() => {
      cancel();
      haptic([10, 30, 20]);
      onOpen();
    }, HOLD_MS);
  });
  slot.addEventListener("pointerup", cancel);
  slot.addEventListener("pointercancel", cancel);
  slot.addEventListener("pointerleave", cancel);
  slot.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
  });
}

// Opens the drawer: fills it from the theme, slides it out.
export function openFach(drawer, theme) {
  if (!drawer) return;
  const { note, id, empty } = fachContents(theme);
  const text = drawer.querySelector("[data-ag-fach-text]");
  const keep = drawer.querySelector("[data-ag-fach-keep]");
  drawer.classList.toggle("is-empty", empty);
  if (text) text.textContent = empty ? "Leer. Fionn weiss, wo das Fach ist." : note;
  if (keep) {
    keep.hidden = empty;
    keep.onclick = () => {
      markFachRead(id);
      haptic(8);
      closeFach(drawer);
    };
  }
  drawer.hidden = false;
  // The machine wrap has its own stacking context (its drop shadow), so it
  // is lifted above the copy next to it while the drawer is out.
  drawer.closest(".ag-machine-wrap")?.classList.add("has-fach");
  requestAnimationFrame(() => drawer.classList.add("is-open"));
  playClink();
}

export function closeFach(drawer) {
  if (!drawer) return;
  drawer.classList.remove("is-open");
  setTimeout(() => {
    if (drawer.classList.contains("is-open")) return;
    drawer.hidden = true;
    drawer.closest(".ag-machine-wrap")?.classList.remove("has-fach");
  }, 420);
}
