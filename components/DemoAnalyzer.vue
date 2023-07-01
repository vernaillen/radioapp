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
}
const channels = [
    {
        name: 'ZenFM',
        src: 'https://22653.live.streamtheworld.com/TOPZEN.mp3?lsid=app:54f1cdd7-7a00-42f8-9df5-64ebe6792dc9'
    },
    {
        name: 'Beat Blender',
        src: 'https://ice2.somafm.com/beatblender-128-mp3'
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
</script>

<template>
    <main>
        <div class="p-2 text-center ">
            <span v-for="channel in channels" :key="channel.name" class="mr-2 mb-20">
                <UButton size="xs" @click="switchChannel(channel.src, channel.name)">
                    {{ channel.name }}
                </UButton>
            </span>
            <audio id="audio" ref="audioRef" src="https://ice2.somafm.com/beatblender-128-mp3" crossorigin="anonymous" />
            <div class="mt-2">
                <UButton size="xs" v-if="!isPlaying" @click="audio?.play()">
                    Play
                </UButton>
                <UButton size="xs" v-if="isPlaying" @click="audio?.pause()">
                    Pause
                </UButton>
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="options" :source="audio" />
    </main>
</template>
