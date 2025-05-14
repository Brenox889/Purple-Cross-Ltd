import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchEmployees,
  addEmployee as addToMock,
  updateEmployee as updateInMock,
  deleteEmployee as deleteFromMock,
} from '@/modules/employee/services/employees'
import type { Employee } from '@/modules/employee/types/employee.types'

interface Filters {
  search?: string
  department?: string
}

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])
  const isLoading = ref(false)
  const totalPages = ref(1)
  const itemsPerPage = 5
  const activeFilters = ref<Filters>({})

  async function loadPage(
    page = 1,
    filters?: {
      search?: string
      department?: string
      sortBy?: keyof Employee
      direction?: 'asc' | 'desc'
    },
  ) {
    if (filters) {
      activeFilters.value = { ...activeFilters.value, ...filters }
    }

    isLoading.value = true
    const { data, total } = await fetchEmployees(page, itemsPerPage, activeFilters.value)
    employees.value = data
    totalPages.value = Math.ceil(total / itemsPerPage)
    isLoading.value = false
  }
  function add(emp: Omit<Employee, 'id'>) {
    addToMock({ ...emp, id: Date.now() })
    loadPage(1)
  }
  function update(emp: Employee) {
    updateInMock(emp)
    loadPage(1)
  }
  function remove(id: number) {
    deleteFromMock(id)
    loadPage(1)
  }

  return { employees, isLoading, totalPages, loadPage, add, update, remove }
})
