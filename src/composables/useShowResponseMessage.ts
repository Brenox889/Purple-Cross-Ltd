import { ref } from 'vue'

interface Toast {
  message: string
  type: 'success' | 'error'
}

export const toasts = ref<Toast[]>([])

export function useShowResponseMessage() {
  function showToast(message: string, type: 'success' | 'error') {
    toasts.value.push({ message, type })
    setTimeout(() => {
      toasts.value.shift()
    }, 3000)
  }

  return {
    showSuccess: (msg: string) => showToast(msg, 'success'),
    showError: (msg: string) => showToast(msg, 'error'),
  }
}
