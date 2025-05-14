import { ref, watch, onMounted, computed } from 'vue'
import type { SortableColumn, Employee } from '../types'

export default function useEmployeeTable(
  store: ReturnType<typeof import('@/store/employees').useEmployeeStore>,
) {
  // Reactive state for search, filter, and pagination
  const searchQuery = ref('')
  const departmentFilter = ref('')
  const currentPage = ref(1)

  // Sorting configuration
  const sortColumn = ref<
    'fullName' | 'occupation' | 'department' | 'dateOfEmployment' | 'terminationDate'
  >('fullName')
  const sortDirection = ref<'asc' | 'desc'>('asc')

  // Employee detail modal state
  const showDetails = ref(false)
  const selectedEmployee = ref<Employee | null>(null)

  // Opens the details modal for a selected employee
  function viewEmployee(id: number) {
    const emp = store.employees.find((e) => e.id === id)
    if (emp) {
      selectedEmployee.value = emp
      showDetails.value = true
    }
  }

  // Triggers a new fetch with current filters and pagination
  function load() {
    store.loadPage(currentPage.value, {
      search: searchQuery.value.trim(),
      department: departmentFilter.value.trim() || undefined,
      sortBy: sortColumn.value,
      direction: sortDirection.value,
    })
  }

  // Initial fetch on mount
  onMounted(load)

  // When filters change, reset to page 1 and reload
  watch([searchQuery, departmentFilter], () => {
    currentPage.value = 1
    load()
  })

  // When only pagination changes
  watch(currentPage, () => {
    load()
  })

  // Reload when sorting changes
  watch([sortColumn, sortDirection], () => {
    load()
  })

  // Toggles sort direction or sets new column to sort by
  function toggleSort(column: SortableColumn) {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.value = column
      sortDirection.value = 'asc'
    }
  }

  // Computed values for table rendering and pagination
  const rows = computed(() => store.employees)
  const isLoading = computed(() => store.isLoading)
  const totalPages = computed(() => store.totalPages)

  return {
    searchQuery,
    departmentFilter,
    currentPage,
    sortColumn,
    sortDirection,
    showDetails,
    selectedEmployee,
    viewEmployee,
    toggleSort,
    rows,
    isLoading,
    totalPages,
    load,
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB')
}

export function getEmploymentStatus(date: string) {
  const now = new Date()
  const d = new Date(date)
  return d > now ? 'To be employed' : 'Currently employed'
}

export function getTerminationStatus(date: string) {
  const now = new Date()
  const d = new Date(date)
  return d > now ? 'To be terminated' : 'Terminated'
}

export function getEmploymentStatusClass(date: string) {
  return getEmploymentStatus(date) === 'To be employed'
    ? 'text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full'
    : 'text-green-600 bg-green-100 px-2 py-0.5 rounded-full'
}

export function getTerminationStatusClass(date: string) {
  return getTerminationStatus(date) === 'To be terminated'
    ? 'text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full'
    : 'text-red-600 bg-red-100 px-2 py-0.5 rounded-full'
}
