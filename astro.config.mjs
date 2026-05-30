import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
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
