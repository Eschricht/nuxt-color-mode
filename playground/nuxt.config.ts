export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/eslint'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        class: 'hanniz',
      },
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    classSuffix: '',
    classPrefix: '',
    cookieName: 'hanniz-color-mode',
    dataValue: 'hanniz-color-mode',
    fallback: 'light',
  },

  future: {
    compatibilityVersion: 4,
  },

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
