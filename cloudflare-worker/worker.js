/**
 * Affektions-Gacha — NFC Session Gate  (Cloudflare Worker)
 *
 * GET  /                    Browser test-dashboard (handy during setup)
 * GET  /tap?token=<name>    NFC chip URL: log tap → issue JWT → redirect to app
 * POST /verify              Validate a JWT. Body: { "session": "<jwt>" }
 * GET  /stats?admin=<tok>   Tap counts per chip (protected by ADMIN_TOKEN)
 *
 * Required vars (wrangler.toml [vars]):
 *   REDIRECT_URL   Your Webflow page URL
 *   ALLOWED_ORIGIN Your Webflow domain (CORS)
 *   ADMIN_TOKEN    Password for /stats
 *
 * One secret (set after deploy with: wrangler secret put JWT_SECRET):
 *   JWT_SECRET     Long random string used to sign session tokens
 *
 * Optional KV binding (TAP_LOG) — see wrangler.toml for setup instructions.
 * Without it, tapping still works; nothing is logged.
 */

const DEFAULT_TTL = 900; // 15 minutes
const DEFAULT_TOKEN = "lennart";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/tap")    return handleTap(request, env, url);
    if (url.pathname === "/verify") return handleVerify(request, env, corsHeaders);
    if (url.pathname === "/stats")  return handleStats(request, env, url, corsHeaders);
    if (url.pathname === "/")       return handleDashboard(request, env, url);

    return new Response("Not found", { status: 404 });
  },
};

// ── / — test dashboard ────────────────────────────────────────────────────────

