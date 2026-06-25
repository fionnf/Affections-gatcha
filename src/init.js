// ── App initialisation ────────────────────────────────────────────────────────
import { state, mount, $ } from "./state.js";
import { getToken, dateKeyInTimezone, getPreviewDay } from "./utils.js";
import { readHistory, writeHistory } from "./storage.js";
import { computeStreak, writeStreakCache } from "./streak.js";
import { backupToSheets, fetchJson, syncFromSheets, resolveBase } from "./sync.js";
import { injectFonts } from "./theme.js";
import { injectStyles } from "./css.js";
import { renderShell } from "./template.js";
import { applyTheme, applySpecialDayColors } from "./theme.js";
import { hydrateCopy, renderOdds, renderWunschkapsel } from "./render.js";
import { bindEvents, retryPendingWishSend, registerServiceWorker, scheduleStreakWarning, renderError } from "./events.js";
import { pickLoadingSteps } from "./loading-steps.js";

const defaultPhotos = { photos: [] };

// ── Loading overlay ───────────────────────────────────────────────────────────

let _loadingEl = null;
let _loadingTextEl = null;
let _loadingSteps = [];
let _loadingIndex = 0;
let _loadingTimer = null;

function createLoadingOverlay() {
  const el = document.createElement("div");
  el.id = "ag-loading-overlay";
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-label", "Laden…");
  el.innerHTML = `
    <div class="ag-loading-inner">
      <div class="ag-loading-spinner" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <p class="ag-loading-step" id="ag-loading-step">Maschine wird aufgewärmt…</p>
      <div class="ag-loading-bar-track" aria-hidden="true">
        <div class="ag-loading-bar" id="ag-loading-bar"></div>
      </div>
    </div>
  `;
  // Inline styles so the overlay works before CSS is injected
  el.style.cssText = [
    "position:fixed","inset:0","z-index:9999",
    "display:flex","align-items:center","justify-content:center",
    "background:var(--ag-bg, #0d1a12)",
    "transition:opacity .35s ease",
    "opacity:1",
  ].join(";");
  document.body.appendChild(el);

  _loadingEl = el;
  _loadingTextEl = el.querySelector("#ag-loading-step");

  // Inject minimal overlay styles
  const style = document.createElement("style");
  style.textContent = `
    #ag-loading-overlay { font-family: system-ui, sans-serif; }
    .ag-loading-inner {
      display: flex; flex-direction: column; align-items: center;
      gap: 18px; padding: 32px 24px; text-align: center; max-width: 320px;
    }
    .ag-loading-spinner {
      display: flex; gap: 10px; align-items: flex-end; height: 32px;
    }
    .ag-loading-spinner span {
      display: block; width: 8px; border-radius: 4px;
      background: var(--ag-accent, rgba(255,220,140,.85));
      animation: ag-loader-bounce 1.1s ease-in-out infinite;
    }
    .ag-loading-spinner span:nth-child(1) { animation-delay: 0s; }
    .ag-loading-spinner span:nth-child(2) { animation-delay: .18s; }
    .ag-loading-spinner span:nth-child(3) { animation-delay: .36s; }
    @keyframes ag-loader-bounce {
      0%, 100% { height: 12px; opacity: .5; }
      50%       { height: 28px; opacity: 1; }
    }
    .ag-loading-step {
      font-size: 15px; line-height: 1.5;
      color: var(--ag-text-muted, rgba(255,255,255,.65));
      min-height: 2em;
      transition: opacity .25s ease;
    }
    .ag-loading-bar-track {
      width: 180px; height: 3px;
      border-radius: 99px;
      background: rgba(255,255,255,.12);
      overflow: hidden;
    }
    .ag-loading-bar {
      height: 100%; border-radius: 99px;
      background: var(--ag-accent, rgba(255,220,140,.75));
      width: 0%;
      transition: width .45s cubic-bezier(.4,0,.2,1);
    }
  `;
  document.head.appendChild(style);
}

function advanceLoadingStep() {
  if (!_loadingTextEl) return;
  _loadingIndex++;
  const total = _loadingSteps.length;
  const step = _loadingSteps[Math.min(_loadingIndex, total - 1)];

  // Fade out → update text → fade in
  _loadingTextEl.style.opacity = "0";
  setTimeout(() => {
    _loadingTextEl.textContent = step;
    _loadingTextEl.style.opacity = "1";
  }, 160);

  // Advance progress bar
  const bar = document.getElementById("ag-loading-bar");
  if (bar) bar.style.width = `${Math.min(90, Math.round((_loadingIndex / (total - 1)) * 90))}%`;
}

