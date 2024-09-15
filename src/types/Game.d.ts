import { GAME_MODES } from '@/config/constants/games'
import type { PlayerID } from '@/types/Player'

export type Game = {
  id: number
  mode: GameMode
  board: BoardID
  positions: PieceID[][]
  players: PlayerID[]
}

export type GameID = number

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES]

export type GameOptions = {
  mode?: GameMode
  numPlayers?: number
}
