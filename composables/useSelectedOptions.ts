import { createSharedComposable } from '@vueuse/core'
import type { Options } from 'vue-audiomotion-analyzer'

const _useOptions = () => {
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
      height: 350
    }

  function updateOptions (newOptions: Options) {
    Object.assign(options, newOptions)
  }

  return {
    options, updateOptions
  }
}

export const useSelectedOptions = createSharedComposable(_useOptions)
