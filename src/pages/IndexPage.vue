<template>
  <q-page class="q-pa-lg">
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-md-10">
        <hotel-search />
      </div>

      <hotel-order-filter class="col-12 col-md-10" />

      <hotel-list class="col-12 col-md-10" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HotelSearch from 'components/HotelSearch.vue'
import HotelList from 'components/HotelList.vue'
import HotelOrderFilter from 'components/HotelOrderFilter.vue'
</script>
