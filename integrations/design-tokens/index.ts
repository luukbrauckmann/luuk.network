import type { AstroIntegration } from "astro";
import StyleDictionary from "style-dictionary";
import colorOklch from "./transformers/color-oklch";

export default function designTokens(): AstroIntegration {
  return {
    name: "design-tokens",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        const sb = new StyleDictionary(
          {
            source: ["src/tokens.json", "src/tokens/**/*.json"],
            platforms: {
              css: {
                transformGroup: "css",
                transforms: ["color/oklch"],
                buildPath: ".generated",
                files: [
                  {
                    destination: "tokens.css",
                    format: "css/variables"
                  }
                ]
              }
            }
          },
          {
            verbosity: "silent"
          }
        );

        sb.registerTransform(colorOklch);

        await sb.buildAllPlatforms();
        logger.info("Generated");
      }
    }
  };
}
