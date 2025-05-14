import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectField from '../SelectField.vue'

describe('SelectField.vue', () => {
  it('renders the label correctly', () => {
    const wrapper = mount(SelectField, {
      props: {
        modelValue: '',
        label: 'Department',
      },
    })

    expect(wrapper.text()).toContain('Department')
  })

  it('renders the slot options', () => {
    const wrapper = mount(SelectField, {
      props: {
        modelValue: '',
        label: 'Department',
      },
      slots: {
        options: `
          <option value="Tech">Tech</option>
          <option value="HR">HR</option>
        `,
      },
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(2)
    expect(options[0].text()).toBe('Tech')
    expect(options[1].text()).toBe('HR')
  })

  it('emits update:modelValue on selection change', async () => {
    const wrapper = mount(SelectField, {
      props: {
        modelValue: '',
        label: 'Department',
      },
      slots: {
        options: `
          <option value="">Select</option>
          <option value="Tech">Tech</option>
        `,
      },
    })

    const select = wrapper.find('select')
    await select.setValue('Tech')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['Tech'])
  })

  it('displays error message when error prop is provided', () => {
    const wrapper = mount(SelectField, {
      props: {
        modelValue: '',
        label: 'Department',
        error: 'Required field',
      },
    })

    expect(wrapper.text()).toContain('Required field')
  })
})
