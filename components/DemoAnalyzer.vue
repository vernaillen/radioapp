<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'
import { useWakeLock } from '@vueuse/core'

const optionsStore = useOptionsStore()
const audio = ref<HTMLMediaElement>()
const isPlaying = ref(false)
const fullScreen = ref(false)
const wakeLock = reactive(useWakeLock())

function switchChannel (src: string, name: string) {
    const audioEl = document.getElementById('audio') as HTMLMediaElement
    audioEl.src = src
    audioEl.play()
    useHead({
        title: name
    })
}

const channel = ref('wehousetunein')
watch(channel, (newVal) => {
    const channel = useChannels().find((channel) => channel.value === newVal)
    if (channel) {
        switchChannel(channel.src, channel.label)
    }
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
})
optionsStore.updateOptions(usePresets()[4].options)
</script>

<template>
    <main>
        <audio id="audio" ref="audioRef" src="https://icecast9.play.cz/zun192.mp3" crossorigin="anonymous" />
        <div class="px-2 grid grid-cols-5 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-10 justify-center" v-if="!isPlaying" @click="audio?.play()"/>
                <UButton icon="i-heroicons-pause" class="w-10 justify-center" v-if="isPlaying" @click="audio?.pause()"/>
            </div>
            <div class="col-span-3">
                <USelect v-model="channel" :options="useChannels()" color="primary" placeholder="Select channel..." />
            </div>
            <div class="col-span-1 text-center">
                <UButton icon="i-material-symbols-fullscreen" class="w-10 justify-center" @click="fullScreen = !fullScreen"/>
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" class="h-1/2" :full-screen="fullScreen" />
        <PresetSelector />
    </main>
</template>
