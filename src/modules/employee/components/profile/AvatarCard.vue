<script setup lang="ts">
defineProps<{
  initials: string
  fullName: string
  occupation: string
  department: string
  isActive: boolean
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
    <div
      class="w-32 h-32 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4"
    >
      {{ initials }}
    </div>

    <h2 class="text-xl font-bold text-center text-gray-800 mb-2">{{ fullName }}</h2>
    <div class="text-purple-600 font-medium text-center">{{ occupation }}</div>

    <div class="mt-3 px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
      {{ department }}
    </div>

    <div class="mt-6 flex items-center justify-center">
      <div
        class="w-3 h-3 rounded-full mr-2"
        :class="isActive ? 'bg-green-500' : 'bg-red-500'"
      ></div>
      <span class="font-medium" :class="isActive ? 'text-green-600' : 'text-red-600'">
        {{ isActive ? 'Active' : 'Inactive' }}
      </span>
    </div>
  </div>
</template>
