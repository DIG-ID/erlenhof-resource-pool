// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import 'dotenv/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
  vite: {
      plugins: [tailwindcss()],
      build: {
        sourcemap: true,
      },
    },
});