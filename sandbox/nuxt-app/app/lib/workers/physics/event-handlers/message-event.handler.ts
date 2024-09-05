import { Engine } from '@workspace/physics'

const settings = new Map<string, any>([
  ['sharedBuffer', null as unknown as SharedArrayBuffer],
  ['sendPort', null as unknown as MessagePort],
])

type MessageEventProps =
  | {
    type: 'init'
    data: {
      sharedBuffer: SharedArrayBuffer
      receivePort: MessagePort
      sendPort: MessagePort
      offscreenCanvas: OffscreenCanvas
    }
  }

export function messageEventHandler(event: MessageEvent<MessageEventProps>): void {
  const { data, type } = event.data

  if (type === 'init') {
    const sharedBuffer = data.sharedBuffer

    settings.set('sharedBuffer', new Int32Array(sharedBuffer))
    settings.set('sendPort', data.sendPort)

    waitForUpdate({
      mouseCoordinates: new Uint16Array(sharedBuffer, 0, 2), // 0 = 0 (mouseCoordinates)
      mouseState: new Uint8Array(sharedBuffer, 4, 1), // 4 = 2 (mouseCoordinates) + 2 (padding)
      keyCodes: new Uint16Array(sharedBuffer, 6, 10), // 6 = 4 (mouseCoordinates) + 1 (mouseState) + 1 (padding)
      activeKeysCount: new Uint8Array(sharedBuffer, 26, 1), // 26 = 6 + 20 (keyCodes)
      updateFlag: new Int32Array(sharedBuffer, 28, 1), // 28 = 6 + 20 + 1 + 1 (padding)
    })

    data.receivePort.addEventListener('message', (event) => {
      const { type, data } = event.data

      // eslint-disable-next-line no-console
      console.log('Received message from receive channel:', { type, data })
    })
    data.receivePort.start()
    data.sendPort.postMessage({ type: 'ready' })

    const engine = new Engine({
      offscreenCanvas: data.offscreenCanvas,
      settings,
    })

    engine.start()
  }
}

const keyMapping: Record<string, string> = {
  119: 'w', // Key code for "w"
  115: 's', // Key code for "s"
  // Add more key codes here as needed
}

interface WaitForUpdateProps {
  mouseCoordinates: Uint16Array
  mouseState: Uint8Array
  keyCodes: Uint16Array
  activeKeysCount: Uint8Array
  updateFlag: Int32Array
}

async function waitForUpdate(props: WaitForUpdateProps): Promise<void> {
  const { mouseCoordinates, mouseState, keyCodes, activeKeysCount, updateFlag } = props

  const currentValue = Atomics.load(updateFlag, 0)

  await Atomics.waitAsync(updateFlag, 0, currentValue).value

  const pressedKeys: string[] = []

  // Process the updated data
  const mouseX = Atomics.load(mouseCoordinates, 0)
  const mouseY = Atomics.load(mouseCoordinates, 1)
  const mousePressed = Atomics.load(mouseState, 0) === 1
  const activeCount = Atomics.load(activeKeysCount, 0)

  for (let i = 0; i < activeCount; ++i) {
    const keyCode = Atomics.load(keyCodes, i)

    if (keyMapping[keyCode])
      pressedKeys.push(keyMapping[keyCode])
  }

  // eslint-disable-next-line no-console
  console.log('Update:', { mouseX, mouseY, mousePressed, pressedKeys })

  // Wait for the next update
  waitForUpdate(props)
}
