<template>
  <div
    class="tileContainer shadow-inner"
    :class="getClass"
    @click="onTileClicked"
  >
    <div class="tileContent w-full h-full flex items-center gap-0 justify-center">
      <Piece
        v-if="tilePiece"
        class="content"
        :piece="tilePiece"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Piece from '@/components/boards/Piece.vue'
import { TILE_COLOURS, TILE_SIZES } from '@/config/constants/boards'
import { useGameStore } from '@/stores/gameStore'
import { usePieceStore } from '@/stores/pieceStore'
import { useTileStore } from '@/stores/tileStore'
import type { Tile } from '@/types/Board'
import type { Piece as PieceType, PieceID } from '@/types/Piece'
import { computed, type ComputedRef } from 'vue'

const props = defineProps<{
  tile: Tile
}>()

// store dependencies
const gameStore = useGameStore()
const pieceStore = usePieceStore()
const tileStore = useTileStore()

// getters
const tilePiece: ComputedRef<PieceType | null> = computed(() => {
  const tilePieceID: PieceID | null = gameStore.currentGame?.positions[props.tile.id] || null
  if (!tilePieceID) return null
  const tilePiece = pieceStore.pieces[tilePieceID]
  return tilePiece || null
})

const getBorderClass: ComputedRef<string> = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getColourClass: ComputedRef<string> = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'text-slate-950 text-white'
  else return 'bg-gray-400 text-white'
})

const getSizeClass: ComputedRef<string> = computed(() => {
  if (tileStore.tileSize === TILE_SIZES.SMALL) return 'w-12 h-12'
  else if (tileStore.tileSize === TILE_SIZES.MEDIUM) return 'w-20 h-20'
  else if (tileStore.tileSize === TILE_SIZES.LARGE) return 'w-32 h-32'
  else return 'w-12 h-12'
})

const getDestinationClass: ComputedRef<string> = computed(() => {
  const isDest = tileStore.isPossibleDestinationTile(props.tile.id)
  if (!isDest) return ''
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-green-300'
  if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-green-800'
  else return ''
})

const getClass: ComputedRef<string> = computed(() => {
  return `${getSizeClass.value} ${getColourClass.value} ${getBorderClass.value} ${getDestinationClass.value}`
})

// methods
const onTileClicked = () => tileStore.onTileClicked(props.tile)
</script>