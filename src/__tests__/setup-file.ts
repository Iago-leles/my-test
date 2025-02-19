import { config } from '@vue/test-utils'
import { Quasar } from 'quasar'
import { vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Configuração global para Vue Test Utils
config.global.plugins = [Quasar]

// Configuração do Pinia para testes
beforeEach(() => {
  setActivePinia(createPinia())
})

// Mock global para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
