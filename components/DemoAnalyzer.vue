<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueAudioMotionAnalyzer } from 'vite-plugin-vue-audiomotion'
import { useOptionsStore } from '@/stores/options'

const optionsStore = useOptionsStore()
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

const channels = [
    {
        label: 'ZenFM',
        value: 'zenfm',
        src: 'https://22653.live.streamtheworld.com/TOPZEN.mp3?lsid=app:54f1cdd7-7a00-42f8-9df5-64ebe6792dc9'
    },
    /*
    {
        label: 'StuBru UNTZ',
        value: 'stubruuntz',
        src: 'http://icecast.vrtcdn.be/stubru_untz-high.mp3'
    },*/
    {
        label: 'BRUZZ',
        value: 'bruzz',
        src: 'https://i1.cdn.jetstre.am:8000/sz=fmbrussel=BRUZZ_HQ'
    },
    /*
    {
        label: 'URGent FM',
        value: 'urgentfm',
        src: 'http://urgentstream.radiostudio.be:8000/aac?fbclid=IwAR0UT-WBLUyWbUAmZbwbPExIyY7IDasgTpHbYFTdEUYBT08ARQ4KhxevaAk.mp3'
    },*/
    {
        label: 'ORF Radio FM4',
        value: 'orfmf4',
        src: 'https://orf-live.ors-shoutcast.at/fm4-q2a'
    },
    {
        label: 'WEFUNK Radio',
        value: 'wefunk',
        src: 'https://s-00.wefunkradio.com:8443/wefunk64.mp3'
    },
    {
        label: 'We House Tunein Radio',
        value: 'wehousetunein',
        src: 'https://icecast9.play.cz/zun192.mp3'
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

const channel = ref('wehousetunein')
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
optionsStore.updateOptions(usePresets()[4].options)
</script>

<template>
    <main>
        <audio id="audio" ref="audioRef" :src="channelSrc" crossorigin="anonymous" />
        <div class="px-2 grid grid-cols-5 mb-4">
            <div class="col-span-1 text-center">
                <UButton icon="i-heroicons-play" class="w-10 justify-center" v-if="!isPlaying" @click="audio?.play()"/>
                <UButton icon="i-heroicons-pause" class="w-10 justify-center" v-if="isPlaying" @click="audio?.pause()"/>
            </div>
            <div class="col-span-4 pr-3">
                <USelect v-model="channel" :options="channels" color="primary" placeholder="Select channel..." />
            </div>
        </div>
        <VueAudioMotionAnalyzer :options="optionsStore.options" :source="audio" class="h-1/2" />
        <PresetSelector />
    </main>
</template>
