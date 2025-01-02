<script setup lang="ts">
useHead({
  title: 'radio.vernaillen.dev',
  meta: [
    {
      name: 'description',
      content: 'A simple radio app'
    },
    {
      name: 'theme-color',
      id: 'theme-color',
      content: '#000000'
    }
  ],
  link: [
    {
      rel: 'manifest',
      key: 'webmanifest',
      href: `/manifest.webmanifest`,
    }
  ],
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/castjs/5.3.0/cast.min.js' }
  ]
})
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtPage />
    <PwaInstallPrompt />
  </div>
</template>
