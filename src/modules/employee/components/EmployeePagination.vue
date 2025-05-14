<script setup lang="ts">
import { computed } from 'vue'

const modelValue = defineModel<number>({ required: true })
const props = defineProps<{ totalPages: number }>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    modelValue.value = page
  }
}

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = modelValue.value
  const delta = 2
  const range = []

  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  if (start > 2) range.unshift('...')
  if (end < total - 1) range.push('...')

  range.unshift(1)
  if (total > 1) range.push(total)

  return range
})
</script>

<template>
  <div class="mt-6 flex justify-end">
    <nav class="inline-flex shadow-sm isolate rounded-md" aria-label="Pagination">
      <button
        @click="goToPage(modelValue - 1)"
        :disabled="modelValue <= 1"
        class="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>

      <template v-for="(page, index) in visiblePages" :key="index">
        <span
          v-if="page === '...'"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-400"
        >
          ...
        </span>
        <button
          v-else
          @click="goToPage(page as number)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            page === modelValue
              ? 'z-10 bg-purple-600 text-white border-purple-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
      </template>

      <button
        @click="goToPage(modelValue + 1)"
        :disabled="modelValue >= props.totalPages"
        class="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  </div>
</template>
