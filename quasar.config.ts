import { defineConfig } from '#q-app/wrappers'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineConfig(() => {
  return {
    boot: ['i18n'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      alias: {
        '@': path.resolve(__dirname, './src'),
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: 'hash',
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],

      chainWebpack: (chain: any) => {
        chain.module
          .rule('i18n-resource')
          .test(/\.(json5?|ya?ml)$/)
          .include.add(fileURLToPath(new URL('./src/i18n', import.meta.url)))
          .end()
          .type('typescript/auto')
          .use('i18n-resource')
          .loader('@intlify/vue-i18n-loader')

        chain.module
          .rule('i18n')
          .resourceQuery(/blockType=i18n/)
          .type('typescript/auto')
          .use('i18n')
          .loader('@intlify/vue-i18n-loader')
      },
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: ['Screen'],
    },

    animations: [],
    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'onfly',
      },
    },

    bex: {
      extraScripts: [],
    },
  }
})
