import { Vector2D } from '@workspace/math'

import type { Settings } from './settings'

interface RendererProps {
  context: OffscreenCanvasRenderingContext2D
  settings: Settings<any>
}

interface BaseDrawOptions {
  context: OffscreenCanvasRenderingContext2D
  fill?: string | CanvasGradient | CanvasPattern
  stroke?: string | CanvasGradient | CanvasPattern
}

interface DrawTextOptions extends BaseDrawOptions {
  align?: CanvasTextAlign
  baseline?: CanvasTextBaseline
}

interface DrawPointOptions extends BaseDrawOptions {
  radius: number
}

export class Renderer {
  static readonly TWO_PI = Math.PI * 2

  static readonly #textOffsetX = Vector2D.create(4, 0)
  static readonly #textOffsetY = Vector2D.create(0, 4)

  static drawtext(
    text: string,
    position: Vector2D,
    options: DrawTextOptions,
  ): void {
    const { align = 'left', baseline = 'top', context, fill, stroke } = options

    context.textAlign = align
    context.textBaseline = baseline

    if (fill) {
      context.fillStyle = fill
      context.fillText(text, position.x, position.y)
    }

    if (stroke) {
      context.strokeStyle = stroke
      context.strokeText(text, position.x, position.y)
    }
  }

  static drawPoint(
    position: Vector2D,
    options: DrawPointOptions,
  ): void {
    const { context, radius, fill, stroke } = options

    context.beginPath()
    context.arc(position.x, position.y, radius, 0, this.TWO_PI)

    if (fill) {
      context.fillStyle = fill
      context.fill()
    }

    if (stroke) {
      context.strokeStyle = stroke
      context.stroke()
    }
  }

  #context: OffscreenCanvasRenderingContext2D
  #settings: Settings<any>

  constructor(props: RendererProps) {
    const { context, settings } = props

    this.#context = context
    this.#settings = settings
  }

  clearCanvas(): void {
    this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height)
  }

  drawCursorHelper(): void {
    const { x, y } = this.#settings.get('cursor')
    const cursorPosition = Vector2D.create(x, y)
    const isPressed = this.#settings.get('isPressed')

    if (isPressed) {
      let align: CanvasTextAlign
      let baseline: CanvasTextBaseline
      const textPosition = cursorPosition.clone()

      if (cursorPosition.x < this.#context.canvas.width / 2) {
        align = 'start'
        textPosition.add(Renderer.#textOffsetX)
      }
      else {
        align = 'end'
        textPosition.subtract(Renderer.#textOffsetX)
      }

      if (cursorPosition.y < this.#context.canvas.height / 2) {
        baseline = 'top'
        textPosition.add(Renderer.#textOffsetY)
      }
      else {
        baseline = 'bottom'
        textPosition.subtract(Renderer.#textOffsetY)
      }

      Renderer.drawtext(JSON.stringify(cursorPosition), textPosition, {
        context: this.#context,
        fill: 'tomato',
        align,
        baseline,
      })
    }

    Renderer.drawPoint(cursorPosition, {
      context: this.#context,
      radius: isPressed ? 4 : 8,
      stroke: 'tomato',
    })

    Renderer.drawPoint(cursorPosition, {
      context: this.#context,
      radius: 1,
      stroke: 'tomato',
    })
  }
}
