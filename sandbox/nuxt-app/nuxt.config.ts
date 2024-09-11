export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/test-utils/module', '@vueuse/nuxt', '@nuxt/ui'],
  $development: {
    vite: {
      server: {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
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
