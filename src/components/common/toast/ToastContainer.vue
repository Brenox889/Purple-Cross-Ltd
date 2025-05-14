<script setup lang="ts">
import { toasts } from '@/composables/useShowResponseMessage'
import ToastMessage from './ToastMessage.vue'
</script>

<template>
  <div class="fixed top-5 right-5 z-[9999] space-y-2">
    <ToastMessage
      v-for="(toast, index) in toasts"
      :key="index"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>
