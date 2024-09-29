import { INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS as INIT_POS } from '@/config/constants/games'
import type { Tile, TileID } from '@/types/Board'
import type { Move, PieceTilePositionMap, TilePiecePositionMap } from '@/types/Game'
import type { Player } from '@/types/Player'
import { cloneDeep } from 'lodash'
import { usePieceStore } from '@/stores/pieceStore'
import { setInitialPositions } from '@/utilities/games'
import type { Piece, PieceID } from '@/types/Piece'
import { DRAUGHTS_PIECES } from '@/config/constants/pieces'
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

export const calculatePossibleDestinationTilesForKings = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): TileID[] => {
  if (!piece || !player || !map) return []
  // if diagonal tiles empty, enter those tiles into the array

  return []
}

export const calculatePossibleDestinationTilesForDraughts = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): TileID[] => {
  if (!piece || !player || !map) return []
  if (piece.type === DRAUGHTS_PIECES.MAN)
    return calculatePossibleDestinationTilesForMen(piece, player)
  else if (piece.type === DRAUGHTS_PIECES.KING)
    return calculatePossibleDestinationTilesForKings(piece, player, map)
  else return []
}

export const detectTakenPiecesForDraughts = (move: Move): PieceID[] => {
  alert(JSON.stringify(move))
  return []
}

export const getInitialPlayerPositionsForDraughts = (
  players: [Player, Player],
  tiles: Tile[]
): TilePiecePositionMap => {
  const pieceStore = usePieceStore()
  const positions: TilePiecePositionMap = {}

  // set player 1 positions
  const player1 = players[0]
  const player1AvailablePieces: Piece[] = cloneDeep(pieceStore.getSetPieces(player1.set))
  setInitialPositions(positions, INIT_POS.PLAYER_1, player1AvailablePieces, tiles)

  // set player 2 positions
  const player2 = players[1]
  const player2AvailablePieces: Piece[] = cloneDeep(pieceStore.getSetPieces(player2.set))
  setInitialPositions(positions, INIT_POS.PLAYER_2, player2AvailablePieces, tiles)

  // return positions
  return positions
}
