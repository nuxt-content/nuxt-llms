export default defineNuxtConfig({
  modules: ['../../../src/module'],
  compatibilityDate: '2025-06-06',
  llms: {
    domain: 'https://llms.nuxt.com',
    title: 'Модуль Nuxt LLMs',
    bom: true,
    full: {
      title: 'Nuxt LLMs module full documentation',
      description: 'The complete documentation',
    },
  },
})
