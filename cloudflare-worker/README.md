# NFC Session Gate — Cloudflare Worker

This Worker sits between the NFC chip and the Gacha page.  
Every tap goes through it, so it can:

- issue a short-lived signed session token (JWT)
- log how many times each chip was tapped and when
- reject saved links once the JWT has expired

---

## How it works

```
NFC chip → https://your-worker.workers.dev/tap?token=lennart
            │
            ├─ records the tap in KV
            ├─ creates a 15-minute signed JWT
            └─ redirects to → https://yoursite.webflow.io/gacha?session=<JWT>
                               │
                               └─ page JS calls /verify with the JWT
                                   ├─ valid  → strip ?session= from URL, show gacha
                                   └─ invalid/expired → "Tap the NFC chip" screen
```

---

## One-time setup

### 1 — Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### 2 — Create the KV namespace

```bash
wrangler kv namespace create TAP_LOG
```

Copy the `id` that is printed and paste it into `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "TAP_LOG"
id      = "abc123..."   # ← your id here
```

### 3 — Edit `wrangler.toml`

Replace the two placeholder values:

| Variable | Example |
|---|---|
| `REDIRECT_URL` | `https://lennart.webflow.io/gacha` |
| `ALLOWED_ORIGIN` | `https://lennart.webflow.io` |

### 4 — Set secrets (never stored in files)

```bash
# A long random string — used to sign and verify session JWTs
wrangler secret put JWT_SECRET

# A password for the /stats endpoint
wrangler secret put ADMIN_TOKEN
```

For `JWT_SECRET` you can generate a good one with:

```bash
openssl rand -hex 32
```

### 5 — Deploy

```bash
wrangler deploy
```

Wrangler prints your Worker URL, e.g.:

```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev
```

---

## NFC chip URL

Write this URL to the NFC chip (use any NFC writing app):

```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/tap?token=lennart
```

- `token` is used as the display name inside the Gacha and as the key in the tap log.
- If you have multiple chips for different people, use different tokens:  
  `?token=lennart`, `?token=alex`, etc.

---

## Webflow / frontend setup

In the Webflow embed (or `webflow-loader.html`) add the `data-session-verify-url`
attribute pointing to your Worker's `/verify` endpoint:

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

Without that attribute the page loads normally (no gate) — useful for local testing.

---

## Viewing tap logs

Open this URL in your browser (or `curl` it):

```
https://affektions-gacha-gate.YOUR-SUBDOMAIN.workers.dev/stats?admin=YOUR_ADMIN_TOKEN
```

Response example:

```json
{
  "ok": true,
  "taps": [
    {
      "nfc": "lennart",
      "count": 14,
      "firstTap": "2026-04-01T09:12:00.000Z",
      "lastTap":  "2026-04-27T18:44:00.000Z",
      "history": [
        { "at": "2026-04-27T18:44:00.000Z", "ip": "1.2.3.4", "country": "CH" },
        { "at": "2026-04-26T11:30:00.000Z", "ip": "1.2.3.4", "country": "CH" }
      ]
    }
  ]
}
```

- **`count`** — total taps for that chip
- **`firstTap`** / **`lastTap`** — ISO timestamps in UTC
- **`history`** — rolling log of the last 100 individual taps with IP and country

---

## Session lifetime

The default is 15 minutes (`SESSION_TTL_S = "900"` in `wrangler.toml`).

- After the JWT expires the page shows *"Sitzung abgelaufen — bitte den NFC-Chip erneut antippen."*
- If the page is already open when expiry happens, a countdown replaces the UI at that exact moment.
- Saving the link and opening it after the session has expired shows the same "tap again" screen.

---

## Cloudflare free tier

Everything used here (Workers, KV) is within the Cloudflare free tier for personal use:

| Resource | Free limit |
|---|---|
| Worker requests | 100 000 / day |
| KV reads | 100 000 / day |
| KV writes | 1 000 / day |

A personal NFC gift will use far less than 1 % of these limits.
