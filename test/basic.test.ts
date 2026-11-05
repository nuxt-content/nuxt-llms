import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('renders the /llms.txt file', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/llms.txt')
    expect(html).toContain('# Nuxt LLMs module')
  })

  it('does not prepend a BOM to the prerendered /llms.txt by default', async () => {
    // Read raw bytes: `Response.text()` strips a leading BOM.
    const bytes = new Uint8Array(await (await fetch('/llms.txt')).arrayBuffer())
    expect([...bytes.subarray(0, 3)]).not.toEqual([0xef, 0xbb, 0xbf])
  })
})
