export default defineNuxtConfig({
  modules: ['../src/module'],

  colorMode: {
    preference: 'system',
    classSuffix: '',
    classPrefix: '',
    cookieName: 'hanniz-color-mode',
    dataValue: 'hanniz-color-mode',
    fallback: 'dark',
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  devtools: { enabled: true },
})
