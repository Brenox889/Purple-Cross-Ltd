<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const links = [
  { name: 'Employees', path: '/employees' },
  { name: 'Add new Employee', path: '/employees/new' },
]

const isActive = (path: string) => route.path === path

const navigate = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <header class="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
    <div class="w-full flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
      <!-- Logo e título -->
      <div class="flex items-center">
        <div
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center shadow-sm"
        >
          <span class="text-white font-bold text-sm sm:text-lg">PC</span>
        </div>
        <h1 class="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-gray-800 truncate">
          <span class="text-purple-700">Purple</span>
          <span class="hidden xs:inline">Cross Ltd</span>
        </h1>
      </div>

      <!-- Navegação -->
      <div class="flex items-center mt-0">
        <button
          v-for="link in links"
          :key="link.path"
          @click="navigate(link.path)"
          class="text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-2 sm:px-4 rounded-md transition-colors duration-200 ml-1 sm:ml-2"
          :class="
            isActive(link.path)
              ? 'text-white bg-gradient-to-r from-purple-700 to-purple-600 shadow-sm'
              : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
          "
        >
          <span v-if="link.name === 'Employees'" class="hidden xxs:inline">Employees</span>
          <span v-else-if="link.name === 'Add new Employee'" class="hidden xxs:inline"
            >Add new Employee</span
          >
          <span v-if="link.name === 'Employees'" class="xxs:hidden">Emp.</span>
          <span v-else-if="link.name === 'Add new Employee'" class="xxs:hidden">Add</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Breakpoints to small screens */
@media (min-width: 360px) {
  .xxs\:inline {
    display: inline;
  }
  .xxs\:hidden {
    display: none;
  }
}
@media (max-width: 359px) {
  .xxs\:inline {
    display: none;
  }
  .xxs\:hidden {
    display: inline;
  }
}
@media (min-width: 480px) {
  .xs\:inline {
    display: inline;
  }
}
@media (max-width: 479px) {
  .hidden.xs\:inline {
    display: none;
  }
}
</style>
