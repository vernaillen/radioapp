<script setup lang="ts">
useHead({
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/castjs/5.3.0/cast.min.js' }
  ]
})

async function loadStream() {
  const cjs = new Castjs();

  if (cjs.available) {
      // Initiate new cast session with a simple video
      cjs.cast('https://27873.live.streamtheworld.com/TOPZEN.mp3?dist=website?lsid=app:adbc632a-bb9c-46e3-b3dc-f4df5e2cb586');
  } 
}
</script>

<template>
    <div>
        <UButton @click="loadStream" class="mb-4">Play</UButton>
    </div>
</template>