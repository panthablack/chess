import type { Game } from '@/types/Game'

export const BOARD_TYPES = {
  STANDARD_CHECKERED_BOARD: 1,
} as const

export const CHESS_PIECES = {
  KING: 1,
  QUEEN: 2,
  ROOK: 3,
  BISHOP: 4,
  KNIGHT: 5,
  PAWN: 6,
} as const

export const CHESS_PIECE_COLOURS = {
  BLACK: 1,
  WHITE: 2,
} as const

export const DRAUGHTS_PIECES = {
  REGULAR: 1,
  KING: 2,
} as const

export const DRAUGHTS_PIECE_COLOURS = {
  BLACK: 1,
  WHITE: 2,
} as const

export const GAME_MODES = {
  CHESS: 1,
  DRAUGHTS: 2,
} as const

export const DEFAULT_NEW_GAME_OPTIONS: Game = {
  mode: GAME_MODES.DRAUGHTS,
  player1: { name: 'Player 1' },
  player2: { name: 'Player 2' },
} as const

export const TILE_COLOURS = {
  WHITE: 1,
  BLACK: 2,
} as const

export const TILE_TYPES = {
  TEXT: 1,
  IMAGE: 2,
} as const

export const TILE_SIZES = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
} as const
