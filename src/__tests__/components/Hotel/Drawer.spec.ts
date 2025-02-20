import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useHotelStore } from '@/stores/useHotelStore'

import Drawer from '@/components/Hotel/Drawer.vue'
import type { Hotel } from 'src/types'

describe('Drawer', () => {
  it('should match snapshot', async () => {
    const hotel = {
      id: 1,
      name: 'Hotel Test',
      address: { fullAddress: '123 Test St' },
      stars: 4.5,
      price: 100,
      amenities: [],
      images: [],
      hasRefundableRoom: true,
      description: 'Descrição do hotel',
    }

    const wrapper = mount(Drawer, {
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

    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set selected hotel to null on hide', () => {
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
          key: 'POOL',
          label: 'Piscina',
        },
        {
          key: 'PARKING',
          label: 'Estacionamento',
        },
        {
          key: 'RESTAURANT',
          label: 'Restaurante',
        },
      ],
      images: [],
      hasRefundableRoom: true,
      description: 'Descrição do hotel',
    }

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const wrapper = mount(Drawer, {
      props: { hotel: hotel as unknown as Hotel },
      global: {
        plugins: [pinia],
      },
    })

    wrapper.vm.$emit('hide')

    const hotelStore = useHotelStore(pinia)
    expect(hotelStore.selectedHotel).toBeNull()
  })
})
