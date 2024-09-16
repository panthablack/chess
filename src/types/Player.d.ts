import type { PieceColour, PieceSetID } from './Piece'

export type Player = {
  id: PlayerID
  playerNumber: number
  name: string
  colour: PieceColour
  set: PieceSetID
}

export type PlayerID = number

export type PlayerOptions = {
  name: string
  colour: PieceColour
  playerNumber: number
  set: PieceSetID
}
