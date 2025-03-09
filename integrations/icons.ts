import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { executeQuery } from "@datocms/cda-client";
import { parse } from "graphql";
import SVGSpriter from "svg-sprite";
import { writeFile } from "node:fs/promises";
import setup, { generatedDir } from "./lib/setup";
import { existsSync, mkdirSync, rmSync } from "node:fs";

const { DATOCMS_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");

const iconsFolder = `${generatedDir}/icons`;

const spriteConfig: SVGSpriter.Config = {
  mode: {
    symbol: true,
  },
};

async function setupIcons() {
  setup();

  if (existsSync(iconsFolder)) {
    rmSync(iconsFolder, { recursive: true, force: true });
  }

  mkdirSync(iconsFolder);
}

async function getIcons() {
  return await executeQuery(
    parse(`
      query {
        icons: allIcons {
          name
          file {
            url
          }
        }
      }
    `),
    { token: DATOCMS_TOKEN }
  );
}

export default function () {
  return {
    name: "icons",
    hooks: {
      "astro:config:setup": async function ({ logger }) {
        setupIcons();

        const { icons } = await getIcons();

        const spriter = new SVGSpriter(spriteConfig);

        await Promise.all(
          icons.map(async (icon) => {
            const file = await (await fetch(icon.file.url)).text();
            const iconPath = `${iconsFolder}/icon-${icon.name}.svg`;
            await writeFile(iconPath, file);
            spriter.add(iconPath, null, file);
          })
        );

        const { result } = await spriter.compileAsync();

        const spritePath = `${generatedDir}/icon-sprite.svg`;

        await writeFile(
          spritePath,
          result.symbol.sprite._contents.toString("utf-8")
        );

        await writeFile(
          `${generatedDir}/icon-sprite.d.ts`,
          `export type IconName = ${icons.map(icon => (`'${icon.name}'`)).join(" | ")};`
        );

        logger.info("Generated");
      },
    },
  } satisfies AstroIntegration;
}
