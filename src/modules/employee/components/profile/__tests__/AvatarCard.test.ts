import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarCard from '../AvatarCard.vue'

describe('AvatarCard.vue', () => {
  const defaultProps = {
    initials: 'JD',
    fullName: 'John Doe',
    occupation: 'Engineer',
    department: 'Technology',
    isActive: true,
  }

  it('renders all props correctly', () => {
    const wrapper = mount(AvatarCard, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('JD')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Engineer')
    expect(wrapper.text()).toContain('Technology')
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.html()).toContain('bg-green-500') // status dot
    expect(wrapper.html()).toContain('text-green-600') // status text
  })

  it('renders inactive state correctly', () => {
    const wrapper = mount(AvatarCard, {
      props: { ...defaultProps, isActive: false },
    })

    expect(wrapper.text()).toContain('Inactive')
    expect(wrapper.html()).toContain('bg-red-500')
    expect(wrapper.html()).toContain('text-red-600')
  })
})
