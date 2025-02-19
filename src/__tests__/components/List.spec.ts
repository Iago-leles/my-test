import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'

import HotelList from '@/components/Hotel/List.vue'

describe('HotelList', () => {
  it('should match snapshot', () => {
    const wrapper = mount(HotelList)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
