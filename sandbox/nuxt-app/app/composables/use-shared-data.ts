import { byteOffsets, MouseButton } from './use-shared-data/constants/use-shared-data.constants'

const sharedBuffer = new SharedArrayBuffer(byteOffsets.totalBufferSize)
const mouseCoordinates = new Uint16Array(sharedBuffer, 0, 2)
const mouseState = new Uint8Array(sharedBuffer, ...byteOffsets.mouseStateOffset)
const keyCodes = new Uint16Array(sharedBuffer, ...byteOffsets.keyCodesOffset)
const activeKeysCount = new Uint8Array(sharedBuffer, ...byteOffsets.activeKeysCountOffset)
const updateFlag = new Int32Array(sharedBuffer, ...byteOffsets.updateFlagOffset)

export function useSharedData(): {
  sharedBuffer: SharedArrayBuffer
  updateKeyData: (event: KeyboardEvent) => void
  updateMouseData: (event: MouseEvent) => void
} {
  return {
    sharedBuffer,
    updateMouseData,
    updateKeyData,
  }
}

function updateMouseData(event: MouseEvent): void {
  Atomics.store(mouseCoordinates, 0, event.offsetX)
  Atomics.store(mouseCoordinates, 1, event.offsetY)

  Atomics.store(mouseState, 0, (event.buttons & MouseButton.Primary) ? 1 : 0)

  notifyWorker()
}

const activeKeys = new Set<number>()

function updateKeyData(event: KeyboardEvent): void {
  event.preventDefault()

  const keyCode = event.key.charCodeAt(0)
  const isPressed = event.type === 'keydown'

  const currentCount = Atomics.load(activeKeysCount, 0)

  if (!isPressed) {
    if (activeKeys.delete(keyCode)) // Remove key if it exists
      Atomics.store(activeKeysCount, 0, currentCount - 1) // Decrement count here
  }
  else {
    // Add key if not already in the set and capacity allows
    if (!activeKeys.has(keyCode) && currentCount < byteOffsets.KEY_CODE_COUNT) {
      activeKeys.add(keyCode)

      Atomics.store(keyCodes, currentCount, keyCode)
      Atomics.store(activeKeysCount, 0, currentCount + 1)
    }
  }

  notifyWorker()
}

function notifyWorker(): void {
  // Notify the worker by incrementing the updateFlag
  Atomics.add(updateFlag, 0, 1)
  Atomics.notify(updateFlag, 0)
}
