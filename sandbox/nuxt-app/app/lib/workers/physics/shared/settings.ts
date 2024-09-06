export const settings = new Map<string, any>([
  ['sharedBuffer', null as unknown as SharedArrayBuffer],
  ['sendPort', null as unknown as MessagePort],
  /*  */
  ['cursor', { x: -8, y: -8 }], // Default cursor position outside of the canvas
  ['isPressed', false],
])
