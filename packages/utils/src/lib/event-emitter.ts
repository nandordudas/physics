type EventHandler<T = any> = (event: T) => void

export class EventEmitter<T extends Record<PropertyKey, any> = Record<PropertyKey, any>> {
  #listeners = new Map<PropertyKey, EventHandler[]>()

  on<K extends keyof T>(
    event: K,
    listener: EventHandler<T[K]>,
  ): void {
    if (!this.#listeners.has(event))
      this.#listeners.set(event, [])

    this.#listeners.get(event)!.push(listener)
  }

  once<K extends keyof T>(
    event: K,
    listener: EventHandler<T[K]>,
  ): void {
    const onceListener: EventHandler<T[K]> = (data) => {
      listener(data)
      this.off(event, onceListener)
    }

    this.on(event, onceListener)
  }

  off<K extends keyof T>(
    event: K,
    listener: EventHandler<T[K]>,
  ): void {
    if (!this.#listeners.has(event))
      return

    this.#listeners.set(event, this.#listeners.get(event)!.filter(l => l !== listener))
  }

  emit<K extends keyof T>(
    event: K,
    data: T[K],
  ): void {
    if (!this.#listeners.has(event))
      return

    for (const listener of this.#listeners.get(event)!)
      listener(data)
  }
}
