import { createSharedComposable } from '@vueuse/core'
import type { Options } from 'vite-plugin-vue-audiomotion'
import { DefaultOptions, Options } from 'vite-plugin-vue-audiomotion'

const _useOptions = () => {
  const options = {
    ...DefaultOptions,
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
