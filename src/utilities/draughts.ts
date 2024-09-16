import { INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS as INIT_POS } from '@/config/constants/games'
import type { Tile } from '@/types/Board'
import type { PiecePositionMap } from '@/types/Game'
import type { Player } from '@/types/Player'
import { cloneDeep } from 'lodash'
import { usePiecesStore } from '@/stores/piecesStore'
import { setInitialPositions } from '@/utilities/games'
import type { Piece } from '@/types/Piece'

export const getInitialPlayerPositionsForDraughts = (
  players: [Player, Player],
  tiles: Tile[]
): PiecePositionMap => {
  const piecesStore = usePiecesStore()
  const positions: PiecePositionMap = {}

  // set player 1 positions
  const player1 = players[0]
  const player1AvailablePieces: Piece[] = cloneDeep(piecesStore.getSetPieces(player1.set))
  setInitialPositions(positions, INIT_POS.PLAYER_1, player1AvailablePieces, tiles)

  // set player 2 positions
  const player2 = players[1]
  const player2AvailablePieces: Piece[] = cloneDeep(piecesStore.getSetPieces(player2.set))
  setInitialPositions(positions, INIT_POS.PLAYER_2, player2AvailablePieces, tiles)

  // return positions
  return positions
}
