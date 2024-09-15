import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, GameMode, GameOptions } from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { cloneDeep } from 'lodash'
import type { PlayerID } from '@/types/Player'
import type { BoardID } from '@/types/Board'
import { useBoardStore } from './boardStore'
import type { PieceID } from '@/types/Piece'
import { usePlayerStore } from './playerStore'

export const useGameStore = defineStore('gameStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const playerStore = usePlayerStore()

  const previousGames: Ref<Game[]> = ref([])
  const currentGame: Ref<Game | null> = ref(null)

  const endCurrentGame = (): void => {
    const clonedGame = cloneDeep(currentGame.value)
    if (clonedGame) previousGames.value.push(clonedGame)
    currentGame.value = null
  }

  const quitCurrentGame = (): void => endCurrentGame()

  const startNewGame = (options: GameOptions = {}): Game => {
    const mode: GameMode = options.mode || GAME_MODES.CHESS
    const numPlayers = options.numPlayers || 2

    // generate new players
    const players: PlayerID[] = playerStore.generatePlayers(mode, numPlayers)

    // generate new board
    const boardID: BoardID = boardStore.makeNewBoard()

    // generate positions matrix based on board (matrix/array structure) and piece ids (contents, e.
    // g., id or null)
    const positions: PieceID[][] = []

    // create a new Game and return
    const game: Game = { board: boardID, mode, players, positions }
    currentGame.value = game
    return game
  }

  return { currentGame, endCurrentGame, previousGames, quitCurrentGame, startNewGame }
})
