import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { formatDate } from '@/modules/employee/composables/useEmployeeHelpers'
import type { Employee } from '@/modules/employee/types/employee.types'
import { EmployeeTableRow } from '..'

const base: Employee = {
  id: 1,
  code: 'EMP001',
  fullName: 'Alice Johnson',
  occupation: 'Analyst',
  department: 'Finance',
  employmentDate: '2021-06-14', // any ISO string; test derives display via helper
  terminationDate: null,
}

describe('EmployeeTableRow.vue', () => {
  it('renders all main fields', () => {
    const wrapper = mount(EmployeeTableRow, { props: { employee: base } })

    expect(wrapper.text()).toContain(base.fullName)
    expect(wrapper.text()).toContain(base.occupation)
    expect(wrapper.text()).toContain(base.department)
    expect(wrapper.text()).toContain(formatDate(base.employmentDate))
  })

  it('emits "delete" on delete button click', async () => {
    const wrapper = mount(EmployeeTableRow, { props: { employee: base } })
    await wrapper.find('button[title="Delete employee"]').trigger('click')
    expect(wrapper.emitted('delete')![0]).toEqual([base])
  })

  it('renders termination date when present', () => {
    const terminated: Employee = {
      ...base,
      terminationDate: '2022-12-31',
    }

    const wrapper = mount(EmployeeTableRow, { props: { employee: terminated } })
    expect(wrapper.text()).toContain(formatDate(terminated.terminationDate!))
  })
})
