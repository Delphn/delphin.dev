// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false, // Disable SSR in WebContainer environment
  app: {
    head: {
      title: 'Delphin Rukundo - Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional portfolio of Delphin Rukundo - Software Engineer' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt'
  ],
  nitro: {
    preset: 'node'
  },
  // Add YAML support
  vite: {
    assetsInclude: ['**/*.yaml'],
    optimizeDeps: {
      include: ['firebase/app', 'firebase/analytics']
    }
  }
})