import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://unlimitedcode.mx',
  server: { port: 4321 },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
