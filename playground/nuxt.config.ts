export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtColorMode: {
    preference: 'system',
    classSuffix: '-hanniz',
    classPrefix: 'hanniz-',
    cookieName: 'hanniz-color-mode',
    cookieOptions: {
      secure: true,
    },
    dataValue: 'hanniz-color-mode',
    fallback: 'dark',
    systemDarkName: 'pale-dark',
    systemLightName: 'pale-light',
  },
  devtools: { enabled: true },
})
