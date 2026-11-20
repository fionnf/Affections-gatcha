import { TRIP, STOPS, PACK, PARTS, LESSONS, TASKS, BINGO, QUIZ, QUIZ_RATING, LIGHT_NOTE } from "./content.js";
import {
  APERTURES, SHUTTERS, ISOS, LIGHTS, exposureStops, judge, suggestShutter, shutterReach,
  shutterLabel, apertureLabel, blurOf, brightnessOf
} from "./exposure.js";

// ── State: one blob in localStorage, one section per person ──────────────────
const KEY = "lugano-2026-11-21:v1";
const ROLL = 36;

const blank = () => ({
  lessons: {}, tasks: {}, bingo: {}, pack: {}, log: [],
  quiz: { i: 0, answers: {} },
  sim: { light: "sonne", iso: 200, N: 16, t: 1 / 250 },   // opens on a correct exposure, so one turn of a dial breaks it
  sunny: { light: "sonne", iso: 200, N: 16 },
  draft: { N: 8, t: 1 / 250, light: "sonne" }
});
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (s && typeof s === "object") return { who: s.who || null, people: s.people || {} };
  } catch (_e) { /* private mode or damaged: start fresh */ }
  return { who: null, people: {} };
}
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_e) { /* full or blocked: still works this visit */ } }
function me() {
  if (!S.who) return blank();
  const m = S.people[S.who] || (S.people[S.who] = blank());
  for (const [k, v] of Object.entries(blank())) if (m[k] === undefined) m[k] = v;   // older saves
  return m;
}
const nameOf = (id) => (TRIP.people.find((p) => p.id === id) || {}).name || "";

