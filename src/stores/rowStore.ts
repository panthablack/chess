import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Board, Row } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useTileStore } from '@/stores/tileStore'

export const useRowStore = defineStore('rowStore', () => {
  // store dependencies
  const tileStore = useTileStore()

  const rows: Ref<Record<number, Row>> = ref({})

  const makeNewRow = (board: Board, position: number): Row => {
    const row: Row = { tiles: [], id: getNextFreeNumericalKey(rows.value), position }
    const numCols = board.layout[1]
    for (let c = 0; c < numCols; c++)
      row.tiles.push(
        tileStore.makeNewTile(board, {
          position: [position, c],
        })
      )
    return row
  }

  const addRowsToBoard = (board: Board): Board => {
    const numRows = board.layout[0]
    const newRows = []
    for (let r = 0; r < numRows; r++) newRows.push(makeNewRow(board, r))
    board.rows = newRows
    return board
  }

  return { addRowsToBoard, rows, makeNewRow }
})
