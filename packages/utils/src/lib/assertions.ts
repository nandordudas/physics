import { raiseError } from './error-handling'

export function assert(
  condition: unknown,
  message = 'Assertion failed',
  ErrorType: ErrorConstructor = Error,
): asserts condition {
  if (!condition)
    raiseError(message, ErrorType)
}
