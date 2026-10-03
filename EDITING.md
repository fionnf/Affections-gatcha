# Editing without touching code

Everything you actually edit lives in `config/`.

## Change colors, name, timing

Edit:

```text
config/theme.json
```

Useful fields:

- `brand.displayNameDefault`: default name, currently `Lennart`
- `brand.titleTemplate`: page title, currently `{name}s Affektions-Gacha`
- `dayStartHour`: the hour the machine's day begins, currently `4` — a capsule pulled at 01:00 still counts for the evening before, and the new one arrives at 04:00 (streak, history and the new-day reload all follow it)
- `revealDelayMs`: how long the machine works before revealing
- `loadingSteps`: the little progress messages
- `colors.primary`, `colors.green`, etc.
- `darkColors`: dark-mode equivalents

### Weather on the card

`config/theme.json` → `"weather": { "latitude": 47.3769, "longitude": 8.5417, "place": "Zürich" }`
is where the machine looks up the sky at pull time (Open-Meteo, no key).
Remove the block to switch the feature off; the card then shows the date alone.

## Change response text

Edit:

```text
config/outcomes.json
```

Each category has:

- `label`: what appears on the capsule result
- `weight`: probability weight
- `tone`: visual tone
- `outcomes`: title/message pairs, plus these optional per-outcome fields:

| Field | Effect |
|---|---|
| `link` | Spotify embeds as a player, anything else as a link button |
| `voucher` | `true` makes it a redeemable Gutschein in Verlauf — the flag is the only thing that does; the wording never counts. With four vouchers still unredeemed, new ones step aside for plain texts in the same category |
| `prompt` | gates the message — a question has to be answered first |
| `token` | awards one of the six Sammeltoken emoji (see `TOKEN_REWARDS` in `src/constants.js`) |
| `freikarte` | grants a Freikarte (a reroll for a bad day) |
| `secret` | `true` renders the message in Geheimtinte: blank until a finger rests on it |

**Adding or removing outcomes shifts the token maths.** Roughly one pull in
five should award a token, and a token in a big category is seen far less
often than one in a small category — so adding ten outcomes to Foto-Drop
quietly halves the exposure of every token already in it. After editing, run
`npm run validate`, and if you changed how many outcomes a category has, ask
for the token spread to be re-derived rather than guessing. Bad pulls
(Niete, Verflucht) are deliberately the most token-rich at ~35%.

**Never add a token to an outcome whose text says there is no prize.** Two
Nieten used to read "es gibt heute keine Kapsel" directly above a collectible.

### Outcome `link` field

Any outcome can have an optional `link` URL:

```json
{
  "title": "DJ Fionn Set",
  "message": "Eine Playlist für dein Training.",
  "link": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
}
```

- **Spotify links** (`open.spotify.com`) are rendered as an embedded player directly inside the capsule result — tracks appear as a compact 80px strip, playlists and albums as a 152px card.
- **All other URLs** appear as a "🔗 Link öffnen" button that opens in a new tab.
- The link is also included in the text that appears when sharing the result.
- History and Favourites views show a small link button for entries that have one.

Percent chances are relative to the current total weight. Quick formula:

- `chance = categoryWeight / totalWeight`
- Example with a total of `1090`: `180` ≈ `16.51%`, `50` ≈ `4.59%`

## Change photo captions or URLs

Edit:

```text
config/photos.json
```

Each photo has:

- `url`
- `alt`
- `caption` (optional — leave empty or omit to render no caption)
- `type` (optional — `"image"` or `"video"`; defaults to `"image"`)

Videos render as `<video controls muted playsinline>`.

## Special days (birthdays, anniversaries, one-off events)

Edit:

```text
config/special-days.json
```

On a matching day the normal weighted random draw is **skipped entirely** and the
special-day outcome is shown instead. Colors can also be overridden for that day.

### Date formats

| Format | Matches |
|---|---|
| `"YYYY-MM-DD"` | One specific date only |
| `"MM-DD"` + `"repeat": "yearly"` | That day every year (e.g. birthdays) |

**Use the full date unless you really mean every year.** A bare `"MM-DD"` on its
own is rejected by `npm run validate` and ignored by the app — it would quietly
come back next year, long after anyone remembers writing it, and a capsule about
one particular weekend reads strangely twelve months on.

```json
{ "date": "05-29", "repeat": "yearly", "label": "Geburtstag 🎂", "outcomes": [ ... ] }
```

