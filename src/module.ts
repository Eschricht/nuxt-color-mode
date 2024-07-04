import { defineNuxtModule, addPlugin, createResolver, addTemplate, addImports } from '@nuxt/kit'
import type { ModuleOptions } from './runtime/types'

export default defineNuxtModule<Partial<ModuleOptions>>({
  meta: {
    name: '@eschricht/nuxt-color-mode',
    configKey: 'colorMode',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    preference: 'system',
    fallback: 'light',
    systemDarkName: 'dark',
    systemLightName: 'light',
    classPrefix: '',
    classSuffix: '-mode',
    dataValue: '',
    cookieName: 'color-mode',
    cookieOptions: {},
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add a new NitroPack plugin that will set page headers to get the system color mode
    _nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.plugins = nitroConfig.plugins ?? []
      nitroConfig.plugins.push(resolver.resolve('./runtime', 'nitro-plugin'))
    })

    _nuxt.options.alias['#color-mode-options'] = addTemplate({
      filename: 'color-mode-options.mjs',
      getContents: () => Object.entries(_options).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst

    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({ name: 'useColorMode', as: 'useColorMode', from: resolver.resolve('./runtime/composable') })
  },
})
