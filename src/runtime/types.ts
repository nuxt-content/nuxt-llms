import type { H3Event } from 'h3'

/**
 * The request event `nuxt/server` passes to hooks on Nuxt 5. Declared here since
 * `nuxt/schema` only exports `RequestEvent` from Nuxt 4.6.
 */
export interface LLMsRequestEvent {
  readonly req: Request
  url: URL
  readonly res: { status?: number; statusText?: string; readonly headers: Headers }
  readonly context: object
}

declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'llms:generate': (event: H3Event, options: ModuleOptions) => void
    'llms:generate:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
  }
}

declare module 'nuxt/schema' {
  interface NuxtServerHooks {
    'llms:generate': (event: LLMsRequestEvent, options: ModuleOptions) => void
    'llms:generate:full': (
      event: LLMsRequestEvent,
      options: ModuleOptions,
      contents: string[],
    ) => void
  }
}

export interface LLMsSection {
  title: string
  description?: string
  links?: Array<{
    title: string
    description?: string
    href: string
  }>
}

export interface ModuleOptions {
  /**
   * Domain of the documentation
   */
  domain: string
  /**
   * Enable the full documentation
   */
  full?: {
    title: string
    description: string
  }
  sections: Array<LLMsSection>
  title?: string
  description?: string
  notes?: string[]
  /**
   * Prerender `/llms.txt` and `/llms-full.txt` at build time.
   * Disable to serve them dynamically, for example with ISR.
   * @default true
   */
  prerender?: boolean
}
