// Paste this entire block into the browser DevTools console on the gacha page.
// Restores Lennart's full 21-day pull history (May 1–21).
// 18 days confirmed from WhatsApp; 3 days (05-02, 05-13, 05-14) computed
// deterministically from the app's seed function — these are the exact pulls
// the app generated, not guesses.

(function () {
  const STORAGE_KEY = "affektions-gacha:history:v1";
  // Auto-detect token the same way the app does: URL ?token= param, else default
  const TOKEN = new URLSearchParams(window.location.search).get("token") || "Lennart";

  const recovered = [
    {
      day: "2026-05-01", token: TOKEN,
      categoryId: "rare", categoryLabel: "Selten", tone: "rare",
      title: "6a-Belay-Pass",
      message: "Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-01T12:00:00").getTime()
    },
    {
      // Computed: seed picks Foto-Drop, photo index 70 (URL expired, set null)
      day: "2026-05-02", token: TOKEN,
      categoryId: "photo", categoryLabel: "Foto-Drop", tone: "photo",
      title: "Foto-Drop",
      message: "Die Maschine spuckt eine Erinnerung aus. Das zählt als Preis, auch wenn sie sentimental tut.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-02T12:00:00").getTime()
    },
    {
      day: "2026-05-03", token: TOKEN,
      categoryId: "rare", categoryLabel: "Selten", tone: "rare",
      title: "6a-Belay-Pass",
      message: "Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-03T12:00:00").getTime()
    },
    {
      day: "2026-05-04", token: TOKEN,
      categoryId: "jackpot", categoryLabel: "JACKPOT", tone: "jackpot",
      title: "JACKPOT: Der Fionn-Quest-Sieger",
      message: "Lennart ist der offizielle Gewinner. 24h lang hast du die absolute Entscheidungsgewalt über alle Freizeitaktivitäten.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-04T12:00:00").getTime()
    },
    {
      day: "2026-05-05", token: TOKEN,
      categoryId: "common", categoryLabel: "Gewöhnlich", tone: "soft",
      title: "Barróg (IE)",
      message: "Eine feste Umarmung (20 Sekunden Minimum).",
      link: null, photo: null,
      revealedAt: new Date("2026-05-05T12:00:00").getTime()
    },
    {
      day: "2026-05-06", token: TOKEN,
      categoryId: "uncommon", categoryLabel: "Ungewöhnlich", tone: "warm",
      title: "Sprachnachricht",
      message: "Du darfst eine kleine Sprachnachricht anfordern. Thema frei, Länge wie eine gute Aussicht: nicht zu kurz.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-06T12:00:00").getTime()
    },
    {
      day: "2026-05-07", token: TOKEN,
      categoryId: "niete", categoryLabel: "Niete", tone: "quiet",
      title: "Baugespann-Sperre",
      message: "Hier entsteht demnächst ein Gewinn. Aktuell sieht man nur die Holzpfosten auf dem Dach.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-07T12:00:00").getTime()
    },
    {
      day: "2026-05-08", token: TOKEN,
      categoryId: "quest", categoryLabel: "Mini-Quest", tone: "quest",
      title: "Design-Safari",
      message: "Schick mir ein Foto von einem Gebäude oder Detail, das du heute siehst und das entweder genial oder ein Verbrechen ist.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-08T12:00:00").getTime()
    },
    {
      day: "2026-05-09", token: TOKEN,
      categoryId: "jackpot", categoryLabel: "JACKPOT", tone: "jackpot",
      title: "JACKPOT: Überraschungs-Wochenende",
      message: "Fionn plant einen kompletten Tag für dich. Du musst nur sagen, wann du Zeit hast.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-09T12:00:00").getTime()
    },
    {
      day: "2026-05-10", token: TOKEN,
      categoryId: "special", categoryLabel: "Laf Schnell!", tone: "jackpot",
      title: "🌟 SSR-Speed-Dämon-Pull! 🌟",
      message: "Hey Lennart! An diesem besonderen Tag in München beim Wings for Life World Run, möge dein Lauf mit deine friends ein legendärer Gacha-Pull sein: epische Speed, Ausdauer-Verlust und alle Kumpels SSR-Rarität (Super Super Rare, die Besten der Besten!) für maximalen Spaß! Rennt wie die Teufel, lacht euch schlapp und erobert die Strecke aus dem Olympiapark wie Bosse. Ich vermisse dich total hier in Zürich, aber freue mich fuer dich!",
      link: null, photo: null,
      revealedAt: new Date("2026-05-10T12:00:00").getTime()
    },
    {
      day: "2026-05-11", token: TOKEN,
      categoryId: "common", categoryLabel: "Gewöhnlich", tone: "soft",
      title: "Gedanken-Ping",
      message: "Du musst jetzt acht Sekunden an mich denken. Die Maschine behauptet, sie könne das überprüfen <3.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-11T12:00:00").getTime()
    },
    {
      day: "2026-05-12", token: TOKEN,
      categoryId: "quest", categoryLabel: "Mini-Quest", tone: "quest",
      title: "Geräusch-Notiz",
      message: "Beschreib mir das markanteste Geräusch deines Tages in maximal fünf Wörtern. Poetisch oder komplett nüchtern ist beides erlaubt.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-12T12:00:00").getTime()
    },
    {
      // Computed: seed picks Ungewöhnlich → "Foto-Anfrage"
      day: "2026-05-13", token: TOKEN,
      categoryId: "uncommon", categoryLabel: "Ungewöhnlich", tone: "warm",
      title: "Foto-Anfrage",
      message: "Du darfst ein süßes, schönes oder dummes Foto anfordern. Die Maschine empfiehlt: Alle drei.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-13T12:00:00").getTime()
    },
    {
      // Computed: seed picks Ungewöhnlich → "Saudades (PT)"
      day: "2026-05-14", token: TOKEN,
      categoryId: "uncommon", categoryLabel: "Ungewöhnlich", tone: "warm",
      title: "Saudades (PT)",
      message: "Wenn man sich mal einen Tag vermisst: Ein Gutschein für ein spontanes Facetime-Date.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-14T12:00:00").getTime()
    },
    {
      day: "2026-05-15", token: TOKEN,
      categoryId: "special", categoryLabel: "Abendessen 🍽️", tone: "rare",
      title: "Fionn lädt zum Abendessen ein 🍽️",
      message: "Heute Abend geht's auf Fionns Rechnung. Treffpunkt: Stauffacher, 20:00 Uhr.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-15T12:00:00").getTime()
    },
    {
      day: "2026-05-16", token: TOKEN,
      categoryId: "photo", categoryLabel: "Foto-Drop", tone: "photo",
      title: "Bildkapsel",
      message: "Heute gibt es kein Gutschein-Drama, nur ein kleines Bild.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-16T12:00:00").getTime()
    },
    {
      day: "2026-05-17", token: TOKEN,
      categoryId: "uncommon", categoryLabel: "Ungewöhnlich", tone: "warm",
      title: "Tehran & Guatemala Tales",
      message: "Du darfst eine Geschichte aus deiner Reisezeit einfordern, die du noch nicht kennst.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-17T12:00:00").getTime()
    },
    {
      day: "2026-05-18", token: TOKEN,
      categoryId: "niete", categoryLabel: "Niete", tone: "quiet",
      title: "Züri-Regen",
      message: "Grauer Himmel über Wiedikon. Kein Preis, nur das Bedürfnis nach einem sehr großen Tee.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-18T12:00:00").getTime()
    },
    {
      day: "2026-05-19", token: TOKEN,
      categoryId: "quest", categoryLabel: "Mini-Quest", tone: "quest",
      title: "Drei-Wort-Reisebericht",
      message: "Schick Fionn deinen Tag in genau drei Worten, als wärst du sehr erschöpft in einem Zug.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-19T12:00:00").getTime()
    },
    {
      day: "2026-05-20", token: TOKEN,
      categoryId: "niete", categoryLabel: "Niete", tone: "quiet",
      title: "Denkmalschutz",
      message: "Dieser Slot darf aus historischen Gründen heute nicht verändert oder mit Preisen befüllt werden. Ein Klassiker unter den Nieten.",
      link: null, photo: null,
      revealedAt: new Date("2026-05-20T12:00:00").getTime()
    },
    {
      day: "2026-05-21", token: TOKEN,
      categoryId: "special", categoryLabel: "Packliste 🧳", tone: "quest",
      title: "Deine Aufgabe: ein Brief 💌",
      message: "Ich kann es kaum erwarten. Den Rest findest du auf der Liste die ich dir gegeben habe — aber eins noch: deine HiFi-Ohrstöpsel. Vertrau mir.\n\nUnd eine Aufgabe von der Maschine: Schreib mir einen kurzen Brief auf Papier. Nicht lang, nicht perfekt — einfach was du gerade denkst. Bring ihn mit. Ich lese ihn wenn wir uns sehen. Bis bald. 🐚",
      link: null, photo: null,
      revealedAt: new Date("2026-05-21T12:00:00").getTime()
    }
  ];

  // Merge with any existing entries (keep existing per-day if present, recovered fills gaps)
  let existing = [];
  try { existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (_) {}

  const today = new Date().toISOString().slice(0, 10);
  // Remove any "(wiederhergestellt)" fakes and any future entries
  existing = existing.filter(e => e.title !== "(wiederhergestellt)" && e.day <= today);

  const existingDays = new Set(existing.map(e => `${e.day}|${e.token}`));
  const toAdd = recovered.filter(e => !existingDays.has(`${e.day}|${e.token}`));

  const merged = [...existing, ...toAdd]
    .sort((a, b) => a.day < b.day ? 1 : a.day > b.day ? -1 : 0);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  console.log(`✅ Restored ${toAdd.length} missing entries. Total: ${merged.length} days.`);

  // Push to Sheets immediately so the reload doesn't overwrite local with stale data.
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbzod1vU7KQEjno6-vq5uGSuWWNsft8o7igqXprYbxlFNHTSN2Vindxc0nWCVrYspjKV5Q/exec";
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ type: "gacha-backup", token: TOKEN, history: merged, favourites: [], streak: 21, tokens: {}, questPoints: 0 })
  })
    .then(r => r.json())
    .then(d => console.log("📊 Sheets backup:", d.ok ? "✅ done" : "❌ " + d.error))
    .catch(e => console.warn("📊 Sheets backup failed (offline?):", e.message));

  console.log("Now reload the page — history should appear.");
})();
