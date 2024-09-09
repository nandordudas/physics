import { SettingsMap } from '@workspace/utils/settings-map'
import type { Point2D } from '@workspace/math'

export interface SettingsSchema {
  sharedBuffer: SharedArrayBuffer | null
  sendPort: MessagePort | null
  cursor: Point2D
  isPressed: boolean
}

export const settings = new SettingsMap<SettingsSchema>()
