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
- `caption`

## Best GitHub editing flow

1. Open the repo on GitHub.
2. Go to `config/outcomes.json` or `config/theme.json`.
3. Click the pencil icon.
4. Edit text or weights.
5. Commit directly to `main`.
6. GitHub Actions validates the config.
7. The Webflow page loads the updated JSON automatically.

No Webflow update is needed unless you change the loader URL or app script.
