import { INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS as INIT_POS } from '@/config/constants/games'
import type { Tile } from '@/types/Board'
import type { PieceTilePositionMap, TilePiecePositionMap } from '@/types/Game'
import type { Player } from '@/types/Player'
import { cloneDeep } from 'lodash'
import { usePieceStore } from '@/stores/pieceStore'
import { setInitialPositions } from '@/utilities/games'
import type { Piece } from '@/types/Piece'
import { DRAUGHTS_PIECES } from '@/config/constants/pieces'

export const calculatePossibleDestinationTilesForMen = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): Tile[] => {
  if (!piece || !player || !map) return []
  // calculate positions for all tiles in front
  // const playerStore = usePlayerStore()
  // const boardStore = useBoardStore()
  // // const currentPlayer: Player = playerStore.currentPlayer
  // if (currentPlayer.playerNumber === 1)
  //   return boardStore.filterOutOffBoardPositions(
  //     tilesImmediatelyInFrontOfPiece(piece, player, position)
  //   )
  // filter out any tiles off the board
  // debugger
  else return []
}

export const calculatePossibleDestinationTilesForKings = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): Tile[] => {
  if (!piece || !player || !map) return []
  return []
}

export const calculatePossibleDestinationTilesForDraughts = (
  piece: Piece,
  player: Player,
  map: PieceTilePositionMap
): Tile[] => {
  if (!piece || !player || !map) return []
  if (piece.type === DRAUGHTS_PIECES.MAN)
    return calculatePossibleDestinationTilesForMen(piece, player, map)
  else if (piece.type === DRAUGHTS_PIECES.KING)
    return calculatePossibleDestinationTilesForKings(piece, player, map)
  else return []
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
