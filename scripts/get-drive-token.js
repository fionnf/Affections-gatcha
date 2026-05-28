#!/usr/bin/env node
/*
  One-time helper: get a Google Drive OAuth2 refresh token to store as
  GitHub Secrets GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET, GDRIVE_REFRESH_TOKEN.

  Usage:
    node scripts/get-drive-token.js CLIENT_ID CLIENT_SECRET

  Or set env vars and run without args:
    GDRIVE_CLIENT_ID=... GDRIVE_CLIENT_SECRET=... node scripts/get-drive-token.js

  Setup (one-time, takes ~5 minutes):
    1. Go to https://console.cloud.google.com — use a PERSONAL Google account
       (gmail.com), not an institutional one with org policies.
    2. Create a project (or reuse one) → APIs & Services → Enable APIs →
       search "Google Drive API" → Enable.
    3. APIs & Services → Credentials → + Create Credentials → OAuth client ID
       → Application type: Desktop app → Create.
    4. Copy the Client ID and Client Secret shown.
    5. Run this script:  node scripts/get-drive-token.js CLIENT_ID CLIENT_SECRET
    6. Follow the browser link, approve, paste the code back.
    7. Copy the three values printed at the end into GitHub Secrets.
*/

const http = require("http");
const { execSync } = require("child_process");

const clientId     = process.argv[2] || process.env.GDRIVE_CLIENT_ID;
const clientSecret = process.argv[3] || process.env.GDRIVE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Usage: node scripts/get-drive-token.js CLIENT_ID CLIENT_SECRET");
  process.exit(1);
}

const REDIRECT_PORT = 4242;
const REDIRECT_URI  = `http://localhost:${REDIRECT_PORT}`;
const SCOPE         = "https://www.googleapis.com/auth/drive";

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id",     clientId);
authUrl.searchParams.set("redirect_uri",  REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope",         SCOPE);
authUrl.searchParams.set("access_type",   "offline");
authUrl.searchParams.set("prompt",        "consent");

console.log("\nOpen this URL in your browser and approve access:\n");
console.log(authUrl.toString());
console.log("\nWaiting for redirect on http://localhost:" + REDIRECT_PORT + " ...\n");

// Try to open the browser automatically
try {
  const open = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  execSync(`${open} "${authUrl.toString()}"`, { stdio: "ignore" });
} catch (_) { /* browser open is best-effort */ }

const server = http.createServer(async (req, res) => {
  const url   = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
  const code  = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  res.writeHead(200, { "Content-Type": "text/html" });
  if (error || !code) {
    res.end("<h2>Error: " + (error || "no code") + ". Close this tab and try again.</h2>");
    server.close();
    process.exit(1);
  }

  res.end("<h2>✅ Authorised! You can close this tab.</h2>");
  server.close();

  // Exchange code for tokens
  const body = new URLSearchParams({
    code,
    client_id:     clientId,
    client_secret: clientSecret,
    redirect_uri:  REDIRECT_URI,
    grant_type:    "authorization_code"
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    console.error("\n❌ No refresh_token in response:", JSON.stringify(tokens, null, 2));
    console.error("\nTip: revoke access at https://myaccount.google.com/permissions and run again.");
    process.exit(1);
  }

  console.log("\n✅ Success! Add these three values as GitHub Secrets:\n");
  console.log("  Secret name          Value");
  console.log("  ──────────────────── ────────────────────────────────────");
  console.log(`  GDRIVE_CLIENT_ID     ${clientId}`);
  console.log(`  GDRIVE_CLIENT_SECRET ${clientSecret}`);
  console.log(`  GDRIVE_REFRESH_TOKEN ${tokens.refresh_token}`);
  console.log("\nThen set your Drive folder ID in config/album-source.json → driveFolderId.");
  console.log("Share the Drive folder with yourself and copy its ID from the URL.");
});

server.listen(REDIRECT_PORT);
