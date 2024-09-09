import { assert } from '@workspace/utils/assertions'
import { isDefined, isNull } from '@workspace/utils/guards'
import { consola } from 'consola'
import type { Settings } from '@workspace/physics'
import type { SettingsSchema } from '~/lib/workers/physics/shared/settings'

import { keyMapping, MouseButtons, MouseCoordinates } from './state.manager.constants'

interface MouseState {
  x: number
  y: number
  isPressed: boolean
}

interface StateManagerProps {
  settings: Settings<SettingsSchema>
}

export class StateManager {
  #settings: Settings<SettingsSchema>
  #mouseCoordinates: Uint16Array
  #mouseState: Uint8Array
  #keyCodes: Uint16Array
  #activeKeysCount: Uint8Array
  #updateFlag: Int32Array

  get mouseState(): MouseState {
    return {
      x: Atomics.load(this.#mouseCoordinates, MouseCoordinates.X),
      y: Atomics.load(this.#mouseCoordinates, MouseCoordinates.Y),
      isPressed: Atomics.load(this.#mouseState, MouseButtons.Primary) === 1,
    }
  }

  get pressedKeys(): string[] {
    const activeCount = Atomics.load(this.#activeKeysCount, 0)

    const pressedKeys: string[] = []

    for (let i = 0; i < activeCount; ++i) {
      const keyCode = Atomics.load(this.#keyCodes, i)

      if (keyMapping[keyCode])
        pressedKeys.push(keyMapping[keyCode])
    }

    return pressedKeys
  }

  constructor(props: StateManagerProps) {
    const { settings } = props

    const sharedBuffer = settings.get('sharedBuffer')!

    assert(isDefined(sharedBuffer) || isNull(sharedBuffer), 'Shared buffer must be set')

    this.#settings = settings
    this.#mouseCoordinates = new Uint16Array(sharedBuffer, 0, 2)
    this.#mouseState = new Uint8Array(sharedBuffer, 4, 1)
    this.#keyCodes = new Uint16Array(sharedBuffer, 6, 10)
    this.#activeKeysCount = new Uint8Array(sharedBuffer, 26, 1)
    this.#updateFlag = new Int32Array(sharedBuffer, 28, 1)
  }

  async wait(): Promise<void> {
    const value = Atomics.load(this.#updateFlag, 0)
    const result = await Atomics.waitAsync(this.#updateFlag, 0, value).value

    if (result !== 'ok') {
      consola.warn('Failed to wait for update:', result)

      return this.wait()
    }

    this.#updateCursor()

    this.wait()
  }

  #updateCursor(): void {
    this.#settings.set('cursor', { x: this.mouseState.x, y: this.mouseState.y })
    this.#settings.set('isPressed', this.mouseState.isPressed)
  }
}
