<template>
  <div
    class="standardCheckeredBoardContainer flex justify-center items-center p-12 m-12 gap-0 flex-nowrap flex-shrink flex-grow-0"
  >
    <div
      class="boardWrapper shadow-lg flex flex-initial text-center justify-center items-center p-0 m-0 gap-0 flex-wrap flex-col"
    >
      <Row
        v-for="row in props.board.rows"
        :key="'row' + row.id"
        :row="row"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Row from '@/components/boards/Row.vue'
import type { Board } from '@/types/Board'

const props = defineProps<{
  board: Board
}>()
</script>