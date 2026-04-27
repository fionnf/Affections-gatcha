/**
 * Affektions-Gacha — NFC Session Gate
 * Cloudflare Worker
 *
 * Endpoints:
 *   GET  /tap?token=<name>   Record a tap, issue a short-lived JWT, redirect to the app.
 *   POST /verify             Validate a JWT. Body: { "session": "<JWT>" }
 *   GET  /stats?admin=<tok>  Return tap counts and history per NFC chip (admin only).
 *
 * Required secrets (set with `wrangler secret put <NAME>`):
 *   JWT_SECRET    HMAC-SHA256 signing secret — keep this private
 *   ADMIN_TOKEN   Password for the /stats endpoint
 *
 * Required vars (set in wrangler.toml [vars] or via the dashboard):
 *   REDIRECT_URL  Full page URL to send the user to after tapping
 *                 e.g. https://yoursite.webflow.io/gacha
 *
 * Optional vars:
 *   ALLOWED_ORIGIN  CORS origin for /verify, e.g. https://yoursite.webflow.io
 *                   Defaults to * (open). Set this to your exact Webflow domain.
 *   TOKEN_PARAM     Query-param name for the NFC token (default: "token")
 *   SESSION_TTL_S   Session lifetime in seconds (default: 900 = 15 min)
 *
 * KV namespace binding (create in the dashboard, then add to wrangler.toml):
 *   TAP_LOG   Stores tap counts and history per token.
 *             If not bound, tapping still works but nothing is logged.
 */

const DEFAULT_TTL = 900; // 15 minutes

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

    if (url.pathname === "/tap") {
      return handleTap(request, env, url, corsHeaders);
    }
    if (url.pathname === "/verify") {
      return handleVerify(request, env, corsHeaders);
    }
    if (url.pathname === "/stats") {
      return handleStats(request, env, url, corsHeaders);
    }

    return new Response("Not found", { status: 404 });
  },
};

// ── /tap ─────────────────────────────────────────────────────────────────────

async function handleTap(request, env, url, corsHeaders) {
  if (!env.REDIRECT_URL) {
    return new Response("REDIRECT_URL is not configured", { status: 500 });
  }
  if (!env.JWT_SECRET) {
    return new Response("JWT_SECRET is not configured", { status: 500 });
  }

  const tokenParam = env.TOKEN_PARAM || "token";
  const token = url.searchParams.get(tokenParam) || "lennart";
  const ttl = parseInt(env.SESSION_TTL_S || DEFAULT_TTL, 10);

  // Record the tap before redirecting (await so it completes in the Worker lifetime)
  await recordTap(env, token, request);

  const jwt = await createJwt({ token }, env.JWT_SECRET, ttl);

  const dest = new URL(env.REDIRECT_URL);
  dest.searchParams.set("session", jwt);

  return Response.redirect(dest.toString(), 302);
}

// ── /verify ──────────────────────────────────────────────────────────────────

async function handleVerify(request, env, corsHeaders) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, corsHeaders);
  }

  if (!env.JWT_SECRET) {
    return jsonResponse({ ok: false, error: "server_misconfigured" }, 500, corsHeaders);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_request" }, 400, corsHeaders);
  }

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

// ── /stats ───────────────────────────────────────────────────────────────────

async function handleStats(request, env, url, corsHeaders) {
  const adminToken = env.ADMIN_TOKEN || "";
  const provided = url.searchParams.get("admin") || "";

  if (!adminToken || provided !== adminToken) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401, corsHeaders);
  }

  if (!env.TAP_LOG) {
    return jsonResponse(
      { ok: false, error: "TAP_LOG KV namespace is not bound" },
      500,
      corsHeaders
    );
  }

  // List every key with the "tap:" prefix
  const list = await env.TAP_LOG.list({ prefix: "tap:" });

  const entries = await Promise.all(
    list.keys.map(async ({ name }) => {
      const raw = await env.TAP_LOG.get(name);
      try {
        return { nfc: name.slice(4), ...JSON.parse(raw) };
      } catch {
        return { nfc: name.slice(4), count: 0 };
      }
    })
  );

  // Most-tapped first
  entries.sort((a, b) => (b.count || 0) - (a.count || 0));

  return jsonResponse({ ok: true, taps: entries }, 200, corsHeaders);
}

// ── Tap logging ───────────────────────────────────────────────────────────────

async function recordTap(env, token, request) {
  if (!env.TAP_LOG) return; // KV not bound — skip silently

  const key = `tap:${token}`;
  const now = new Date().toISOString();

  // Cloudflare adds these headers automatically on incoming requests
  const ip = request.headers.get("CF-Connecting-IP") || null;
  const country = request.headers.get("CF-IPCountry") || null;

  let record = { count: 0, firstTap: now, lastTap: now, history: [] };

  try {
    const existing = await env.TAP_LOG.get(key);
    if (existing) record = JSON.parse(existing);
  } catch {
    // Start fresh if the stored record is corrupt
  }

  record.count = (record.count || 0) + 1;
  record.lastTap = now;
  if (!record.firstTap) record.firstTap = now;

  // Rolling log of the last 100 taps
  if (!Array.isArray(record.history)) record.history = [];
  record.history.unshift({ at: now, ip, country });
  if (record.history.length > 100) record.history = record.history.slice(0, 100);

  await env.TAP_LOG.put(key, JSON.stringify(record));
}

// ── JWT helpers (HS256 via Web Crypto API) ───────────────────────────────────

function b64url(bytes) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function importKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function createJwt(payload, secret, ttlSeconds) {
  const header = b64url(
    new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  );
  const now = Math.floor(Date.now() / 1000);
  const claims = { ...payload, iat: now, exp: now + ttlSeconds };
  const body = b64url(new TextEncoder().encode(JSON.stringify(claims)));
  const signingInput = `${header}.${body}`;
  const key = await importKey(secret);
  const sigBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signingInput)
  );
  return `${signingInput}.${b64url(sigBytes)}`;
}

async function verifyJwt(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, error: "malformed" };

  const [header, body, sig] = parts;
  const signingInput = `${header}.${body}`;

  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
  } catch {
    return { ok: false, error: "malformed" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp < now) {
    return { ok: false, error: "expired" };
  }

  const key = await importKey(secret);
  const sigBytes = b64urlDecode(sig);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    new TextEncoder().encode(signingInput)
  );

  if (!valid) return { ok: false, error: "invalid_signature" };

  return { ok: true, payload };
}

// ── Utility ──────────────────────────────────────────────────────────────────

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
