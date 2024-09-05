interface CanvasContext {
  canvasRef: HTMLCanvasElement
  offscreenCanvas: OffscreenCanvas
}

type CanvasHandler = (offscreenCanvas: OffscreenCanvas) => void

export function useCanvas() {
  const canvasRef = ref<CanvasContext | null>(null)

  const watchCanvas = (callback: CanvasHandler) => {
    const stopWatch = watch(
      () => canvasRef.value?.offscreenCanvas,
      (offscreenCanvas) => {
        if (!offscreenCanvas)
          return

        callback(offscreenCanvas)
      },
      { immediate: true },
    )

    onBeforeUnmount(stopWatch)

    return stopWatch
  }

  return {
    canvasRef,
    watchCanvas,
  }
}
