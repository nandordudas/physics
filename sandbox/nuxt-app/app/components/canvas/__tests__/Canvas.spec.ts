import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Canvas from '~/components/canvas/Canvas.vue'

describe('canvas', () => {
  it('should render component', () => {
    const width = 800
    const height = 450
    const component = mount(Canvas, {
      props: {
        width,
        height,
      },
    })
    const canvas = component.find('canvas')
    expect(canvas.element.width).toBe(width)
    expect(canvas.element.height).toBe(height)
  })
})
