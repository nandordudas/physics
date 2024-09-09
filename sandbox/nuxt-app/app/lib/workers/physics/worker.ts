import { addEventListener } from '~/lib/workers/globals'

import { messageEventHandler } from './event-handlers/message-event.handler'

addEventListener('error', console.error)
addEventListener('message', messageEventHandler)
