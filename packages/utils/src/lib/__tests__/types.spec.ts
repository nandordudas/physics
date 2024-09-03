import { describe, expectTypeOf, it } from 'vitest'

import type { Constructor } from '~/lib/types'

describe('types', () => {
  describe('constructor', () => {
    it('should be a constructor', () => {
      expectTypeOf<Constructor<Error>>().toEqualTypeOf<new (...args: any[]) => Error>()
    })
  })
})
