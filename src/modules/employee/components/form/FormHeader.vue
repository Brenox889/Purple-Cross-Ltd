<script setup lang="ts">
defineProps<{ isEditing: boolean }>()
</script>

<template>
  <div class="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4 text-white">
    <h1 class="text-xl font-bold flex items-center">
      <slot name="icon" />
      {{ isEditing ? 'Edit Employee' : 'New Employee' }}
    </h1>
  </div>
</template>
