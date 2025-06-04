import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import graphql from "@rollup/plugin-graphql";
import iconsSprite from "./integrations/icons-sprite";

export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: false
    }
  }),
  integrations: [iconsSprite()],
  vite: {
    plugins: [graphql()]
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "nl"],
    routing: {
      prefixDefaultLocale: true
    }
  },
  env: {
    schema: {
      DATOCMS_TOKEN: envField.string({ context: "server", access: "secret" })
    }
  },
  devToolbar: {
    enabled: false
  }
});
