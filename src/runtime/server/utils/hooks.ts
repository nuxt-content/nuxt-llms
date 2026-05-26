import { createHooks } from 'hookable'
import type { H3Event } from 'h3'
import type { NitroRuntimeHooks } from 'nitropack/types'
import type { ModuleOptions } from 'nuxt-llms'
// @ts-expect-error - useNitroApp is not typed
import { useNitroApp } from '#imports'

/**
 * @deprecated Custom hooks are deprecated in favor of NitroRuntimeHooks.
 */
export interface LLMSHooks {
  generate: (event: H3Event, options: ModuleOptions) => void
  'generate:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
}

/**
 * @deprecated Custom hooks are deprecated in favor of NitroRuntimeHooks.
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
      "[nuxt-llms] `llmsHooks` are deprecated and will be removed in future versions. Use `useNitroApp().hooks.hook('llms:generate', (event, options) => {})` instead",
    )
  }
})

/**
 * Run a callback when LLMs is being generated.
 *
 * @deprecated Use `useNitroApp().hooks.hook('llms:generate', (event, options) => {})` instead
 */
export function onLLMsGenerate(cb: NitroRuntimeHooks['llms:generate']) {
  return useNitroApp().hooks.hook('llms:generate', cb)
}

/**
 * Run a callback when Full LLMs is being generated.
 *
 * @deprecated Use `useNitroApp().hooks.hook('llms:generate:full', (event, options, contents) => {})` instead
 */
export function onLLMsGenerateFull(cb: NitroRuntimeHooks['llms:generate:full']) {
  return useNitroApp().hooks.hook('llms:generate:full', cb)
}
