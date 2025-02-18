import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'

export default ({ app }: { app: App }) => {
  const i18n = createI18n({
    locale: 'pt-BR',
    legacy: false,
    messages,
  })

  app.use(i18n)
}
