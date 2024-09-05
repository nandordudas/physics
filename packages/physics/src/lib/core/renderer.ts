interface RendererProps {
  context: OffscreenCanvasRenderingContext2D
}

export class Renderer {
  #context: OffscreenCanvasRenderingContext2D

  constructor(props: RendererProps) {
    const { context } = props

    this.#context = context
  }

  clearCanvas(): void {
    this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height)
  }
}
