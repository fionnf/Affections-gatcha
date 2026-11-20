// Everything the Lugano page says, in one place: edit the words here.
// (ids must stay unique; the tests check the structure.)

export const TRIP = {
  title: "Drei Kameras, ein Tag",
  where: "Lugano",
  date: "Samstag, 21. November",
  people: [
    { id: "fionn", name: "Fionn" },
    { id: "lennart", name: "Lennart" },
    { id: "natalie", name: "Natalie" }
  ],
  url: "https://fionnf.github.io/Affections-gatcha/lugano.html"
};

// Stand heute — der Plan darf sich ändern.
export const STOPS = [
  {
    id: "bre", icon: "🚠", title: "Monte Brè",
    sub: "Mit der Standseilbahn hoch. Sie fährt seit 1912.",
    fact: "925 m, und gilt als einer der sonnigsten Punkte der Schweiz.",
    light: "Himmel und Hang sind verschieden hell. Miss auf beides und nimm einen Wert dazwischen."
  },
  {
    id: "gipfel", icon: "⛰️", title: "Der Gipfel",
    sub: "Plan A: Monte Boglia, 1516 m.",
    fact: "Der Brè ist nur ein Vorberg: Der Boglia ragt fast 600 m höher auf.",
    light: "Oben ist die Luft klar und das Licht hart. Blende 8 bis 11, Entfernung auf ∞, fertig. Ersatzbatterie in die Innentasche."
  },
  {
    id: "abstieg", icon: "🌲", title: "Runter nach Gandria",
    sub: "Wald, Mauern, Lichtflecken.",
    fact: "Im Wald ist es dunkler, als es aussieht.",
    light: "Blende offener (4 bis 5.6) und nicht länger als 1/60 aus der Hand."
  },
  {
    id: "gandria", icon: "🏘️", title: "Gandria",
    sub: "Mittagessen im Dorf ohne Autos.",
    fact: "Das Zentrum ist autofrei. Früher wurde hier geschmuggelt, was die Grenze hergab.",
    light: "Enge Gassen heissen Lichtstreifen und tiefen Schatten. Miss auf die Wand im Licht, wenn sie dein Motiv ist."
  },
  {
    id: "see", icon: "🌊", title: "Zurück am See",
    sub: "Olivenweg und Uferpromenade nach Lugano.",
    fact: "Der Olivenweg ist 1936 in den Fels gehauen worden.",
    light: "Wasser blendet. Bei Sonne Blende 11 bis 16 und 1/250 oder kürzer."
  },
  {
    id: "abend", icon: "🌆", title: "Lugano am Abend",
    sub: "Abendessen, und die Stadt wird blau.",
    fact: "Die Sonne geht kurz vor 17 Uhr unter.",
    light: "Danach: Blende ganz auf, 1/30, Ellbogen an den Körper, ausatmen, drücken."
  }
];

export const PACK = [
  { id: "film", text: "Film. Lieber zwei Rollen als eine." },
  { id: "batterie", text: "Ersatzbatterie für den Belichtungsmesser" },
  { id: "stift", text: "Stift fürs Logbuch" },
  { id: "handschuhe", text: "Handschuhe und Mütze (die Kamera friert nicht, die Finger schon)" },
  { id: "wasser", text: "Wasser und etwas zum Naschen" },
  { id: "chf", text: "Franken und Karte" },
  { id: "regen", text: "Ein Beutel gegen Regen für die Kamera" },
  { id: "gurt", text: "Kameragurt ums Handgelenk" }
];

