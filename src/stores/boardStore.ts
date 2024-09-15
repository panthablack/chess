import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BOARD_TYPES } from '@/config/constants/boards'
import type { Board, BoardID, NewBoardOptions } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useRowStore } from '@/stores/rowStore'

export const useBoardStore = defineStore('boardStore', () => {
  // store dependencies
  const rowStore = useRowStore()

  const boards: Ref<Record<number, Board>> = ref({})

  const makeNewBoard = (options?: NewBoardOptions, overrides?: Board): BoardID => {
    const board: Board = {
      type: BOARD_TYPES.STANDARD_CHECKERED_BOARD,
      layout: [8, 8],
      rows: [],
      ...((options || {}) as NewBoardOptions),
      ...((overrides || {}) as NewBoardOptions),
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(boards.value),
    }

    rowStore.addRowsToBoard(board)
    boards.value[board.id] = board

    return board.id
  }

  return { boards, makeNewBoard }
})
