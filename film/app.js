import { API, API_ORIGIN, WEEK_START, PEOPLE } from "./config.js";
import { WEEKS } from "./content.js";
import { zurichToday, releasedWeeks, weekIndex, weekLabel } from "./weeks.js";
import { mascot } from "./mascot.js";

const KEY = "filmclub:v1";
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nameOf = (id) => (PEOPLE.find((p) => p.id === id) || { name: id }).name;
const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── state: who and the club code live on this phone; the board lives on the server ──
let S = { who: null, code: "", cache: [], camera: "", film: "" };
try { S = { ...S, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch (_e) { /* private mode */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_e) { /* full or blocked */ } };

// An invite link carries the code: film.html#code=…
function takeCodeFromLink() {
  const m = /[#&?]code=([^&]+)/.exec(location.hash + location.search);
  if (!m) return false;
  try { S.code = decodeURIComponent(m[1]); save(); history.replaceState(null, "", location.pathname); return true; } catch (_e) { return false; }
}
takeCodeFromLink();

let P = { list: S.cache || [], loaded: false, offline: false, busy: false };
let draft = { week: null, preview: "", blob: null, error: "", sending: false };
let openComments = new Set();
let notice = "";

const total = WEEKS.length;
const today = () => zurichToday();
const released = () => releasedWeeks(today(), WEEK_START, total);
const started = () => today() >= WEEK_START;

// ── talking to the server ────────────────────────────────────────────────────
async function handle(r) {
  let d = null;
  try { d = await r.json(); } catch (_e) { /* not json */ }
  if (r.status === 401) { S.code = ""; save(); render(); throw new Error("Der Club-Code stimmt nicht."); }
  if (!r.ok || !d || !d.ok) throw new Error((d && d.error) || "Das hat nicht geklappt.");
  return d;
}
const api = (body) => fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, code: S.code }) }).then(handle);

const safeImg = (u) => { try { return new URL(u).origin === API_ORIGIN ? u : ""; } catch (_e) { return ""; } };

async function loadPosts() {
  if (!S.code) return;
  P.busy = true;
  try {
    const d = await api({ action: "list" });
    P.list = d.posts.map((p) => ({ ...p, url: safeImg(p.url) })).filter((p) => p.url);
    P.offline = false; P.loaded = true;
    S.cache = P.list.slice(0, 60); save();
  } catch (e) {
    P.offline = !navigator.onLine || /fetch|network|load/i.test(e.message);
    P.loaded = true;
    if (!P.offline) notice = e.message;
  }
  P.busy = false;
  if (!S.code || ["board", "woche"].includes(route().tab)) render(true);
}

// ── pictures ─────────────────────────────────────────────────────────────────
async function shrink(file) {
  let src, w, h;
  try { src = await createImageBitmap(file); w = src.width; h = src.height; }
  catch (_e) {
    src = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = URL.createObjectURL(file); });
    w = src.naturalWidth; h = src.naturalHeight;
  }
  const k = Math.min(1, 1600 / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.round(w * k); c.height = Math.round(h * k);
  c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
  for (const q of [0.86, 0.75, 0.62]) {
    const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", q));
    if (blob && blob.size <= 1.9 * 1024 * 1024) return blob;
  }
  throw new Error("Das Bild ist zu gross. Probier ein kleineres.");
}

