<template>
  <div class="row items-center justify-between q-mb-md">
    <q-breadcrumbs class="text-grey" active-color="blue">
      <template v-slot:separator>
        <q-icon size="1.4em" name="chevron_right" color="blue" />
      </template>

      <q-breadcrumbs-el label="Início" />
      <q-breadcrumbs-el label="Hotéis" />
      <q-breadcrumbs-el v-if="currentPlace" :label="`Hospedagem em ${currentPlace}`" />
    </q-breadcrumbs>

    <div class="row items-center">
      <p class="q-mb-none q-mr-xs">Organizar por</p>

      <q-select
        v-model="hotelStore.orderBy"
        :options="hotelStore.orderOptions"
        dense
        borderless
        options-dense
      >
        <template v-slot:selected-item>
          <div class="row items-center">
            <p class="q-mb-none q-ml-xs text-blue">{{ hotelStore.orderBy }}</p>
          </div>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHotelStore } from '@/stores/useHotelStore'

const hotelStore = useHotelStore()

const currentPlace = computed(() => {
  return hotelStore.selectedPlace?.label
})
</script>
