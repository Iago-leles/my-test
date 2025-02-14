import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Hotel } from 'src/types'

import hotelData from 'src/data/hotel.json'

export const useHotelStore = defineStore('hotel', () => {
  const hotels = ref<Hotel[]>(hotelData.flatMap((data) => data.hotels) as Hotel[])
  const selectedHotel = ref<Hotel | null>(null)
  const isLoading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = 10
  const selectedPlace = ref<{ value: string; label: string } | null>(null)
  const orderBy = ref('Recomendados')
  const orderOptions = ['Recomendados', 'Melhor avaliados']

  const allHotels = computed(() => {
    return hotelData
  })

  const filteredHotels = computed(() => {
    let result = hotelData.flatMap((data) => data.hotels || []) as Hotel[]

    if (selectedPlace.value?.value) {
      result = allHotels.value
        .filter((places) => places.placeId === Number(selectedPlace.value?.value))
        .flatMap((places) => places.hotels) as Hotel[]
    }

    switch (orderBy.value) {
      case 'Recomendados':
        return [...result].sort((a, b) => Number(a.price) - Number(b.price))
      case 'Melhor avaliados':
        return [...result].sort((a, b) => Number(b.stars) - Number(a.stars))
      default:
        return result
    }
  })

  const displayedHotels = computed(() => {
    const endIndex = currentPage.value * itemsPerPage
    return filteredHotels.value.slice(0, endIndex)
  })

  function fetchNextPage(index: number, done: () => void) {
    setTimeout(() => {
      if (displayedHotels.value.length < filteredHotels.value.length) {
        currentPage.value++
        done()
      } else {
        done()
      }
    }, 500)
  }

  function setSelectedPlace(place: { value: string; label: string } | null) {
    selectedPlace.value = place || null
  }

  function setSelectedHotel(hotel: Hotel | null) {
    selectedHotel.value = hotel || null
  }

  return {
    hotels,
    isLoading,
    filteredHotels,
    displayedHotels,
    selectedPlace,
    orderBy,
    orderOptions,
    selectedHotel,
    fetchNextPage,
    setSelectedPlace,
    setSelectedHotel,
  }
})
