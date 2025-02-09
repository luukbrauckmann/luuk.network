import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { buildClient } from "@datocms/cma-client-node";
import SVGSprite from "svg-sprite";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const { DATOCMS_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default function ({
  dest = "src/.generated",
  prefix = "icon-",
}: {
  dest?: string;
  prefix?: string;
} = {}): AstroIntegration {
  return {
    name: "icon-sprite",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        try {
          const client = buildClient({
            apiToken: DATOCMS_TOKEN,
          });

          const iconsData = [];
          for await (const item of client.items.listPagedIterator({ filter: { type: "icon" } })) {
            iconsData.push({
              name: item.name,
              file: (await client.uploads.find(item.file.upload_id)).url,
            });
          }

          const spriter = new SVGSprite({
            mode: {
              symbol: true
            },
          });

          await Promise.all(
            iconsData.map(async ({ name, file }) => {
              const icon = await (await fetch(file)).text();
              spriter.add(`${prefix}${name}.svg`, null, icon);
            }),
          );

          const { result } = await spriter.compileAsync();

          const filePath = path.join(process.cwd(), dest, "icon-sprite.svg");

          await writeFile(
            filePath,
            result.symbol.sprite.contents.toString(),
            "utf-8",
          );

          logger.info(`Generated`);
        } catch (error: any) {
          logger.error(`Error fetching icons: ${error.message}`);
        }
      },
    },
  };
}
