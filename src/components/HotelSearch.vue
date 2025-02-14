<template>
  <q-card class="hotel-search" flat bordered>
    <p class="text-h5 q-pa-sm q-ml-sm q-mb-none text-grey-8">Reservar hotel</p>

    <q-separator color="grey-6" />

    <div class="q-pa-md flex justify-end">
      <app-select
        label="Destino"
        v-model="placeStore.selectedPlace"
        required
        dense
        display-value
        class="q-mb-md full-width"
        :options="placeStore.formattedPlaces"
      />

      <q-btn
        no-caps
        color="blue"
        class="q-px-xl q-py-xs"
        size="lg"
        rounded
        :label="buttonLabel"
        :loading="hotelStore.isLoading"
        @click="handleSearch"
      />
    </div>

    <q-inner-loading :showing="hotelStore.isLoading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppSelect from './AppSelect.vue'
import { usePlaceStore } from 'src/stores/usePlaceStore'
import { useHotelStore } from 'src/stores/useHotelStore'

const placeStore = usePlaceStore()
const hotelStore = useHotelStore()

const buttonLabel = computed(() => {
  return placeStore.hasSearched ? 'Alterar busca' : 'Buscar'
})

const handleSearch = () => {
  if (!placeStore.selectedPlace) {
    placeStore.hasSearched = false
    hotelStore.setSelectedPlace(null)

    return
  }

  placeStore.hasSearched = true
  hotelStore.setSelectedPlace(placeStore.selectedPlace)
}
</script>

<style scoped lang="scss">
.hotel-search {
  border-radius: 0.625rem;
  border: none;
}
</style>
