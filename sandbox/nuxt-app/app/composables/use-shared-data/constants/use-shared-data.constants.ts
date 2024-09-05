export enum MouseButton {
  Primary = 1,
  Secondary = 2,
}

export const byteOffsets = {
  // Constants for element sizes
  MOUSE_STATE_PADDING: 1, // 1 byte padding to align the next Uint16Array
  KEY_CODE_COUNT: 10,
  MOUSE_COORDINATES_SIZE: 2 * Uint16Array.BYTES_PER_ELEMENT, // 4 bytes for x and y coordinates
  MOUSE_STATE_SIZE: Uint8Array.BYTES_PER_ELEMENT, // 1 byte for mouse state
  ACTIVE_KEYS_COUNT_SIZE: Uint8Array.BYTES_PER_ELEMENT, // 1 byte to store the count of active keys
  UPDATE_FLAG_SIZE: Int32Array.BYTES_PER_ELEMENT, // 4 bytes for update flag

  // Methods to compute derived sizes
  get keyCodeSize(): number {
    return this.KEY_CODE_COUNT * Uint16Array.BYTES_PER_ELEMENT // Size for 10 key codes (20 bytes)
  },
  get paddingSize(): number {
    return (4 - (this.occupiedSize % 4)) % 4 // Compute padding to align to 4-byte boundary
  },

  // Offset positions
  get mouseStateOffset(): [number, number] {
    return [this.MOUSE_COORDINATES_SIZE, 1] // Mouse state offset after mouse coordinates
  },
  get keyCodesOffset(): [number, number] {
    const offset = this.MOUSE_COORDINATES_SIZE + this.MOUSE_STATE_SIZE + this.MOUSE_STATE_PADDING

    return [offset, this.KEY_CODE_COUNT]
  },
  get activeKeysCountOffset(): [number, number] {
    const offset = this.keyCodesOffset[0] + this.keyCodeSize // After key codes

    return [offset, 1]
  },
  get updateFlagOffset(): [number, number] {
    const offset = this.occupiedSize + this.paddingSize

    return [offset, 1]
  },

  // Aggregate sizes
  get occupiedSize(): number {
    return this.keyCodesOffset[0] + this.keyCodeSize + this.ACTIVE_KEYS_COUNT_SIZE // Size occupied before padding
  },
  get totalBufferSize(): number {
    return this.updateFlagOffset[0] + this.UPDATE_FLAG_SIZE // Total buffer size including the update flag
  },
} as const
