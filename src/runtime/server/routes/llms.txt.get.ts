import { defineEventHandler, useRuntimeConfig, useServerHooks } from 'nuxt/server'
import type { ModuleOptions } from 'nuxt-llms'
import { llmsHooks } from '../utils/hooks'

export default defineEventHandler(async (event) => {
  const options = useRuntimeConfig().llms as ModuleOptions

  const llms: ModuleOptions = JSON.parse(JSON.stringify(options))

  await useServerHooks().callHook('llms:generate', event, llms)
  await llmsHooks.callHook('generate', event, llms)

  const document = [`# ${llms.title || 'Documentation'}`]

  if (llms.description) {
    document.push(`> ${llms.description}`)
  }

  for (const section of llms.sections) {
    document.push(`## ${section.title}`)
    if (section.description) {
      document.push(section.description)
    }
    document.push(
      section.links
        ?.map((link) => {
          return link.description
            ? `- [${link.title}](${link.href}): ${link.description}`
            : `- [${link.title}](${link.href})`
        })
        .join('\n') || '',
    )
  }

  if (options.notes && options.notes.length) {
    document.push('## Notes', (options.notes || []).map((note) => `- ${note}`).join('\n'))
  }

  event.res.headers.set('Content-Type', 'text/plain; charset=utf-8')
  return document.join('\n\n')
})
