<!-- <template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-purple-700">Purple Cross Ltd</h1>
          </div>
          <nav class="ml-6 flex space-x-8">
            <a
              href="#"
              class="inline-flex items-center px-1 pt-1 border-b-2 border-purple-500 text-sm font-medium text-gray-900"
            >
              Funcionários
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
 -->

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const links = [
  { name: 'Employees', path: '/employees' },
  { name: 'Add new Employee', path: '/employees/new' },
]

const isActive = (path: string) => route.path === path

// Corrigindo o bug de navegação dupla
const navigate = (path: string) => {
  // Só navega se não estiver já na rota atual
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <header class="bg-white shadow-md border-b border-gray-100">
    <div class="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <!-- Ícone simples como logo -->
          <!-- <div class="w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center">
            <span class="text-white font-bold">Purple Cross Ltd</span>
          </div> -->
          <!-- Título -->
          <h1 class="ml-3 text-xl font-semibold text-purple-800">Purple Cross Ltd</h1>
        </div>
      </div>
      <nav class="flex space-x-6">
        <button
          v-for="link in links"
          :key="link.path"
          @click="navigate(link.path)"
          class="text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 relative group"
          :class="
            isActive(link.path)
              ? 'text-white bg-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
          "
        >
          {{ link.name }}
          <span
            v-if="!isActive(link.path)"
            class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out"
          ></span>
        </button>
      </nav>
    </div>
  </header>
</template>
