<script setup lang="ts">
import { ref } from 'vue'
import { useEmployeeStore } from '@/store/employees'

import { EmployeeTableHeader, EmployeeTableRow, EmployeeTableEmpty } from '.'

import EmployeeFilters from '@/modules/employee/components/EmployeeFilters.vue'
import EmployeePagination from '@/modules/employee/components/EmployeePagination.vue'
import EmployeeDetailsDialog from '@/modules/employee/components/EmployeeDetailsDialog.vue'
import DeleteDialog from '@/modules/employee/components/DeleteDialog.vue'

import type { Employee } from '../../types/employee.types'
import useCsvHandlers from '../../composables/useCsvHandlers'
import useEmployeeTable from '../../composables/useEmployeeHelpers'

const store = useEmployeeStore()

const {
  searchQuery,
  departmentFilter,
  currentPage,
  sortColumn,
  sortDirection,
  toggleSort,
  showDetails,
  selectedEmployee,
  viewEmployee,
  rows,
  isLoading,
  totalPages,
} = useEmployeeTable(store)

const { fileInput, exportToCSV, importCSV } = useCsvHandlers(store)

const showModal = ref(false)
const employeeToDelete = ref<Employee | null>(null)

function confirmDelete(emp: Employee) {
  employeeToDelete.value = emp
  showModal.value = true
}

function deleteEmployee() {
  if (employeeToDelete.value) store.remove(employeeToDelete.value.id)
  showModal.value = false
}

const columns = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'occupation', label: 'Occupation' },
  { key: 'department', label: 'Department' },
  { key: 'employmentDate', label: 'Employment Date' },
  { key: 'terminationDate', label: 'Termination Date' },
] as const
</script>

<template>
  <div class="employee-management-container">
    <!-- Filters -->
    <EmployeeFilters
      v-model:searchQuery="searchQuery"
      v-model:departmentFilter="departmentFilter"
    />

    <!-- Table Actions -->
    <div class="flex flex-wrap items-center justify-end mb-4">
      <div class="flex items-center space-x-3">
        <input ref="fileInput" type="file" accept=".csv" class="hidden" @change="importCSV" />

        <button
          @click="fileInput?.click()"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          Import CSV
        </button>

        <button
          @click="exportToCSV"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          Export CSV
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-purple-50">
          <tr>
            <EmployeeTableHeader
              v-for="col in columns"
              :key="col.key"
              :label="col.label"
              :column="col.key"
              :sort-column="sortColumn"
              :sort-direction="sortDirection"
              @sort="toggleSort"
            />
            <th
              class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-purple-700"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody v-if="isLoading" class="divide-y divide-gray-200">
          <tr v-for="n in 5" :key="n" class="animate-pulse">
            <td v-for="i in 6" :key="i" class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else class="bg-white divide-y divide-gray-200">
          <EmployeeTableRow
            v-for="emp in rows"
            :key="emp.id"
            :employee="emp"
            @view="viewEmployee"
            @delete="confirmDelete"
          />
          <EmployeeTableEmpty v-if="rows.length === 0" />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6">
      <EmployeePagination v-model="currentPage" :total-pages="totalPages" />
    </div>

    <!-- Create Button -->
    <div class="flex justify-end mt-6">
      <RouterLink
        to="/employees/new"
        class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Create Employee
      </RouterLink>
    </div>

    <!-- Modals -->
    <EmployeeDetailsDialog
      :open="showDetails"
      :employee="selectedEmployee"
      @close="showDetails = false"
    />

    <DeleteDialog
      :open="showModal"
      :name="employeeToDelete?.fullName ?? ''"
      @confirm="deleteEmployee"
      @close="showModal = false"
    />
  </div>
</template>
