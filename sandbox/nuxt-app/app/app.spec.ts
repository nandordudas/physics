import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('app', async () => {
  await setup()

  it('should render', async () => {
    const html = await $fetch('/')
    expect(html).toContain('canvas')
  })
})
