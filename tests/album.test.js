import test from "node:test";
import assert from "node:assert/strict";
import { setupBrowserEnv } from "./helpers.js";

setupBrowserEnv("?player=lennart");
const { pulledPhotos } = await import("../src/render.js");

const photo = (url, extra = {}) => ({ url, alt: url, caption: "", type: "image", ...extra });

test("the album only ever contains photos that were actually pulled", () => {
  // The whole point: it is built from history, never from state.photos, so a
  // photo that has not been drawn yet cannot leak in and spoil a Foto-Drop.
  const entries = [
    { day: "2026-08-16", photo: photo("https://x/a.jpg") },
    { day: "2026-08-15", photo: null },
    { day: "2026-08-14", photo: photo("https://x/b.jpg") },
  ];
  assert.deepEqual(pulledPhotos(entries).map((s) => s.url), ["https://x/a.jpg", "https://x/b.jpg"]);
});

test("videos and photoless pulls are skipped", () => {
  const entries = [
    { day: "2026-08-16", photo: photo("https://x/clip.mp4", { type: "video" }) },
    { day: "2026-08-15", photo: photo("https://x/a.jpg") },
    { day: "2026-08-14" },
    { day: "2026-08-13", photo: { alt: "no url" } },
  ];
  assert.deepEqual(pulledPhotos(entries).map((s) => s.url), ["https://x/a.jpg"]);
});

test("the same photo drawn twice appears once, keeping the newer day", () => {
  const entries = [
    { day: "2026-08-16", photo: photo("https://x/a.jpg", { caption: "neu" }) },
    { day: "2026-08-01", photo: photo("https://x/a.jpg", { caption: "alt" }) },
  ];
  const out = pulledPhotos(entries);
  assert.equal(out.length, 1);
  assert.equal(out[0].day, "2026-08-16");
  assert.equal(out[0].caption, "neu");
});

test("order follows the history it is given, and junk cannot crash it", () => {
  assert.deepEqual(pulledPhotos([]), []);
  assert.deepEqual(pulledPhotos(null), []);
  assert.deepEqual(pulledPhotos(undefined), []);
  assert.deepEqual(pulledPhotos([null, undefined, {}]), []);
});
