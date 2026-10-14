import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://www.jackpflaherty.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: true,
});
