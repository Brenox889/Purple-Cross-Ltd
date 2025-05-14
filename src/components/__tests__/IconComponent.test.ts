import { mount } from '@vue/test-utils'
import IconComponent from '../common/IconComponent.vue'
import { describe, expect, it } from 'vitest'

describe('IconComponent.vue', () => {
  it('renders an image with given src and alt', () => {
    const wrapper = mount(IconComponent, {
      props: {
        src: '/icon.svg',
        alt: 'Example Icon',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/icon.svg')
    expect(img.attributes('alt')).toBe('Example Icon')
  })

  it('applies default size classes when no size is provided', () => {
    const wrapper = mount(IconComponent, {
      props: {
        src: '/icon.svg',
      },
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-5')
    expect(img.classes()).toContain('h-5')
  })

  it('applies the correct size class when size is passed', () => {
    const wrapper = mount(IconComponent, {
      props: {
        src: '/icon.svg',
        size: '6',
      },
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-6')
    expect(img.classes()).toContain('h-6')
  })

  it('uses custom classes when provided', () => {
    const wrapper = mount(IconComponent, {
      props: {
        src: '/icon.svg',
        class: 'rounded-md shadow-sm',
      },
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('rounded-md')
    expect(img.classes()).toContain('shadow-sm')
  })
})
