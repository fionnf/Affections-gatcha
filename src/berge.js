// ── Berge / Gipfelbuch ────────────────────────────────────────────────────────
import { state, $ } from "./state.js";
import { getToken, formatElev, formatBergeDate, extractKomootId } from "./utils.js";
import { readGipfelbuch, writeGipfelbuch } from "./storage.js";
import { haptic } from "./haptic.js";

export function elevationAnalogy(m) {
  if (!m || m <= 0) return null;
  const refs = [
    [8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],
    [2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],
    [869,"Üetliberg"],[668,"Grosse Mythen"]
  ];
  for (const [h, name] of refs) {
    const t = m / h;
    if (t >= 0.7) {
      const n = t >= 2 ? Math.round(t) : (Math.round(t * 10) / 10).toString().replace(".", ",");
      return `≈ ${n}× ${name}`;
    }
  }
  return null;
}

export function extractAllTrailsSlug(url) {
  if (!url || !url.includes("alltrails.com")) return null;
  const m = url.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);
  if (!m) return null;
  let slug = m[1].replace(/\/$/, "");
  slug = slug.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//, "trail/");
  const COUNTRY = { "schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/",
    "frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/",
    "suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/" };
  for (const [loc, en] of Object.entries(COUNTRY)) {
    if (slug.startsWith("trail/" + loc)) { slug = "trail/" + en + slug.slice(6 + loc.length); break; }
  }
  if (!slug.startsWith("trail/") || slug.split("/").length < 3) return null;
  return slug;
}

export function extractAllTrailsEmbed(url) {
  if (!url || !url.includes("alltrails.com")) return null;
  function cleanParams(src) {
    const qIdx = src.indexOf("?");
    const base = qIdx === -1 ? src : src.slice(0, qIdx);
    const qs   = qIdx === -1 ? "" : src.slice(qIdx + 1);
    const p = new URLSearchParams(qs);
    p.set("scrollZoom", "false");
    p.set("u", "m");
    p.set("elevationDiagram", "false");
    return base + "?" + p.toString();
  }
  // Already a widget URL (user pasted from AllTrails embed code)
  if (url.includes("/widget/")) return cleanParams(url);
  // Recording URL: /explore/recording/slug or /recording/slug
  const recM = url.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);
  if (recM) {
    const shM = url.match(/[?&]sh=([^&#]+)/);
    const sh = shM ? `&sh=${shM[1]}` : "";
    return cleanParams(`https://www.alltrails.com/widget/recording/${recM[1]}?scrollZoom=false&u=m${sh}`);
  }
  // Trail URL: extract slug
  const slug = extractAllTrailsSlug(url);
  return slug ? cleanParams(`https://www.alltrails.com/widget/${slug}?scrollZoom=false&u=m`) : null;
}

export function postGipfelToSheet(type, payload) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) return;
  const body = JSON.stringify({ type, ...payload });
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
  fetch(cfg.endpointUrl, opts).catch(() => fetch(cfg.endpointUrl, { ...opts, mode: "no-cors" }).catch(() => {}));
}

export function addGipfelEntry(entry) {
  const entries = readGipfelbuch();
  entries.unshift(entry);
  writeGipfelbuch(entries);
  postGipfelToSheet("gipfel-upsert", { ...entry, createdAt: new Date().toISOString() });
}

export function deleteGipfelEntry(id) {
  writeGipfelbuch(readGipfelbuch().filter((e) => e.id !== id));
  postGipfelToSheet("gipfel-delete", { id });
}

export function updateGipfelEntry(id, fields) {
  const entries = readGipfelbuch();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return;
  const updated = { ...entries[idx], ...fields };
  entries[idx] = updated;
  writeGipfelbuch(entries);
  postGipfelToSheet("gipfel-upsert", updated);
}

