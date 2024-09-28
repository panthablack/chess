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
import { falsyNotZero } from '@/utilities/booleans'

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

  const getBoardTileIDs = (boardID: BoardID): TileID[] => {
    const board: Board = boards[boardID]
    const rows: Row[] = board.rows.map(r => rowStore.rows[r])
    const tiles: TileID[] = []
    rows.forEach((r: Row) => r.tiles.forEach((t: TileID) => tiles.push(t)))
    return tiles
  }

  // methods
  const filterOutOffBoardPositions = (
    positions: TilePosition[],
    board?: Board | null
  ): TilePosition[] => {
    board = board || currentBoard.value || null
    if (!board || !positions) return []
    else return positions.filter(p => !isValidPosition(p))
  }

  const isValidPosition = (position: TilePosition): boolean => {
    const layout = currentBoard.value?.layout
    if (!layout) return false // no valid position if no layout
    const row = position[0]
    const col = position[1]
    // if either index is negative, falsyNonZero, or >= board length/width, return false
    if (falsyNotZero(row) || falsyNotZero(col)) return false
    else if (row < 0 || col < 0) return false
    else if ((row >= layout[0], row >= layout[1])) return false
    else return true
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
  return {
    boards,
    currentBoard,
    filterOutOffBoardPositions,
    getBoardTileIDs,
    getBoardTiles,
    isValidPosition,
    makeNewBoard,
  }
})
