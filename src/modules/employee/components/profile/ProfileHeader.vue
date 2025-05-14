<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps<{ isEdit: boolean; employeeId: number | null }>()
defineEmits(['save'])
const router = useRouter()
</script>

<template>
  <div class="bg-white px-6 py-4 border-b flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <button class="text-gray-600 hover:text-purple-600" @click="router.push('/employees')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6 6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-800">
        {{ isEdit ? 'Edit Employee' : 'Employee Profile' }}
      </h1>
    </div>

    <div class="flex space-x-3">
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Back
      </RouterLink>

      <button
        v-if="isEdit"
        class="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
        @click="$emit('save')"
      >
        Save Changes
      </button>

      <RouterLink
        v-else-if="employeeId"
        :to="`/employees/${employeeId}/edit`"
        class="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        Edit Profile
      </RouterLink>
    </div>
  </div>
</template>
