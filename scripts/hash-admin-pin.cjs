#!/usr/bin/env node
// Generate a PIN hash for the Fionn admin app.
// Usage: node scripts/hash-admin-pin.cjs <pin> [salt]
// Then paste the printed "pinHash" (and "salt") into config/admin.json.

const crypto = require("crypto");

const pin = process.argv[2];
const salt = process.argv[3] || "fionn-gacha-2026";

if (!pin) {
  console.error("Usage: node scripts/hash-admin-pin.cjs <pin> [salt]");
  process.exit(1);
}

const hash = crypto.createHash("sha256").update(salt + ":" + pin).digest("hex");

console.log(JSON.stringify({ salt, pinHash: hash }, null, 2));
console.log("\nPaste salt + pinHash into config/admin.json (do NOT commit the PIN itself).");
