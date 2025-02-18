<template>
  <div>
    <span class="text-subtitle1 text-grey-6 text-weight-bold">
      {{ label }}

      <span v-if="required" class="text-red-5">*</span>
    </span>

    <q-input :model-value="model" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  model: string
  label: string
  required: boolean
}>()
</script>
