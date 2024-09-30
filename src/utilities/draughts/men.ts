import { usePieceStore } from '@/stores/pieceStore'
import type { TileID } from '@/types/Board'
import type { Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { getLocalGrids } from '@/utilities/boards'

export const calculatePossibleDestinationTilesForMen = (piece: Piece, player: Player): TileID[] => {
  const pieceStore = usePieceStore()
  const destinationTiles: TileID[] = []
  const { localPieceGrid: lpm, localTileGrid: ltm } = getLocalGrids(piece, player)
  // if forward diagonal tiles empty and valid, enter those tiles into the array
  if (lpm[0][0] === null && ltm[0][0] !== null) destinationTiles.push(ltm[0][0])
  if (lpm[0][2] === null && ltm[0][2] !== null) destinationTiles.push(ltm[0][2])
  // if opposition pieces on diagonal, search for possible take
  const oppositionPieceIDs = pieceStore.oppositionPieceIDs
  if (lpm[0][0] !== null) {
    if (oppositionPieceIDs.includes(lpm[0][0])) {
      // check if square beyond opposition piece is empty and exists
      const { localPieceGrid: lpmTopLeft, localTileGrid: ltmTopLeft } = getLocalGrids(
        pieceStore.pieces[lpm[0][0]],
        player
      )
      if (lpmTopLeft[0][0] === null && ltmTopLeft[0][0] !== null)
        destinationTiles.push(ltmTopLeft[0][0])
    }
  }
  if (lpm[0][2] !== null) {
    if (oppositionPieceIDs.includes(lpm[0][2])) {
      // check if square beyond opposition piece is empty and exists
      const { localPieceGrid: lpmTopRight, localTileGrid: ltmTopRight } = getLocalGrids(
        pieceStore.pieces[lpm[0][2]],
        player
      )
      if (lpmTopRight[0][2] === null && ltmTopRight[0][2] !== null)
        destinationTiles.push(ltmTopRight[0][2])
    }
  }
  return destinationTiles
}
