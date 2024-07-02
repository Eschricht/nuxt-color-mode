import { useNuxtApp } from '#imports'

export function useColorMode() {
  const { $colorMode } = useNuxtApp()

  return $colorMode
}

export default useColorMode
