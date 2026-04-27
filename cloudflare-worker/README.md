# NFC Session Gate — setup in 5 steps

```
NFC chip → /tap?token=lennart → logs tap → issues 15-min token → redirects to Webflow page
Webflow page → /verify → valid? show gacha : show "tap the chip" screen
```

---

## 1 — Install Wrangler & log in

```bash
npm install -g wrangler
wrangler login
```

## 2 — Edit `wrangler.toml`

Open `cloudflare-worker/wrangler.toml` and replace the **3 lines** marked `← CHANGE THIS`:

| Variable | What to put |
|---|---|
| `REDIRECT_URL` | Your Webflow page, e.g. `https://lennart.webflow.io/gacha` |
| `ALLOWED_ORIGIN` | Same domain, e.g. `https://lennart.webflow.io` |
| `ADMIN_TOKEN` | Any password, e.g. `lennart-stats-2026` |

## 3 — Deploy

```bash
cd cloudflare-worker
wrangler deploy
```

Wrangler prints your Worker URL — save it, you'll need it in the next steps:
```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev
```

## 4 — Set the one secret

```bash
wrangler secret put JWT_SECRET
```
Paste any long random string when prompted (or generate one with `openssl rand -hex 32`).

## 5 — Update the Webflow embed

In your Webflow Embed element, use this snippet (the dashboard shows the exact one with your URL already filled in):

```html
<section id="affektions-gacha"></section>

<script
  src="https://fionnf.github.io/Affections-gatcha/dist/affection-gacha.js"
  data-mount="#affektions-gacha"
  data-config-base="https://fionnf.github.io/Affections-gatcha/"
  data-session-verify-url="https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/verify"
  defer
></script>
```

---

## NFC chip URL

Write this to the chip (any NFC writer app):
```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/tap?token=lennart
```

Use different `token` values for different chips — each is tracked separately.

---

## Testing without a chip

Open your Worker URL in a browser:
```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/
```

You'll see a test dashboard with:
- **Simulate tap** button — does exactly what tapping an NFC chip does
- **Verify JWT** box — paste a `?session=…` value to confirm it validates
- **Tap stats** link — shows total taps per chip (needs tap logging, see below)
- **Webflow embed snippet** — copy-pasteable, with your Worker URL already filled in

---

## Optional: tap logging

To log how many times each chip is tapped (and when):

```bash
wrangler kv namespace create TAP_LOG
```

Copy the `id` that is printed, then uncomment and fill in the block at the bottom of `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "TAP_LOG"
id      = "paste-your-id-here"
```

Then redeploy:
```bash
wrangler deploy
```

View tap counts:
```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/stats?admin=YOUR_ADMIN_TOKEN
```

