import { createHooks } from 'hookable'
import { useServerHooks } from 'nuxt/server'
import type { NuxtServerHooks, RequestEvent } from 'nuxt/server'
import type { ModuleOptions } from 'nuxt-llms'

/**
 * @deprecated Custom hooks are deprecated in favor of NuxtServerHooks.
 */
export interface LLMSHooks {
  generate: (event: RequestEvent, options: ModuleOptions) => void
  'generate:full': (event: RequestEvent, options: ModuleOptions, contents: string[]) => void
}

/**
 * @deprecated Custom hooks are deprecated in favor of NuxtServerHooks.
 */
export const llmsHooks = createHooks<LLMSHooks>()

llmsHooks.beforeEach(() => {
  // @ts-expect-error - `_hooks` is private
  const hooks = Object.values(llmsHooks._hooks || {})
  const hasRegisteredHook = hooks.some(
    (hooksList) => Array.isArray(hooksList) && hooksList.length > 0,
  )

  if (hasRegisteredHook) {
    console.warn(
      "[nuxt-llms] `llmsHooks` are deprecated and will be removed in future versions. Use `useServerHooks().hook('llms:generate', (event, options) => {})` instead",
    )
  }
})

/**
 * Run a callback when LLMs is being generated.
 *
 * @deprecated Use `useServerHooks().hook('llms:generate', (event, options) => {})` instead
 */
export function onLLMsGenerate(cb: NuxtServerHooks['llms:generate']) {
  return useServerHooks().hook('llms:generate', cb)
}

/**
 * Run a callback when Full LLMs is being generated.
 *
 * @deprecated Use `useServerHooks().hook('llms:generate:full', (event, options, contents) => {})` instead
 */
export function onLLMsGenerateFull(cb: NuxtServerHooks['llms:generate:full']) {
  return useServerHooks().hook('llms:generate:full', cb)
}
