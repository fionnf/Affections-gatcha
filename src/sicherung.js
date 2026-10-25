// ── Sicherung ────────────────────────────────────────────────────────────────
// Everything the app remembers lives in this browser's localStorage, and the
// Sheet holds most of it again — but not all (weather on a capsule, the
// colour memory, stickers, Kurs progress), and a Sheet is one shared Google
// account away from gone. This writes the whole of it into one file he can
// keep, and reads such a file back on a new phone.
//
// The file is the raw storage, key by key, under one version number: no
// translation layer to get wrong, and whatever a later version of the app
// stores is in it automatically.
import { armConfirm } from "./confirm.js";
import { showToast } from "./toast.js";
import { haptic } from "./haptic.js";

const PREFIX = "affektions-gacha:";
const FORMAT = "affektions-gacha-sicherung";

export function buildBackup(storage = window.localStorage, now = new Date()) {
  const data = {};
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    if (k && k.startsWith(PREFIX)) data[k] = storage.getItem(k);
  }
  return { format: FORMAT, version: 1, exportedAt: now.toISOString(), data };
}

// Validates a parsed file and writes it back. Only keys under the app's own
// prefix are touched, and only those the file carries — anything newer on
// this device that the file doesn't know about stays. Returns the number of
// keys written; throws with a German message the toast can show.
export function applyBackup(obj, storage = window.localStorage) {
  if (!obj || obj.format !== FORMAT || typeof obj.data !== "object" || !obj.data) {
    throw new Error("Das ist keine Sicherung dieser App.");
  }
  if (obj.version !== 1) throw new Error("Diese Sicherung ist von einer neueren Version.");
  const entries = Object.entries(obj.data).filter(([k, v]) => k.startsWith(PREFIX) && typeof v === "string");
  if (!entries.length) throw new Error("Die Sicherung ist leer.");
  for (const [k, v] of entries) storage.setItem(k, v);
  return entries.length;
}

function fileName(now = new Date()) {
  return `affektions-gacha-${now.toISOString().slice(0, 10)}.json`;
}

async function saveFile() {
  const backup = buildBackup();
  const blob = new Blob([JSON.stringify(backup, null, 1)], { type: "application/json" });
  const name = fileName();
  // An installed app on iOS can't follow a download link; the share sheet
  // can hand the file to Dateien, Mail or AirDrop.
  try {
    const file = new File([blob], name, { type: "application/json" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: "Affektions-Gacha Sicherung" });
      return true;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return false;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return true;
}

export function bindSicherung(exportBtn, importBtn, fileInput) {
  if (exportBtn) {
    exportBtn.addEventListener("click", async () => {
      haptic(6);
      try {
        if (await saveFile()) showToast("💾 Sicherung erstellt");
      } catch (_e) {
        showToast("Sicherung fehlgeschlagen");
      }
    });
  }
  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => {
      // Overwrites what this phone holds for every key in the file, so it
      // takes the same double tap as every other thing that can't be undone.
      if (!armConfirm(importBtn, "Überschreibt diesen Stand — nochmal tippen")) return;
      fileInput.click();
    });
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files && fileInput.files[0];
      fileInput.value = "";
      if (!file) return;
      try {
        const n = applyBackup(JSON.parse(await file.text()));
        showToast(`💾 ${n} Einträge zurückgeholt — lädt neu…`);
        setTimeout(() => window.location.reload(), 1200);
      } catch (e) {
        showToast(e && e.message && /Sicherung|Version/.test(e.message) ? e.message : "Die Datei konnte nicht gelesen werden.");
      }
    });
  }
}
