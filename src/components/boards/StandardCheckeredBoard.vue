<template>
  <div
    class="standardCheckeredBoardContainer flex justify-center items-center p-0 m-0 gap-0 flex-nowrap flex-shrink flex-grow-0"
  >
    <div
      class="boardWrapper rounded-lg bg-yellow-800 border-yellow-800 border-8 shadow-lg flex flex-initial text-center justify-center items-center p-4 m-0 gap-0 flex-wrap flex-col"
    >
      <div
        class="outlineWrapper rounded-md border-8 bg-opacity-90 border-opacity-70 bg-yellow-800 border-yellow-950 shadow-md"
      >
        <Row
          v-for="row in rows"
          :key="'row' + row.id"
          :row="row"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Row from '@/components/boards/Row.vue'
import { useRowStore } from '@/stores/rowStore'
import type { Board, Row as RowType } from '@/types/Board'
import { computed, type ComputedRef } from 'vue'

const props = defineProps<{
  board: Board
}>()

// store dependencies
const rowStore = useRowStore()

// getters
const rows: ComputedRef<RowType[]> = computed(() => props.board?.rows?.map(r => rowStore.rows[r])) || []
</script>