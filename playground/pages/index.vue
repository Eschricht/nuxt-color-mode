<script setup lang="ts">
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
    <div>
      <pre><code>{{ $colorMode }}</code></pre>
    </div>

    <div>
      <button @click="toggleColorMode">
        toggle
      </button>
    </div>

    <div>
      <button @click="colorMode.preference = 'system'">
        system
      </button>
    </div>
  </div>
</template>
