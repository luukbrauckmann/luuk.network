import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  env: {
    schema: {
      DATOCMS_TOKEN: envField.string({ context: "server", access: "secret" })
    }
  }
});