// ── Kamera-Schule ────────────────────────────────────────────────────────────
// Bausteine: p, tip, steps, parts, sim, sunny, focus, compose.
export const PARTS = [
  { id: "hebel", n: 1, name: "Transporthebel", text: "Nach jedem Bild ganz durchziehen. Er spannt den Verschluss und schiebt den Film ein Bild weiter. Geht er nicht mehr: Der Film ist voll." },
  { id: "ausloeser", n: 2, name: "Auslöser", text: "Sanft drücken, nicht reissen. Ausatmen und dabei drücken." },
  { id: "zeit", n: 3, name: "Zeitenrad", text: "Wie lange der Verschluss offen bleibt. 1/500 ist ganz kurz, 1/30 schon lang. B heisst: offen, solange du drückst." },
  { id: "zaehler", n: 4, name: "Bildzähler", text: "Zeigt, welches Bild als Nächstes dran ist. Bei 36 ist Schluss." },
  { id: "kurbel", n: 5, name: "Rückspulkurbel", text: "Nur am Ende der Rolle. Rückspulknopf drücken (meist unten), dann kurbeln, bis es leicht geht." },
  { id: "iso", n: 6, name: "Filmempfindlichkeit", text: "Hier stellst du ein, was auf der Filmpackung steht (ISO). Der Belichtungsmesser rechnet damit." },
  { id: "blende", n: 7, name: "Blendenring", text: "Wie weit sich die Blende öffnet. Kleine Zahl heisst grosse Öffnung: viel Licht, unscharfer Hintergrund." },
  { id: "fokus", n: 8, name: "Entfernungsring", text: "Zum Scharfstellen. Du drehst, bis das Bild im Sucher klar ist." }
];

