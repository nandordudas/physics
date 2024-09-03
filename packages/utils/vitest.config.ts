import { defineConfig } from 'vitest/config'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
  resolve: {
    alias: {
      '~/': root,
    },
  },
  test: {
    coverage: {
      include: ['**/lib/**/*.ts'],
    },
  },
})
