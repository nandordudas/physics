import { isDefined } from './guards'

export class SettingsMap<T extends Record<string, any>> extends Map<keyof T, T[keyof T]> {
  override set<K extends keyof T>(
    key: K,
    value: T[K],
  ): this {
    return super.set(key, value)
  }

  override get<K extends keyof T>(
    key: K,
  ): T[K] | undefined {
    return super.get(key) as T[K] | undefined
  }

  getOrDefault<K extends keyof T>(
    key: K,
    defaultValue: T[K],
  ): T[K] {
    const value = this.get(key)

    return isDefined(value) ? value : defaultValue
  }
}
