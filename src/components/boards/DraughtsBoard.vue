<template>
  <div class="draughtsBoardContainer">
    <StandardCheckeredBoard :board="boardStore.boards[boardId]" />
  </div>
</template>

<script setup lang="ts">
import StandardCheckeredBoard from '@/components/boards/StandardCheckeredBoard.vue'
import { useBoardStore } from '@/stores/boardStore'
import { ref, type Ref } from 'vue'


const boardStore = useBoardStore()
const boardId: Ref<number> = ref(boardStore.makeNewBoard().id)
</script>