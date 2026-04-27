# Editing without touching code

The Webflow page should only contain `webflow-loader.html`.

Everything you actually edit lives in `config/`.

## Change colors, name, timing

Edit:

```text
config/theme.json
```

Useful fields:

- `brand.displayNameDefault`: default name, currently `Lennart`
- `brand.titleTemplate`: page title, currently `{name}s Affektions-Gacha`
- `revealDelayMs`: how long the machine works before revealing
- `loadingSteps`: the little progress messages
- `colors.primary`, `colors.green`, etc.
- `darkColors`: dark-mode equivalents

## Change response text

Edit:

```text
config/outcomes.json
```

Each category has:

- `label`: what appears on the capsule result
- `weight`: probability weight
- `tone`: visual tone
- `outcomes`: title/message pairs

The weights currently add to 1000, so:

- `200` = 20%
- `50` = 5%
- `10` = 1%

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

**Videos & Google Photos:** the Google sync now reads the album's structured
data and tags each item as `"image"` or `"video"`. Videos use a
`googleusercontent.com/...=dv` URL that 302-redirects to a playable MP4 stream.
This works today, but is best-effort — Google does not promise the `=dv`
endpoint will keep working, and any item where `=dv` cannot be resolved is
skipped (with a warning) rather than being silently exported as a static image
thumbnail. If videos are important to you, an iCloud public shared album is
the more reliable source.

**Live Photos / motion photos:** iPhone Live Photos and short motion frames
are flagged in Google's structured data with the same media-type marker as
real videos (`14`). Treating them as video produces broken playback because
the bundled clip is only 1–3 seconds long and `=dv` often returns just the
still frame. The sync therefore requires *both* `marker == 14` *and*
`durationMs >= LIVE_PHOTO_MAX_MS` (default 4000 ms, defined in
`scripts/sync-shared-album.js`) before emitting an item as
`"type": "video"`. Anything below that threshold — or with no duration at
all — is exported as the still image (`=s2048` URL, `"type": "image"`).
The sync logs each Live-Photo downgrade and prints a summary
(`X Live Photo(s) emitted as still images`). Better a clean still than a
janky short clip.

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
when embedded in a full-bleed Webflow section. Inner padding scales with
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
7. The Webflow page loads the updated JSON automatically.

No Webflow update is needed unless you change the loader URL or app script.
