import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import AppSelect from '@/components/ui/AppSelect.vue'

describe('AppSelect', () => {
  const options = [
    { label: 'Opção 1', value: 1 },
    { label: 'Opção 2', value: 2 },
    { label: 'Opção 3', value: 3 },
  ]

  it('should match snapshot', () => {
    const wrapper = mount(AppSelect, {
      props: {
        modelValue: null,
        label: 'Test Select',
        options,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show required asterisk when required prop is true', () => {
    const wrapper = mount(AppSelect, {
      props: {
        modelValue: null,
        label: 'Test Select',
        options,
        required: true,
      },
    })

    expect(wrapper.find('.text-red-5').exists()).toBe(true)
  })

  it('should emit update:modelValue when option is selected', async () => {
    const wrapper = mount(AppSelect, {
      props: {
        modelValue: null,
        label: 'Test Select',
        options,
      },
    })

    await wrapper.findComponent({ name: 'q-select' }).vm.$emit('update:modelValue', options[0])

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([options[0]])
  })

  it('should filter options based on input', async () => {
    const wrapper = mount(AppSelect, {
      props: {
        modelValue: null,
        label: 'Test Select',
        options,
      },
    })

    const qSelect = wrapper.findComponent({ name: 'q-select' })
    await qSelect.vm.$emit('filter', 'Opção 1', (cb: any) => cb())
    await flushPromises()

    const vm = wrapper.vm as any
    expect(vm.filteredOptions).toHaveLength(1)
    expect(vm.filteredOptions[0].label).toBe('Opção 1')
  })
})
