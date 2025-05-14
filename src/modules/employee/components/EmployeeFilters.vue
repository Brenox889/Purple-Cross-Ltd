<script setup lang="ts">
import { computed } from 'vue'

const searchQuery = defineModel<string>('searchQuery')
const departmentFilter = defineModel<string>('departmentFilter')

const departments = computed(() => [
  'Technology',
  'Finance',
  'HR',
  'Marketing',
  'Design',
  'Administration',
])
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <!-- Search input - smaller and more compact -->
    <div class="relative w-64">
      <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <svg
          class="h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        class="block w-full h-9 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
        placeholder="Search employees..."
      />
    </div>

    <!-- Department dropdown - more subtle styling -->
    <div class="relative w-48">
      <select
        id="department-filter"
        v-model="departmentFilter"
        class="block w-full h-9 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-700"
      >
        <option value="">All departments</option>
        <option v-for="department in departments" :key="department" :value="department">
          {{ department }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          class="h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
