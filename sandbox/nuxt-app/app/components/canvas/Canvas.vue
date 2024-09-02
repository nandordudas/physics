<script setup lang="ts">
import { Vector2D } from '@workspace/math'

const canvas = ref<HTMLCanvasElement | null>(null)

// eslint-disable-next-line no-console
console.log('Vector2D', new Vector2D().toString())
</script>

<template>
  <canvas
    ref="canvas"
    width="800"
    height="450"
    class="bg-slate-950 rounded-md ring-1 ring-gray-300 cursor-none dark:ring-gray-700"
  />
</template>
