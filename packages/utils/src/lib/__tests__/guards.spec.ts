import { describe, expect, it } from 'vitest'

import { isNumber } from '~/lib/guards'

describe('guards', () => {
  describe('isNumber', () => {
    it('should return true for number values', () => {
      const values = [
        0,
        1,
        -1,
        1.1,
        -1.1,
        Infinity,
        -Infinity,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_VALUE,
        Number.MIN_VALUE,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.EPSILON,
      ]

      for (const value of values)
        expect(isNumber(value)).toBeTruthy()
    })

    it('should return false for non-number values', () => {
      const values = [
        Number.NaN,
        true,
        false,
        null,
        undefined,
        '',
        '1',
        [] as unknown,
        {} as unknown,
      ]

      for (const value of values)
        expect(isNumber(value)).toBeFalsy()
    })
  })
})
