<template>
  <div class="appContainer">
    <component :is="layout" />
  </div>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { markRaw, ref } from 'vue'

const layout = ref(markRaw(DefaultLayout))
const title = import.meta.env.VITE_APP_NAME
document.title = title
</script>