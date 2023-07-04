<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'
import { RadioChannel } from 'types';

const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())
const channelKey = ref('wehousetunein')

function switchChannel (key: string, startPlaying: boolean) {
    const channel: RadioChannel = getChannel(key)
    if (channel) {
        const audioEl = document.getElementById('audio') as HTMLMediaElement
        audioEl.src = channel.src
        if (startPlaying) audioEl.play()
        useHead({
            title: channel.label
        })
    }
}
function triggerSwitchChannel () {
    switchChannel(channelKey.value, true)
}
const channelLabel = computed(() => {
    const channel = getChannel(channelKey.value)
    return channel ? channel.label : 'no channel loaded'
})

onMounted(() => {
    audio.value = document.getElementById('audio') as HTMLMediaElement
    audio.value.onplaying = () => {
        isPlaying.value = true
        wakeLock.request('screen')
    }
    audio.value.onpause = () => {
        isPlaying.value = false
        wakeLock.release()
    }
    // set Reflex Bars as default preset
    optionsStore.updateOptions(usePresets()[4].options)
    // set default channel
    switchChannel('wehousetunein', false)
})
</script>

<template>
    <main>
        <div class="text-lg text-center p-2">{{ channelLabel }}</div>
        <audio id="audio" ref="audioRef" src="https://icecast9.play.cz/zun192.mp3" crossorigin="anonymous" />
        <div class="px-2 grid grid-cols-5 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-10 justify-center" v-if="!isPlaying" @click="audio?.play()"/>
                <UButton icon="i-heroicons-pause" class="w-10 justify-center" v-if="isPlaying" @click="audio?.pause()"/>
            </div>
            <div class="col-span-3">
                <USelect 
                    v-model="channelKey" 
                    :options="useChannels()" 
                    @change="triggerSwitchChannel"
                    option-attribute="label"
                    color="primary" 
                    placeholder="Select channel..." />
            </div>
            <div class="col-span-1 text-center">
                <UButton icon="i-material-symbols-fullscreen" class="w-10 justify-center" @click="fullScreen = !fullScreen"/>
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" class="h-1/2" :full-screen="fullScreen" />
        <PresetSelector />
    </main>
</template>
