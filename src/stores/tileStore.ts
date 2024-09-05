import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { TILE_COLOURS, TILE_SIZES, TILE_TYPES } from '@/config/constants'
import type { Tile } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'

export const useTileStore = defineStore('tileStore', () => {
  const tiles: Ref<Record<number, Tile>> = ref({})

  const makeNewTile = (): Tile => ({
    colour: TILE_COLOURS.WHITE,
    size: TILE_SIZES.MEDIUM,
    type: TILE_TYPES.TEXT,
    value: 'X',
    // keep id last to prevent id being set manually
    id: getNextFreeNumericalKey(tiles.value),
  })

  return { tiles, makeNewTile }
})
