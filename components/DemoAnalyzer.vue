<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'

const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
onMounted(() => {
    audio.value = document.getElementById('audio') as HTMLMediaElement
    audio.value.onplaying = () => {
        isPlaying.value = true
    }
    audio.value.onpause = () => {
        isPlaying.value = false
    }
})
const options = {
    mode: 5,
    barSpace: 0.25,
    gradient: 'rainbow',
    ledBars: false,
    lumiBars: false,
    radial: false,
    reflexAlpha: 0.25,
    reflexBright: 1,
    reflexFit: true,
    reflexRatio: 0.3,
    showBgColor: false,
    showPeaks: true,
    overlay: false,
    height: 400
}
const channels = [
    {
        label: 'ZenFM',
        value: 'zenfm',
        src: 'https://22653.live.streamtheworld.com/TOPZEN.mp3?lsid=app:54f1cdd7-7a00-42f8-9df5-64ebe6792dc9'
    },
    {
        label: 'SomaFM Beat Blender',
        value: 'beatblender',
        src: 'https://ice2.somafm.com/beatblender-128-mp3'
    },
    {
        label: 'SomaFM Groove Salad',
        value: 'groovesalad',
        src: 'https://ice4.somafm.com/groovesalad-128-mp3'
    },
    {
        label: 'SomaFM Suburbs of Goa',
        value: 'suburbsofgoa',
        src: 'https://ice2.somafm.com/suburbsofgoa-128-mp3'
    },
    {
        label: 'SomaFM The Trip',
        value: 'thetrip',
        src: 'https://ice2.somafm.com/thetrip-128-mp3'
    },
    { 
        label: 'SomaFM Drone Zone',
        value: 'dronezone',
        src: 'https://ice2.somafm.com/dronezone-128-mp3'
    }, 
    {
        label: 'SomaFM Space Station',
        value: 'spacestation',
        src: 'https://ice2.somafm.com/spacestation-128-mp3'
    },
    {
        label: 'SomaFM Deep Space One',
        value: 'deepspaceone',
        src: 'https://ice2.somafm.com/deepspaceone-128-mp3'
    },
    {
        label: 'SomaFM Lush',
        value: 'lush',
        src: 'https://ice2.somafm.com/lush-128-mp3'
    },
    {
        label: 'SomaFM Secret Agent',
        value: 'secretagent',
        src: 'https://ice2.somafm.com/secretagent-128-mp3'
    },
    {
        label: 'SomaFM Illinois Street Lounge',
        value: 'illinoisstreetlounge',
        src: 'https://ice6.somafm.com/illstreet-128-mp3'
    }
]
function switchChannel (src: string, name: string) {
    const audioEl = document.getElementById('audio') as HTMLMediaElement
    audioEl.src = src
    audioEl.play()
    useHead({
        title: name
    })
}

const channel = ref('zenfm')
watch(channel, (newVal) => {
    const channel = channels.find((channel) => channel.value === newVal)
    if (channel) {
        switchChannel(channel.src, channel.label)
    }
})
const channelSrc = computed((channelValue: string) => {
    const channel = channels.find((channel) => channel.value === channelValue)
    if (channel) {
        return channel.src
    }
    return channels[0].src
})
</script>

<template>
    <main>
        <div class="p-2 text-center">
            <USelect v-model="channel" :options="channels" color="primary" placeholder="Select channel..." />
            <audio id="audio" ref="audioRef" :src="channelSrc" crossorigin="anonymous" />
            <div class="mt-2">
                <UButton size="xs" v-if="!isPlaying" @click="audio?.play()">
                    Play
                </UButton>
                <UButton size="xs" v-if="isPlaying" @click="audio?.pause()">
                    Pause
                </UButton>
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="options" :source="audio" class="h-1/2" />
        
    </main>
</template>
