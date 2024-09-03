import { afterAll, describe, expect, it, vi } from 'vitest'

import { assert } from '~/lib/assertions'
import * as errorHandling from '~/lib/error-handling'

vi.spyOn(errorHandling, 'raiseError')
vi.mock('~/lib/error-handling', async importOriginal => ({
  ...await importOriginal<typeof import('~/lib/error-handling')>(),
}))

afterAll(() => {
  vi.restoreAllMocks()
})

describe('assertions', () => {
  describe('assert', () => {
    it('should not throw an error if the condition is true', () => {
      expect(() => assert(true, 'message')).not.toThrow()
    })

    it('should throw an error if the condition is false', () => {
      expect(() => assert(false, 'message')).toThrowError('message')
      expect(errorHandling.raiseError).toHaveBeenCalledWith('message', Error)
    })

    it('should throw an error with the specified type if the condition is false', () => {
      expect(() => assert(false, 'message', TypeError)).toThrowError(TypeError)
      expect(errorHandling.raiseError).toHaveBeenCalledWith('message', TypeError)
    })
  })
})
