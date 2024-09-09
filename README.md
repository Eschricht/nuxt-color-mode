# Nuxt Color Mode

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

🌃 Dark and 🌞 Light mode with auto detection (even on server side!) made easy

This module is similar to the official module [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) but with cookie support and server side system preference (via `sec-ch-prefers-color-scheme` header), making sure that the rendered theme on the server and client is always in sync.

It's not a 1:1 port of `@nuxtjs/color-mode` so expect a few API changes or missing features.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/Eschricht/nuxt-color-mode?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🚀 &nbsp;Full SSR support
- 🍪 &nbsp;Cookie support
- 🤖 &nbsp;Auto detect system [color mode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme) (even on server side!)
- 🎨 &nbsp;Customizable
- 🌪️ &nbsp;Temporary force color mode on individual pages or actions

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @eschricht/nuxt-color-mode
```

That's it! You can now use Nuxt Color Mode in your Nuxt app ✨

### Configuration

```ts
export default defineNuxtConfig({
  modules: ['@eschricht/nuxt-color-mode'],

  colorMode: {
    // The preferred mode when cookie hasn't been set yet
    preference: 'system',
    // Fallback to use when system preference is unavailable
    fallback: 'light',
    // Name to use when system preference is 'dark'
    systemDarkName: 'dark',
    // Name to use when system preference is 'light'
    systemLightName: 'light',
    // Prefix color mode class name
    classPrefix: '',
    // Suffix color mode class name
    classSuffix: '-mode',
    // Adds a data-attribute to the HTML.
    // Example, set it to 'color-mode' will add the HTML attribute 'data-color-mode="<color-mode>"'
    dataValue: '',
    // Name of the cookie
    cookieName: 'color-mode',
    // Cookie options
    cookieOptions: {},
  }
})
```

## Composable

The composable returns a reactive object containing information about the current color theme.

> [!WARNING]
> Do not destruct the return value. Since it's a reactive object, reactivity will be lost.

### Usage

```vue
<script setup lang="ts">
const colorMode = useColorMode()

console.log(colorMode.preference) // The current value stored in cookie, i.e. 'system'
console.log(colorMode.system) // The system preference, i.e. 'dark'. - Readonly
console.log(colorMode.value) // The resolved color mode, i.e. 'dark' or 'github-dark' if systemDarkName: 'github-dark' - Readonly

function changeColorMode() {
  colorMode.preference = 'some-other-value' // Updates cookie value and HTML class is set to `<html class="some-other-value-mode">`
}
</script>
```

## Force color mode

It's possible to temporarily force the color mode on specific pages or situations. This can be done in 3 ways:

### definePageMeta

```vue
<script setup lang="ts">
definePageMeta({
  colorMode: 'pink'
})
</script>
```

### Composable

```vue
<script setup lang="ts">
const { forceColorMode } = useColorMode()

function handleError() {
  forceColorMode('error')
}

function resetError() {
  // Reset
  forceColorMode()
}
</script>
```

### $colorMode.forcedValue

```vue
<template>
  <div>
    <button @click="$colorMode.forcedValue = 'pink'">FORCE 🌪️</button>
  </div>
</template>
```

## Caveats

`sec-ch-prefers-color-scheme` is an experimental header and has [limited browser support](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme#browser_compatibility).
The preferred color scheme is also fetched from browser API (client side only) as a fallback which can cause a flash of color change.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@eschricht/nuxt-color-mode/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@eschricht/nuxt-color-mode

[npm-downloads-src]: https://img.shields.io/npm/dm/@eschricht/nuxt-color-mode.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@eschricht/nuxt-color-mode

[license-src]: https://img.shields.io/npm/l/@eschricht/nuxt-color-mode.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@eschricht/nuxt-color-mode

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
