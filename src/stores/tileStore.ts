import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { TILE_COLOURS, TILE_SIZES, TILE_TYPES } from '@/config/constants'
import type { NewTileOptions, Tile, TileSize } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'

export const useTileStore = defineStore('tileStore', () => {
  const tiles: Ref<Record<number, Tile>> = ref({})

  const tileSize: Ref<TileSize> = ref(TILE_SIZES.MEDIUM)

  const makeNewTile = (options: NewTileOptions): Tile => ({
    colour: TILE_COLOURS.WHITE,
    type: TILE_TYPES.TEXT,
    value: 'X',
    ...options,
    // keep id last to prevent id being set manually
    id: getNextFreeNumericalKey(tiles.value),
  })

  return { makeNewTile, tiles, tileSize }
})
