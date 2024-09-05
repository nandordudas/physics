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
  () => canvasRef.value,
  (canvasElement) => {
    if (!canvasElement)
      return

    offscreenCanvas.value = canvasElement.transferControlToOffscreen()

    stopWatch()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(stopWatch)
</script>

<template>
  <canvas
    ref="canvasRef"
    v-bind="$attrs"
    class="bg-slate-950 rounded-sm ring-1 ring-gray-300 cursor-none dark:ring-gray-700"
  />
</template>
