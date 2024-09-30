import type { ChessPieceType, DraughtsPieceType } from '@/types/Piece'
import { CHESS_PIECES, DRAUGHTS_PIECES } from '@/config/constants/pieces'

export const GAME_MODES = {
  CHESS: 1,
  DRAUGHTS: 2,
} as const

const {
  KING: cKing,
  QUEEN: cQueen,
  ROOK: cRook,
  BISHOP: cBishop,
  KNIGHT: cKnight,
  PAWN: cPawn,
} = CHESS_PIECES

const { MAN: dMan } = DRAUGHTS_PIECES
// const { KING: dKing } = DRAUGHTS_PIECES

export const INITIAL_PIECE_POSITIONS_FOR_CHESS: Record<string, (ChessPieceType | null)[][]> = {
  PLAYER_1: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [cPawn, cPawn, cPawn, cPawn, cPawn, cPawn, cPawn, cPawn],
    [cRook, cKnight, cBishop, cQueen, cKing, cBishop, cKnight, cRook],
  ],
  PLAYER_2: [
    [cRook, cKnight, cBishop, cQueen, cKing, cBishop, cKnight, cRook],
    [cPawn, cPawn, cPawn, cPawn, cPawn, cPawn, cPawn, cPawn],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ],
} as const

export const INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS: Record<string, (DraughtsPieceType | null)[][]> =
  {
    PLAYER_1: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [dMan, null, dMan, null, dMan, null, dMan, null],
      [null, dMan, null, dMan, null, dMan, null, dMan],
      [dMan, null, dMan, null, dMan, null, dMan, null],
    ],
    PLAYER_2: [
      [null, dMan, null, dMan, null, dMan, null, dMan],
      [dMan, null, dMan, null, dMan, null, dMan, null],
      [null, dMan, null, dMan, null, dMan, null, dMan],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ],
  } as const
