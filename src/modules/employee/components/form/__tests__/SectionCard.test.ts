// src/modules/employee/components/form/__tests__/SectionCard.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionCard from '../SectionCard.vue'

describe('SectionCard.vue', () => {
  it('renders the provided title', () => {
    const wrapper = mount(SectionCard, {
      props: { title: 'Test Title' },
    })

    expect(wrapper.text()).toContain('Test Title')
  })

  it('renders default slot content', () => {
    const wrapper = mount(SectionCard, {
      props: { title: 'Section' },
      slots: {
        default: '<p class="slot-content">Some content here</p>',
      },
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Some content here')
  })
})