// ── small helpers ────────────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function toast(msg) {
  const old = $(".toast"); if (old) old.remove();
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}
function confetti(emojis = ["🎞️", "📸", "💚", "✨", "🌸", "🧡"]) {
  if (reduced()) return;
  for (let i = 0; i < 26; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    el.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
}

// ── numbers for the progress boxes ───────────────────────────────────────────
const myTasks = () => TASKS.filter((t) => t.who === S.who);
const allTasks = () => TASKS.filter((t) => t.who === "all");
const stats = () => {
  const m = me();
  const tasks = [...myTasks(), ...allTasks()];
  return {
    tasks: tasks.filter((t) => m.tasks[t.id]).length, tasksOf: tasks.length,
    school: LESSONS.filter((l) => m.lessons[l.id] !== undefined).length, schoolOf: LESSONS.length,
    quiz: Object.keys(m.quiz.answers).length, quizOf: QUIZ.length,
    right: QUIZ.filter((q) => m.quiz.answers[q.id] === q.correct).length
  };
};

// ── pictures ─────────────────────────────────────────────────────────────────
const heroSvg = () => `
<svg viewBox="0 0 640 260" role="img" aria-label="Der Luganersee mit dem Monte Brè und einer Standseilbahn">
  <defs>
    <linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c9a0"/><stop offset=".7" stop-color="#f8e4c8"/><stop offset="1" stop-color="#fbf1df"/></linearGradient>
    <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f9a96"/><stop offset="1" stop-color="#2a7b78"/></linearGradient>
  </defs>
  <rect width="640" height="260" fill="url(#hs)"/>
  <circle cx="500" cy="64" r="26" fill="#fff3d6" opacity=".95"/>
  <path d="M0 150 L70 92 L120 120 L190 60 L260 118 L330 84 L410 132 L500 96 L570 128 L640 100 L640 190 L0 190Z" fill="#8fb0a4"/>
  <path d="M0 175 L90 118 L160 150 L250 96 L330 148 L420 110 L510 158 L640 122 L640 200 L0 200Z" fill="#5f8c7d"/>
  <path d="M0 200 L640 200 L640 260 L0 260Z" fill="url(#hl)"/>
  <g stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"><path d="M60 222h60M200 236h80M380 224h70M520 240h60"/></g>
  <path d="M250 96 L120 196" stroke="#1c2822" stroke-width="2" stroke-dasharray="3 4"/>
  <rect x="176" y="136" width="22" height="14" rx="3" fill="#e0702a" transform="rotate(-38 187 143)"/>
  <g transform="translate(430 206)"><path d="M0 0h46l-8 12H8z" fill="#fff"/><path d="M23 0V-30l22 28z" fill="#fbf1df"/><path d="M23 0V-34l-14 30z" fill="#e0702a"/></g>
</svg>`;

// Rollo: the camera whose lens is a face. Moods: happy, wow, sleepy.
const mascot = (mood = "happy", cls = "") => {
  const eyes = mood === "sleepy"
    ? `<path d="M41 62q7 6 14 0M65 62q7 6 14 0" stroke="#2b1620" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<g class="eyes"><ellipse cx="48" cy="62" rx="5" ry="6.5" fill="#2b1620"/><ellipse cx="72" cy="62" rx="5" ry="6.5" fill="#2b1620"/><circle cx="49.8" cy="59.5" r="1.9" fill="#fff"/><circle cx="73.8" cy="59.5" r="1.9" fill="#fff"/></g>`;
  const mouth = mood === "wow"
    ? `<ellipse cx="60" cy="79" rx="5" ry="6" fill="#7a2b3a"/>`
    : `<path d="M52 76q8 9 16 0" stroke="#7a2b3a" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  return `<svg class="mascot ${cls}" viewBox="0 0 120 112" aria-hidden="true">
    <rect x="8" y="26" width="104" height="80" rx="26" fill="#ff9fb2"/>
    <rect x="42" y="10" width="34" height="22" rx="9" fill="#ff9fb2"/>
    <rect x="84" y="14" width="16" height="11" rx="4" fill="#fff3b0"/>
    <circle cx="24" cy="24" r="7" fill="#ff7d96"/>
    <circle cx="60" cy="66" r="33" fill="#fff6f0" stroke="#f0728a" stroke-width="5"/>
    ${eyes}${mouth}
    <ellipse cx="37" cy="74" rx="6.5" ry="4" fill="#ff9fb2" opacity=".75"/><ellipse cx="83" cy="74" rx="6.5" ry="4" fill="#ff9fb2" opacity=".75"/>
  </svg>`;
};

const sceneSvg = () => `
<svg viewBox="0 0 320 200" role="img" aria-label="Szene: Berge, See, Boot, Pfosten im Vordergrund">
  <defs>
    <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ec9e6"/><stop offset="1" stop-color="#f7e3c4"/></linearGradient>
    <linearGradient id="lk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa5a6"/><stop offset="1" stop-color="#2d7c80"/></linearGradient>
    <filter id="bFar"><feGaussianBlur id="gFar" stdDeviation="0"/></filter>
    <filter id="bNear"><feGaussianBlur id="gNear" stdDeviation="0"/></filter>
    <filter id="bMove" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur id="gMove" stdDeviation="0 0"/></filter>
  </defs>
  <g id="far" filter="url(#bFar)">
    <rect width="320" height="130" fill="url(#sk)"/>
    <circle cx="250" cy="38" r="15" fill="#fff6dc"/>
    <path d="M0 118 L48 66 L92 98 L140 52 L196 108 L250 78 L320 112 L320 132 L0 132Z" fill="#7da596"/>
    <path d="M0 126 L80 92 L150 118 L230 86 L320 120 L320 134 L0 134Z" fill="#5f8c7d"/>
  </g>
  <rect y="130" width="320" height="70" fill="url(#lk)"/>
  <g id="boat" filter="url(#bMove)"><path d="M118 150h56l-9 14h-38z" fill="#fff"/><path d="M146 150v-38l26 36z" fill="#fbf1df"/><path d="M146 150v-42l-17 38z" fill="#e0702a"/></g>
  <g id="near" filter="url(#bNear)"><rect x="14" y="40" width="16" height="160" rx="4" fill="#2b2118"/><path d="M30 80c22-6 34 4 40 16-18 0-30-4-40-10z" fill="#3f6f4b"/><path d="M14 120c-18 0-26 12-28 20 16 0 26-6 28-12z" fill="#3f6f4b"/></g>
</svg>`;

const cameraSvg = (on) => {
  const spots = { 1: [302, 34], 2: [252, 38], 3: [276, 66], 4: [230, 64], 5: [36, 32], 6: [36, 66], 7: [160, 70], 8: [160, 178] };
  const dots = PARTS.map((p) => {
    const [x, y] = spots[p.n];
    return `<g data-part="${p.id}" role="button" tabindex="0" aria-label="${esc(p.name)}"><circle class="dot ${on === p.id ? "on" : ""}" cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 4}">${p.n}</text></g>`;
  }).join("");
  return `<svg viewBox="0 0 320 200" role="img" aria-label="Schema einer Spiegelreflexkamera">
    <rect x="10" y="56" width="300" height="118" rx="10" fill="#2a2f2c"/>
    <rect x="10" y="44" width="300" height="26" rx="6" fill="#c9c9c4"/>
    <path d="M122 44L136 18h48l14 26z" fill="#b9b9b3"/>
    <rect x="212" y="52" width="26" height="12" rx="2" fill="#2a2f2c"/>
    <circle cx="36" cy="46" r="14" fill="#a8a8a2"/><circle cx="36" cy="46" r="8" fill="#d7d7d2"/>
    <circle cx="276" cy="52" r="14" fill="#a8a8a2"/><circle cx="276" cy="52" r="9" fill="#d7d7d2"/>
    <circle cx="160" cy="124" r="52" fill="#171a18"/><circle cx="160" cy="124" r="44" fill="#3a403c"/>
    <circle cx="160" cy="124" r="36" fill="#1d211f"/><circle cx="160" cy="124" r="22" fill="#0e1210"/><circle cx="150" cy="116" r="6" fill="#fff" opacity=".18"/>
    ${dots}</svg>`;
};

const composeSvgs = {
  drittel: `<svg viewBox="0 0 160 110"><g stroke="#999" stroke-width="1"><path d="M53 0v110M107 0v110M0 37h160M0 73h160"/></g><circle cx="107" cy="37" r="9" fill="#e0702a"/></svg>`,
  linien: `<svg viewBox="0 0 160 110"><g stroke="#e0702a" stroke-width="3" stroke-linecap="round"><path d="M10 108L74 40M70 108L84 42M150 108L92 42"/></g><circle cx="82" cy="36" r="7" fill="#2a7b78"/></svg>`,
  rahmen: `<svg viewBox="0 0 160 110"><rect x="4" y="4" width="152" height="102" fill="#2b2118"/><path d="M34 90V56a46 36 0 0 1 92 0V90z" fill="#9ec9e6"/><path d="M34 90L70 52l24 22 16-14 16 30z" fill="#5f8c7d"/></svg>`,
  ebenen: `<svg viewBox="0 0 160 110"><path d="M0 70L40 36 80 62 120 30 160 56V110H0z" fill="#8fb0a4"/><path d="M0 92L60 66 120 90 160 74V110H0z" fill="#5f8c7d"/><rect x="12" y="50" width="12" height="60" fill="#2b2118"/><path d="M24 70c16-4 24 2 28 10-14 0-22-3-28-6z" fill="#3f6f4b"/></svg>`
};

