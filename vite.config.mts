import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solid from 'vite-plugin-solid';

// https://vitejs.dev/config
export default defineConfig({
  base: '/ts-battleship/',
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
  ],
  resolve: {
    alias: { '@': '/src' }
  },
  // https://vitest.dev/config
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    coverage: { all: true, include: ['src/logic/*.{ts,tsx}'] }
  }
});