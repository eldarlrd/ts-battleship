/// <reference types='vitest/config' />
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solid from 'vite-plugin-solid';

// https://vite.dev/config
export default defineConfig({
  base: '/ts-battleship/',
  resolve: { alias: { '@': '/src', '#': '/src/assets' } },
  plugins: [
    solid(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: false,
      injectRegister: null,
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.{html,css,js,png,opus,woff2,webmanifest}']
      }
    })
  ]
});
