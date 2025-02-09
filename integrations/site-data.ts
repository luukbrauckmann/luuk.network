import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { buildClient } from "@datocms/cma-client-node";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const { DATOCMS_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default function ({ dest = '.astro' }: { dest?: string } = {}): AstroIntegration {
  return {
    name: "site-data",
    hooks: {
      'astro:server:setup': async ({ logger }) => {
        try {
          const client = buildClient({
            apiToken: DATOCMS_TOKEN,
          });
          const data = await client.site.find();
          const filePath = path.join(dest, "site.json");
          await writeFile(filePath, JSON.stringify(data, null, 2));
          logger.info(`Generated`);
        } catch (error: any) {
          console.log(`Error fetching icons: ${error.message}`);
        }
      }
    }
  }
}
