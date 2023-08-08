import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  site: "https://behide.netlify.app",
  integrations: [
    solidJs(),
    sitemap(),
    robotsTxt()
  ],
  experimental: {
    assets: true
  },
  compressHTML: true
})