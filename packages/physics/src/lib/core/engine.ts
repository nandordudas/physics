import { assert } from '@workspace/utils'
import { Renderer } from './renderer'

interface EngineProps {
  offscreenCanvas: OffscreenCanvas
  settings: Map<string, any>
}

const requestAnimationFrame = globalThis.requestAnimationFrame.bind(globalThis)
const cancelAnimationFrame = globalThis.cancelAnimationFrame.bind(globalThis)

export class Engine {
  #rafId: number | null = null
  #lastTimstamp: number = 0
  #time: number = 0
  #frames: number = 0
  #renderer: Renderer
  #settings: Map<string, any>

  constructor(props: EngineProps) {
    const { offscreenCanvas, settings } = props
    const context = offscreenCanvas.getContext('2d')

    assert(context !== null, 'Failed to get 2D context from offscreen canvas')

    this.#renderer = new Renderer({ context })
    this.#settings = settings
  }

  run(timestamp: number): void {
    const elapsedTime = timestamp - this.#time

    if (elapsedTime > 500.0)
      this.#lastTimstamp += elapsedTime

    const deltaTime = elapsedTime / 1_000.0

    this.#time += elapsedTime

    if (this.#time - this.#lastTimstamp >= 1_000.0) {
      this.#lastTimstamp += 1_000.0
      this.#frames = 0
    }

    this.#frames++

    // @ts-expect-error In progress
    if (!this.#settings.isPaused) {
      this.update(deltaTime)
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

  update(_deltaTime: number): void {
    // game.update(deltaTime)
  }

  render(): void {
    this.#renderer.clearCanvas()
    // game.render()
  }
}
