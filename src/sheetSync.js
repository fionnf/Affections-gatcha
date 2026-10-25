// ── Sheet-sync race guard ─────────────────────────────────────────────────────
// Shared by any "sheet-authoritative" collection (Gipfelbuch, Glossar): the
// write path posts to the sheet, while the read path overwrites local state
// with whatever the sheet currently has. If a GET happens to land between the
// POST being sent and Apps Script actually persisting it, an authoritative
// overwrite would silently wipe the entry that was just added.
//
// Fix: remember when each collection last had a local write, and skip one
// overwrite pass if it lands within a short grace period afterwards — the
// next sync (a few seconds later) picks up the now-persisted change anyway.
//
// The grace period alone was never enough: it only covers a POST that lands
// within six seconds. A word added offline, or whose POST simply failed, was
// wiped by the first sync after that. The pending-ops queue further down is
// what actually protects those writes; the grace stays as a cheap extra
// cushion, because dropping it would buy nothing and the queue's own guard
// (sheetReadIsStale) only knows about POSTs that came back confirmed.

const _recentWrites = new Map();

export function markRecentWrite(collection) {
  _recentWrites.set(collection, Date.now());
}

export function withinGracePeriod(collection, graceMs = 6000) {
  const t = _recentWrites.get(collection);
  return typeof t === "number" && Date.now() - t < graceMs;
}

// Test seam: lets a test stand at "the grace period has elapsed" without
// sleeping through it. Nothing in the app calls this.
export function _resetRecentWrites() {
  _recentWrites.clear();
}

// ── Pending ops ──────────────────────────────────────────────────────────────
// Every local write to a sheet-authoritative collection is also recorded here,
// in localStorage, until the sheet has confirmed it. One op per entry id: an
// upsert carries the entry as it should look, a delete just the id. A later
// write to the same id replaces the earlier op — the sheet only needs the
// final state, and Apps Script upserts and deletes by id, so replaying an op
// that did land after all is harmless.
//
// Two things use the queue:
//   - every sheet read lays the pending ops over what the sheet returned, so
//     an unsent word or summit stays, and an unsent delete stays deleted;
//   - flushSheetOps re-sends them, and removes an op only once Apps Script
//     has answered {ok:true} to it.
//
// A no-cors fallback is still attempted when the readable request fails (it
// sometimes gets through where cors does not), but its response is opaque, so
// it confirms nothing: the op stays queued and is simply sent again later.

const PENDING_KEY_PREFIX = "affektions-gacha:pending-ops:";
// A couple's glossary and summit log grow by a handful of entries a week; a
// queue this long means the sheet has been unreachable for a very long time.
// Past it the oldest ops go first rather than letting localStorage fill up.
const PENDING_MAX = 200;
const SHEET_COLLECTIONS = ["glossary", "gipfelbuch"];

function pendingKey(collection) {
  return `${PENDING_KEY_PREFIX}${collection}:v1`;
}

export function readPendingOps(collection) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(pendingKey(collection)) || "[]");
    return Array.isArray(parsed) ? parsed.filter((op) => op && op.id && (op.kind === "upsert" || op.kind === "delete")) : [];
  } catch (_) { return []; }
}

function writePendingOps(collection, ops) {
  try {
    if (ops.length) window.localStorage.setItem(pendingKey(collection), JSON.stringify(ops));
    else window.localStorage.removeItem(pendingKey(collection));
    return true;
  } catch (_) { return false; }
}

// A glossary word whose audio upload failed carries the recording inline as
// a data: URL, which can be large. If the queue no longer fits in
// localStorage, keep the op with the inline audio stripped from the queued
// copy: losing the recording from the overlay is far better than losing the
// word itself, and the local cache still has the audio until the sheet's copy
// replaces it.
function stripInlineData(op) {
  const strip = (o) => {
    if (!o || typeof o !== "object") return o;
    const out = { ...o };
    for (const [k, v] of Object.entries(out)) {
      if (typeof v === "string" && v.startsWith("data:")) out[k] = null;
    }
    return out;
  };
  return { ...op, entry: strip(op.entry), body: strip(op.body) };
}

let _opSeq = 0;

// kind: "upsert" | "delete"; entry: the local entry (upserts only), used for
// the overlay; body: the exact JSON body to POST.
export function queueSheetOp(collection, { kind, id, entry = null, body }) {
  if (!id) return null;
  const op = { kind, id, entry, body, seq: `${Date.now()}-${++_opSeq}`, queuedAt: Date.now() };
  let ops = readPendingOps(collection).filter((o) => o.id !== id);
  ops.push(op);
  if (ops.length > PENDING_MAX) ops = ops.slice(ops.length - PENDING_MAX);
  if (!writePendingOps(collection, ops)) {
    writePendingOps(collection, ops.map((o) => (o === op ? stripInlineData(o) : o)));
  }
  return op;
}

