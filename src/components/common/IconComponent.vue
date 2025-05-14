<script setup lang="ts">
/**
 * Generic SVG / image icon wrapper.
 *
 * Props
 *  • src   – static import of the icon (e.g. `import Edit from '@/assets/icons/edit.svg'`)
 *            or a plain URL string
 *  • size  – Tailwind size key or explicit px/rem (defaults to `5` → h-5 w-5)
 *  • alt   – accessible label (empty string is fine for decorative icons)
 *  • class – extra utility classes
 */
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
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :class="[
      `h-${props.size}`, // Tailwind height
      `w-${props.size}`, // Tailwind width
      props.class || '',
    ]"
    draggable="false"
  />
</template>
