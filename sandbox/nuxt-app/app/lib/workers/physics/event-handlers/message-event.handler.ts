import { messageEmitter, type MessageEventPayload } from '~/lib/workers/physics/shared/emitters/message.emitter'

export function messageEventHandler(event: MessageEvent<MessageEventPayload>): void {
  messageEmitter.emit(event.data.type, event.data.data)
}
