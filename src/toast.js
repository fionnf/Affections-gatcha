// ── Toast ─────────────────────────────────────────────────────────────────────
// Lives on its own so any module can report an outcome without importing
// events.js, which imports most of them back.
import { mount } from "./state.js";

export function showToast(msg) {
  const container = mount.querySelector("[data-ag-toasts]");
  if (!container) return;
  const el = document.createElement("div");
  el.className = "ag-toast";
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 300);
  }, 2400);
}
