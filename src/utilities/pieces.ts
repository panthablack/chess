import {
  INITIAL_PIECE_POSITIONS_FOR_CHESS as INIT_POS_C,
  INITIAL_PIECE_POSITIONS_FOR_DRAUGHTS as INIT_POS_D,
} from '@/config/constants/games'
import type { LocalTileGrid } from '@/types/Board'
import type { ChessPieceType, DraughtsPieceType, PieceColour } from '@/types/Piece'
import { cloneDeep, flattenDeep } from 'lodash'
import { falsyNotZero } from './booleans'
import { useTileStore } from '@/stores/tileStore'
import { PIECE_COLOURS } from '@/config/constants/pieces'

export const getStartingChessPieceTypes = (colour: PieceColour): ChessPieceType[] => {
  if (colour === PIECE_COLOURS.WHITE)
    return flattenDeep(cloneDeep(INIT_POS_C.PLAYER_1)).filter(p => p !== null)
  else if (colour === PIECE_COLOURS.BLACK)
    return flattenDeep(cloneDeep(INIT_POS_C.PLAYER_2)).filter(p => p !== null)
  else throw 'Player colour not supported'
}

export const getStartingDraughtsPieceTypes = (colour: PieceColour): DraughtsPieceType[] => {
  if (colour === PIECE_COLOURS.WHITE)
    return flattenDeep(cloneDeep(INIT_POS_D.PLAYER_1)).filter(p => p !== null)
  else if (colour === PIECE_COLOURS.BLACK)
    return flattenDeep(cloneDeep(INIT_POS_D.PLAYER_2)).filter(p => p !== null)
  else throw 'Player colour not supported'
}

export const getLocalPieceGrid = (localTileGrid: LocalTileGrid): LocalTileGrid => {
  const tileStore = useTileStore()
  const map = tileStore.tilePiecePositionMap
  return localTileGrid.map(r =>
    r.map(c => (c === null || falsyNotZero(c) ? null : map[c]))
  ) as LocalTileGrid
}
