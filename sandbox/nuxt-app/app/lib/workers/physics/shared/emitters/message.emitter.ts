import { Engine } from '@workspace/physics'
import { EventEmitter } from '@workspace/utils/event-emitter'
import { consola } from 'consola'
import { StateManager } from '~/lib/workers/physics/lib/managers/state.manager'
import { settings } from '~/lib/workers/physics/shared/settings'

import { receivePortEmitter } from './receive-port.emitter'

interface MessageEvents {
  error: ErrorEvent
  init: {
    offscreenCanvas: OffscreenCanvas
    receivePort: MessagePort
    sendPort: MessagePort
    sharedBuffer: SharedArrayBuffer
  }
}

type MessageEventTypes = keyof MessageEvents

export interface MessageEventPayload {
  type: MessageEventTypes
  data: MessageEvents[MessageEventTypes]
}

export const messageEmitter = new EventEmitter<MessageEvents>()

messageEmitter.on('error', consola.error)

messageEmitter.once('init', (data) => {
  settings.set('sendPort', data.sendPort)
  settings.set('sharedBuffer', data.sharedBuffer)

  new StateManager({ settings }).wait()

  data.receivePort.addEventListener('message', event => receivePortEmitter.emit(event.data.type, event.data.data))
  data.receivePort.start()
  data.sendPort.postMessage({ type: 'ready' })

  new Engine({ offscreenCanvas: data.offscreenCanvas, settings }).start()
})
