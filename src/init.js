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
import { restoreStimmung } from "./stimmung.js";
import { initInstallPrompt } from "./installPrompt.js";

const defaultPhotos = { photos: [] };

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

export async function init() {
  injectFonts();
  injectStyles();
  renderShell();
  try {
    const [theme, outcomes, photos, specialDays, wishInbox, backup, quest, missions] = await Promise.all([
      fetchJson("config/theme.json"),
      fetchJson("config/outcomes.json"),
      fetchJson("config/photos.json", defaultPhotos),
      fetchJson("config/special-days.json", { days: [] }),
      fetchJson("config/wish-inbox.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/backup.json", { enabled: false, endpointUrl: "" }),
      fetchJson("config/quest.json", { enabled: false }),
      fetchJson("config/missions.json", { pairs: [] })
    ]);
    state.theme = theme;
    state.outcomes = outcomes;
    state.photos = normalizePhotos(photos);
    state.specialDays = specialDays;
    state.wishInbox = wishInbox && typeof wishInbox === "object" ? wishInbox : { enabled: false, endpointUrl: "" };
    state.backup = backup && typeof backup === "object" ? backup : { enabled: false, endpointUrl: "" };
    state.quest = quest && typeof quest === "object" ? quest : { enabled: false };
    state.missions = missions && Array.isArray(missions.pairs) ? missions : { pairs: [] };
    applyTheme(theme);
    applySpecialDayColors(getPreviewDay() || dateKeyInTimezone(theme.timezone));
    restoreStimmung();
    hydrateCopy();
    renderOdds();
    renderWunschkapsel();
    bindEvents();
    initInstallPrompt();
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
    syncFromSheets().catch(() => {});
  } catch (error) {
    renderError(error);
  }
}
