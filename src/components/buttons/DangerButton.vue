<template>
  <button
    :type="type ?? 'button'"
    class="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-100 active:bg-red-200 disabled:bg-red-50 disabled:opacity-80 disabled:shadow-none"
  >
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: string
  type?: "button" | "submit" | "reset" | undefined
}>()
</script>