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
        <div>
          <div class="text-sm text-gray-500">Employment Date</div>
          <div class="font-medium">{{ formatDate(employment) }}</div>
        </div>
      </div>

      <div v-if="termination" class="flex items-center">
        <div>
          <div class="text-sm text-gray-500">Termination Date</div>
          <div class="font-medium">{{ formatDate(termination) }}</div>
        </div>
      </div>

      <div v-if="!termination" class="flex items-center">
        <div>
          <div class="text-sm text-gray-500">Status</div>
          <div class="font-medium text-green-600">Currently Active</div>
        </div>
      </div>
    </div>
  </div>
</template>
