<template>
  <div>
    <span class="text-subtitle1 text-grey-6 text-weight-bold">
      {{ label }}

      <span v-if="required" class="text-red-5">*</span>
    </span>

    <q-select
      :model-value="modelValue"
      use-input
      hide-selected
      fill-input
      dense
      outlined
      clearable
      input-debounce="0"
      :options="filteredOptions"
      @filter="filterFn"
      @update:model-value="$emit('update:modelValue', $event)"
      style="width: 100%; padding-bottom: 32px"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> Nenhum resultado encontrado </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: Option | null
  label: string
  required?: boolean
  options: Array<Option>
}>()

const originalOptions = ref<Array<Option>>(props.options)

const formattedOptions = computed(() => {
  return originalOptions.value.map((option) => {
    if (typeof option === 'string') {
      return { label: option, value: option }
    }
    return {
      label: option.label || (typeof option === 'object' ? JSON.stringify(option) : String(option)),
      value: option.value,
    }
  })
})

const filteredOptions = ref<Array<Option>>(formattedOptions.value)

const filterFn = (val: string, update: (fn: () => void) => void) => {
  update(() => {
    if (val === '') {
      filteredOptions.value = formattedOptions.value
      return
    }

    const needle = val.toLowerCase()
    filteredOptions.value = formattedOptions.value.filter((v) => {
      const label = v.label?.toLowerCase() || ''
      return label.indexOf(needle) > -1
    })
  })
}
</script>