Old entries that were written as bare `"MM-DD"` need one of the two fixes: a
year in front of the date, or `"repeat": "yearly"` beside it.

### Fields per entry

| Field | Required | Description |
|---|---|---|
| `date` | ✅ | `"YYYY-MM-DD"`, or `"MM-DD"` together with `repeat` |
| `repeat` | optional | Only value is `"yearly"`. Required for a bare `"MM-DD"`, and not allowed on a dated entry |
| `label` | ✅ | Shown as the capsule category label |
| `outcomes` | ✅ | Array of `{title, message}` — one is picked deterministically (stable across reloads) |
| `tone` | optional | Visual style of the capsule (default: `"jackpot"`). Same values as categories: `quiet`, `soft`, `quest`, `warm`, `cursed`, `rare`, `photo`, `jackpot` |
| `player` | optional | `"lennart"` or `"fionn"` — scopes the day to one app. **Omit it and the entry fires in both**, so a message addressed to one of them is also read by the other, and any token is banked twice |
| `colors` | optional | Overrides any subset of the light-mode palette for that day |
| `darkColors` | optional | Same but for dark mode |
| `unlockTime` | optional | `"HH:MM"` — a `link` on the outcome stays behind *🔒 Ab … verfügbar* until then; the message shows normally |
| `unlockTimezone` | optional | IANA zone (`"Europe/Athens"`) the unlock time is read in. Default is the app's Zurich clock. Use it for capsules on a trip, so `"11:30"` means 11:30 where they are |
| `photo` | optional | `{ "url", "alt", "caption" }` — the picture the capsule shows. Commit the file under `media/` and use a relative `url`. Preferred over `photoAlt`, because `photos.json` is regenerated by the album sync |
| `photoAlt` | optional | Shows the photo with this `alt` from `photos.json` (loses to `photo` when both are set) |

A special-day outcome can carry `token` too, exactly like a normal outcome,
and a `link` — validated as an http(s) URL, since a link the app cannot parse
is hidden rather than shown broken.

### A course inside a capsule (`steps`)

Any outcome, special day or category, can carry `steps`: an array of
`{ "title", "text" }`. The capsule then shows the `message` as the
introduction and, under it, one step at a time with **Weiter** and **Zurück**,
a dot per step, and a final *Fertig* page (its text from an optional `done`
string on the outcome). Where he got to is kept per day on the phone
(`affektions-gacha:kurs:v1`), so the course can be picked up again later.
Line breaks in a step's `text` are kept. A **Kurs 🎞️** chip among the
hero's chips opens the newest course in the config (by date) anytime, in a
panel; remove the `steps` from every special day and the chip goes away. A
step can name a `figure`, one of
the small inline infographics in `src/kursfiguren.js` (`kamera`, `einlegen`,
`iso`, `blende`, `zeit`, `dreieck`, `sunny16`, `fokus`, `schaerfentiefe`,
`zonenfokus`, `mitziehen`, `rueckspulen`); it is drawn above the text.

```json
"outcomes": [{
  "title": "Zürich auf einer Rolle",
  "message": "Heute ein kleiner Kurs. Tipp auf Weiter.",
  "steps": [
    { "title": "Die Kamera in der Hand", "text": "Vier Ringe und ein Hebel …" },
    { "title": "Film einlegen", "text": "…" }
  ],
  "done": "Das war der Kurs."
}]
```

### Available color keys

`background`, `surface`, `surfaceAlt`, `text`, `muted`, `border`, `primary`, `primaryDark`, `gold`, `green`, `blue`, `sky`, `mountain`

### Example

```json
{
  "days": [
    {
      "date": "05-29",
      "label": "Geburtstag 🎂",
      "tone": "jackpot",
      "outcomes": [
        {
          "title": "Alles Gute zum Geburtstag!",
          "message": "Heute ist dein Geburtstag – die Maschine hat extra für dich gewürfelt."
        }
      ],
      "colors": {
        "primary": "#c8860a",
        "gold": "#e8a020",
        "background": "#fffbf0"
      },
      "darkColors": {
        "primary": "#e8a020",
        "gold": "#f0b830"
      }
    }
  ]
}
```

### Testing / previewing a special day

Add `?preview-day=MM-DD` or `?preview-day=YYYY-MM-DD` to the URL. The machine
will behave as if today is that date — showing the matching special day (or a
normal random pull if no entry matches). The pull is still deterministic and
stable on reload, just as on the real day.

