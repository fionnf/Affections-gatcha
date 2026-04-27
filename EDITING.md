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

## Best GitHub editing flow

1. Open the repo on GitHub.
2. Go to `config/outcomes.json` or `config/theme.json`.
3. Click the pencil icon.
4. Edit text or weights.
5. Commit directly to `main`.
6. GitHub Actions validates the config.
7. The Webflow page loads the updated JSON automatically.

No Webflow update is needed unless you change the loader URL or app script.
