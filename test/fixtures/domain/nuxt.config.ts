export default defineNuxtConfig({
  modules: ['../../../src/module'],
  compatibilityDate: '2025-06-06',
  llms: {
    domain: 'https://example.com',
    title: 'Nuxt LLMs module',
    full: {
      title: 'Full Documentation',
      description: 'The complete documentation',
    },
  },
})
