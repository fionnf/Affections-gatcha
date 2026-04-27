# Affektions-Gacha für Webflow

Ein kleines deutsches NFC/Webflow-Geschenk für Lennart: Er tappt die 3D-gedruckte Gacha-Maschine, Münze oder Kapsel, und die Seite zeigt genau eine Tageskapsel.

Nicht jeder Tag ist ein Gewinn. Manche Tage sind Nieten, Mini-Quests, verfluchte Kapseln, Foto-Drops oder Jackpots.

## Dateien

- `webflow-loader.html`  
  Der winzige Copy-Paste-Code für Webflow. Danach muss Webflow kaum noch angefasst werden.

- `dist/affection-gacha.js`  
  Die eigentliche Maschine. Wird von GitHub Pages geladen.

- `config/theme.json`  
  Farben, Name, Texte im Interface, Timing und Loading-Schritte.

- `config/outcomes.json`  
  Alle Kategorien, Gewichte und deutschen Antworten.

- `config/photos.json`  
  Foto-Liste und Captions.

- `EDITING.md`  
  Kurzanleitung, welche Datei du ändern musst, ohne Code anzufassen.

- `webflow-embed.html`  
  Alte self-contained Variante. Funktioniert weiterhin, aber empfohlen ist jetzt `webflow-loader.html`.

- `media-preview.html`  
  Vorschauseite für synchronisierte Fotos und Videos. Nach dem GitHub-Pages-Build erreichbar unter `https://fionnf.github.io/Affections-gatcha/media-preview.html`.

- `scripts/validate-gacha-config.js`  
  Prüft, ob die JSON-Konfiguration gültig ist und ob die Gewichte sauber sind.

- `scripts/simulate-odds.js`  
  Simuliert viele Tage und zeigt, ob die Statistik ungefähr den gesetzten Wahrscheinlichkeiten entspricht.

- `scripts/build-photo-manifest.js`  
  Erstellt aus einem exportierten Apple-Photos-Album eine `photos.json`.

- `scripts/sync-shared-album.js`  
  Liest `config/album-source.json` und schreibt `config/photos.json` aus einem öffentlichen iCloud Shared Album oder einem öffentlichen Google Photos Link.

- `config/album-source.json`  
  Quelle für den automatischen Album-Sync. URL, Provider und Output stehen hier.

- `.github/workflows/validate-gacha.yml`  
  GitHub Action, die bei Änderungen automatisch validiert und simuliert.

- `.github/workflows/sync-shared-album.yml`  
  GitHub Action, die per `workflow_dispatch` und nach Cron-Plan das Album syncen und `config/photos.json` zurück committen kann.

## Webflow Setup

1. Erstelle ein GitHub Repo, zum Beispiel `lennart-gacha`.
2. Lade diesen Ordner ins Repo.
3. Aktiviere GitHub Pages für das Repo.
4. Ersetze in `webflow-loader.html` `USERNAME` und `REPO`.
5. Erstelle in Webflow eine neue Seite, zum Beispiel `/gacha`.
6. Füge ein `Embed`-Element ein.
7. Kopiere den Inhalt aus `webflow-loader.html` hinein.
8. Veröffentliche die Seite.
9. Schreibe die Webflow-URL auf den NFC-Tag, zum Beispiel:

```text
https://deine-domain.com/gacha?token=lennart
```

Der `token` wird im Titel verwendet. Mit `?token=lennart` steht auf der Seite automatisch `Lennarts Affektions-Gacha`.

## Warum Refreshing nicht schummelt

Die Seite speichert nichts im Browser. Stattdessen wird das Ergebnis deterministisch aus drei Dingen berechnet:

- geheimer Satz `machine.secret`
- heutiges Datum in `Europe/Zurich`
- URL-Token, zum Beispiel `sein-name`

Für denselben Tag kommt also immer dasselbe Ergebnis. Morgen wird neu gewürfelt.

