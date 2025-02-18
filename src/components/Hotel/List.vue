<template>
  <div class="hotel-list">
    <div
      v-if="hotelStore.selectedHotel"
      class="fullscreen-overlay"
      @click="hotelStore.setSelectedHotel(null)"
    />

    <template v-if="hotelStore.displayedHotels.length">
      <q-infinite-scroll @load="hotelStore.fetchNextPage" :offset="250" :disable="!hasMoreHotels">
        <hotel-card v-for="hotel in hotelStore.displayedHotels" :key="hotel.id" :hotel="hotel" />

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </template>

    <template v-else-if="!hotelStore.isLoading">
      <div class="row justify-center text-grey-8 text-h5 q-mt-xl">
        Nenhum hotel encontrado para este destino.
      </div>
    </template>

    <hotel-drawer :hotel="hotelStore.selectedHotel" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHotelStore } from '@/stores/useHotelStore'

import HotelCard from '@/components/Hotel/Card.vue'
import HotelDrawer from '@/components/Hotel/Drawer.vue'

const hotelStore = useHotelStore()

const hasMoreHotels = computed(() => {
  return hotelStore.displayedHotels.length < hotelStore.filteredHotels.length
})
</script>

<style lang="scss">
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1999;
}

.hotel-drawer {
  z-index: 2000;
}
</style>
