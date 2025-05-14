import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EmployeeForm from '@/modules/employee/pages/EmployeeForm.vue'
import useEmployeeForm from '@/modules/employee/composables/useEmployeeForm'

// ─── mocks ──────────────────────────────────────────────────────────────────────
vi.mock('@/modules/employee/composables/useEmployeeForm')

// evita warn do vue-router em ActionBar
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({ history: createWebHistory(), routes: [] })

describe('EmployeeForm.vue', () => {
  const submitSpy = vi.fn()

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
      submit: submitSpy,
    })
  })

  const factory = () =>
    mount(EmployeeForm, {
      global: {
        plugins: [router],
        stubs: ['RouterLink'],
      },
    })

  it('renders all main sections', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Personal Information')
    expect(wrapper.text()).toContain('Professional Information')
    expect(wrapper.text()).toContain('Dates')
  })

  it('calls submit on Enter key', async () => {
    const wrapper = factory()
    await wrapper.find('div.p-6').trigger('keyup.enter')
    expect(submitSpy).toHaveBeenCalled()
  })

  it('calls submit when ActionBar emits', async () => {
    const wrapper = factory()
    wrapper.findComponent({ name: 'ActionBar' }).vm.$emit('submit')
    expect(submitSpy).toHaveBeenCalled()
  })

  it('shows red asterisks on required fields', () => {
    const wrapper = factory()
    expect(wrapper.findAll('span.text-red-500').length).toBeGreaterThanOrEqual(3)
  })
})
