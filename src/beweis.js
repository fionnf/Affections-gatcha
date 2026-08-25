// ── Beweis-Foto upload ────────────────────────────────────────────────────────
// A quest's proof photo, taken or picked in the app, compressed on the phone
// and posted to the same Apps Script endpoint the backup uses. The script
// stores it in Drive and answers with a googleusercontent URL — the same form
// config/photos.json uses, so it renders in an <img> like any other photo.
import { state } from "./state.js";

// Downscale + re-encode before upload. A 4MB HEIC off the camera becomes a
// ~300–500KB JPEG, which is the difference between "instant" and "spinning"
// on island data. Safari decodes HEIC natively when drawing to a canvas, so
// no format special-casing is needed.
export function compressImage(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
        const w = Math.max(1, Math.round((img.naturalWidth || 1) * scale));
        const h = Math.max(1, Math.round((img.naturalHeight || 1) * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        if (!dataUrl || dataUrl === "data:,") { reject(new Error("encode failed")); return; }
        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode failed")); };
    img.src = url;
  });
}

// Resolves with the stored photo's URL, or rejects with err.code set to:
//   "no-endpoint" — backup sync is off in config, nothing to upload to
//   "old-script"  — the endpoint answered, but not with a URL: the deployed
//                   Apps Script predates beweis-upload and must be redeployed
//   "network"     — the request never got through (offline, timeout)
// The caller turns each into its own toast instead of one vague failure.
export async function uploadBeweis(day, token, file) {
  const cfg = state.backup;
  if (!cfg || !cfg.enabled || !cfg.endpointUrl) {
    throw Object.assign(new Error("backup disabled"), { code: "no-endpoint" });
  }
  const dataUrl = await compressImage(file);
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 30000);
  let res;
  try {
    res = await fetch(cfg.endpointUrl, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      signal: controller.signal,
      body: JSON.stringify({ type: "beweis-upload", token, day, mime: "image/jpeg", image: base64 })
    });
  } catch (err) {
    throw Object.assign(new Error("network"), { code: "network" });
  } finally {
    clearTimeout(tid);
  }

  // Success is "ok AND a URL". An old deployment either rejects the type
  // (ok:false) or — if it predates even that guard — falls through some other
  // branch and answers ok:true with no url. Trusting bare ok:true would show
  // "Bestanden" for a photo that never landed anywhere.
  let out = null;
  try { out = await res.json(); } catch (_e) { /* HTML error page, opaque, etc. */ }
  if (!out || !out.ok || !out.url) {
    throw Object.assign(new Error((out && out.error) || "no url"), { code: "old-script" });
  }
  return out.url;
}
