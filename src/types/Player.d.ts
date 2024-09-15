import type { PieceColour, PieceSetID } from './Piece'

export type Player = {
  id: PlayerID
  name: string
  colour: PieceColour
  pieces: PieceSetID
}

export type PlayerID = number

export type PlayerOptions = {
  name: string
  colour: PieceColour
  pieces: PieceSetID
}
