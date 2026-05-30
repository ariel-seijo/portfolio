import { defineConfig } from "astro/config";

export default defineConfig({
  output: "hybrid",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    format: ["avif", "webp"],
  },
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
});
