// Tiny DOM helpers.
export function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k in el && k !== "list") { try { el[k] = v; } catch { el.setAttribute(k, v); } }
    else el.setAttribute(k, v);
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return el;
}

export function field(labelText, inputEl) {
  return h("label", { class: "fa-field" }, [
    h("span", { text: labelText, style: "display:block;font-size:.78rem;color:var(--muted);margin-bottom:4px" }),
    inputEl
  ]);
}

export function textInput(value = "", attrs = {}) {
  return h("input", { class: "fa-input", type: "text", value: value ?? "", ...attrs });
}
export function textArea(value = "", attrs = {}) {
  return h("textarea", { class: "fa-textarea", ...attrs }, [value ?? ""]);
}
export function select(value, options, attrs = {}) {
  const sel = h("select", { class: "fa-select", ...attrs });
  for (const opt of options) {
    const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
    sel.appendChild(h("option", { value: o.value, selected: o.value === value, text: o.label }));
  }
  return sel;
}
export function checkbox(labelText, checked = false, attrs = {}) {
  const input = h("input", { type: "checkbox", checked: !!checked, ...attrs });
  const wrap = h("label", { class: "fa-checkbox" }, [input, h("span", { text: labelText })]);
  wrap.input = input;
  return wrap;
}

export function status(el, text, kind) {
  if (!el) return;
  if (!text) { el.hidden = true; el.textContent = ""; return; }
  el.hidden = false;
  el.className = `fa-status ${kind || ""}`;
  el.textContent = text;
}

export function confirmDialog(message) {
  return window.confirm(message);
}
