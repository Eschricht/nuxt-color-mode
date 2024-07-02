import { useNuxtApp } from '#imports'

export interface ColorModeState {
  preference: string
  readonly system: 'dark' | 'light' | undefined
  readonly value: string
}

export function useColorMode(): ColorModeState {
  const { $colorMode } = useNuxtApp()

  return $colorMode
}

export default useColorMode
