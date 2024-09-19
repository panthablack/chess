<template>
  <div class="draughtsBoardContainer">
    <StandardCheckeredBoard :board="boardStore.boards[props.boardID]" />
  </div>
</template>

<script setup lang="ts">
import StandardCheckeredBoard from '@/components/boards/StandardCheckeredBoard.vue'
import { useBoardStore } from '@/stores/boardStore'
import type { BoardID } from '@/types/Board'

const props = defineProps<{
  boardID: BoardID
}>()

// store dependencies
const boardStore = useBoardStore()
</script>