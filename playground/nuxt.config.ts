export default defineNuxtConfig({
  modules: ['@nuxt/content', 'nuxt-llms'],
  devtools: { enabled: true },

  content: {
    experimental: { sqliteConnector: 'native' },
  },

  compatibilityDate: '2025-02-20',

  llms: {
    domain: 'https://nuxt.com',
    full: {
      title: 'Nuxt Documentation',
      description: 'The complete documentation for Nuxt',
    },
  },
})
