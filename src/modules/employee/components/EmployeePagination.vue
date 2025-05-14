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

// Versão simplificada para telas pequenas
const simplifiedVisiblePages = computed(() => {
  const total = props.totalPages
  const current = modelValue.value
  const range = []

  // Mostrar apenas página atual, anterior e próxima em telas pequenas
  if (current > 1) range.push(current - 1)
  range.push(current)
  if (current < total) range.push(current + 1)

  return range
})
</script>

<template>
  <div class="mt-6 flex justify-center sm:justify-end">
    <!-- Versão para telas médias e grandes -->
    <nav class="hidden sm:inline-flex shadow-sm rounded-md overflow-hidden" aria-label="Pagination">
      <button
        @click="goToPage(modelValue - 1)"
        :disabled="modelValue <= 1"
        class="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <template v-for="(page, index) in visiblePages" :key="index">
        <span
          v-if="page === '...'"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-400 border-gray-300 bg-white"
        >
          ...
        </span>
        <button
          v-else
          @click="goToPage(page as number)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors',
            page === modelValue
              ? 'z-10 bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
      </template>

      <button
        @click="goToPage(modelValue + 1)"
        :disabled="modelValue >= props.totalPages"
        class="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </nav>

    <!-- Versão simplificada para telas pequenas -->
    <nav class="sm:hidden flex items-center space-x-2" aria-label="Pagination">
      <button
        @click="goToPage(modelValue - 1)"
        :disabled="modelValue <= 1"
        class="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span class="sr-only">Previous</span>
        <span class="font-bold">&lt;</span>
      </button>

      <div class="flex items-center space-x-1">
        <template v-for="(page, index) in simplifiedVisiblePages" :key="index">
          <button
            @click="goToPage(page as number)"
            :class="[
              'inline-flex items-center justify-center w-9 h-9 rounded-md border text-sm font-medium transition-colors',
              page === modelValue
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300',
            ]"
          >
            {{ page }}
          </button>
        </template>
      </div>

      <button
        @click="goToPage(modelValue + 1)"
        :disabled="modelValue >= props.totalPages"
        class="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span class="sr-only">Next</span>
        <span class="font-bold">&gt;</span>
      </button>

      <div class="text-sm text-gray-500 ml-2">Page {{ modelValue }} of {{ props.totalPages }}</div>
    </nav>
  </div>
</template>
