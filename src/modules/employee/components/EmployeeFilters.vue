<script setup lang="ts">
import IconComponent from '@/components/common/IconComponent.vue'
import { computed } from 'vue'
import FilterIcon from '@/assets/icons/filter.svg'
import ArrowDownIcon from '@/assets/icons/arrowDown.svg'

const searchQuery = defineModel<string>('searchQuery')
const departmentFilter = defineModel<string>('departmentFilter')

const departments = computed(() => [
  'Technology',
  'Human Resources',
  'Finance',
  'Marketing',
  'Operations',
  'Sales',
  'Administration',
  'Legal',
])
</script>

<template>
  <div class="flex flex-wrap items-center justify-center sm:justify-start w-full gap-3 mb-4">
    <!-- Search input -->
    <div class="relative w-64">
      <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <IconComponent :src="FilterIcon" alt="filter" />
      </div>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        class="block w-full h-9 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
        placeholder="Search employees..."
      />
    </div>

    <!-- Department dropdown -->
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
        <IconComponent :src="ArrowDownIcon" alt="arrow down" />
      </div>
    </div>
  </div>
</template>
