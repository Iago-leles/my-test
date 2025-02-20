import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useHotelStore } from '@/stores/useHotelStore'

import OrderFilter from '@/components/Hotel/OrderFilter.vue'

describe('OrderFilter', () => {
  it('should render correctly', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(OrderFilter, {
      global: {
        plugins: [pinia],
      },
    })

    await flushPromises()

    const select = wrapper.findComponent({ name: 'QSelect' })

    expect(select.props('options')).toEqual(expect.any(Array))
  })

  it('should update the model when an option is selected', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(OrderFilter, {
      global: {
        plugins: [pinia],
      },
    })

    const select = wrapper.findComponent({ name: 'QSelect' })
    await select.setValue('Preço')

    const hotelStore = useHotelStore(pinia)
    expect(hotelStore.orderBy).toBe('Preço')
  })
})
