#!/usr/bin/env node

/*
  Build photos.json from an exported Apple Photos album.

  Usage:
    node scripts/build-photo-manifest.js photos "https://USERNAME.github.io/REPO/photos/"

  The first argument is the folder containing exported images.
  The second argument is the public base URL where that folder will be served.
*/

const fs = require("node:fs");
const path = require("node:path");

const photoDir = process.argv[2] || "photos";
const baseUrl = process.argv[3] || "";
const absoluteDir = path.resolve(process.cwd(), photoDir);

if (!fs.existsSync(absoluteDir)) {
  console.error(`Photo folder not found: ${absoluteDir}`);
  process.exit(1);
}

const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const files = fs
  .readdirSync(absoluteDir)
  .filter((file) => allowed.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, "de"));

if (!files.length) {
  console.error(`No image files found in ${absoluteDir}`);
  process.exit(1);
}

const normalizedBase = baseUrl && !baseUrl.endsWith("/") ? `${baseUrl}/` : baseUrl;

const captions = [
  "Beweisstück A: ziemlich süß.",
  "Die Maschine nennt das: emotional relevante Daten.",
  "Archivfund mit hohem Süßigkeitswert.",
  "Kleine Erinnerung, große Wirkung.",
  "Wahrscheinlich ein guter Tag.",
  "Für die Sammlung: schöne Orte, gute Menschen.",
  "Souvenir aus dem geheimen Fotoarchiv.",
  "Eine Kapsel mit Aussicht.",
  "Zwischen Reise, Essen und sehr guter Gesellschaft.",
  "Das Foto wurde von der Maschine als wichtig eingestuft."
];

const photos = files.map((file, index) => {
  const prettyName = path
    .basename(file, path.extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    url: normalizedBase ? `${normalizedBase}${encodeURIComponent(file)}` : file,
    alt: `Erinnerung ${index + 1}${prettyName ? `: ${prettyName}` : ""}`,
    caption: captions[index % captions.length]
  };
});

const manifest = {
  generatedAt: new Date().toISOString(),
  photos
};

const outputPath = path.join(absoluteDir, "photos.json");
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Wrote ${outputPath}`);
console.log(`Photos: ${photos.length}`);