function toast(msg) {
  const old = $(".toast"); if (old) old.remove();
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2400);
}
function confetti(emojis = ["🎞️", "📸", "💚", "✨", "🌸", "🧡"]) {
  if (reduced()) return;
  for (let i = 0; i < 22; i++) {
    const el = document.createElement("span");
    el.className = "confetti"; el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    el.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
}

// ── sharing: the photo into the club chat ────────────────────────────────────
async function sharePhoto(p) {
  const week = p.week && WEEKS[p.week - 1] ? ` · Woche ${p.week}: ${WEEKS[p.week - 1].theme}` : "";
  const text = `${nameOf(p.who)}${p.caption ? ": " + p.caption : ""}${week} 🎞️ Filmclub`;
  try {
    const blob = await (await fetch(p.url)).blob();
    const file = new File([blob], "filmclub.jpg", { type: blob.type || "image/jpeg" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text }); return; }
  } catch (e) { if (e && e.name === "AbortError") return; }
  if (navigator.share) { try { await navigator.share({ text, url: p.url }); } catch (_e) { /* cancelled */ } return; }
  window.open("https://wa.me/?text=" + encodeURIComponent(`${text}\n${p.url}`), "_blank", "noopener");
}
async function shareInvite() {
  const url = `${location.origin}${location.pathname}#code=${encodeURIComponent(S.code)}`;
  const text = "Komm in den Filmclub: jede Woche ein Tipp, eine Aufgabe und eine Pinnwand für unsere Filmbilder. 🎞️";
  try {
    if (navigator.share) await navigator.share({ title: "Filmclub", text, url });
    else { await navigator.clipboard.writeText(`${text}\n${url}`); toast("Einladung kopiert 💌"); }
  } catch (_e) { /* cancelled */ }
}

// ── views ────────────────────────────────────────────────────────────────────
function codeView() {
  return `<div class="wrap fade" style="padding-top:22px">
    <div class="who-top">${mascot("happy", "bob")}</div>
    <p class="kicker">Filmclub</p>
    <h1 style="font-size:2.1rem">Der Club-Code, bitte</h1>
    <p class="muted">Den hat dir Fionn geschickt. Am einfachsten öffnest du den Einladungslink, dann ist er schon drin.</p>
    <input class="field" data-code placeholder="Club-Code" autocomplete="off" autocapitalize="none" spellcheck="false" style="margin:12px 0">
    <button class="btn block" data-act="code">Rein</button>
    ${notice ? `<p class="why" style="color:var(--bad)">${esc(notice)}</p>` : ""}
  </div>`;
}

function whoView() {
  return `<div class="wrap fade" style="padding-top:22px">
    <div class="who-top">${mascot("happy", "bob")}</div>
    <p class="kicker">Filmclub</p>
    <h1 style="font-size:2.1rem">Hallo! Wer bist du?</h1>
    <p class="muted">Das merkt sich dein Handy.</p>
    <div class="who-pick">${PEOPLE.map((p) => `<button data-act="who" data-id="${p.id}">${esc(p.name)}</button>`).join("")}</div>
  </div>`;
}

function weekBlock(n) {
  const w = WEEKS[n - 1];
  const posts = P.list.filter((p) => p.week === n);
  const thumbs = posts.slice(0, 6).map((p) => `<img src="${esc(p.url)}" alt="" loading="lazy" data-act="lb" data-src="${esc(p.url)}">`).join("");
  return `
    <section class="hero week-hero"><div class="perfs"></div>
      <div class="txt"><p class="kicker">Woche ${n} · ab ${esc(weekLabel(WEEK_START, n))}</p>
        <h1>${esc(w.theme)}</h1></div>
      <div class="perfs"></div></section>
    <div class="card"><p class="kicker">Tipp der Woche</p><h2>${esc(w.tip.title)}</h2>
      ${w.tip.text.map((t) => `<p>${esc(t)}</p>`).join("")}
      <div class="tip">${esc(w.tip.tryIt)}</div></div>
    <div class="card challenge"><p class="kicker">Aufgabe der Woche</p><h2>${esc(w.challenge.title)}</h2>
      <p>${esc(w.challenge.how)}</p>
      ${w.challenge.rule ? `<p class="rule">${esc(w.challenge.rule)}</p>` : ""}
      <button class="btn block" data-act="post-for" data-week="${n}" style="margin-top:12px">📮 Bild zu dieser Woche posten</button></div>
    <div class="section-title">${posts.length ? `${posts.length} ${posts.length === 1 ? "Bild" : "Bilder"} dazu` : "Noch kein Bild dazu"}</div>
    ${thumbs ? `<div class="thumbs">${thumbs}</div><p><button class="mini" data-act="filter-week" data-week="${n}">Alle ansehen</button></p>` :
      `<div class="empty">${mascot("sleepy")}<p class="muted small">Film braucht Zeit. Du darfst auch später posten, wenn die Rolle entwickelt ist.</p></div>`}`;
}

