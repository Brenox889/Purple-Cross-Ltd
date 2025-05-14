<script setup lang="ts">
defineProps<{
  form: {
    fullName: string
    occupation: string
    department: string
    employmentDate: string
    terminationDate?: string | null
  }
  isEdit: boolean
}>()

defineEmits(['update:form'])
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-6 pb-2 border-b">
      <h3 class="text-lg font-semibold">Employee Information</h3>
      <div v-if="isEdit" class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
        Edit Mode
      </div>
    </div>

    <div class="space-y-6">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          :value="form.fullName"
          @input="
            $emit('update:form', { ...form, fullName: ($event.target as HTMLInputElement).value })
          "
          :disabled="!isEdit"
          class="block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-purple-200 focus:border-purple-500"
          :class="
            isEdit ? 'border-purple-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-700'
          "
        />
      </div>

      <!-- 2-column grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
          <input
            :value="form.occupation"
            @input="
              $emit('update:form', {
                ...form,
                occupation: ($event.target as HTMLInputElement).value,
              })
            "
            :disabled="!isEdit"
            class="block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-purple-200 focus:border-purple-500"
            :class="
              isEdit ? 'border-purple-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-700'
            "
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            :value="form.department"
            @input="
              $emit('update:form', {
                ...form,
                department: ($event.target as HTMLInputElement).value,
              })
            "
            :disabled="!isEdit"
            class="block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-purple-200 focus:border-purple-500"
            :class="
              isEdit ? 'border-purple-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-700'
            "
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Employment Date</label>
          <input
            type="date"
            :value="form.employmentDate"
            @input="
              $emit('update:form', {
                ...form,
                employmentDate: ($event.target as HTMLInputElement).value,
              })
            "
            :disabled="!isEdit"
            class="block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-purple-200 focus:border-purple-500"
            :class="
              isEdit ? 'border-purple-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-700'
            "
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
          <input
            type="date"
            :value="form.terminationDate"
            @input="
              $emit('update:form', {
                ...form,
                terminationDate: ($event.target as HTMLInputElement).value,
              })
            "
            :disabled="!isEdit"
            class="block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-purple-200 focus:border-purple-500"
            :class="
              isEdit ? 'border-purple-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-700'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
