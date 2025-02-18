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
import HotelSearch from 'components/Hotel/Search.vue'
import HotelList from 'components/Hotel/List.vue'
import HotelOrderFilter from 'components/Hotel/OrderFilter.vue'
</script>
