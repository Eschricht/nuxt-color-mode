import { defineNuxtPlugin, useCookie, useRequestHeaders } from '#app'
import { useHead, useState, computed, reactive } from '#imports'
import { preference, cookieOptions, cookieName, classPrefix, classSuffix, dataValue, fallback, systemDarkName, systemLightName } from '#color-mode-options'

function isValidSystemColorMode(value: string): value is 'dark' | 'light' {
  return ['dark', 'light'].includes(value)
}

export default defineNuxtPlugin<{
  colorMode: {
    preference: string
    readonly system: 'dark' | 'light' | undefined
    readonly value: string
  }
}>((_nuxtApp) => {
  const cookieValue = useCookie(cookieName, {
    ...cookieOptions,
    default: () => preference,
  })

  const header = useRequestHeaders()

  const systemValue = useState<'dark' | 'light' | undefined>('system', () => isValidSystemColorMode(header['sec-ch-prefers-color-scheme']) ? header['sec-ch-prefers-color-scheme'] : undefined)

  const resolvedValue = computed(() => {
    if (cookieValue.value === 'system') {
      switch (systemValue.value) {
        case 'dark':
          return systemDarkName
        case 'light':
          return systemLightName
        default:
          return fallback
      }
    }

    return cookieValue.value
  })

  useHead({
    htmlAttrs: {
      class: () => `${classPrefix}${resolvedValue.value}${classSuffix}`,
      ...dataValue ? { [`data-${dataValue}`]: resolvedValue } : {},
    },
  })

  return {
    provide: {
      colorMode: reactive({
        preference: cookieValue,
        system: systemValue,
        value: resolvedValue,
      }),
    },
  }
})