const focusScene = () => `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="#9ec9e6"/><circle cx="150" cy="50" r="18" fill="#fff6dc"/><path d="M0 130L50 70l40 40 40-60 70 80v70H0z" fill="#5f8c7d"/><path d="M0 160l60-30 50 24 90-36v82H0z" fill="#2f6a62"/><rect x="88" y="96" width="8" height="70" fill="#e0702a"/><path d="M92 96l28 8-28 10z" fill="#e0702a"/></svg>`;

// ── views ────────────────────────────────────────────────────────────────────
function whoView() {
  return `<div class="wrap fade" style="padding-top:22px">
    <div class="who-top">${mascot("happy", "bob")}</div>
    <p class="kicker">${esc(TRIP.where)} · ${esc(TRIP.date)}</p>
    <h1 style="font-size:2.2rem">Hallo! Wer bist du?</h1>
    <p class="muted">Das merkt sich dein Handy. Jeder hat seine eigene Liste, sein Logbuch und seinen Punktestand.</p>
    <div class="who-pick">${TRIP.people.map((p) => `<button data-act="who" data-id="${p.id}">${esc(p.name)}</button>`).join("")}</div>
  </div>`;
}

function tagView() {
  const st = stats();
  const m = me();
  const stops = STOPS.map((s) => `
    <div class="stop">
      <div class="ic" aria-hidden="true">${s.icon}</div>
      <div>
        <h3>${esc(s.title)}</h3>
        <div class="sub">${esc(s.sub)}</div>
        <details><summary>Mehr</summary>
          <div class="more">${esc(s.fact)}
            <b>Das Licht</b>${esc(s.light)}
            <b>Aufgaben hier</b><a href="#aufgaben/stop-${s.id}" style="color:var(--accent);font-weight:600">${TASKS.filter((t) => (t.who === S.who || t.who === "all") && t.stop === s.id).length} Stück ansehen</a>
          </div>
        </details>
      </div>
    </div>`).join("");
  const pack = PACK.map((p) => `<label><input type="checkbox" data-act="pack" data-id="${p.id}" ${m.pack[p.id] ? "checked" : ""}><span>${esc(p.text)}</span></label>`).join("");
  return `<div class="wrap fade">
    <section class="hero"><div class="perfs"></div><div class="heroimg">${heroSvg()}${mascot("happy", "bob")}</div>
      <div class="txt"><p class="kicker">${esc(TRIP.where)} · ${esc(TRIP.date)}</p>
        <h1>${esc(TRIP.title)}</h1>
        <p class="sub">${TRIP.people.map((p) => esc(p.name)).join(" · ")}. Heute ist der Berg dran, dann der See, und dazwischen ein ganzer Film.</p></div>
      <div class="perfs"></div></section>
    <div class="progress">
      <a class="pbox" href="#aufgaben" style="text-decoration:none;color:inherit"><b>${st.tasks}/${st.tasksOf}</b><small>Aufgaben</small><div class="bar"><i style="width:${pct(st.tasks, st.tasksOf)}%"></i></div></a>
      <a class="pbox" href="#schule" style="text-decoration:none;color:inherit"><b>${st.school}/${st.schoolOf}</b><small>Schule</small><div class="bar"><i style="width:${pct(st.school, st.schoolOf)}%"></i></div></a>
      <a class="pbox" href="#quiz" style="text-decoration:none;color:inherit"><b>${st.right}/${st.quizOf}</b><small>Quiz</small><div class="bar"><i style="width:${pct(st.quiz, st.quizOf)}%"></i></div></a>
    </div>
    <div class="section-title">Der Plan, Stand heute</div>
    <div class="card" style="padding:6px 14px">${stops}</div>
    <p class="muted small" style="margin:0 4px 6px">Ändert sich der Plan, ändern sich die Karten nicht mit. Sie sind Vorschläge, keine Vorschriften.</p>
    <div class="section-title">Packliste</div>
    <div class="card pack">${pack}</div>
  </div>`;
}

