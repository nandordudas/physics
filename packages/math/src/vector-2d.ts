export class Vector2D {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) { }

  toString() {
    return `Vector2D(${this.x}, ${this.y})`
  }
}
