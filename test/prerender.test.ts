import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

// `prerender: false` only skips `addPrerenderRoutes`; both routes stay registered server handlers.
describe('prerender disabled', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/prerender-disabled', import.meta.url)),
  })

  it('still serves the /llms.txt file', async () => {
    const txt = await $fetch('/llms.txt')
    expect(txt).toContain('# Nuxt LLMs module')
  })

  it('still serves the /llms-full.txt file', async () => {
    const res = await fetch('/llms-full.txt')
    expect(res.status).toBe(200)
  })
})