async function handleDashboard(request, env, url) {
  const workerUrl = `${url.protocol}//${url.host}`;
  const redirect = env.REDIRECT_URL || "(not set — add REDIRECT_URL in wrangler.toml)";
  const ttl = env.SESSION_TTL_S || DEFAULT_TTL;
  const adminToken = env.ADMIN_TOKEN || "";
  const statsLink = adminToken
    ? `<a href="${workerUrl}/stats?admin=${encodeURIComponent(adminToken)}" target="_blank">View tap stats →</a>`
    : `<em>Set ADMIN_TOKEN in wrangler.toml to enable stats.</em>`;

  const embedSnippet = [
    `&lt;section id="affektions-gacha"&gt;&lt;/section&gt;`,
    ``,
    `&lt;script`,
    `  src="https://fionnf.github.io/Affections-gatcha/dist/affection-gacha.js"`,
    `  data-mount="#affektions-gacha"`,
    `  data-config-base="https://fionnf.github.io/Affections-gatcha/"`,
    `  data-session-verify-url="${workerUrl}/verify"`,
    `  defer`,
    `&gt;&lt;/script&gt;`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gacha Worker — test dashboard</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:660px;margin:40px auto;padding:0 20px;color:#172018;background:#f3f7ef}
  h1{margin-bottom:4px}p.sub{color:#5f705f;margin:0 0 28px}
  h2{margin:28px 0 8px;font-size:1rem;text-transform:uppercase;letter-spacing:.08em;color:#5f705f}
  .card{background:#fffdf8;border:1px solid rgba(38,75,45,.18);border-radius:14px;padding:18px 20px;margin-bottom:14px}
  .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  input[type=text]{flex:1;min-width:140px;padding:8px 12px;border:1px solid rgba(38,75,45,.3);border-radius:8px;font-size:.95rem}
  button,a.btn{display:inline-flex;align-items:center;padding:9px 18px;border-radius:8px;border:none;
    background:#2f7a4f;color:#fff;font-size:.95rem;font-weight:700;cursor:pointer;text-decoration:none}
  button:hover,a.btn:hover{background:#215a3a}
  pre{background:#e6efdf;border-radius:8px;padding:14px;font-size:.82rem;overflow-x:auto;white-space:pre-wrap;word-break:break-all;margin:0}
  .ok{color:#2f7a4f;font-weight:700} .err{color:#b94f2e;font-weight:700}
  #verify-out{margin-top:10px;min-height:1.4em}
</style>
</head>
<body>
<h1>🎰 Gacha Worker</h1>
<p class="sub">Test dashboard — not shown to normal visitors</p>

<h2>1 · Simulate an NFC tap</h2>
<div class="card">
  <p style="margin:0 0 12px">Clicking the button below does exactly what the NFC chip does.</p>
  <div class="row">
    <input type="text" id="token-input" value="${DEFAULT_TOKEN}" placeholder="token / name">
    <button onclick="simulateTap()">Simulate tap →</button>
  </div>
  <p style="margin:10px 0 0;font-size:.88rem;color:#5f705f">
    Will redirect to: <strong>${redirect}</strong> with a ${ttl}s session.
  </p>
</div>

<h2>2 · Verify a session JWT</h2>
<div class="card">
  <p style="margin:0 0 12px">Paste a <code>?session=…</code> value from a redirect URL to check it.</p>
  <div class="row">
    <input type="text" id="jwt-input" placeholder="paste JWT here">
    <button onclick="verifyJwt()">Verify</button>
  </div>
  <div id="verify-out"></div>
</div>

<h2>3 · Tap stats</h2>
<div class="card">${statsLink}</div>

<h2>4 · Webflow embed snippet</h2>
<div class="card">
  <p style="margin:0 0 10px;font-size:.9rem">Copy this into your Webflow Embed element:</p>
  <pre>${embedSnippet}</pre>
</div>

<script>
function simulateTap() {
  const token = document.getElementById('token-input').value.trim() || 'lennart';
  window.location.href = '/tap?token=' + encodeURIComponent(token);
}
async function verifyJwt() {
  const jwt = document.getElementById('jwt-input').value.trim();
  const out = document.getElementById('verify-out');
  if (!jwt) { out.innerHTML = '<span class="err">Paste a JWT first.</span>'; return; }
  out.textContent = 'Checking…';
  try {
    const r = await fetch('/verify', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({session: jwt})
    });
    const d = await r.json();
    if (d.ok) {
      const exp = new Date(d.exp * 1000).toLocaleTimeString();
      out.innerHTML = '<span class="ok">✓ Valid</span> — token: <strong>' + d.token + '</strong>, expires: ' + exp;
    } else {
      out.innerHTML = '<span class="err">✗ ' + d.error + '</span>';
    }
  } catch(e) {
    out.innerHTML = '<span class="err">Request failed: ' + e.message + '</span>';
  }
}
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

// ── /tap ──────────────────────────────────────────────────────────────────────

async function handleTap(request, env, url) {
  if (!env.REDIRECT_URL) {
    return new Response("REDIRECT_URL is not configured in wrangler.toml", { status: 500 });
  }
  if (!env.JWT_SECRET) {
    return new Response(
      "JWT_SECRET is not set. Run: wrangler secret put JWT_SECRET",
      { status: 500 }
    );
  }

  const tokenParam = env.TOKEN_PARAM || "token";
  const token = url.searchParams.get(tokenParam) || DEFAULT_TOKEN;
  const ttl = parseInt(env.SESSION_TTL_S || DEFAULT_TTL, 10);

  await recordTap(env, token, request);

  const jwt = await createJwt({ token }, env.JWT_SECRET, ttl);
  const dest = new URL(env.REDIRECT_URL);
  dest.searchParams.set("session", jwt);

  return Response.redirect(dest.toString(), 302);
}

// ── /verify ───────────────────────────────────────────────────────────────────

async function handleVerify(request, env, corsHeaders) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, corsHeaders);
  }
  if (!env.JWT_SECRET) {
    return jsonResponse({ ok: false, error: "server_misconfigured" }, 500, corsHeaders);
  }

  let body;
  try { body = await request.json(); }
  catch { return jsonResponse({ ok: false, error: "invalid_request" }, 400, corsHeaders); }

  const session = (body.session || "").trim();
  if (!session) {
    return jsonResponse({ ok: false, error: "missing_session" }, 400, corsHeaders);
  }

  const result = await verifyJwt(session, env.JWT_SECRET);
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, 401, corsHeaders);
  }

  return jsonResponse(
    { ok: true, token: result.payload.token, exp: result.payload.exp },
    200,
    corsHeaders
  );
}

// ── /stats ────────────────────────────────────────────────────────────────────

async function handleStats(request, env, url, corsHeaders) {
  const adminToken = env.ADMIN_TOKEN || "";
  if (!adminToken || url.searchParams.get("admin") !== adminToken) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401, corsHeaders);
  }
  if (!env.TAP_LOG) {
    return jsonResponse(
      { ok: false, error: "TAP_LOG KV namespace not bound — see wrangler.toml" },
      500,
      corsHeaders
    );
  }

  const list = await env.TAP_LOG.list({ prefix: "tap:" });
  const entries = await Promise.all(
    list.keys.map(async ({ name }) => {
      const raw = await env.TAP_LOG.get(name);
      try { return { nfc: name.slice(4), ...JSON.parse(raw) }; }
      catch { return { nfc: name.slice(4), count: 0 }; }
    })
  );
  entries.sort((a, b) => (b.count || 0) - (a.count || 0));

  return jsonResponse({ ok: true, taps: entries }, 200, corsHeaders);
}

// ── Tap logging ───────────────────────────────────────────────────────────────

async function recordTap(env, token, request) {
  if (!env.TAP_LOG) return;

  const key = `tap:${token}`;
  const now = new Date().toISOString();
  const ip      = request.headers.get("CF-Connecting-IP") || null;
  const country = request.headers.get("CF-IPCountry") || null;

  let record = { count: 0, firstTap: now, lastTap: now, history: [] };
  try {
    const existing = await env.TAP_LOG.get(key);
    if (existing) record = JSON.parse(existing);
  } catch { /* start fresh */ }

  record.count = (record.count || 0) + 1;
  record.lastTap = now;
  if (!record.firstTap) record.firstTap = now;

  if (!Array.isArray(record.history)) record.history = [];
  record.history.unshift({ at: now, ip, country });
  if (record.history.length > 100) record.history = record.history.slice(0, 100);

  await env.TAP_LOG.put(key, JSON.stringify(record));
}

// ── JWT helpers (HS256, Web Crypto API) ──────────────────────────────────────

function b64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function importKey(secret) {
  return crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]
  );
}

async function createJwt(payload, secret, ttlSeconds) {
  const hdr = b64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const bdy = b64url(new TextEncoder().encode(JSON.stringify({ ...payload, iat: now, exp: now + ttlSeconds })));
  const signingInput = `${hdr}.${bdy}`;
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${b64url(sig)}`;
}

async function verifyJwt(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, error: "malformed" };

  const [hdr, bdy, sig] = parts;
  let payload;
  try { payload = JSON.parse(new TextDecoder().decode(b64urlDecode(bdy))); }
  catch { return { ok: false, error: "malformed" }; }

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return { ok: false, error: "expired" };
  }

  const key = await importKey(secret);
  const valid = await crypto.subtle.verify(
    "HMAC", key, b64urlDecode(sig), new TextEncoder().encode(`${hdr}.${bdy}`)
  );

  return valid ? { ok: true, payload } : { ok: false, error: "invalid_signature" };
}

// ── Utility ───────────────────────────────────────────────────────────────────

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
