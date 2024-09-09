import { assert } from '@workspace/utils/assertions'
import { raiseError } from '@workspace/utils/error-handling'
import { isNumber } from '@workspace/utils/guards'

export interface Point2D {
  x: number
  y: number
}

export class Vector2D implements Point2D {
  static readonly #constructorSymbol = Symbol('Vector2D')

  static get zero(): Vector2D {
    return Vector2D.create(0, 0)
  }

  static get one(): Vector2D {
    return Vector2D.create(1, 1)
  }

  static create(
    x: number,
    y: number,
  ): Vector2D {
    return new Vector2D(this.#constructorSymbol, x, y)
  }

  static fromAngle(
    angle: number,
    magnitude = 1.0,
  ): Vector2D {
    return Vector2D.create(
      Math.cos(angle) * magnitude,
      Math.sin(angle) * magnitude,
    )
  }

  static transform(
    vector: Vector2D,
    angle: number,
  ): Vector2D {
    return Vector2D.create(
      vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
      vector.x * Math.sin(angle) + vector.y * Math.cos(angle),
    )
  }

  static random(
    value: number | Vector2D = 1.0,
    rng: () => number = Math.random,
  ): Vector2D {
    return Vector2D.create(rng(), rng()).multiply(value)
  }

  static midpoint(
    v: Vector2D,
    w: Vector2D,
  ): Vector2D {
    return Vector2D.create((v.x + w.x) / 2, (v.y + w.y) / 2)
  }

  #x: number
  #y: number
  #cachedMagnitude: number | null = null

  get x(): number {
    return this.#x
  }

  get y(): number {
    return this.#y
  }

  private constructor(
    symbol: symbol,
    x: number,
    y: number,
  ) {
    if (symbol !== Vector2D.#constructorSymbol)
      raiseError('Vector2D is not constructable', TypeError)

    assert(isNumber(x), 'Component x must be a number')
    assert(isNumber(y), 'Component y must be a number')

    this.#x = x
    this.#y = y
  }

  toJSON(): number[] {
    return Array.from(this)
  }

  toString(): string {
    return `Vector2D(${this.x}, ${this.y})`
  }

  clone(): Vector2D {
    return Vector2D.create(this.#x, this.#y)
  }

  isZero(): this is Vector2D & { x: 0, y: 0 } {
    return this.#x === 0 && this.#y === 0
  }

  isEqualTo(
    vector: Vector2D,
    epsilon: number = Number.EPSILON,
  ): boolean {
    return Math.abs(this.#x - vector.x) < epsilon && Math.abs(this.#y - vector.y) < epsilon
  }

  add(value: number | Vector2D): this {
    const isScalar = isNumber(value)

    this.#x += isScalar ? value : value.x
    this.#y += isScalar ? value : value.y
    this.#cachedMagnitude = null

    return this
  }

  subtract(value: number | Vector2D): this {
    const isScalar = isNumber(value)

    this.#x -= isScalar ? value : value.x
    this.#y -= isScalar ? value : value.y
    this.#cachedMagnitude = null

    return this
  }

  multiply(value: number | Vector2D): this {
    const isScalar = isNumber(value)

    this.#x *= isScalar ? value : value.x
    this.#y *= isScalar ? value : value.y
    this.#cachedMagnitude = null

    return this
  }

  divide(value: number | Vector2D): this {
    const isScalar = isNumber(value)
    const divisorX = isScalar ? value : value.x
    const divisorY = isScalar ? value : value.y

    this.#x = divisorX !== 0 ? this.#x / divisorX : 0
    this.#y = divisorY !== 0 ? this.#y / divisorY : 0
    this.#cachedMagnitude = null

    return this
  }

  addImmutable(value: number | Vector2D): Vector2D {
    return this.clone().add(value)
  }

  subtractImmutable(value: number | Vector2D): Vector2D {
    return this.clone().subtract(value)
  }

  multiplyImmutable(value: number | Vector2D): Vector2D {
    return this.clone().multiply(value)
  }

  divideImmutable(value: number | Vector2D): Vector2D {
    return this.clone().divide(value)
  }

  magnitude(): number {
    if (this.#cachedMagnitude !== null)
      return this.#cachedMagnitude

    if (this.#x === 0 || this.#y === 0) {
      this.#cachedMagnitude = Math.abs(this.#x || this.#y)

      return this.#cachedMagnitude
    }

    const magnitude = Math.hypot(this.#x, this.#y)

    this.#cachedMagnitude = magnitude

    return magnitude
  }

  normalize(): this {
    const magnitude = this.magnitude()

    return magnitude === 0 ? this : this.divide(magnitude)
  }

  dot(vector: Vector2D): number {
    if (this.isZero() || vector.isZero())
      return 0

    return this.#x * vector.x + this.#y * vector.y
  }

  cross(vector: Vector2D): number {
    if (this.isZero() || vector.isZero())
      return 0

    return this.#x * vector.y - this.#y * vector.x
  }

  distanceTo(vector: Vector2D): number {
    return Math.hypot(this.#x - vector.x, this.#y - vector.y)
  }

  *[Symbol.iterator](): Generator<number> {
    yield this.#x
    yield this.#y
  }
}
