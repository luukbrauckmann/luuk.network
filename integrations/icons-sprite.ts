import type { AstroIntegration } from "astro";
import type { IconsQuery, IconsQueryVariables } from "@generated/datocms";
import { loadEnv } from "vite";
import { executeQuery } from "@datocms/cda-client";
import query from "./icons.query.graphql?raw";
import SVGSpriter from "svg-sprite";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const { DATOCMS_TOKEN } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default function iconsSprite(): AstroIntegration {
  return {
    name: "icons-sprite",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        const { allIcons } = await executeQuery<
          IconsQuery,
          IconsQueryVariables
        >(query, { token: DATOCMS_TOKEN });

        const spriter = new SVGSpriter({
          mode: {
            symbol: true
          }
        });

        await Promise.all(
          allIcons.map(async ({ file, name }) => {
            if (!file) return;
            const svgContent = await (await fetch(file.url)).text();
            spriter.add(`${name}.svg`, null, svgContent);
          })
        );

        const { result } = await spriter.compileAsync();

        const outputDir = join(config.root.pathname, ".generated");

        await mkdir(outputDir, { recursive: true });
        await writeFile(
          join(outputDir, "icons-sprite.svg"),
          result.symbol.sprite.contents
        );
        await writeFile(
          join(outputDir, "icons-sprite.ts"),
          `export type IconName = ${allIcons.map(({ name }) => `'${name}'`).join(" | ")}`
        );

        logger.info("Generated");
      }
    }
  };
}
