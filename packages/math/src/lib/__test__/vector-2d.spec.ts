import { describe, expect, it } from 'vitest'

import { Vector2D } from '~/lib/vector-2d'

describe('vector-2d', () => {
  describe('constructor', () => {
    it('should not constructable', () => {
      // @ts-expect-error Constructor of class 'Vector2D' is private and only accessible within the class declaration.
      expect(() => new Vector2D(1, 2)).toThrowError(TypeError)
      // TODO: raiseError has called
    })
  })

  describe('statics', () => {
    describe('getters', () => {
      describe('zero', () => {
        it('should return a vector with x and y components set to 0', () => {
          const vector = Vector2D.zero
          expect(vector.x).toBe(0)
          expect(vector.y).toBe(0)
        })
      })
    })

    describe('create', () => {
      it('should return a vector with the specified x and y components', () => {
        const vector = Vector2D.create(1, 2)
        expect(vector.x).toBe(1)
        expect(vector.y).toBe(2)
        // TODO: isNumber has called
      })
    })
  })

  describe('getters', () => {
    describe('x', () => {
      it('should return the x component of the vector', () => {
        const vector = Vector2D.create(1, 2)
        expect(vector.x).toBe(1)
      })
    })

    describe('y', () => {
      it('should return the y component of the vector', () => {
        const vector = Vector2D.create(1, 2)
        expect(vector.y).toBe(2)
      })
    })
  })

  describe('transformers', () => {
    describe('toString', () => {
      it('should return a string representation of the vector', () => {
        const vector = Vector2D.create(1, 2)
        expect(vector.toString()).toBe('Vector2D(1, 2)')
      })
    })
  })
})
