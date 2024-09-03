import { describe, expect, it } from 'vitest'

import { raiseError } from '~/lib/error-handling'

describe('error handling', () => {
  it('should throw an error', () => {
    expect(() => raiseError('test')).toThrowError('test')
  })

  it('should throw an error with custom error type', () => {
    class CustomError extends Error { }

    expect(() => raiseError('test', CustomError)).toThrowError(CustomError)
  })
})
