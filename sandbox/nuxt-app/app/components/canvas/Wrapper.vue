<script setup lang="ts">
import { consola } from 'consola/browser'
import Worker from '~/lib/workers/physics/worker?worker'

defineOptions({
  inheritAttrs: false,
})

interface WorkerData {
  init: {
    offscreenCanvas: OffscreenCanvas
    sharedBuffer: SharedArrayBuffer
    receivePort: MessagePort
    sendPort: MessagePort
  }
}

interface ChannelData {
  pong: void
}

const { canvasRef, watchCanvas } = useCanvas()
const { sendMessageToWorker } = useWorker<WorkerData>(Worker, { name: 'Physics Worker' })
const { sendMessageToChannel, receivePort, sendPort, setupReceiveHandler } = useMessageChannel<ChannelData>()
const { sharedBuffer, updateKeyData, updateMouseData } = useSharedData()

setupReceiveHandler((event) => {
  consola.log('Received message from port:', event.data)

  sendMessageToChannel({ type: 'pong' })
})

watchCanvas((offscreenCanvas) => {
  sendMessageToWorker({
    type: 'init',
    data: { offscreenCanvas, sharedBuffer, receivePort, sendPort },
  }, { transfer: [offscreenCanvas, sendPort, receivePort] })
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
