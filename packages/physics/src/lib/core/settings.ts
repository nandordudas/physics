export class Settings<T extends Record<string, any>> {
  #store: Map<keyof T, T[keyof T]> = new Map()

  get size(): number {
    return this.#store.size
  }

  set<K extends keyof T>(
    key: K,
    value: T[K],
  ): void {
    this.#store.set(key, value)
  }

  get<K extends keyof T>(key: K): T[K] | undefined {
    return this.#store.get(key) as T[K] | undefined
  }

  getOrDefault<K extends keyof T>(
    key: K,
    defaultValue: T[K],
  ): T[K] {
    const value = this.get(key)

    return value !== undefined ? value : defaultValue
  }

  has(key: keyof T): boolean {
    return this.#store.has(key)
  }

  delete(key: keyof T): boolean {
    return this.#store.delete(key)
  }

  clear(): void {
    this.#store.clear()
  }
}
