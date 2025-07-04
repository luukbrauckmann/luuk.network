import type { AstroIntegration } from "astro";
import { generate, type CodegenConfig } from '@graphql-codegen/cli'

export default function codegen(config: CodegenConfig): AstroIntegration {
  return {
    name: "codegen",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        await generate({ ...config, silent: true });
        logger.info("Generated");
      }
    }
  };
}
