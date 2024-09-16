<template>
  <div
    class="tileContainer shadow-inner"
    :class="getClass"
  >
    <div class="tileContent w-full h-full flex items-center gap-0 justify-center">
      <div
        class="content"
        v-if="tileContent"
      >{{ tileContent }}</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TILE_COLOURS, TILE_SIZES } from '@/config/constants/boards'
import { useGameStore } from '@/stores/gameStore'
import { usePiecesStore } from '@/stores/piecesStore'
import { useTileStore } from '@/stores/tileStore'
import type { Tile } from '@/types/Board'
import type { Piece, PieceID } from '@/types/Piece'
import { computed, type ComputedRef } from 'vue'

const props = defineProps<{
  tile: Tile
}>()

const gameStore = useGameStore()
const pieceStore = usePiecesStore()
const tileStore = useTileStore()

const tileContent: ComputedRef<Piece | null> = computed(() => tilePiece.value)

const tilePiece: ComputedRef<Piece | null> = computed(() => {
  // const tileRow: RowPosition = props.tile.position[0]
  // const tileCol: ColPosition = props.tile.position[1]
  const tilePieceID: PieceID | undefined = gameStore.getCurrentGame?.positions[props.tile.id]
  if (!tilePieceID) return null
  const tilePiece = pieceStore.pieces[tilePieceID]
  return tilePiece || null
})

const getBorderClass = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getColourClass = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getSizeClass = computed(() => {
  if (tileStore.tileSize === TILE_SIZES.SMALL) return 'w-12 h-12'
  else if (tileStore.tileSize === TILE_SIZES.MEDIUM) return 'w-20 h-20'
  else if (tileStore.tileSize === TILE_SIZES.LARGE) return 'w-32 h-32'
  else return 'w-6 h-6'
})

const getClass = computed(() => {
  return `${getSizeClass.value} ${getColourClass.value} ${getBorderClass.value}`
})
</script>