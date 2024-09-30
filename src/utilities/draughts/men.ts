import type { TileID } from '@/types/Board'
import type { Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { pushIfTileBeyondIsFree, pushIfTileIsEmpty } from '@/utilities/tiles'

export const calculatePossibleDestinationTilesForMen = (piece: Piece, player: Player): TileID[] => {
  const destinationTiles: TileID[] = []
  // if diagonal tiles empty and valid, enter those tiles into the array
  pushIfTileIsEmpty(destinationTiles, piece, player, 0, 0) // TOP LEFT // ****
  pushIfTileIsEmpty(destinationTiles, piece, player, 0, 2) // TOP RIGHT // ****
  // if opposition pieces on diagonal, search for possible take
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 0, 0) // TOP LEFT // ****
  pushIfTileBeyondIsFree(destinationTiles, piece, player, 0, 2) // TOP RIGHT // ****
  // return tiles
  return destinationTiles
}
