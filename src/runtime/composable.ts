import { reactive, toRefs, useNuxtApp } from '#imports'

export interface ColorModeState {
  forcedValue: string | undefined
  preference: string
  readonly system: 'dark' | 'light' | undefined
  readonly value: string
}

export function useColorMode() {
  const { $colorMode } = useNuxtApp() as ReturnType<typeof useNuxtApp> & { $colorMode: ColorModeState }

  const {
    forcedValue,
    preference,
    system,
    value,
  } = toRefs($colorMode)

  const forceColorMode = (value?: string | undefined) => {
    forcedValue.value = value || undefined
  }

  return reactive({
    forcedValue,
    preference,
    system,
    value,
    forceColorMode,
  }) as typeof $colorMode & { forceColorMode: (value: string) => void }
}

export default useColorMode
