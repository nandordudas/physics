type MessageListener = (event: MessageEvent) => void

export function useMessageChannel() {
  const sendChannel = new MessageChannel()
  const receiveChannel = new MessageChannel()

  const sendPort = sendChannel.port1
  const receivePort = receiveChannel.port1

  receivePort.start()

  const setupReceiveHandler = (handler: MessageListener) => {
    receivePort.addEventListener('message', handler)
  }

  return {
    sendMessageToChannel: sendPort.postMessage.bind(sendPort),
    receivePort: sendChannel.port2,
    sendPort: receiveChannel.port2,
    setupReceiveHandler,
  }
}
