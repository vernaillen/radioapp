<template>
  <div
    v-if="$pwa?.showInstallPrompt && !$pwa?.needRefresh"
    class="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 bg-gray-500 dark:bg-opacity-50 shadow-xl z-50"
    v-bind="$attrs"
  >
    <h2 class="mb-2">
     Install Radio App?
    </h2>
    <div>
      <UButton icon="i-material-symbols-install-desktop-rounded" class="mx-2" @click="$pwa.install()">
        Install
      </UButton>
      <UButton variant="ghost" class="mx-2" @click="$pwa.cancelInstall()">
        Dismiss
      </UButton>
    </div>
  </div>
</template>
