#!/usr/bin/env node
/*
  One-time setup: authorise Google Drive and write token.json.

  Usage:
    node scripts/auth-drive.js [path/to/oauth_client.json]

  Reads oauth_client.json (downloaded from Google Cloud Console).
  Opens a browser for the OAuth consent screen.
  Writes token.json when approved.

  Then store both file contents as GitHub Secrets:
    GDRIVE_OAUTH_CLIENT  ← contents of oauth_client.json
    GDRIVE_TOKEN         ← contents of token.json

  How to get oauth_client.json (one-time, ~3 min):
    1. console.cloud.google.com → create/select a project
    2. APIs & Services → Enable "Google Drive API"
    3. APIs & Services → Credentials → + Create Credentials
       → OAuth client ID → Desktop app → Create
    4. Download JSON → save as oauth_client.json next to this script
    5. Run: node scripts/auth-drive.js
*/

const fs   = require("fs");
const http = require("http");
const path = require("path");
const { execSync } = require("child_process");

const clientFile = process.argv[2] || path.join(__dirname, "oauth_client.json");
const tokenFile  = path.join(__dirname, "token.json");

if (!fs.existsSync(clientFile)) {
  console.error(`\nCould not find OAuth client file: ${clientFile}`);
  console.error("Download it from Google Cloud Console → Credentials → your Desktop app → ⬇ Download JSON");
  process.exit(1);
}

let creds;
try {
  const raw = JSON.parse(fs.readFileSync(clientFile, "utf8"));
  creds = raw.installed || raw.web;
  if (!creds) throw new Error("unexpected format");
} catch (err) {
  console.error("Failed to parse oauth_client.json:", err.message);
  process.exit(1);
}

const REDIRECT_PORT = 4242;
const REDIRECT_URI  = `http://localhost:${REDIRECT_PORT}`;
const SCOPE         = "https://www.googleapis.com/auth/drive";

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id",     creds.client_id);
authUrl.searchParams.set("redirect_uri",  REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope",         SCOPE);
authUrl.searchParams.set("access_type",   "offline");
authUrl.searchParams.set("prompt",        "consent");

console.log("\nOpening browser for Google Drive authorisation...");
console.log("If it doesn't open automatically, visit:\n");
console.log(authUrl.toString());
console.log();

try {
  const opener = process.platform === "darwin" ? "open"
               : process.platform === "win32"  ? "start"
               : "xdg-open";
  execSync(`${opener} "${authUrl.toString()}"`, { stdio: "ignore" });
} catch (_) {}

const server = http.createServer(async (req, res) => {
  const url   = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
  const code  = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h2 style="font-family:sans-serif">Error: ${error || "no code"}. Close this tab and try again.</h2>`);
    server.close();
    process.exit(1);
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h2 style="font-family:sans-serif;color:green">✅ Authorised — you can close this tab.</h2>`);
  server.close();

  const body = new URLSearchParams({
    code,
    client_id:     creds.client_id,
    client_secret: creds.client_secret,
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
    console.error("\n❌ No refresh_token returned:", JSON.stringify(tokens, null, 2));
    console.error("\nTip: revoke access at https://myaccount.google.com/permissions then run again.");
    process.exit(1);
  }

  fs.writeFileSync(tokenFile, JSON.stringify(tokens, null, 2) + "\n");
  console.log(`✅ token.json written to ${tokenFile}\n`);
  console.log("Now add these two GitHub Secrets (repo → Settings → Secrets → Actions):\n");
  console.log("  GDRIVE_OAUTH_CLIENT  →  paste the full contents of oauth_client.json");
  console.log("  GDRIVE_TOKEN         →  paste the full contents of token.json\n");
  console.log("Also set  driveFolderId  in config/album-source.json (Drive folder URL → last segment).");
});

server.listen(REDIRECT_PORT, () => {
  console.log(`Waiting for OAuth redirect on http://localhost:${REDIRECT_PORT} ...`);
});
