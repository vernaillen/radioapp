<script setup lang="ts">
import { ref, watch } from 'vue'
import { DefaultOptions } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
const  presets = usePresets()

const selectedPreset = ref(4)
const updatedPreset = ref(false)
const optionsStore = useOptionsStore()
function setPreset(presetId: number) {
  const newOptions = { ...DefaultOptions, ...presets[presetId].options }
  optionsStore.updateOptions(newOptions)
  selectedPreset.value = presetId
  updatedPreset.value = true
}
watch(optionsStore.options, () => {
  if (!updatedPreset.value)
    selectedPreset.value = -1
  updatedPreset.value = false
})
</script>

<template>
  <div class="mt-2 text-center">
    <UButton
      v-for="(preset, index) in presets"
      :key="index"
      :value="index"
      :class="selectedPreset === index ? 'opacity-100' : 'opacity-50'"
      size="xs"
      class="m-1"
      @click="setPreset(index)"
    >
      {{ preset.name }}
    </UButton>
  </div>
</template>
