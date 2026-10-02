// ── Small delights ───────────────────────────────────────────────────────────
// Geheimtinte (a message that appears under the thumb), the night fireflies
// that drop a word, the coin that falls into the machine when a reward is
// redeemed, the envelope that flies into Verlauf when he leaves the card,
// and the long-press that lifts a word out of a capsule into the Glossar.
// Decoration and tiny mechanics only; nothing here is load-bearing.
import { state, mount, $ } from "./state.js";
import { showToast } from "./toast.js";
import { haptic } from "./haptic.js";
import { playClink } from "./sound.js";

function reducedMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_e) { return false; }
}

// ── Geheimtinte ──────────────────────────────────────────────────────────────
// Every character becomes a span with its own delay; the message element gets
// is-held while a pointer rests on it and the letters come up one by one.
// Lifting the finger lets them fade again. The text itself is untouched —
// Kopieren and the share still carry it.
export function setupInk(msgEl, secret) {
  if (!msgEl) return;
  const hint = msgEl.parentNode && msgEl.parentNode.querySelector("[data-ag-ink-hint]");
  if (!secret) {
    msgEl.classList.remove("ag-ink", "is-held");
    if (hint) hint.hidden = true;
    return;
  }
  msgEl.classList.add("ag-ink");
  msgEl.classList.remove("is-held");
  let i = 0;
  const walker = document.createTreeWalker(msgEl, 4 /* NodeFilter.SHOW_TEXT */);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const ch of node.nodeValue) {
      const s = document.createElement("span");
      s.className = "ag-ink-ch";
      s.textContent = ch;
      s.style.setProperty("--i", String(i++));
      frag.appendChild(s);
    }
    node.parentNode.replaceChild(frag, node);
  }
  let hintEl = hint;
  if (!hintEl) {
    hintEl = document.createElement("p");
    hintEl.className = "ag-ink-hint";
    hintEl.setAttribute("data-ag-ink-hint", "");
    msgEl.parentNode.insertBefore(hintEl, msgEl);
  }
  hintEl.hidden = false;
  hintEl.textContent = "🫥 Geheimtinte — Finger auf den Text legen";
  if (!msgEl.dataset.inkBound) {
    msgEl.dataset.inkBound = "1";
    const hold = () => { if (msgEl.classList.contains("ag-ink")) { msgEl.classList.add("is-held"); haptic(6); } };
    const release = () => msgEl.classList.remove("is-held");
    msgEl.addEventListener("pointerdown", hold);
    msgEl.addEventListener("pointerup", release);
    msgEl.addEventListener("pointercancel", release);
    msgEl.addEventListener("pointerleave", release);
  }
}

// ── Nachtlicht ───────────────────────────────────────────────────────────────
export const NACHT_WORTE = [
  "Lieblingsmensch", "Sternschnuppe", "Heimathafen", "Gleichklang", "Morgenlicht",
  "Fernweh", "Herzklopfen", "Nachtfalter", "Kuschelwetter", "Augenblick",
  "Geborgenheit", "Sommersprosse", "Lichtblick", "Zuhause", "Wegbegleiter",
  "Glühwürmchen", "Nähe", "Du", "Nachtschwärmer", "Sanft", "Wir"
];
export function nachtWort(seed = Math.random()) {
  return NACHT_WORTE[Math.floor(seed * NACHT_WORTE.length) % NACHT_WORTE.length];
}
export function bindFirefly(span) {
  span.addEventListener("click", () => {
    if (!mount || !mount.classList.contains("is-evening")) return;
    span.classList.add("is-flare");
    setTimeout(() => span.classList.remove("is-flare"), 900);
    haptic(6);
    showToast(`✨ ${nachtWort()}`);
  });
}

// ── Münzschlitz ──────────────────────────────────────────────────────────────
// The reward is redeemed on the Verlauf tab, where the machine is out of
// sight — so the coin flies into the Heute icon in the nav, which is the
// machine's stand-in, and the icon gives a little bounce on the clink.
export function dropCoin(emoji, fromEl) {
  if (!mount) return;
  const icon = mount.querySelector('.ag-bottomnav-btn[data-ag-tab="today"] .ag-bottomnav-btn-icon');
  if (!fromEl || !icon || reducedMotion()) { playClink(); return; }
  const a = fromEl.getBoundingClientRect();
  const b = icon.getBoundingClientRect();
  const coin = document.createElement("div");
  coin.className = "ag-coin";
  coin.textContent = emoji;
  coin.style.left = `${a.left + a.width / 2}px`;
  coin.style.top = `${a.top + a.height / 2}px`;
  document.body.appendChild(coin);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const anim = coin.animate([
    { transform: "translate(-50%,-50%) scale(1) rotateY(0deg)", opacity: 1 },
    { transform: `translate(calc(-50% + ${(dx * 0.45).toFixed(0)}px), calc(-50% + ${(dy * 0.35 - 110).toFixed(0)}px)) scale(1.35) rotateY(200deg)`, opacity: 1, offset: 0.45 },
    { transform: `translate(calc(-50% + ${dx.toFixed(0)}px), calc(-50% + ${dy.toFixed(0)}px)) scale(0.25) rotateY(560deg)`, opacity: 0.15 }
  ], { duration: 950, easing: "cubic-bezier(.35,.7,.35,1)", fill: "forwards" });
  anim.onfinish = () => {
    coin.remove();
    icon.classList.add("is-clink");
    setTimeout(() => icon.classList.remove("is-clink"), 700);
    playClink();
    haptic([10, 50, 22]);
    import("./lightsFx.js").then((m) => m.flashLightsForPull("uncommon")).catch(() => {});
  };
}

