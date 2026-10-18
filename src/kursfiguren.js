// ── Kursfiguren ──────────────────────────────────────────────────────────────
// Small inline infographics for course steps, keyed by name. A step says
// `"figure": "blende"` and the drawing goes above its text. All drawn in the
// app's cream on the card's dark glass, no images to load. Drawn for a
// Canon AE-1 / FT QL, which is what hangs around the neck today.

const C = "#f1e9d2", M = "rgba(241,233,210,.45)", G = "#e0a75d", GR = "#8fcf9e", B = "#8ab8cf", LEAF = "#3e8a55", D = "rgba(241,233,210,.12)";
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
  `, 122),

  // ── Portugal, in five small pictures ──────────────────────────────────
  // Not diagrams but little icons: the thing to photograph, drawn cute,
  // with the one exposure line that matters underneath.
  // A wall of azulejos, four tiles, petals around a dot.
  azulejo: () => wrap(`
    ${[0, 1, 2, 3].map((i) => { const x = 104 + (i % 2) * 56, y = 14 + Math.floor(i / 2) * 44; return `
      <rect x="${x}" y="${y}" width="54" height="42" rx="3" fill="${D}" stroke="${C}" stroke-width="1.2"/>
      <circle cx="${x + 27}" cy="${y + 21}" r="4" fill="${B}"/>
      ${[[0, -11], [11, 0], [0, 11], [-11, 0]].map(([dx, dy]) => `<ellipse cx="${x + 27 + dx}" cy="${y + 21 + dy}" rx="${dx ? 7 : 4}" ry="${dx ? 4 : 7}" fill="none" stroke="${B}" stroke-width="1.6"/>`).join("")}
      ${[[4, 4], [50, 4], [4, 38], [50, 38]].map(([cx, cy]) => `<circle cx="${x + cx}" cy="${y + cy}" r="1.6" fill="${B}"/>`).join("")}`; }).join("")}
    <path d="M60 60 h30 M226 60 h30" stroke="${M}" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="48" cy="60" r="5" fill="none" stroke="${G}" stroke-width="1.5"/><circle cx="48" cy="60" r="1.5" fill="${G}"/>
    ${txt(160, 114, "frontal · f/8 · Fugen gerade", "text-anchor:middle")}
  `, 122),
  // A pastel de nata with its scorched top, a bica beside it.
  nata: () => wrap(`
    <path d="M118 52 l4 36 q38 10 76 0 l4 -36 q-42 -8 -84 0z" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    ${[126, 140, 154, 168, 182, 196].map((x) => `<path d="M${x} 56 l3 30" stroke="${M}" stroke-width="1"/>`).join("")}
    <ellipse cx="160" cy="52" rx="42" ry="12" fill="${G}" stroke="${C}" stroke-width="1.5"/>
    ${[[146, 50], [162, 46], [174, 54], [155, 57]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.6" fill="#5a3a1a" opacity=".85"/>`).join("")}
    ${[150, 160, 170].map((x, i) => `<path d="M${x} ${34 - i * 2} q-5 -8 0 -16" stroke="${M}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`).join("")}
    <path d="M236 70 h30 v16 q0 8 -8 8 h-14 q-8 0 -8 -8z" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <path d="M266 76 q10 0 10 7 q0 7 -10 7" fill="none" stroke="${C}" stroke-width="1.5"/>
    <ellipse cx="251" cy="94" rx="14" ry="2" fill="none" stroke="${M}" stroke-width="1"/>
    <circle cx="70" cy="70" r="14" fill="none" stroke="${G}" stroke-width="1.5"/><circle cx="70" cy="70" r="6" fill="${G}"/>
    ${small(70, 98, "0,6 m", "text-anchor:middle")}
    ${txt(160, 114, "nah ran · f/4 · 1/60 · Ellbogen auf den Tisch", "text-anchor:middle")}
  `, 122),
  // A door in a colour you like, with its enamel number.
  tuer: () => wrap(`
    <rect x="124" y="14" width="72" height="92" rx="4" fill="${GR}" opacity=".9"/>
    <rect x="132" y="22" width="56" height="30" rx="3" fill="none" stroke="#0e1c14" stroke-width="1.5" opacity=".6"/>
    <rect x="132" y="60" width="56" height="40" rx="3" fill="none" stroke="#0e1c14" stroke-width="1.5" opacity=".6"/>
    <circle cx="182" cy="68" r="3.5" fill="${G}"/>
    <rect x="146" y="2" width="28" height="12" rx="2" fill="${C}"/>
    <text x="160" y="11.5" text-anchor="middle" style="${T};font-size:8.5px;fill:#0e1c14;font-weight:700">17</text>
    ${[0, 1, 2].map((i) => `<rect x="${98}" y="${16 + i * 30}" width="22" height="26" rx="2" fill="${D}" stroke="${B}" stroke-width="1"/><rect x="${200}" y="${16 + i * 30}" width="22" height="26" rx="2" fill="${D}" stroke="${B}" stroke-width="1"/>`).join("")}
    <path d="M60 60 h26" stroke="${G}" stroke-width="1.5"/><circle cx="54" cy="60" r="4" fill="${G}"/>
    ${small(70, 50, "2 m", "text-anchor:middle")}
    <path d="M258 60 h20" stroke="${M}" stroke-width="1.5" stroke-dasharray="3 3"/>
    ${txt(160, 120, "Zonenfokus 2 m · f/8 · hinstellen, drücken", "text-anchor:middle")}
  `, 128),
  // A little yellow tram, mid-pan.
  tram: () => wrap(`
    ${[34, 52, 70].map((y, i) => `<path d="M22 ${y} h${50 + i * 14}" stroke="${M}" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 8"/>`).join("")}
    <path d="M160 18 v10 M146 20 l14 8 l14 -8" stroke="${C}" stroke-width="1.5" fill="none"/>
    <rect x="108" y="28" width="104" height="58" rx="10" fill="${G}" stroke="${C}" stroke-width="1.5"/>
    ${[118, 144, 170].map((x) => `<rect x="${x}" y="38" width="20" height="18" rx="3" fill="#0e1c14" opacity=".75"/>`).join("")}
    <rect x="196" y="38" width="10" height="18" rx="3" fill="#0e1c14" opacity=".75"/>
    <rect x="108" y="66" width="104" height="6" fill="#0e1c14" opacity=".35"/>
    <circle cx="130" cy="90" r="7" fill="#0e1c14" stroke="${C}" stroke-width="1.5"/><circle cx="190" cy="90" r="7" fill="#0e1c14" stroke="${C}" stroke-width="1.5"/>
    <circle cx="204" cy="78" r="3" fill="${C}"/>
    <path d="M230 90 h30" stroke="${G}" stroke-width="2" marker-end="url(#ag-arr4)"/>
    <defs><marker id="ag-arr4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${G}"/></marker></defs>
    ${txt(160, 114, "1/30 · mitdrehen · drei Versuche", "text-anchor:middle")}
  `, 122),
  // The two of us and the sea: sun low, waves, a wall for the camera.
  meer: () => wrap(`
    <circle cx="238" cy="52" r="16" fill="${G}"/>
    <rect x="20" y="52" width="280" height="30" fill="#0e1c14"/>
    <path d="M20 52 h280" stroke="${C}" stroke-width="1.5"/>
    ${[62, 72].map((y) => `<path d="M24 ${y} q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t16 0" fill="none" stroke="${B}" stroke-width="1.5"/>`).join("")}
    <circle cx="124" cy="80" r="7" fill="${C}"/><path d="M124 87 v18 M114 96 h20 M124 105 l-7 12 M124 105 l7 12" stroke="${C}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="150" cy="80" r="7" fill="${G}"/><path d="M150 87 v18 M140 96 h20 M150 105 l-7 12 M150 105 l7 12" stroke="${G}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M137 70 c-5 -4 -6 -9 -2 -10 c2 0 3 2 3 3 c0 -1 1 -3 3 -3 c4 1 3 6 -2 10z" fill="${GR}"/>
    <rect x="40" y="90" width="40" height="26" rx="2" fill="${D}" stroke="${C}" stroke-width="1.2"/>
    <rect x="50" y="80" width="20" height="12" rx="2" fill="#0e1c14" stroke="${C}" stroke-width="1.2"/><circle cx="60" cy="86" r="3.5" fill="none" stroke="${C}" stroke-width="1.2"/>
    ${small(60, 126, "Mauer + Selbstauslöser", "text-anchor:middle")}
    ${txt(160, 142, "f/8 · 1/250 · Selbstauslöser · dann zu mir laufen", "text-anchor:middle")}
  `, 150),

  // ── Lisbon, three small pictures ──────────────────────────────────────
  // The Bica funicular on its slope, houses either side.
  elevador: () => wrap(`
    <path d="M30 100 L290 36" stroke="${M}" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 108 L290 44" stroke="${M}" stroke-width="3" stroke-linecap="round"/>
    ${[[40, 48, 30], [78, 40, 34], [240, 0, 26], [274, -6, 30]].map(([x, y, h]) => `
      <rect x="${x}" y="${y + 20}" width="26" height="${h}" fill="${D}" stroke="${C}" stroke-width="1"/>
      <rect x="${x + 7}" y="${y + 28}" width="6" height="8" fill="${B}" opacity=".8"/><rect x="${x + 7}" y="${y + 42}" width="6" height="8" fill="${B}" opacity=".8"/>`).join("")}
    <g transform="translate(160 72) rotate(-14)">
      <rect x="-40" y="-26" width="80" height="40" rx="8" fill="${G}" stroke="${C}" stroke-width="1.5"/>
      ${[-30, -8, 14].map((x) => `<rect x="${x}" y="-18" width="16" height="14" rx="2" fill="#0e1c14" opacity=".75"/>`).join("")}
      <circle cx="-22" cy="18" r="5" fill="#0e1c14" stroke="${C}" stroke-width="1.5"/><circle cx="22" cy="18" r="5" fill="#0e1c14" stroke="${C}" stroke-width="1.5"/>
      <path d="M0 -26 v-10 M-8 -30 l8 -6 l8 6" stroke="${C}" stroke-width="1.5" fill="none"/>
    </g>
    <path d="M150 50 c-4 -3 -5 -7 -2 -8 c2 0 2 2 2 2 c0 0 0 -2 2 -2 c3 1 2 5 -2 8z" fill="${GR}"/>
    ${txt(160, 122, "oben einsteigen, unten aussteigen, dann zu Fuss zurück", "text-anchor:middle")}
  `, 130),
  // A viewpoint at sunset: railing, rooftops, the river, a glass of ginjinha.
  miradouro: () => wrap(`
    <circle cx="200" cy="48" r="14" fill="${G}"/>
    <rect x="20" y="48" width="280" height="14" fill="${B}" opacity=".45"/>
    ${[[30, 70, 18], [52, 64, 24], [80, 72, 16], [100, 60, 28], [132, 68, 20], [156, 74, 14], [174, 64, 22], [200, 70, 18], [222, 62, 26], [252, 72, 16], [272, 66, 22]].map(([x, y, w]) => `
      <rect x="${x}" y="${y}" width="${w}" height="${90 - y}" fill="${D}" stroke="${C}" stroke-width=".8"/>
      <path d="M${x} ${y} l${w / 2} -6 l${w / 2} 6" fill="#b9432c" opacity=".8"/>`).join("")}
    <path d="M20 92 h280" stroke="${C}" stroke-width="2"/>
    ${[40, 70, 100, 130, 160, 190, 220, 250, 280].map((x) => `<path d="M${x} 92 v16" stroke="${C}" stroke-width="1.5"/>`).join("")}
    <path d="M20 108 h280" stroke="${C}" stroke-width="2"/>
    <path d="M280 80 l5 22 h-14 l5 -22z" fill="#b9432c" stroke="${C}" stroke-width="1.2"/><path d="M272 80 h22" stroke="${C}" stroke-width="1.5"/>
    <path d="M60 86 c-5 -4 -6 -9 -2 -10 c2 0 3 2 3 3 c0 -1 1 -3 3 -3 c4 1 3 6 -2 10z" fill="${GR}"/>
    ${txt(160, 128, "kurz vor Sonnenuntergang da sein, dann nichts mehr tun", "text-anchor:middle")}
  `, 136),
  // Casa do Alentejo: a plain door, and behind it horseshoe arches and tiles.
  arcos: () => wrap(`
    <rect x="22" y="30" width="56" height="86" rx="3" fill="${D}" stroke="${C}" stroke-width="1.2"/>
    <rect x="36" y="48" width="28" height="68" rx="2" fill="#0e1c14" stroke="${C}" stroke-width="1.2"/><circle cx="58" cy="84" r="2" fill="${G}"/>
    ${small(22, 128, "Portas de Sto. Antão 58")}
    <path d="M90 74 h12" stroke="${M}" stroke-width="1.5" stroke-dasharray="3 3"/>
    ${[124, 182, 240].map((x) => `
      <path d="M${x - 22} 116 v-50 a22 22 0 0 1 44 0 v50" fill="${D}" stroke="${G}" stroke-width="1.8"/>
      <path d="M${x - 22} 66 a22 22 0 0 1 44 0" fill="none" stroke="${G}" stroke-width="1.8" stroke-dasharray="4 3"/>
      <circle cx="${x}" cy="60" r="3" fill="${B}"/>`).join("")}
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${106 + i * 26}" y="116" width="24" height="10" fill="none" stroke="${B}" stroke-width="1"/><circle cx="${118 + i * 26}" cy="121" r="2" fill="${B}"/>`).join("")}
    ${txt(182, 30, "drinnen: Hof, Kacheln, Kaffee im Salon", "text-anchor:middle")}
  `, 134),
  // Panorâmico de Monsanto: the round concrete ring on the hill, painted all over.
  panoramico: () => wrap(`
    <circle cx="246" cy="40" r="13" fill="${G}"/>
    <path d="M20 118 q140 -70 280 0z" fill="${D}" stroke="${C}" stroke-width="1"/>
    ${[[60, 102], [100, 92], [220, 90], [262, 100]].map(([x, y]) => `<path d="M${x} ${y} l-6 14 h12z M${x} ${y - 8} l-5 12 h10z" fill="${LEAF}"/>`).join("")}
    <rect x="150" y="80" width="20" height="30" fill="${D}" stroke="${C}" stroke-width="1.2"/>
    <ellipse cx="160" cy="80" rx="52" ry="12" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <ellipse cx="160" cy="68" rx="52" ry="12" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <path d="M108 68 v12 M212 68 v12" stroke="${C}" stroke-width="1.5"/>
    ${[[118, 74, "#e85d75"], [134, 72, GR], [150, 76, B], [168, 72, G], [186, 75, "#e85d75"], [202, 73, B]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="10" height="6" rx="2" fill="${c}" opacity=".85"/>`).join("")}
    <ellipse cx="160" cy="56" rx="52" ry="12" fill="none" stroke="${C}" stroke-width="1.5"/>
    <path d="M108 56 v12 M212 56 v12" stroke="${C}" stroke-width="1.5"/>
    ${[[-30, 0], [30, 0], [0, -8]].map(([dx, dy]) => `<circle cx="${160 + dx}" cy="${52 + dy}" r="2" fill="${C}"/>`).join("")}
    ${small(160, 36, "360°", "text-anchor:middle;fill:" + G)}
    ${txt(160, 134, "goldene Stunde oben · bleiben, bis es dunkel ist", "text-anchor:middle")}
  `, 142),
  // Prazeres: cypress avenues, the bridge beyond, the tram's last stop.
  zypressen: () => wrap(`
    <path d="M20 54 h280" stroke="${M}" stroke-width="1"/>
    <path d="M190 54 v-14 M230 54 v-14 M180 44 h60 M178 54 c18 -14 36 -14 54 0" stroke="#b9432c" stroke-width="1.5" fill="none"/>
    ${[[40, 1], [66, .85], [90, .7], [110, .58], [126, .48], [194, .48], [210, .58], [230, .7], [254, .85], [280, 1]].map(([x, k]) => `
      <path d="M${x} ${106} l${-8 * k} 0 l${8 * k} ${-62 * k} l${8 * k} ${62 * k}z" fill="${LEAF}"/>
      <path d="M${x} ${106} v${-62 * k}" stroke="#0e1c14" stroke-width="1" opacity=".5"/>`).join("")}
    <path d="M128 106 L160 56 L192 106z" fill="${D}" stroke="${M}" stroke-width="1"/>
    <path d="M20 106 h280" stroke="${C}" stroke-width="1.5"/>
    <rect x="22" y="110" width="30" height="16" rx="5" fill="${G}" stroke="${C}" stroke-width="1"/><rect x="28" y="113" width="6" height="6" fill="#0e1c14" opacity=".7"/><rect x="38" y="113" width="6" height="6" fill="#0e1c14" opacity=".7"/>
    ${small(66, 122, "28, Endstation")}
    ${small(300, 36, "Ponte 25 de Abril", "text-anchor:end")}
    ${txt(160, 140, "die Alleen entlang, dann ein Pastel bei Aloma", "text-anchor:middle")}
  `, 148)
};

export function figureHtml(key) {
  const f = FIGUREN[key];
  return f ? f() : "";
}
export const FIGURE_KEYS = Object.keys(FIGUREN);
