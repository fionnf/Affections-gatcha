// Settings: GitHub token management + notification enabling.
import { state } from "./state.js";
import { h, field, textInput, status } from "./ui.js";
import { getToken, setToken, whoAmI } from "./github.js";
import { requestPermission } from "./notify.js";

export function renderSettings(mount) {
  mount.innerHTML = "";

  // ── GitHub token ──
  const tokenEl = textInput(getToken(), { placeholder: "github_pat_…", type: "password", autocomplete: "off" });
  const ghMsg = h("p", { class: "fa-status", hidden: true });

  const saveBtn = h("button", { class: "fa-btn primary", text: "Token speichern & prüfen" });
  saveBtn.addEventListener("click", async () => {
    const t = tokenEl.value.trim();
    if (!t) { status(ghMsg, "Bitte einen Token eingeben.", "err"); return; }
    setToken(t);
    saveBtn.disabled = true;
    status(ghMsg, "Prüfe…", "pending");
    try {
      const user = await whoAmI();
      status(ghMsg, `Verbunden als @${user.login} ✓`, "ok");
      // drop cached config so editors reload with the new token
      state.outcomes = null;
      state.special = null;
    } catch (e) {
      status(ghMsg, `Token ungültig: ${e.message}`, "err");
    } finally {
      saveBtn.disabled = false;
    }
  });

  const clearBtn = h("button", { class: "fa-btn ghost", text: "Token löschen" });
  clearBtn.addEventListener("click", () => {
    setToken("");
    tokenEl.value = "";
    state.outcomes = null;
    state.special = null;
    status(ghMsg, "Token entfernt.", "ok");
  });

  mount.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "GitHub-Token" }),
    h("p", { class: "fa-muted", style: "font-size:.82rem;margin-top:0",
      text: "Fine-grained Token mit „Contents: Read and write“ für dieses Repo. Wird nur in diesem Browser gespeichert." }),
    field("Token", tokenEl),
    h("div", { class: "fa-row wrap" }, [saveBtn, clearBtn]),
    ghMsg
  ]));

  // ── Notifications ──
  const notifMsg = h("p", { class: "fa-status", hidden: true });
  const notifBtn = h("button", { class: "fa-btn gold", text: "Benachrichtigungen aktivieren" });
  notifBtn.addEventListener("click", async () => {
    const r = await requestPermission();
    if (r === "granted") status(notifMsg, "Benachrichtigungen aktiv ✓", "ok");
    else if (r === "denied") status(notifMsg, "Im Browser blockiert. In den Einstellungen erlauben.", "err");
    else if (r === "unsupported") status(notifMsg, "Dieser Browser unterstützt keine Benachrichtigungen.", "err");
    else status(notifMsg, "Nicht aktiviert.", "err");
  });
  const perm = ("Notification" in window) ? Notification.permission : "unsupported";

  mount.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "Benachrichtigungen" }),
    h("p", { class: "fa-muted", style: "font-size:.82rem;margin-top:0",
      text: `Status: ${perm}. Lokale Benachrichtigung bei neuer Umarmung/Wunsch, wenn die App offen ist oder als PWA installiert. E-Mail bleibt der sichere Kanal.` }),
    notifBtn,
    notifMsg
  ]));

  // ── Info ──
  const repo = (state.admin && state.admin.repo) || {};
  mount.appendChild(h("div", { class: "fa-card" }, [
    h("h3", { text: "Repository" }),
    h("p", { class: "fa-muted", style: "font-size:.82rem",
      text: `${repo.owner}/${repo.name} · Branch ${repo.branch || "master"}` })
  ]));
}
