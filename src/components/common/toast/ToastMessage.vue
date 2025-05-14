<script setup lang="ts">
defineProps<{
  message: string
  type: 'success' | 'error'
}>()
</script>

<template>
  <div class="toast-container">
    <div
      class="rounded-md shadow-lg border-l-4 px-5 py-4 text-sm flex items-center transition-all duration-300 transform"
      :class="{
        'bg-green-50 border-green-500 text-green-800': type === 'success',
        'bg-red-50 border-red-500 text-red-800': type === 'error',
      }"
    >
      <!-- Status indicator -->
      <div
        class="w-3 h-3 rounded-full mr-3 flex-shrink-0"
        :class="{
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
        }"
      ></div>

      <!-- Content -->
      <div class="flex-1">
        <p class="font-medium">
          {{ type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Information' }}
        </p>
        <p class="mt-1 text-sm opacity-90">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

/* Animação de entrada */
.toast-container:not(:empty) > div {
  animation: toast-slide-in 0.3s ease-out forwards;
}

@keyframes toast-slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
