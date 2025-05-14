<script setup lang="ts">
import {
  formatDate,
  getEmploymentStatus,
  getTerminationStatus,
  getEmploymentStatusClass,
  getTerminationStatusClass,
} from '@/modules/employee/composables/useEmployeeHelpers'

import IconComponent from '../../../../components/common/IconComponent.vue'
import type { Employee } from '@/modules/employee/types/employee.types'

import ViewIcon from '@/assets/icons/view.svg'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/delete.svg'

defineProps<{
  employee: Employee
}>()

defineEmits<{
  (e: 'view', id: number): void
  (e: 'delete', emp: Employee): void
}>()
</script>

<template>
  <tr class="hover:bg-purple-50 transition-colors">
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="font-medium text-gray-900">{{ employee.fullName }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ employee.occupation }}</td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
        {{ employee.department }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-gray-900">{{ formatDate(employee.dateOfEmployment) }}</div>
      <div class="text-xs mt-1" v-if="!employee.terminationDate">
        <span :class="getEmploymentStatusClass(employee.dateOfEmployment)">
          {{ getEmploymentStatus(employee.dateOfEmployment) }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-gray-900">
        {{ employee.terminationDate ? formatDate(employee.terminationDate) : '-' }}
      </div>
      <div v-if="employee.terminationDate" class="text-xs mt-1">
        <span :class="getTerminationStatusClass(employee.terminationDate)">
          {{ getTerminationStatus(employee.terminationDate) }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div class="flex space-x-2 justify-end">
        <RouterLink
          :to="`/employees/${employee.id}`"
          class="flex items-center gap-x-1.5 text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 p-1.5 rounded-md transition-colors"
          title="View Profile"
        >
          <IconComponent
            :src="ViewIcon"
            alt="View details"
            size="5"
            class="sm:w-5 sm:h-5 w-6 h-6"
          />
          View
        </RouterLink>

        <RouterLink
          :to="`/employees/${employee.id}/edit`"
          class="flex items-center gap-x-1.5 text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 p-1.5 rounded-md transition-colors"
          title="Edit employee"
        >
          <IconComponent
            :src="EditIcon"
            alt="Edit employee"
            size="5"
            class="sm:w-5 sm:h-5 w-6 h-6"
          />
          Edit
        </RouterLink>

        <button
          @click="$emit('delete', employee)"
          class="flex items-center gap-x-1.5 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors"
          title="Delete employee"
        >
          <IconComponent
            :src="DeleteIcon"
            alt="Delete employee"
            size="5"
            class="sm:w-5 sm:h-5 w-6 h-6"
          />
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>
