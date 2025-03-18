import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import graphql from '@rollup/plugin-graphql';
import icons from './integrations/icons';

import cloudflare from '@astrojs/cloudflare';

const { OUTPUT } = loadEnv(import.meta.env.MODE, process.cwd(), '');

export default defineConfig({
  trailingSlash: 'always',
  output: OUTPUT,
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  integrations: [icons()],
  vite: {
    plugins: [graphql()]
  },
  env: {
    schema: {
      OUTPUT: envField.enum({
        context: 'client',
        access: 'public',
        values: ['static', 'server'],
        default: 'static'
      }),
      DATOCMS_TOKEN: envField.string({
        context: 'server',
        access: 'secret'
      })
    }
  },
  devToolbar: {
    enabled: false
  },
  prefetch: true
});
