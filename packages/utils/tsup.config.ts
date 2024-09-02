import * as glob from 'glob'
import { defineConfig } from 'tsup'

import { name } from './package.json'

const entries = glob.sync(['**/src/lib/*.ts', 'src/index.ts'])

export default defineConfig(options => ({
  name,
  minify: !options.watch,
  dts: true,
  format: ['cjs', 'esm'],
  clean: true,
  splitting: false,
  entry: entries,
}))
