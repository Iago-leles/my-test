import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import AppCarousel from '@/components/ui/AppCarousel.vue'

describe('AppCarousel', () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']

  it('should match snapshot', () => {
    const wrapper = mount(AppCarousel, {
      props: { images },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show counter when showCounter prop is true', () => {
    const wrapper = mount(AppCarousel, {
      props: {
        images,
        showCounter: true,
      },
    })

    expect(wrapper.find('.counter').exists()).toBe(true)
    expect(wrapper.find('.counter').text()).toBe('1 / 3')
  })

  it('should not show counter when showCounter prop is false', () => {
    const wrapper = mount(AppCarousel, {
      props: {
        images,
        showCounter: false,
      },
    })

    expect(wrapper.find('.counter').exists()).toBe(false)
  })

  it('should apply full rounded style when fullRounded prop is true', () => {
    const wrapper = mount(AppCarousel, {
      props: {
        images,
        fullRounded: true,
      },
    })

    expect(wrapper.find('.carousel-card').attributes('style')).toContain('border-radius: 14px')
  })
})
