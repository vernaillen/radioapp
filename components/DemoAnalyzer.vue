<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'
import type { RadioChannel } from '~/types'

useHead({
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/castjs/5.3.0/cast.min.js' }
    ]
})

const startChannel = 'zenfm'
const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const isCastingConnected = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())
const channelKey = ref(startChannel)
const castjs = ref<any>()

const volume = ref<number>(0.4)
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
    if (isCastingConnected.value && castjs.value && castjs.value.available) {
        castjs.value.cast(audio.value?.src);
    } else {
        audio.value?.play()
    }
    isPlaying.value = true
}
function pauseAudio () {
    if (isCastingConnected.value && castjs.value && castjs.value.available) {
        castjs.value.pause(); 
    } else {
        audio.value?.pause()
    }
    isPlaying.value = false
}
function setVolume (event: any) {
    volume.value = event
    if (isCastingConnected.value && castjs.value && castjs.value.available) {
        castjs.value.volume(event)
    } else if (audio.value) {
        audio.value.volume = event
    }
}
function disconnect () {
    audio.value?.pause()
    castjs.value?.disconnect();
    device.value = ''
    isPlaying.value = false
    isCastingConnected.value = false
}
function toggleCasting () {
    if (isCastingConnected.value) {
        castjs.value.disconnect();
        device.value = ''
        isCastingConnected.value = false
        if (isPlaying.value) {
            audio.value?.play()
        }
    } else {
        castjs.value.cast(audio.value?.src);
        audio.value?.pause()
        isCastingConnected.value = true
        isPlaying.value = true
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
    castjs.value = new Castjs();
    console.log('castjs object:', castjs.value)
    console.log('castjs available:', castjs.value.available)
    if(castjs.value?.available) {
        castjs.value.on('playing', () => {
            isPlaying.value = true
            volume.value = Number(castjs.value.volumeLevel)
            device.value = castjs.value.device
            wakeLock.request('screen')
        })
        castjs.value.on('paused', () => {
            isPlaying.value = false
            wakeLock.release()
        })
        /*castjs.value.on('volumechange', () => {
            volume.value = castjs.value.volumeLevel.parseInt()
        })*/
    }
})
</script>

<template>
    <audio class="mx-auto" id="audio" ref="audioRef" src="https://quantumcast.vrtcdn.be/radio1/mp3-128" crossorigin="anonymous" />
    <main v-if="castjs">
        <div class="px-0 grid grid-cols-5 mt-8 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-7 justify-center" size="xs" v-if="!isPlaying" @click="playAudio"/>
                <UButton icon="i-heroicons-pause" class="w-7 justify-center" size="xs" v-if="isPlaying" @click="pauseAudio"/>
                <UButton icon="i-heroicons-stop" class="w-7 justify-center ml-1" size="xs" @click="disconnect"/>
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
                <UButton icon="i-material-symbols-chevron-right" class="w-7 justify-center" size="xs" @click="loadNextChannel()"/>
            </div>
        </div>
        <div class="mt-4 text-center text-sm">
            <NuxtLink v-if="castjs.available" @click="toggleCasting">
                <UIcon :name="device ? 'i-material-symbols-cast-connected' : 'i-material-symbols-cast-outline'" class="w-5 h-5 mr-1 -mb-1 cursor-pointer" />
            </NuxtLink>
            {{ device ? device : 'no device connected' }} 
            <UIcon name="i-material-symbols-volume-up" class="w-5 h-5 ml-5 mr-1 -mb-1" />
            {{ volume * 100 }}%
        </div>
        <div class="w-64 mt-2 mx-auto">
            <URange class="w-full" :min="0" :max="1" :step="0.01" :value="volume" @change="setVolume(Number($event))" />
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" :full-screen="fullScreen" />
        <div class="mt-2 text-center">
            <UButton icon="i-material-symbols-fullscreen" size="xs" @click="fullScreen= !fullScreen"/>
        </div>
        <PresetSelector />
    </main>
</template>