// Kamera-Schule ---------------------------------------------------------------
function schuleView(arg) {
  const m = me();
  if (arg === undefined || !LESSONS[Number(arg)]) {
    const done = LESSONS.filter((l) => m.lessons[l.id] !== undefined).length;
    const right = LESSONS.filter((l) => m.lessons[l.id] === l.check.correct).length;
    const rows = LESSONS.map((l, i) => {
      const a = m.lessons[l.id];
      const tick = a === undefined ? `<span class="tick"></span>` : a === l.check.correct ? `<span class="tick ok">✓</span>` : `<span class="tick no">·</span>`;
      return `<button class="lesson-row" data-act="go" data-to="schule/${i}"><span class="ic">${l.emoji}</span><span><b>${i + 1}. ${esc(l.title)}</b><small>${l.minutes} Min.</small></span>${tick}</button>`;
    }).join("");
    const diploma = done === LESSONS.length ? `<div class="diploma">${mascot("wow", "bob")}<p class="kicker">Kamera-Schule</p><h2>${esc(nameOf(S.who))} ist bereit für 36 Bilder</h2><p class="muted">${right} von ${LESSONS.length} Fragen gleich richtig.</p></div>` : "";
    return `<div class="wrap fade"><h1 style="font-size:1.9rem;margin:4px 0 6px">Kamera-Schule</h1>
      <p class="muted">Sieben kurze Lektionen, zwei Minuten pro Stück. Nicht zum Auswendiglernen: zum Nachschlagen, wenn es auf dem Berg windig wird.</p>
      ${diploma}${rows}</div>`;
  }
  const i = Number(arg);
  const l = LESSONS[i];
  const body = l.blocks.map((b) => {
    if (b.type === "p") return `<p>${esc(b.text)}</p>`;
    if (b.type === "tip") return `<div class="tip">${esc(b.text)}</div>`;
    if (b.type === "steps") return `<ol class="steps">${b.items.map((t) => `<li><span>${esc(t)}</span></li>`).join("")}</ol>`;
    if (b.type === "parts") return partsHtml(partSel);
    if (b.type === "sim") return simHtml();
    if (b.type === "sunny") return sunnyHtml();
    if (b.type === "focus") return focusHtml();
    if (b.type === "compose") return composeHtml();
    return "";
  }).join("");
  const a = m.lessons[l.id];
  const opts = l.check.options.map((o, k) => {
    let cls = "";
    if (a !== undefined) cls = k === l.check.correct ? "right" : k === a ? "wrong" : "";
    return `<button class="opt ${cls}" data-act="check" data-lesson="${l.id}" data-k="${k}" ${a !== undefined ? "disabled" : ""}>${esc(o)}</button>`;
  }).join("");
  const why = a === undefined ? "" : `<p class="why"><b>${a === l.check.correct ? "Richtig." : "Nicht ganz."}</b> ${esc(l.check.why)}</p>`;
  return `<div class="wrap lesson fade">
    <button class="mini" data-act="go" data-to="schule" style="margin-bottom:8px">‹ Alle Lektionen</button>
    <div class="dots">${LESSONS.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>
    <h1>${l.emoji} ${esc(l.title)}</h1>${body}
    <div class="check"><h3>Kurz geprüft</h3><p>${esc(l.check.q)}</p>${opts}${why}</div>
    <div class="lnav">
      ${i > 0 ? `<button class="btn ghost" data-act="go" data-to="schule/${i - 1}">‹ Zurück</button>` : "<span></span>"}
      ${i < LESSONS.length - 1 ? `<button class="btn" data-act="go" data-to="schule/${i + 1}">Weiter ›</button>` : `<button class="btn" data-act="go" data-to="schule">Fertig</button>`}
    </div></div>`;
}

let partSel = "hebel";
function partsHtml(sel) {
  const p = PARTS.find((x) => x.id === sel) || PARTS[0];
  return `<div class="cam" data-parts>${cameraSvg(p.id)}<div class="partbox"><b>${p.n}. ${esc(p.name)}</b><p>${esc(p.text)}</p></div></div>`;
}

function simHtml() {
  const s = me().sim;
  const light = LIGHTS.find((x) => x.id === s.light) || LIGHTS[0];
  const stops = exposureStops(light.ev, s.iso, s.N, s.t);
  const j = judge(stops);
  const b = blurOf(s.N, s.t);
  const motion = b.motion < 1.2 ? "Boot: scharf" : b.motion < 4 ? "Boot: leicht verwischt" : "Boot: verwischt";
  const depth = b.dof < 0.2 ? "Tiefe: alles scharf" : b.dof < 0.6 ? "Tiefe: Rand wird weich" : "Tiefe: Rand sehr weich";
  const chip = (cls, act, val, label, on) => `<button class="chip sm ${on ? "on" : ""}" data-act="${act}" data-v="${val}">${label}</button>`;
  return `<div class="sim" data-sim>
    <div class="scene" style="filter:brightness(${brightnessOf(stops).toFixed(2)})">${sceneSvg()}</div>
    <div class="readout"><span class="badge ${j.level}">${esc(j.text)}</span><span class="badge">${motion}</span><span class="badge">${depth}</span></div>
    <div class="lbl">Licht</div><div class="chips">${LIGHTS.map((x) => chip("", "sim-light", x.id, `${x.icon} ${x.label}`, x.id === s.light)).join("")}</div>
    <div class="lbl">Film (ISO)</div><div class="chips">${ISOS.map((x) => chip("", "sim-iso", x, x, x === s.iso)).join("")}</div>
    <div class="lbl">Blende</div><div class="chips">${APERTURES.map((x) => chip("", "sim-n", x, apertureLabel(x), x === s.N)).join("")}</div>
    <div class="lbl">Zeit</div><div class="chips">${SHUTTERS.map((x) => chip("", "sim-t", x, shutterLabel(x), Math.abs(x - s.t) < 1e-9)).join("")}</div>
  </div>`;
}
function applyBlur() {
  const s = me().sim, b = blurOf(s.N, s.t);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.setAttribute("stdDeviation", v); };
  set("gFar", (b.dof * 3.2).toFixed(2));
  set("gNear", (b.dof * 5).toFixed(2));
  set("gMove", `${b.motion.toFixed(2)} 0`);
}