**Examples:**
```
https://your-site.com/?token=Lennart&preview-day=05-29
https://your-site.com/?token=Lennart&preview-day=2026-05-29
```

Remove the `preview-day` parameter to go back to normal.

## Skincare routine

Edit:

```text
config/skincare.json
```

Two blocks, `morning` and `evening`, each with a `title` and a list of `steps`.
A step needs a `name`; `note` and `when` are optional.

| Field | Effect |
|---|---|
| `name` | The step itself |
| `note` | Small grey line underneath |
| `when` | Days it applies: `Mo, Di, Mi, Do, Fr, Sa, So`. Leave it out for every day |
| `footer` | One closing line under both blocks (top level, not per step) |

Steps not scheduled for today are shown dimmed with their days beside them,
rather than hidden, so the routine looks the same every day.

Deleting the file removes the chip entirely — it stops being clickable rather
than opening an empty panel.

---

## Auto-sync from a shared album

Instead of pasting URLs by hand you can point the gacha at a public shared
album.

1. Edit `config/album-source.json`:
   - `enabled`: set to `true`
   - `url`: public iCloud Shared Album link (`https://www.icloud.com/sharedalbum/#TOKEN`)
     or a public Google Photos shared link
   - `provider`: `"icloud"`, `"google"`, or `"auto"`
2. Run `npm run sync:album` locally, or trigger the **Sync shared album**
   workflow under the GitHub **Actions** tab. The workflow can also run on a
   cron schedule and commits `config/photos.json` back to the repo using the
   `github-actions[bot]` user with `[skip ci]` so it doesn't trigger itself.

**Privacy:** Apple Shared Albums are public — anyone with the link can see
them. Google Photos public shares are also visible to anyone with the link, and
the Google sync is best-effort scraping, not a stable API. For reliability,
prefer iCloud public shared albums. Don't put content in the album that you
wouldn't want public.

**Videos & Google Photos:** the Google sync reads the album's structured
data and tags each item as `"image"` or `"video"`. Videos use a
`googleusercontent.com/...=dv` URL that 302-redirects to a playable MP4 stream.
This works today, but is best-effort — Google does not promise the `=dv`
endpoint will keep working. The `=dv` URL is always probed before committing
the item as a video; if the probe fails, the item falls back to a still image
(`=s2048`) rather than being silently dropped. Regular photos use the
highest-quality `=s2048` URL. If videos are important to you, an iCloud public
shared album is the more reliable source.

**Live Photos / motion photos & the 20 s threshold:** iPhone Live Photos and
short motion frames are flagged in Google's structured data with the same
media-type marker as real videos (`14`). Treating them as video produces
broken playback because the bundled clip is only 1–3 seconds long and `=dv`
often returns just the still frame. The sync therefore requires *either* a
known duration `>= videoMinDurationMs` *or* a successful `=dv` probe before
emitting an item as `"type": "video"`. Items below the duration threshold are
exported as still images. When duration metadata is absent the `=dv` URL is
probed — if it resolves the item is emitted as video, otherwise it falls back
to the still image. The same duration rule is applied to the iCloud sync.

The default threshold is **20 000 ms (20 s)** — a pragmatic cutoff that
filters out Live Photos and tiny boomerangs without dropping intentional
clips. To change it, set `videoMinDurationMs` in
`config/album-source.json`:

```json
{
  "enabled": true,
  "provider": "google",
  "url": "https://photos.app.goo.gl/...",
  "videoMinDurationMs": 20000
}
```

Set it to e.g. `5000` if your album really does contain meaningful 5–20 s
clips. The sync logs each downgrade so you can see what was filtered:

- `X Live Photo(s) emitted as still images` — short clips imported as
  stills.
- `X item(s) flagged as video were below the Yms duration threshold and
  were exported as still images` — items the marker said were video but
  whose duration was below `videoMinDurationMs`. Lower the threshold to
  include them.
- `X video-marker item(s) had no readable duration and =dv did not resolve
  — imported as still images` — duration metadata was missing and the
  `=dv` probe failed; the item is kept as a still rather than dropped.
- `X ambiguous video item(s) skipped because no playable stream URL
  resolved` — Google `=dv` did not return a video for an item with known
  duration; the item is dropped rather than re-exported as a thumbnail.

`npm run validate` flags video entries whose URL still looks like an image
thumbnail, and warns when a Google-sourced album has zero videos (which can
mean either there are none, or every clip was below `videoMinDurationMs`).

