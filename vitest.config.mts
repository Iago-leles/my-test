import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'src/__tests__/setup-file.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    vue({ template: { transformAssetUrls } }) as any,
    quasar({ sassVariables: 'src/css/quasar.variables.scss' }) as any,
    tsconfigPaths(),
  ],
})
