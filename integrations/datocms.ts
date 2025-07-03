import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { buildClient } from "@datocms/cma-client-node";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const { DATOCMS_TOKEN } = loadEnv(
  process.env.NODE_ENV!,
  process.cwd(),
  ""
);

export default function datocms(): AstroIntegration {
  return {
    name: "datocms",
    hooks: {
      "astro:config:setup": async ({ config, updateConfig, logger }) => {
        const client = buildClient({ apiToken: DATOCMS_TOKEN });
        const site = await client.site.find();

        updateConfig({
          i18n: {
            defaultLocale: site.locales[0],
            locales: site.locales,
            routing: {
              prefixDefaultLocale: true,
              redirectToDefaultLocale: true,
              fallbackType: 'redirect'
            }
          }
        });

        const outputDir = join(config.root.pathname, ".generated");
        await mkdir(outputDir, { recursive: true });
        await writeFile(
          join(outputDir, "datocms.json"),
          JSON.stringify(site)
        );
        logger.info("Generated");
      }
    }
  };
}
