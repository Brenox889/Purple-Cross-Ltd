import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormHeader from '../FormHeader.vue'

describe('FormHeader.vue', () => {
  it('renders "Edit Employee" when isEditing is true', () => {
    const wrapper = mount(FormHeader, {
      props: { isEditing: true },
    })

    expect(wrapper.text()).toContain('Edit Employee')
  })

  it('renders "New Employee" when isEditing is false', () => {
    const wrapper = mount(FormHeader, {
      props: { isEditing: false },
    })

    expect(wrapper.text()).toContain('New Employee')
  })

  it('renders the icon slot', () => {
    const wrapper = mount(FormHeader, {
      props: { isEditing: true },
      slots: {
        icon: '<span class="test-icon">[icon]</span>',
      },
    })

    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })
})
