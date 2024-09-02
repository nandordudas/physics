import { isNumber } from '@workspace/utils/guards'
import { raiseError } from '@workspace/utils/error-handling'
import { assert } from '@workspace/utils/assertions'

export class Vector2D {
  static readonly #constructorSymbol = Symbol('Vector2D')

  static get zero(): Vector2D {
    return Vector2D.create(0, 0)
  }

  static create(
    x: number,
    y: number,
  ): Vector2D {
    return new Vector2D(this.#constructorSymbol, x, y)
  }

  #x: number
  #y: number

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

  toString() {
    return `Vector2D(${this.x}, ${this.y})`
  }
}
