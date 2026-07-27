// Inbox / activity feed: reads recent hugs, wishes, prompt answers and quest
// solves from the Apps Script backend (doGet must return an `activity` array).
import { state } from "./state.js";
import { h } from "./ui.js";

const ICONS = { hug: "🫂", wish: "✨", voucher: "🎟️", answer: "💬", quest: "📸", ping: "📍", reaction: "💛" };

function endpoint() {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled) return "";
  return typeof cfg.endpointUrl === "string" ? cfg.endpointUrl.trim() : "";
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
    case "reaction": return "Kapsel-Reaktion";
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
  if (item.type === "reaction") {
    return `${item.emoji || ""} auf die Kapsel vom ${item.day || "heute"}`;
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
      // Reactions flow in BOTH directions — this feed is "Eingänge von
      // Lennart", so Fionn's own outgoing reactions don't belong here.
      if (item.type === "reaction" && (item.token || "").toLowerCase() === "fionn") continue;
      list.appendChild(h("div", { class: "fa-feed-item" }, [
        h("div", { class: "fa-feed-ico", text: (item.type === "reaction" && item.emoji) ? item.emoji : (ICONS[item.type] || "•") }),
        h("div", { class: "fa-feed-body" }, [
          h("div", { class: "fa-when", text: `${labelFor(item)} · ${fmtWhen(item)}` }),
          h("p", { class: "fa-what", text: textFor(item) })
        ])
      ]));
    }
  } catch (e) {
    loading.remove();
    mount.appendChild(h("div", { class: "fa-status err", text: `Feed konnte nicht geladen werden: ${e.message}` }));
    mount.appendChild(h("p", { class: "fa-muted", style: "font-size:.78rem;margin-top:8px",
      text: "Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])." }));
  }
}
