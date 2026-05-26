import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addPrerenderRoutes,
  addServerImports,
  useLogger,
} from '@nuxt/kit'
import { version } from '../package.json'
import type { ModuleOptions } from './runtime/types'

export type * from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-llms',
    configKey: 'llms',
    version,
    docs: 'https://github.com/nuxtlabs/nuxt-llms',
  },
  defaults: {},
  setup(options, nuxt) {
    const logger = useLogger('nuxt-llms')
    const { resolve } = createResolver(import.meta.url)

    const llmsConfig = (nuxt.options.runtimeConfig.llms = {
      domain: options.domain,
      title: options.title,
      description: options.description,
      notes: options.notes || [],
      sections: options.sections || [],
    })

    if (!options.domain) {
      logger.warn('nuxt-llms require a domain to be set. `llms.domain` is missing.')
      return
    }

    addServerImports([{ name: 'llmsHooks', from: resolve('./runtime/server/utils/hooks') }])
    addServerHandler({
      route: '/llms.txt',
      handler: resolve('./runtime/server/routes/llms.txt.get'),
    })
    addPrerenderRoutes('/llms.txt')

    if (options.full) {
      llmsConfig.sections.unshift({
        title: 'Documentation Sets',
        links: [
          {
            title: options.full.title,
            description: options.full.description,
            href: `${options.domain}/llms-full.txt`,
          },
        ],
      })
      addServerHandler({
        route: '/llms-full.txt',
        handler: resolve('./runtime/server/routes/llms-full.txt.get'),
      })
      addPrerenderRoutes('/llms-full.txt')
    }
  },
})
