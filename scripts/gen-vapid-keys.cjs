#!/usr/bin/env node
// Generate a VAPID key pair for Web Push (P-256 / prime256v1), printed as the
// URL-safe base64 strings the browser's PushManager and the `web-push` sender
// both expect. Pure Node crypto — no dependencies.
//
//   node scripts/gen-vapid-keys.cjs
//
// Put the PUBLIC key in config/push.json (vapidPublicKey) — safe to commit.
// Keep the PRIVATE key OUT of the repo; it lives only in the sender's secrets
// (GitHub Actions secret / Cloudflare Worker env). See PUSH-SETUP.md.
const crypto = require("node:crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", { namedCurve: "prime256v1" });

// Raw uncompressed public point (65 bytes: 0x04 || X || Y).
const pubRaw = publicKey.export({ type: "spki", format: "der" }).subarray(-65);
// Raw private scalar (32 bytes).
const jwk = privateKey.export({ format: "jwk" });
const privRaw = Buffer.from(jwk.d, "base64url");

const b64url = (buf) => Buffer.from(buf).toString("base64url");

console.log("VAPID keys generated.\n");
console.log("Public key  (→ config/push.json \"vapidPublicKey\", safe to commit):");
console.log("  " + b64url(pubRaw) + "\n");
console.log("Private key (→ sender secret ONLY, never commit):");
console.log("  " + b64url(privRaw) + "\n");
console.log("Subject     (→ sender config): mailto:you@example.com");
