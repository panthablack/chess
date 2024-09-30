import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  Game,
  GameID,
  GameMode,
  GameOptions,
  Move,
  MoveID,
  PieceTilePositionMap,
  TilePiecePositionMap,
} from '@/types/Game'
import { GAME_MODES } from '@/config/constants/games'
import { cloneDeep } from 'lodash'
import type { Player, PlayerID } from '@/types/Player'
import type { BoardID, Tile, TileID } from '@/types/Board'
import { useBoardStore } from './boardStore'
import { usePlayerStore } from './playerStore'
import { getNextFreeNumericalKey, parseIntMap, reverseObject } from '@/utilities/objects'
import {
  detectTakenPiecesForChess,
  getInitialPlayerPositionsForChess,
  handlePossibleTransformationsForChess,
} from '@/utilities/chess'
import {
  detectTakenPiecesForDraughts,
  getInitialPlayerPositionsForDraughts,
  handlePossibleTransformationsForDraughts,
} from '@/utilities/draughts'
import { usePieceStore } from '@/stores/pieceStore'
import type { Piece, PieceID } from '@/types/Piece'

export const useGameStore = defineStore('gameStore', () => {
  // store dependencies
  const boardStore = useBoardStore()
  const pieceStore = usePieceStore()
  const playerStore = usePlayerStore()

  // state
  const currentGameID: Ref<GameID | null> = ref(null)
  const games: Record<GameID, Game> = reactive({})
  const moves: Record<MoveID, Move> = reactive({})

  // getters
  const currentGame: ComputedRef<Game | null> = computed(
    () => games[currentGameID.value || 0] || null
  )

  const currentPositions: ComputedRef<TilePiecePositionMap> = computed(
    () => currentGame.value?.positions || {}
  )

  const pieceTilePositionMap: ComputedRef<PieceTilePositionMap> = computed(() => {
    if (currentGame.value === null) return {}
    const currentPieces: Piece[] = pieceStore.currentGamePieces
    const revPos: PieceTilePositionMap = parseIntMap(
      reverseObject(Object.assign(currentPositions.value))
    )
    return currentPieces.reduce((a: PieceTilePositionMap, v: Piece) => {
      a[v.id] = revPos[v.id] || null
      return a
    }, {} as PieceTilePositionMap)
  })

  const previousGames: ComputedRef<Game[]> = computed(() =>
    Object.values(games).filter(g => g.id !== currentGameID?.value)
  )

  // methods
  const changePlayer = (): void => {
    const nextPlayerID = playerStore.nextPlayer?.id
    // change to player with next player number
    if (!currentGame.value || !nextPlayerID) throw 'cannot change player'
    else currentGame.value.currentPlayerID = nextPlayerID
  }

  const detectTakenPieces = (move: Move): PieceID[] => {
    if (currentGame.value?.mode === GAME_MODES.CHESS) return detectTakenPiecesForChess(move)
    else if (currentGame.value?.mode === GAME_MODES.DRAUGHTS)
      return detectTakenPiecesForDraughts(move)
    else return []
  }

  const endCurrentGame = (): void => {
    if (currentGame.value === null) return
    const clonedGame = cloneDeep(currentGame.value)
    games[clonedGame.id] = clonedGame
    currentGameID.value = null
  }

  const executeMove = (move: Move): void => {
    if (!move || !currentGame.value?.positions) throw 'cannot execute move'
    else {
      currentGame.value.positions = move.after
      currentGame.value.moveIDs.push(move.id)
      handlePossibleTakes(move)
      handlePossibleTransformations(move)
      pieceStore.deselectCurrentlySelectedPiece()
      changePlayer()
    }
  }

  const handlePossibleTakes = (move: Move): void => {
    const takenPieces = detectTakenPieces(move)
    if (takenPieces.length) handleTakenPieces(move, takenPieces)
  }

  const handlePossibleTransformations = (move: Move): void => {
    const mode = currentGame.value?.mode
    if (mode === GAME_MODES.CHESS) handlePossibleTransformationsForChess(move)
    else if (mode === GAME_MODES.DRAUGHTS) handlePossibleTransformationsForDraughts()
  }

  const handleTakenPieces = (move: Move, pieces: PieceID[]): void => {
    if (!currentGame.value) return
    // update move positions
    const newPositions: TilePiecePositionMap = Object.fromEntries(
      Object.entries(move.after).filter(e => e[1] && !pieces.includes(e[1]))
    )
    moves[move.id].after = newPositions
    // remove pieces from board
    currentGame.value.positions = newPositions
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

  const makeMove = (destination: TileID): Move => {
    const selectedPieceID = pieceStore.selectedPieceID
    const currentGamePositions = currentGame.value?.positions
    if (!selectedPieceID || !currentGamePositions) throw 'cannot make move without game positions'
    const newGamePositions = cloneDeep(currentGamePositions)
    // remove currently selected piece from old place in positions map
    const currentPiecePosition = pieceTilePositionMap.value[selectedPieceID]
    if (!currentPiecePosition) throw 'cannot move piece'
    newGamePositions[currentPiecePosition] = null
    // add currently selected piece to new place in positions map
    newGamePositions[destination] = selectedPieceID
    const move: Move = {
      id: getNextFreeNumericalKey(moves),
      before: cloneDeep(currentGamePositions),
      after: cloneDeep(newGamePositions),
    }
    moves[move.id] = move
    return move
  }

  const moveTo = (destination: TileID): void => {
    const move: Move = makeMove(destination)
    executeMove(move)
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

    // generate positions grid based on board (grid/array structure) and piece ids
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
    moves,
    moveTo,
    pieceTilePositionMap,
    previousGames,
    startNewGame,
  }
})