function startLoadingSteps(stepCount = 5) {
  _loadingSteps = pickLoadingSteps(stepCount);
  _loadingIndex = 0;

  if (_loadingTextEl) _loadingTextEl.textContent = _loadingSteps[0];

  // Advance through the picked steps at a random-ish interval
  const interval = Math.floor(520 + Math.random() * 300); // 520–820 ms per step
  _loadingTimer = setInterval(advanceLoadingStep, interval);
}

function finishLoading() {
  clearInterval(_loadingTimer);

  // Fill bar to 100 %
  const bar = document.getElementById("ag-loading-bar");
  if (bar) bar.style.width = "100%";

  // Fade overlay out and remove
  setTimeout(() => {
    if (!_loadingEl) return;
    _loadingEl.style.opacity = "0";
    _loadingEl.addEventListener("transitionend", () => _loadingEl?.remove(), { once: true });
  }, 350);
}

// ── History recovery ──────────────────────────────────────────────────────────

export function normalizePhotos(photosConfig) {
  const VIDEO_EXTS = /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;
  const photos = Array.isArray(photosConfig?.photos) ? photosConfig.photos : [];
  const base = resolveBase();
  return photos
    .map((photo) => {
      const resolvedUrl = new URL(photo.url, base).toString();
      const isVideo = photo.type === "video" || VIDEO_EXTS.test(resolvedUrl);
      return { ...photo, type: isVideo ? "video" : "image", url: resolvedUrl };
    })
    .filter((photo) => photo.url);
}

