<template>
  <q-card class="hotel-search" flat bordered>
    <p class="text-h5 q-pa-sm q-ml-sm q-mb-none text-grey-8">{{ $t('hotels.search.title') }}</p>

    <q-separator color="grey-6" />

    <div class="q-pa-md full-width column wrap items-end">
      <div class="inputs">
        <app-select
          :label="$t('hotels.search.destination')"
          v-model="placeStore.selectedPlace"
          required
          outlined
          clearable
          dense
          display-value
          class="q-mb-md full-width"
          :options="placeStore.formattedPlaces"
        />

        <app-text-input
          :model="name"
          :label="$t('hotels.search.name')"
          required
          dense
          class="q-mb-md full-width"
          outlined
        />
      </div>

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
import { computed, ref } from 'vue'

import AppSelect from '@/components/ui/AppSelect.vue'
import AppTextInput from '@/components/ui/AppTextInput.vue'

import { usePlaceStore } from '@/stores/usePlaceStore'
import { useHotelStore } from '@/stores/useHotelStore'

import { useI18n } from 'vue-i18n'

const placeStore = usePlaceStore()
const hotelStore = useHotelStore()

const name = ref('')
const { t } = useI18n()

const buttonLabel = computed(() => {
  return placeStore.hasSearched ? t('hotels.search.button_alter') : t('hotels.search.button')
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

.inputs {
  display: flex;
  gap: 1rem;
  width: 100%;
}
</style>
