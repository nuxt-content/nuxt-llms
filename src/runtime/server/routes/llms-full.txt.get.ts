import { eventHandler, setHeader } from 'h3'
import type { ModuleOptions } from 'nuxt-llms'
import { llmsHooks } from 'nuxt-llms/runtime'
import { useRuntimeConfig, useNitroApp } from 'nitropack/runtime'

export default eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms as ModuleOptions

  const contents = [] as string[]
  const llms: ModuleOptions = JSON.parse(JSON.stringify(options))

  await useNitroApp().hooks.callHook('llms:generate:full', event, llms, contents)
  await llmsHooks.callHook('generate:full', event, llms, contents)

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return contents.join('\n\n')
})
