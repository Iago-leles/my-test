import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import AppTextInput from '@/components/ui/AppTextInput.vue'

describe('AppTextInput', () => {
  it('should match snapshot', () => {
    const wrapper = mount(AppTextInput, {
      props: {
        label: 'Test Input',
        required: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show required asterisk when required prop is true', () => {
    const wrapper = mount(AppTextInput, {
      props: {
        label: 'Test Input',
        required: true,
      },
    })

    expect(wrapper.find('.text-red-5').exists()).toBe(true)
  })

  it('should not show required asterisk when required prop is false', () => {
    const wrapper = mount(AppTextInput, {
      props: {
        label: 'Test Input',
        required: false,
      },
    })

    expect(wrapper.find('.text-red-5').exists()).toBe(false)
  })

  it('should update model value when input changes', async () => {
    const wrapper = mount(AppTextInput, {
      props: {
        label: 'Test Input',
        required: false,
      },
    })

    const input = wrapper.findComponent({ name: 'q-input' })
    await input.setValue('test value')

    expect((wrapper.vm as any).model).toBe('test value')
  })

  it('should display correct label', () => {
    const wrapper = mount(AppTextInput, {
      props: {
        label: 'Test Label',
        required: false,
      },
    })

    expect(wrapper.find('.text-subtitle1').text()).toContain('Test Label')
  })
})
