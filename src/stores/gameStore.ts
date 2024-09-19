import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, GameID, GameMode, GameOptions, PiecePositionMap } from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { cloneDeep } from 'lodash'
import type { Player, PlayerID } from '@/types/Player'
import type { BoardID, Tile } from '@/types/Board'
import { useBoardStore } from './boardStore'
import { usePlayerStore } from './playerStore'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { getInitialPlayerPositionsForChess } from '@/utilities/chess'
import { getInitialPlayerPositionsForDraughts } from '@/utilities/draughts'

export const useGameStore = defineStore('gameStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const playerStore = usePlayerStore()

  // state
  const games: Record<number, Game> = reactive({})
  const currentGame: Ref<GameID | null> = ref(null)

  // getters
  const previousGames = computed(() =>
    Object.values(games).filter(g => g.id !== currentGame?.value)
  )
  const getCurrentGame: ComputedRef<Game | null> = computed(
    () => games[currentGame.value || 0] || null
  )

  // actions
  const endCurrentGame = (): void => {
    const clonedGame = cloneDeep(games[currentGame.value !== null ? currentGame.value : 0])
    if (clonedGame) games[clonedGame.id] = clonedGame
    currentGame.value = null
  }

  const setInitialChessPositions = (players: Player[], tiles: Tile[]): PiecePositionMap =>
    getInitialPlayerPositionsForChess([players[0], players[1]], tiles)

  const setInitialDraughtsPositions = (players: Player[], tiles: Tile[]): PiecePositionMap =>
    getInitialPlayerPositionsForDraughts([players[0], players[1]], tiles)

  const getInitialPositions = (
    mode: GameMode,
    playerIDs: PlayerID[],
    tiles: Tile[]
  ): PiecePositionMap => {
    const players = playerIDs.map((p: PlayerID): Player => playerStore.players[p])
    if (mode === GAME_MODES.CHESS) return setInitialChessPositions(players, tiles)
    else if (mode === GAME_MODES.DRAUGHTS) return setInitialDraughtsPositions(players, tiles)
    else throw 'Game Mode not recognised.'
  }

  const startNewGame = (options: GameOptions = {}): GameID => {
    // set mode and numPlayers based on options or defaults
    const mode: GameMode = options.mode || GAME_MODES.DRAUGHTS
    const numPlayers = options.numPlayers || 2

    // generate new players
    const players: PlayerID[] = playerStore.generatePlayers(mode, numPlayers)

    // generate new board
    const boardID: BoardID = boardStore.makeNewBoard()
    const tiles: Tile[] = boardStore.getBoardTiles(boardID)

    // generate positions matrix based on board (matrix/array structure) and piece ids
    // (contents, e.g., id or null)
    const positions: PiecePositionMap = getInitialPositions(mode, players, tiles)

    // create a new Game and return
    const id = getNextFreeNumericalKey(games)
    const game: Game = { id, board: boardID, mode, players, positions }
    games[id] = game
    currentGame.value = id

    return id
  }

  // Return interface
  return { currentGame, endCurrentGame, games, getCurrentGame, previousGames, startNewGame }
})
