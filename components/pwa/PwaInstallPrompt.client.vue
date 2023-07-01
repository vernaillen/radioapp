<template>
  {{ $pwa }}
  <div
    v-if="$pwa?.showInstallPrompt && !$pwa?.needRefresh"
    m-2 p5 bg="primary-fade" relative
    rounded-lg of-hidden
    flex="~ col gap-3"
    v-bind="$attrs"
  >
    <h2 flex="~ gap-2" items-center>
     Install app
    </h2>
    <div flex="~ gap-1">
      <button type="button" btn-solid px-4 py-1 text-center text-sm @click="$pwa.install()">
        Install
      </button>
      <button type="button" btn-text filter-saturate-0 px-4 py-1 text-center text-sm @click="$pwa.cancelInstall()">
        Dismiss
      </button>
    </div>
    <div i-material-symbols:install-desktop-rounded absolute text-6em bottom--2 inset-ie--2 text-primary dark:text-white op10 class="-z-1 rtl-flip" />
  </div>
</template>
