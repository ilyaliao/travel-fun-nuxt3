<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { appName } from '~/constants'

useFavoriteSyncOnLogin()

useHead({
  title: appName,
  titleTemplate: title => (title === appName ? title : `${title} | ${appName}`),
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator color="var(--color-cc-accent)" />
  <Toaster position="top-right" :duration="1500" rich-colors />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