function wocheView(arg) {
  const rel = released();
  const n = Math.min(Math.max(parseInt(arg, 10) || rel, 1), rel);
  const prev = n > 1 ? `<button class="btn ghost" data-act="go" data-to="woche/${n - 1}">‹ Woche ${n - 1}</button>` : `<span></span>`;
  const next = n < rel ? `<button class="btn ghost" data-act="go" data-to="woche/${n + 1}">Woche ${n + 1} ›</button>` : `<span></span>`;
  const early = !started() ? `<p class="muted small" style="text-align:center">Ein Vorgeschmack. Offiziell geht es am Montag, ${esc(weekLabel(WEEK_START, 1))}, los.</p>` : "";
  const end = weekIndex(today(), WEEK_START) > total
    ? `<div class="card" style="text-align:center">${mascot("wow", "bob")}<h2>Das war das halbe Jahr!</h2><p class="muted">Die nächsten Karten schreibt Fionn bald. Bis dahin: alle Wochen noch einmal durchblättern.</p></div>` : "";
  return `<div class="wrap fade">${early}${end}${weekBlock(n)}<div class="lnav">${prev}${next}</div></div>`;
}

function chipRow(act, items, current) {
  return `<div class="chips">${items.map(([v, label]) => `<button class="chip sm ${String(current) === String(v) ? "on" : ""}" data-act="${act}" data-v="${esc(v)}">${esc(label)}</button>`).join("")}</div>`;
}

let filter = { who: "", week: "" };

function postHtml(p) {
  const mine = p.who === S.who;
  const hearted = p.hearts.includes(S.who);
  const meta = [p.camera, p.film, p.settings].filter(Boolean).map(esc).join(" · ");
  const week = p.week && WEEKS[p.week - 1] ? `<span class="tag skill">Woche ${p.week}: ${esc(WEEKS[p.week - 1].theme)}</span>` : "";
  const open = openComments.has(p.id);
  const comments = open ? `<div class="comments">${p.comments.map((c) => `<p><b>${esc(nameOf(c.who))}</b> ${esc(c.body)}${c.who === S.who ? ` <button class="x" data-act="uncomment" data-id="${esc(c.id)}" aria-label="Kommentar löschen">✕</button>` : ""}</p>`).join("")}
    <div class="row"><input class="field" data-comment="${esc(p.id)}" maxlength="200" placeholder="Schreib was dazu…" style="flex:1"><button class="btn" data-act="comment" data-id="${esc(p.id)}">Senden</button></div></div>` : "";
  return `<article class="polaroid" data-id="${esc(p.id)}">
    <img src="${esc(p.url)}" alt="${esc(p.caption || "Foto von " + nameOf(p.who))}" loading="lazy" data-act="lb" data-src="${esc(p.url)}">
    <div class="who-line"><b>${esc(nameOf(p.who))}</b> ${week}</div>
    ${p.caption ? `<p class="cap">${esc(p.caption)}</p>` : ""}
    ${meta ? `<p class="meta-line">${meta}</p>` : ""}
    <div class="actions">
      <button class="chip sm ${hearted ? "on" : ""}" data-act="heart" data-id="${esc(p.id)}" aria-pressed="${hearted}">${hearted ? "💚" : "🤍"} ${p.hearts.length || ""}</button>
      <button class="chip sm" data-act="toggle-comments" data-id="${esc(p.id)}">💬 ${p.comments.length || ""}</button>
      <button class="chip sm" data-act="share-photo" data-id="${esc(p.id)}">💌 Teilen</button>
      ${mine ? `<button class="chip sm" data-act="delete" data-id="${esc(p.id)}" aria-label="Bild löschen">🗑️</button>` : ""}
    </div>${comments}</article>`;
}

