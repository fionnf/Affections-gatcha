// Stateless signed tokens for Google's account linking: the Worker keeps no
// storage. A token is base64url(JSON) + "." + HMAC-SHA256, checked with the
// SIGNING_KEY secret.
const enc = new TextEncoder();
const b64u = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const key = (secret) => crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

export async function sign(secret, payload) {
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(body)));
  return `${body}.${b64u(sig)}`;
}

// The payload, or null when the signature is wrong, the token is malformed, or
// it has expired.
export async function verify(secret, token, now = Date.now()) {
  try {
    const [body, sig] = String(token).split(".");
    if (!body || !sig) return null;
    const ok = await crypto.subtle.verify("HMAC", await key(secret), unb64u(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(unb64u(body)));
    if (payload.exp && payload.exp < now) return null;
    return payload;
  } catch (_e) { return null; }
}

// Same-length compare without an early exit.
export function safeEqual(a, b) {
  const x = enc.encode(String(a)), y = enc.encode(String(b));
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}
