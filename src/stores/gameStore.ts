import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, GameOptions } from '@/types/Game'
import { DEFAULT_NEW_GAME_OPTIONS } from '@/config/constants'

export const useGameStore = defineStore('gameStore', () => {
  const previousGames: Ref<Game[]> = ref([])
  const currentGame: Ref<Game | null> = ref(null)

  const startNewGame = (options: GameOptions): Game => {
    const game = { ...DEFAULT_NEW_GAME_OPTIONS, ...options }
    currentGame.value = game
    return game
  }

  return { startNewGame, previousGames, currentGame }
})
