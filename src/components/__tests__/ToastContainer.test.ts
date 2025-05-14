import { it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastContainer from '@/components/common/toast/ToastContainer.vue'
import { toasts } from '@/composables/useShowResponseMessage'

// Reset the toast state before each test
beforeEach(() => {
  toasts.value.splice(0)
})

it('renders a list of toast messages', () => {
  toasts.value.push({ message: 'Success!', type: 'success' }, { message: 'Error!', type: 'error' })

  const wrapper = mount(ToastContainer)

  const toastComponents = wrapper.findAllComponents({ name: 'ToastMessage' })
  expect(toastComponents).toHaveLength(2)

  expect(toastComponents[0].props()).toMatchObject({
    message: 'Success!',
    type: 'success',
  })

  expect(toastComponents[1].props()).toMatchObject({
    message: 'Error!',
    type: 'error',
  })
})
