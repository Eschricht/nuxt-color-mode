import { defineNuxtModule, addPlugin, createResolver, addTemplate, addImports } from '@nuxt/kit'
import type { useCookie } from 'nuxt/app'

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

export interface ModuleOptions {
  /**
   * The default value of $colorMode.preference
   * @default 'system'
   */
  preference: string

  /**
   * The fallback value of $colorMode.preference when the system color mode is not available
   * @default 'light'
   */
  fallback: string

  /**
   * The default theme name to use when system is dark mode
   * @default 'dark'
   */
  systemDarkName: string

  /**
   * The default theme name to use when system is light mode
   * @default 'light'
   */
  systemLightName: string

  /**
   * The class prefix that will be added to the HTML element
   * @default ''
   */
  classPrefix: string

  /**
   * The class suffix that will be added to the HTML element
   * @default '-mode'
   */
  classSuffix: string

  /**
   * Whether to add a data attribute to the html tag. If set, it defines the key of the data attribute.
   * For example, setting this to `theme` will output `<html data-theme="dark">` if dark mode is enabled.
   * @default ''
   */
  dataValue: string

  /**
   * The cookie name that will be used to store the color mode preference
   * @default 'color-mode'
   */
  cookieName: string

  /**
   * The cookie options that will be passed to the `useCookie` function
   * @default {}
   */
  cookieOptions: Pick<Parameters<typeof useCookie>[1], 'domain' | 'sameSite' | 'expires' | 'maxAge' | 'httpOnly' | 'secure' | 'path' | 'priority' | 'partitioned'>
}
