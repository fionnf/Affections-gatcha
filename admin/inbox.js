// Inbox / activity feed: reads recent hugs, wishes, prompt answers and quest
// solves from the Apps Script backend (doGet must return an `activity` array),
// lets Fionn answer a wish, and sends a Stups back to Lennart's phone.
import { state } from "./state.js";
import { h } from "./ui.js";

const ICONS = { hug: "🫂", wish: "✨", voucher: "🎟️", answer: "💬", quest: "📸", ping: "📍" };

// The three answers a wish can get. The app shows the label on Lennart's
// next capsule, so these are his words, not admin vocabulary.
export const WISH_REPLIES = [
  { id: "erfuellt", label: "✓ erfüllt" },
  { id: "irgendwann", label: "🕰 irgendwann" },
  { id: "lieber-nicht", label: "✗ lieber nicht" }
];

function endpoint() {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled) return "";
  return typeof cfg.endpointUrl === "string" ? cfg.endpointUrl.trim() : "";
}

// POST to the Apps Script. Resolves with the parsed answer, or null when the
// request went out but could not be read (the no-cors fallback is opaque).
// Rejects only when nothing got through at all.
export async function postToBackend(payload) {
  const url = endpoint();
  if (!url) throw new Error("Kein Backend konfiguriert");
  const body = JSON.stringify(payload);
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  try {
    const res = await fetch(url, opts);
    try { return await res.json(); } catch { return null; }
  } catch {
    await fetch(url, { ...opts, mode: "no-cors" });
    return null;
  }
}

export function sendPing() {
  return postToBackend({ type: "ping", token: "fionn" });
}

export function setWishStatus(timestamp, status) {
  return postToBackend({ type: "wish-status", timestamp, status });
}

// Fetch the activity feed. Returns an array sorted newest-first (best-effort).
export async function fetchActivity() {
  const url = endpoint();
  if (!url) return [];
  const res = await fetch(`${url}?token=lennart&feed=activity`, { method: "GET", cache: "no-store" });
  if (!res.ok) throw new Error(`Feed (${res.status})`);
  const data = await res.json();
  const items = Array.isArray(data.activity) ? data.activity : [];
  items.sort((a, b) => tsOf(b) - tsOf(a));
  return items;
}

export function tsOf(item) {
  const t = item && (item.timestamp || item.ts || item.time);
  const n = t ? Date.parse(t) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function fmtWhen(item) {
  const n = tsOf(item);
  if (!n) return "";
  try {
    return new Intl.DateTimeFormat("de-CH", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "2-digit",
      hour: "2-digit", minute: "2-digit"
    }).format(new Date(n));
  } catch { return new Date(n).toLocaleString(); }
}

function labelFor(item) {
  switch (item.type) {
    case "hug": return "Notfall-Umarmung";
    case "wish": return "Wunsch";
    case "voucher": return "Gutschein eingelöst";
    case "answer": return "Prompt-Antwort";
    case "quest": return "Quest gelöst";
    default: return item.type || "Eintrag";
  }
}

function textFor(item) {
  if (item.type === "answer") {
    const q = item.prompt ? `Frage: ${item.prompt}\n` : "";
    return `${q}${item.answer || item.text || ""}`;
  }
  if (item.type === "quest") {
    return `${item.challenge || ""}${item.points ? ` · ${item.points} Punkte` : ""}`;
  }
  return item.message || item.wish || item.text || "";
}

