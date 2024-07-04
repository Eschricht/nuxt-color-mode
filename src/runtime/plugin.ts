import type { ColorModeState } from './composable'
import { useClientPreferredColorScheme } from './useClientPreferredColorScheme'
import { defineNuxtPlugin, useCookie, useRequestHeaders, useRouter } from '#app'
import { useHead, useState, computed, reactive, type MaybeRef, unref } from '#imports'
import { preference, cookieOptions, cookieName, classPrefix, classSuffix, dataValue, fallback, systemDarkName, systemLightName } from '#color-mode-options'

function isValidSystemColorMode(value: string): value is 'dark' | 'light' {
  return ['dark', 'light'].includes(value)
}

export default defineNuxtPlugin<{
  colorMode: ColorModeState
}>((_nuxtApp) => {
  const cookieValue = useCookie(cookieName, {
    ...cookieOptions,
    default: () => preference,
  })

  const header = useRequestHeaders()
  const router = useRouter()

  const reverseValue = (value: 'dark' | 'light') => (value === 'dark' ? 'light' : 'dark')

  const systemValue = useState<'dark' | 'light' | undefined>('system', () => isValidSystemColorMode(header['sec-ch-prefers-color-scheme']) ? header['sec-ch-prefers-color-scheme'] : undefined)
  const forcedValue = useState<string | undefined>('forced', () => undefined)
  const browserPreferredColorScheme = useClientPreferredColorScheme()

  const systemValueResolved = computed(() => browserPreferredColorScheme.value ?? systemValue.value)

  const resolvedValue = computed(() => {
    if (forcedValue.value === 'system' || cookieValue.value === 'system') {
      switch (systemValueResolved.value) {
        case 'dark':
          return systemDarkName
        case 'light':
          return systemLightName
        default:
          return fallback
      }
    }

    return forcedValue.value || cookieValue.value
  })

  function getClassName(value: MaybeRef<string>) {
    return `${classPrefix}${unref(value)}${classSuffix}`
  }

  const className = computed(() => getClassName(resolvedValue.value))

  // Cleanup mismatched system class between server and client (otherwise the HTML element will have dual system classes)
  if (import.meta.client && document && (forcedValue.value === 'system' || cookieValue.value === 'system')) {
    if (!document.documentElement.classList.contains(getClassName(resolvedValue))) {
      document.documentElement.classList.remove(getClassName(reverseValue(resolvedValue.value as 'dark' | 'light')))
    }
  }

  useHead({
    htmlAttrs: {
      class: className,
      ...dataValue ? { [`data-${dataValue}`]: resolvedValue } : {},
    },
  })

  router.beforeEach((to) => {
    forcedValue.value = to.meta.colorMode
  })

  return {
    provide: {
      colorMode: reactive({
        preference: cookieValue,
        system: systemValueResolved,
        value: resolvedValue,
        forcedValue,
      }),
    },
  }
})
