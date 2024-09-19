import { defineStore } from 'pinia'
import { BOARD_TYPES } from '@/config/constants/boards'
import type {
  Board,
  BoardID,
  NewBoardOptions,
  Row,
  Tile,
  TileID,
  TilePosition,
} from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useRowStore } from '@/stores/rowStore'
import { useTileStore } from './tileStore'
import { computed, reactive, type ComputedRef } from 'vue'
import { useGameStore } from './gameStore'
import { positionOnBoard } from '@/utilities/boards'

export const useBoardStore = defineStore('boardStore', () => {
  // store dependencies
  const gameStore = useGameStore()
  const rowStore = useRowStore()
  const tileStore = useTileStore()

  // state
  const boards: Record<number, Board> = reactive({})

  // getters
  const currentBoard: ComputedRef<Board | null> = computed(() => {
    if (gameStore.currentGame === null) return null
    else return boards[gameStore.currentGame.boardID]
  })

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
  const filterOutOffBoardPositions = (
    positions: TilePosition[],
    board?: Board | null
  ): TilePosition[] => {
    board = board || currentBoard.value || null
    if (!board || !positions) return []
    else return positions.filter(p => !positionOnBoard(p, board))
  }

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
  return { boards, currentBoard, getBoardTiles, filterOutOffBoardPositions, makeNewBoard }
})
