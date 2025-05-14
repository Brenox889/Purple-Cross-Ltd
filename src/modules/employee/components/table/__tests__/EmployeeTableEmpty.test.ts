import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmployeeTableEmpty from '@/modules/employee/components/table/EmployeeTableEmpty.vue'

describe('EmployeeTableEmpty.vue', () => {
  it('renders empty state message', () => {
    const wrapper = mount(EmployeeTableEmpty)

    expect(wrapper.text()).toContain('No employees found')
    expect(wrapper.text()).toContain('Try adjusting your search or filter criteria')
  })

  it('renders icon svg and correct structure', () => {
    const wrapper = mount(EmployeeTableEmpty)

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)

    const td = wrapper.find('td')
    expect(td.attributes('colspan')).toBe('6')
    expect(td.classes()).toContain('text-center')
  })
})
