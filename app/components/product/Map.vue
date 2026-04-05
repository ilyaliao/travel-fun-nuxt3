<script setup lang="ts">
import type { Coordinates } from '~/types'
import { GoogleMap, Marker } from '@voomap/map'

const props = defineProps<{
  coordinates: Coordinates
  address: string
  title: string
}>()

const config = useRuntimeConfig()
const apiKey = config.public.googleMapApiKey

const center = computed(() => ({ lat: props.coordinates.lat, lng: props.coordinates.lng }))
</script>

<template>
  <section>
    <h2 class="text-h4 tracking-normal mb-6">
      景點位置
    </h2>
    <div class="rounded-xl h-64 w-full overflow-hidden md:h-80">
      <GoogleMap :api-key="apiKey" :center="center" :zoom="15" class="h-full w-full">
        <Marker :title="title" :position="center" />
      </GoogleMap>
    </div>
    <div class="text-sm text-cc-grey-66 mt-3 flex gap-1 items-center">
      <div class="i-material-symbols-location-on-outline shrink-0 h-4 w-4" />
      {{ address }}
    </div>
  </section>
</template>
