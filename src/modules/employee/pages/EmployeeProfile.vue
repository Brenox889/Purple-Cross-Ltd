<script setup lang="ts">
import useEmployeeProfile from '@/modules/employee/composables/useEmployeeProfile'
import {
  ProfileHeader,
  AvatarCard,
  InfoForm,
  StatusPanel,
} from '@/modules/employee/components/profile'

const { isEditMode, employeeId, form, initials, isActive, formatDate, save } = useEmployeeProfile()
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 bg-gray-50 rounded-lg shadow-md overflow-hidden">
    <ProfileHeader :isEdit="isEditMode" :employeeId="employeeId" @save="save" />

    <div class="p-6">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <AvatarCard
            :initials="initials"
            :fullName="form.fullName"
            :occupation="form.occupation"
            :department="form.department"
            :isActive="isActive"
          />
        </div>

        <div class="md:w-2/3 space-y-4">
          <InfoForm
            :form="form"
            :isEdit="isEditMode"
            @update:form="(v) => Object.assign(form, v)"
          />
          <StatusPanel
            :employment="form.employmentDate"
            :termination="form.terminationDate"
            :formatDate="formatDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
