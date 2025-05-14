<script setup lang="ts">
defineProps<{
  label: string
  column: 'fullName' | 'occupation' | 'department' | 'employmentDate' | 'terminationDate'
  sortColumn: string
  sortDirection: 'asc' | 'desc'
}>()

defineEmits<{
  (e: 'sort', column: string): void
}>()
</script>

<template>
  <th
    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-purple-700"
    @click="$emit('sort', column)"
  >
    <div class="flex items-center">
      {{ label }}
      <span v-if="sortColumn === column" class="ml-1">
        <svg
          v-if="sortDirection === 'asc'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </div>
  </th>
</template>