function sunnyHtml() {
  const s = me().sunny;
  const light = LIGHTS.find((x) => x.id === s.light) || LIGHTS[0];
  const t = suggestShutter(light.ev, s.iso, s.N);
  const reach = shutterReach(light.ev, s.iso, s.N);
  const warn = reach === "zu-schnell"
    ? `Dafür müsste die Zeit kürzer sein als 1/1000, und so schnell ist das Rad nicht. Nimm eine kleinere Blende (grössere Zahl).`
    : reach === "zu-langsam" ? `Dafür müsste die Zeit länger sein als eine Sekunde. Mach die Blende grösser (kleinere Zahl) oder nimm einen empfindlicheren Film.` : "";
  const chip = (act, val, label, on) => `<button class="chip sm ${on ? "on" : ""}" data-act="${act}" data-v="${val}">${label}</button>`;
  return `<div class="card" data-sunny style="box-shadow:none">
    <div class="lbl" style="margin-top:0">Licht</div><div class="chips">${LIGHTS.slice(0, 5).map((x) => chip("sun-light", x.id, `${x.icon} ${x.label}`, x.id === s.light)).join("")}</div>
    <div class="lbl">Film (ISO)</div><div class="chips">${ISOS.map((x) => chip("sun-iso", x, x, x === s.iso)).join("")}</div>
    <div class="lbl">Blende, die du dir wünschst</div><div class="chips">${APERTURES.map((x) => chip("sun-n", x, apertureLabel(x), x === s.N)).join("")}</div>
    <p class="muted small" style="margin:12px 0 0">Dann stellst du ein:</p>
    <div class="answer">${apertureLabel(s.N)} · ${shutterLabel(t)}</div>
    ${warn ? `<p class="badge over2" style="display:block;border-radius:12px;margin:6px 0">${esc(warn)}</p>` : ""}
    <p class="muted small" style="margin:0">${esc(LIGHT_NOTE)}</p></div>`;
}

let focusTarget = 50;
function focusHtml() {
  focusTarget = 20 + Math.round(Math.random() * 60);
  const scene = focusScene();
  return `<div class="focus" data-focus>
    <div class="lens" data-lens><div class="half top" data-top>${scene}</div><div class="half bot">${scene}</div><div class="line"></div></div>
    <input type="range" min="0" max="100" value="${Math.random() < 0.5 ? 5 : 95}" data-focus-in aria-label="Entfernungsring">
    <p class="answer" data-focus-out style="text-align:center;min-height:2.2rem">Dreh, bis die Linie durchgeht.</p>
    <div style="text-align:center"><button class="chip" data-act="focus-new">Nochmal</button></div></div>`;
}
function updateFocus(v) {
  const diff = v - focusTarget;
  const lens = $("[data-lens]"), top = $("[data-top]"), out = $("[data-focus-out]");
  if (!lens || !top) return;
  top.style.transform = `translateX(${(diff * 0.9).toFixed(1)}px)`;
  lens.style.filter = `blur(${Math.min(5, Math.abs(diff) * 0.1).toFixed(2)}px)`;
  const sharp = Math.abs(diff) <= 2;
  out.textContent = sharp ? "Scharf. ✓" : Math.abs(diff) < 12 ? "Fast." : "Noch nicht.";
  if (sharp && !out.dataset.done) { out.dataset.done = "1"; if (!reduced() && navigator.vibrate) navigator.vibrate(15); }
  if (!sharp) delete out.dataset.done;
}

function composeHtml() {
  const items = [
    ["drittel", "Drittel", "Das Wichtige auf eine Kreuzung der Linien, nicht in die Mitte."],
    ["linien", "Führende Linien", "Wege, Mauern, Geländer ziehen das Auge zum Motiv."],
    ["rahmen", "Rahmen", "Bogen, Fenster, Äste: ein Rahmen im Rahmen."],
    ["ebenen", "Ebenen", "Vordergrund, Mitte, Hintergrund: So entsteht Tiefe."]
  ];
  return `<div class="compose">${items.map(([k, t, d]) => `<figure>${composeSvgs[k]}<figcaption><b>${t}</b>${esc(d)}</figcaption></figure>`).join("")}</div>`;
}

