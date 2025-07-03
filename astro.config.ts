import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import graphql from "@rollup/plugin-graphql";
import datocms from "./integrations/datocms";
import iconsSprite from "./integrations/icons-sprite";

export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: false
    }
  }),
  integrations: [
    datocms(),
    iconsSprite()
  ],
  vite: {
    plugins: [graphql()]
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
