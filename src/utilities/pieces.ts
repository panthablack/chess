import {
  INITIAL_PIECE_POSITIONS_FOR_CHESS,
  INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS,
} from '@/config/constants/games'
import type { ChessPieceType, DraughtsPieceType } from '@/types/Piece'
import { cloneDeep, flattenDeep } from 'lodash'

export const getStartingChessPieceTypes = (): ChessPieceType[] =>
  flattenDeep(cloneDeep(INITIAL_PIECE_POSITIONS_FOR_CHESS.PLAYER_1)).filter(p => p !== null)

export const getStartingDraughtsPieceTypes = (): DraughtsPieceType[] =>
  flattenDeep(cloneDeep(INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS.PLAYER_1)).filter(p => p !== null)
