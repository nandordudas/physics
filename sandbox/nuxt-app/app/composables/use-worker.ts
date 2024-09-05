import type { Constructor } from '@workspace/utils'

export function useWorker(
  WorkerConstructor: Constructor<Worker>,
  options?: {
    name?: string
  },
) {
  const worker = new WorkerConstructor(options)

  onUnmounted(() => {
    worker.terminate()
  })

  return worker
}
