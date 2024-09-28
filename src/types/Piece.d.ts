import type {
  CHESS_PIECES,
  CHESS_PIECE_SET_STYLES,
  DRAUGHTS_PIECES,
  DRAUGHTS_PIECE_SET_STYLES,
  PIECE_COLOURS,
} from '@/config/constants/pieces'

export type ChessPieceType = (typeof CHESS_PIECES)[keyof typeof CHESS_PIECES]

export type ChessPiece = {
  id: PieceID
  colour: PieceColour
  inPlay: boolean
  type: ChessPieceType
}

export type ChessPieceSet = {
  id: PieceSetID
  style: (typeof CHESS_PIECE_SET_STYLES)[keyof typeof CHESS_PIECE_SET_STYLES]
  pieces: PieceID[]
}

export type DraughtsPieceType = (typeof DRAUGHTS_PIECES)[keyof typeof DRAUGHTS_PIECES]

export type DraughtsPiece = {
  id: PieceID
  colour: PieceColour
  type?: DraughtsPieceType
}

export type DraughtsPieceSet = {
  id: PieceSetID
  style: (typeof DRAUGHTS_PIECE_SET_STYLES)[keyof typeof DRAUGHTS_PIECE_SET_STYLES]
  pieces: PieceID[]
}

export type LocalPieceID = PieceID | null

export type LocalPieceMatrix = [
  [LocalPieceID, LocalPieceID, LocalPieceID],
  [LocalPieceID, LocalPieceID, LocalPieceID],
  [LocalPieceID, LocalPieceID, LocalPieceID],
]

export type Piece = ChessPiece | DraughtsPiece

export type PieceID = number

export type PieceColour = (typeof PIECE_COLOURS)[keyof typeof PIECE_COLOURS]

export type PieceSet = ChessPieceSet | DraughtsPieceSet

export type PieceSetID = number

export type PieceType = ChessPieceType | DraughtsPieceType