// Removes the op only if it is still the one that was sent. A newer edit to
// the same id that was queued while this POST was in flight must stay.
function dropSheetOp(collection, op) {
  const ops = readPendingOps(collection);
  const next = ops.filter((o) => !(o.id === op.id && o.seq === op.seq));
  if (next.length !== ops.length) writePendingOps(collection, next);
}

// Lays the pending ops over a fresh copy from the sheet: pending upserts win
// over whatever the sheet has for that id (new ones go to the front, where a
// local add puts them), pending deletes take the id out.
export function overlayPendingOps(collection, sheetEntries) {
  const ops = readPendingOps(collection);
  if (!ops.length) return sheetEntries;
  const deleted = new Set(ops.filter((o) => o.kind === "delete").map((o) => o.id));
  const upserts = new Map(ops.filter((o) => o.kind === "upsert" && o.entry).map((o) => [o.id, o.entry]));
  const out = [];
  for (const e of sheetEntries) {
    if (deleted.has(e.id)) continue;
    if (upserts.has(e.id)) { out.push(upserts.get(e.id)); upserts.delete(e.id); continue; }
    out.push(e);
  }
  return [...upserts.values()].reverse().concat(out);
}

// ── Confirmation epochs ──────────────────────────────────────────────────────
// A read that left before a POST was saved can come back after the POST was
// confirmed and its op dropped from the queue — and then neither the overlay
// nor (past six seconds) the grace period still knows about the write. Each
// confirmed op bumps its collection's epoch; a read remembers the epoch it
// started under, and if it changed by the time the answer arrives, that
// answer is not trusted to overwrite local state. The next read is fresh.
const _confirmEpoch = new Map();

export function sheetReadStamp(collection) {
  return _confirmEpoch.get(collection) || 0;
}

export function sheetReadIsStale(collection, stamp) {
  return sheetReadStamp(collection) !== stamp;
}

const POST_HEADERS = { "Content-Type": "text/plain;charset=utf-8" };

// Resolves true only for a readable response that says {ok:true}.
async function postConfirmed(endpointUrl, body) {
  const opts = { method: "POST", mode: "cors", credentials: "omit", cache: "no-store", headers: POST_HEADERS, body: JSON.stringify(body) };
  try {
    const res = await fetch(endpointUrl, opts);
    if (!res || !res.ok) return false;
    const json = await res.json();
    return !!(json && json.ok === true);
  } catch (_) {
    // Last-ditch delivery attempt; opaque, so it never counts as confirmed.
    try { await fetch(endpointUrl, { ...opts, mode: "no-cors" }); } catch (_e) {}
    return false;
  }
}

// One flush per collection at a time, so a panel open and a sync starting
// together do not POST the same ops twice over.
const _flushing = new Map();

export function flushSheetOps(collection, endpointUrl) {
  if (!endpointUrl) return Promise.resolve(0);
  installOnlineFlush(endpointUrl);
  if (_flushing.has(collection)) {
    // A write queued while a flush is running is picked up by that flush:
    // it re-reads the queue after every op, until nothing unsent is left.
    return _flushing.get(collection);
  }
  const run = (async () => {
    const tried = new Set();
    let sent = 0;
    for (;;) {
      const op = readPendingOps(collection).find((o) => !tried.has(o.seq));
      if (!op) break;
      tried.add(op.seq);
      if (await postConfirmed(endpointUrl, op.body)) {
        dropSheetOp(collection, op);
        _confirmEpoch.set(collection, sheetReadStamp(collection) + 1);
        sent++;
      }
    }
    return sent;
  })().finally(() => { _flushing.delete(collection); });
  _flushing.set(collection, run);
  return run;
}

export function flushAllSheetOps(endpointUrl) {
  return Promise.all(SHEET_COLLECTIONS.map((c) => flushSheetOps(c, endpointUrl).catch(() => 0)));
}

// Coming back online is exactly when an op that failed offline can go out —
// no need to wait for the next panel open or sync. Installed lazily, from the
// first flush, because that is the first moment the endpoint is known.
let _onlineEndpoint = null;
function installOnlineFlush(endpointUrl) {
  const first = _onlineEndpoint === null;
  _onlineEndpoint = endpointUrl;
  if (!first) return;
  try {
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
      window.addEventListener("online", () => { flushAllSheetOps(_onlineEndpoint).catch(() => {}); });
    }
  } catch (_) {}
}
