import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import NotFoundPage from '@/pages/ErrorNotFound.vue'

describe('NotFoundPage.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(NotFoundPage)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
