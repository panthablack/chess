import { defineStore } from 'pinia'
import { BOARD_TYPES } from '@/config/constants/boards'
import type { Board, BoardID, NewBoardOptions, Row, Tile, TileID } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useRowStore } from '@/stores/rowStore'
import { useTileStore } from './tileStore'
import { reactive } from 'vue'

export const useBoardStore = defineStore('boardStore', () => {
  // store dependencies
  const rowStore = useRowStore()
  const tileStore = useTileStore()

  // state
  const boards: Record<number, Board> = reactive({})

  // getters
  const getBoardTiles = (boardID: BoardID): Tile[] => {
    const board: Board = boards[boardID]
    const rows: Row[] = board.rows.map(r => rowStore.rows[r])
    const tiles: Tile[] = []
    rows.forEach((r: Row) =>
      r.tiles.map((t: TileID): Tile => tileStore.tiles[t]).forEach((tile: Tile) => tiles.push(tile))
    )
    return tiles
  }

  // methods
  const makeNewBoard = (options?: NewBoardOptions, overrides?: Board): BoardID => {
    const board: Board = {
      type: BOARD_TYPES.STANDARD_CHECKERED_BOARD,
      layout: [8, 8],
      rows: [],
      ...((options || {}) as NewBoardOptions),
      ...((overrides || {}) as NewBoardOptions),
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(boards),
    }

    rowStore.addRowsToBoard(board)

    boards[board.id] = board

    return board.id
  }

  // Return interface
  return { boards, makeNewBoard, getBoardTiles }
})
