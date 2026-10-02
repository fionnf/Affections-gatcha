// ── Wanderweg ────────────────────────────────────────────────────────────────
// The Lieblinge are stops along a trail that winds up through the ridges:
// the valley at the bottom, the summit at the top, the newest favourite
// nearest the summit. The page scroll walks a small hiker along the path.
// A stop shows the date, the title and a line (or the photo); a tap opens
// the full card in a sheet.
import { escapeHtml, formatHistoryDate, seededRandom } from "./utils.js";

export const STOP_GAP = 170;      // vertical distance between stops
export const TOP_PAD = 150;       // room for the summit
export const BOTTOM_PAD = 110;    // room for the start
export const RIDGE_GAP = 230;

// Where the stops sit: alternating left and right, oldest at the bottom.
// `entries` arrive newest first, which is also top to bottom.
export function stopPoints(count, width) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const left = i % 2 === 0;
    pts.push({ x: Math.round(width * (left ? 0.24 : 0.76)), y: TOP_PAD + i * STOP_GAP, left });
  }
  return pts;
}

export function sceneHeight(count) {
  return TOP_PAD + Math.max(0, count - 1) * STOP_GAP + BOTTOM_PAD;
}

// The trail from the start (bottom centre) through every stop to the
// summit (top centre), as a smooth path. Drawn bottom to top, so the
// hiker's progress along it is the climb.
export function trailPath(points, width, height) {
  const start = { x: Math.round(width / 2), y: height - 40 };
  const summit = { x: Math.round(width / 2), y: 58 };
  const seq = [start, ...[...points].reverse(), summit];
  let d = `M${seq[0].x},${seq[0].y}`;
  for (let i = 1; i < seq.length; i++) {
    const a = seq[i - 1], b = seq[i];
    const my = (a.y + b.y) / 2;
    d += ` C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`;
  }
  return d;
}

// Ridges across the scene, farther (higher) ones hazier. Seeded so the
// mountains are the same every visit.
export function ridgePolygons(width, height, seed = "wanderweg") {
  const polys = [];
  let n = 0;
  for (let y = RIDGE_GAP * 0.6; y < height + RIDGE_GAP; y += RIDGE_GAP, n++) {
    const pts = [];
    const steps = 7;
    for (let s = 0; s <= steps; s++) {
      const x = Math.round((width * s) / steps);
      const jag = seededRandom(`${seed}:${n}:${s}`) * 70 - 20;
      pts.push(`${x},${Math.round(y - jag)}`);
    }
    const depth = Math.min(1, y / height);
    polys.push({ points: `0,${y + 80} ${pts.join(" ")} ${width},${y + 80}`, opacity: 0.22 + depth * 0.5 });
  }
  return polys;
}

// The first sentence of a message, for the stop's label.
export function firstLine(text, max = 72) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (!t) return "";
  const m = t.match(/^.*?[.!?…](\s|$)/);
  let line = (m ? m[0] : t).trim();
  if (line.length > max) line = line.slice(0, max - 1).trimEnd() + "…";
  return line;
}

// How far up the trail the hiker is: 0 at the bottom of the scene, 1 at
// the top, following the middle of the viewport.
export function climbProgress(sceneTop, sceneHeight, viewportHeight) {
  const mid = viewportHeight / 2 - sceneTop;    // viewport middle, in scene px
  const p = 1 - mid / sceneHeight;
  return Math.min(1, Math.max(0, p));
}

const STOP_MARK = { photo: "📷", jackpot: "💎", special: "🎉", rare: "✨", quest: "🧭", warm: "🫶", cursed: "🪨", quiet: "🪨", soft: "🌿", uncommon: "🌼" };

export function stopMark(entry) {
  if (entry.photo) return STOP_MARK.photo;
  return STOP_MARK[entry.tone] || "🌿";
}

