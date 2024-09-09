import { consola } from 'consola'
import { addEventListener } from '~/lib/workers/globals'

import { messageEventHandler } from './event-handlers/message-event.handler'

addEventListener('error', consola.error)
addEventListener('message', messageEventHandler)