export function renderGipfelCard(entry) {
  // Import showToast lazily to avoid circular
  const card = document.createElement("div");
  card.className = "ag-card ag-gipfel-card";
  card.dataset.agGipfelId = entry.id;

  const komootId = entry.activityUrl ? extractKomootId(entry.activityUrl) : null;
  const isAllTrails = entry.activityUrl && entry.activityUrl.includes("alltrails.com");
  const allTrailsEmbed = isAllTrails ? extractAllTrailsEmbed(entry.activityUrl) : null;

  const coverHtml = entry.cover
    ? `<div class="ag-gipfel-cover"><img src="${entry.cover}" alt="${entry.name || ""}" loading="lazy"></div>`
    : "";

  const elevDisplay = entry.elevGain || entry.elevation;
  const distStr = entry.distance ? `${entry.distance} km` : "";
  const statsHtml = distStr
    ? `<div class="ag-gipfel-stats">${distStr}</div>`
    : "";

  card.innerHTML = `
    ${coverHtml}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${formatBergeDate(entry.date)}</div>
        <div class="ag-gipfel-name">${entry.name || "—"}</div>
      </div>
      ${elevDisplay ? `<div class="ag-gipfel-elev">↑ ${formatElev(elevDisplay)}</div>` : ""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${entry.id}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${entry.id}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${statsHtml}
    ${entry.notes ? `<p class="ag-gipfel-notes">${entry.notes}</p>` : ""}
    ${komootId ? `<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${komootId}">🗺 Komoot-Karte</button><a class="ag-secondary" href="${entry.activityUrl}" target="_blank" rel="noopener noreferrer">↗ Komoot öffnen</a></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${komootId}" hidden></div>` : ""}
    ${isAllTrails ? `${allTrailsEmbed ? `<div class="ag-gipfel-map-preview"><iframe src="${allTrailsEmbed}" height="220" frameborder="0" scrolling="no" loading="lazy" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe></div>` : ""}<a class="ag-secondary ag-gipfel-trail-link" href="${entry.activityUrl}" target="_blank" rel="noopener noreferrer">↗ AllTrails öffnen</a>` : ""}
    ${entry.activityUrl && !komootId && !isAllTrails ? `<a class="ag-secondary ag-gipfel-trail-link" href="${entry.activityUrl}" target="_blank" rel="noopener noreferrer">↗ Tour öffnen</a>` : ""}
  `;

  const editBtn = card.querySelector("[data-ag-gipfel-edit]");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const bergeForm = $("[data-ag-berge-form]");
      const bergeAddBtn = $("[data-ag-berge-add]");
      if (!bergeForm) return;
      const editIdEl = $("[data-ag-berge-edit-id]");
      if (editIdEl) editIdEl.value = entry.id;
      const nameEl = $("[data-ag-berge-name]"); if (nameEl) nameEl.value = entry.name || "";
      const distEl = $("[data-ag-berge-dist]"); if (distEl) distEl.value = entry.distance || "";
      const gainEl = $("[data-ag-berge-gain]"); if (gainEl) gainEl.value = entry.elevGain || entry.elevation || "";
      const dateEl = $("[data-ag-berge-date]"); if (dateEl) dateEl.value = entry.date || "";
      const urlEl = $("[data-ag-berge-url]"); if (urlEl) urlEl.value = entry.activityUrl || "";
      const coverEl = $("[data-ag-berge-cover]"); if (coverEl) coverEl.value = entry.cover || "";
      const notesEl = $("[data-ag-berge-notes]"); if (notesEl) notesEl.value = entry.notes || "";
      const formTitle = $("[data-ag-berge-form-title]");
      if (formTitle) formTitle.textContent = "Eintrag bearbeiten";
      const saveSpan = $("[data-ag-berge-save] span:last-child");
      if (saveSpan) saveSpan.textContent = "Speichern";
      bergeForm.hidden = false;
      if (bergeAddBtn) bergeAddBtn.hidden = true;
      $("[data-ag-sheet-backdrop]")?.classList.add("is-open");
      bergeForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (nameEl) nameEl.focus();
      haptic(8);
    });
  }

  const delBtn = card.querySelector("[data-ag-gipfel-delete]");
  if (delBtn) {
    delBtn.addEventListener("click", () => {
      if (!window.confirm(`„${entry.name}" löschen?`)) return;
      deleteGipfelEntry(entry.id);
      renderBergePanel();
      haptic(8);
      // showToast via dynamic import to avoid circular
      import("./events.js").then(m => m.showToast("Eintrag gelöscht")).catch(() => {});
    });
  }

  const komootMapBtn = card.querySelector("[data-ag-map-komoot]");
  if (komootMapBtn) {
    komootMapBtn.addEventListener("click", () => {
      const wrap = card.querySelector(`[data-ag-map-wrap-komoot="${komootId}"]`);
      if (!wrap) return;
      if (!wrap.hidden) { wrap.hidden = true; komootMapBtn.textContent = "🗺 Komoot-Karte"; return; }
      wrap.innerHTML = `<iframe src="https://www.komoot.com/tour/${komootId}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`;
      wrap.hidden = false;
      komootMapBtn.textContent = "Karte schließen";
      haptic(4);
    });
  }

  return card;
}

export function renderBergePanel() {
  const list = $("[data-ag-berge-list]");
  const empty = $("[data-ag-berge-empty]");
  const totalEl = $("[data-ag-berge-total]");
  const analogyEl = $("[data-ag-berge-analogy]");
  if (!list) return;

  const entries = readGipfelbuch();
  list.innerHTML = "";

  const totalElev = entries.reduce((sum, e) => sum + (Number(e.elevGain) || Number(e.elevation) || 0), 0);
  if (totalEl) totalEl.textContent = totalElev > 0 ? formatElev(totalElev) : "— m";
  if (analogyEl) {
    const analogy = elevationAnalogy(totalElev);
    if (analogy) { analogyEl.textContent = analogy; analogyEl.hidden = false; }
    else { analogyEl.hidden = true; }
  }

  if (!entries.length) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  entries.forEach((entry) => list.appendChild(renderGipfelCard(entry)));
}
