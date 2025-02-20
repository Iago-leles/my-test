import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import IndexPage from '@/pages/IndexPage.vue'

describe('IndexPage.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(IndexPage)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
