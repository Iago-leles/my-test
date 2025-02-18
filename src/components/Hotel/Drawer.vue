<template>
  <q-drawer
    overlay
    v-model="isHotelSelected"
    side="right"
    bordered
    class="hotel-drawer"
    :width="$q.screen.lt.md ? 400 : 500"
    @hide="onHide"
  >
    <q-scroll-area class="fit" :style="$q.screen.lt.md ? 'width: 88vw !important' : ''">
      <div v-if="$q.screen.lt.md" class="row justify-end" @click="onHide">
        <q-icon name="close" size="24px" class="q-mt-none text-grey-8" />
      </div>

      <span class="row items-center q-mt-none">
        <div class="text-grey-6 q-mr-xs text-caption">
          {{ stars.toFixed(1) }}
        </div>

        <q-rating v-model="stars" size="1.2em" color="amber" readonly />
      </span>

      <div>
        <p class="text-h5 text-grey-8 q-mb-none">{{ hotel?.name }}</p>

        <p class="text-body2 text-grey-8">{{ hotel?.address.fullAddress }}</p>
      </div>

      <app-carousel :images="hotel?.images || []" :autoplay="true" show-counter full-rounded />

      <div class="q-mt-md">
        <div v-if="shouldRenderAmenities">
          <p class="text-h6 q-mb-xs text-grey-8 text-weight-light">Facilidades do hotel</p>

          <q-separator size="2px" />

          <div class="row q-mt-md">
            <div
              v-if="shouldRenderAmenities"
              class="row q-mt-none"
              style="display: flex; justify-content: space-between; width: 100%"
            >
              <div
                v-for="amenity in displayedAmenities"
                :key="amenity?.label || ''"
                class="amenity-item q-pa-xs text-grey-8"
              >
                <q-icon :name="amenity?.icon" size="16px" class="q-mr-sm" />

                <span class="text-subtitle2 text-weight-light">{{ amenity?.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-center q-my-xs">
          <q-btn
            v-if="hasMoreAmenities"
            color="blue"
            outline
            rounded
            class="q-mb-md"
            @click="showAllAmenities = !showAllAmenities"
          >
            {{ showAllAmenities ? 'Mostrar menos' : 'Mostrar todas as facilidades' }}
          </q-btn>
        </div>

        <q-separator size="2px" v-if="hotel?.description && shouldRenderAmenities" />

        <div class="q-mt-md" v-if="hotel?.description">
          <p class="text-h6 q-mb-md text-weight-light">Conheça um pouco mais</p>

          <p class="text-body2 text-grey-8" v-html="hotel?.description" />
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Hotel } from '@/types'

import { useHotelStore } from '@/stores/useHotelStore'

import AppCarousel from '@/components/ui/AppCarousel.vue'

import { amenitiesIcons } from '@/static/hotels'

import type { HotelAmenities } from '@/enums/hotels'

const props = defineProps<{
  hotel?: Hotel | null
}>()

const hotelStore = useHotelStore()

const isHotelSelected = computed(() => hotelStore.selectedHotel !== null)

const stars = computed(() => Number(props.hotel?.stars))

const hotelAmenities = computed(() => {
  return props.hotel?.amenities
    ?.filter((amenity) => amenity.key && amenity.label)
    .map((amenity) => {
      return {
        label: amenity.label,
        icon: amenitiesIcons[amenity.key as HotelAmenities],
      }
    })
})

const shouldRenderAmenities = computed(
  () => Array.isArray(props.hotel?.amenities) && props.hotel.amenities.length > 0,
)

const showAllAmenities = ref(false)
const INITIAL_AMENITIES_COUNT = 3

const displayedAmenities = computed(() => {
  if (!hotelAmenities.value) return []
  return showAllAmenities.value
    ? hotelAmenities.value
    : hotelAmenities.value.slice(0, INITIAL_AMENITIES_COUNT)
})

const hasMoreAmenities = computed(() => {
  return hotelAmenities.value && hotelAmenities.value.length > INITIAL_AMENITIES_COUNT
})

const onHide = () => {
  hotelStore.setSelectedHotel(null)
}
</script>

<style lang="scss">
.hotel-drawer {
  padding: 16px;
  width: 500px !important;
}

.amenity-item {
  display: flex;
  align-items: center;
  min-height: 32px;
}
</style>
