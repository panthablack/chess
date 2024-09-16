import { GAME_MODES } from '@/config/constants/games'
import type { PlayerID } from '@/types/Player'
import type { PieceID } from '@/types/Piece'
import type { TileID } from '@/types/Board'

export type Game = {
  id: number
  mode: GameMode
  board: BoardID
  positions: PiecePositionMap
  players: PlayerID[]
}

export type GameID = number

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES]

export type GameOptions = {
  mode?: GameMode
  numPlayers?: number
}

export type PiecePositionMap = Record<TileID, PieceID>
