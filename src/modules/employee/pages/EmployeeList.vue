<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-purple-800 mb-2">Employee Management</h1>
    </div>
    <EmployeeTable />
  </div>
</template>

<script setup lang="ts">
import EmployeeTable from '../components/table/EmployeeTable.vue'
</script>