// ── Zugeklappt ───────────────────────────────────────────────────────────────
// Leaving the Heute tab after a pull: the card folds into an envelope that
// flies into the Verlauf icon. Two hundred milliseconds that say where the
// day went. Once per capsule.
export function foldCardIntoVerlauf(pull) {
  if (!mount || !pull) return;
  if (state.foldedFor === pull.day) return;
  const card = $("[data-ag-result]");
  const icon = mount.querySelector('.ag-bottomnav-btn[data-ag-tab="history"] .ag-bottomnav-btn-icon');
  if (!card || card.hidden || !icon) return;
  state.foldedFor = pull.day;
  if (reducedMotion()) return;
  const a = card.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  // Start where the card is; if it is off screen, from the middle.
  const sx = a.left + a.width / 2;
  const sy = a.bottom < 0 || a.top > vh ? vh / 2 : Math.max(60, Math.min(vh - 60, a.top + Math.min(a.height, vh) / 2));
  const b = icon.getBoundingClientRect();
  const env = document.createElement("div");
  env.className = "ag-envelope";
  env.textContent = "✉️";
  env.style.left = `${sx}px`;
  env.style.top = `${sy}px`;
  document.body.appendChild(env);
  const dx = b.left + b.width / 2 - sx;
  const dy = b.top + b.height / 2 - sy;
  const anim = env.animate([
    { transform: "translate(-50%,-50%) scale(2.2)", opacity: 0 },
    { transform: "translate(-50%,-50%) scale(1.4)", opacity: 1, offset: 0.25 },
    { transform: `translate(calc(-50% + ${dx.toFixed(0)}px), calc(-50% + ${dy.toFixed(0)}px)) scale(0.3)`, opacity: 0.2 }
  ], { duration: 720, easing: "cubic-bezier(.4,.6,.3,1)", fill: "forwards" });
  anim.onfinish = () => {
    env.remove();
    icon.classList.add("is-clink");
    setTimeout(() => icon.classList.remove("is-clink"), 700);
    haptic(8);
  };
}

// ── Lieblingswort ────────────────────────────────────────────────────────────
// The word under a point in a text node, expanded to its boundaries.
const WORD_CHAR = /[\p{L}\p{M}’'-]/u;
export function wordAt(text, offset) {
  if (typeof text !== "string" || !text.length) return "";
  let s = Math.min(Math.max(offset, 0), text.length);
  let e = s;
  while (s > 0 && WORD_CHAR.test(text[s - 1])) s--;
  while (e < text.length && WORD_CHAR.test(text[e])) e++;
  return text.slice(s, e).replace(/^[-'’]+|[-'’]+$/g, "");
}
export function wordAtPoint(x, y) {
  let node = null, offset = 0;
  try {
    if (document.caretPositionFromPoint) {
      const p = document.caretPositionFromPoint(x, y);
      if (p) { node = p.offsetNode; offset = p.offset; }
    } else if (document.caretRangeFromPoint) {
      const r = document.caretRangeFromPoint(x, y);
      if (r) { node = r.startContainer; offset = r.startOffset; }
    }
  } catch (_e) { return ""; }
  if (!node || node.nodeType !== 3) return "";
  return wordAt(node.nodeValue, offset);
}
// Long-press on the message: 650 ms still, then the word is lifted out.
export function bindWordSave(msgEl, onWord) {
  if (!msgEl || msgEl.dataset.wordBound) return;
  msgEl.dataset.wordBound = "1";
  let timer = null, sx = 0, sy = 0;
  const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };
  msgEl.addEventListener("pointerdown", (e) => {
    if (msgEl.classList.contains("ag-ink")) return;   // the hold reveals there
    sx = e.clientX; sy = e.clientY;
    cancel();
    timer = setTimeout(() => {
      timer = null;
      const word = wordAtPoint(sx, sy);
      if (word && word.length >= 3) onWord(word);
    }, 650);
  });
  msgEl.addEventListener("pointermove", (e) => { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) cancel(); });
  msgEl.addEventListener("pointerup", cancel);
  msgEl.addEventListener("pointercancel", cancel);
  msgEl.addEventListener("pointerleave", cancel);
  msgEl.addEventListener("contextmenu", (e) => { if (timer) e.preventDefault(); });
}
