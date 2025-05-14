import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusPanel from '../StatusPanel.vue'

describe('StatusPanel.vue', () => {
  const formatDate = (d: string | null | undefined) => (d ? `Formatted(${d})` : '-')

  it('renders employment and termination date correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        employment: '2023-01-01',
        termination: '2024-01-01',
        formatDate,
      },
    })

    expect(wrapper.text()).toContain('Formatted(2023-01-01)')
    expect(wrapper.text()).toContain('Formatted(2024-01-01)')
    expect(wrapper.text()).not.toContain('Currently Active')
  })

  it('renders status as active if no termination date is provided', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        employment: '2022-06-01',
        termination: null,
        formatDate,
      },
    })

    expect(wrapper.text()).toContain('Formatted(2022-06-01)')
    expect(wrapper.text()).toContain('Currently Active')
  })
})
