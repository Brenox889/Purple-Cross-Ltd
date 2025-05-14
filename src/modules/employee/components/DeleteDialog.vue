<script setup lang="ts">
defineProps<{
  open: boolean
  name: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div class="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md shadow-xl dark:bg-background">
        <h2 class="text-base sm:text-lg font-semibold text-foreground mb-2">Delete Employee</h2>
        <p class="text-sm text-muted-foreground mb-4 sm:mb-6">
          Are you sure you want to delete <strong>{{ name }}</strong
          >? This action cannot be undone.
        </p>
        <div class="flex flex-col sm:flex-row sm:justify-end gap-2">
          <button
            class="px-4 py-2 rounded-md border border-border text-sm text-foreground hover:bg-muted order-1 sm:order-none"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded-md bg-destructive text-white text-sm hover:bg-red-700 order-0 sm:order-none"
            @click="emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
