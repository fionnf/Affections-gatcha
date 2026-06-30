// Shared editor for a single outcome object. Used by both the outcomes editor
// and the special-days editor (which enables extra pin/link fields).
import { h, field, textInput, textArea, checkbox } from "./ui.js";

// Builds a form fragment + a read() that returns a cleaned outcome object.
// opts.special => include pin/pinHint/pinMessage/linkPin/linkPinFrom fields.
export function buildOutcomeForm(outcome = {}, opts = {}) {
  const titleEl = textInput(outcome.title || "", { maxlength: 120 });
  const messageEl = textArea(outcome.message || "");
  const promptEl = textArea(outcome.prompt || "", { placeholder: "Optional: Frage, die vor dem Aufdecken beantwortet werden muss" });
  const linkEl = textInput(outcome.link || "", { placeholder: "https://…", inputmode: "url" });
  const tokenEl = textInput(outcome.token || "", { placeholder: "🌿 / 🔥 / ⭐", maxlength: 4 });
  const voucherEl = checkbox("Gutschein (voucher)", !!outcome.voucher);

  const fields = [
    field("Titel", titleEl),
    field("Nachricht", messageEl),
    field("Prompt (optional)", promptEl),
    h("div", { class: "fa-two" }, [
      field("Link (optional)", linkEl),
      field("Sammel-Token (optional)", tokenEl)
    ]),
    voucherEl
  ];

  let pinEl, pinHintEl, pinMessageEl, linkPinEl, linkPinFromEl;
  if (opts.special) {
    pinEl = textInput(outcome.pin || "", { placeholder: "z.B. 0065", inputmode: "numeric" });
    pinHintEl = textInput(outcome.pinHint || "");
    pinMessageEl = textArea(outcome.pinMessage || "");
    linkPinEl = textInput(outcome.linkPin || "", { placeholder: "z.B. lis", maxlength: 12 });
    linkPinFromEl = textInput(outcome.linkPinFrom || "", { placeholder: "HH:MM" });
    fields.push(
      h("p", { class: "fa-section-title", text: "PIN / Link-Gate (optional)" }),
      field("PIN", pinEl),
      field("PIN-Hinweis", pinHintEl),
      field("PIN-Nachricht (nach Entsperren)", pinMessageEl),
      h("div", { class: "fa-two" }, [
        field("Link-PIN", linkPinEl),
        field("Link-PIN ab (HH:MM)", linkPinFromEl)
      ])
    );
  }

  const wrap = h("div", {}, fields);

  function read() {
    const out = {
      title: titleEl.value.trim(),
      message: messageEl.value.trim()
    };
    if (promptEl.value.trim()) out.prompt = promptEl.value.trim();
    if (voucherEl.input.checked) out.voucher = true;
    if (linkEl.value.trim()) out.link = linkEl.value.trim();
    if (tokenEl.value.trim()) out.token = tokenEl.value.trim();
    if (opts.special) {
      if (pinEl.value.trim()) out.pin = pinEl.value.trim();
      if (pinHintEl.value.trim()) out.pinHint = pinHintEl.value.trim();
      if (pinMessageEl.value.trim()) out.pinMessage = pinMessageEl.value.trim();
      if (linkPinEl.value.trim()) out.linkPin = linkPinEl.value.trim();
      if (linkPinFromEl.value.trim()) out.linkPinFrom = linkPinFromEl.value.trim();
    }
    return out;
  }

  return { wrap, read };
}
