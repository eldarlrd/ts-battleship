import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config
export default defineConfig({
  base: '/ts-battleship/',
  plugins: [solid()],
  resolve: {
    alias: { '@': '/src' }
  },
  // https://vitest.dev/config
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    coverage: { all: true, include: ['src/**/*.{ts,tsx}'] }
  }
});