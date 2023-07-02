<script setup lang="ts">
useHead({
  title: 'Radio Vernaillen App',
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
  ]
})
</script>

<template>
  <div>
    <VitePwaManifest />
    <div class="text-lg text-center pt-2">Radio Vernaillen App</div>
    <DemoAnalyzer/>
    <PwaInstallPrompt />
  </div>
</template>
