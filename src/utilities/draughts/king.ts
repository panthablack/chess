import { DRAUGHTS_PIECES } from '@/config/constants/pieces'
import { usePieceStore } from '@/stores/pieceStore'
import type { TileID } from '@/types/Board'
import type { Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { pieceIsAtEndOfBoard } from '@/utilities/boards'
import { pushIfTileBeyondIsFree, pushIfTileIsEmpty } from '@/utilities/tiles'

export const calculatePossibleDestinationTilesForKings = (
  piece: Piece,
  player: Player
): TileID[] => {
  const destinationTiles: TileID[] = []
  // if diagonal tiles empty and valid, enter those tiles into the array
  pushIfTileIsEmpty(destinationTiles, piece, player, 0, 0) // TOP LEFT // ****
  pushIfTileIsEmpty(destinationTiles, piece, player, 0, 2) // TOP RIGHT // ****
  pushIfTileIsEmpty(destinationTiles, piece, player, 2, 0) // BOTTOM LEFT // ****
  pushIfTileIsEmpty(destinationTiles, piece, player, 2, 2) // BOTTOM RIGHT // ****
  // if opposition pieces on diagonal, search for possible take
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 0, 0) // TOP LEFT // ****
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 0, 2) // TOP RIGHT // ****
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 2, 0) // BOTTOM LEFT // ****
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 2, 2) // BOTTOM RIGHT // ****
  // return tiles
  return destinationTiles
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
