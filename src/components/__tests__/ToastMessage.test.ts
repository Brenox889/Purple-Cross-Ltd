import { mount } from '@vue/test-utils'
import ToastMessage from '@/components/common/toast/ToastMessage.vue'
import { describe, expect, it } from 'vitest'

describe('ToastMessage.vue', () => {
  it('renders a success toast correctly', () => {
    const wrapper = mount(ToastMessage, {
      props: {
        message: 'Employee created!',
        type: 'success',
      },
    })

    expect(wrapper.text()).toContain('Success!')
    expect(wrapper.text()).toContain('Employee created!')
    expect(wrapper.find('.bg-green-500').exists()).toBe(true)
    expect(wrapper.find('.border-green-500').exists()).toBe(true)
  })

  it('renders an error toast correctly', () => {
    const wrapper = mount(ToastMessage, {
      props: {
        message: 'Something went wrong.',
        type: 'error',
      },
    })

    expect(wrapper.text()).toContain('Error!')
    expect(wrapper.text()).toContain('Something went wrong.')
    expect(wrapper.find('.bg-red-500').exists()).toBe(true)
    expect(wrapper.find('.border-red-500').exists()).toBe(true)
  })
})
