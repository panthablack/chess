import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BOARD_TYPES, TILE_COLOURS, TILE_SIZES, TILE_TYPES } from '@/config/constants/boards'
import type {
  Board,
  NewTileOptions,
  Tile,
  TileColour,
  TileID,
  TilePositionGrid,
  TileSize,
} from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { isEven, isOdd } from '@/utilities/numbers'
import { usePieceStore } from '@/stores/pieceStore'
import { useGameStore } from './gameStore'
import type { PieceTilePositionMap, TilePiecePositionMap } from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { calculatePossibleDestinationTilesForChess } from '@/utilities/chess'
import { calculatePossibleDestinationTilesForDraughts } from '@/utilities/draughts'
import { usePlayerStore } from '@/stores/playerStore'
import { useBoardStore } from '@/stores/boardStore'
import { generateNewEmptyTileGrid } from '@/utilities/boards'
import { falsyNotZero } from '@/utilities/booleans'
import type { Piece, PieceID } from '@/types/Piece'

export const useTileStore = defineStore('tileStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const gameStore = useGameStore()
  const pieceStore = usePieceStore()
  const playerStore = usePlayerStore()

  // state
  const tiles: Record<number, Tile> = reactive({})
  const tileSize: Ref<TileSize> = ref(TILE_SIZES.MEDIUM)

  // getters
  const activeTiles: ComputedRef<Tile[]> = computed(() =>
    boardStore.currentBoard?.id ? boardStore.getBoardTiles(boardStore.currentBoard.id) : []
  )

  const activeTileIDs: ComputedRef<TileID[]> = computed(() =>
    boardStore.currentBoard?.id ? boardStore.getBoardTileIDs(boardStore.currentBoard.id) : []
  )

  const tilePiecePositionMap: ComputedRef<TilePiecePositionMap> = computed(() => {
    const pos: TilePiecePositionMap | undefined = gameStore.currentGame?.positions
    if (!activeTileIDs.value || !pos) return {}
    const map: TilePiecePositionMap = {}
    activeTileIDs.value.forEach(t => (map[t] = falsyNotZero(pos[t]) ? null : pos[t]))
    return map
  })

  const tilePositionGrid: ComputedRef<TilePositionGrid> = computed(() => {
    const grid: TilePositionGrid = generateNewEmptyTileGrid()
    activeTiles.value.forEach(t => (grid[t.position[0]][t.position[1]] = t.id))
    return grid
  })

  const validDestinationTiles: ComputedRef<TileID[]> = computed(() => {
    const piece = pieceStore.selectedPiece
    const currentGame = gameStore.currentGame || null
    const player = playerStore.currentPlayer || null
    const map: PieceTilePositionMap | undefined = currentGame?.positions
    if (!piece || !player || !map) return []
    if (currentGame?.mode === GAME_MODES.CHESS)
      return calculatePossibleDestinationTilesForChess(piece, player, map)
    else if (currentGame?.mode === GAME_MODES.DRAUGHTS)
      return calculatePossibleDestinationTilesForDraughts(piece, player, map)
    else return []
  })

  // methods
  const getTilePiece = (tile: Tile): Piece | null => {
    const pieceID: PieceID | null = gameStore.currentGame?.positions[tile.id] || null
    if (pieceID === null) return null
    else return pieceStore.pieces[pieceID]
  }

  const getTileColour = (board: Board, options: NewTileOptions): TileColour => {
    if (board.type === BOARD_TYPES.STANDARD_CHECKERED_BOARD) {
      const [row, col] = options.position
      if (isEven(row) && isEven(col)) return TILE_COLOURS.WHITE
      else if (isEven(row) && isOdd(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isEven(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isOdd(col)) return TILE_COLOURS.WHITE
    } else return TILE_COLOURS.UNKNOWN
  }

  const isPossibleDestinationTile = (id: TileID): boolean =>
    validDestinationTiles.value.includes(id)

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
    const piece: Piece | null = getTilePiece(tile) || null
    // if the tile has a piece, act as if the piece was clicked
    if (piece) return pieceStore.onPieceClicked(piece)
    // else, if a valid destination tile, begin move
    else if (isPossibleDestinationTile(tile.id)) gameStore.moveTo(tile.id)
    // else, deselect currently selected piece
    else pieceStore.deselectCurrentlySelectedPiece()
  }

  // Return interface
  return {
    activeTiles,
    isPossibleDestinationTile,
    makeNewTile,
    onTileClicked,
    tiles,
    tilePiecePositionMap,
    tilePositionGrid,
    tileSize,
    validDestinationTiles,
  }
})