export const LESSONS = [
  {
    id: "kamera", emoji: "🎞️", title: "Dein Pentax", minutes: 2,
    blocks: [
      { type: "p", text: "Alles, was du heute brauchst, sitzt an acht Stellen. Tippe auf die Nummern." },
      { type: "parts" },
      { type: "tip", text: "Dein Modell sieht etwas anders aus (K1000, ME, MX, Spotmatic …). Die Teile heissen überall gleich, nur der Platz wechselt." }
    ],
    check: {
      q: "Das letzte Bild ist gemacht und der Hebel klemmt. Was jetzt?",
      options: ["Rückwand öffnen und Film rausnehmen", "Zurückspulen: Knopf drücken, Kurbel drehen", "Fester ziehen"],
      correct: 1,
      why: "Öffnest du die Rückwand mit Film drin, ist die ganze Rolle belichtet, also weg."
    }
  },
  {
    id: "film", emoji: "🧵", title: "Film einlegen", minutes: 2,
    blocks: [
      { type: "steps", items: [
        "Kurbel links oben hochziehen: Die Rückwand springt auf. Im Schatten, nicht in der prallen Sonne.",
        "Die Filmpatrone links einlegen, Kurbel wieder runterdrücken.",
        "Die Filmzunge in den Schlitz der rechten Spule stecken, bis sie hält.",
        "Hebel ein- bis zweimal ziehen: Die Löcher am Filmrand müssen in den Zähnen der Walze sitzen.",
        "Rückwand zu. Weiterziehen und auslösen, bis der Zähler auf 1 steht.",
        "ISO einstellen. So steht, was auf der Packung steht."
      ] },
      { type: "tip", text: "Dreht sich beim Weiterziehen die Rückspulkurbel mit, greift der Film. Tut sie es nicht, noch mal von vorn." }
    ],
    check: {
      q: "Woran merkst du, dass der Film richtig greift?",
      options: ["Die Rückspulkurbel dreht beim Transport mit", "Der Zähler springt auf 0", "Es klickt besonders laut"],
      correct: 0,
      why: "Die Kurbel hängt am Film. Bewegt er sich, bewegt sie sich."
    }
  },
  {
    id: "dreieck", emoji: "🔺", title: "Das Dreieck", minutes: 3,
    blocks: [
      { type: "p", text: "Drei Regler, ein Ziel: genau so viel Licht auf den Film wie nötig. Blende und Zeit teilen sich die Arbeit. Mach das eine grösser, wird das andere kleiner." },
      { type: "sim" },
      { type: "tip", text: "Blende bestimmt auch, wie weich der Hintergrund wird. Zeit bestimmt auch, ob Bewegung einfriert. ISO ist der Film: empfindlicher heisst weniger Licht nötig." }
    ],
    check: {
      q: "Du willst den Hintergrund schön weich. Was stellst du ein?",
      options: ["Blende 16", "Blende 2", "Zeit 1/1000"],
      correct: 1,
      why: "Kleine Zahl, grosse Öffnung, viel weicher Hintergrund. Dann die Zeit kürzer machen, damit es nicht zu hell wird."
    }
  },
  {
    id: "messer", emoji: "🧭", title: "Der Belichtungsmesser", minutes: 3,
    blocks: [
      { type: "p", text: "Im Sucher zeigt eine Nadel (oder zeigen LEDs), ob es zu hell oder zu dunkel wird. Die Mitte ist richtig. Zeigt sie nach oben (+), kommt zu viel Licht an: Blende schliessen oder Zeit kürzen." },
      { type: "p", text: "Und wenn die Batterie leer ist? Dann hilft die Sunny-16-Regel: Bei Sonne Blende 16, die Zeit ist 1/ISO. Probier's:" },
      { type: "sunny" },
      { type: "tip", text: "Farbnegativfilm verzeiht zu viel Licht eher als zu wenig. Im Zweifel eine Blende mehr." }
    ],
    check: {
      q: "Wolkenloser Tag, Film mit ISO 200. Was stimmt ungefähr?",
      options: ["Blende 2, 1/30", "Blende 16, 1/250", "Blende 4, 1/4000"],
      correct: 1,
      why: "Sunny 16: Blende 16 und die Zeit nahe 1/ISO. Bei ISO 200 ist das 1/250."
    }
  },
  {
    id: "fokus", emoji: "🎯", title: "Scharfstellen", minutes: 2,
    blocks: [
      { type: "p", text: "In der Mitte des Suchers sitzt ein kleiner Kreis, geteilt in zwei Hälften. Drehe am Entfernungsring, bis die Linie durchgeht. Probier's:" },
      { type: "focus" },
      { type: "tip", text: "Weite Aussicht? Entfernung auf ∞ und Blende 8 oder 11: Alles ist scharf, du musst nichts mehr drehen." }
    ],
    check: {
      q: "Im Kreis sind die beiden Hälften versetzt. Was heisst das?",
      options: ["Nicht scharf: weiterdrehen", "Alles in Ordnung", "Der Film ist voll"],
      correct: 0,
      why: "Erst wenn die Linie durchgeht, sitzt die Schärfe."
    }
  },
  {
    id: "bild", emoji: "🖼️", title: "Bildaufbau in vier Regeln", minutes: 2,
    blocks: [
      { type: "compose" },
      { type: "tip", text: "Und die fünfte: zwei Schritte näher ran. Fast immer wird das Bild besser." }
    ],
    check: {
      q: "Wohin gehört der Horizont meistens?",
      options: ["Genau in die Mitte", "Auf eine der Drittel-Linien", "Ganz an den unteren Rand"],
      correct: 1,
      why: "Mitte teilt das Bild in zwei gleiche Hälften, die sich streiten. Ein Drittel lässt eine Hälfte gewinnen."
    }
  },
  {
    id: "unterwegs", emoji: "🎒", title: "Unterwegs und danach", minutes: 2,
    blocks: [
      { type: "steps", items: [
        "Rückwand nie unterwegs öffnen.",
        "Kälte frisst Batterien. Ersatz in die Innentasche, nah am Körper.",
        "Nicht lange direkt in die Sonne zielen. Dem Verschluss und dem Auge zuliebe.",
        "Ein Bild als Joker aufheben. Der beste Moment kommt immer als Letztes.",
        "Logbuch führen: Bild-Nr., Blende, Zeit, Licht. Beim Entwickeln siehst du, was gut war.",
        "Danach: ganz zurückspulen, bis der Widerstand weg ist. Erst dann Rückwand auf, Dose beschriften, ab ins Labor."
      ] }
    ],
    check: {
      q: "Wann darf die Rückwand zum ersten Mal wieder auf?",
      options: ["Sobald der Film voll ist", "Erst nach dem Rückspulen", "Wenn man ein neues Bild will"],
      correct: 1,
      why: "Erst wenn der Film zurück in der Patrone steckt, ist er sicher vor Licht."
    }
  }
];

