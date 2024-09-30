<template>
  <div
    class="pieceContainer queenPieceContainer rounded-full"
    :class="getClass"
    @click.stop="onPieceClicked"
  >
    {{ pieceContent }}
  </div>
</template>

<script setup lang="ts">
import { TILE_SIZES } from '@/config/constants/boards'
import { GAME_MODES } from '@/config/constants/games'
import { PIECE_COLOURS } from '@/config/constants/pieces'
import { useGameStore } from '@/stores/gameStore'
import { usePieceStore } from '@/stores/pieceStore'
import { useTileStore } from '@/stores/tileStore'
import type { Piece } from '@/types/Piece'
import { computed, type ComputedRef } from 'vue'

// Store Dependencies
const gameStore = useGameStore()
const tileStore = useTileStore()
const pieceStore = usePieceStore()

// props
const props = defineProps<{
  piece: Piece
}>()

// getters
const getSizeClass: ComputedRef<string> = computed(() => {
  if (tileStore.tileSize === TILE_SIZES.SMALL) return 'w-8 h-8'
  else if (tileStore.tileSize === TILE_SIZES.MEDIUM) return 'w-16 h-16'
  else if (tileStore.tileSize === TILE_SIZES.LARGE) return 'w-24 h-24'
  else return 'w-16 h-16'
})

const chessPieceClasses: ComputedRef<string> = computed(() => 'drop-shadow-xl')

const draughtsPieceClasses: ComputedRef<string> = computed(() => 'drop-shadow-xl border-8')

const getColourClass: ComputedRef<string> = computed(() => {
  if (props.piece.colour === PIECE_COLOURS.WHITE) return 'bg-amber-100 border-amber-200 text-slate-950'
  else if (props.piece.colour === PIECE_COLOURS.BLACK) return 'bg-orange-900 border-orange-950 text-white'
  else return 'bg-gray-400 text-white'
})

const getModeClass: ComputedRef<string> = computed(() => {
  if (gameStore.currentGame?.mode === GAME_MODES.CHESS) return chessPieceClasses.value
  else if (gameStore.currentGame?.mode === GAME_MODES.DRAUGHTS) return draughtsPieceClasses.value
  else return ''
})

const getClass: ComputedRef<string> = computed(() => {
  return `${getSizeClass.value} ${getColourClass.value} ${getModeClass.value} ${getSelectedClass.value} ${getCanBeSelectedClass.value}`
})

const getCanBeSelectedClass: ComputedRef<string> = computed(() => pieceStore.pieceCanBeSelected(props.piece) ? 'clickable' : '')

const getSelectedClass: ComputedRef<string> = computed(
  () => pieceStore.selectedPieceID === props.piece.id ? 'selected' : '')

const pieceContent: ComputedRef<string> = computed(() => 'Q')

// methods
const onPieceClicked = () => pieceStore.onPieceClicked(props.piece)
</script>

<style scoped lang="css">
.pieceContainer {
  overflow: hidden;
}

.pieceContainer.selected {
  @apply bg-green-500 border-green-600 opacity-95;
}
</style>