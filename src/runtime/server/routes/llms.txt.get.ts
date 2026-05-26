import { eventHandler, setHeader } from 'h3'
import { llmsHooks } from 'nuxt-llms/runtime'
import type { ModuleOptions } from 'nuxt-llms'
// @ts-expect-error - useNitroApp is not typed
import { useRuntimeConfig, useNitroApp } from '#imports'

export default eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms as ModuleOptions

  const llms: ModuleOptions = JSON.parse(JSON.stringify(options))

  await useNitroApp().hooks.callHook('llms:generate', event, llms)
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

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return document.join('\n\n')
})
