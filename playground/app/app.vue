<script setup lang="ts">
</script>

<template>
  <div>
    <p>Nuxt module playground!</p>

    <div>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      -
      <NuxtLink to="/forced">
        Forced color mode
      </NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>
