import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchEmployees,
  addEmployee as addToMock,
  updateEmployee as updateInMock,
  deleteEmployee as deleteFromMock,
} from '@/modules/employee/services/employees'
import { useNotification } from '@/composables/useNotification'

import type { Employee } from '@/modules/employee/types'

import { useErrorHandler } from '@/composables/useErrorHandler'

interface Filters {
  search?: string
  department?: string
  sortBy?: keyof Employee
  direction?: 'asc' | 'desc'
}

// Pinia store to manage employee-related state
export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])
  const isLoading = ref(false)
  const totalPages = ref(1)
  const itemsPerPage = 5
  const { showSuccess } = useNotification()

  const { handleError } = useErrorHandler()

  // Track current filters used for pagination and search
  const activeFilters = ref<Filters>({
    sortBy: 'dateOfEmployment',
    direction: 'desc',
  })

  // List of available departments to populate dropdowns
  const departments = ref<string[]>([])

  /**
   * Load a paginated and filtered list of employees from the service
   */
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

    const { data, total } = await fetchEmployees(page, itemsPerPage, {
      ...activeFilters.value,
      sortBy: filters?.sortBy,
      direction: filters?.direction,
    })

    employees.value = data
    totalPages.value = Math.ceil(total / itemsPerPage)

    // Extract unique departments from loaded employees
    const seen = new Set<string>()
    departments.value = data
      .map((e) => e.department)
      .filter((d) => !!d && !seen.has(d) && seen.add(d))

    isLoading.value = false
  }

  /**
   * Add a new employee and reload the first page
   */
  function add(emp: Omit<Employee, 'id'>) {
    try {
      addToMock({ ...emp, id: Date.now() })
      loadPage(1)
    } catch (err) {
      handleError(err, 'Failed to add employee.')
    }
  }

  /**
   * Update an employee's data and reload the first page
   */
  function update(emp: Employee) {
    try {
      updateInMock(emp)
      loadPage(1)
      showSuccess('Employee updated successfully!')
    } catch (err) {
      handleError(err, 'Failed to update employee.')
    }
  }

  /**
   * Delete an employee by ID and reload the first page
   */
  function remove(id: number) {
    try {
      deleteFromMock(id)
      loadPage(1)
      showSuccess('Employee deleted successfully!')
    } catch (err) {
      handleError(err, 'Failed to delete employee.')
    }
  }

  return {
    employees,
    isLoading,
    totalPages,
    loadPage,
    add,
    update,
    remove,
    departments,
  }
})
