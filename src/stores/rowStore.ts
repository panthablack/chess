import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Board, Row, RowID } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useTileStore } from '@/stores/tileStore'

export const useRowStore = defineStore('rowStore', () => {
  // store dependencies
  const tileStore = useTileStore()

  // state
  const rows: Record<number, Row> = reactive({})

  // getters

  // ***

  // methods
  const makeNewRow = (board: Board, position: number): RowID => {
    const row: Row = { tiles: [], id: getNextFreeNumericalKey(rows), position }
    const numCols = board.layout[1]
    for (let c = 0; c < numCols; c++)
      row.tiles.push(
        tileStore.makeNewTile(board, {
          position: [position, c],
        })
      )
    rows[row.id] = row
    return row.id
  }

  const addRowsToBoard = (board: Board): Board => {
    const numRows = board.layout[0]
    const rowIDs: RowID[] = []
    for (let r = 0; r < numRows; r++) rowIDs.push(makeNewRow(board, r))
    board.rows = rowIDs
    return board
  }

  // Return interface
  return { addRowsToBoard, rows, makeNewRow }
})
