<template>
  <div class="container">
    <q-breadcrumbs class="text-grey" active-color="blue">
      <template v-slot:separator>
        <q-icon size="1.4em" name="chevron_right" color="blue" />
      </template>

      <q-breadcrumbs-el :label="$t('hotels.breadcrumb.home')" />
      <q-breadcrumbs-el :label="$t('hotels.breadcrumb.hotels')" />
      <q-breadcrumbs-el
        v-if="currentPlace"
        :label="$t('hotels.breadcrumb.selected_hotel', { place: currentPlace })"
      />
    </q-breadcrumbs>

    <div class="row items-center">
      <p class="q-mb-none text-grey-7">
        {{ $t('hotels.breadcrumb.order_by') }}
      </p>

      <q-select
        v-model="hotelStore.orderBy"
        :options="hotelStore.orderOptions"
        dense
        borderless
        options-dense
      >
        <template v-slot:selected-item>
          <div class="row items-center">
            <p class="q-mb-none q-ml-xs text-blue selected">
              {{ hotelStore.orderBy }}
            </p>
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

const currentPlace = computed(() => hotelStore.selectedPlace?.label)
</script>

<style scoped>
.selected {
  font-weight: 700;
  font-style: italic;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
