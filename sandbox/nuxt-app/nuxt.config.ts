import { type PathLike, accessSync, constants } from 'node:fs'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/test-utils/module', '@nuxt/ui'],
  $development: {
    devServer: {
      https: httpsServerFiles(),
    },
    nitro: {
      routeRules: {
        '**': {
          headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
          },
        },
      },
    },
  },
})

function httpsServerFiles() {
  const httpsServerFiles = {
    cert: import.meta.env.DEV_SERVER_CERT,
    key: import.meta.env.DEV_SERVER_KEY,
  } as const

  if (!Object.values(httpsServerFiles).every(isReadable))
    return false

  return httpsServerFiles
}

function isReadable(path: PathLike) {
  try {
    accessSync(path, constants.R_OK)

    return true
  }
  catch {
    return false
  }
}
