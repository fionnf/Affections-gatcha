// ── Loading step messages ─────────────────────────────────────────────────────
// A big library of flavourful loading messages. A random subset is picked each
// time the app boots. Keep them short (≤ 60 chars), charming, and in-universe.

export const LOADING_STEPS = [
  // Machine warm-up
  "Maschine wird aufgewärmt…",
  "Kapseln werden sortiert…",
  "Glücksrad kalibrieren…",
  "Seltenheitsstufen laden…",
  "Quantenzufall initialisieren…",
  "Jackpot-Schutzschild deaktivieren…",
  "Gacha-Algorithmus starten…",
  "Kapsel-Drehmechanismus ölen…",
  "Münzschlitz reinigen…",
  "Glücksformeln berechnen…",

  // Data / config
  "Thema abrufen…",
  "Ergebnisse entladen…",
  "Fotos katalogisieren…",
  "Besondere Tage prüfen…",
  "Wunschkapsel-Eingang öffnen…",
  "Cloud-Backup verbinden…",
  "Quest-Protokoll laden…",
  "Missionen aktivieren…",
  "Radio Zweisam einschalten…",

  // Streak / history
  "Streakzähler überprüfen…",
  "Verlaufsspeicher durchsuchen…",
  "Vergangene Kapseln sortieren…",
  "Lieblinge markieren…",
  "Erster Zug des Tages ausstehend…",

  // Atmosphere / world-building
  "Bärlauch wird frisch geerntet…",
  "Bergluft wird importiert…",
  "Fionn tippt gerade…",
  "Zürich-Wetterkanal prüfen…",
  "Fernweh wird kalibriert…",
  "Keltische Glücksspirale spinnen…",
  "Irische Wolken einladen…",
  "Bergpanorama rendern…",
  "Feuerfly-Koordinaten festlegen…",
  "Sonnenuntergang vorberechnen…",
  "Nachthimmel-Atlas laden…",
  "Wasseroberfläche ruhigstellen…",
  "Bergecho testen…",
  "Stadtlichter dimmen…",
  "Straßen-Soundtrack aufnehmen…",

  // Affections / relationship
  "Herzfrequenz synchronisieren…",
  "Umarmungsintensität messen…",
  "Saudades-Level überprüfen…",
  "Gedanken-Ping auf Bereitschaft…",
  "Sprachnachrichten-Warteschlange leeren…",
  "Notfall-Umarmung laden…",
  "Wunschliste aktualisieren…",
  "Gemeinsame Höhenmeter zählen…",
  "Glossar der Zweisamkeit öffnen…",
  "Stille Momente archivieren…",
  "Liebesbriefpapier einlegen…",
  "Letzte Umarmung: vor kurzem ✓",
  "Sehnsucht wird komprimiert…",
  "Fernkuss-Protokoll aktiv…",
  "Küssnacht-Koordinaten sichern…",

  // Playful / absurdist
  "Koffein-Reserve prüfen…",
  "Donuts zählen…",
  "Schrödingers Kapsel öffnen…",
  "Quatenwürfel würfeln…",
  "Zufallsgenerator befragen…",
  "Placebos verwalten…",
  "Chaos-Theorie anwenden…",
  "Schmetterlingseffekt berechnen…",
  "42 bestätigt…",
  "Entropie minimieren…",
  "Wahrscheinlichkeitsmatrix invertieren…",
  "Jackpot-Dämpfer entfernen…",
  "Münze auf Hochglanz polieren…",
  "Glocke putzen…",
  "Konfetti vorbereiten…",
  "Trommelwirbel einschalten…",

  // Technical (humorous)
  "Service Worker begrüßen…",
  "Offline-Modus vorbereiten…",
  "Lokalen Speicher überprüfen…",
  "Sync-Portal öffnen…",
  "Google Sheets flüstern…",
  "PWA-Manifest validieren…",
  "Hintergrundmusik einblenden…",
  "Animationen kalibrieren…",
  "Schriftarten schmücken…",
  "Farbpalette mischen…",
  "Schatten glätten…",
  "Übergänge feinjustieren…",

  // Time of day
  "Tageszeit wird erkannt…",
  "Sonnenaufgang ermitteln…",
  "Abenddämmerung planen…",
  "Mitternachts-Modus prüfen…",
  "Timezone Berlin/Zürich laden…",

  // Languages (matching the app's multilingual spirit)
  "Fáilte romhat…",          // Irish: Welcome
  "Bem-vindo de volta…",    // Portuguese: Welcome back
  "Herzlich willkommen…",
  "On y va…",               // French: Let's go
  "Goede morgen…",          // Dutch: Good morning
  "Buon viaggio…",          // Italian: Safe travels
];

/**
 * Returns `count` randomly shuffled steps from the library.
 * @param {number} count – how many to pick (default 4)
 * @returns {string[]}
 */
export function pickLoadingSteps(count = 4) {
  const shuffled = [...LOADING_STEPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
