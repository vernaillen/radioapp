import { channel } from 'diagnostics_channel'
import type { RadioChannel } from '~/types'

export const useChannels = (): RadioChannel[] => {
    return [
        {
            label: 'Radio 1',
            value: 'radio1',
            src: 'https://quantumcast.vrtcdn.be/radio1/mp3-128'
        },
        {
            label: 'Radio 1 Classics',
            value: 'radio1classics',
            src: 'https://quantumcast.vrtcdn.be/radio1_classics/mp3-128'
        },
        {
            label: 'Radio 2 Oost-Vlaanderen',
            value: 'radio2',
            src: 'https://quantumcast.vrtcdn.be/ra2ovl/mp3-128'
        },
        {
            label: 'StuBru',
            value: 'stubru',
            src: 'https://quantumcast.vrtcdn.be/stubru/mp3-128'
        },
        {
            label: 'StuBru De Tijdloze',
            value: 'studbrutijdloze',
            src: 'https://quantumcast.vrtcdn.be/stubru_tijdloze/mp3-128'
        },
        {
            label: 'StuBru UNTZ',
            value: 'stubruuntz',
            src: 'https://quantumcast.vrtcdn.be/stubru_untz/mp3-128'
        },
        {
            label: 'Willy',
            value: 'willy',
            src: 'https://icecast-qmusicbe-cdp.triple-it.nl/willy.mp3'
        },
        {
            label: 'ZenFM',
            value: 'zenfm',
            src: 'https://27873.live.streamtheworld.com/TOPZEN.mp3?dist=website?lsid=app:adbc632a-bb9c-46e3-b3dc-f4df5e2cb586'
            // src: 'https://22653.live.streamtheworld.com/TOPZEN.mp3?lsid=app:54f1cdd7-7a00-42f8-9df5-64ebe6792dc9'
        },
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
        /*{
            label: 'WEFUNK Radio',
            value: 'wefunk',
            src: 'https://s-00.wefunkradio.com:8443/wefunk64.mp3'
        },*/
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
        },
        {
            label: 'Perfect New Age',
            value: 'perfectnewage',
            src: 'https://n0e.radiojar.com/cxases7nabuvv?rj-ttl=5&rj-tok=AAABlCgq1YsANP3-MA3oVuyLjw'
        },
        {
            label: 'Zen Garden - My Noise',
            value: 'zengardenmynoise',
            src: 'https://zengarden-mynoise.radioca.st/stream'
        }
    ]
}

export function getChannel(name: string): RadioChannel | undefined {
    return useChannels().find((channel) => channel.value === name)
}

export function nextChannel(prevChannelName: string): RadioChannel | undefined {
    const prevIndex = useChannels().findIndex(channel => {
        if (channel.value === prevChannelName) return channel
    });
    const nextIndex = prevIndex === useChannels().length -1 ? 0 : prevIndex + 1
    const newChannel: RadioChannel = useChannels()[nextIndex]
    return newChannel
}
