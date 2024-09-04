import type { Game } from '@/types/Game'

export const MODES = {
  CLASSIC: 1,
} as const

export const DEFAULT_NEW_GAME_OPTIONS: Game = {
  mode: MODES.CLASSIC,
  player1: { name: 'Player 1' },
  player2: { name: 'Player 2' },
} as const
