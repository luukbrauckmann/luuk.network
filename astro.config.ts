import { defineConfig, envField } from "astro/config";
import cloudflare from '@astrojs/cloudflare';
import graphql from "@rollup/plugin-graphql";
import codegen from "./integrations/codegen";
import datocms from "./integrations/datocms";
import iconsSprite from "./integrations/icons-sprite";
import config from "./codegen.config";

export default defineConfig({
  site: 'https://luuk.network',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  prefetch: true,
  integrations: [
    codegen(config),
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
