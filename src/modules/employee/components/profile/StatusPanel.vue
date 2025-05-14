<script setup lang="ts">
defineProps<{
  employment: string
  termination?: string | null
  formatDate: (d: string | null | undefined) => string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Employment Status</h3>

    <div class="space-y-4">
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <div class="text-sm text-gray-500">Employment Date</div>
          <div class="font-medium">{{ formatDate(employment) }}</div>
        </div>
      </div>

      <div v-if="termination" class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <div class="text-sm text-gray-500">Termination Date</div>
          <div class="font-medium">{{ formatDate(termination) }}</div>
        </div>
      </div>

      <div v-if="!termination" class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <div class="text-sm text-gray-500">Status</div>
          <div class="font-medium text-green-600">Currently Active</div>
        </div>
      </div>
    </div>
  </div>
</template>
