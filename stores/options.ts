import { defineStore } from 'pinia'
import { DefaultOptions } from 'vite-plugin-vue-audiomotion'

export const useOptionsStore = defineStore('optionsStore', {
  state: () => ({
    options: {
      ...DefaultOptions,
      height: 450
    },
  }),
  actions: {
    updateOptions(newOptions: Options) {
      Object.assign(this.options, newOptions)
    },
  },
})
