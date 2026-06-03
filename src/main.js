// ── Entry point ───────────────────────────────────────────────────────────────
import { setMount } from "./state.js";
import { initSync } from "./sync.js";
import { init } from "./init.js";
import { renderError } from "./events.js";

// Capture script attributes before any async work
const script = document.currentScript;
const mountSelector = script?.dataset.mount || "#affektions-gacha";
const baseUrl = script?.dataset.configBase || "";

function createMount() {
  const el = document.createElement("section");
  el.id = "affektions-gacha";
  document.body.appendChild(el);
  return el;
}

const mountEl = document.querySelector(mountSelector) || createMount();
setMount(mountEl);

initSync(baseUrl, null);

init().catch((e) => renderError(e));
