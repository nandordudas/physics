<script setup lang="ts">
const canvasProps = {
  width: 800,
  height: 450,
} as const
</script>

<template>
  <Canvas v-bind="canvasProps" />
</template>
