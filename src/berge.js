// ── Berge / Gipfelbuch ────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { formatElev, formatKm, formatBergeDate, extractKomootId, escapeHtml } from "./utils.js";
import { readGipfelbuch, writeGipfelbuch } from "./storage.js";
import { haptic } from "./haptic.js";
import { markRecentWrite } from "./sheetSync.js";

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

function times(t) {
  return t >= 2 ? String(Math.round(t)) : (Math.round(t * 10) / 10).toString().replace(".", ",");
}

// Same idea as elevationAnalogy, in kilometres. Every reference here is a
// fixed number rather than a route: a marathon is exactly 42.195 km and the
// Camino Francés is always quoted at ~800 km, whereas "Zürich–Genf" depends
// on which way you go and would be a figure I made up. The steps are also
// kept ~2× apart — an earlier draft had 40 km next to 42.195 km, which left
// the smaller one reachable only in a 1.5 km band.
export function distanceAnalogy(km) {
  if (!km || km <= 0) return null;
  const refs = [
    [800, "Jakobsweg"],
    [42.195, "Marathon"],
    [21.0975, "Halbmarathon"],
    [10, "10-km-Lauf"]
  ];
  for (const [d, name] of refs) {
    const t = km / d;
    if (t >= 0.7) return `≈ ${times(t)}× ${name}`;
  }
  return null;
}

// The other comparison people actually want: not a mountain from a list, but
// *their* mountain. How many times over have the two of them climbed the
// biggest thing in their own Gipfelbuch? Uses `elevation` (the summit's real
// height), never `elevGain`, so the sentence stays true.
export function gipfelComparison(totalGain, entries) {
  if (!totalGain || totalGain <= 0 || !Array.isArray(entries)) return null;
  let best = null;
  for (const e of entries) {
    const h = Number(e && e.elevation);
    if (!Number.isFinite(h) || h <= 0) continue;
    if (!best || h > best.h) best = { h, name: (e.name || "").trim() };
  }
  if (!best) return null;
  const t = totalGain / best.h;
  if (t < 0.7) return null;
  return best.name
    ? `≈ ${times(t)}× euer höchster Gipfel (${best.name})`
    : `≈ ${times(t)}× euer höchster Gipfel`;
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
  markRecentWrite("gipfelbuch");
  postGipfelToSheet("gipfel-upsert", { ...entry, createdAt: new Date().toISOString() });
}

export function deleteGipfelEntry(id) {
  writeGipfelbuch(readGipfelbuch().filter((e) => e.id !== id));
  markRecentWrite("gipfelbuch");
  postGipfelToSheet("gipfel-delete", { id });
}

export function updateGipfelEntry(id, fields) {
  const entries = readGipfelbuch();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return;
  const updated = { ...entries[idx], ...fields };
  entries[idx] = updated;
  writeGipfelbuch(entries);
  markRecentWrite("gipfelbuch");
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

  // Every entry field below comes from the shared sheet (typed by either
  // player on any device) — escape all of it before it touches innerHTML.
  const coverHtml = entry.cover
    ? `<div class="ag-gipfel-cover"><img src="${escapeHtml(entry.cover)}" alt="${escapeHtml(entry.name || "")}" loading="lazy" decoding="async"></div>`
    : "";

  const elevDisplay = entry.elevGain || entry.elevation;
  const distStr = entry.distance ? `${escapeHtml(entry.distance)} km` : "";
  const trailLink = entry.activityUrl
    ? `<a class="ag-gipfel-trail-arrow" href="${escapeHtml(entry.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`
    : "";
  const statsHtml = (distStr || trailLink)
    ? `<div class="ag-gipfel-stats">${distStr}${distStr && trailLink ? " " : ""}${trailLink}</div>`
    : "";

  card.innerHTML = `
    ${coverHtml}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${formatBergeDate(entry.date)}</div>
        <div class="ag-gipfel-name">${escapeHtml(entry.name || "—")}</div>
      </div>
      ${elevDisplay ? `<div class="ag-gipfel-elev">↑ ${formatElev(elevDisplay)}</div>` : ""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${escapeHtml(entry.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${escapeHtml(entry.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${statsHtml}
    ${entry.notes ? `<p class="ag-gipfel-notes">${escapeHtml(entry.notes)}</p>` : ""}
    ${komootId ? `<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${komootId}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${komootId}" hidden></div>` : ""}
    ${isAllTrails && allTrailsEmbed ? `<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>` : ""}
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
      const latEl2 = $("[data-ag-berge-lat]"); if (latEl2) latEl2.value = entry.lat || "";
      const lngEl2 = $("[data-ag-berge-lng]"); if (lngEl2) lngEl2.value = entry.lng || "";
      const locLabelEl = $("[data-ag-berge-loc-label]"); if (locLabelEl) locLabelEl.value = entry.locLabel || "";
      const locSearchEl = $("[data-ag-loc-search]"); if (locSearchEl) locSearchEl.value = entry.locLabel || "";
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

  const alltrailsMapBtn = card.querySelector("[data-ag-map-alltrails]");
  if (alltrailsMapBtn && allTrailsEmbed) {
    alltrailsMapBtn.addEventListener("click", () => {
      const wrap = card.querySelector("[data-ag-map-wrap-alltrails]");
      if (!wrap) return;
      if (!wrap.hidden) { wrap.hidden = true; alltrailsMapBtn.textContent = "🗺 AllTrails-Karte"; return; }
      wrap.innerHTML = `<iframe src="${escapeHtml(allTrailsEmbed)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`;
      wrap.hidden = false;
      alltrailsMapBtn.textContent = "Karte schließen";
      haptic(4);
    });
  }

  return card;
}

