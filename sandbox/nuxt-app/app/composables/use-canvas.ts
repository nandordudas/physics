interface CanvasContext {
  canvasRef: HTMLCanvasElement
  offscreenCanvas: OffscreenCanvas
}

type CanvasHandler = (offscreenCanvas: OffscreenCanvas) => void

export function useCanvas() {
  const canvasRef = ref<CanvasContext | null>(null)

  const watchCanvas = (callback: CanvasHandler) => {
    const stopWatch = watch(
      () => toValue(canvasRef)?.offscreenCanvas,
      (offscreenCanvas) => {
        if (!offscreenCanvas)
          return

        callback(offscreenCanvas)
        stopWatch()
      },
      { immediate: true, flush: 'post' },
    )

    function stop(): void {
      stopWatch()
    }

    onScopeDispose(stop)
  }

  return {
    canvasRef,
    watchCanvas,
  }
}