export function renderWanderweg(container, entries, { width, onOpen } = {}) {
  const w = Math.max(220, Math.round(width || container.clientWidth || 300));
  const h = sceneHeight(entries.length);
  const points = stopPoints(entries.length, w);
  const path = trailPath(points, w, h);
  const ridges = ridgePolygons(w, h);
  const stars = [];
  for (let i = 0; i < 18; i++) {
    const sx = Math.round(seededRandom(`star:x:${i}`) * w), sy = Math.round(seededRandom(`star:y:${i}`) * Math.min(h, 420));
    stars.push(`<circle cx="${sx}" cy="${sy}" r="${(0.6 + seededRandom(`star:r:${i}`) * 1.1).toFixed(1)}" class="ag-ww-star" style="animation-delay:${(seededRandom(`star:d:${i}`) * 4).toFixed(1)}s"/>`);
  }
  container.style.height = `${h}px`;
  container.innerHTML = `
    <svg class="ag-ww-scene" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
      <defs>
        <linearGradient id="ag-ww-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1a2a"/><stop offset=".45" stop-color="#10261c"/><stop offset="1" stop-color="#1a3324"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#ag-ww-sky)"/>
      ${stars.join("")}
      ${ridges.map((r) => `<polygon points="${r.points}" class="ag-ww-ridge" style="opacity:${r.opacity.toFixed(2)}"/>`).join("")}
      <path class="ag-ww-trail-shadow" d="${path}"/>
      <path class="ag-ww-trail" d="${path}" data-ag-ww-trail/>
    </svg>
    <div class="ag-ww-summit" style="left:${Math.round(w / 2)}px;top:58px"><span class="ag-ww-flag">🚩</span><span class="ag-ww-summit-label">Gipfel · ${entries.length} ${entries.length === 1 ? "Liebling" : "Lieblinge"}</span></div>
    <div class="ag-ww-start" style="left:${Math.round(w / 2)}px;top:${h - 40}px"><span class="ag-ww-start-label">Start</span></div>
    <div class="ag-ww-hiker" data-ag-ww-hiker aria-hidden="true">🚶</div>
    ${entries.map((e, i) => stopHtml(e, points[i], i)).join("")}
  `;
  container.querySelectorAll("[data-ag-ww-stop]").forEach((el) => {
    el.addEventListener("click", () => onOpen && onOpen(entries[Number(el.dataset.agWwStop)], el));
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onOpen && onOpen(entries[Number(el.dataset.agWwStop)], el); }
    });
  });
  placeHiker(container, 0);
  return { width: w, height: h };
}

function stopHtml(entry, pt, i) {
  const side = pt.left ? "is-left" : "is-right";
  const photo = entry.photo && entry.photo.url && (entry.photo.type !== "video");
  const media = photo
    ? `<span class="ag-ww-thumb"><img src="${escapeHtml(entry.photo.url)}" alt="" loading="lazy"></span>`
    : `<span class="ag-ww-mark">${stopMark(entry)}</span>`;
  const line = photo ? escapeHtml((entry.photo.caption || "").trim() || firstLine(entry.message)) : escapeHtml(firstLine(entry.message));
  return `
    <button class="ag-ww-stop ${side}" type="button" data-ag-ww-stop="${i}" style="left:${pt.x}px;top:${pt.y}px" data-tone="${escapeHtml(entry.tone || "soft")}">
      <span class="ag-ww-dot"></span>
      <span class="ag-ww-label">
        ${media}
        <span class="ag-ww-text">
          <span class="ag-ww-date">${escapeHtml(formatHistoryDate(entry.day))}</span>
          <span class="ag-ww-title">${escapeHtml(entry.title || "")}</span>
          ${line ? `<span class="ag-ww-line">${line}</span>` : ""}
        </span>
      </span>
    </button>`;
}

// Puts the hiker on the trail at `progress` (0 start … 1 summit), facing
// the way the path goes.
export function placeHiker(container, progress) {
  const trail = container.querySelector("[data-ag-ww-trail]");
  const hiker = container.querySelector("[data-ag-ww-hiker]");
  if (!trail || !hiker || typeof trail.getTotalLength !== "function") return;
  const len = trail.getTotalLength();
  if (!len) return;
  const at = Math.min(len, Math.max(0, progress * len));
  const p = trail.getPointAtLength(at);
  const q = trail.getPointAtLength(Math.min(len, at + 6));
  hiker.style.left = `${p.x}px`;
  hiker.style.top = `${p.y}px`;
  hiker.classList.toggle("is-facing-left", q.x < p.x - 0.5);
}

let _bound = false;
// The page scroll moves the hiker. Bound once; reads the current scene.
export function bindWanderwegScroll(getContainer) {
  if (_bound) return;
  _bound = true;
  let raf = 0;
  const update = () => {
    raf = 0;
    const c = getContainer();
    if (!c || !c.isConnected || c.offsetParent === null) return;
    const r = c.getBoundingClientRect();
    placeHiker(c, climbProgress(r.top, r.height, window.innerHeight));
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return update;
}
