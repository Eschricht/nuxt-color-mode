import type { MaybeRef } from '#imports'
import type { ColorModeState } from './composable'
import { classPrefix, classSuffix, cookieName, cookieOptions, dataValue, fallback, preference, systemDarkName, systemLightName } from '#color-mode-options'
import { computed, defineNuxtPlugin, reactive, unref, useCookie, useHead, useRequestHeaders, useRouter, useState } from '#imports'
import { useClientPreferredColorScheme } from './useClientPreferredColorScheme'

function normalizeClassName(value: string) {
  // Replace uppercase letters with a dash followed by the lowercase letter
  const kebabCase = value.replace(/([a-z0-9])([A-Z])/g, '$1-$2')

  // Replace non-alphanumeric characters with a dash
  const normalized = kebabCase.replace(/[^a-z0-9-]/gi, '-')

  // Remove leading and trailing dashes
  const trimmed = normalized.replace(/^-+|-+$/g, '')

  // Replace consecutive dashes with a single dash
  const final = trimmed.replace(/-{2,}/g, '-')

  return final.toLowerCase()
}

function isValidSystemColorMode(value: string): value is 'dark' | 'light' {
  return ['dark', 'light'].includes(value)
}

function reverseValue(value: 'dark' | 'light') {
  return value === 'dark' ? 'light' : 'dark'
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
    const normalizedValue = normalizeClassName(unref(value))

    return `${classPrefix}${normalizedValue}${classSuffix}`
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
