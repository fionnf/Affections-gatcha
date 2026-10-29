# Ember Lights — Google Home on / off

A tiny Cloudflare Worker that Google Home talks to. It switches the two lamps
on and off over the same MQTT broker and topics the app uses — the lamps, the
app and `lichter.html` are untouched. One light appears in Google Home,
**Ember Lights**, and it switches both lamps together.

"Hey Google, schalte Ember Lights an" · "…aus" · "turn on Ember Lights".

Only on/off. No colour, no brightness (say so if you want them later).

```
Google Home ──► Worker (Cloudflare) ──► broker.hivemq.com:1883 (MQTT) ──► lamps
```

## Set up (about 20 minutes, once)

### 1. Make the secrets
Four values you invent. In a terminal: `openssl rand -base64 24` makes a good
one. Keep them in your password manager.

| Name | What |
|---|---|
| `CLIENT_ID` | any short word, e.g. `ember-lights` |
| `CLIENT_SECRET` | a long random string |
| `SIGNING_KEY` | another long random string |
| `LINK_PASSPHRASE` | what you will type once on the linking page |

### 2. Google Home developer project
1. Go to <https://console.home.google.com/> → **Create project** (name it
   *Ember Lights*). Note the **Project ID** (shown under the name, like
   `gacha-lampen-1a2b3`).
2. **Add cloud-to-cloud integration**. Name: *Ember Lights*.
3. Leave this page open; you fill in the URLs after step 3.

### 3. Deploy the Worker
You need a free Cloudflare account (<https://dash.cloudflare.com/sign-up>).
```
cd google-home
npx wrangler@4 login
npx wrangler@4 secret put CLIENT_ID
npx wrangler@4 secret put CLIENT_SECRET
npx wrangler@4 secret put SIGNING_KEY
npx wrangler@4 secret put LINK_PASSPHRASE
npx wrangler@4 secret put GOOGLE_PROJECT_ID     # the Project ID from step 2
npx wrangler@4 deploy
```
`deploy` prints your Worker's address, like
`https://ember-lights.YOURNAME.workers.dev`.

### 4. Back in the Google Home Console
- **Cloud fulfillment URL:** `https://…workers.dev/fulfillment`
- **Account linking** → *Client ID* / *Client secret*: the values from step 1
- **Authorization URL:** `https://…workers.dev/auth`
- **Token URL:** `https://…workers.dev/token`
- Save, then **Next / Test**.

### 5. Link it in the Google Home app (on your phone)
1. Google Home app → **+** → **Set up device** → **Works with Google**.
2. Search for **[test] Ember Lights** (the name you gave the project).
3. A page "🔥 Ember Lights verbinden" opens: type `LINK_PASSPHRASE` → **Verbinden**.
4. The light **Ember Lights** appears. Assign them to a room if you like.

Projects in testing mode work for the account that created them; to use them
from another Google account in the household, add it under *Test users* in
the console (or share the home with the account that linked it).

## How it behaves
- **Switching** sends one `{on}` message to both lamps, as the app does when
  "Beide" is chosen.
- **Status** (Google Home showing a lamp as on or off) asks the lamps for
  their state when you open the app, and takes about 2–3 seconds. "Ember Lights" is
  on when either lamp is on. A lamp that does not answer counts as off.
- **If a lamp is unreachable** Google Home says it can't reach it.
- The MQTT broker is public and unauthenticated, exactly as for the app: the
  Worker's tokens protect *Google Home's* access to the Worker, not the lamps'
  topic.

## Cost and limits
Cloudflare's free plan covers this by a wide margin (a few requests a day).
The TCP connection to the broker needs the Workers *sockets* API, which is on
the free plan.

## Tests
`npm test` runs `tests/google-home.test.js`: the MQTT packets against bytes
from a reference encoder, the Smart Home answers, and the whole account
linking flow (wrong password, code, tokens, refresh, expiry).

## If something breaks
- *"Couldn't update setting"* in Google Home → `npx wrangler@4 tail` while you
  try again; it shows each request.
- Linking page says "Ungültige Anfrage" → `GOOGLE_PROJECT_ID` or `CLIENT_ID`
  doesn't match the console.
- Lamps don't switch but Google says OK → check the app's Licht tab switches
  them; if it does, the Worker can't reach `broker.hivemq.com:1883` (set
  `MQTT_HOST` / `MQTT_PORT` in `wrangler.toml` `[vars]` for another broker).
