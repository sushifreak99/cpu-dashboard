import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [EnvironmentPlugin(['VERSION'])],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
})
