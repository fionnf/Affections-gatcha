// HTTP side of the Worker, written against plain Request/Response so it runs
// in tests without Cloudflare:
//   GET/POST /auth         account linking: Google sends the person here once
//   POST     /token        code → access + refresh token, refresh → access
//   POST     /fulfillment  the Smart Home intents (needs a valid access token)
import { sign, verify, safeEqual } from "./auth.js";
import { fulfil } from "./smarthome.js";

const ACCESS_MS = 3600 * 1000;
const CODE_MS = 10 * 60 * 1000;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json" } });
const html = (s, status = 200) => new Response(s, { status, headers: { "content-type": "text/html; charset=utf-8" } });

// Google only ever sends people back to its own redirect URL for this project.
function redirectOk(uri, env) {
  const p = env.GOOGLE_PROJECT_ID;
  return typeof uri === "string" && !!p && (
    uri.startsWith(`https://oauth-redirect.googleapis.com/r/${p}`) ||
    uri.startsWith(`https://oauth-redirect-sandbox.googleapis.com/r/${p}`));
}

const form = (params, error = "") => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ember Lights verbinden</title><body style="font-family:system-ui;max-width:22rem;margin:3rem auto;padding:0 1rem">
<h1>🔥 Ember Lights verbinden</h1><p>Passwort eingeben, um Google Home mit Ember Lights zu verbinden.</p>
${error ? `<p style="color:#b00">${esc(error)}</p>` : ""}
<form method="post">${["client_id", "redirect_uri", "state", "response_type"].map((k) => `<input type="hidden" name="${k}" value="${esc(params[k] || "")}">`).join("")}
<input type="password" name="passphrase" autofocus autocomplete="current-password" style="width:100%;padding:.6rem;font-size:1rem"><br><br>
<button style="padding:.6rem 1.2rem;font-size:1rem">Verbinden</button></form></body>`;

async function authorize(request, env) {
  const url = new URL(request.url);
  const p = request.method === "POST" ? Object.fromEntries(await request.formData()) : Object.fromEntries(url.searchParams);
  if (!safeEqual(p.client_id || "", env.CLIENT_ID) || !redirectOk(p.redirect_uri, env) || p.response_type !== "code") {
    return html("<p>Ungültige Anfrage.</p>", 400);
  }
  if (request.method === "GET") return html(form(p));
  if (!safeEqual(p.passphrase || "", env.LINK_PASSPHRASE)) return html(form(p, "Falsches Passwort."), 403);
  const code = await sign(env.SIGNING_KEY, { t: "code", exp: Date.now() + CODE_MS });
  const back = new URL(p.redirect_uri);
  back.searchParams.set("code", code);
  if (p.state) back.searchParams.set("state", p.state);
  return Response.redirect(back.toString(), 302);
}

async function token(request, env) {
  const p = Object.fromEntries(await request.formData());
  if (!safeEqual(p.client_id || "", env.CLIENT_ID) || !safeEqual(p.client_secret || "", env.CLIENT_SECRET)) {
    return json({ error: "invalid_client" }, 401);
  }
  const access = () => sign(env.SIGNING_KEY, { t: "access", exp: Date.now() + ACCESS_MS });
  if (p.grant_type === "authorization_code") {
    const c = await verify(env.SIGNING_KEY, p.code);
    if (!c || c.t !== "code" || !redirectOk(p.redirect_uri, env)) return json({ error: "invalid_grant" }, 400);
    return json({
      token_type: "Bearer", expires_in: ACCESS_MS / 1000,
      access_token: await access(),
      refresh_token: await sign(env.SIGNING_KEY, { t: "refresh" })
    });
  }
  if (p.grant_type === "refresh_token") {
    const r = await verify(env.SIGNING_KEY, p.refresh_token);
    if (!r || r.t !== "refresh") return json({ error: "invalid_grant" }, 400);
    return json({ token_type: "Bearer", expires_in: ACCESS_MS / 1000, access_token: await access() });
  }
  return json({ error: "unsupported_grant_type" }, 400);
}

async function fulfillment(request, env, bridge) {
  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const t = await verify(env.SIGNING_KEY, bearer);
  if (!t || t.t !== "access") return json({ error: "unauthorized" }, 401);
  let body;
  try { body = await request.json(); } catch (_e) { return json({ error: "bad request" }, 400); }
  return json(await fulfil(body, bridge));
}

export async function route(request, env, bridge) {
  const { pathname } = new URL(request.url);
  if (pathname === "/auth" && (request.method === "GET" || request.method === "POST")) return authorize(request, env);
  if (pathname === "/token" && request.method === "POST") return token(request, env);
  if (pathname === "/fulfillment" && request.method === "POST") return fulfillment(request, env, bridge);
  if (pathname === "/") return new Response("Ember Lights läuft.", { status: 200 });
  return new Response("Not found", { status: 404 });
}