export async function renderInbox(mount) {
  mount.innerHTML = "";
  mount.appendChild(h("p", { class: "fa-section-title", text: "Eingänge von Lennart" }));

  // The permission prompt used to live in the settings tab, which went away
  // with the GitHub editors. Without it the poll below can never announce
  // anything, so the offer belongs here now.
  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    const permBtn = h("button", { class: "fa-btn primary", text: "🔔 Benachrichtigungen aktivieren" });
    permBtn.addEventListener("click", async () => {
      permBtn.disabled = true;
      // Imported lazily: notify.js already imports this module, and a static
      // import back would make the pair circular.
      const { requestPermission } = await import("./notify.js");
      const result = await requestPermission();
      permBtn.textContent = result === "granted"
        ? "Benachrichtigungen aktiv ✓"
        : "Vom Browser abgelehnt";
    });
    mount.appendChild(permBtn);
  }

  // A Stups: one line on Lennart's card the next time he opens the app.
  if (endpoint()) {
    const pingNote = h("p", { class: "fa-muted fa-ping-note", text: "" });
    const pingBtn = h("button", { class: "fa-btn ghost", text: "👋 Lennart anstupsen" });
    pingBtn.addEventListener("click", async () => {
      pingBtn.disabled = true;
      pingNote.textContent = "Stups unterwegs…";
      try {
        const out = await sendPing();
        pingNote.textContent = out && out.ok === false
          ? "Das Script kennt den Stups noch nicht — neu deployen."
          : "Stups gesendet 👋 — er sieht ihn beim nächsten Öffnen.";
      } catch {
        pingNote.textContent = "Gerade keine Verbindung.";
      }
      setTimeout(() => { pingBtn.disabled = false; }, 4000);
    });
    mount.appendChild(h("div", { class: "fa-ping-row" }, [pingBtn, pingNote]));
  }

  const list = h("div", {});
  const loading = h("p", { class: "fa-muted", text: "Lade…" });
  mount.appendChild(loading);
  mount.appendChild(list);

  if (!endpoint()) {
    loading.remove();
    mount.appendChild(h("p", { class: "fa-empty", text: "Kein Backend konfiguriert (config/backup.json)." }));
    return;
  }

  try {
    const items = await fetchActivity();
    state.activity = items;
    loading.remove();
    if (!items.length) {
      mount.appendChild(h("p", { class: "fa-empty", text: "Noch keine Eingänge." }));
      return;
    }
    for (const item of items) {
      const body = h("div", { class: "fa-feed-body" }, [
        h("div", { class: "fa-when", text: `${labelFor(item)} · ${fmtWhen(item)}` }),
        h("p", { class: "fa-what", text: textFor(item) })
      ]);
      if (item.type === "wish" && item.timestamp) body.appendChild(replyRow(item));
      list.appendChild(h("div", { class: "fa-feed-item" }, [
        h("div", { class: "fa-feed-ico", text: ICONS[item.type] || "•" }),
        body
      ]));
    }
  } catch (e) {
    loading.remove();
    mount.appendChild(h("div", { class: "fa-status err", text: `Feed konnte nicht geladen werden: ${e.message}` }));
    mount.appendChild(h("p", { class: "fa-muted", style: "font-size:.78rem;margin-top:8px",
      text: "Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])." }));
  }
}

// The reply on a wish: three buttons, the chosen one lit. Tapping the lit one
// clears the reply again. Optimistic — the button flips at once, the sheet
// write is confirmed by the next feed load.
function replyRow(item) {
  const row = h("div", { class: "fa-reply-row" });
  const note = h("span", { class: "fa-reply-note", text: "" });
  let current = item.status || "";
  const buttons = WISH_REPLIES.map((r) => {
    const btn = h("button", { class: "fa-reply-btn" + (current === r.id ? " active" : ""), text: r.label });
    btn.addEventListener("click", async () => {
      const next = current === r.id ? "" : r.id;
      const prev = current;
      current = next;
      item.status = next;
      for (const b of buttons) b.classList.toggle("active", b.dataset.id === next);
      note.textContent = "…";
      try {
        const out = await setWishStatus(item.timestamp, next);
        if (out && out.ok === false) {
          note.textContent = out.error === "unknown type" || /type/i.test(out.error || "")
            ? "Script neu deployen" : (out.error || "nicht gespeichert");
          current = prev; item.status = prev;
          for (const b of buttons) b.classList.toggle("active", b.dataset.id === prev);
        } else {
          note.textContent = next ? "gespeichert — er sieht es auf der nächsten Kapsel" : "zurückgenommen";
        }
      } catch {
        note.textContent = "keine Verbindung";
        current = prev; item.status = prev;
        for (const b of buttons) b.classList.toggle("active", b.dataset.id === prev);
      }
      setTimeout(() => { note.textContent = ""; }, 4000);
    });
    btn.dataset.id = r.id;
    return btn;
  });
  for (const b of buttons) row.appendChild(b);
  row.appendChild(note);
  return row;
}
