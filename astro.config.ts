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
          variants: [
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-ExtraLight.woff2"],
                display: 'swap'
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Light.woff2"],
                display: 'swap'
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Regular.woff2"],
                display: 'swap'
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Medium.woff2"],
                display: 'swap'
            },
            {
                weight: 600,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-SemiBold.woff2"],
                display: 'swap'
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Bold.woff2"],
                display: 'swap'
            },
            {
                weight: 800,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-ExtraBold.woff2"],
                display: 'swap'
            },
            {
                weight: 900,
                style: "normal",
                src: ["./src/assets/fonts/Nunito/Nunito-Black.woff2"],
                display: 'swap'
            }
          ]
        },
        {
          provider: "local",
          name: "Dash",
          cssVariable: "--font-dash",
          variants: [
            {
                weight: 100,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Hairline.woff2"],
                display: 'swap'
            },
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Thin.woff2"],
                display: 'swap'
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Extralight.woff2"],
                display: 'swap'
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Light.woff2"],
                display: 'swap'
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Regular.woff2"],
                display: 'swap'
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-Bold.woff2"],
                display: 'swap'
            }
          ]
        },
        {
          provider: "local",
          name: "Dash Semiwide",
          cssVariable: "--font-dash-semiwide",
          variants: [
            {
                weight: 100,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideHairline.woff2"],
                display: 'swap'
            },
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideThin.woff2"],
                display: 'swap'
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideExtralight.woff2"],
                display: 'swap'
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideLight.woff2"],
                display: 'swap'
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideRegular.woff2"],
                display: 'swap'
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-SemiwideBold.woff2"],
                display: 'swap'
            }
          ]
        },
        {
          provider: "local",
          name: "Dash Wide",
          cssVariable: "--font-dash-wide",
          variants: [
            {
                weight: 100,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideHairline.woff2"],
                display: 'swap'
            },
            {
                weight: 200,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideThin.woff2"],
                display: 'swap'
            },
            {
                weight: 300,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideExtralight.woff2"],
                display: 'swap'
            },
            {
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideLight.woff2"],
                display: 'swap'
            },
            {
                weight: 500,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideRegular.woff2"],
                display: 'swap'
            },
            {
                weight: 700,
                style: "normal",
                src: ["./src/assets/fonts/Dash/DashCasualL-WideBold.woff2"],
                display: 'swap'
            }
          ]
        }
      ]
  }
});