function boardView() {
  const weeks = [["", "Alle Wochen"], ...Array.from({ length: released() }, (_, i) => [String(i + 1), `${i + 1} · ${WEEKS[i].theme}`])];
  let list = P.list;
  if (filter.who) list = list.filter((p) => p.who === filter.who);
  if (filter.week) list = list.filter((p) => String(p.week) === filter.week);
  return `<div class="wrap fade">
    <h1 style="font-size:1.9rem;margin:4px 0 6px">Die Pinnwand</h1>
    ${P.offline ? `<p class="why">Du bist offline. Das ist der letzte Stand.</p>` : ""}
    ${notice ? `<p class="why" style="color:var(--bad)">${esc(notice)}</p>` : ""}
    <div class="lbl">Von</div>${chipRow("filter-who", [["", "Alle"], ...PEOPLE.map((p) => [p.id, p.name])], filter.who)}
    <div class="lbl">Woche</div><select class="field" data-filter-week>${weeks.map(([v, l]) => `<option value="${esc(v)}" ${v === filter.week ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>
    <div class="wall" style="margin-top:14px">${list.length ? list.map(postHtml).join("") : ""}</div>
    ${list.length ? "" : `<div class="empty" style="margin-top:14px">${mascot("sleepy")}<p class="muted small">${P.loaded ? "Hier hängt noch nichts. Das erste Bild gehört dir." : "Lade die Pinnwand…"}</p></div>`}
    <p style="text-align:center;margin-top:16px"><button class="btn" data-act="go" data-to="posten">📮 Bild posten</button></p>
  </div>`;
}

function postenView() {
  const rel = released();
  const selected = draft.week === null ? rel : draft.week;
  const weekOpts = [`<option value="0" ${selected === 0 ? "selected" : ""}>Frei, ohne Woche</option>`, ...Array.from({ length: rel }, (_, i) => `<option value="${i + 1}" ${selected === i + 1 ? "selected" : ""}>Woche ${i + 1}: ${esc(WEEKS[i].theme)}</option>`)].join("");
  return `<div class="wrap fade">
    <h1 style="font-size:1.9rem;margin:4px 0 6px">Bild posten</h1>
    <p class="muted">Aus dem Scan oder vom Abzug. Das Bild wird vor dem Hochladen verkleinert, dein Original bleibt, wo es ist.</p>
    <div class="card">
      <label class="drop ${draft.preview ? "has" : ""}" for="file">${draft.preview ? `<img src="${esc(draft.preview)}" alt="Vorschau">` : `<span>📷</span><b>Bild auswählen</b>`}</label>
      <input id="file" type="file" accept="image/*" data-file hidden>
      <div class="lbl">Woche</div><select class="field" data-week>${weekOpts}</select>
      <div class="lbl">Ein Satz dazu (kann leer bleiben)</div><input class="field" data-caption maxlength="200" placeholder="Was du gesehen oder gedacht hast">
      <div class="lbl">Kamera</div><input class="field" data-camera maxlength="40" placeholder="z. B. Pentax K1000" value="${esc(S.camera)}">
      <div class="lbl">Film</div><input class="field" data-film maxlength="40" list="films" placeholder="z. B. Kodak Gold 200" value="${esc(S.film)}">
      <datalist id="films"><option value="Kodak Gold 200"><option value="Kodak ColorPlus 200"><option value="Kodak Portra 400"><option value="Kodak Ektar 100"><option value="Fujifilm C200"><option value="Ilford HP5 Plus 400"><option value="Kodak Tri-X 400"></datalist>
      <div class="lbl">Einstellungen</div><input class="field" data-settings maxlength="60" placeholder="z. B. f/8 · 1/250">
      ${draft.error ? `<p class="why" style="color:var(--bad)">${esc(draft.error)}</p>` : ""}
      <button class="btn block" data-act="send" style="margin-top:14px" ${draft.sending || !draft.blob ? "disabled" : ""}>${draft.sending ? "Wird hochgeladen…" : "Auf die Pinnwand"}</button>
    </div></div>`;
}

function karten() {
  const rel = released();
  return `<div class="wrap fade"><h1 style="font-size:1.9rem;margin:4px 0 6px">Alle Karten</h1>
    <p class="muted">${rel} von ${total} Wochen sind draussen. Neue kommen jeden Montag.</p>
    ${Array.from({ length: rel }, (_, i) => rel - i).map((n) => {
      const w = WEEKS[n - 1], count = P.list.filter((p) => p.week === n).length;
      return `<button class="lesson-row" data-act="go" data-to="woche/${n}"><span class="ic">${n}</span><span><b>${esc(w.theme)}</b><small>${esc(w.challenge.title)}${count ? ` · ${count} ${count === 1 ? "Bild" : "Bilder"}` : ""}</small></span><span></span></button>`;
    }).join("")}</div>`;
}

// ── router + render ──────────────────────────────────────────────────────────
const TABS = [["woche", "🎞️", "Woche"], ["board", "🖼️", "Board"], ["posten", "📮", "Posten"], ["karten", "🗂️", "Karten"]];
const route = () => { const [tab, arg] = (location.hash.slice(1) || "woche").split("/"); return { tab: TABS.some((t) => t[0] === tab) ? tab : "woche", arg }; };

function render(keepScroll = false) {
  const app = $("#app");
  if (!S.code) { app.innerHTML = codeView(); return; }
  if (!S.who) { app.innerHTML = whoView(); return; }
  const { tab, arg } = route();
  const views = { woche: wocheView, board: boardView, posten: postenView, karten };
  const y = window.scrollY;
  const focusId = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.comment : null;
  const typed = focusId ? document.activeElement.value : "";
  app.innerHTML = `
    <header class="top"><div class="wrap"><div class="brand">Filmclub</div>
      <button class="mini" data-act="invite">Einladen</button><button class="mini" data-act="change-who">${esc(nameOf(S.who))} ⇄</button></div></header>
    <main>${views[tab](arg)}</main>
    <nav class="nav"><div class="wrap">${TABS.map(([id, ic, label]) => `<button class="${id === tab ? "on" : ""}" data-act="go" data-to="${id}"><span>${ic}</span>${label}</button>`).join("")}</div></nav>`;
  if (focusId) { const f = $(`[data-comment="${CSS.escape(focusId)}"]`); if (f) { f.value = typed; f.focus(); } }
  window.scrollTo(0, keepScroll ? y : 0);
}

// ── events ───────────────────────────────────────────────────────────────────
const postById = (id) => P.list.find((p) => p.id === id);

document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const id = el.dataset.id;
  switch (el.dataset.act) {
    case "code": {
      const v = ($("[data-code]") || {}).value || "";
      if (!v.trim()) break;
      S.code = v.trim(); save(); notice = ""; render(); loadPosts(); break;
    }
    case "who": S.who = id; save(); render(); loadPosts(); break;
    case "change-who": S.who = null; save(); render(); break;
    case "go": location.hash = el.dataset.to; break;
    case "invite": shareInvite(); break;
    case "post-for": draft.week = Number(el.dataset.week); location.hash = "posten"; break;
    case "filter-week": filter = { who: "", week: el.dataset.week }; location.hash = "board"; render(); break;
    case "filter-who": filter.who = el.dataset.v; render(true); break;
    case "lb": {
      const lb = document.createElement("div");
      lb.className = "lb"; lb.setAttribute("role", "dialog");
      lb.innerHTML = `<img src="${esc(el.dataset.src)}" alt=""><button class="mini" data-act="lb-close">Schliessen</button>`;
      document.body.appendChild(lb); break;
    }
    case "lb-close": { const lb = $(".lb"); if (lb) lb.remove(); break; }
    case "heart": {
      const p = postById(id); if (!p) break;
      const on = !p.hearts.includes(S.who);
      p.hearts = on ? [...p.hearts, S.who] : p.hearts.filter((w) => w !== S.who);
      render(true);
      try { await api({ action: "heart", post_id: id, who: S.who, on }); if (on) toast("💚"); }
      catch (err) { p.hearts = on ? p.hearts.filter((w) => w !== S.who) : [...p.hearts, S.who]; render(true); toast(err.message); }
      break;
    }
    case "toggle-comments": if (openComments.has(id)) openComments.delete(id); else openComments.add(id); render(true); break;
    case "comment": await sendComment(id); break;
    case "uncomment": {
      try { await api({ action: "uncomment", id, who: S.who }); await loadPosts(); } catch (err) { toast(err.message); }
      break;
    }
    case "share-photo": { const p = postById(id); if (p) sharePhoto(p); break; }
    case "delete": {
      if (!confirm("Dieses Bild von der Pinnwand nehmen?")) break;
      try { await api({ action: "delete", post_id: id, who: S.who }); toast("Entfernt"); await loadPosts(); } catch (err) { toast(err.message); }
      break;
    }
    case "send": await sendPost(); break;
    default: break;
  }
});

async function sendComment(id) {
  const input = $(`[data-comment="${CSS.escape(id)}"]`);
  const body = input ? input.value.trim() : "";
  if (!body) return;
  try { await api({ action: "comment", post_id: id, who: S.who, body }); input.value = ""; await loadPosts(); }
  catch (err) { toast(err.message); }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.matches && e.target.matches("[data-comment]")) { e.preventDefault(); sendComment(e.target.dataset.comment); }
  if (e.key === "Enter" && e.target.matches && e.target.matches("[data-code]")) { e.preventDefault(); const b = $('[data-act="code"]'); if (b) b.click(); }
  if (e.key === "Escape") { const lb = $(".lb"); if (lb) lb.remove(); }
});

document.addEventListener("change", async (e) => {
  const t = e.target;
  if (t.matches("[data-filter-week]")) { filter.week = t.value; render(true); }
  if (t.matches("[data-week]")) draft.week = Number(t.value);
  if (t.matches("[data-file]") && t.files[0]) {
    draft.error = "";
    try {
      draft.blob = await shrink(t.files[0]);
      if (draft.preview) URL.revokeObjectURL(draft.preview);
      draft.preview = URL.createObjectURL(draft.blob);
    } catch (err) { draft.blob = null; draft.preview = ""; draft.error = err.message; }
    keepFields();
  }
});

// Re-render the form but keep what was typed.
function keepFields() {
  const keep = ["caption", "camera", "film", "settings"].map((k) => [k, ($(`[data-${k}]`) || {}).value]);
  render(true);
  for (const [k, v] of keep) { const f = $(`[data-${k}]`); if (f && v !== undefined) f.value = v; }
}

async function sendPost() {
  if (!draft.blob || draft.sending) return;
  const val = (k) => (($(`[data-${k}]`) || {}).value || "").trim();
  S.camera = val("camera"); S.film = val("film"); save();
  const fd = new FormData();
  fd.set("code", S.code); fd.set("who", S.who);
  fd.set("week", String(draft.week === null ? released() : draft.week));
  for (const k of ["caption", "camera", "film", "settings"]) fd.set(k, val(k));
  fd.set("file", draft.blob, "photo.jpg");
  draft.sending = true; draft.error = ""; keepFields();
  try {
    await handle(await fetch(API, { method: "POST", body: fd }));
    if (draft.preview) URL.revokeObjectURL(draft.preview);
    draft = { week: null, preview: "", blob: null, error: "", sending: false };
    confetti(); toast("Hängt an der Pinnwand 🎞️");
    filter = { who: "", week: "" };
    location.hash = "board";
    await loadPosts();
  } catch (err) {
    draft.sending = false; draft.error = err.message;
    keepFields();
  }
}

window.addEventListener("hashchange", () => { if (takeCodeFromLink()) { notice = ""; render(); loadPosts(); } else render(); });
window.addEventListener("online", () => loadPosts());
render();
loadPosts();
