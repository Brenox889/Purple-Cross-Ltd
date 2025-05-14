// src/modules/employee/components/form/__tests__/DateField.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateField from '../DateField.vue'

describe('DateField.vue', () => {
  it('renders the label and value correctly', () => {
    const wrapper = mount(DateField, {
      props: {
        modelValue: '2024-01-01',
        label: 'Start Date',
      },
    })

    expect(wrapper.text()).toContain('Start Date')
    const input = wrapper.find('input[type="date"]')
    expect((input.element as HTMLInputElement).value).toBe('2024-01-01')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(DateField, {
      props: {
        modelValue: '',
        label: 'Start Date',
      },
    })

    const input = wrapper.find('input[type="date"]')
    await input.setValue('2025-05-14')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['2025-05-14'])
  })

  it('displays error message when error prop is passed', () => {
    const wrapper = mount(DateField, {
      props: {
        modelValue: '',
        label: 'Start Date',
        error: 'Field is required',
      },
    })

    expect(wrapper.text()).toContain('Field is required')
    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-red-300')
  })
})