export function renderBergePanel({ loading = false } = {}) {
  const list = $("[data-ag-berge-list]");
  const empty = $("[data-ag-berge-empty]");
  const totalEl = $("[data-ag-berge-total]");
  const analogyEl = $("[data-ag-berge-analogy]");
  const distEl = $("[data-ag-berge-total-dist]");
  const distAnalogyEl = $("[data-ag-berge-dist-analogy]");
  const gipfelEl = $("[data-ag-berge-gipfel-cmp]");
  if (!list) return;

  const entries = readGipfelbuch().sort((a, b) => {
    const da = a.date || "";
    const db = b.date || "";
    return db < da ? -1 : db > da ? 1 : 0;
  });
  list.innerHTML = "";

  const totalElev = entries.reduce((sum, e) => sum + (Number(e.elevGain) || Number(e.elevation) || 0), 0);
  if (totalEl) totalEl.textContent = totalElev > 0 ? formatElev(totalElev) : "— m";
  if (analogyEl) {
    const analogy = elevationAnalogy(totalElev);
    if (analogy) { analogyEl.textContent = analogy; analogyEl.hidden = false; }
    else { analogyEl.hidden = true; }
  }

  // Distance is stored per entry but was never summed — the header only ever
  // showed metres climbed, which undersells a long flat day out.
  const totalDist = entries.reduce((sum, e) => {
    const km = Number(e.distance);
    return sum + (Number.isFinite(km) && km > 0 ? km : 0);
  }, 0);
  if (distEl) {
    distEl.textContent = totalDist > 0 ? `${formatKm(totalDist)} km` : "— km";
  }
  if (distAnalogyEl) {
    const a = distanceAnalogy(totalDist);
    if (a) { distAnalogyEl.textContent = a; distAnalogyEl.hidden = false; }
    else { distAnalogyEl.hidden = true; }
  }
  if (gipfelEl) {
    const cmp = gipfelComparison(totalElev, entries);
    if (cmp) { gipfelEl.textContent = cmp; gipfelEl.hidden = false; }
    else { gipfelEl.hidden = true; }
  }

  if (!entries.length) {
    // No cached summits yet and the sheet still talking: say so, rather than
    // claiming the Gipfelbuch is empty.
    if (empty) {
      empty.textContent = loading
        ? "Gipfel werden geladen …"
        : "Noch kein Gipfel eingetragen. Der erste wartet.";
      empty.classList.toggle("is-loading", loading);
      empty.hidden = false;
    }
    initGipfelMap([]);
    return;
  }
  if (empty) { empty.hidden = true; empty.classList.remove("is-loading"); }
  entries.forEach((entry) => list.appendChild(renderGipfelCard(entry)));
  initGipfelMap(entries);
}