## Aktuelle Wahrscheinlichkeiten

Die Gewichte sind absichtlich als ganze Zahlen hinterlegt:

| Kategorie | Gewicht | Wahrscheinlichkeit |
|---|---:|---:|
| Niete | 120 | 12% |
| Gewöhnlich | 170 | 17% |
| Mini-Quest | 150 | 15% |
| Ungewöhnlich | 130 | 13% |
| Verflucht | 90 | 9% |
| Selten | 90 | 9% |
| Foto-Drop | 200 | 20% |
| Jackpot | 50 | 5% |

Gesamtgewicht: 1000.

Wenn du die Statistik ändern willst, ändere nur `weight`. Die Summe ist aktuell 1000, also ist ein Gewicht von `200` genau 20%.

## No-code Editing

Nach dem Setup editierst du nur noch JSON-Dateien im GitHub Web-Editor:

- Antworten und Gewichte: `config/outcomes.json`
- Grün/Design/Timing/Name: `config/theme.json`
- Fotos und Captions: `config/photos.json`

GitHub Actions prüft automatisch, ob alles noch gültig ist.

## Automatischer Album-Sync (iCloud / Google Photos)

Statt Bilder manuell in `config/photos.json` einzutragen, kann der Sync ein
öffentliches Album als Quelle nehmen.

1. Öffne `config/album-source.json`.
2. Setze `enabled` auf `true`.
3. Trage in `url` den öffentlichen Link ein:
   - iCloud: `https://www.icloud.com/sharedalbum/#TOKEN`
   - Google Photos: `https://photos.app.goo.gl/...` oder ein öffentlicher
     `photos.google.com/share/...` Link
4. Setze `provider` auf `"icloud"`, `"google"` oder `"auto"`.
5. Lokal:

   ```bash
   npm run sync:album
   npm run validate
   ```

   Oder über GitHub: Tab **Actions** → **Sync shared album** → **Run workflow**.

Der Workflow läuft auch nach einem Cron-Zeitplan und committet Änderungen an
`config/photos.json` mit dem `github-actions[bot]`. Der Commit enthält
`[skip ci]`, damit kein Endlos-Loop entsteht.

### Bilder UND Videos

Einträge in `config/photos.json` können `"type": "image"` oder
`"type": "video"` haben. Videos werden im Frontend als `<video controls muted
playsinline>` gerendert. Wenn `caption` leer ist oder fehlt, wird kein
Untertitel angezeigt — das ist das gewünschte Verhalten für direkt
synchronisierte Album-Inhalte.

Beim Google-Photos-Sync liest `scripts/sync-shared-album.js` die im
Album-HTML eingebettete Item-Liste und erkennt damit Videos zuverlässig
(Marker `[null,null,14]` + Dauer-Feld). Für Videos wird die
`googleusercontent.com/...=dv`-URL geschrieben — Google liefert darauf
eine 302-Weiterleitung auf einen abspielbaren MP4-Stream. Das funktioniert
heute, ist aber best-effort: lässt sich für ein Video keine spielbare URL
auflösen, wird der Eintrag mit Warnung **übersprungen**, statt als
Standbild getarnt zu werden. Für robuste Video-Synchronisation ist ein
öffentliches iCloud Shared Album die zuverlässigere Quelle.

### Vorschauseite für Foto-/Video-Drops

Damit du nicht auf einen zufälligen Foto-Drop warten musst, gibt es eine
dedizierte Vorschauseite: [`media-preview.html`](media-preview.html).

Nach dem GitHub-Pages-Build ist sie erreichbar unter:

```text
https://fionnf.github.io/Affections-gatcha/media-preview.html
```

Sie lädt direkt `config/photos.json`, zeigt eine große Vorschau plus eine
Galerie aller Einträge und nutzt dieselbe Darstellung wie die Gacha-Resultatkarte.

### Visuelles Design der Hauptmaschine