## Preview page for photos and videos

Open [`media-preview.html`](media-preview.html) to see how the synced media
looks without waiting for a random Foto-Drop. After GitHub Pages has built
the site, it lives at:

```text
https://fionnf.github.io/Affections-gatcha/media-preview.html
```

The page reads `config/photos.json` directly, hides the caption when none is
provided, and tells you to configure `config/album-source.json` and run the
**Sync shared album** workflow if only placeholder URLs are present.

### Portrait & landscape framing

Both the main widget and the preview page render photos and videos in a
framed stage with `object-fit: contain`: the entire image is visible
without aggressive cropping. A blurred, dimmed copy of the same image
sits behind it as a backdrop. The stage adapts its aspect ratio
automatically: portrait (3:4), landscape / default (4:3), or square (1:1).
Videos keep `controls muted playsinline`. Captions are hidden when
empty or missing.

## History tab

The main widget has a small `Heute` / `Verlauf` segmented control. The
`Verlauf` tab is a **real local log**: it only shows capsules that were
actually drawn and revealed in this browser/device. It is not a backwards
deterministic preview of unvisited days.

- Storage: `localStorage` key `affektions-gacha:history:v1`.
- One entry per `day|token` (dedupe), sorted newest first.
- Capped at `historyDays` from `config/theme.json` (default `14`).
- Reads are wrapped in `try/catch`, so a missing or corrupt storage just
  shows the empty state.
- Empty-state copy in German: *"Noch keine Kapseln auf diesem Gerät
  bzw. Browser geöffnet."*

The list shows 15 entries at a time with *Mehr anzeigen*. Above the album at
the bottom sits the **Trophäenregal** — every quest marked *Bestanden ✓*, as
a tile with the day's emoji, or with the proof photo when one was uploaded.

Clearing browser storage, opening on a new device, or using a different
token resets the visible history. The deterministic daily pull itself is
unchanged — refreshing today still yields the same capsule for the same
day+token+secret.

## Daily album sync

`.github/workflows/sync-shared-album.yml` runs both manually
(`workflow_dispatch` from the Actions tab) and on a daily cron
(`17 4 * * *`, i.e. 04:17 UTC every day). It only commits changes to
`config/photos.json`, with `[skip ci]` in the message so it never triggers
itself. Adjust the cron in the YAML if you want a different cadence.

## Layout, margins, and the emoji orbit

The widget renders inside a centered `.ag-frame` with `max-width: 1120px`
and `margin-inline: auto`. It does **not** span the full page width — it
sits as a self-contained card with breathing room on either side, even
as a self-contained card. Inner padding scales with
viewport via `clamp()`. The dark hero stage (scene + machine + title +
tabs) is one rounded card; the cream content cards (Heute-button, result,
rules, history) sit beneath it on the page background, not inside the
hero. There is no longer a beige separator strip between the two.

A small floating emoji constellation orbits the capsule. Bike (🚴) and
garlic (🧄) are always present; an additional 3–5 emojis are picked
deterministically from a curated pool keyed on `secret|token|day`, so the
constellation refreshes daily but is stable across reloads. The pool
includes 🎻 and 👨‍❤️‍👨 alongside woods/coffee/music/mountain motifs.
Animations respect `prefers-reduced-motion: reduce`. To change the pool
or always-on set, edit `EMOJI_POOL` and `REQUIRED_EMOJIS` near the top of
`dist/affection-gacha.js`.

The "send to Fionn" message starts with a category-appropriate emoji
(e.g. ✨ for warm, 🧭 for quest, 📸 for photo). URL encoding for
WhatsApp/`mailto:` is preserved.

On mobile (`max-width: 760px`), hero stacks vertically, the title scales
down, the machine wrap caps at 220 px, the tabs stretch to full width,
and the draw button becomes full-width.

## Best GitHub editing flow

1. Open the repo on GitHub.
2. Go to `config/outcomes.json` or `config/theme.json`.
3. Click the pencil icon.
4. Edit text or weights.
5. Commit directly to `main`.
6. GitHub Actions validates the config.
7. GitHub Pages deploys automatically — the live site updates within ~30 s.

---

## Streak milestones

The widget tracks consecutive daily pulls per token and shows a one-time
congratulation banner inside the result card at 7, 14, 21, and 30 days.
The banner is shown only once per milestone per token (stored in
`localStorage` under the key `affektions-gacha:milestones:v1`).  At
milestone streaks the reveal also produces a slightly longer haptic
pattern.

