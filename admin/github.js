// GitHub Contents API client — reads & commits config JSON directly from the
// browser using Fionn's fine-grained token (contents: read/write on this repo).
import { state } from "./state.js";
import { TOKEN_KEY } from "./constants.js";

export function getToken() {
  try { return window.localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
}
export function setToken(token) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token.trim());
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {}
}
export function hasToken() { return !!getToken(); }

function repo() {
  const r = (state.admin && state.admin.repo) || {};
  return { owner: r.owner, name: r.name, branch: r.branch || "master" };
}

function apiHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

// UTF-8 safe base64 <-> string
function b64encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function b64decode(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}

// Verify the token works and report the authenticated user.
export async function whoAmI() {
  const res = await fetch("https://api.github.com/user", { headers: apiHeaders() });
  if (!res.ok) throw new Error(`GitHub auth failed (${res.status})`);
  return res.json();
}

// Fetch a file → { json, sha }
export async function getFile(path) {
  const { owner, name, branch } = repo();
  const url = `https://api.github.com/repos/${owner}/${name}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: apiHeaders() });
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  const data = await res.json();
  const text = b64decode(data.content || "");
  return { json: JSON.parse(text), sha: data.sha };
}

// Serialize JSON the way the repo files are stored: 2-space indent + trailing newline.
export function serialize(json) {
  return JSON.stringify(json, null, 2) + "\n";
}

// Commit an updated file. Retries once on a 409 (sha conflict) by re-reading.
export async function putFile(path, json, sha, message) {
  const { owner, name, branch } = repo();
  const url = `https://api.github.com/repos/${owner}/${name}/contents/${encodeURIComponent(path)}`;
  const body = {
    message: message || `chore(admin): update ${path}`,
    content: b64encode(serialize(json)),
    sha,
    branch
  };
  let res = await fetch(url, { method: "PUT", headers: apiHeaders(), body: JSON.stringify(body) });
  if (res.status === 409) {
    const fresh = await getFile(path);
    body.sha = fresh.sha;
    res = await fetch(url, { method: "PUT", headers: apiHeaders(), body: JSON.stringify(body) });
  }
  if (!res.ok) {
    let detail = "";
    try { detail = (await res.json()).message || ""; } catch {}
    throw new Error(`Commit failed (${res.status}) ${detail}`);
  }
  const out = await res.json();
  return out.content ? out.content.sha : sha;
}