// ── Foto-Aufgaben ────────────────────────────────────────────────────────────
// who: natalie | lennart | fionn | all. stop: eine der STOPS-ids. frames: ungefähre Bilder.
export const TASKS = [
  // Natalie: Lernpfad
  { id: "n1", who: "natalie", stop: "bre", skill: "Licht", title: "Der Messer-Check", frames: 2,
    how: "Richte den Belichtungsmesser erst auf den hellen Himmel, dann auf den Hang. Schreib beide Werte ins Logbuch. Dann ein Bild der Aussicht: einmal nach dem Messer, einmal eine Blende offener." },
  { id: "n2", who: "natalie", stop: "bre", skill: "Blende", title: "Zwei Schärfen", frames: 2,
    how: "Ein Geländer oder ein Ast ganz nah, die Berge dahinter. Erst alles scharf (Blende 11), dann nur das Nahe (Blende 2.8 bis 4). Beim Entwickeln vergleichen." },
  { id: "n3", who: "natalie", stop: "gipfel", skill: "Licht", title: "Silhouette", frames: 1,
    how: "Jemand vor dem hellen Himmel. Miss auf den Himmel, nicht aufs Gesicht, und lass die Person schwarz werden." },
  { id: "n4", who: "natalie", stop: "gipfel", skill: "Fokus", title: "Unendlich", frames: 1,
    how: "Die ganze Weite: Entfernung auf ∞, Blende 8 oder 11. Der Horizont auf eine Drittel-Linie." },
  { id: "n5", who: "natalie", stop: "abstieg", skill: "Licht", title: "Lichtflecken im Wald", frames: 1,
    how: "Sonne, die durch Blätter fällt. Wenn die Flecken dein Motiv sind, miss auf sie. Der Rest wird dunkel, und genau das ist der Effekt." },
  { id: "n6", who: "natalie", stop: "gandria", skill: "Bild", title: "Gasse mit Linien", frames: 1,
    how: "Eine enge Gasse, in der die Linien zusammenlaufen. Stell dich mittig und schau, wo sie sich treffen." },
  { id: "n7", who: "natalie", stop: "gandria", skill: "Fokus", title: "Nah ran", frames: 1,
    how: "Ein Detail: Tür, Wäscheleine, Katze. So nah, wie der Sucher noch scharf wird (bei vielen Normalobjektiven etwa 45 cm)." },
  { id: "n8", who: "natalie", stop: "see", skill: "Zeit", title: "Bewegung einfrieren", frames: 2,
    how: "Ein Schiff, ein Vogel, ein Hund: 1/500 oder kürzer. Dann dasselbe noch mal mit 1/30 und mitziehen. Der Hintergrund verwischt, das Motiv bleibt." },
  { id: "n9", who: "natalie", stop: "abend", skill: "Licht", title: "Blaue Stunde", frames: 2,
    how: "Wenn es dämmert: Blende ganz auf, Zeit 1/30, Ellbogen an den Körper, ausatmen, auslösen. An eine Wand lehnen hilft." },

  // Lennart: Linien und Räume
  { id: "l1", who: "lennart", stop: "bre", skill: "Bild", title: "Die Bahn als Bauwerk", frames: 1,
    how: "Die Standseilbahn, die Station oder die Schienen. Eine Linie, die das ganze Bild trägt." },
  { id: "l2", who: "lennart", stop: "gipfel", skill: "Bild", title: "Massstab", frames: 1,
    how: "Ein Mensch ganz klein in der grossen Landschaft. Erst durch ihn sieht man, wie gross sie ist." },
  { id: "l3", who: "lennart", stop: "abstieg", skill: "Licht", title: "Mauer, Treppe, Terrasse", frames: 1,
    how: "Textur im schrägen Licht. Geh nah ran, lass die Sonne seitlich kommen." },
  { id: "l4", who: "lennart", stop: "gandria", skill: "Bild", title: "Nur Kanten und Schatten", frames: 1,
    how: "Ein Bild, das aus Dach, Gasse und Bogen besteht. Keine Menschen, keine Farben, die ablenken." },
  { id: "l5", who: "lennart", stop: "gandria", skill: "Bild", title: "Der Rahmen im Rahmen", frames: 1,
    how: "Ein Motiv durch einen Bogen, ein Fenster oder eine Tür fotografiert." },
  { id: "l6", who: "lennart", stop: "see", skill: "Bild", title: "Symmetrie", frames: 1,
    how: "Eine Baumreihe, ein Geländer, die Promenade: streng und genau mittig. Hier darf die Mitte sein." },
  { id: "l7", who: "lennart", stop: "see", skill: "Licht", title: "Spiegelung", frames: 1,
    how: "Das Ufer im Wasser. Kamera ruhig halten, Blende 8, und der Horizont in die Mitte oder bewusst daneben." },
  { id: "l8", who: "lennart", stop: "abend", skill: "Licht", title: "Fassade mit Licht", frames: 2,
    how: "Fenster, die leuchten, Laternen, ein Haus im Blau. Blende offen, ruhig stehen." },
  { id: "l9", who: "lennart", stop: "abend", skill: "Bild", title: "Das Wandbild", frames: 1,
    how: "Ein Bild, das du dir an die Wand hängen würdest." },

  // Fionn: Menschen und Momente
  { id: "f1", who: "fionn", stop: "bre", skill: "Mensch", title: "Hoch hinaus", frames: 1,
    how: "Die beiden in der Bahn nach oben, ohne dass sie es merken." },
  { id: "f2", who: "fionn", stop: "gipfel", skill: "Mensch", title: "Hände", frames: 1,
    how: "Hände bei etwas: Karte, Becher, Rucksackriemen." },
  { id: "f3", who: "fionn", stop: "abstieg", skill: "Mensch", title: "Rücken", frames: 1,
    how: "Die zwei von hinten auf dem Weg, ein Stück voraus." },
  { id: "f4", who: "fionn", stop: "gandria", skill: "Blende", title: "Mittagstisch von oben", frames: 1,
    how: "Teller, Gläser, Brot. Blende offen, nah ran." },
  { id: "f5", who: "fionn", stop: "gandria", skill: "Licht", title: "Gesicht im Gegenlicht", frames: 1,
    how: "Ein Porträt mit Licht von hinten, sodass ein heller Rand um den Kopf entsteht. Miss aufs Gesicht." },
  { id: "f6", who: "fionn", stop: "see", skill: "Mensch", title: "Kurz vor dem Lachen", frames: 1,
    how: "Nicht das Lachen, den Moment davor." },
  { id: "f7", who: "fionn", stop: "see", skill: "Bild", title: "Fundstück des Tages", frames: 1,
    how: "Eine Kastanie, ein Blatt, ein Ticket. Gross, nah, Stillleben." },
  { id: "f8", who: "fionn", stop: "abend", skill: "Mensch", title: "Wir drei durchs Fenster", frames: 1,
    how: "Von draussen ins Lokal. Mit Spiegelung, wenn es klappt." },
  { id: "f9", who: "fionn", stop: "abend", skill: "Bild", title: "Das letzte Bild der Rolle", frames: 1,
    how: "Das Bild Nr. 36 mit Absicht machen. Nicht übrig lassen." },

  // Zusammen
  { id: "a1", who: "all", stop: "bre", skill: "Team", title: "Drei Blicke", frames: 3,
    how: "Alle drei fotografieren dasselbe Motiv: weit, nah, aus einem ungewöhnlichen Winkel. Beim Entwickeln vergleichen." },
  { id: "a2", who: "all", stop: "gandria", skill: "Team", title: "Kameratausch", frames: 1,
    how: "Ein Bild mit der Kamera einer anderen Person. Sie erklärt kurz, du drückst." },
  { id: "a3", who: "all", stop: "see", skill: "Team", title: "Wir drei", frames: 1,
    how: "Gruppenbild: Selbstauslöser oder eine freundliche Person fragen." },
  { id: "a4", who: "all", stop: "abend", skill: "Team", title: "Das geheime Lieblingsbild", frames: 1,
    how: "Jeder merkt sich insgeheim sein Lieblingsmotiv und schreibt die Bildnummer ins Logbuch. Aufgelöst beim Entwickeln." }
];

