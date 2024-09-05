import { messageEventHandler } from './event-handlers/message-event.handler'

const addEventListener = globalThis.addEventListener.bind(globalThis)

addEventListener('error', console.error)
addEventListener('message', messageEventHandler)
