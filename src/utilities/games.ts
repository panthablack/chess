import { GAME_MODES } from '@/config/constants/games'
import type { GameMode, PiecePositionMap } from '@/types/Game'
import type { Tile, TilePosition } from '@/types/Board'
import type { Piece, PieceID, PieceType } from '@/types/Piece'
import { removeIfMatched } from '@/utilities/arrays'
import { getTileByPosition } from '@/utilities/tiles'

export const twoPlayerGames = [GAME_MODES.CHESS, GAME_MODES.DRAUGHTS]

export const is2PlayerGame = (mode: GameMode): boolean => twoPlayerGames.includes(mode)

export const splicePieceIfTypeMatched = (
  type: PieceType,
  availablePieces: Piece[]
): Piece | null => {
  const index = availablePieces.findIndex(p => p.type === type)
  if (index === -1) return null
  else return availablePieces.splice(index, 1)[0]
}

export const setInitialPositions = (
  ppMap: PiecePositionMap,
  initialPositions: (PieceType | null)[][],
  availablePieces: Piece[],
  tiles: Tile[]
): void => {
  initialPositions.forEach((r, rIndex: number) =>
    r.forEach((c: PieceType | null, cIndex: number) => {
      if (c === null) return
      else {
        const position: TilePosition = [rIndex, cIndex]
        const tileID = getTileByPosition(tiles, position)?.id
        if (!tileID) throw 'Could not find tile by position'
        const piece: Piece | null = splicePieceIfTypeMatched(c, availablePieces)
        if (!piece) throw 'No available piece remaining'
        const pieceID: PieceID = piece.id
        ppMap[tileID] = pieceID
      }
    })
  )
}
