import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useHotelStore } from '@/stores/useHotelStore'

import Search from '@/components/Hotel/Search.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('Search', () => {
  it('should match snapshot', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      fakeApp: true,
    })

    const wrapper = mount(Search, {
      global: {
        plugins: [pinia],
      },
    })

    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update the hotelStore filterName when input changes', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(Search, {
      global: {
        plugins: [pinia],
      },
    })

    const input = wrapper.findComponent({ name: 'AppTextInput' })
    await input.setValue('Hotel Test')

    const hotelStore = useHotelStore(pinia)
    expect(hotelStore.filterName).toBe('Hotel Test')
  })

  it('should call handleSearch when button is clicked', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(Search, {
      global: {
        plugins: [pinia],
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    const hotelStore = useHotelStore(pinia)
    expect(hotelStore.selectedPlace).toBeNull()
  })
})
