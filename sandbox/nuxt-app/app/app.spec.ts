import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { consola } from 'consola'
import { beforeAll, describe, expect, it } from 'vitest'

describe('app', async () => {
  await setup()

  beforeAll(() => {
    consola.wrapAll()
  })

  it('should render', async () => {
    const html = await $fetch('/')
    expect(html).toContain('canvas')
  })
})