// ── Bingo: nur gucken ────────────────────────────────────────────────────────
export const BINGO = [
  { icon: "🌴", text: "Palme" },
  { icon: "⛴️", text: "Schiff" },
  { icon: "🚠", text: "Standseilbahn" },
  { icon: "🐈", text: "Katze" },
  { icon: "⛪", text: "Kapelle" },
  { icon: "🌰", text: "Marroni-Stand" },
  { icon: "🇨🇭", text: "Schweizer Fahne" },
  { icon: "🦢", text: "Schwan" },
  { icon: "🍷", text: "Merlot auf der Karte" }
];

// ── Quiz ─────────────────────────────────────────────────────────────────────
export const QUIZ = [
  { id: "q1", round: "Tessin", q: "Was ist die Hauptstadt des Tessins?",
    options: ["Lugano", "Bellinzona", "Locarno"], correct: 1,
    why: "Lugano ist mit knapp 64'000 Einwohnern die grösste Stadt im Tessin. Hauptstadt ist trotzdem Bellinzona." },
  { id: "q2", round: "Tessin", q: "Wie heisst der Luganersee auf Italienisch noch?",
    options: ["Verbano", "Ceresio", "Benaco"], correct: 1,
    why: "Ceresio. Verbano ist der Lago Maggiore, Benaco der Gardasee." },
  { id: "q3", round: "Tessin", q: "Wie hoch ist der Monte Brè?",
    options: ["625 m", "925 m", "1225 m"], correct: 1,
    why: "925 m, nur 13 Meter mehr als der Nachbar Monte San Salvatore (912 m)." },
  { id: "q4", round: "Tessin", q: "Seit wann fährt die Standseilbahn auf den Monte Brè?",
    options: ["1892", "1912", "1952"], correct: 1,
    why: "Seit 1912. Sie fährt von Cassarate nach oben." },
  { id: "q5", round: "Tessin", q: "Wofür war Gandria früher berüchtigt?",
    options: ["Uhrenproduktion", "Schmuggel", "Weinbau auf dem Gipfel"], correct: 1,
    why: "Schmuggel über die nahe Grenze. Das Schweizerische Zollmuseum steht noch heute am gegenüberliegenden Ufer, bei den Cantine di Gandria." },
  { id: "q6", round: "Tessin", q: "Was geschah 1709 mit den Olivenbäumen bei Gandria?",
    options: ["Sie wurden zum Schutzgebiet", "Ein extrem harter Winter tötete fast alle", "Sie wurden nach Italien verkauft"], correct: 1,
    why: "Bis dahin war Gandria für sein Olivenöl bekannt. Der Winter 1709 hat fast alle Bäume erfrieren lassen." },
  { id: "q7", round: "Schweiz", q: "Wie kommt man ins Zentrum von Gandria?",
    options: ["Mit dem Auto bis vor die Haustür", "Zu Fuss oder mit dem Schiff", "Mit der Seilbahn von oben"], correct: 1,
    why: "Der Dorfkern ist autofrei. Viele kommen mit dem Schiff, und wir kommen zu Fuss." },
  { id: "q8", round: "Schweiz", q: "Wie lang ist der Gotthard-Basistunnel, der das Tessin mit dem Norden verbindet?",
    options: ["17 km", "57 km", "107 km"], correct: 1,
    why: "57 km, 2016 eröffnet. Der längste Eisenbahntunnel der Welt." },
  { id: "q9", round: "Schweiz", q: "Wie viele Landessprachen hat die Schweiz?",
    options: ["3", "4", "5"], correct: 1,
    why: "Deutsch, Französisch, Italienisch und Rätoromanisch. Im Tessin gilt Italienisch." },
  { id: "q10", round: "Schweiz", q: "Welcher Berg ist der höchste der Schweiz?",
    options: ["Matterhorn", "Dufourspitze", "Jungfrau"], correct: 1,
    why: "Die Dufourspitze, 4634 m. Das Matterhorn (4478 m) ist nur berühmter." },
  { id: "q11", round: "Kamera", q: "Woher kommt der Name Pentax?",
    options: ["Aus Pentaprisma und Contax", "Vom Gründer Pentak", "Japanisch für scharfes Auge"], correct: 0,
    why: "Pentaprisma (das Prisma im Sucher) plus Contax, eine Kamera von Zeiss Ikon. Den Namen hatte erst Zeiss Ikon, Asahi übernahm ihn 1957." },
  { id: "q12", round: "Kamera", q: "Was war die Asahiflex von 1952?",
    options: ["Das erste Farbfilm-Blitzgerät", "Die erste japanische Spiegelreflex für Kleinbildfilm", "Eine Kamera für Unterwasser"], correct: 1,
    why: "Die erste japanische Spiegelreflexkamera für 35-mm-Film, von Asahi, der Firma hinter Pentax." }
];

export const QUIZ_RATING = [
  { min: 11, text: "Lugano-Insider. Du darfst die Speisekarte vorlesen." },
  { min: 8, text: "Starker Instinkt. Der Rest war Pech." },
  { min: 5, text: "Solide. Heute lernst du den Rest im Gehen." },
  { min: 0, text: "Dafür hast du jetzt zwölf neue Sachen gelernt." }
];

export const LIGHT_NOTE = "Die Zahlen sind grobe Richtwerte. Dein Belichtungsmesser hat im Zweifel recht.";
