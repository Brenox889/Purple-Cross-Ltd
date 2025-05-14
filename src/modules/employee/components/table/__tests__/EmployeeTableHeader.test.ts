import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EmployeeTableHeader from '@/modules/employee/components/table/EmployeeTableHeader.vue'

describe('EmployeeTableHeader.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(EmployeeTableHeader, {
      props: {
        label: 'Occupation',
        column: 'occupation',
        sortColumn: 'fullName',
        sortDirection: 'asc',
      },
    })

    expect(wrapper.text()).toContain('Occupation')
  })

  it('emits sort event on click', async () => {
    const emitSpy = vi.fn()
    const wrapper = mount(EmployeeTableHeader, {
      props: {
        label: 'Full Name',
        column: 'fullName',
        sortColumn: '',
        sortDirection: 'asc',
      },
      attrs: {
        onSort: emitSpy,
      },
    })

    await wrapper.trigger('click')

    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith('fullName')
  })

  it('shows ascending icon when sortDirection is asc and column matches', () => {
    const wrapper = mount(EmployeeTableHeader, {
      props: {
        label: 'Department',
        column: 'department',
        sortColumn: 'department',
        sortDirection: 'asc',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.html()).toMatch(/M5 15l7-7 7 7/)
  })

  it('shows descending icon when sortDirection is desc and column matches', () => {
    const wrapper = mount(EmployeeTableHeader, {
      props: {
        label: 'Department',
        column: 'department',
        sortColumn: 'department',
        sortDirection: 'desc',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.html()).toMatch(/M19 9l-7 7-7-7/)
  })
})
