import { defineConfig } from "vite";
import path from "path";

// Second build target: the standalone Fionn admin app.
// Produces dist/fionn-admin.js without touching dist/affection-gacha.js.
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "admin/main.js"),
      name: "FionnAdmin",
      formats: ["iife"],
      fileName: () => "fionn-admin.js"
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
