// PIN gate for the admin app. Light protection: a salted SHA-256 of the PIN is
// stored in config/admin.json; we compare client-side and remember the session.
import { state } from "./state.js";
import { SESSION_KEY } from "./constants.js";

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function hasSession() {
  try {
    const v = window.localStorage.getItem(SESSION_KEY);
    return v && v === state.admin.pinHash;
  } catch { return false; }
}

async function checkPin(pin) {
  const salt = state.admin.salt || "";
  const hash = await sha256Hex(`${salt}:${pin}`);
  return hash === state.admin.pinHash;
}

// Renders the gate into `mount`. Resolves when the correct PIN is entered.
export function renderGate(mount) {
  return new Promise((resolve) => {
    mount.innerHTML = `
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">PIN eingeben</p>
        <input class="fa-input fa-pin" type="password" inputmode="numeric"
               autocomplete="off" data-pin maxlength="12" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;
    const input = mount.querySelector("[data-pin]");
    const go = mount.querySelector("[data-go]");
    const msg = mount.querySelector("[data-msg]");
    input.focus();

    async function attempt() {
      const pin = input.value.trim();
      if (!pin) return;
      go.disabled = true;
      const ok = await checkPin(pin);
      if (ok) {
        try { window.localStorage.setItem(SESSION_KEY, state.admin.pinHash); } catch {}
        resolve();
        return;
      }
      go.disabled = false;
      msg.hidden = false;
      msg.textContent = "Falscher PIN.";
      input.value = "";
      input.focus();
    }
    go.addEventListener("click", attempt);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); });
  });
}
