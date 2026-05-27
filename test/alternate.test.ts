import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

describe('useLlmsAlternate', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/alternate', import.meta.url)),
  })

  describe('with a literal href', () => {
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

  describe('with a getter', () => {
    it('resolves the getter and emits both hints', async () => {
      const html = await $fetch<string>('/getter')
      expect(html).toContain('href="/raw/post-from-getter.md"')

      const response = await fetch('/getter')
      expect(response.headers.get('link')).toBe(
        '</raw/post-from-getter.md>; rel="alternate"; type="text/markdown"',
      )
    })
  })

  describe('with falsy values (null, empty string, getter returning undefined)', () => {
    it('does not emit a <link rel="alternate"> tag', async () => {
      const html = await $fetch<string>('/empty')
      expect(html).not.toContain('rel="alternate"')
    })

    it('does not emit a Link header', async () => {
      const response = await fetch('/empty')
      expect(response.headers.get('link')).toBeNull()
    })
  })

  describe('on a page that does not call the composable', () => {
    it('does not emit a <link rel="alternate"> tag', async () => {
      const html = await $fetch<string>('/none')
      expect(html).not.toContain('rel="alternate"')
    })

    it('does not emit a Link header', async () => {
      const response = await fetch('/none')
      expect(response.headers.get('link')).toBeNull()
    })
  })
})
