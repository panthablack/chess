<template>
  <div
    class="standardCheckeredBoardContainer flex justify-center items-center p-12 border-2 m-12 basis-full flex-wrap"
  >
    <Row
      v-for="row in props.board.rows"
      :key="'row' + row.id"
      :row="row"
    />
  </div>
</template>

<script setup lang="ts">
import Row from '@/components/boards/Row.vue'
import type { Board } from '@/types/Board'

const props = defineProps<{
  board: Board
}>()
</script>