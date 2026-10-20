import { defineEventHandler, useRuntimeConfig, useServerHooks } from 'nuxt/server'
import type { ModuleOptions } from 'nuxt-llms'
import { llmsHooks } from '../utils/hooks'

export default defineEventHandler(async (event) => {
  const options = useRuntimeConfig().llms as ModuleOptions

  const contents = [] as string[]
  const llms: ModuleOptions = JSON.parse(JSON.stringify(options))

  await useServerHooks().callHook('llms:generate:full', event, llms, contents)
  await llmsHooks.callHook('generate:full', event, llms, contents)

  event.res.headers.set('Content-Type', 'text/plain; charset=utf-8')
  return contents.join('\n\n')
})
