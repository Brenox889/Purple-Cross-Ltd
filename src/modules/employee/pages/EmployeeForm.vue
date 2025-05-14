<script setup lang="ts">
import useEmployeeForm from '@/modules/employee/composables/useEmployeeForm'

import {
  ActionBar,
  DateField,
  FormHeader,
  SectionCard,
  SelectField,
  TextField,
} from '@/modules/employee/components/form'

const {
  isEditing,
  fullName,
  occupation,
  department,
  dateOfEmployment,
  terminationDate,
  errors,
  departments,
  submit,
} = useEmployeeForm()
</script>

<template>
  <div class="max-w-3xl mx-auto p-8">
    <div class="bg-white rounded-lg shadow-lg border border-purple-100 overflow-hidden">
      <FormHeader :isEditing="isEditing">
        <template #icon>
          <svg v-if="isEditing" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">…</svg>
          <svg v-else class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">…</svg>
        </template>
      </FormHeader>

      <div class="p-6 space-y-6" @keyup.enter.prevent="submit">
        <SectionCard title="Personal Information">
          <TextField v-model="fullName" label="Full Name" :error="errors.fullName">
            <template #asterisk><span class="text-red-500">*</span></template>
          </TextField>
        </SectionCard>

        <SectionCard title="Professional Information">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField v-model="occupation" label="Occupation" :error="errors.occupation">
              <template #asterisk><span class="text-red-500">*</span></template>
            </TextField>

            <SelectField v-model="department" label="Department" :error="errors.department">
              <template #options>
                <option value="">Select a department</option>
                <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
              </template>
              <template #asterisk><span class="text-red-500">*</span></template>
            </SelectField>
          </div>
        </SectionCard>

        <SectionCard title="Dates">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateField
              v-model="dateOfEmployment"
              label="Employment Date"
              :error="errors.dateOfEmployment"
            >
              <template #asterisk><span class="text-red-500">*</span></template>
            </DateField>

            <DateField v-model="terminationDate" label="Termination Date" />
          </div>
        </SectionCard>

        <ActionBar :isEditing="isEditing" @submit="submit"> </ActionBar>
      </div>
    </div>
  </div>
</template>
