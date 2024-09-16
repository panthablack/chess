<template>
  <div
    class="standardCheckeredBoardContainer flex justify-center items-center p-12 m-12 gap-0 flex-nowrap flex-shrink flex-grow-0"
  >
    <div
      class="boardWrapper shadow-lg flex flex-initial text-center justify-center items-center p-0 m-0 gap-0 flex-wrap flex-col"
    >
      <Row
        v-for="row in rows"
        :key="'row' + row.id"
        :row="row"
      />
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

const rowStore = useRowStore()
const rows: ComputedRef<RowType[]> = computed(() => props.board?.rows?.map(r => rowStore.rows[r])) || []
</script>