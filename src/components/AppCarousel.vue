<template>
  <div class="relative-position">
    <q-carousel
      v-model="slide"
      control-color="white"
      control-text-color="black"
      control-type="regular"
      arrows
      infinite
      :autoplay="autoplay"
      height="300px"
      class="carousel-card"
      :style="fullRounded ? 'border-radius: 14px !important' : ''"
    >
      <q-carousel-slide v-for="(img, index) in images" :key="index" :name="index" class="q-pa-none">
        <q-img :src="img" style="height: 100%" />
      </q-carousel-slide>
    </q-carousel>

    <div v-if="showCounter" class="absolute bg-grey-10 text-white q-px-md counter">
      {{ `${slide + 1} / ${images.length}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  images: string[]
  autoplay?: boolean
  showCounter?: boolean
  fullRounded?: boolean
}>()

const slide = ref(0)
</script>

<style scoped lang="scss">
.carousel-card {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.counter {
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
  border-radius: 10px;
}
</style>
