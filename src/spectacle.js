// ── Reveal spectacle ─────────────────────────────────────────────────────────
// Everything that happens on screen in the second the capsule opens, beyond
// the card itself: the machine rumbles in the last moments of the fall, two
// shockwave rings burst from the capsule, the whole viewport flashes in the
// tone's colour (a camera shutter for a Foto-Drop, a double gold flash for a
// JACKPOT), and a burst of particles in the tone's palette. All of it is
// decoration: every element removes itself, nothing here touches state, and
// reduced-motion turns the lot into a single soft flash.
import { mount } from "./state.js";
import { triggerConfetti } from "./confetti.js";

const TONE_FX = {
  jackpot:  { flash: "rgba(255,215,120,.92)", double: true,  particles: 140, palette: ["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"], rumble: "hard" },
  special:  { flash: "rgba(255,240,200,.9)",  double: true,  particles: 150, palette: ["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"], rumble: "hard" },
  rare:     { flash: "rgba(190,140,255,.85)", double: false, particles: 90,  palette: ["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"], rumble: "hard" },
  uncommon: { flash: "rgba(120,220,220,.7)",  double: false, particles: 60,  palette: ["#7fd6d6","#b7e5c2","#fff","#8fcf9e"], rumble: "soft" },
  quest:    { flash: "rgba(120,180,255,.7)",  double: false, particles: 55,  palette: ["#8ab8cf","#4dabf7","#dceaf3","#fff"], rumble: "soft" },
  photo:    { flash: "rgba(255,255,255,.96)", double: false, particles: 40,  palette: ["#fff","#dfeedb","#8fcf9e"], rumble: "soft", shutter: true },
  warm:     { flash: "rgba(255,200,120,.6)",  double: false, particles: 50,  palette: ["#e0a75d","#ffe0b3","#8fcf9e","#fff"], rumble: "soft" },
  soft:     { flash: "rgba(143,207,158,.55)", double: false, particles: 36,  palette: ["#8fcf9e","#b7e5c2","#dfeedb"], rumble: "soft" },
  cursed:   { flash: "rgba(200,40,40,.7)",    double: true,  particles: 30,  palette: ["#5a0f0f","#a02020","#2b1a1a","#000"], rumble: "hard" },
  quiet:    { flash: "rgba(120,130,120,.35)", double: false, particles: 10,  palette: ["#6b7a6b","#9faf9a"], rumble: "none" }
};

function reducedMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_e) { return false; }
}

// Called before the fall ends: the last ~900 ms of the reveal delay shake the
// machine. stopRumble() is the reveal's job.
export function startRumble(tone) {
  if (reducedMotion()) return;
  const fx = TONE_FX[tone] || TONE_FX.soft;
  if (fx.rumble === "none") return;
  mount.classList.add("is-rumbling");
  if (fx.rumble === "hard") mount.classList.add("is-rumbling-hard");
}

export function stopRumble() {
  mount.classList.remove("is-rumbling", "is-rumbling-hard");
}

function flash(color, delay = 0) {
  const el = document.createElement("div");
  el.className = "ag-flash";
  el.style.setProperty("--ag-flash-color", color);
  el.style.animationDelay = delay + "ms";
  document.body.appendChild(el);
  el.addEventListener("animationend", () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 1600 + delay);
}

function shockwave(delay = 0) {
  const wrap = mount.querySelector(".ag-machine-wrap");
  if (!wrap) return;
  const ring = document.createElement("div");
  ring.className = "ag-shockwave";
  ring.style.animationDelay = delay + "ms";
  wrap.appendChild(ring);
  ring.addEventListener("animationend", () => ring.remove(), { once: true });
  setTimeout(() => ring.remove(), 1400 + delay);
}

export function playRevealSpectacle(tone) {
  const fx = TONE_FX[tone] || TONE_FX.soft;
  if (reducedMotion()) { flash(fx.flash); return; }
  shockwave(0);
  shockwave(160);
  flash(fx.flash);
  if (fx.double) flash(fx.flash, 260);
  if (fx.shutter) mount.classList.add("is-shutter");
  setTimeout(() => mount.classList.remove("is-shutter"), 700);
  try { triggerConfetti(fx.particles, fx.palette); } catch (_e) {}
}
