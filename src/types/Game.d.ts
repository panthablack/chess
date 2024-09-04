import { MODES } from '@/config/constants'

export type Player = {
  name: string
}

export type Game = {
  mode: (typeof MODES)[keyof typeof MODES]
  player1: Player
  player2: Player
}

export type GameOptions = {
  mode?: (typeof MODES)[keyof typeof MODES]
  player1?: Player
  player2?: Player
}
