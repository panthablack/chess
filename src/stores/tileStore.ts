import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BOARD_TYPES, TILE_COLOURS, TILE_SIZES, TILE_TYPES } from '@/config/constants/boards'
import type { Board, NewTileOptions, Tile, TileColour, TileID, TileSize } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { isEven, isOdd } from '@/utilities/numbers'
import { usePieceStore } from '@/stores/pieceStore'
import { useGameStore } from './gameStore'
import type { PieceTilePositionMap } from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { calculatePossibleDestinationTilesForChess } from '@/utilities/chess'
import { calculatePossibleDestinationTilesForDraughts } from '@/utilities/draughts'
import { usePlayerStore } from '@/stores/playerStore'

export const useTileStore = defineStore('tileStore', () => {
  // store dependencies
  const gameStore = useGameStore()
  const pieceStore = usePieceStore()
  const playerStore = usePlayerStore()

  // state
  const tiles: Record<number, Tile> = reactive({})
  const tileSize: Ref<TileSize> = ref(TILE_SIZES.MEDIUM)

  // getters
  const getTileColour = (board: Board, options: NewTileOptions): TileColour => {
    if (board.type === BOARD_TYPES.STANDARD_CHECKERED_BOARD) {
      const [row, col] = options.position
      if (isEven(row) && isEven(col)) return TILE_COLOURS.WHITE
      else if (isEven(row) && isOdd(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isEven(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isOdd(col)) return TILE_COLOURS.WHITE
    } else return TILE_COLOURS.UNKNOWN
  }

  const validDestinationTiles: ComputedRef<Tile[]> = computed(() => {
    const piece = pieceStore.selectedPiece
    const currentGame = gameStore.currentGame || null
    const player = playerStore.currentPlayer || null
    const map: PieceTilePositionMap = gameStore.pieceTilePositionMap
    if (!piece || !player || !map) return []
    if (currentGame?.mode === GAME_MODES.CHESS)
      return calculatePossibleDestinationTilesForChess(piece, player, map)
    else if (currentGame?.mode === GAME_MODES.DRAUGHTS)
      return calculatePossibleDestinationTilesForDraughts(piece, player, map)
    else return []
  })

  // methods
  const makeNewTile = (board: Board, options: NewTileOptions): TileID => {
    const tile: Tile = {
      colour: getTileColour(board, options),
      type: TILE_TYPES.TEXT,
      ...options,
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(tiles),
    }
    tiles[tile.id] = tile
    return tile.id
  }

  const onTileClicked = (tile: Tile) => {
    if (tile) pieceStore.deselectCurrentlyselectedPiece()
  }

  // Return interface
  return { makeNewTile, onTileClicked, tiles, tileSize, validDestinationTiles }
})
