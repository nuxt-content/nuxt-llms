import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

describe('useLlmsAlternate', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/alternate', import.meta.url)),
  })

  it('emits a <link rel="alternate" type="text/markdown"> in the document head', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('rel="alternate"')
    expect(html).toContain('type="text/markdown"')
    expect(html).toContain('href="/raw/index.md"')
  })

  it('emits a Link HTTP response header', async () => {
    const response = await fetch('/')
    expect(response.headers.get('link')).toBe(
      '</raw/index.md>; rel="alternate"; type="text/markdown"',
    )
  })
})
