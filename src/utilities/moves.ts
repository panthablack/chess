import { useTileStore } from '@/stores/tileStore'
import type { Tile, TileID, TilePosition } from '@/types/Board'
import type { Move, TilePiecePositionMap } from '@/types/Game'
import type { PieceID } from '@/types/Piece'
import { removeElementsInCommon, reverseObject } from '@/utilities/objects'

export const getMovedPiece = (move: Move): PieceID => {
  if (!move || !move.before || !move.after) throw "can't detect moved piece: invalid move"
  const pairsThatHaveChanged = removeElementsInCommon([move.before, move.after])
  const pieceID = Object.values(pairsThatHaveChanged[1]).filter(v => !!v)[0]
  return pieceID
}

export const getPositionsFromMove = (move: Move): [TilePosition, TilePosition] => {
  const tileStore = useTileStore()
  const pieceMoved = getMovedPiece(move)
  const moveStart: TilePiecePositionMap = move.before
  const moveEnd: TilePiecePositionMap = move.after
  const oldTileID: TileID = reverseObject(moveStart)[pieceMoved]
  const newTileID: TileID = reverseObject(moveEnd)[pieceMoved]
  const oldTile: Tile = tileStore.tiles[oldTileID]
  const newTile: Tile = tileStore.tiles[newTileID]
  const oldPosition = oldTile.position
  const newPosition = newTile.position
  return [oldPosition, newPosition]
}

export const getNumberOfSquaresMoved = (move: Move): number => {
  if (!move || !move.before || !move.after) return 0
  const [oldPosition, newPosition] = getPositionsFromMove(move)
  const numRowsChanged = Math.abs(oldPosition[0] - newPosition[0])
  const numColsChanged = Math.abs(oldPosition[1] - newPosition[1])
  const squaresMoved = numRowsChanged + numColsChanged
  return squaresMoved
}

export const getPositionBetween = (pos1: TilePosition, pos2: TilePosition): TilePosition => {
  if (!pos1 || !pos2) throw 'cannot detect position between without end positions'
  const rowBetween = (pos1[0] + pos2[0]) / 2
  const colBetween = (pos1[1] + pos2[1]) / 2
  const positionBetween: TilePosition = [rowBetween, colBetween]
  return positionBetween
}
