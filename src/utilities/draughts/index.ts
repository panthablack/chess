import { INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS as INIT_POS } from '@/config/constants/games'
import type { Tile, TileID } from '@/types/Board'
import type { Move, PieceTilePositionMap, TilePiecePositionMap } from '@/types/Game'
import type { Player } from '@/types/Player'
import { cloneDeep } from 'lodash'
import { usePieceStore } from '@/stores/pieceStore'
import { setInitialPositions } from '@/utilities/games'
import type { Piece, PieceID } from '@/types/Piece'
import { DRAUGHTS_PIECES } from '@/config/constants/pieces'
import { getNumberOfSquaresMoved } from '@/utilities/moves'
import { useGameStore } from '@/stores/gameStore'
import { detectTileBetweenDiagonal } from '../tiles'
import {
  calculatePossibleDestinationTilesForKings,
  shouldBecomeKing,
  transformPieceIntoKing,
} from '@/utilities/draughts/king'
import { calculatePossibleDestinationTilesForMen } from '@/utilities/draughts/men'

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
  const numSquaresMoved: number = getNumberOfSquaresMoved(move)
  const takenPieces = []
  if (numSquaresMoved == 4) {
    const takenPiece = getTakenPieceIDDraughts(move)
    if (takenPiece) takenPieces.push(takenPiece)
  }
  return takenPieces
}

export const getTakenPieceIDDraughts = (move: Move): PieceID | null => {
  const gameStore = useGameStore()
  const positions = gameStore.currentGame?.positions
  if (!positions) throw 'cannot detect position of taken piece'
  const tileBetween = detectTileBetweenDiagonal(move)
  if (!tileBetween?.id) return null
  return positions[tileBetween.id] || null
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

export const handlePossibleTransformationsForDraughts = (): void => {
  const pieceStore = usePieceStore()
  const selectedPiece = pieceStore.selectedPiece
  if (!selectedPiece) return
  if (shouldBecomeKing(selectedPiece)) transformPieceIntoKing(selectedPiece)
}
