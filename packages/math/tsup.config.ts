import { defineConfig } from 'tsup'

import { name } from './package.json'

export default defineConfig(options => ({
  name,
  minify: !options.watch,
  dts: true,
  format: ['cjs', 'esm'],
  clean: true,
  splitting: false,
  entry: ['src/index.ts'],
}))
