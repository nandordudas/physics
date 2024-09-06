import type { Constructor } from '~/lib/types'
import { raiseError } from './error-handling'

export function assert(
  condition: unknown,
  message = 'Assertion failed',
  ErrorType: Constructor<Error> = Error,
): asserts condition {
  if (!condition)
    raiseError(message, ErrorType)
}
