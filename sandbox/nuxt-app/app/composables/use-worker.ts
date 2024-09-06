import type { Constructor } from '@workspace/utils'

type WorkerMessageTypes = Record<string, any>

interface WorkerMessage<T extends string, D = any> {
  type: T
  data?: D
}

export function useWorker<T extends WorkerMessageTypes>(
  WorkerConstructor: Constructor<Worker>,
  options?: {
    name?: string
  },
) {
  const worker = new WorkerConstructor(options)

  function sendMessageToWorker<K extends keyof T>(
    message: WorkerMessage<K & string, T[K]>,
    options?: StructuredSerializeOptions,
  ) {
    worker.postMessage(message, options)
  }

  function stop(): void {
    worker.terminate()
  }

  onScopeDispose(stop)

  return {
    sendMessageToWorker,
    worker,
  }
}
