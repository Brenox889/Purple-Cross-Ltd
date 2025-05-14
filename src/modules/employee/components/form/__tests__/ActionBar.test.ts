import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionBar from '@/modules/employee/components/form/ActionBar.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'home', component: { template: '<div />' } }],
})

describe('ActionBar.vue', () => {
  it('renders "Save" when isEditing is false', () => {
    const wrapper = mount(ActionBar, {
      global: {
        plugins: [router],
      },
      props: {
        isEditing: false,
      },
    })
    expect(wrapper.text()).toContain('Save')
  })

  it('renders "Update" when isEditing is true', () => {
    const wrapper = mount(ActionBar, {
      global: {
        plugins: [router],
      },
      props: {
        isEditing: true,
      },
    })
    expect(wrapper.text()).toContain('Update')
  })

  it('emits submit when the action button is clicked', async () => {
    const wrapper = mount(ActionBar, {
      global: {
        plugins: [router],
      },
      props: {
        isEditing: false,
      },
    })

    const button = wrapper.find('button:last-of-type')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted('submit')?.length).toBe(1)
  })

  it('navigates to home on cancel click', async () => {
    router.push = vi.fn()

    const wrapper = mount(ActionBar, {
      global: {
        plugins: [router],
      },
      props: {
        isEditing: false,
      },
    })

    const cancelButton = wrapper.find('button:first-of-type')
    await cancelButton.trigger('click')

    expect(router.push).toHaveBeenCalledWith('/')
  })
})
