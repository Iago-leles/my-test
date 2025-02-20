import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages,
  legacy: false,
  globalInjection: true,
})

export default boot(({ app, router }) => {
  app.use(i18n)

  router.beforeEach((to, from, next) => {
    const supportedLocales = ['pt-BR', 'en', 'es']

    const locale = to.path.split('/')[1] || 'pt-BR'

    if (supportedLocales.includes(locale)) {
      i18n.global.locale.value = locale as 'pt-BR' | 'en' | 'es'
      next()
    } else {
      const redirectPath = `/${i18n.global.locale.value}${to.path}`
      next(redirectPath)
    }
  })
})

export { i18n }
