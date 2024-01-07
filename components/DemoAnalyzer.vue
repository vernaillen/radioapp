<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'
import type { RadioChannel } from '~/types';

const startChannel = 'radio1'
const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())
const channelKey = ref(startChannel)

function switchChannel (key: string, startPlaying: boolean) {
    const channel: RadioChannel = getChannel(key)
    if (channel) {
        const audioEl = document.getElementById('audio') as HTMLMediaElement
        audioEl.src = channel.src
        if (startPlaying) audioEl.play()
        useHead({
            title: channel.label
        })
        channelKey.value = key
    }
}
function triggerSwitchChannel () {
    switchChannel(channelKey.value, true)
}
function loadNextChannel () {
    const nextChannelKey = nextChannel(channelKey.value)
    if (nextChannelKey) switchChannel(nextChannelKey.value, true)
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
    optionsStore.updateOptions(usePresets()[3].options)
    // set default channel
    switchChannel(startChannel, false)

    window.addEventListener("keypress", e => {
        if (e.code === 'Space') {
            if (isPlaying.value) audio.value?.pause()
            else audio.value?.play()
        }
    });
})
</script>

<template>
    <main>
        <div class="text-lg text-center p-2">{{ channelLabel }}</div>
        <audio id="audio" ref="audioRef" src="https://quantumcast.vrtcdn.be/radio1/mp3-128" crossorigin="anonymous" />
        <div class="px-2 grid grid-cols-5 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-10 justify-center" v-if="!isPlaying" @click="audio?.play()" @keydown.enter="console.log('enytered')"/>
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
                <UButton icon="i-material-symbols-chevron-right" class="w-10 justify-center" @click="loadNextChannel()"/>
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" :full-screen="fullScreen" />
        <div class="mt-2 text-center">
            <UButton icon="i-material-symbols-fullscreen" size="xs" @click="fullScreen= !fullScreen"/>
        </div>
        <PresetSelector />
    </main>
</template>
