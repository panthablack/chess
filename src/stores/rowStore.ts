import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { NewRowOptions, Row } from '@/types/Board'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { useTileStore } from '@/stores/tileStore'

export const useRowStore = defineStore('rowStore', () => {
  // store dependencies
  const tileStore = useTileStore()

  const rows: Ref<Record<number, Row>> = ref({})

  const makeNewRow = (options?: NewRowOptions, overrides?: Object): Row => {
    const numCols = options?.cols || 8

    const newTiles = []
    for (let i = 0; i < numCols; i++) newTiles.push(tileStore.makeNewTile())
    const newRow = {
      tiles: newTiles,
      ...(overrides || {}),
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(rows.value),
    }

    rows.value[newRow.id] = newRow
    return newRow
  }

  return { rows, makeNewRow }
})
