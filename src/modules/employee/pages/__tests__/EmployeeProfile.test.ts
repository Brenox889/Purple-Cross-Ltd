import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EmployeeProfileView from '../EmployeeProfile.vue'
import useEmployeeProfile from '@/modules/employee/composables/useEmployeeProfile'

vi.mock('@/modules/employee/composables/useEmployeeProfile')

vi.mock('@/modules/employee/components/profile', () => ({
  ProfileHeader: {
    name: 'ProfileHeader',
    template: '<div data-test="profile-header" @click="$emit(\'save\')" />',
    props: ['isEdit', 'employeeId'],
  },
  AvatarCard: {
    name: 'AvatarCard',
    template: '<div data-test="avatar-card" />',
    props: ['initials', 'fullName', 'occupation', 'department', 'isActive'],
  },
  InfoForm: {
    name: 'InfoForm',
    template: '<div data-test="info-form" />',
    props: ['form', 'isEdit'],
  },
  StatusPanel: {
    name: 'StatusPanel',
    template: '<div data-test="status-panel" />',
    props: ['employment', 'termination', 'formatDate'],
  },
}))

describe('EmployeeProfileView.vue', () => {
  const mockSave = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useEmployeeProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isEditMode: true,
      employeeId: 42,
      form: {
        fullName: 'John Doe',
        occupation: 'Developer',
        department: 'Technology',
        dateOfEmployment: '2022-01-01',
        terminationDate: null,
      },
      initials: 'JD',
      isActive: true,
      formatDate: (date: string) => `formatted: ${date}`,
      save: mockSave,
    })
  })

  it('renders all profile sections', () => {
    const wrapper = mount(EmployeeProfileView)

    expect(wrapper.find('[data-test="profile-header"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="avatar-card"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="info-form"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="status-panel"]').exists()).toBe(true)
  })

  it('calls save method when ProfileHeader emits save', async () => {
    const wrapper = mount(EmployeeProfileView)
    await wrapper.find('[data-test="profile-header"]').trigger('click')
    expect(mockSave).toHaveBeenCalled()
  })
})
