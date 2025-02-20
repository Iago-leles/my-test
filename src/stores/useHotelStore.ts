import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Hotel } from '@/types'

import hotelData from '@/db/hotel.json'

import { HotelOrder } from '@/enums/hotels'

export const useHotelStore = defineStore('hotel', () => {
  const hotels = ref<Hotel[]>(hotelData.flatMap((data) => data.hotels) as Hotel[])
  const selectedHotel = ref<Hotel | null>(null)
  const isLoading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = 10
  const selectedPlace = ref<{ value: string; label: string } | null>(null)
  const orderBy = ref(HotelOrder.RECOMMENDED)
  const orderOptions = [HotelOrder.RECOMMENDED, HotelOrder.BEST_RATED]
  const filterName = ref('')

  const allHotels = computed(() => {
    return hotelData
  })

  function setFilterName(value: string) {
    filterName.value = value
  }

  const filteredHotels = computed(() => {
    let result = hotelData.flatMap((data) => data.hotels || []) as Hotel[]

    if (selectedPlace.value?.value) {
      result = allHotels.value
        .filter((places) => places.placeId === Number(selectedPlace.value?.value))
        .flatMap((places) => places.hotels) as Hotel[]
    }

    if (filterName.value.trim()) {
      const searchTerm = filterName.value.trim().toLowerCase()
      result = result.filter((hotel) => hotel.name.toLowerCase().includes(searchTerm))
    }

    const sortedOptions: Record<HotelOrder, Hotel[]> = {
      [HotelOrder.RECOMMENDED]: [...result].sort((a, b) => Number(a.price) - Number(b.price)),
      [HotelOrder.BEST_RATED]: [...result].sort((a, b) => Number(b.stars) - Number(a.stars)),
    }

    return sortedOptions[orderBy.value]
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

        return
      }

      done()
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
    filterName,
    setFilterName,
    filteredHotels,
    displayedHotels,
    selectedPlace,
    orderOptions,
    orderBy,
    selectedHotel,
    fetchNextPage,
    setSelectedPlace,
    setSelectedHotel,
  }
})
