<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps<{ isEditing: boolean }>()
defineEmits(['submit'])
const router = useRouter()
</script>

<template>
  <div class="flex justify-end gap-3 pt-4 border-t">
    <button
      type="button"
      @click="router.push('/')"
      class="px-4 py-2.5 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
    >
      Cancel
    </button>

    <button
      type="button"
      @click="$emit('submit')"
      class="px-6 py-2.5 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors flex items-center"
    >
      <slot name="icon" />
      {{ isEditing ? 'Update' : 'Save' }}
    </button>
  </div>
</template>
