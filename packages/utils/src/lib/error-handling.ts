import type { Constructor } from '~/lib/types'

export function raiseError(
  message: string,
  ErrorType: Constructor<Error> = Error,
): never {
  throw new ErrorType(message)
}
