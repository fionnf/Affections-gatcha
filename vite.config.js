import { defineConfig } from "vite";
import path from "path";

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
