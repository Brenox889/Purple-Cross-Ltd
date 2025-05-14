import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useEmployeeStore } from '@/store/employees'
import EmployeeTable from '@/modules/employee/components/table/EmployeeTable.vue'

describe('EmployeeTable.vue', () => {
  let pinia: ReturnType<typeof createTestingPinia>
  let store: ReturnType<typeof useEmployeeStore>

  beforeEach(() => {
    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    store = useEmployeeStore(pinia)
    store.employees = [
      {
        id: 1,
        code: 'EMP001',
        fullName: 'Jane Doe',
        occupation: 'Engineer',
        department: 'Tech',
        dateOfEmployment: '2021-01-01',
        terminationDate: null,
      },
    ]
  })

  const factory = () =>
    mount(EmployeeTable, {
      global: {
        plugins: [pinia],
        stubs: { RouterLink: true },
      },
    })

  it('renders employee data', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('Engineer')
    expect(wrapper.text()).toContain('Tech')
  })

  it('toggles sort direction on column header click', async () => {
    const wrapper = factory()
    const header = wrapper.find('thead th')

    expect(header.html()).toMatch(/arrow-up|M5 15l7-7 7 7/)
    await header.trigger('click')
    expect(header.html()).toMatch(/arrow-down|M19 9l-7 7-7-7/)
  })
})
