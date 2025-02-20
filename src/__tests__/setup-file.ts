import { config } from '@vue/test-utils'
import { Quasar } from 'quasar'
import { vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

config.global.plugins = [Quasar]

beforeEach(() => {
  setActivePinia(createPinia())
})

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

config.global.mocks = {
  $t: (key: string) => key,
}
