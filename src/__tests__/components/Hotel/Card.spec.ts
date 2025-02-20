import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useHotelStore } from '@/stores/useHotelStore'

import type { Hotel } from '@/types'

import HotelCard from '@/components/Hotel/Card.vue'

describe('HotelCard', () => {
  it('should match snapshot', () => {
    const hotel = {
      id: 1,
      name: 'Hotel Test',
      address: { fullAddress: '123 Test St' },
      stars: 4.5,
      price: 100,
      amenities: [],
      images: [],
      hasRefundableRoom: true,
    }

    const wrapper = mount(HotelCard, {
      props: { hotel: hotel as unknown as Hotel },
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

  it('should set selected hotel on click', async () => {
    const hotel = {
      id: 1,
      name: 'Hotel Test',
      address: { fullAddress: '123 Test St' },
      stars: 4.5,
      price: 100,
      amenities: [],
      images: [],
      hasRefundableRoom: true,
    }

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(HotelCard, {
      props: { hotel: hotel as unknown as Hotel },
      global: {
        plugins: [pinia],
      },
    })

    await wrapper.find('[data-testid="hotel-card"]').trigger('click')

    await flushPromises()

    const hotelStore = useHotelStore(pinia)
    expect(hotelStore.selectedHotel).toEqual(hotel)
  })

  it('should render amenities', () => {
    const hotel = {
      id: 1,
      name: 'Hotel Test',
      address: { fullAddress: '123 Test St' },
      stars: 4.5,
      price: 100,
      amenities: [
        {
          key: 'WI_FI',
          label: 'Internet',
        },
        {
          key: 'RESTAURANT',
          label: 'Restaurante',
        },
        {
          key: 'ROOM_SERVICE',
          label: 'Serviço de quarto',
        },
      ],
      images: [],
      hasRefundableRoom: true,
    }

    const wrapper = mount(HotelCard, {
      props: { hotel: hotel as unknown as Hotel },
    })

    expect(wrapper.findAll('[data-testid="hotel-amenity"]')).toHaveLength(3)
  })
})
