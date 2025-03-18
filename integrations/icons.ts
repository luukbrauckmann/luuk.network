import type { AstroIntegration } from 'astro';
import { loadEnv } from 'vite';
import { existsSync, readdirSync, unlinkSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { executeQuery } from '@datocms/cda-client';
import { parse } from 'graphql';
import SVGSpriter from 'svg-sprite';

const { DATOCMS_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), '');

const folderPath = 'src/.generated';
const iconsFolder = 'icons';
const iconsPath = join(folderPath, iconsFolder);
let icons = [];

async function setupIcons(): Promise<void> {
  try {
    if (existsSync(iconsPath)) {
      const files = readdirSync(iconsPath);
      for (const file of files) {
        unlinkSync(join(iconsPath, file));
      }
    } else {
      mkdirSync(iconsPath, { recursive: true });
    }
  } catch (error) {
    throw new Error(`Failed to setup icons directory: ${error.message}`);
  }
}

async function getIconData() {
  const { allIcons } = await executeQuery(
    parse(`
        query {
          allIcons {
            name
            file {
              url
            }
          }
        }
      `),
    { token: DATOCMS_TOKEN }
  );

  icons = allIcons;
}

async function downloadIcons() {
  icons = await Promise.all(
    icons.map(async (icon) => {
      const svgContent = await (await fetch(icon.file.url)).text();
      const filePath = join(iconsPath, `${icon.name}.svg`);
      await writeFile(filePath, svgContent);
      return { name: icon.name, content: svgContent, path: filePath };
    })
  );
}

async function createIconSprite() {
  const config = {
    mode: {
      symbol: true
    }
  };

  const spriter = new SVGSpriter(config);

  icons.forEach((icon) => {
    spriter.add(icon.path, null, icon.content);
  });

  const { result } = await spriter.compileAsync();

  const spritePath = `${folderPath}/icon-sprite.svg`;

  await writeFile(spritePath, result.symbol.sprite._contents.toString('utf-8'));

  await writeFile(
    `${folderPath}/icon-sprite.d.ts`,
    `export type IconName = ${icons.map((icon) => `'${icon.name}'`).join(' | ')};`
  );
}

export default function (): AstroIntegration {
  return {
    name: 'icons',
    hooks: {
      'astro:config:setup': async function ({ logger }) {
        await setupIcons();
        await getIconData();
        await downloadIcons();
        await createIconSprite();
        logger.info('Generated');
      }
    }
  };
}
