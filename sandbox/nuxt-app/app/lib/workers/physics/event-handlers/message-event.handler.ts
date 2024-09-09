import { Engine } from '@workspace/physics'
import { consola } from 'consola'
import { StateManager } from '~/lib/workers/physics/lib/managers/state.manager'
import { settings } from '~/lib/workers/physics/shared/settings'

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
    settings.set('sendPort', data.sendPort)
    settings.set('sharedBuffer', data.sharedBuffer)

    const stateManager = new StateManager({ settings })

    stateManager.wait()

    // TODO: replace with proper event listener
    data.receivePort.addEventListener('message', (event) => {
      const { type, data } = event.data

      consola.log('Received message from receive channel:', { type, data })
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
