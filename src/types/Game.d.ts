import { GAME_MODES } from '@/config/constants/games'
import type { PlayerID } from '@/types/Player'
import type { PieceID } from '@/types/Piece'
import type { TileID } from '@/types/Board'

export type Game = {
  id: number
  boardID: BoardID
  currentPlayerID: PlayerID
  mode: GameMode
  moveIDs: MoveID[]
  positions: TilePiecePositionMap
  playerIDs: PlayerID[]
}

export type GameID = number

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES]

export type GameOptions = {
  mode?: GameMode
  numPlayers?: number
}

export type MoveID = number

export type Move = [TilePiecePositionMap, TilePiecePositionMap] // Before and After, respectively

export type TilePiecePositionMap = Record<TileID, PieceID | null>

export type PieceTilePositionMap = Record<PieceID, TileID | null>
