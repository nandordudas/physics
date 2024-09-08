import { Settings } from '@workspace/physics'

interface SettingsSchema {
  sharedBuffer: SharedArrayBuffer | null
  sendPort: MessagePort | null
  cursor: { x: number, y: number }
  isPressed: boolean
}

export const settings = new Settings<SettingsSchema>()

settings.set('sharedBuffer', null)
settings.set('sendPort', null)
settings.set('cursor', { x: -8, y: -8 })
settings.set('isPressed', false)
