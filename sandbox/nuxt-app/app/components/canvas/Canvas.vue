<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const offscreenCanvas = ref<OffscreenCanvas | null>(null)

defineExpose({
  offscreenCanvas,
  canvasRef,
})

const stopWatch = watch(
  () => toValue(canvasRef),
  (canvasEl) => {
    if (!canvasEl)
      return

    offscreenCanvas.value = canvasEl.transferControlToOffscreen()

    stopWatch()
  },
  { immediate: true, flush: 'post' },
)

onUnmounted(() => {
  stopWatch()
})
</script>

<template>
  <canvas ref="canvasRef" v-bind="$attrs" />
</template>

<style lang="postcss" scoped>
canvas {
  @apply bg-slate-100 rounded ring-1 ring-slate-300 shadow-lg shadow-slate-300 cursor-none;
  @apply dark:ring-slate-700 dark:bg-slate-800 dark:shadow-slate-700;
}
</style>
