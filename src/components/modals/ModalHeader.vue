<template>
  <div
    class="modalHeadingContainer p-4"
    :class="getClasses"
  >
    <h2>
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  containerClasses?: string
  theme?: string
}>()

const getClasses = computed(() => {
  if (props.containerClasses) return props.containerClasses
  else if (props.theme === 'danger') return 'bg-red-800 text-gray-100'
  else return 'bg-blue-950 text-gray-100'
})
</script>

<style scoped lang="css">
.modalHeadingContainer {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>