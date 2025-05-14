import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoForm from '../InfoForm.vue'

const mockForm = {
  fullName: 'Alice Smith',
  occupation: 'Designer',
  department: 'Marketing',
  dateOfEmployment: '2023-01-01',
  terminationDate: '2024-01-01',
}

describe('InfoForm.vue', () => {
  it('renders all fields with correct initial values', () => {
    const wrapper = mount(InfoForm, {
      props: {
        form: mockForm,
        isEdit: true,
      },
    })

    const inputs = wrapper.findAll('input')

    expect((inputs[0].element as HTMLInputElement).value).toBe('Alice Smith')
    expect((inputs[1].element as HTMLInputElement).value).toBe('Designer')
    expect((inputs[2].element as HTMLInputElement).value).toBe('Marketing')
    expect((inputs[3].element as HTMLInputElement).value).toBe('2023-01-01')
    expect((inputs[4].element as HTMLInputElement).value).toBe('2024-01-01')
  })

  it('emits updated form when fullName changes', async () => {
    const wrapper = mount(InfoForm, {
      props: {
        form: mockForm,
        isEdit: true,
      },
    })

    const fullNameInput = wrapper.find('input')

    await fullNameInput.setValue('Bob Johnson')

    const emitted = wrapper.emitted('update:form') as Array<[typeof mockForm]>
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].fullName).toBe('Bob Johnson')
  })
})