export function recoverHistory() {
  const token = getToken();
  const today = dateKeyInTimezone(state.theme?.timezone || "UTC");
  const RECOVERED = [
    {day:"2026-05-01",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},
    {day:"2026-05-02",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Foto-Drop",message:"Die Maschine spuckt eine Erinnerung aus. Das zählt als Preis, auch wenn sie sentimental tut."},
    {day:"2026-05-03",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},
    {day:"2026-05-04",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Der Fionn-Quest-Sieger",message:"Lennart ist der offizielle Gewinner. 24h lang hast du die absolute Entscheidungsgewalt über alle Freizeitaktivitäten."},
    {day:"2026-05-05",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Barróg (IE)",message:"Eine feste Umarmung (20 Sekunden Minimum)."},
    {day:"2026-05-06",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Sprachnachricht",message:"Du darfst eine kleine Sprachnachricht anfordern. Thema frei, Länge wie eine gute Aussicht: nicht zu kurz."},
    {day:"2026-05-07",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Baugespann-Sperre",message:"Hier entsteht demnächst ein Gewinn. Aktuell sieht man nur die Holzpfosten auf dem Dach."},
    {day:"2026-05-08",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Design-Safari",message:"Schick mir ein Foto von einem Gebäude oder Detail, das du heute siehst und das entweder genial oder ein Verbrechen ist."},
    {day:"2026-05-09",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Überraschungs-Wochenende",message:"Fionn plant einen kompletten Tag für dich. Du musst nur sagen, wann du Zeit hast."},
    {day:"2026-05-10",categoryId:"special",categoryLabel:"Laf Schnell!",tone:"jackpot",title:"🌟 SSR-Speed-Dämon-Pull! 🌟",message:"Hey Lennart! An diesem besonderen Tag in München beim Wings for Life World Run, möge dein Lauf mit deine friends ein legendärer Gacha-Pull sein: epische Speed, Ausdauer-Verlust und alle Kumpels SSR-Rarität (Super Super Rare, die Besten der Besten!) für maximalen Spaß! Rennt wie die Teufel, lacht euch schlapp und erobert die Strecke aus dem Olympiapark wie Bosse. Ich vermisse dich total hier in Zürich, aber freue mich fuer dich!"},
    {day:"2026-05-11",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Gedanken-Ping",message:"Du musst jetzt acht Sekunden an mich denken. Die Maschine behauptet, sie könne das überprüfen <3."},
    {day:"2026-05-12",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Geräusch-Notiz",message:"Beschreib mir das markanteste Geräusch deines Tages in maximal fünf Wörtern. Poetisch oder komplett nüchtern ist beides erlaubt."},
    {day:"2026-05-13",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Foto-Anfrage",message:"Du darfst ein süßes, schönes oder dummes Foto anfordern. Die Maschine empfiehlt: Alle drei."},
    {day:"2026-05-14",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Saudades (PT)",message:"Wenn man sich mal einen Tag vermisst: Ein Gutschein für ein spontanes Facetime-Date."},
    {day:"2026-05-15",categoryId:"special",categoryLabel:"Abendessen 🍽️",tone:"rare",title:"Fionn lädt zum Abendessen ein 🍽️",message:"Heute Abend geht's auf Fionns Rechnung. Treffpunkt: Stauffacher, 20:00 Uhr."},
    {day:"2026-05-16",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Bildkapsel",message:"Heute gibt es kein Gutschein-Drama, nur ein kleines Bild."},
    {day:"2026-05-17",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Tehran & Guatemala Tales",message:"Du darfst eine Geschichte aus deiner Reisezeit einfordern, die du noch nicht kennst."},
    {day:"2026-05-18",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Züri-Regen",message:"Grauer Himmel über Wiedikon. Kein Preis, nur das Bedürfnis nach einem sehr großen Tee."},
    {day:"2026-05-19",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Drei-Wort-Reisebericht",message:"Schick Fionn deinen Tag in genau drei Worten, als wärst du sehr erschöpft in einem Zug."},
    {day:"2026-05-20",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Denkmalschutz",message:"Dieser Slot darf aus historischen Gründen heute nicht verändert oder mit Preisen befüllt werden. Ein Klassiker unter den Nieten."},
    {day:"2026-05-21",categoryId:"special",categoryLabel:"Packliste 🧳",tone:"quest",title:"Deine Aufgabe: ein Brief 💌",message:"Ich kann es kaum erwarten. Den Rest findest du auf der Liste die ich dir gegeben habe — aber eins noch: deine HiFi-Ohrstöpsel. Vertrau mir.\n\nUnd eine Aufgabe von der Maschine: Schreib mir einen kurzen Brief auf Papier. Nicht lang, nicht perfekt — einfach was du gerade denkst. Bring ihn mit. Ich lese ihn wenn wir uns sehen. Bis bald. 🐚"}
  ];
  const existing = readHistory();
  const existingDays = new Set(existing.map((e) => e.day));
  const toAdd = RECOVERED
    .filter((e) => !existingDays.has(e.day) && e.day <= today)
    .map((e) => ({ ...e, token, link: null, photo: null, unlockTime: null,
      revealedAt: new Date(e.day + "T12:00:00").getTime() }));
  if (!toAdd.length) return 0;
  const merged = [...existing, ...toAdd].sort((a, b) => b.day.localeCompare(a.day));
  writeHistory(merged);
  state.syncedHistory = merged;
  writeStreakCache(computeStreak());
  backupToSheets();
  return toAdd.length;
}

// ── Main init ─────────────────────────────────────────────────────────────────

export async function init() {
  injectFonts();
  injectStyles();

  // Show loading overlay before anything else
  createLoadingOverlay();
  startLoadingSteps(5);

  renderShell();
  try {
    const [theme, outcomes, photos, specialDays, wishInbox, backup, quest, missions, radio] = await Promise.all([
      fetchJson("config/theme.json"),
      fetchJson("config/outcomes.json"),
      fetchJson("config/photos.json", defaultPhotos),
      fetchJson("config/special-days.json", { days: [] }),
      fetchJson("config/wish-inbox.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/backup.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/quest.json", { enabled: false }),
      fetchJson("config/missions.json", { pairs: [] }),
      fetchJson("config/radio.json", { enabled: false })
    ]);
    state.theme = theme;
    state.outcomes = outcomes;
    state.photos = normalizePhotos(photos);
    state.specialDays = specialDays;
    state.wishInbox = wishInbox && typeof wishInbox === "object" ? wishInbox : { enabled: false, endpointUrl: "" };
    state.backup = backup && typeof backup === "object" ? backup : { enabled: false, endpointUrl: "" };
    state.quest = quest && typeof quest === "object" ? quest : { enabled: false };
    state.missions = missions && Array.isArray(missions.pairs) ? missions : { pairs: [] };
    state.radio = radio && typeof radio === "object" ? radio : { enabled: false };
    applyTheme(theme);
    applySpecialDayColors(getPreviewDay() || dateKeyInTimezone(theme.timezone));
    hydrateCopy();
    renderOdds();
    renderWunschkapsel();
    bindEvents();
    // Position the sliding pill after first layout
    requestAnimationFrame(() => {
      const pill = mount.querySelector(".ag-nav-pill");
      const activeBtn = mount.querySelector(".ag-bottomnav-btn.is-active");
      if (pill && activeBtn) {
        const nav = activeBtn.closest(".ag-bottomnav");
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const btnRect = activeBtn.getBoundingClientRect();
        if (navRect && btnRect.width) {
          pill.style.transition = "none";
          pill.style.left = `${btnRect.left - navRect.left}px`;
          pill.style.width = `${btnRect.width}px`;
          requestAnimationFrame(() => { pill.style.transition = ""; });
        }
      }
    });
    try { retryPendingWishSend(); } catch (_error) {}
    registerServiceWorker();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleStreakWarning();
    });
    mount.classList.add("is-ready");
    mount.style.transition = "opacity .18s ease";
    mount.style.opacity = "1";
    const todayKey = dateKeyInTimezone(theme.timezone);
    if (readHistory().some(e => e.token === getToken() && e.day === todayKey)) {
      mount.classList.add("has-drawn");
    }
    if (new URLSearchParams(location.search).get("radio") === "1") {
      const notifCard = mount.querySelector("[data-ag-notif-card]");
      if (notifCard) {
        const radioCard = document.createElement("div");
        radioCard.className = "ag-card ag-radio-card";
        radioCard.id = "ag-radio-card";
        radioCard.innerHTML = `<div class="ag-hug-row"><div class="ag-hug-text"><p class="ag-wish-label">Radio Zweisam 📻</p><p class="ag-wish-note" style="margin-bottom:0">KI-Musik aus euren Glossarwörtern — täglich neu generiert, manchmal chill, manchmal tanzbar.</p></div><button class="ag-hug-button ag-radio-open-btn" type="button" id="ag-radio-open-btn" aria-label="Radio öffnen"><span class="ag-hug-emoji" aria-hidden="true">📻</span><span class="ag-hug-label">Öffnen</span></button></div>`;
        notifCard.insertAdjacentElement("beforebegin", radioCard);

        const panelAnchor = mount.querySelector("#ag-glossary-panel") || notifCard;
        const radioPanel = document.createElement("section");
        radioPanel.className = "ag-card ag-mini-panel";
        radioPanel.id = "ag-radio-panel";
        radioPanel.hidden = true;
        radioPanel.innerHTML = `<div class="ag-mini-head"><span class="ag-badge">Radio Zweisam 📻</span><button class="ag-secondary" type="button" id="ag-radio-close">✕</button></div><h2 class="ag-mini-title">Euer täglicher Soundtrack</h2><p class="ag-mini-copy" id="ag-radio-status">KI-Musik, täglich neu — inspiriert von euren Glossarwörtern.</p><div class="ag-radio-visualizer" id="ag-radio-visualizer" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="ag-radio-words-wrap"><p class="ag-radio-words-label">Inspiriert von:</p><div class="ag-radio-words" id="ag-radio-words"></div></div><div class="ag-radio-controls"><button class="ag-button" type="button" id="ag-radio-play-btn"><span class="ag-button-orb" aria-hidden="true"></span><span>▶ Abspielen</span></button><button class="ag-secondary" type="button" id="ag-radio-download-btn" hidden>⬇ Download</button></div><p class="ag-radio-voice-info" id="ag-radio-voice-info"></p>`;
        panelAnchor.insertAdjacentElement("beforebegin", radioPanel);

        // Wire up radio events now that elements exist
        const { openRadioPanel, closeRadioPanel, startOrToggleRadio, downloadRadioTrack } = await import("./radio.js");
        const { dateKeyInTimezone: dk } = await import("./utils.js");
        radioCard.querySelector("#ag-radio-open-btn")?.addEventListener("click", openRadioPanel);
        radioPanel.querySelector("#ag-radio-close")?.addEventListener("click", closeRadioPanel);
        radioPanel.querySelector("#ag-radio-play-btn")?.addEventListener("click", () => startOrToggleRadio(dk(theme.timezone)));
        radioPanel.querySelector("#ag-radio-download-btn")?.addEventListener("click", () => downloadRadioTrack(dk(theme.timezone)));
      }
    }
    syncFromSheets().catch(() => {});

    // All done — dismiss the loading overlay
    finishLoading();
  } catch (error) {
    finishLoading();
    renderError(error);
  }
}
