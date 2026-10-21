export default defineNuxtConfig({
  modules: ['../../../src/module'],
  compatibilityDate: '2025-06-06',
  llms: {
    domain: 'https://llms.nuxt.com',
    title: 'Nuxt LLMs module',
  },
})
