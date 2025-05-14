<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    size?: string | number
    alt?: string
    class?: string
  }>(),
  {
    size: '5',
    alt: '',
  },
)

const sizeClass = computed(() => {
  const fixedSizes = ['4', '5', '6', '7', '8', '10', '12']
  if (fixedSizes.includes(String(props.size))) {
    return [`w-${props.size}`, `h-${props.size}`]
  }
  return [] // fallback: let user use 'class' instead
})
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :class="[...sizeClass, 'flex-shrink-0', props.class]"
    draggable="false"
  />
</template>
