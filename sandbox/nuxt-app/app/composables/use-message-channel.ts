type ChannelMessageTypes = Record<string, any>

interface ChannelMessage<T extends string, D = any> {
  type: T
  data?: D
}

type MessageListener<T extends ChannelMessageTypes> = (
  event: MessageEvent<ChannelMessage<keyof T & string, T[keyof T]>>
) => void

export function useMessageChannel<T extends ChannelMessageTypes>() {
  const sendChannel = new MessageChannel()
  const receiveChannel = new MessageChannel()

  receiveChannel.port1.start()

  const setupReceiveHandler = (handler: MessageListener<T>) => {
    receiveChannel.port1.addEventListener('message', handler)
  }

  const sendMessageToChannel = <K extends keyof T>(
    message: ChannelMessage<K & string, T[K]>,
    options?: StructuredSerializeOptions,
  ) => {
    sendChannel.port1.postMessage(message, options)
  }

  function stop(): void {
    sendChannel.port1.close()
    receiveChannel.port1.close()
  }

  onScopeDispose(stop)

  return {
    sendMessageToChannel,
    // Swap the ports to ensure they are used correctly on the Web Worker side
    receivePort: sendChannel.port2,
    sendPort: receiveChannel.port2,
    setupReceiveHandler,
  }
}
