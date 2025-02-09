import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import cloudflare from "@astrojs/cloudflare";
import siteData from "./integrations/site-data"
import iconSprite from "./integrations/icon-sprite"
import graphql from "@rollup/plugin-graphql";

const { OUTPUT } = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
  trailingSlash: "always",
  output: OUTPUT === "server" ? "server" : "static",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    siteData(),
    iconSprite()
  ],
  vite: {
    plugins: [graphql()],
  },
  env: {
    schema: {
      SITE: envField.string({ context: "server", access: "secret" }),
      OUTPUT: envField.string({ context: "server", access: "secret" }),
      DATOCMS_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
  devToolbar: {
    enabled: false,
  },
});
