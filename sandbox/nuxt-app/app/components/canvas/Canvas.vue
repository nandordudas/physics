<script setup lang="ts">
defineProps<{
  width: number
  height: number
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
</script>

<template>
  <canvas
    ref="canvas"
    :width
    :height
    class="bg-slate-950 rounded-md ring-1 ring-gray-300 cursor-none dark:ring-gray-700"
  />
</template>
