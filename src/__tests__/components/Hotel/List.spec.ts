import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useHotelStore } from '@/stores/useHotelStore'

import HotelList from '@/components/Hotel/List.vue'

describe('HotelList', () => {
  it('should match snapshot', () => {
    const wrapper = mount(HotelList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            fakeApp: true,
          }),
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render no hotels message', async () => {
    const wrapper = mount(HotelList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              useHotelStore: {
                displayedHotels: [],
                isLoading: false,
                selectedHotel: null,
              },
            },
          }),
        ],
      },
    })

    useHotelStore().setFilterName('I do not exist')

    await flushPromises()

    expect(wrapper.text()).toContain('hotels.list.no_hotels')
  })
})
