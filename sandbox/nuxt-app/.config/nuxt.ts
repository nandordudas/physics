import { type PathLike, accessSync, constants } from 'node:fs'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    https: httpsServerFiles(),
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui'],
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
