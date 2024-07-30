import { computed, getCurrentScope, onNuxtReady, onScopeDispose, ref, useNuxtApp, watchEffect, type ComputedRef } from '#imports'

function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
  }
}

function isSupported() {
  return window && 'matchMedia' in window && typeof window.matchMedia === 'function'
}

// A function to return the preferred color scheme of the user as a reactive value (ref).
// Is auto updated via listeners on the window.matchMedia event.
// Cleanup listener
function usePreferredColorSchemeByColor(color: 'dark' | 'light') {
  let mediaQuery: MediaQueryList | undefined
  const matches = ref(false)

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  const cleanup = () => {
    if (!mediaQuery)
      return
    if ('removeEventListener' in mediaQuery)
      mediaQuery.removeEventListener('change', handler)
    else
    // @ts-expect-error deprecated API
      mediaQuery.removeListener(handler)
  }

  const stopWatch = watchEffect(() => {
    if (!isSupported())
      return

    cleanup()

    mediaQuery = window!.matchMedia(`(prefers-color-scheme: ${color})`)

    if ('addEventListener' in mediaQuery)
      mediaQuery.addEventListener('change', handler)
    else
    // @ts-expect-error deprecated API
      mediaQuery.addListener(handler)

    matches.value = mediaQuery.matches
  })

  tryOnScopeDispose(() => {
    stopWatch()
    cleanup()
    mediaQuery = undefined
  })

  return matches
}

export function useClientPreferredColorScheme(): ComputedRef<'dark' | 'light' | undefined> {
  const nuxtApp = useNuxtApp()
  const isHydrating = ref<undefined | boolean>(undefined)

  onNuxtReady(() => {
    isHydrating.value = import.meta.client ? nuxtApp.isHydrating : undefined
  })

  return computed(() => {
    if (isHydrating.value === false) {
      const dark = usePreferredColorSchemeByColor('dark')
      const light = usePreferredColorSchemeByColor('light')

      return dark.value ? 'dark' : light.value ? 'light' : undefined
    }

    return undefined
  })
}
