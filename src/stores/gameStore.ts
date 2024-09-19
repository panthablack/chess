import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  Game,
  GameID,
  GameMode,
  GameOptions,
  MoveID,
  PieceTilePositionMap,
  TilePiecePositionMap,
} from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { cloneDeep } from 'lodash'
import type { Player, PlayerID } from '@/types/Player'
import type { BoardID, Tile } from '@/types/Board'
import { useBoardStore } from './boardStore'
import { usePlayerStore } from './playerStore'
import { getNextFreeNumericalKey, parseIntMap, reverseObject } from '@/utilities/objects'
import { getInitialPlayerPositionsForChess } from '@/utilities/chess'
import { getInitialPlayerPositionsForDraughts } from '@/utilities/draughts'
import { usePieceStore } from '@/stores/pieceStore'
import type { Piece } from '@/types/Piece'

export const useGameStore = defineStore('gameStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const pieceStore = usePieceStore()
  const playerStore = usePlayerStore()

  // state
  const currentGameID: Ref<GameID | null> = ref(null)
  const games: Record<number, Game> = reactive({})

  // getters
  const currentGame: ComputedRef<Game | null> = computed(
    () => games[currentGameID.value || 0] || null
  )

  const pieceTilePositionMap: ComputedRef<PieceTilePositionMap> = computed(() => {
    if (currentGame.value === null) return {}
    const currentPositions: TilePiecePositionMap = currentGame.value.positions
    const currentPieces: Piece[] = pieceStore.currentGamePieces
    const revPos: PieceTilePositionMap = parseIntMap(reverseObject(Object.assign(currentPositions)))
    return currentPieces.reduce((a: PieceTilePositionMap, v: Piece) => {
      a[v.id] = revPos[v.id] || null
      return a
    }, {} as PieceTilePositionMap)
  })

  const previousGames: ComputedRef<Game[]> = computed(() =>
    Object.values(games).filter(g => g.id !== currentGameID?.value)
  )

  // methods
  const endCurrentGame = (): void => {
    if (currentGame.value === null) return
    const clonedGame = cloneDeep(currentGame.value)
    games[clonedGame.id] = clonedGame
    currentGameID.value = null
  }

  const getInitialPositions = (
    mode: GameMode,
    playerIDs: PlayerID[],
    tiles: Tile[]
  ): TilePiecePositionMap => {
    const players = playerIDs.map((p: PlayerID): Player => playerStore.players[p])
    if (mode === GAME_MODES.CHESS) return setInitialChessPositions(players, tiles)
    else if (mode === GAME_MODES.DRAUGHTS) return setInitialDraughtsPositions(players, tiles)
    else throw 'Game Mode not recognised.'
  }

  const setInitialChessPositions = (players: Player[], tiles: Tile[]): TilePiecePositionMap =>
    getInitialPlayerPositionsForChess([players[0], players[1]], tiles)

  const setInitialDraughtsPositions = (players: Player[], tiles: Tile[]): TilePiecePositionMap =>
    getInitialPlayerPositionsForDraughts([players[0], players[1]], tiles)

  const startNewGame = (options: GameOptions = {}): GameID => {
    // set mode and numPlayers based on options or defaults
    const mode: GameMode = options.mode || GAME_MODES.DRAUGHTS
    const numPlayers = options.numPlayers || 2

    // generate new players
    const playerIDs: PlayerID[] = playerStore.generatePlayers(mode, numPlayers)

    // generate new board
    const boardID: BoardID = boardStore.makeNewBoard()
    const tiles: Tile[] = boardStore.getBoardTiles(boardID)

    // generate positions matrix based on board (matrix/array structure) and piece ids
    // (contents, e.g., id or null)
    const positions: TilePiecePositionMap = getInitialPositions(mode, playerIDs, tiles)

    // create a new Game
    const id = getNextFreeNumericalKey(games)
    const currentPlayerID: PlayerID = playerIDs[0]
    const moveIDs: MoveID[] = [] // TODO: move tracking and undo moves should be implemented later
    const game: Game = {
      id,
      boardID: boardID,
      currentPlayerID,
      mode,
      moveIDs,
      playerIDs,
      positions,
    }
    games[id] = game
    currentGameID.value = id

    return id
  }

  // Return interface
  return {
    currentGame,
    currentGameID,
    endCurrentGame,
    games,
    pieceTilePositionMap,
    previousGames,
    startNewGame,
  }
})