## Wunschkapsel

Once per ISO calendar week, a **Wunschkapsel** card appears below the
rules accordion. Lennart can type a short wish (up to 280 characters) and
submit it. The machine stores it locally and shows a confirmation that it
has been noted — without any promise that it will be granted.  The stored
wish is kept in `localStorage` under `affektions-gacha:wish:v1` and resets
automatically each new week.

### Forwarding wishes to a Google Sheet (no Mail/WhatsApp)

Submissions can be silently forwarded to a Google Sheet via a Google Apps
Script web app. The target sheet is
[Wunschkapsel-Inbox](https://docs.google.com/spreadsheets/d/1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4/edit)
— worksheet `Wünsche`, headers `Timestamp | Token | Wish | Page URL | User Agent`.

One-time setup:

1. Open [script.google.com](https://script.google.com) → **New project**.
2. Replace `Code.gs` with the contents of
   `scripts/google-apps-script-wish-inbox.js`.
3. **Deploy → New deployment → Web app**:
   - Execute as: *Me*
   - Who has access: *Anyone*
4. Copy the `…/exec` URL Google gives you.
5. Edit `config/wish-inbox.json`:
   ```json
   {
     "enabled": true,
     "endpointUrl": "https://script.google.com/macros/s/.../exec"
   }
   ```
6. Commit + push.

To disable remote forwarding, set `enabled` to `false` or clear `endpointUrl`.
The local confirmation is always shown regardless of whether the network
request succeeds — a failed forward is retried automatically the next time
the page is opened in the same week.

## Notfall-Umarmung

A small **Notfall-Umarmung** button lives on the main panel and is always
available (no weekly limit). One tap silently POSTs to the same Google
Apps Script endpoint as the Wunschkapsel, but with `type: "hug"`. The
script then:

1. logs the ping in the `Wünsche` worksheet (type `Notfall-Umarmung`), and
2. leaves it on the `push-pending` feed, where the `notify` job in
   `push-notify.yml` picks it up within about five minutes and sends a
   **Web Push to every subscribed device** — Fionn's phone (the Eingänge
   subscribe under `fionn`), Lennart's own phone (a short "unterwegs"
   confirmation) and any other device that has allowed notifications.

No email is sent for a hug (a Wunschkapsel still mails Fionn, since it
carries text). Once the hug went through, both lamps answer with a red-orange
chasing strobe for eight seconds, then return to what they showed before. Local UI feedback: `Fionn wurde angestupst 🫂` on success,
a soft retry hint on failure.

> **After editing `scripts/google-apps-script-wish-inbox.js` you must
> redeploy the Apps Script** (Deploy → Manage deployments → ✏️ → Version:
> *New version* → Deploy). The `/exec` URL stays the same. The first
> hug will trigger a one-time Google authorization dialog asking for
> permission to *send email as you* (for wishes) — accept it.

## Tägliche Erinnerung (push notifications)

After the very first capsule pull the widget offers to schedule a
daily reminder at **08:00 Uhr** (Zurich time). Accepting triggers the
browser's notification permission dialog. If the user grants permission,
a service worker (`sw.js`) is registered and the page posts a
`SCHEDULE_NOTIFICATION` message with the next 08:00 timestamp. The SW
uses a `setTimeout` to fire the notification when the browser is open, or
a Periodic Background Sync tag (`ag-daily-reminder`) on Chrome when the
browser is closed. Notifications are **silent** (no sound) and include
only haptic feedback on supported devices. The banner is not shown if
the user has already granted or denied permissions, or dismissed it once.

## Haptic feedback

All interactive elements use the
[Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibrator_API)
for subtle tactile responses. No audio is used. Supported on Android/Chrome;
iOS and desktop silently ignore the calls.

| Interaction | Pattern |
|---|---|
| Draw button press | 12 ms |
| Result reveal | `[20, 20, 40]` ms |
| Streak milestone reveal | `[30, 20, 30, 20, 60]` ms |
| Wish submit | `[20, 20, 40]` ms |
| All other buttons | 6–10 ms |

## PWA / Add to Home Screen

`manifest.json` at the repo root makes the site installable as a
Progressive Web App. Place 192 × 192 and 512 × 512 PNG icons at
`media/icon-192.png` and `media/icon-512.png` to complete the manifest.
The `index.html` already links the manifest and sets the theme-color meta
tag to `#1a3a2c`.
