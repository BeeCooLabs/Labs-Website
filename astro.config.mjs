// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Final public domain. Drives canonical URLs, sitemap.xml and absolute OG/Twitter image URLs.
// If the production domain changes, update this single value.
export default defineConfig({
  site: 'https://beecoolabs.com',
  output: 'static',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
