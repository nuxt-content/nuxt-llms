import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addPrerenderRoutes,
  addServerImports,
  addImports,
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
  defaults: {
    prerender: true,
  },
  setup(options, nuxt) {
    const logger = useLogger('nuxt-llms')
    const { resolve } = createResolver(import.meta.url)

    addImports({
      name: 'useLlmsAlternate',
      from: resolve('./runtime/composables/useLlmsAlternate'),
    })

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

    addServerImports([
      {
        name: 'llmsHooks',
        from: {
          nuxt: resolve('./runtime/server/utils/hooks'),
          nitro2: resolve('./runtime/server/utils/hooks.legacy'),
        },
      },
    ])
    addServerHandler({
      route: '/llms.txt',
      handler: {
        nuxt: resolve('./runtime/server/routes/llms.txt.get'),
        nitro2: resolve('./runtime/server/routes/llms.txt.get.legacy'),
      },
    })
    if (options.prerender !== false) {
      addPrerenderRoutes('/llms.txt')
    }

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
        handler: {
          nuxt: resolve('./runtime/server/routes/llms-full.txt.get'),
          nitro2: resolve('./runtime/server/routes/llms-full.txt.get.legacy'),
        },
      })
      if (options.prerender !== false) {
        addPrerenderRoutes('/llms-full.txt')
      }
    }
  },
})
