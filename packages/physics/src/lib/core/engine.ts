import { assert } from '@workspace/utils/assertions'
import { isNull } from '@workspace/utils/guards'
import type { SettingsMap } from '@workspace/utils/settings-map'
import { cancelAnimationFrame, requestAnimationFrame } from '~/lib/globals'

import { Game } from './game'
import { Renderer } from './renderer'
import { World } from './world'

interface EngineProps<T extends Record<string, any>> {
  offscreenCanvas: OffscreenCanvas
  settings: SettingsMap<T>
}

export class Engine<T extends Record<string, any>> {
  #rafId: number | null = null
  #lastTimstamp: number = 0
  #time: number = 0

  #settings: SettingsMap<T>
  #renderer: Renderer
  #world: World
  #game: Game

  constructor(props: EngineProps<T>) {
    const { offscreenCanvas, settings } = props
    const context = offscreenCanvas.getContext('2d')

    assert(!isNull(context), 'Failed to get 2D context from offscreen canvas')

    this.#loadCustomFont()

    this.#settings = settings
    this.#world = new World()
    this.#renderer = new Renderer({
      context,
      settings: this.#settings,
    })
    this.#game = new Game({
      renderer: this.#renderer,
      world: this.#world,
      settings: this.#settings,
    })
  }

  run(timestamp: number): void {
    const elapsedTime = timestamp - this.#time

    if (elapsedTime > 500.0)
      this.#lastTimstamp += elapsedTime

    const deltaTime = elapsedTime / 1_000.0

    this.#time += elapsedTime

    if ((this.#time - this.#lastTimstamp) >= 1_000.0)
      this.#lastTimstamp += 1_000.0

    if (!this.#settings.get('isPaused')) {
      this.update(deltaTime)
      this.#renderer.clearCanvas()
      this.render()
    }

    this.#rafId = requestAnimationFrame(this.run.bind(this))
  }

  start(): void {
    this.#rafId = requestAnimationFrame(this.run.bind(this))
  }

  stop(): void {
    if (!this.#rafId)
      return

    cancelAnimationFrame(this.#rafId)
    this.#rafId = null
  }

  update(deltaTime: number): void {
    this.#game.update(deltaTime)
  }

  render(): void {
    this.#game.render()
  }

  async #loadCustomFont(): Promise<void> {
    const font = new FontFace('MapleMono', 'url(/_nuxt/assets/fonts/MapleMono-Thin.woff2)')
    const loadedFont = await font.load()

    // @ts-expect-error asd
    globalThis.fonts.add(loadedFont)
  }
}
