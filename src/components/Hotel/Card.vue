<template>
  <q-card class="hotel-card q-mb-md no-shadow" @click="handleClick">
    <div class="row" :class="{ 'flex-column': $q.screen.lt.md }">
      <div :class="$q.screen.lt.md ? 'col-12' : 'col-4'">
        <app-carousel :images="hotel.images" :autoplay="autoplay" />
      </div>

      <div :class="$q.screen.lt.md ? 'col-12' : 'col-8'" class="q-pa-none q-h-100">
        <div
          class="row justify-between content-wrapper"
          :class="{ 'flex-column': $q.screen.lt.md }"
        >
          <div
            class="q-pa-md hotel-info"
            :style="$q.screen.lt.md ? 'max-width: 100%' : 'max-width: 64%'"
          >
            <div class="text-h5 text-weight-medium text-grey-8 ellipsis">
              {{ hotel.name }}
            </div>

            <div class="text-subtitle1 text-grey-8 ellipsis">
              {{ hotel.address.fullAddress }}
            </div>

            <div class="row q-gutter-sm items-center q-mt-md">
              <span class="row items-center q-mt-none">
                <div class="text-grey-6 q-mr-xs text-caption">
                  {{ stars.toFixed(1) }}
                </div>

                <q-rating v-model="stars" size="1.2em" color="amber" readonly />
              </span>

              <q-separator
                v-if="shouldRenderAmenities"
                vertical
                color="grey-6 q-my-xs"
                size="2px"
                inset
              />

              <div v-if="shouldRenderAmenities" class="row q-mt-none">
                <q-badge
                  v-for="amenity in hotelAmenities"
                  :key="amenity?.key || ''"
                  transparent
                  color="transparent"
                  text-color="grey-8"
                  class="q-pa-xs"
                >
                  <q-icon :name="amenity?.icon" size="18px" />

                  <q-tooltip anchor="top middle" self="center middle">
                    {{ amenity?.label }}
                  </q-tooltip>
                </q-badge>
              </div>
            </div>

            <q-badge
              v-if="isRefundable"
              color="grey-7"
              class="q-px-md text-weight-medium q-mt-sm text-subtitle2"
            >
              Reembolsável
            </q-badge>
          </div>

          <div
            class="text-left card-price text-grey-8"
            :class="{ 'mobile-price': $q.screen.lt.md }"
          >
            <div>
              <div class="text-caption">A partir de:</div>

              <div class="text-h6 text-weight-bold">
                <span class="text-caption q-mb-none">R$</span>

                <span class="text-h4 q-mb-none">
                  {{ currencyFormatter(hotel.price) }}
                </span>
              </div>

              <p class="text-caption q-mb-none">{{ pricePerNight }}/por noite</p>

              <div class="text-caption text-weight-medium">Impostos inclusos</div>
            </div>

            <q-btn
              color="blue"
              size="lg"
              no-caps
              label="Selecionar"
              rounded
              class="q-mt-xl q-py-sm q-px-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Hotel } from '@/types'

import { amenitiesIcons } from '@/static/hotels'

import type { HotelAmenities } from '@/enums/hotels'
import { currencyFormatter } from '@/utils/currency-format'
import { useHotelStore } from '@/stores/useHotelStore'

import AppCarousel from '@/components/ui/AppCarousel.vue'

const hotelStore = useHotelStore()

const props = defineProps<{
  hotel: Hotel
}>()

const autoplay = ref(true)
const stars = computed(() => Number(props.hotel.stars))

const handleClick = () => {
  hotelStore.setSelectedHotel(props.hotel)
}

const hotelAmenities = computed(() => {
  return props.hotel?.amenities
    ?.filter((amenity) => amenity.key && amenity.label)
    .map((amenity) => {
      return {
        key: amenity.key,
        label: amenity.label,
        icon: amenitiesIcons[amenity.key as HotelAmenities],
      }
    })
})

const shouldRenderAmenities = computed(() => {
  return props.hotel.amenities && props.hotel.amenities.length > 0
})

const isRefundable = computed(() => {
  return props.hotel.hasRefundableRoom
})

const pricePerNight = computed(() => {
  return currencyFormatter(props.hotel.price / 2)
})
</script>

<style scoped lang="scss">
.hotel-card {
  transition: all 0.3s ease;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.content-wrapper {
  height: 100%;
}

.card-price {
  display: flex;
  width: 36%;
  flex-direction: column;
  align-items: flex-start;
  border-left: 6px solid $grey-3;
  padding: 16px;

  &.mobile-price {
    width: 100%;
    border-left: none;
    border-top: 6px solid $grey-3;
    padding: 16px;

    .q-btn {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    height: auto !important;
  }

  .hotel-info {
    padding-bottom: 0 !important;
    margin-bottom: 1rem !important;
  }
}
</style>
