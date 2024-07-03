import type { useCookie } from '#app'

declare module 'vue-router' {
  interface RouteMeta {
    colorMode?: string
  }
}

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
