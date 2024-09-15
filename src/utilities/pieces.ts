import { CHESS_PIECES, DRAUGHTS_PIECES } from '@/config/constants/pieces'
import type { ChessPieceType, DraughtsPieceType } from '@/types/Piece'

export const getStartingChessPieceTypes = (): ChessPieceType[] => [
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.PAWN,
  CHESS_PIECES.ROOK,
  CHESS_PIECES.KNIGHT,
  CHESS_PIECES.BISHOP,
  CHESS_PIECES.QUEEN,
  CHESS_PIECES.KING,
  CHESS_PIECES.BISHOP,
  CHESS_PIECES.KNIGHT,
  CHESS_PIECES.ROOK,
]

export const getStartingDraughtsPieceTypes = (): DraughtsPieceType[] =>
  [
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
    DRAUGHTS_PIECES.MAN,
  ] as const
