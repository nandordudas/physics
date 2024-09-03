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

      describe('one', () => {
        it('should return a vector with x and y components set to 1', () => {
          const vector = Vector2D.one
          expect(vector.x).toBe(1)
          expect(vector.y).toBe(1)
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

    describe('fromAngle', () => {
      it('should return a vector with the specified angle and magnitude', () => {
        const vector = Vector2D.fromAngle(Math.PI / 4, 5)
        expect(vector.x).toBeCloseTo(5 * Math.cos(Math.PI / 4))
        expect(vector.y).toBeCloseTo(5 * Math.sin(Math.PI / 4))
      })

      it('should return a vector with the specified angle and default magnitude', () => {
        const vector = Vector2D.fromAngle(Math.PI / 4)
        expect(vector.x).toBeCloseTo(Math.cos(Math.PI / 4))
        expect(vector.y).toBeCloseTo(Math.sin(Math.PI / 4))
      })
    })

    describe('transform', () => {
      it('should return a new vector transformed by the specified angle', () => {
        const vector = Vector2D.create(1, 2)
        const result = Vector2D.transform(vector, Math.PI / 4)
        expect(result.x).toBeCloseTo(1 * Math.cos(Math.PI / 4) - 2 * Math.sin(Math.PI / 4))
        expect(result.y).toBeCloseTo(1 * Math.sin(Math.PI / 4) + 2 * Math.cos(Math.PI / 4))
      })
    })

    describe('random', () => {
      it('should return a random vector with x and y components between 0 and 1', () => {
        const vector = Vector2D.random()
        expect(vector.x).toBeGreaterThanOrEqual(0)
        expect(vector.x).toBeLessThanOrEqual(1)
        expect(vector.y).toBeGreaterThanOrEqual(0)
        expect(vector.y).toBeLessThanOrEqual(1)
      })

      it('should return a random vector with x and y components between 0 and the specified value', () => {
        const vector = Vector2D.random(5)
        expect(vector.x).toBeGreaterThanOrEqual(0)
        expect(vector.x).toBeLessThanOrEqual(5)
        expect(vector.y).toBeGreaterThanOrEqual(0)
        expect(vector.y).toBeLessThanOrEqual(5)
      })

      it('should return a random vector with x and y components between 0 and the specified vector', () => {
        const vector = Vector2D.random(Vector2D.create(5, 10))
        expect(vector.x).toBeGreaterThanOrEqual(0)
        expect(vector.x).toBeLessThanOrEqual(5)
        expect(vector.y).toBeGreaterThanOrEqual(0)
        expect(vector.y).toBeLessThanOrEqual(10)
      })
    })

    describe('midpoint', () => {
      it('should return the midpoint between the two specified vectors', () => {
        const vector = Vector2D.midpoint(Vector2D.create(1, 2), Vector2D.create(3, 4))
        expect(vector.x).toBe(2)
        expect(vector.y).toBe(3)
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

  describe('toString', () => {
    it('should return a string representation of the vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.toString()).toBe('Vector2D(1, 2)')
    })
  })

  describe('iterator', () => {
    it('should return a generator that yields the x and y components of the vector', () => {
      const vector = Vector2D.create(1, 2)
      const components = [...vector]
      expect(components).toEqual([1, 2])
    })
  })

  describe('clone', () => {
    it('should return a new vector with the same x and y components as the original', () => {
      const original = Vector2D.create(1, 2)
      const clone = original.clone()
      expect(clone).not.toBe(original)
      expect(clone.x).toBe(original.x)
      expect(clone.y).toBe(original.y)
    })
  })

  describe('isZero', () => {
    it('should return true if the vector has x and y components set to 0', () => {
      const vector = Vector2D.create(0, 0)
      expect(vector.isZero()).toBe(true)
    })

    it('should return false if the vector has x and y components different than 0', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.isZero()).toBe(false)
    })
  })

  describe('isEqualTo', () => {
    it('should return true if the vector is equal to the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.isEqualTo(Vector2D.create(1, 2))).toBe(true)
    })

    it('should return false if the vector is not equal to the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.isEqualTo(Vector2D.create(2, 1))).toBe(false)
    })

    it('should return true if the vector is approximately equal to the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.isEqualTo(Vector2D.create(1 + Number.EPSILON / 2, 2 + Number.EPSILON / 2))).toBe(true)
    })

    it('should return false if the vector is not approximately equal to the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.isEqualTo(Vector2D.create(1 + Number.EPSILON * 2, 2 + Number.EPSILON * 2))).toBe(false)
    })
  })

  describe('add', () => {
    it('should add the specified value to the vector', () => {
      const vector = Vector2D.create(1, 2)
      vector.add(3)
      expect(vector.x).toBe(4)
      expect(vector.y).toBe(5)
    })

    it('should add the specified vector to the vector', () => {
      const vector = Vector2D.create(1, 2)
      vector.add(Vector2D.create(3, 4))
      expect(vector.x).toBe(4)
      expect(vector.y).toBe(6)
    })
  })

  describe('subtract', () => {
    it('should subtract the specified value from the vector', () => {
      const vector = Vector2D.create(1, 2)
      vector.subtract(3)
      expect(vector.x).toBe(-2)
      expect(vector.y).toBe(-1)
    })

    it('should subtract the specified vector from the vector', () => {
      const vector = Vector2D.create(1, 2)
      vector.subtract(Vector2D.create(3, 4))
      expect(vector.x).toBe(-2)
      expect(vector.y).toBe(-2)
    })
  })

  describe('multiply', () => {
    it('should multiply the vector by the specified value', () => {
      const vector = Vector2D.create(1, 2)
      vector.multiply(3)
      expect(vector.x).toBe(3)
      expect(vector.y).toBe(6)
    })

    it('should multiply the vector by the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      vector.multiply(Vector2D.create(3, 4))
      expect(vector.x).toBe(3)
      expect(vector.y).toBe(8)
    })
  })

  describe('divide', () => {
    it('should divide the vector by the specified value', () => {
      const vector = Vector2D.create(3, 6)
      vector.divide(3)
      expect(vector.x).toBe(1)
      expect(vector.y).toBe(2)
    })

    it('should divide the vector by the specified vector', () => {
      const vector = Vector2D.create(3, 8)
      vector.divide(Vector2D.create(3, 4))
      expect(vector.x).toBe(1)
      expect(vector.y).toBe(2)
    })

    it('should not divide the vector by 0', () => {
      const vector = Vector2D.create(3, 6)
      vector.divide(0)
      expect(vector.x).toBe(0)
      expect(vector.y).toBe(0)
    })
  })

  describe('addImmutable', () => {
    it('should return a new vector with the specified value added to the vector', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.addImmutable(3)
      expect(result.x).toBe(4)
      expect(result.y).toBe(5)
    })

    it('should return a new vector with the specified vector added to the vector', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.addImmutable(Vector2D.create(3, 4))
      expect(result.x).toBe(4)
      expect(result.y).toBe(6)
    })
  })

  describe('subtractImmutable', () => {
    it('should return a new vector with the specified value subtracted from the vector', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.subtractImmutable(3)
      expect(result.x).toBe(-2)
      expect(result.y).toBe(-1)
    })

    it('should return a new vector with the specified vector subtracted from the vector', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.subtractImmutable(Vector2D.create(3, 4))
      expect(result.x).toBe(-2)
      expect(result.y).toBe(-2)
    })
  })

  describe('multiplyImmutable', () => {
    it('should return a new vector with the vector multiplied by the specified value', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.multiplyImmutable(3)
      expect(result.x).toBe(3)
      expect(result.y).toBe(6)
    })

    it('should return a new vector with the vector multiplied by the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      const result = vector.multiplyImmutable(Vector2D.create(3, 4))
      expect(result.x).toBe(3)
      expect(result.y).toBe(8)
    })
  })

  describe('divideImmutable', () => {
    it('should return a new vector with the vector divided by the specified value', () => {
      const vector = Vector2D.create(3, 6)
      const result = vector.divideImmutable(3)
      expect(result.x).toBe(1)
      expect(result.y).toBe(2)
    })

    it('should return a new vector with the vector divided by the specified vector', () => {
      const vector = Vector2D.create(3, 8)
      const result = vector.divideImmutable(Vector2D.create(3, 4))
      expect(result.x).toBe(1)
      expect(result.y).toBe(2)
    })

    it('should return a new vector with the vector divided by 0', () => {
      const vector = Vector2D.create(3, 6)
      const result = vector.divideImmutable(0)
      expect(result.x).toBe(0)
      expect(result.y).toBe(0)
    })
  })

  describe('magnitude', () => {
    it('should return the magnitude of the vector', () => {
      const vector = Vector2D.create(3, 4)
      expect(vector.magnitude()).toBe(5)
    })
  })

  describe('normalize', () => {
    it('should normalize the vector', () => {
      const vector = Vector2D.create(3, 4)
      vector.normalize()
      expect(vector.x).toBeCloseTo(0.6)
      expect(vector.y).toBeCloseTo(0.8)
    })
  })

  describe('dot', () => {
    it('should return the dot product of the vector and the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.dot(Vector2D.create(3, 4))).toBe(11)
    })
  })

  describe('cross', () => {
    it('should return the cross product of the vector and the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.cross(Vector2D.create(3, 4))).toBe(-2)
    })
  })

  describe('distanceTo', () => {
    it('should return the distance to the specified vector', () => {
      const vector = Vector2D.create(1, 2)
      expect(vector.distanceTo(Vector2D.create(4, 6))).toBe(5)
    })
  })
})
