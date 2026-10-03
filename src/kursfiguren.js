// ── Kursfiguren ──────────────────────────────────────────────────────────────
// Small inline infographics for course steps, keyed by name. A step says
// `"figure": "blende"` and the drawing goes above its text. All drawn in the
// app's cream on the card's dark glass, no images to load. Drawn for a
// Canon AE-1 / FT QL, which is what hangs around the neck today.

const C = "#f1e9d2", M = "rgba(241,233,210,.45)", G = "#e0a75d", GR = "#8fcf9e", D = "rgba(241,233,210,.12)";
const T = `font-family:inherit;fill:${C}`;
const txt = (x, y, s, o = "") => `<text x="${x}" y="${y}" style="${T};font-size:11px;${o}">${s}</text>`;
const small = (x, y, s, o = "") => `<text x="${x}" y="${y}" style="${T};font-size:9px;fill:${M};${o}">${s}</text>`;
const wrap = (inner, h = 160) => `<svg viewBox="0 0 320 ${h}" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const FIGUREN = {
  // Top view of the camera: what sits where.
  kamera: () => wrap(`
    <rect x="30" y="56" width="260" height="64" rx="8" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <rect x="130" y="40" width="60" height="18" rx="4" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="34" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="24" fill="none" stroke="${M}" stroke-width="1"/>
    <circle cx="160" cy="118" r="14" fill="none" stroke="${M}" stroke-width="1"/>
    <circle cx="256" cy="64" r="14" fill="${D}" stroke="${G}" stroke-width="1.5"/>
    <text x="256" y="67" text-anchor="middle" style="${T};font-size:7px">500</text>
    <rect x="236" y="60" width="9" height="8" rx="1" fill="none" stroke="${G}" stroke-width="1"/>
    <path d="M276 50 l16 -10" stroke="${C}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="64" r="10" fill="none" stroke="${C}" stroke-width="1.5"/>
    <path d="M62 54 v-8 h10" stroke="${C}" stroke-width="1.5" fill="none"/>
    <rect x="200" y="58" width="22" height="10" rx="2" fill="none" stroke="${M}"/>
    ${small(203, 66, "24")}
    ${txt(312, 26, "Zeitenrad + ASA-Fenster", `fill:${G};text-anchor:end`)}
    <path d="M254 30 v18" stroke="${G}" stroke-width="1" stroke-dasharray="2 2"/>
    ${txt(8, 26, "Rückspulkurbel")}
    <path d="M60 30 v22" stroke="${M}" stroke-width="1" stroke-dasharray="2 2"/>
    ${small(298, 36, "Hebel")}
    ${small(200, 82, "Zählwerk")}
    ${txt(8, 112, "Fokusring")}
    <path d="M58 108 h60" stroke="${M}" stroke-width="1" stroke-dasharray="2 2"/>
    ${txt(8, 134, "Blendenring")}
    <path d="M70 130 h66" stroke="${M}" stroke-width="1" stroke-dasharray="2 2"/>
    ${txt(206, 150, "FD- / FL-Objektiv")}
  `),
  // Quick Load: cartridge left, leader to the orange mark.
  einlegen: () => wrap(`
    <rect x="30" y="40" width="260" height="90" rx="8" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <rect x="44" y="52" width="36" height="66" rx="6" fill="none" stroke="${C}" stroke-width="1.5"/>
    <circle cx="62" cy="85" r="5" fill="none" stroke="${M}"/>
    <path d="M80 70 h130 q10 0 10 10 v16" fill="none" stroke="${C}" stroke-width="2.5" stroke-dasharray="6 3"/>
    <rect x="200" y="52" width="76" height="66" rx="6" fill="none" stroke="${G}" stroke-width="1.5"/>
    ${small(207, 66, "QL", `fill:${G};font-size:11px;font-weight:600`)}
    <path d="M226 84 v22" stroke="${G}" stroke-width="3" stroke-linecap="round"/>
    ${[0,1,2,3,4,5,6].map((i) => `<rect x="${92 + i * 16}" y="60" width="5" height="4" fill="${M}"/><rect x="${92 + i * 16}" y="76" width="5" height="4" fill="${M}"/>`).join("")}
    ${txt(44, 146, "Patrone links")}
    ${txt(290, 146, "Anfang bis zur Marke", "text-anchor:end")}
    ${small(100, 32, "Perforation auf den Zähnen")}
  `),
  // ISO: each step is one stop.
  iso: () => wrap(`
    ${[["100", 50, .35], ["200", 125, .55], ["400", 200, .8], ["800", 275, 1]].map(([v, x, o]) => `
      <rect x="${x - 28}" y="${110 - o * 70}" width="56" height="${o * 70}" rx="6" fill="${GR}" opacity="${0.35 + o * 0.5}"/>
      <text x="${x}" y="128" text-anchor="middle" style="${T};font-size:12px">${v}</text>`).join("")}
    ${[88, 163, 238].map((x) => `<path d="M${x - 6} 24 h12" stroke="${G}" stroke-width="1.5"/><path d="M${x} 18 v12" stroke="${G}" stroke-width="1.5"/>`).join("")}
    ${small(160, 150, "jede Stufe doppelt so empfindlich: eine Blende weniger Licht", "text-anchor:middle")}
    ${small(20, 28, "ISO")}
  `, 160),
  // Aperture: smaller hole, bigger number.
  blende: () => wrap(`
    ${["2", "2.8", "4", "5.6", "8", "11", "16"].map((f, i) => {
      const x = 30 + i * 43, r = 16 - i * 2.1;
      return `<circle cx="${x}" cy="60" r="19" fill="none" stroke="${M}" stroke-width="1"/>
        <circle cx="${x}" cy="60" r="${r.toFixed(1)}" fill="${C}" opacity=".9"/>
        <text x="${x}" y="100" text-anchor="middle" style="${T};font-size:11px">f/${f}</text>`;
    }).join("")}
    <path d="M40 124 H280" stroke="${G}" stroke-width="1.5" marker-end="url(#ag-arr)"/>
    <defs><marker id="ag-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${G}"/></marker></defs>
    ${small(40, 140, "pro Schritt halb so viel Licht · mehr Schärfentiefe")}
    ${small(40, 24, "viel Licht, dünne Schärfe")}
    ${small(280, 24, "wenig Licht, alles scharf", "text-anchor:end")}
  `),
  // Shutter: frozen to blurred, with the handheld limit.
  zeit: () => wrap(`
    ${["500", "250", "125", "60", "30", "15"].map((v, i) => {
      const x = 36 + i * 50;
      const blur = i * 1.6;
      return `<g transform="translate(${x},44)">
        <circle cx="0" cy="0" r="6" fill="${C}"/>
        <path d="M0 6 v18 M0 12 l-8 8 M0 12 l8 8 M0 24 l-6 12 M0 24 l6 12" stroke="${C}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        ${blur ? `<path d="M${-10 - blur * 3} 14 h${blur * 3} M${-10 - blur * 3} 26 h${blur * 3}" stroke="${M}" stroke-width="2"/>` : ""}
        <text x="0" y="68" text-anchor="middle" style="${T};font-size:11px">1/${v}</text>
      </g>`;
    }).join("")}
    <path d="M186 20 v100" stroke="${G}" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${small(312, 132, "ab hier freihand wackelig (50er)", `fill:${G};text-anchor:end`)}
    ${small(36, 150, "kurz: eingefroren")}
    ${small(286, 150, "lang: Wisch", "text-anchor:end")}
  `),
  // The triangle and three equal exposures.
  dreieck: () => wrap(`
    <path d="M160 18 L60 118 L260 118 Z" fill="none" stroke="${C}" stroke-width="1.5"/>
    ${txt(160, 14, "ISO", "text-anchor:middle")}
    ${txt(48, 134, "Blende", "text-anchor:middle")}
    ${txt(272, 134, "Zeit", "text-anchor:middle")}
    <rect x="94" y="56" width="132" height="44" rx="8" fill="${D}" stroke="${G}" stroke-width="1"/>
    ${txt(160, 74, "f/8 · 1/125", "text-anchor:middle")}
    ${small(160, 90, "= f/5.6 · 1/250 = f/11 · 1/60", "text-anchor:middle")}
    ${small(60, 154, "ein Schritt doppelt, der andere halb: gleich hell")}
  `),
  // Sunny 16 and today's row.
  sunny16: () => wrap(`
    ${[["☀️", "f/16", "Sonne", false], ["🌤️", "f/11", "leicht bewölkt", false], ["☁️", "f/8", "zu · heute", true], ["🌧️", "f/5.6", "dunkel", false], ["🏚️", "f/4", "Schatten", false]].map(([e, f, l, now], i) => {
      const x = 32 + i * 64;
      return `<g transform="translate(${x},0)">
        ${now ? `<rect x="-26" y="14" width="56" height="118" rx="10" fill="${D}" stroke="${G}" stroke-width="1.5"/>` : ""}
        <text x="2" y="48" text-anchor="middle" style="font-size:24px">${e}</text>
        <text x="2" y="84" text-anchor="middle" style="${T};font-size:14px;${now ? `fill:${G};font-weight:600` : ""}">${f}</text>
        <text x="2" y="104" text-anchor="middle" style="${T};font-size:8px;fill:${M}">${l}</text>
      </g>`;
    }).join("")}
    ${txt(160, 152, "Zeit immer 1/ISO · ISO 400 → 1/500 · ISO 200 → 1/250", "text-anchor:middle;font-size:10px")}
  `),
  // The AE-1 finder: split image in the middle, microprism collar.
  fokus: () => wrap(`
    <g transform="translate(80,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${D}" stroke="${C}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${M}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${C}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${C}" stroke-width="1"/>
      <path d="M-6 -12 V0 M4 0 V12" stroke="${G}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${T};font-size:9px;fill:${M}">unscharf: versetzt</text>
    </g>
    <path d="M150 80 h18" stroke="${G}" stroke-width="1.5" marker-end="url(#ag-arr2)"/>
    <defs><marker id="ag-arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${G}"/></marker></defs>
    <g transform="translate(240,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${D}" stroke="${C}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${M}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${C}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${C}" stroke-width="1"/>
      <path d="M0 -12 V12" stroke="${GR}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${T};font-size:9px;fill:${M}">scharf: eine Linie</text>
    </g>
    ${small(160, 150, "Schnittbild mittig, Mikroprismenring aussen", "text-anchor:middle")}
  `),
  // Depth of field: a thin or a wide band of sharpness along the distance.
  schaerfentiefe: () => wrap(`
    ${[["f/2", 50, 10], ["f/11", 110, 120]].map(([f, y, w]) => `
      <path d="M40 ${y} H280" stroke="${M}" stroke-width="1"/>
      <rect x="${150 - w / 2}" y="${y - 10}" width="${w}" height="20" rx="4" fill="${GR}" opacity=".7"/>
      <text x="22" y="${y + 4}" text-anchor="middle" style="${T};font-size:11px">${f}</text>`).join("")}
    ${[["1m", 60], ["2m", 105], ["3m", 150], ["5m", 205], ["∞", 270]].map(([l, x]) => `<path d="M${x} 36 v6 M${x} 96 v6" stroke="${M}"/><text x="${x}" y="30" text-anchor="middle" style="${T};font-size:9px;fill:${M}">${l}</text>`).join("")}
    <path d="M150 20 v100" stroke="${G}" stroke-width="1" stroke-dasharray="3 3"/>
    ${small(150, 142, "Fokus auf 3 m · grün ist scharf", "text-anchor:middle")}
  `),
  // Zone focus: the lens scale with the f/8 marks.
  zonenfokus: () => wrap(`
    <rect x="30" y="50" width="260" height="56" rx="8" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    ${[["1", 60], ["1.5", 95], ["2", 125], ["3", 160], ["5", 200], ["10", 235], ["∞", 270]].map(([l, x]) => `<path d="M${x} 50 v8" stroke="${C}"/><text x="${x}" y="72" text-anchor="middle" style="${T};font-size:10px">${l}</text>`).join("")}
    <path d="M160 40 v10" stroke="${G}" stroke-width="2.5"/>
    ${[["16", 92], ["11", 110], ["8", 126], ["4", 148], ["4", 172], ["8", 194], ["11", 210], ["16", 228]].map(([f, x]) => `<text x="${x}" y="98" text-anchor="middle" style="${T};font-size:9px;fill:${f === "8" ? G : M}">${f}</text>`).join("")}
    <path d="M126 106 v8 H194 v-8" fill="none" stroke="${G}" stroke-width="1.5"/>
    ${txt(160, 130, "bei f/8 scharf von 2 bis 5 m", "text-anchor:middle")}
    ${small(160, 150, "Ring auf 3 m, nicht mehr fokussieren, nur auslösen", "text-anchor:middle")}
  `),
  // Panning: the tram sharp, the background streaked.
  mitziehen: () => wrap(`
    ${[30, 40, 50, 60, 70, 80, 90, 100].map((y) => `<path d="M24 ${y} h272" stroke="${M}" stroke-width="2" stroke-dasharray="${8 + (y % 20)} 10"/>`).join("")}
    <rect x="96" y="44" width="128" height="50" rx="8" fill="#0e1c14" stroke="${C}" stroke-width="2"/>
    ${[108, 134, 160, 186].map((x) => `<rect x="${x}" y="54" width="20" height="16" rx="2" fill="${D}" stroke="${C}" stroke-width="1"/>`).join("")}
    <circle cx="124" cy="98" r="6" fill="${C}"/><circle cx="196" cy="98" r="6" fill="${C}"/>
    <path d="M232 120 h40" stroke="${G}" stroke-width="2" marker-end="url(#ag-arr3)"/>
    <defs><marker id="ag-arr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${G}"/></marker></defs>
    ${small(232, 134, "Kamera dreht mit", `fill:${G}`)}
    ${txt(24, 150, "1/15 · f/16 · auslösen, während du drehst")}
  `),
  // Rewind: three moves in order.
  rueckspulen: () => wrap(`
    ${[["1", "Knopf am Boden drücken", 56], ["2", "Kurbel drehen, bis sie leicht geht", 160], ["3", "erst dann die Rückwand öffnen", 264]].map(([n, l, x]) => `
      <circle cx="${x}" cy="52" r="22" fill="${D}" stroke="${n === "3" ? GR : C}" stroke-width="1.5"/>
      <text x="${x}" y="58" text-anchor="middle" style="${T};font-size:16px">${n}</text>
      <foreignObject x="${x - 50}" y="82" width="100" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:9.5px;line-height:1.3;font-family:inherit;color:${C};opacity:.85;text-align:center">${l}</div></foreignObject>`).join("")}
    <path d="M80 52 h54 M184 52 h54" stroke="${M}" stroke-width="1" stroke-dasharray="3 3"/>
  `, 122)
};

export function figureHtml(key) {
  const f = FIGUREN[key];
  return f ? f() : "";
}
export const FIGURE_KEYS = Object.keys(FIGUREN);
