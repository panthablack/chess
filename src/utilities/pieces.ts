import {
  INITIAL_PIECE_POSITIONS_FOR_CHESS,
  INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS,
} from '@/config/constants/games'
import type { LocalTileGrid } from '@/types/Board'
import type { ChessPieceType, DraughtsPieceType } from '@/types/Piece'
import { cloneDeep, flattenDeep } from 'lodash'
import { falsyNotZero } from './booleans'
import { useTileStore } from '@/stores/tileStore'

export const getStartingChessPieceTypes = (): ChessPieceType[] =>
  flattenDeep(cloneDeep(INITIAL_PIECE_POSITIONS_FOR_CHESS.PLAYER_1)).filter(p => p !== null)

export const getStartingDraughtsPieceTypes = (): DraughtsPieceType[] =>
  flattenDeep(cloneDeep(INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS.PLAYER_1)).filter(p => p !== null)

export const getLocalPieceGrid = (localTileGrid: LocalTileGrid): LocalTileGrid => {
  const tileStore = useTileStore()
  const map = tileStore.tilePiecePositionMap
  return localTileGrid.map(r =>
    r.map(c => (c === null || falsyNotZero(c) ? null : map[c]))
  ) as LocalTileGrid
}
