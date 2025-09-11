import { defineConfig, envField } from "astro/config";
import node from '@astrojs/node';
import graphql from "@rollup/plugin-graphql";
import codegen from "./integrations/codegen";
import datocms from "./integrations/datocms";
import iconsSprite from "./integrations/icons-sprite";
import designTokens from "./integrations/design-tokens";
import config from "./codegen.config";

export default defineConfig({
  site: 'https://luuk.network',
  adapter: node({
    mode: 'standalone',
  }),
  prefetch: true,
  integrations: [
    codegen(config),
    datocms(),
    iconsSprite(),
    designTokens()
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
  },
  experimental: {
      fonts: [
        {
          provider: "local",
          name: "Nunito",
          cssVariable: "--font-nunito",
          fallbacks: ["system-ui", "sans-serif"],
          variants: [
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-ExtraLight.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Light.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Regular.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Medium.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 600,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-SemiBold.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Bold.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 800,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-ExtraBold.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            },
            {
                weight: 900,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Black.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1",
            }
          ]
        },
        {
          provider: "local",
          name: "Dash",
          cssVariable: "--font-dash",
          fallbacks: ["system-ui", "sans-serif"],
          variants: [
            {
                weight: 100,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Hairline.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",

            },
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Thin.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Extralight.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Light.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Regular.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Bold.woff2"],
                unicodeRange: ["U+0020-007F", "U+00A0-00FF"],
                featureSettings: "'kern' 1, 'liga' 1, 'clig' 1, 'locl' 1",
            }
          ]
        }
      ]
  }
});