Das Widget rendert eine durchgehende Wald/Stadt-Szenerie als SVG-Hintergrund:
geschichtete Berge, ein See mit schimmernden Wellen, eine kleine Skyline,
eine geschwungene Straße mit animierter Mittellinie, kleine Bäume, Bärlauch-
Blätter und ein paar Glühwürmchen. Darüber sitzt die Gacha-Maschine mit
warmem Innenlicht und einer langsam orbitierenden Kapsel. Beim Ziehen
beschleunigen sich Glow und Orbit, die Kapsel wackelt und ploppt am Ende
rein.

Unter der Maschine liegen "echte" Karten (Heute, Resultat, Regeln bzw.
Verlauf) auf hellem cremefarbenem Glas — so füllt das Widget die Seite
aus, statt eine große leere Fläche unter einem dunklen Hero-Block zu
hinterlassen. Theme-Chips wie *Wald · Velo · Stadt · Bärlauch · See*
liegen unter dem Titel; sie kommen aus `config/theme.json` → `stickers`.

Sämtliche Animationen (Sonnenpuls, Glühwürmchen, Wassershimmer,
Straßen-Dash, Kapsel-Orbit) werden bei `prefers-reduced-motion: reduce`
deaktiviert.

### Hochformat / Querformat

Sowohl die Hauptmaschine als auch die Vorschauseite zeigen Fotos und Videos
in einer gerahmten Bühne mit `object-fit: contain`: das gesamte Bild bleibt
sichtbar, ohne aggressives Zuschneiden. Hinter dem Motiv liegt eine sanft
weichgezeichnete, abgedunkelte Version desselben Bildes als Backdrop. Die
Bühne passt ihr Seitenverhältnis automatisch an: `portrait` (3:4) für
Hochkant, `landscape` / Standard (4:3) für Querformat, `square` (1:1) für
quadratische Inhalte. Videos behalten `controls muted playsinline`,
Captions werden nur gezeigt, wenn `caption` vorhanden und nicht leer ist.

### Verlauf-Tab

Auf der Hauptseite gibt es ein kleines Tab-Steuerelement mit
`Heute` und `Verlauf`. Der Verlauf zeigt **nur Kapseln, die auf diesem
Gerät bzw. in diesem Browser tatsächlich gezogen und enthüllt wurden**,
neueste zuerst. Es ist also ein echtes lokales Log und kein
deterministischer Rückblick auf nicht besuchte Tage.

Technische Details:

- Die Liste lebt in `localStorage` unter dem Schlüssel
  `affektions-gacha:history:v1`.
- Jede enthüllte Kapsel wird einmal pro `Tag|Token` gespeichert
  (Dedupe über `day|token`).
- Liste wird beim Laden defensiv gelesen: wenn `localStorage` fehlt oder
  der Inhalt kaputt ist, fällt der Tab still auf eine leere Liste zurück.
- Nach Datum absteigend sortiert (neueste zuerst) und auf
  `historyDays` Einträge gekürzt.
- Wenn noch nichts gezogen wurde, erscheint ein freundlicher Hinweis:
  *"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet."*
- Browser-Storage geleert oder anderes Gerät? → Verlauf ist leer, das
  ist Absicht. Der tägliche deterministische Pull selbst ändert sich
  dadurch nicht.

Die Anzahl der gezeigten Einträge steht in `config/theme.json` unter
`historyDays` (Standard: `14`). Setze sie auf eine andere ganze Zahl, um
mehr oder weniger Verlauf anzuzeigen.

### Täglicher Album-Sync

Der Workflow `.github/workflows/sync-shared-album.yml` läuft sowohl
manuell (`workflow_dispatch` über den Actions-Tab) als auch nach einem
Cron-Plan (`17 4 * * *`, also täglich um 04:17 UTC). Er committet
ausschließlich Änderungen an `config/photos.json`, mit `[skip ci]` im
Commit, damit kein Endlos-Loop entsteht. Die Cadenz lässt sich direkt in
der YAML-Datei anpassen.

