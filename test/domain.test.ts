import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('./fixtures/domain', import.meta.url))

describe('domain without trailing slash', async () => {
  await setup({ rootDir })

  it('links /llms-full.txt from the /llms.txt file', async () => {
    const txt = await $fetch('/llms.txt')
    expect(txt).toContain('(https://example.com/llms-full.txt)')
  })
})

describe('domain with trailing slash', async () => {
  await setup({
    rootDir,
    nuxtConfig: { llms: { domain: 'https://example.com/' } },
  })

  it('links /llms-full.txt from the /llms.txt file', async () => {
    const txt = await $fetch('/llms.txt')
    expect(txt).toContain('(https://example.com/llms-full.txt)')
  })
})
