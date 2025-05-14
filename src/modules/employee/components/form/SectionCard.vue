<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="bg-gray-50 p-4 rounded-md border border-gray-100">
    <h2 class="text-sm uppercase font-semibold text-gray-500 mb-4">{{ title }}</h2>
    <slot />
  </div>
</template>
