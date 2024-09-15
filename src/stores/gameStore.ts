import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, GameID, GameMode, GameOptions } from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { cloneDeep } from 'lodash'
import type { PlayerID } from '@/types/Player'
import type { BoardID } from '@/types/Board'
import { useBoardStore } from './boardStore'
import type { PieceID } from '@/types/Piece'
import { usePlayerStore } from './playerStore'
import { getNextFreeNumericalKey } from '@/utilities/objects'

export const useGameStore = defineStore('gameStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const playerStore = usePlayerStore()

  // state
  const games: Record<number, Game> = reactive({})
  const currentGame: Ref<GameID | null> = ref(null)

  // getters
  const previousGames = computed(() => Object.values(games).map(g => g.id !== currentGame?.value))
  const getCurrentGame: ComputedRef<Game | null> = computed(
    () => games[currentGame.value || 0] || null
  )

  // methods
  const endCurrentGame = (): void => {
    const clonedGame = cloneDeep(games[currentGame.value !== null ? currentGame.value : 0])
    if (clonedGame) games[clonedGame.id] = clonedGame
    currentGame.value = null
  }

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
    const id = getNextFreeNumericalKey(games)
    const game: Game = { id, board: boardID, mode, players, positions }
    games[id] = game
    currentGame.value = id
    return game
  }

  return { currentGame, endCurrentGame, games, getCurrentGame, previousGames, startNewGame }
})
