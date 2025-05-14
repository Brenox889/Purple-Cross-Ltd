// src/modules/employee/composables/useEmployeeProfile.ts
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeeStore } from '@/store/employees'
import type { Employee } from '@/modules/employee/types/employee.types'
import { useShowResponseMessage } from '@/composables/useShowResponseMessage'

export default function useEmployeeProfile() {
  /* ─────────────────────────── routing & store ─────────────────────────── */
  const route = useRoute()
  const router = useRouter()
  const store = useEmployeeStore()

  /* ────────────────────────────── derived refs ─────────────────────────── */
  const employeeId = computed(() => Number(route.params.id)) // current :id
  const isEditMode = computed(() => route.path.endsWith('/edit')) // true when `/edit`

  /* ─────────────────────────── profile state refs ──────────────────────── */
  const employee = ref<Employee | null>(null) // original from store
  // Local copy bound to form inputs (omit immutable id / code)
  const form = ref<Omit<Employee, 'id' | 'code'>>({
    fullName: '',
    occupation: '',
    department: '',
    dateOfEmployment: '',
    terminationDate: '',
  })

  /* ─────────────────────────── UI computed helpers ─────────────────────── */
  // Two-letter initials for avatar (or ??)
  const initials = computed(() =>
    form.value.fullName
      ? form.value.fullName
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '??',
  )

  const { showError, showSuccess } = useShowResponseMessage()
  // Active status badge (no termination date)
  const isActive = computed(() => !form.value.terminationDate)

  /* ─────────────────────────── utility functions ───────────────────────── */
  /** Format ISO date → DD/MM/YYYY (pt-BR). */
  function formatDate(d?: string | null) {
    if (!d) return '-'
    return new Intl.DateTimeFormat('pt-BR').format(new Date(d))
  }

  /** Fetch employee from store or redirect home if not found. */
  function loadEmployee() {
    const id = employeeId.value
    if (!id) return router.push('/')

    const found = store.employees.find((e) => e.id === id)
    if (!found) return router.push('/')

    employee.value = found
    form.value = { ...found }
  }

  /** Persist edited form back to store and leave edit mode. */
  function save() {
    if (!employee.value) return

    try {
      store.update({
        ...form.value,
        id: employee.value.id,
        code: employee.value.code,
      })

      showSuccess('Employee updated successfully!')
      router.push(`/employees/${employee.value.id}`)
    } catch (err) {
      showError('Failed to update employee. Please try again.')
      console.error(err)
    }
  }

  /* ─────────────────────────── lifecycle hooks ─────────────────────────── */
  onMounted(loadEmployee) // first load
  watch(() => route.params.id, loadEmployee) // reload on route change

  return {
    // reactive flags
    isEditMode,
    // entity refs
    employeeId,
    employee,
    form,
    // display helpers
    initials,
    isActive,
    formatDate,
    // actions
    save,
  }
}
