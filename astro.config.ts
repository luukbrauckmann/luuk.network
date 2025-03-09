import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import cloudflare from "@astrojs/cloudflare";
import graphql from "@rollup/plugin-graphql";
import icons from "./integrations/icons";

const { OUTPUT } = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
  trailingSlash: "always",
  output: OUTPUT === "server" ? "server" : "static",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    icons(),
  ],
  vite: {
    plugins: [
      graphql(),
    ],
  },
  env: {
    schema: {
      SITE: envField.string({ context: "server", access: "secret" }),
      OUTPUT: envField.string({ context: "server", access: "secret" }),
      DATOCMS_TOKEN: envField.string({ context: "server", access: "secret" }),
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
  devToolbar: {
    enabled: false,
  },
  prefetch: true,
});
