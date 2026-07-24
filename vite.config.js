import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

// package.json is now "type": "module", so this config runs as ESM — __dirname
// does not exist there and has to be derived from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "AffectionGacha",
      formats: ["iife"],
      fileName: () => "affection-gacha.js"
    },
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
