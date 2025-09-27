import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { executeQuery } from "@datocms/cda-client";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import query from "./AllTranslations.query.graphql?raw";
import type { AllTranslationsQuery, AllTranslationsQueryVariables, SiteLocale } from "@generated/datocms";

const { DATOCMS_TOKEN } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default function translations(): AstroIntegration {
  return {
    name: "datocms",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        if (config.i18n) {
          const translations = (await Promise.all(
            config.i18n.locales.map(async (locale) => {
              if (typeof locale === 'string') {
                const { allTranslations } = await executeQuery<AllTranslationsQuery, AllTranslationsQueryVariables>(
                  query,
                  {
                    token: DATOCMS_TOKEN,
                    variables: {
                      locale: locale as SiteLocale
                    }
                  }
                );

                return { [locale]: allTranslations.reduce((acc, { key, value }) => ({ ...acc, [key as string]: value }), {}) }
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
        } else {
          logger.error("Locales are not set");
        }
      }
    }
  };
}
