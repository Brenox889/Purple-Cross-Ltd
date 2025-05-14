import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EmployeePagination from '@/modules/employee/components/EmployeePagination.vue'

// ─── util ───────────────────────────────────────────────────────────────────────
const factory = (model = 1, total = 5) =>
  mount(EmployeePagination, {
    props: {
      modelValue: model,
      totalPages: total,
    },
  })

const findBtnByText = (wrapper: ReturnType<typeof factory>, text: string) =>
  wrapper.findAll('button').find((b) => b.text().trim() === text)!

// ─── tests ─────────────────────────────────────────────────────────────────────
describe('EmployeePagination.vue', () => {
  it('disables "Previous" on the first page', () => {
    const wrapper = factory(1, 5)
    const prev = findBtnByText(wrapper, 'Previous')
    expect(prev.attributes('disabled')).toBeDefined()
  })

  it('disables "Next" on the last page', () => {
    const wrapper = factory(5, 5)
    const next = findBtnByText(wrapper, 'Next')
    expect(next.attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue when "Next" is clicked', async () => {
    const wrapper = factory(2, 5)
    const next = findBtnByText(wrapper, 'Next')
    await next.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([3]) // 2 ➔ 3
  })

  it('emits update:modelValue when a page number is clicked', async () => {
    const wrapper = factory(2, 5)
    const page4 = findBtnByText(wrapper, '4')
    await page4.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([4])
  })
})
