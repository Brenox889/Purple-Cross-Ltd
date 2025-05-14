import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import EmployeeManagementView from '../EmployeeList.vue'

// mock do componente interno para evitar renderizar tudo
vi.mock('@/modules/employee/components/table/EmployeeTable.vue', () => ({
  default: {
    name: 'EmployeeTable',
    template: '<div data-test="employee-table" />',
  },
}))

describe('EmployeeManagementView.vue', () => {
  it('renders page title correctly', () => {
    const wrapper = mount(EmployeeManagementView)
    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Employee Management')
    expect(title.classes()).toContain('text-center') // mobile
    expect(title.classes()).toContain('sm:text-left') // desktop override
  })

  it('renders EmployeeTable component', () => {
    const wrapper = mount(EmployeeManagementView)
    expect(wrapper.find('[data-test="employee-table"]').exists()).toBe(true)
  })
})
