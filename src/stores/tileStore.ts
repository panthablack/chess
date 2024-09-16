import { reactive, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BOARD_TYPES, TILE_COLOURS, TILE_SIZES, TILE_TYPES } from '@/config/constants/boards'
import type { Board, NewTileOptions, Tile, TileColour, TileID, TileSize } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { isEven, isOdd } from '@/utilities/numbers'

export const useTileStore = defineStore('tileStore', () => {
  const tiles: Record<number, Tile> = reactive({})

  const tileSize: Ref<TileSize> = ref(TILE_SIZES.MEDIUM)

  const getTileColour = (board: Board, options: NewTileOptions): TileColour => {
    if (board.type === BOARD_TYPES.STANDARD_CHECKERED_BOARD) {
      const [row, col] = options.position
      if (isEven(row) && isEven(col)) return TILE_COLOURS.WHITE
      else if (isEven(row) && isOdd(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isEven(col)) return TILE_COLOURS.BLACK
      else if (isOdd(row) && isOdd(col)) return TILE_COLOURS.WHITE
    } else return TILE_COLOURS.UNKNOWN
  }

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

  return { makeNewTile, tiles, tileSize }
})
