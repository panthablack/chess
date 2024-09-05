import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BOARD_TYPES } from '@/config/constants'
import type { Board, NewBoardOptions } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useRowStore } from '@/stores/rowStore'

export const useBoardStore = defineStore('boardStore', () => {
  // store dependencies
  const rowStore = useRowStore()

  const boards: Ref<Record<number, Board>> = ref({})

  const makeNewBoard = (options?: NewBoardOptions, overrides?: Board): Board => {
    const numRows = options?.rows || 8
    const numCols = options?.cols || 8
    const newRows = []
    for (let i = 0; i < numRows; i++) newRows.push(rowStore.makeNewRow({ cols: numCols }))

    const board: Board = {
      rows: newRows,
      type: BOARD_TYPES.STANDARD_CHECKERED_BOARD,
      ...(overrides || {}),
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(boards.value),
    }
    boards.value[board.id] = board
    return board
  }

  return { boards, makeNewBoard }
})
