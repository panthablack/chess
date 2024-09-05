import { GAME_MODES } from '@/config/constants'

export type Player = {
  name: string
}

export type Game = {
  mode: (typeof GAME_MODES)[keyof typeof GAME_MODES]
  player1: Player
  player2: Player
}

export type GameOptions = {
  mode?: (typeof GAME_MODES)[keyof typeof GAME_MODES]
  player1?: Player
  player2?: Player
}

export type DraughtsPiece = {
  type?: (typeof DRAUGHTS_PIECES)[keyof typeof DRAUGHTS_PIECES]
  colour: (typeof DRAUGHTS_PIECE_COLOURS)[keyof typeof DRAUGHTS_PIECE_COLOURS]
}

export type ChessPiece = {
  type?: (typeof CHESS_PIECES)[keyof typeof CHESS_PIECES]
  colour: (typeof CHESS_PIECE_COLOURS)[keyof typeof CHESS_PIECE_COLOURS]
}
