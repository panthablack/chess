import { INITIAL_PIECE_POSITIONS_FOR_CHESS as INIT_POS } from '@/config/constants/games'
import type { Tile, TileID } from '@/types/Board'
import type { Move, PieceTilePositionMap, TilePiecePositionMap } from '@/types/Game'
import type { Player } from '@/types/Player'
import { cloneDeep } from 'lodash'
import { usePieceStore } from '@/stores/pieceStore'
import { setInitialPositions } from '@/utilities/games'
import type { Piece, PieceID } from '@/types/Piece'

export const calculatePossibleDestinationTilesForChess = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): TileID[] => {
  if (!piece || !player || !map) return []
  else return []
}

export const detectTakenPiecesForChess = (move: Move): PieceID[] => {
  console.log(move)
  return []
}

export const getInitialPlayerPositionsForChess = (
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
