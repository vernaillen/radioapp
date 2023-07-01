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
    <h1 class="text-xl p-4">Wouter's Radio App</h1>
    <DemoAnalyzer/>
    <PwaInstallPrompt />
  </div>
</template>
