<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow p-6 bg-background">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>
