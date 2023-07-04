import { RadioChannel } from 'types'

export const useChannels = (): RadioChannel[] => {
    return [
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
}

export function getChannel(name: string): RadioChannel | undefined {
    return useChannels().find((channel) => channel.value === name)
}
