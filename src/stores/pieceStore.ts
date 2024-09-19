import { reactive } from 'vue'
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

export const usePieceStore = defineStore('pieceStore', () => {
  // store dependencies

  // state
  const sets: Record<number, PieceSet> = reactive({})
  const pieces: Record<number, Piece> = reactive({})

  // getters

  // ***

  // methods
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

  const pieceCanMove = (piece: Piece): boolean => !!piece

  const setPieceSelected = (piece: Piece) => alert('piece clicked' + piece.id)

  const onPieceClicked = (piece: Piece) => {
    if (pieceCanMove(piece)) setPieceSelected(piece)
  }

  // Return interface
  return { generateNewSetFromGameMode, pieces, sets, getSetPieces, onPieceClicked }
})
