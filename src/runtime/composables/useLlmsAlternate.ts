import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { setResponseHeader } from 'h3'
import { useHead, useRequestEvent } from '#imports'

/**
 * Advertise a markdown alternate of the current page so AI agents can
 * discover and fetch the markdown version instead of parsing HTML.
 *
 * Emits two discovery hints (RFC 8288):
 *  - `<link rel="alternate" type="text/markdown" href="...">` in the document head
 *  - `Link: <...>; rel="alternate"; type="text/markdown"` HTTP response header (server only)
 *
 * @example
 * ```ts
 * // app/pages/blog/[slug].vue
 * useLlmsAlternate(`/raw/blog/${route.params.slug}.md`)
 * ```
 *
 * Accepts a string, ref, or getter. Falsy values are ignored, so it is safe to
 * call before async data has resolved.
 */
export function useLlmsAlternate(href: MaybeRefOrGetter<string | null | undefined>): void {
  const resolved = computed(() => toValue(href) || null)

  useHead({
    link: () => {
      const value = resolved.value
      return value ? [{ rel: 'alternate', type: 'text/markdown', href: value }] : []
    },
  })

  if (import.meta.server) {
    const value = resolved.value
    if (!value) return
    const event = useRequestEvent()
    if (!event) return
    setResponseHeader(event, 'Link', `<${value}>; rel="alternate"; type="text/markdown"`)
  }
}
