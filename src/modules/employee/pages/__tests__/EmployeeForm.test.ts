import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EmployeeForm from '../EmployeeForm.vue'
import useEmployeeForm from '@/modules/employee/composables/useEmployeeForm'

// mock do composable
vi.mock('@/modules/employee/composables/useEmployeeForm')

describe('EmployeeForm.vue', () => {
  const mockSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useEmployeeForm as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isEditing: false,
      fullName: '',
      occupation: '',
      department: '',
      dateOfEmployment: '',
      terminationDate: '',
      departments: ['Technology', 'HR'],
      errors: {},
      submit: mockSubmit,
    })
  })

  it('calls submit when ActionBar emits submit', async () => {
    const wrapper = mount(EmployeeForm)
    wrapper.findComponent({ name: 'ActionBar' }).vm.$emit('submit')
    expect(mockSubmit).toHaveBeenCalled()
  })

  it('renders required asterisks on required fields', () => {
    const wrapper = mount(EmployeeForm)
    const asterisks = wrapper.findAll('span.text-red-500')
    expect(asterisks.length).toBeGreaterThanOrEqual(3)
  })
})