### Wichtiger Privacy-Hinweis

- **iCloud Shared Albums**: Apples öffentliche Shared-Album-Seite ist
  öffentlich. Jeder mit dem Link kann das Album sehen. Lege keine Inhalte hinein,
  die du nicht öffentlich teilen würdest.
- **Google Photos**: Öffentliche „Link teilen“-Alben sind ebenfalls für jeden
  mit dem Link sichtbar. Google bietet **keine** stabile öffentliche CDN/API
  für statische Websites, daher ist der Google-Sync **best effort** und kann
  jederzeit kaputtgehen, wenn Google die Seitenstruktur ändert.
- **Empfehlung**: Für zuverlässige Updates ein iCloud Public Shared Album
  verwenden. Wenn die Inhalte privat bleiben sollen, weiterhin den manuellen
  Workflow (`config/photos.json` direkt pflegen oder `build-photo-manifest.js`)
  nutzen.

## Google oder Apple Photos

Kurze ehrliche Antwort: Ja, aber nicht so sauber, wie man hoffen würde.

### Warum nicht einfach direkt ein Album?

Ein Browser/Webflow-Embed kann ein privates Apple- oder Google-Photos-Album nicht dauerhaft direkt auslesen, ohne Login/OAuth und ohne dass kurzlebige Bild-URLs ablaufen.

Bei Google Photos wurden die Library-API-Berechtigungen eingeschränkt; Apps können seit den API-Änderungen nicht mehr frei die gesamte Library oder beliebige persönliche Alben lesen, sondern sollen für user-ausgewählte Bilder die Picker API verwenden oder nur app-created media verwalten.

Apple iCloud Shared Albums können als öffentliche Website geteilt werden, aber Apple beschreibt diese Option als öffentlich: Jeder mit dem Link kann das Album ansehen.

### Option A: Am einfachsten

Nutze ein öffentliches iCloud Shared Album oder ein Google Photos shared album nur als deine Quelle, aber kopiere gelegentlich ausgewählte Bildlinks in `config/photos.json`.

Vorteil: kein Backend.  
Nachteil: je nach Anbieter können direkte Bildlinks kaputtgehen.

### Option B: Besser für Stabilität

Exportiere die Album-Bilder gelegentlich nach GitHub Pages:

```bash
node scripts/build-photo-manifest.js photos "https://USERNAME.github.io/REPO/photos/"
```

Vorteil: stabil und schnell.  
Nachteil: du musst Bilder exportieren oder syncen.

### Option C: Wirklich automatisch

Baue einen kleinen Backend-Sync:

1. Du authentifizierst Google Photos über OAuth.
2. Der Sync nutzt die Google Photos Picker API oder app-created album flow.
3. Der Sync schreibt `config/photos.json` automatisch.
4. GitHub Actions oder ein geplanter Cron aktualisiert regelmäßig.

Das ist möglich, aber es ist kein reiner Webflow-Frontend-Job.

### Option D: Apple Photos automatisch

Für Apple ist die beste Automatisierung lokal auf deinem Mac:

1. Ein AppleScript/Shortcuts Export aus dem Album.
2. Script baut `config/photos.json`.
3. Script pusht zu GitHub.

Auch das ist möglich, aber braucht deinen Mac als Sync-Quelle.

## Foto-Drops aus statischem Album

In `config/photos.json` ersetzt du die Platzhalter-URLs mit echten Bild-URLs.

Beispiel für einen Eintrag:

```json
{
  "url": "https://uploads-ssl.webflow.com/.../foto.jpg",
  "alt": "Wir beim Kaffee",
  "caption": "Beweisstück A: ziemlich süß."
}
```

Wenn die Kategorie `Foto-Drop` gezogen wird, wird eines dieser Bilder deterministisch ausgewählt. Die aktuelle Wahrscheinlichkeit dafür ist 20%.