// Aufgaben --------------------------------------------------------------------
function aufgabenView(arg) {
  const m = me();
  const sub = arg === "zusammen" ? "zusammen" : arg === "bingo" ? "bingo" : "meine";
  const stopFilter = arg && arg.startsWith("stop-") ? arg.slice(5) : null;
  const tabs = `<div class="tabs">
    <button class="${sub === "meine" ? "on" : ""}" data-act="go" data-to="aufgaben">${esc(nameOf(S.who))}</button>
    <button class="${sub === "zusammen" ? "on" : ""}" data-act="go" data-to="aufgaben/zusammen">Zusammen</button>
    <button class="${sub === "bingo" ? "on" : ""}" data-act="go" data-to="aufgaben/bingo">Bingo</button></div>`;
  if (sub === "bingo") {
    const b = m.bingo;
    const lines = bingoLines(b);
    const inLine = new Set(lines.flat());
    return `<div class="wrap fade">${tabs}
      <p class="muted">Nur gucken, kein Foto nötig. Drei in einer Reihe, einer Spalte oder der Diagonale gibt ein Bingo.</p>
      <div class="bingo">${BINGO.map((x, k) => `<button class="${b[k] ? "on" : ""} ${inLine.has(k) ? "line" : ""}" data-act="bingo" data-k="${k}"><span>${x.icon}</span>${esc(x.text)}</button>`).join("")}</div>
      <p class="answer" style="text-align:center;margin-top:14px">${lines.length ? `Bingo! ×${lines.length}` : `${Object.values(b).filter(Boolean).length} von 9`}</p></div>`;
  }
  const list = sub === "zusammen" ? allTasks() : stopFilter ? [...myTasks(), ...allTasks()] : myTasks();
  const done = list.filter((t) => m.tasks[t.id]).length;
  const frames = list.reduce((n, t) => n + t.frames, 0);
  const groups = STOPS.map((s) => {
    const ts = list.filter((t) => t.stop === s.id);
    if (!ts.length || (stopFilter && s.id !== stopFilter)) return "";
    return `<div class="stop-h"><span>${s.icon}</span>${esc(s.title)}</div>` + ts.map((t) => `
      <div class="task ${m.tasks[t.id] ? "done" : ""}">
        <input type="checkbox" data-act="task" data-id="${t.id}" ${m.tasks[t.id] ? "checked" : ""} aria-label="${esc(t.title)}">
        <div><div class="t">${esc(t.title)}</div><div class="how">${esc(t.how)}</div>
        <div class="meta"><span class="tag skill">${esc(t.skill)}</span><span class="tag">${t.frames} ${t.frames === 1 ? "Bild" : "Bilder"}</span></div></div>
      </div>`).join("");
  }).join("");
  const intro = sub === "zusammen"
    ? "Für alle drei. Jeder macht sein Bild, verglichen wird beim Entwickeln."
    : `Deine Liste, ${esc(nameOf(S.who))}. Alles kann, nichts muss. Die Aufgaben brauchen zusammen etwa ${frames} Bilder, der Rest der Rolle gehört dir.`;
  return `<div class="wrap fade">${tabs}
    <div class="card" style="margin-bottom:6px"><div class="counter"><div><b>${done}/${list.length}</b> <span class="muted">erledigt</span></div>${stopFilter ? `<button class="mini" data-act="go" data-to="aufgaben">Alle zeigen</button>` : ""}</div>
      <div class="bar"><i style="width:${pct(done, list.length)}%"></i></div><p class="muted small" style="margin:8px 0 0">${intro}</p></div>
    ${groups}</div>`;
}
function bingoLines(b) {
  const L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  return L.filter((l) => l.every((k) => b[k]));
}

// Quiz ------------------------------------------------------------------------
function quizView() {
  const m = me(), qz = m.quiz;
  if (qz.i >= QUIZ.length) {
    const right = QUIZ.filter((q) => qz.answers[q.id] === q.correct).length;
    const rating = QUIZ_RATING.find((r) => right >= r.min);
    return `<div class="wrap fade"><div class="card" style="text-align:center">${mascot(right >= 8 ? "wow" : "happy", "bob")}<p class="kicker">Ergebnis</p><div class="score">${right}/${QUIZ.length}</div><p>${esc(rating.text)}</p>
      <p class="muted small">Vergleicht beim Mittagessen. Wer verliert, gibt die erste Runde aus.</p>
      <button class="btn block" data-act="quiz-again">Nochmal von vorn</button></div></div>`;
  }
  const q = QUIZ[qz.i];
  const a = qz.answers[q.id];
  const opts = q.options.map((o, k) => {
    let cls = "";
    if (a !== undefined) cls = k === q.correct ? "right" : k === a ? "wrong" : "";
    return `<button class="opt ${cls}" data-act="answer" data-k="${k}" ${a !== undefined ? "disabled" : ""}>${esc(o)}</button>`;
  }).join("");
  const why = a === undefined ? "" : `<p class="why"><b>${a === q.correct ? "Richtig." : "Nicht ganz."}</b> ${esc(q.why)}</p><button class="btn block" data-act="quiz-next" style="margin-top:12px">${qz.i === QUIZ.length - 1 ? "Ergebnis" : "Weiter ›"}</button>`;
  return `<div class="wrap fade"><div class="card qcard"><div class="qmeta"><span>${esc(q.round)}</span><span>${qz.i + 1} von ${QUIZ.length}</span></div><h2>${esc(q.q)}</h2>${opts}${why}</div></div>`;
}

