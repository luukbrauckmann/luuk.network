import type { AstroIntegration, AstroUserConfig } from 'astro';
// import { buildClient } from '@datocms/cma-client-node';

// const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN });

export default function (): AstroIntegration {
  return {
    name: "i18n",
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          i18n: {
            defaultLocale: "en",
            locales: ["en", "nl"],
            routing: {
              prefixDefaultLocale: true
            }
          },
        })
      }
    }
  }
};
