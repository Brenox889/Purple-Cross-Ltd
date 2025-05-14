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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 sm:mt-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <ProfileHeader :isEdit="isEditMode" :employeeId="employeeId" @save="save" />

      <div class="p-4 sm:p-6">
        <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div class="lg:w-1/3 flex justify-center lg:justify-start">
            <div class="w-full max-w-xs">
              <AvatarCard
                :initials="initials"
                :fullName="form.fullName"
                :occupation="form.occupation"
                :department="form.department"
                :isActive="isActive"
              />
            </div>
          </div>

          <div class="lg:w-2/3 space-y-4 sm:space-y-6">
            <InfoForm
              :form="form"
              :isEdit="isEditMode"
              @update:form="(v) => Object.assign(form, v)"
            />
            <StatusPanel
              :employment="form.dateOfEmployment"
              :termination="form.terminationDate"
              :formatDate="formatDate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
