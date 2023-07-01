<script setup lang="ts">
useHead({
  title: 'Wouter\'s Radio App',
  meta: [
    {
      name: 'description',
      content: 'A simple radio app'
    }
  ],
  link: [
    {
      rel: 'manifest',
      key: 'webmanifest',
      href: `/manifest.webmanifest`,
    }
  ]
})
</script>

<template>
  <div>
    <VitePwaManifest />
    <div class="text-lg text-center pt-2">Wouter's Radio App</div>
    <DemoAnalyzer/>
    <PwaInstallPrompt />
  </div>
</template>
