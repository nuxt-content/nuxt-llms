import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils/e2e'

const BOM = [0xef, 0xbb, 0xbf]

// Read raw bytes: `Response.text()` decodes with `TextDecoder`, which strips a leading BOM.
async function getBytes(path: string) {
  const res = await fetch(path)
  expect(res.status).toBe(200)
  return new Uint8Array(await res.arrayBuffer())
}

describe('bom enabled', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/bom', import.meta.url)),
  })

  it('prepends a BOM to /llms.txt', async () => {
    const bytes = await getBytes('/llms.txt')
    expect([...bytes.subarray(0, 3)]).toEqual(BOM)
    const text = new TextDecoder('utf-8', { ignoreBOM: true }).decode(bytes)
    expect(text.startsWith('\uFEFF# Модуль Nuxt LLMs')).toBe(true)
  })

  it('prepends a BOM to /llms-full.txt', async () => {
    const bytes = await getBytes('/llms-full.txt')
    expect([...bytes.subarray(0, 3)]).toEqual(BOM)
  })
})