// ── Location search ────────────────────────────────────────────────────────────
export function bindLocationSearch(mountEl) {
  const searchInput = mountEl.querySelector("[data-ag-loc-search]");
  const dropdown = mountEl.querySelector("[data-ag-loc-dropdown]");
  if (!searchInput || !dropdown) return;

  let debounceTimer = null;

  function clearLocation() {
    const latEl = mountEl.querySelector("[data-ag-berge-lat]");
    const lngEl = mountEl.querySelector("[data-ag-berge-lng]");
    const labelEl = mountEl.querySelector("[data-ag-berge-loc-label]");
    if (latEl) latEl.value = "";
    if (lngEl) lngEl.value = "";
    if (labelEl) labelEl.value = "";
    dropdown.hidden = true;
    dropdown.innerHTML = "";
  }

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const q = searchInput.value.trim();
    if (!q) { clearLocation(); return; }
    debounceTimer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
        const res = await fetch(url, { headers: { "User-Agent": "affections-gacha/1.0" } });
        const results = await res.json();
        dropdown.innerHTML = "";
        if (!results.length) { dropdown.hidden = true; return; }
        results.forEach((item) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "ag-location-result";
          btn.textContent = item.display_name;
          btn.addEventListener("click", () => {
            const latEl = mountEl.querySelector("[data-ag-berge-lat]");
            const lngEl = mountEl.querySelector("[data-ag-berge-lng]");
            const labelEl = mountEl.querySelector("[data-ag-berge-loc-label]");
            if (latEl) latEl.value = item.lat;
            if (lngEl) lngEl.value = item.lon;
            if (labelEl) labelEl.value = item.display_name;
            searchInput.value = item.display_name;
            dropdown.hidden = true;
            dropdown.innerHTML = "";
          });
          dropdown.appendChild(btn);
        });
        dropdown.hidden = false;
      } catch (_) {
        dropdown.hidden = true;
      }
    }, 300);
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.hidden = true;
    }
  });
}

export function bindBergeEvents() {
  bindLocationSearch(mount);
}

// ── Leaflet map ────────────────────────────────────────────────────────────────
let _map = null;
let _markerLayer = null;

export function invalidateGipfelMap() {
  if (_map) setTimeout(() => _map.invalidateSize(), 150);
}

async function loadLeaflet() {
  if (window.L) return;
  await new Promise((res, rej) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = res; script.onerror = rej;
    document.head.appendChild(script);
  });
}

export async function initGipfelMap(entries) {
  const section = $("[data-ag-gipfel-map-section]");
  if (!section) return;

  const geoEntries = entries.filter((e) => e.lat && e.lng);

  if (!geoEntries.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  try {
    await loadLeaflet();
  } catch (_) {
    return;
  }

  const L = window.L;
  const mapEl = document.getElementById("ag-gipfel-map");
  if (!mapEl) return;

  const CH_BOUNDS = [[45.8, 5.9], [47.8, 10.5]];
  const EU_BOUNDS = [[35.0, -11.0], [71.0, 32.0]];

  if (!_map) {
    _map = L.map(mapEl).fitBounds(CH_BOUNDS);
    // CARTO's free basemap started answering with "API token required"
    // tiles. OpenTopoMap needs no key, and contour lines under a mountain
    // log are the right map anyway; the tile filter in css.js dims it to
    // sit in the dark UI.
    L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
      subdomains: "abc",
      maxZoom: 17
    }).addTo(_map);

    // Toggle buttons
    const toggleBtns = section.querySelectorAll("[data-map-view]");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const bounds = btn.dataset.mapView === "eu" ? EU_BOUNDS : CH_BOUNDS;
        _map.fitBounds(bounds);
      });
    });
  }

  // Clear existing markers
  if (_markerLayer) {
    _markerLayer.clearLayers();
  } else {
    _markerLayer = L.layerGroup().addTo(_map);
  }

  geoEntries.forEach((entry) => {
    const marker = L.circleMarker([parseFloat(entry.lat), parseFloat(entry.lng)], {
      radius: 8,
      fillColor: "#7ecfa3",
      color: "#1a4a2c",
      weight: 2,
      fillOpacity: 0.9
    });

    const popupContent = document.createElement("div");
    popupContent.style.cssText = "min-width:130px";
    const elevVal = entry.elevGain || entry.elevation;
    popupContent.innerHTML = `
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${escapeHtml(entry.name || "—")}</div>
      ${elevVal ? `<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${formatElev(elevVal)}</div>` : ""}
    `;
    const goBtn = document.createElement("button");
    goBtn.type = "button";
    goBtn.textContent = "Zum Eintrag";
    goBtn.style.cssText = "background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%";
    goBtn.addEventListener("click", () => {
      marker.closePopup();
      const card = mount.querySelector(`[data-ag-gipfel-id="${entry.id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("ag-gipfel-highlight");
        setTimeout(() => card.classList.remove("ag-gipfel-highlight"), 1200);
      }
    });
    popupContent.appendChild(goBtn);
    marker.bindPopup(popupContent);
    _markerLayer.addLayer(marker);
  });

  // Invalidate after layout settles — rAF alone isn't enough when the panel
  // was hidden during map creation, so we fire again after a short delay.
  requestAnimationFrame(() => { if (_map) _map.invalidateSize(); });
  setTimeout(() => { if (_map) _map.invalidateSize(); }, 250);
}
