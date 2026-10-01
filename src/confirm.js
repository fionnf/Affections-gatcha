// ── Two-tap confirm ──────────────────────────────────────────────────────────
// window.confirm() is suppressed in an installed home-screen app on iOS: it
// returns false at once, and the button looks dead (the lights page's reboot
// button taught us that). So a destructive or one-way tap arms the button
// instead — it turns into a question for a few seconds — and the second tap
// does it. Returns true on the confirming tap, false while arming. The
// button's own content is restored when the window passes.
const armed = new WeakMap();
export const ARM_MS = 4000;

export function armConfirm(btn, label = "Sicher? Nochmal tippen", ms = ARM_MS) {
  if (!btn) return true;
  const rec = armed.get(btn);
  if (rec) {
    clearTimeout(rec.timer);
    armed.delete(btn);
    btn.classList.remove("is-armed");
    btn.innerHTML = rec.html;
    return true;
  }
  const html = btn.innerHTML;
  btn.classList.add("is-armed");
  btn.textContent = label;
  const timer = setTimeout(() => {
    armed.delete(btn);
    btn.classList.remove("is-armed");
    btn.innerHTML = html;
  }, ms);
  armed.set(btn, { timer, html });
  return false;
}

export function disarm(btn) {
  const rec = btn && armed.get(btn);
  if (!rec) return;
  clearTimeout(rec.timer);
  armed.delete(btn);
  btn.classList.remove("is-armed");
  btn.innerHTML = rec.html;
}
