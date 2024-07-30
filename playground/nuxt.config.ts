export default defineNuxtConfig({
  modules: ['../src/module'],

  app: {
    head: {
      htmlAttrs: {
        class: 'hanniz',
      },
    },
  },

  colorMode: {
    preference: 'system',
    classSuffix: '',
    classPrefix: '',
    cookieName: 'hanniz-color-mode',
    dataValue: 'hanniz-color-mode',
    fallback: 'light',
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  devtools: { enabled: true },
})
