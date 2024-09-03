import { raiseError } from './error-handling'
import type { Constructor } from '~/lib/types'

export function assert(
  condition: unknown,
  message = 'Assertion failed',
  ErrorType: Constructor<Error> = Error,
): asserts condition {
  if (!condition)
    raiseError(message, ErrorType)
}
