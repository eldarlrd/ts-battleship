import viteConfig from './vite.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

// https://vitest.dev/config
export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    coverage: { include: ['src/logic/*.{ts,tsx}'] }
  }
}));