## GitHub Pages URL

Wenn dein GitHub-Username `fionnferreira` und dein Repo `lennart-gacha` heißt:

```text
https://fionnferreira.github.io/lennart-gacha/
```

Dann sieht dein Webflow loader so aus:

```html
<section id="affektions-gacha"></section>

<script
  src="https://fionnferreira.github.io/lennart-gacha/dist/affection-gacha.js"
  data-mount="#affektions-gacha"
  data-config-base="https://fionnferreira.github.io/lennart-gacha/"
  defer
></script>
```

## Nachricht schicken

Standardmäßig nutzt der Code:

```json
"messageTarget": "mailto:fionn@fionnferreira.com"
```

Der Button öffnet also eine vorausgefüllte E-Mail.

Du kannst auch WhatsApp verwenden:

```json
"messageTarget": "https://wa.me/DEINENUMMER?text={text}"
```

Die Nummer braucht internationales Format ohne `+`, Leerzeichen oder Klammern.

## GitHub Action

Wenn du das in ein GitHub Repo legst, läuft `.github/workflows/validate-gacha.yml` automatisch bei Änderungen.

Lokal kannst du prüfen:

```bash
node scripts/validate-gacha-config.js
node scripts/simulate-odds.js 20000
```

Die Action nutzt kein ChatGPT. Das ist Absicht: Die Statistik soll mathematisch überprüfbar sein. ChatGPT ist gut für neue deutsche Kapseltexte, aber nicht als Zufallsgenerator.

## Optionale ChatGPT-Idee

Wenn du später mehr Texte generieren willst:

1. Lass ChatGPT nur neue `outcomes` vorschlagen.
2. Kopiere sie manuell in die passende Kategorie.
3. Lass die GitHub Action prüfen, ob JSON und Wahrscheinlichkeiten noch stimmen.

Das hält das Geschenk süß und die Statistik kontrollierbar.

## 3D-Print-Hinweis

Für das Objekt:

- NFC-Sticker: NTAG215 oder NTAG216, 25 mm
- Nicht direkt hinter Metall platzieren
- NFC möglichst unter 1 bis 2 mm Kunststoff
- Vor dem Verkleben testen
- Für eine Münze: zweiteilige Press-Fit-Kapsel
- Für eine Mini-Gacha-Maschine: NFC hinter die Frontscheibe oder den Knopf

Text auf dem Print:

```text
Einmal täglich ziehen
Preise nicht garantiert
```

Oder persönlicher:

```text
Lennarts
Souvenir-Gacha
```

## Besseres GitHub-Setup

Empfohlene Struktur:

```text
affection-gacha-webflow/
  webflow-embed.html
  webflow-loader.html
  dist/
    affection-gacha.js
  config/
    theme.json
    outcomes.json
    photos.json
  photos/
    IMG_001.jpg
    IMG_002.jpg
    photos.json
  scripts/
    validate-gacha-config.js
    simulate-odds.js
    build-photo-manifest.js
  .github/workflows/
    validate-gacha.yml
```

Workflow:

1. Webflow bleibt die eigentliche Website.
2. Webflow lädt nur `dist/affection-gacha.js`.
3. GitHub ist die Versionierung für Texte, Wahrscheinlichkeiten, Farben und Fotos.
4. GitHub Actions prüft automatisch, ob die Konfiguration gültig ist.
5. GitHub Pages liefert `dist/` und `config/` aus.
6. In Webflow musst du nur den Loader ändern, wenn sich Repo-Name oder URL ändern.
7. Für Inhalte änderst du nur `config/*.json`.

Für ein privates romantisches Geschenk ist ein privates Repo plus Webflow-Asset-URLs diskreter. Für maximal einfache automatische Foto-Updates ist GitHub Pages praktisch, aber die Fotos sind dann über die URL erreichbar.
