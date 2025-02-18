import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Place } from 'src/types'

import placesData from 'src/db/place.json'

export const usePlaceStore = defineStore('place', () => {
  const places = ref<Place[]>(placesData)
  const selectedPlace = ref<{ label: string; value: string } | null>(null)
  const hasSearched = ref(false)

  const formattedPlaces = computed(() => {
    return places.value.map((place) => ({
      label: `${place.name}, ${place.state.name}`,
      value: String(place.placeId),
    }))
  })

  const selectedPlaceData = computed(() => {
    return formattedPlaces.value.find((place) => place.value === selectedPlace.value?.value)
  })

  function setSelectedPlace(place: { label: string; value: string } | null) {
    selectedPlace.value = place
  }

  function setHasSearched(value: boolean) {
    hasSearched.value = value
  }

  function resetSearch() {
    hasSearched.value = false
  }

  return {
    places,
    selectedPlace,
    hasSearched,
    formattedPlaces,
    selectedPlaceData,
    setSelectedPlace,
    setHasSearched,
    resetSearch,
  }
})
