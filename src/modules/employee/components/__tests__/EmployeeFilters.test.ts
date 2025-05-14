import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import EmployeeFilters from '@/modules/employee/components/EmployeeFilters.vue'

// ─── Stubs ──────────────────────────────────────────────────────────────────────
vi.mock('@/components/common/IconComponent.vue', () => ({
  default: { name: 'IconComponent', template: '<svg />' },
}))

const factory = (props = {}) =>
  mount(EmployeeFilters, {
    props: {
      searchQuery: '',
      departmentFilter: '',
      ...props,
    },
  })

// ─── Tests ─────────────────────────────────────────────────────────────────────
describe('EmployeeFilters.vue', () => {
  it('renders search input and department select', () => {
    const wrapper = factory()

    expect(wrapper.find('#search').exists()).toBe(true)
    expect(wrapper.find('#department-filter').exists()).toBe(true)
  })

  it('emits update:searchQuery when typing', async () => {
    const wrapper = factory()
    const input = wrapper.get('#search')

    await input.setValue('John')
    const emitted = wrapper.emitted('update:searchQuery')

    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['John'])
  })

  it('emits update:departmentFilter when selecting option', async () => {
    const wrapper = factory()
    const select = wrapper.get('#department-filter')

    await select.setValue('Technology')
    const emitted = wrapper.emitted('update:departmentFilter')

    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Technology'])
  })
})
