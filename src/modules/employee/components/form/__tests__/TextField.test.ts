import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextField from '../TextField.vue'

describe('TextField.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: '',
        label: 'Full Name',
      },
    })

    expect(wrapper.text()).toContain('Full Name')
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: '',
        label: 'Full Name',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Jane Doe')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['Jane Doe'])
  })

  it('displays the error message when error is provided', () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: '',
        label: 'Full Name',
        error: 'This field is required',
      },
    })

    expect(wrapper.text()).toContain('This field is required')
  })

  it('renders icon slot content', () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: '',
        label: 'With Icon',
      },
      slots: {
        icon: '<span class="icon-slot">ICON</span>',
      },
    })

    expect(wrapper.find('.icon-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('ICON')
  })
})
