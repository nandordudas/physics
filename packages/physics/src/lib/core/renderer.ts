import { Vector2D } from '@workspace/math'
import type { SettingsMap } from '@workspace/utils/settings-map'

interface RendererProps {
  context: OffscreenCanvasRenderingContext2D
  settings: SettingsMap<any>
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

  static readonly #textOffsetX = Vector2D.create(6, 0)
  static readonly #textOffsetY = Vector2D.create(0, 6)

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

  #context!: OffscreenCanvasRenderingContext2D
  #settings!: SettingsMap<any>

  constructor(props: RendererProps) {
    const { context, settings } = props

    this.#context = context
    this.#settings = settings
  }

  clearCanvas(): void {
    this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height)
  }

  drawCursorHelper(): void {
    const fullRadius = 8

    const { x, y } = this.#settings.getOrDefault('cursor', { x: -fullRadius, y: -fullRadius })
    const cursorPosition = Vector2D.create(x, y)
    const isPressed = this.#settings.get('isPressed')

    this.#context.save()

    this.#context.font = '10px MapleMono'
    this.#context.lineWidth = 0.5

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

    const segments = 3
    const radius = isPressed ? (fullRadius / 1.618) : fullRadius
    const circumference = 2 * Math.PI * radius
    const dashLength = circumference / (segments * 2)

    this.#context.setLineDash([dashLength, dashLength])

    Renderer.drawPoint(cursorPosition, {
      context: this.#context,
      radius,
      stroke: 'tomato',
    })

    Renderer.drawPoint(cursorPosition, {
      context: this.#context,
      radius: 0.5,
      stroke: 'tomato',
    })

    this.#context.restore()
  }
}
