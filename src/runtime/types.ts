import type { H3Event } from 'h3'

declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'llms:generate': (event: H3Event, options: ModuleOptions) => void
    'llms:generate:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
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
}
