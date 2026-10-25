// Gate for the Eingänge.
//
// The PIN used to be the whole lock: a salted SHA-256 in config/admin.json,
// compared in the browser. That hash is public, four digits fall to it in a
// blink, and the backend answered anyone anyway — so it locked the page, not
// the data. Now the backend holds the lock: with ADMIN_KEY set in its Script
// Properties, the feed and every Fionn-only action need that key, and this
// gate asks for it once and keeps it on the device. A backend without a key
// still gets the old PIN check, so the page keeps working through the switch.
import { state } from "./state.js";
import { SESSION_KEY } from "./constants.js";

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// { key } once the backend has confirmed it, { pin: true } for the old gate.
// The old session format stored the public PIN hash itself, which anyone
// could write into localStorage by hand; it is still read so nobody is
// logged out by the update, but it counts as a PIN session only.
function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    if (raw === state.admin?.pinHash) return { pin: true };
    const s = JSON.parse(raw);
    return s && typeof s === "object" ? s : null;
  } catch { return null; }
}

export function hasSession() {
  return !!readSession();
}

export function adminKey() {
  const s = readSession();
  return (s && typeof s.key === "string") ? s.key : "";
}

export function clearSession() {
  try { window.localStorage.removeItem(SESSION_KEY); } catch {}
}

async function checkPin(pin) {
  const salt = state.admin?.salt || "";
  const hash = await sha256Hex(`${salt}:${pin}`);
  return hash === state.admin?.pinHash;
}

// Asks the backend whether it wants a key and whether this is it. null when
// the backend can't be reached (offline, no endpoint, an older deployment
// without the whoami feed).
async function whoami(key) {
  const url = state.backup && state.backup.enabled && typeof state.backup.endpointUrl === "string" ? state.backup.endpointUrl.trim() : "";
  if (!url) return null;
  try {
    const res = await fetch(`${url}?feed=whoami&key=${encodeURIComponent(key)}`, { cache: "no-store" });
    const data = await res.json();
    return data && data.ok && typeof data.keyConfigured === "boolean" ? data : null;
  } catch { return null; }
}

// Renders the gate into `mount`. Resolves when the PIN or key is accepted.
export function renderGate(mount, note = "") {
  return new Promise((resolve) => {
    mount.innerHTML = `
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">Schlüssel eingeben</p>
        <input class="fa-input fa-pin" type="password" autocomplete="current-password"
               autocapitalize="off" spellcheck="false" data-pin maxlength="200" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;
    const input = mount.querySelector("[data-pin]");
    const go = mount.querySelector("[data-go]");
    const msg = mount.querySelector("[data-msg]");
    if (note) { msg.hidden = false; msg.textContent = note; }
    input.focus();

    function fail(text) {
      go.disabled = false;
      msg.hidden = false;
      msg.textContent = text;
      input.value = "";
      input.focus();
    }

    async function attempt() {
      const value = input.value.trim();
      if (!value) return;
      go.disabled = true;
      const who = await whoami(value);
      if (who && who.keyConfigured) {
        if (!who.admin) return fail("Falscher Schlüssel.");
        try { window.localStorage.setItem(SESSION_KEY, JSON.stringify({ key: value })); } catch {}
        resolve();
        return;
      }
      // No key on the backend (or it can't be reached): the old PIN gate.
      if (await checkPin(value)) {
        try { window.localStorage.setItem(SESSION_KEY, JSON.stringify({ pin: true })); } catch {}
        resolve();
        return;
      }
      fail(who ? "Falscher PIN." : "Falscher PIN — oder keine Verbindung.");
    }
    go.addEventListener("click", attempt);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); });
  });
}
