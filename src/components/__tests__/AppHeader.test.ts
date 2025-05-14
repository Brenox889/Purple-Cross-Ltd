import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Dummy routes to allow navigation

const routes = [
  {
    path: '/employees',
    name: 'Employees',
    component: { template: '<div>Employees</div>' },
  },
  {
    path: '/employees/new',
    name: 'AddNewEmployee',
    component: { template: '<div>Add New</div>' },
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
describe('AppHeader.vue', () => {
  beforeEach(async () => {
    router.push('/employees') // Set default route
    await router.isReady()
  })

  it('renders title and logo', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Purple')
    expect(wrapper.text()).toContain('Cross Ltd')
  })

  it('renders both navigation buttons', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toContain('Employees')
    expect(buttons[1].text()).toContain('Add')
  })

  it('applies active class based on current route', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const activeBtn = wrapper.find('button.text-white')
    expect(activeBtn.exists()).toBe(true)
    expect(activeBtn.text()).toContain('Employees')
  })

  it('does not navigate if already on the same route', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const pushSpy = vi.spyOn(router, 'push')
    const currentRouteBtn = wrapper.find('button.text-white')
    await currentRouteBtn.trigger('click')

    expect(pushSpy).not.toHaveBeenCalled()
  })
})
