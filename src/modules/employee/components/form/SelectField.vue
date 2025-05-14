<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <slot name="asterisk" />
    </label>

    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full rounded-md border p-2.5 appearance-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      :class="error ? 'border-red-300' : 'border-gray-300'"
    >
      <slot name="options" />
    </select>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