// Logbuch ---------------------------------------------------------------------
const lightLabel = (id) => { const l = LIGHTS.find((x) => x.id === id); return l ? l.label : id; };
function logView() {
  const m = me(), d = m.draft;
  const n = m.log.length;
  const chip = (act, val, label, on) => `<button class="chip sm ${on ? "on" : ""}" data-act="${act}" data-v="${val}">${label}</button>`;
  const rows = m.log.slice().reverse().map((e) => `<tr><td>${e.n}</td><td>${e.N ? apertureLabel(e.N) : "–"} · ${e.t ? shutterLabel(e.t) : "–"}<br><span class="muted small">${esc(lightLabel(e.light))}${e.note ? " · " + esc(e.note) : ""}</span></td><td><button class="x" data-act="log-del" data-n="${e.n}" aria-label="Eintrag ${e.n} löschen">✕</button></td></tr>`).join("");
  return `<div class="wrap fade">
    <div class="card"><div class="counter"><div><b>Bild ${n + (n < ROLL ? 1 : 0)}</b> <span class="muted">von ${ROLL}</span></div><span class="muted small">${n >= ROLL ? "Rolle voll. Zurückspulen!" : n >= ROLL - 6 ? `Noch ${ROLL - n}. Joker nicht vergessen.` : `${ROLL - n} übrig`}</span></div>
      <div class="bar"><i style="width:${pct(n, ROLL)}%"></i></div></div>
    <div class="card"><h2>Notizzettel für Bild ${n + 1}</h2>
      <div class="lbl" style="margin-top:6px">Blende</div><div class="chips">${APERTURES.map((x) => chip("d-n", x, apertureLabel(x), x === d.N)).join("")}</div>
      <div class="lbl">Zeit</div><div class="chips">${SHUTTERS.map((x) => chip("d-t", x, shutterLabel(x), Math.abs(x - d.t) < 1e-9)).join("")}</div>
      <div class="lbl">Licht</div><div class="chips">${LIGHTS.map((x) => chip("d-light", x.id, `${x.icon} ${x.label}`, x.id === d.light)).join("")}</div>
      <div class="lbl">Notiz (kann leer bleiben)</div><input class="field" data-note maxlength="80" placeholder="z. B. Aussicht, Gegenlicht, Katze">
      <div class="row" style="margin-top:12px"><button class="btn" data-act="log-add" style="flex:1">Bild ${n + 1} speichern</button><button class="btn ghost" data-act="log-bare" title="Bild gemacht, keine Zeit zum Notieren">Nur zählen</button></div></div>
    ${n ? `<div class="card"><h2>Bisher</h2><table class="log">${rows}</table>
      <div class="row" style="margin-top:12px"><button class="btn ghost" data-act="log-copy">Als Text kopieren</button><button class="btn ghost" data-act="log-share">Teilen</button></div></div>` : `<div class="empty">${mascot("sleepy")}<p class="muted small">Noch nichts drin, Rollo schläft. Beim Entwickeln weisst du dann, welches Bild mit welchen Werten entstanden ist. Das ist die halbe Kamera-Schule.</p></div>`}
  </div>`;
}
function logText() {
  const m = me();
  const head = `Logbuch ${nameOf(S.who)}, Lugano 21.11.2026`;
  return [head, ...m.log.map((e) => `${String(e.n).padStart(2, "0")} · ${e.N ? apertureLabel(e.N) : "–"} · ${e.t ? shutterLabel(e.t) : "–"} · ${lightLabel(e.light)}${e.note ? " · " + e.note : ""}`)].join("\n");
}

// ── router + render ──────────────────────────────────────────────────────────
const TABS = [["tag", "🗺️", "Tag"], ["schule", "🎓", "Schule"], ["aufgaben", "📸", "Aufgaben"], ["quiz", "❓", "Quiz"], ["logbuch", "📓", "Logbuch"]];
const route = () => { const [tab, arg] = (location.hash.slice(1) || "tag").split("/"); return { tab: TABS.some((t) => t[0] === tab) ? tab : "tag", arg }; };

function render(keepScroll = false) {
  const app = $("#app");
  if (!S.who) { app.innerHTML = whoView(); return; }
  const { tab, arg } = route();
  const views = { tag: tagView, schule: schuleView, aufgaben: aufgabenView, quiz: quizView, logbuch: logView };
  const y = window.scrollY;
  app.innerHTML = `
    <header class="top"><div class="wrap"><div class="brand">Lugano<small>21.11.</small></div>
      <button class="mini" data-act="share">Teilen</button><button class="mini" data-act="change-who">${esc(nameOf(S.who))} ⇄</button></div></header>
    <main>${views[tab](arg)}</main>
    <nav class="nav"><div class="wrap">${TABS.map(([id, ic, label]) => `<button class="${id === tab ? "on" : ""}" data-act="go" data-to="${id}"><span>${ic}</span>${label}</button>`).join("")}</div></nav>`;
  afterRender();
  window.scrollTo(0, keepScroll ? y : 0);
}
function rerender(sel, html) {
  const el = $(sel);
  if (!el) return render(true);
  el.outerHTML = html;
  afterRender();
}
// Things a plain string can't do: the blur filters and the focus lens start from state.
function afterRender() {
  applyBlur();
  const f = $("[data-focus-in]");
  if (f) updateFocus(Number(f.value));
}

const CHEERS = ["Schön gesehen 👀", "Und das Bild ist im Kasten 📸", "Eins weniger auf der Liste 🌸", "Sehr gut 💚", "Notiert ✨", "Das war ein guter Moment 🧡"];

