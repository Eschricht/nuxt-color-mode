<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()

function toggleColorMode() {
  if (colorMode.value === 'dark')
    colorMode.preference = 'light'
  else
    colorMode.preference = 'dark'
}
</script>

<template>
  <div>
    <pre><code>{{ colorMode }}</code></pre>

    <div>
      <button @click="toggleColorMode">
        Toggle
      </button>
    </div>
  </div>
</template>
