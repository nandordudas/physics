<script setup lang="ts">
import Worker from '~/lib/workers/physics/worker?worker'

defineOptions({
  inheritAttrs: false,
})

const { canvasRef, watchCanvas } = useCanvas()
const worker = useWorker(Worker, { name: 'Physics Worker' })
const { sendMessageToChannel, receivePort, sendPort, setupReceiveHandler } = useMessageChannel()
const { sharedBuffer, updateKeyData, updateMouseData } = useSharedData()

setupReceiveHandler((event) => {
  // eslint-disable-next-line no-console
  console.log('Received message from port:', event.data)

  sendMessageToChannel({ type: 'pong' })
})

watchCanvas((offscreenCanvas) => {
  worker.postMessage({
    type: 'init',
    data: {
      offscreenCanvas,
      sharedBuffer,
      receivePort,
      sendPort,
    },
  }, [offscreenCanvas, sendPort, receivePort])
})

onMounted(() => {
  const canvasEl = canvasRef.value?.canvasRef

  useEventListener(canvasEl, ['mouseup', 'mousedown', 'mousemove'], updateMouseData)
  useEventListener(['keydown', 'keyup'], updateKeyData)
})
</script>

<template>
  <Canvas ref="canvasRef" v-bind="$attrs" />
</template>