// ── events ───────────────────────────────────────────────────────────────────
document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-act],[data-part]");
  if (!el) return;
  const m = me();
  if (el.dataset.part) { partSel = el.dataset.part; rerender("[data-parts]", partsHtml(partSel)); return; }
  const v = el.dataset.v;
  switch (el.dataset.act) {
    case "who": S.who = el.dataset.id; save(); render(); break;
    case "change-who": S.who = null; save(); render(); break;
    case "go": location.hash = el.dataset.to; break;
    case "share": {
      const data = { title: "Lugano: Drei Kameras, ein Tag", text: "Lugano, Samstag. Kamera-Schule, Foto-Aufgaben und ein Quiz für unterwegs:", url: TRIP.url };
      try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(TRIP.url); toast("Link kopiert 💌"); } }
      catch (_e) { /* cancelled */ }
      break;
    }
    case "pack": m.pack[el.dataset.id] = el.checked; save(); break;
    case "task": {
      m.tasks[el.dataset.id] = el.checked; save(); render(true);
      if (el.checked) toast(CHEERS[Object.values(m.tasks).filter(Boolean).length % CHEERS.length]);
      break;
    }
    case "bingo": {
      const k = el.dataset.k, before = bingoLines(m.bingo).length;
      m.bingo[k] = !m.bingo[k]; save();
      if (bingoLines(m.bingo).length > before) { confetti(["🌴", "⛴️", "🚠", "🐈"]); toast("Bingo! 🎉"); }
      render(true); break;
    }
    case "check": {
      const l = LESSONS.find((x) => x.id === el.dataset.lesson);
      m.lessons[l.id] = Number(el.dataset.k); save();
      const all = LESSONS.every((x) => m.lessons[x.id] !== undefined);
      render(true);
      if (all && !m.diploma) { m.diploma = true; save(); confetti(); }
      break;
    }
    case "sim-light": m.sim.light = v; save(); rerender("[data-sim]", simHtml()); break;
    case "sim-iso": m.sim.iso = Number(v); save(); rerender("[data-sim]", simHtml()); break;
    case "sim-n": m.sim.N = Number(v); save(); rerender("[data-sim]", simHtml()); break;
    case "sim-t": m.sim.t = Number(v); save(); rerender("[data-sim]", simHtml()); break;
    case "sun-light": m.sunny.light = v; save(); rerender("[data-sunny]", sunnyHtml()); break;
    case "sun-iso": m.sunny.iso = Number(v); save(); rerender("[data-sunny]", sunnyHtml()); break;
    case "sun-n": m.sunny.N = Number(v); save(); rerender("[data-sunny]", sunnyHtml()); break;
    case "focus-new": rerender("[data-focus]", focusHtml()); break;
    case "answer": {
      const q = QUIZ[m.quiz.i];
      if (m.quiz.answers[q.id] !== undefined) break;
      m.quiz.answers[q.id] = Number(el.dataset.k); save(); render(true); break;
    }
    case "quiz-next": {
      m.quiz.i += 1; save(); render();
      if (m.quiz.i >= QUIZ.length && QUIZ.filter((q) => m.quiz.answers[q.id] === q.correct).length >= 11) confetti();
      break;
    }
    case "quiz-again": m.quiz = { i: 0, answers: {} }; save(); render(); break;
    case "d-n": m.draft.N = Number(v); save(); keepNote(() => render(true)); break;
    case "d-t": m.draft.t = Number(v); save(); keepNote(() => render(true)); break;
    case "d-light": m.draft.light = v; save(); keepNote(() => render(true)); break;
    case "log-add": addLog(false); break;
    case "log-bare": addLog(true); break;
    case "log-del": {
      if (!confirm("Diesen Eintrag löschen? Die Nummern rücken nach.")) break;
      m.log = m.log.filter((x) => x.n !== Number(el.dataset.n)).map((x, i) => ({ ...x, n: i + 1 })); save(); render(true); break;
    }
    case "log-copy": try { await navigator.clipboard.writeText(logText()); toast("Kopiert ✨"); } catch (_e) { toast("Kopieren ging nicht"); } break;
    case "log-share": try { if (navigator.share) await navigator.share({ title: "Logbuch", text: logText() }); else { await navigator.clipboard.writeText(logText()); toast("Kopiert ✨"); } } catch (_e) { /* cancelled */ } break;
    default: break;
  }
});
document.addEventListener("keydown", (e) => {
  const el = e.target.closest && e.target.closest("[data-part]");
  if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); partSel = el.dataset.part; rerender("[data-parts]", partsHtml(partSel)); }
});
document.addEventListener("input", (e) => { if (e.target.matches("[data-focus-in]")) updateFocus(Number(e.target.value)); });
window.addEventListener("hashchange", () => render());

let noteDraft = "";
document.addEventListener("input", (e) => { if (e.target.matches("[data-note]")) noteDraft = e.target.value; });
function keepNote(fn) { fn(); const f = $("[data-note]"); if (f) f.value = noteDraft; }
function addLog(bare) {
  const m = me();
  if (m.log.length >= ROLL + 6) { toast("Die Rolle ist voll, mehr geht nicht rein 🎞️"); return; }
  const d = m.draft;
  m.log.push({ n: m.log.length + 1, N: bare ? 0 : d.N, t: bare ? 0 : d.t, light: d.light, note: bare ? "" : noteDraft.trim(), at: Date.now() });
  noteDraft = "";
  save(); render(true);
  if (m.log.length === ROLL) { confetti(["🎞️"]); toast("36 von 36! Zurückspulen 🎞️💚"); }
}

render();
