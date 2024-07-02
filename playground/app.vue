<template>
  <div>
    Nuxt module playground!

    <div>
      <pre><code>{{ $colorMode }}</code></pre>
    </div>

    <div>
      <button @click="toggleColorMode">
        toggle
      </button>
    </div>

    <div>
      <button @click="$colorMode.preference = 'system'">
        system
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  if (colorMode.preference === 'dark')
    colorMode.preference = 'light'
  else
    colorMode.preference = 'dark'
}
</script>
