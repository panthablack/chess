import { DRAUGHTS_PIECES } from '@/config/constants/pieces'
import { usePieceStore } from '@/stores/pieceStore'
import type { TileID } from '@/types/Board'
import type { PieceTilePositionMap } from '@/types/Game'
import type { Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { pieceIsAtEndOfBoard } from '@/utilities/boards'

export const calculatePossibleDestinationTilesForKings = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): TileID[] => {
  if (!piece || !player || !map) return []
  // if diagonal tiles empty, enter those tiles into the array

  return []
}

export const shouldBecomeKing = (piece: Piece): boolean => {
  // check if current piece has reached the end of the board
  const isAtEndOfBoard = pieceIsAtEndOfBoard(piece.id)
  // if so, check if its type is man
  const isMan = piece.type === DRAUGHTS_PIECES.MAN
  return isMan && isAtEndOfBoard
}

export const transformPieceIntoKing = (piece: Piece): void => {
  const pieceStore = usePieceStore()
  pieceStore.pieces[piece.id].type = DRAUGHTS_PIECES.KING
}
