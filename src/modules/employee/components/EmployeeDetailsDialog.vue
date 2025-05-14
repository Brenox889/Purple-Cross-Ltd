<script setup lang="ts">
import type { Employee } from '@/modules/employee/types/employee.types'
import { formatDate } from '../composables/useEmployeeHelpers'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

defineProps<{
  open: boolean
  employee: Employee | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Gerenciar foco para acessibilidade
const modalRef = ref<HTMLDivElement | null>(null)

// Fechar o modal com a tecla Escape
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

watch(
  () => modalRef.value,
  (el) => {
    if (el) {
      el.focus()
    }
  },
  { flush: 'post' },
)
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open && employee"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-details-title"
        ref="modalRef"
        tabindex="-1"
      >
        <!-- Overlay com animação de fade -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          @click="emit('close')"
        />

        <!-- Modal com borda roxa e sombra -->
        <div
          class="relative bg-white rounded-lg p-6 w-full max-w-lg shadow-xl border border-purple-100 overflow-hidden"
        >
          <!-- Decoração visual -->
          <div class="absolute top-0 left-0 w-full h-1 bg-purple-600"></div>

          <!-- Botão de fechar no canto superior direito -->
          <button
            @click="emit('close')"
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Título com cor roxa -->
          <h2
            id="employee-details-title"
            class="text-xl font-semibold mb-6 text-purple-800 pb-2 border-b"
          >
            Employee Details
          </h2>

          <!-- Conteúdo com grid para melhor organização -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div class="bg-gray-50 p-3 rounded-md">
              <div class="text-gray-500 text-xs uppercase font-medium mb-1">Full Name</div>
              <div class="font-medium">{{ employee.fullName }}</div>
            </div>

            <div class="bg-gray-50 p-3 rounded-md">
              <div class="text-gray-500 text-xs uppercase font-medium mb-1">Occupation</div>
              <div class="font-medium">{{ employee.occupation }}</div>
            </div>

            <div class="bg-gray-50 p-3 rounded-md">
              <div class="text-gray-500 text-xs uppercase font-medium mb-1">Department</div>
              <div class="font-medium">{{ employee.department }}</div>
            </div>

            <div class="bg-gray-50 p-3 rounded-md">
              <div class="text-gray-500 text-xs uppercase font-medium mb-1">Employment Date</div>
              <div class="font-medium">{{ formatDate(employee.employmentDate) }}</div>
            </div>

            <div class="bg-gray-50 p-3 rounded-md md:col-span-2">
              <div class="text-gray-500 text-xs uppercase font-medium mb-1">Termination Date</div>
              <div class="font-medium">
                {{ employee.terminationDate ? formatDate(employee.terminationDate) : '-' }}
              </div>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="flex justify-end mt-6 pt-4 border-t">
            <button
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              @click="emit('close')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
