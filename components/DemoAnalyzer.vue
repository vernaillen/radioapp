<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'
import type { RadioChannel } from '~/types'

const castjs = useScript('https://cdnjs.cloudflare.com/ajax/libs/castjs/5.3.0/cast.min.js', {
  bundle: true
})
if (castjs && castjs.available) {
  console.log('castjs loaded')
}

const startChannel = 'zenfm'
const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())
const channelKey = ref(startChannel)

const volume = ref(0)
const device = ref('')

async function switchChannel (key: string, startPlaying: boolean) {
    const channel: RadioChannel | undefined = getChannel(key)
    if (channel) {
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
    if (castjs && castjs.available) {
        castjs.cast(audio.value?.src);
        isPlaying.value = true
    } 
}
function pauseAudio () {
    audio.value?.pause()
    if (castjs && castjs.available) {
        castjs.pause(); 
        isPlaying.value = false
    } 
}

onMounted(() => {
    audio.value = document.getElementById('audio') as HTMLMediaElement
    if (audio.value) {
        audio.value.onplaying = () => {
            isPlaying.value = true
            wakeLock.request('screen')
        }
        audio.value.onpause = () => {
            isPlaying.value = false
            wakeLock.release()
        }
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
    if(castjs?.available) {
        castjs.on('playing', () => {
            isPlaying.value = true
            volume.value = castjs.volumeLevel
            wakeLock.request('screen')
        })
        castjs.on('paused', () => {
            isPlaying.value = false
            wakeLock.release()
        })
        castjs.on('volumechange', () => {
            volume.value = castjs.volumeLevel
        })
        castjs.on('connect', () => {
            device.value = castjs.device
        })
    }
})
</script>

<template>
    <main v-if="castjs && castjs.available">
        <div class="text-lg text-center p-2">{{ channelLabel }}</div>
        <audio class="mx-auto" id="audio" ref="audioRef" src="https://quantumcast.vrtcdn.be/radio1/mp3-128" crossorigin="anonymous" />
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
