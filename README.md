# Affektions-Gacha

A daily capsule-pull web app for Lennart, embedded via Webflow + GitHub Pages. He taps the 3D-printed gacha machine (NFC), and the page shows one deterministic result per day — a mix of blanks, mini-quests, rare date-credits, and jackpots.

**Live site:** `https://fionnf.github.io/Affections-gatcha/`  
**Media preview:** `https://fionnf.github.io/Affections-gatcha/media-preview.html`

---

## Table of Contents

- [Repository layout](#repository-layout)
- [How it works](#how-it-works)
- [Webflow setup](#webflow-setup)
- [Editing content (no-code)](#editing-content-no-code)
- [URL parameters for testing](#url-parameters-for-testing)
- [Special days](#special-days)
- [Photo & video drops](#photo--video-drops)
- [Auto-sync from a shared album](#auto-sync-from-a-shared-album)
- [Outcome categories & odds](#outcome-categories--odds)
- [Outcome links (Spotify & URLs)](#outcome-links-spotify--urls)
- [Streak bonus & milestones](#streak-bonus--milestones)
- [History tab](#history-tab)
- [Lieblinge tab (favourites)](#lieblinge-tab-favourites)
- [Activity chips (stickers)](#activity-chips-stickers)
- [Bärlauch game](#bärlauch-game)
- [Sending results](#sending-results)
- [Wunschkapsel inbox (Google Sheet)](#wunschkapsel-inbox-google-sheet)
- [GitHub Actions](#github-actions)
- [3D print notes](#3d-print-notes)

---

## Repository layout

```
dist/
  affection-gacha.js      Main widget script (loaded by GitHub Pages)
config/
  theme.json              Colors, name, timing, loading steps
  outcomes.json           Categories, weights, and German response texts
  photos.json             Photo list and captions
  special-days.json       Special days with guaranteed outcomes and optional color overrides
  album-source.json       Source config for auto-sync from iCloud / Google Photos
  wish-inbox.json         Endpoint config for forwarding Wunschkapsel submissions to a Google Sheet
scripts/
  validate-gacha-config.js          Checks JSON validity and weight totals
  simulate-odds.js                  Simulates many days to verify statistics
  build-photo-manifest.js           Builds photos.json from an exported Apple Photos album
  sync-shared-album.js              Reads album-source.json and writes photos.json from a public album
  google-apps-script-wish-inbox.js  Apps Script source for the Wunschkapsel inbox web app
webflow-loader.html         Tiny embed code to paste into Webflow
webflow-embed.html          Older self-contained variant (still works)
media-preview.html          Preview page for synced photos and videos
EDITING.md                  Quick-reference for no-code edits
```

---

## How it works

The result is computed deterministically from three things:

- `machine.secret` in `config/theme.json`
- Today's date in `Europe/Zurich`
- The `?token=` URL parameter (e.g. `?token=lennart`)

Same day → same result. Refreshing never re-rolls. Tomorrow gets a new pull.

---

## Webflow setup

1. Create a GitHub repo and enable **GitHub Pages** for it.
2. Paste the contents of `webflow-loader.html` into a Webflow **Embed** element, replacing `USERNAME` and `REPO` with your values.
3. Publish the Webflow page.
4. Write the Webflow URL to the NFC tag:

```
https://your-domain.com/gacha?token=lennart
```

The `token` value becomes the display name (e.g. `lennart` → `Lennarts Affektions-Gacha`).

The Webflow loader snippet looks like this:

```html
<section id="affektions-gacha"></section>
<script
  src="https://USERNAME.github.io/REPO/dist/affection-gacha.js"
  data-mount="#affektions-gacha"
  data-config-base="https://USERNAME.github.io/REPO/"
  defer
></script>
```

---

## Editing content (no-code)

Everything editable lives in `config/`. Use the GitHub web editor (pencil icon) and commit directly to `main`. GitHub Actions validates automatically.

| File | What to edit |
|---|---|
| `config/outcomes.json` | Response texts, category weights, optional links |
| `config/theme.json` | Colors, name, timing, loading steps, activity chips |
| `config/photos.json` | Photo URLs and captions |
| `config/special-days.json` | Birthdays, anniversaries, one-off events |

See **[EDITING.md](EDITING.md)** for field-by-field details.

---

## URL parameters for testing

All parameters can be combined. Remove them to return to normal behaviour.

| Parameter | Example | Effect |
|---|---|---|
| `?token=` | `?token=lennart` | Sets the display name |
| `?preview-day=` | `?preview-day=2026-05-29` | Simulates a specific date (also accepts `MM-DD`) |
| `?preview-category=` | `?preview-category=jackpot` | Forces a specific outcome category |

**Testing the download button** (appears for `rare` and `jackpot` categories):

```
https://fionnf.github.io/Affections-gatcha/?preview-category=jackpot
https://fionnf.github.io/Affections-gatcha/?preview-category=rare
```

**Testing a special day:**

```
https://fionnf.github.io/Affections-gatcha/?preview-day=05-29
https://fionnf.github.io/Affections-gatcha/?preview-day=2026-12-24
```

**Combining both:**

```
https://fionnf.github.io/Affections-gatcha/?preview-day=05-29&preview-category=jackpot
```

Valid `preview-category` values: `niete`, `common`, `quest`, `uncommon`, `cursed`, `rare`, `photo`, `jackpot`.

> **Locally** run `npx serve .` and open `http://localhost:3000/?preview-category=jackpot`.

---

## Special days

Add entries to `config/special-days.json` to override the random draw on specific dates (birthdays, anniversaries, etc.).

**Date formats:**

| Format | Matches |
|---|---|
| `"MM-DD"` | Every year (e.g. birthday) |
| `"YYYY-MM-DD"` | One specific date |

**Example:**

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
      }
    }
  ]
}
```

**Fields:** `date` (required), `label` (required), `outcomes` (required), `tone` (optional, default `"jackpot"`), `colors` / `darkColors` (optional — override any palette key).

Available color keys: `background`, `surface`, `surfaceAlt`, `text`, `muted`, `border`, `primary`, `primaryDark`, `gold`, `green`, `blue`, `sky`, `mountain`.

---

## Photo & video drops

Photos and videos appear when the `Foto-Drop` category is drawn (20% base chance).

**`config/photos.json` entry:**

```json
{
  "url": "https://example.com/foto.jpg",
  "alt": "Wir beim Kaffee",
  "caption": "Beweisstück A: ziemlich süß.",
  "type": "image"
}
```

`type` can be `"image"` (default) or `"video"`. Videos render as `<video controls muted playsinline>`. Captions are hidden when empty or missing.

Photos are displayed in a framed stage with a blurred backdrop. The stage adapts its aspect ratio automatically (portrait 3:4, landscape 4:3, square 1:1).

Preview all media without waiting for a random draw: [`media-preview.html`](media-preview.html)

---

## Auto-sync from a shared album

Instead of pasting URLs by hand, point the gacha at a public shared album.

1. Edit `config/album-source.json`:
   - `enabled`: `true`
   - `url`: public iCloud (`https://www.icloud.com/sharedalbum/#TOKEN`) or Google Photos link
   - `provider`: `"icloud"`, `"google"`, or `"auto"`
2. Run locally: `npm run sync:album`  
   Or on GitHub: **Actions** → **Sync shared album** → **Run workflow**

The workflow also runs on a daily cron (`17 4 * * *` UTC) and commits only `config/photos.json` back to the repo with `[skip ci]` to avoid loops.

**Privacy note:** Public shared albums are visible to anyone with the link. Don't put content in the album you wouldn't want public. For reliability, iCloud public albums are preferable over Google Photos (which is best-effort scraping with no stable API).

**Live Photos:** The Google sync requires both the video marker *and* a duration ≥ 4 000 ms before emitting `"type": "video"`. Shorter clips (Live Photos, motion frames) are safely downgraded to still images.

---

## Outcome categories & odds

Base weights (total = 1000, so weight ÷ 10 = %):

| Category | ID | Weight | Base chance |
|---|---|---:|---:|
| Niete | `niete` | 120 | 12% |
| Gewöhnlich | `common` | 170 | 17% |
| Mini-Quest | `quest` | 150 | 15% |
| Ungewöhnlich | `uncommon` | 130 | 13% |
| Verflucht | `cursed` | 90 | 9% |
| Selten (Date-Credits) | `rare` | 90 | 9% |
| Foto-Drop | `photo` | 200 | 20% |
| Jackpot | `jackpot` | 50 | 5% |

To change odds, edit `weight` values in `config/outcomes.json`. The sum doesn't have to equal 1000; any integer totals work.

---

## Outcome links (Spotify & URLs)

Any outcome in `config/outcomes.json` can have an optional `link` field:

```json
{
  "title": "DJ Fionn Set",
  "message": "Eine Playlist für dein Training.",
  "link": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
}
```

- **Spotify links** (`open.spotify.com`) render as an embedded player inside the result card — tracks and episodes appear as an 80 px strip, playlists and albums as a 152 px card.
- **All other URLs** show a "🔗 Link öffnen" button that opens in a new tab.
- The link is included in the pre-filled **An Fionn schicken** message.
- The **Verlauf** and **Favoriten** tabs show a compact link button for any entry that has one.

---

## Streak bonus & milestones

A consecutive-day streak (computed from local history) boosts the odds of better outcomes:

| Streak | Boost |
|---|---|
| 5–9 days 🌱 | +20% jackpot, +15% rare, –20% niete |
| 10–19 days 🔥 | +50% jackpot, +30% rare, –40% niete |
| 20+ days 💎 | +100% jackpot, +50% rare, –60% niete |

At certain milestones a one-time congratulation banner appears inside the result card:

| Streak | Message |
|---|---|
| 7 days | 🌿 Sieben Tage am Stück. |
| 14 days | 🔥 Zwei Wochen am Stück. |
| 21 days | ✨ Drei Wochen. |
| 30 days | 💎 Dreißig Tage. |

Each banner is shown only once per milestone per token (stored in `localStorage` under `affektions-gacha:milestones:v1`). Milestone reveals also produce a slightly longer haptic pattern (`[30, 20, 30, 20, 60]` ms instead of the usual `[20, 20, 40]` ms).

---

## History tab

The **Verlauf** tab shows capsules that were actually drawn and revealed in this browser — not a backwards deterministic preview. Data lives in `localStorage` under `affektions-gacha:history:v1`, capped at `historyDays` entries (default 14, set in `config/theme.json`).

- Only pulls for the current URL token are shown; other tokens' pulls stored on the same device remain separate.
- The outcome picker uses the same history to avoid repeating outcome titles: within a category, already-seen outcomes are excluded from the draw until all have been shown at least once.
- Clearing storage or switching devices resets the visible history; the daily deterministic pull itself is unaffected.

---

## Lieblinge tab (favourites)

A third tab (⭐) sits beside **Heute** and **Verlauf**. After any capsule is revealed, a ☆ button appears in the result card — tapping it saves the result to your favourites list. Tap again to remove it.

- Storage: `localStorage` key `affektions-gacha:favourites:v1`.
- No cap — favourites are kept indefinitely.
- The Lieblinge list shows the same rich card layout as Verlauf (photo, link button, share action).
- Reads are wrapped in `try/catch`, so corrupt or missing storage simply shows the empty state.

---

## Activity chips (stickers)

A row of small chips appears above the capsule. They are configured in `config/theme.json` via the `stickers` array:

```json
"stickers": ["Wald", "Velo", "Stadt", "Bärlauch", "See"]
```

Any chip whose name contains `"Bärlauch"` (case-insensitive) becomes a clickable button that opens the **Bärlauch game** (see below). All other chips are decorative labels.

To change the chip labels, edit the `stickers` array in `config/theme.json` and commit.

---

## Bärlauch game

A hidden mini-game unlocked by tapping the **Bärlauch** chip. A field of moving emoji fills the panel — good plants (🌿 🌱 🍃 🍀) mixed with bad ones (☠️ 🥀 🌸 🧄 💀 🪦 🌾 🍂). A countdown timer ticks down and the field gradually darkens.

**Goal:** tap every good plant before time runs out, without touching a bad one.

- **Win:** all good plants collected → a random photo from the album appears with a sweet caption, and a **Level N starten** button lets you continue.
- **Fail (timeout):** the field goes dark — *"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei."*
- **Fail (bad plant):** instant end — *"Oops. Ich fürchte, wir haben toten Lauch … gesammelt."*

The game has **10 levels**. Each level increases the number of bad plants, reduces the time limit, and speeds up the animation. The level resets on page reload. The panel sits above the main content cards.

---

## Sending results

The **An Fionn schicken** button opens a pre-filled message. Configure the target in `config/theme.json`:

```json
"messageTarget": "mailto:fionn@example.com"
```

Or WhatsApp:

```json
"messageTarget": "https://wa.me/YOURNUMBER?text={text}"
```

---

## Saving results as an image

When the pull is `rare` (Date-Credit) or `jackpot`, an **Als Bild speichern** button appears below the result card. Clicking it renders the result onto a canvas and downloads a PNG — useful to keep the credit.

---

## Wunschkapsel inbox (Google Sheet)

Wunschkapsel submissions are stored locally in `localStorage`. Optionally,
they are silently POSTed to a Google Apps Script web app that appends a row to
this Google Sheet:

[Wunschkapsel-Inbox](https://docs.google.com/spreadsheets/d/1j21UmMS7g_uahk_y2BmWnStPkj6gcWUFfKWuFQBsEy4/edit)
(worksheet `Wünsche`, headers `Timestamp | Token | Wish | Page URL | User Agent`).

Setup:

1. Open [script.google.com](https://script.google.com) and create a new project.
2. Paste the contents of [`scripts/google-apps-script-wish-inbox.js`](scripts/google-apps-script-wish-inbox.js) into `Code.gs`.
3. **Deploy → New deployment → Web app**:
   - Execute as: *Me*
   - Who has access: *Anyone*
4. Copy the `…/exec` URL.
5. Paste it into `config/wish-inbox.json` → `endpointUrl`. Commit + push.

Behaviour:

- Submission is saved locally first; the local confirmation is shown immediately.
- The POST runs in the background. The "done" card meta line shows
  *„weitergeleitet"* on success, *„versucht, es weiterzuleiten…"* while in flight,
  and *„Weiterleitung hat nicht geklappt"* on failure. A failed send is retried
  the next time the page is opened that same week.
- If `endpointUrl` is empty or `enabled` is `false`, no network request is made
  and the original local-only message is shown.

### Notfall-Umarmung (emergency hug → email)

The widget also has a small **Notfall-Umarmung** button that lets Lennart send
Fionn a silent ping without opening Mail or WhatsApp. It POSTs to the same
endpoint with `type: "hug"`. The Apps Script logs the row (prefixed with
`[hug]` in the Wish column) **and** sends an email to
`fionn@fionnferreira.com` via `MailApp`.

Important: after editing `scripts/google-apps-script-wish-inbox.js`, the
Apps Script must be **redeployed** (Deploy → Manage deployments → ✏️ →
Version: New version → Deploy). The `/exec` URL stays the same. The first
time a hug is sent, Google will pop a one-time authorization dialog asking
the script for permission to *send email as you* — accept it. This is why
"Execute as: Me" is required at deployment.

## GitHub Actions

| Workflow | Trigger | What it does |
|---|---|---|
| `validate-gacha.yml` | Push to `main` | Validates JSON, checks weights, simulates odds |
| `sync-shared-album.yml` | Manual + daily cron | Syncs photos from the configured album |

Run validation locally:

```bash
npm run validate
npm run simulate
```

---

## 3D print notes

- NFC sticker: NTAG215 or NTAG216, 25 mm
- Keep NFC under 1–2 mm of plastic; don't place directly behind metal
- Test before sealing
- For a coin: two-part press-fit capsule
- For a mini gacha machine: NFC behind the front window or the button

Suggested text on the print:
```
Lennarts
Souvenir-Gacha
```
