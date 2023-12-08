import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config
export default defineConfig({
  base: '/ts-battleship/',
  plugins: [solid()],
  resolve: {
    alias: { '@': '/src' }
  }
});