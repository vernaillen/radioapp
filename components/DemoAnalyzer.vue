<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'
import type { RadioChannel } from '~/types'

const startChannel = 'zenfm'
const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())
const channelKey = ref(startChannel)

useHead({
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/castjs/5.3.0/cast.min.js' }
  ]
})
const cjs = ref<any>()
const volume = ref(0)
const device = ref('')

async function switchChannel (key: string, startPlaying: boolean) {
    const channel: RadioChannel | undefined = getChannel(key)
    if (channel) {
        const audioEl = document.getElementById('audio') as HTMLMediaElement
        audioEl.src = channel.src
        if (startPlaying) { 
            playAudio()
        }
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
function playAudio () {
    audio.value?.play()
    if (cjs.value && cjs.value.available) {
        cjs.value.cast(audio.value?.src);
        isPlaying.value = true
    } 
}
function pauseAudio () {
    audio.value?.pause()
    if (cjs.value && cjs.value.available) {
        cjs.value.pause(); 
        isPlaying.value = false
    } 
}

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
            else playAudio()
        }
    });
    cjs.value = new Castjs();
    if(cjs.value && cjs.value.available) {
        cjs.value.on('playing', () => {
            isPlaying.value = true
            volume.value = cjs.value.volumeLevel
            wakeLock.request('screen')
        })
        cjs.value.on('paused', () => {
            isPlaying.value = false
            wakeLock.release()
        })
        cjs.value.on('volumechange', () => {
            volume.value = cjs.value.volumeLevel
        })
        cjs.value.on('connect', () => {
            device.value = cjs.value.device
        })
    }
})
</script>

<template>
    <main>
        <div class="text-lg text-center p-2">{{ channelLabel }}</div>
        <audio id="audio" ref="audioRef" src="https://quantumcast.vrtcdn.be/radio1/mp3-128" crossorigin="anonymous" />
        <div class="px-2 grid grid-cols-5 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-10 justify-center" v-if="!isPlaying" @click="playAudio"/>
                <UButton icon="i-heroicons-pause" class="w-10 justify-center" v-if="isPlaying" @click="pauseAudio"/>
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
        <div v-if="device" class="mt-2 text-center">
            {{ device }}
        </div>
        <div class="mt-2 text-center">
            <UMeter class="w-96 mx-auto justify-center" :value="volume * 100" indicator />
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" :full-screen="fullScreen" />
        <div class="mt-2 text-center">
            <UButton icon="i-material-symbols-fullscreen" size="xs" @click="fullScreen= !fullScreen"/>
        </div>
        <PresetSelector />
    </main>
</template>
