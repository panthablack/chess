import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  ChessPieceSet,
  DraughtsPieceSet,
  Piece,
  PieceColour,
  PieceID,
  PieceSet,
  PieceSetID,
  PieceType,
} from '@/types/Piece'
import { GAME_MODES } from '@/config/constants/games'
import { CHESS_PIECE_SET_STYLES, DRAUGHTS_PIECE_SET_STYLES } from '@/config/constants/pieces'
import type { GameMode } from '@/types/Game'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import { getStartingChessPieceTypes, getStartingDraughtsPieceTypes } from '@/utilities/pieces'
import { usePlayerStore } from '@/stores/playerStore'
import type { Player } from '@/types/Player'
import { useTileStore } from '@/stores/tileStore'
import { useGameStore } from '@/stores/gameStore'
import type { TileID, TilePosition } from '@/types/Board'

export const usePieceStore = defineStore('pieceStore', () => {
  // store dependencies
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const tileStore = useTileStore()

  // state
  const sets: Record<number, PieceSet> = reactive({})
  const pieces: Record<number, Piece> = reactive({})
  const selectedPieceID: Ref<PieceID | null> = ref(null)

  // getters
  const currentPlayer: ComputedRef<Player | null> = computed(() => playerStore.currentPlayer)

  const selectedPiecePosition: ComputedRef<TilePosition | null> = computed(() => {
    if (selectedPieceID.value === null) return null
    const tileID = gameStore.pieceTilePositionMap[selectedPieceID.value]
    if (tileID === null) return null
    return tileStore.tiles[tileID]?.position || null
  })

  const selectedPiece: ComputedRef<Piece | null> = computed(() =>
    selectedPieceID.value === null ? null : pieces[selectedPieceID.value]
  )

  const currentGamePieceIDs: ComputedRef<PieceID[]> = computed(
    () =>
      gameStore.currentGame?.playerIDs
        ?.map(p => playerStore.players[p])
        .map(p => sets[p.set])
        .reduce((a: PieceID[], v) => a.concat(v.pieces), [] as PieceID[]) || []
  )

  const currentGamePieces: ComputedRef<Piece[]> = computed(
    () => currentGamePieceIDs.value.map((p: PieceID) => pieces[p]) || []
  )

  const currentPlayersPieces: ComputedRef<PieceID[]> = computed(() => {
    if (!currentPlayer.value) return []
    else return sets[currentPlayer.value.set].pieces
  })

  const oppositionPieces: ComputedRef<Piece[]> = computed(() => {
    const opponentSet = playerStore.opponent?.set
    if (!opponentSet) return []
    else return getSetPieces(opponentSet) || []
  })

  const oppositionPieceIDs: ComputedRef<PieceID[]> = computed(() =>
    oppositionPieces.value.map(p => p.id)
  )

  // methods
  const currentPlayerOwnsPiece = (piece: Piece): boolean =>
    currentPlayersPieces.value.indexOf(piece.id) !== -1

  const deselectCurrentlySelectedPiece = (): void => {
    selectedPieceID.value = null
  }

  const getSetPieces = (setID: PieceSetID): Piece[] => sets[setID].pieces.map(p => pieces[p])

  const generateStartingPieces = (pieceTypes: PieceType[], colour: PieceColour): PieceID[] => {
    const pieceIDs: PieceID[] = []
    pieceTypes.forEach(p => {
      const id = getNextFreeNumericalKey(pieces)
      pieceIDs.push(id)
      pieces[id] = { id, colour, inPlay: true, type: p }
    })
    return pieceIDs
  }

  const generateNewChessPieceSet = (colour: PieceColour): PieceSetID => {
    const set: ChessPieceSet = {
      id: getNextFreeNumericalKey(sets),
      style: CHESS_PIECE_SET_STYLES.CLASSIC,
      pieces: generateStartingPieces(getStartingChessPieceTypes(), colour),
    }
    sets[set.id] = set
    return set.id
  }

  const generateNewDraughtsPieceSet = (colour: PieceColour): PieceSetID => {
    const set: DraughtsPieceSet = {
      id: getNextFreeNumericalKey(sets),
      style: DRAUGHTS_PIECE_SET_STYLES.CLASSIC,
      pieces: generateStartingPieces(getStartingDraughtsPieceTypes(), colour),
    }
    sets[set.id] = set
    return set.id
  }

  const generateNewSetFromGameMode = (mode: GameMode, colour: PieceColour): PieceSetID => {
    if (mode === GAME_MODES.CHESS) return generateNewChessPieceSet(colour)
    else if (mode === GAME_MODES.DRAUGHTS) return generateNewDraughtsPieceSet(colour)
    else return generateNewChessPieceSet(colour)
  }

  const pieceCanBeSelected = (piece: Piece): boolean =>
    pieceCanMove(piece) && currentPlayerOwnsPiece(piece)

  const pieceCanMove = (piece: Piece): boolean => !!piece

  const setPieceSelected = (piece: Piece) => (selectedPieceID.value = piece.id)

  const onPieceClicked = (piece: Piece) => {
    const validDestinationTiles: TileID[] = tileStore.validDestinationTiles
    if (!validDestinationTiles) {
      //
    }
    if (pieceCanBeSelected(piece)) setPieceSelected(piece)
  }

  // Return interface
  return {
    currentGamePieces,
    deselectCurrentlySelectedPiece,
    generateNewSetFromGameMode,
    getSetPieces,
    onPieceClicked,
    oppositionPieces,
    oppositionPieceIDs,
    pieceCanBeSelected,
    pieces,
    selectedPiece,
    selectedPieceID,
    selectedPiecePosition,
    sets,
  }
})
