export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isNull(value: unknown): value is null {
  return value === null
}
