export function raiseError(
  message: string,
  ErrorType: ErrorConstructor = Error,
): never {
  throw new ErrorType(message)
}
