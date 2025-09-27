import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { executeQuery } from "@datocms/cda-client";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const { DATOCMS_TOKEN } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default function translations(): AstroIntegration {
  return {
    name: "datocms",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        const translations = (await Promise.all(
          config.i18n.locales.map(async (locale) => {
            if (typeof locale === 'string') {
              const { allTranslations } = await executeQuery(
                `
                  query AllTranslations($locale: SiteLocale) {
                    allTranslations(locale: $locale) {
                      key
                      value
                    }
                  }
                `,
                {
                  token: DATOCMS_TOKEN,
                  variables: {
                    locale
                  }
                }
              );

              return { [locale]: allTranslations.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) }
            }
          })
        )).reduce((acc, translation) => ({ ...acc, ...translation }), {});

        const outputDir = join(config.root.pathname, ".generated");
        await mkdir(outputDir, { recursive: true });
        await writeFile(
          join(outputDir, "translations.json"),
          JSON.stringify(translations)
        );
        logger.info("Generated");
      }
    }
  };
}
