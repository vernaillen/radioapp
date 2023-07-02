import { DefaultOptions, Options } from 'vite-plugin-vue-audiomotion'

export const usePresets = () => {
  return [
    {
      name: 'Defaults',
      options: {
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
    },
    {
      name: 'Classic LEDs',
      options: {
        mode: 3,
        barSpace: 0.4,
        gradient: 'classic',
        ledBars: true,
        lumiBars: false,
        radial: false,
        reflexRatio: 0,
        showBgColor: true,
        showPeaks: true,
        height: 350
      },
    },
    {
      name: 'Mirror wave',
      options: {
        mode: 10,
        fillAlpha: 0.6,
        gradient: 'rainbow',
        lineWidth: 2,
        mirror: -1,
        radial: false,
        reflexAlpha: 1,
        reflexBright: 1,
        reflexRatio: 0.5,
        showPeaks: false,
        height: 350
      },
    },
    {
      name: 'Radial overlay',
      options: {
        mode: 5,
        barSpace: 0.1,
        gradient: 'prism',
        ledBars: false,
        radial: true,
        showBgColor: true,
        showPeaks: true,
        spinSpeed: 1,
        overlay: true,
        height: 350
      },
    },
    {
      name: 'Reflex Bars',
      options: {
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
      },
    },
    {
      name: 'Lumi Bars',
      options: {
        mode: 1,
        barSpace: 0,
        gradient: 'classic',
        alphaBars: true,
        ledBars: false,
        lumiBars: true,
        radial: false,
        reflexAlpha: 0.25,
        reflexBright: 1,
        reflexFit: true,
        reflexRatio: 0.3,
        showBgColor: false,
        showPeaks: false,
        showScaleX: false,
        overlay: false,
        fillAlpha: 0.6,
        mirror: 1,
        smoothing: 0.9,
        height: 350
      },
    }]
}