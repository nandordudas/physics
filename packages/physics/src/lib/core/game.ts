import type { Renderer } from './renderer'
import type { World } from './world'

interface GameProps {
  renderer: Renderer
  world: World
  settings: Map<string, any>
}

export class Game {
  #renderer: Renderer
  #world: World
  #settings: Map<string, any>
  #isDragging: boolean = false

  constructor(props: GameProps) {
    const { renderer, settings, world } = props

    this.#settings = settings
    this.#renderer = renderer
    this.#world = world
  }

  update(deltaTime: number): void {
    this.#handleInput(deltaTime)
    this.#world.update(deltaTime)
  }

  render(): void {
    this.#renderer.drawCursorHelper()
  }

  // TODO: It will be changed to a more complex input handling system
  #handleInput(deltaTime: number): void {
    this.#isDragging = this.#settings.get('isPressed')

    if (this.#isDragging)
      // eslint-disable-next-line no-console
      console.log('Dragging', deltaTime)
  }
}
