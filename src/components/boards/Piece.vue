<template>
  <component
    :is="resolvePieceComponent"
    :piece="piece"
  />
</template>

<script setup lang="ts">
import DefaultPiece from '@/components/boards/DefaultPiece.vue'
import Bishop from '@/components/boards/pieces/chess/Bishop.vue'
import ChessKing from '@/components/boards/pieces/chess/King.vue'
import Knight from '@/components/boards/pieces/chess/Knight.vue'
import Pawn from '@/components/boards/pieces/chess/Pawn.vue'
import Queen from '@/components/boards/pieces/chess/Queen.vue'
import Rook from '@/components/boards/pieces/chess/Rook.vue'
import DraughtsKing from '@/components/boards/pieces/draughts/King.vue'
import Man from '@/components/boards/pieces/draughts/Man.vue'
import { GAME_MODES } from '@/config/constants/games'
import { CHESS_PIECES, DRAUGHTS_PIECES } from '@/config/constants/pieces'
import { useGameStore } from '@/stores/gameStore'
import type { Piece } from '@/types/Piece'
import { computed, type Component, type ComputedRef } from 'vue'

// Store Dependencies
const gameStore = useGameStore()

// props
const props = defineProps<{
  piece: Piece
}>()

const resolvePieceComponent: ComputedRef<Component> = computed(() => {
  const mode = gameStore.currentGame?.mode
  if (mode === GAME_MODES.CHESS) return resolveChessPieceComponent.value
  else if (mode === GAME_MODES.DRAUGHTS) return resolveDraughtsPieceComponent.value
  else throw 'Game Mode not Recognised'
})

const resolveChessPieceComponent: ComputedRef<Component> = computed(() => {
  switch (props.piece.type) {
    case CHESS_PIECES.BISHOP:
      return Bishop
    case CHESS_PIECES.KING:
      return ChessKing
    case CHESS_PIECES.KNIGHT:
      return Knight
    case CHESS_PIECES.QUEEN:
      return Queen
    case CHESS_PIECES.PAWN:
      return Pawn
    case CHESS_PIECES.ROOK:
      return Rook
    default:
      return DefaultPiece
  }

})

const resolveDraughtsPieceComponent: ComputedRef<Component> = computed(() => {
  switch (props.piece.type) {
    case DRAUGHTS_PIECES.MAN:
      return Man
    case DRAUGHTS_PIECES.KING:
      return DraughtsKing
    default:
      return DefaultPiece
  }

})

</script>