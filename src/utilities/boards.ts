import { useTileStore } from '@/stores/tileStore'
import type { LocalTileGrid } from '@/types/Board'
import type { LocalPieceGrid, Piece, PieceID } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { rotateGrid180Degrees } from '@/utilities/grids'
import { getLocalPieceGrid } from '@/utilities/pieces'
import { isEven, isOdd } from '@/utilities/numbers'
import { generateNewEmptyLocalTileGrid, getLocalTileGrid } from '@/utilities/tiles'
import { usePieceStore } from '@/stores/pieceStore'

export type LocalGridCollection = {
  localTileGrid: LocalTileGrid
  localPieceGrid: LocalPieceGrid
}

export const generateEmptyLocalGridCollection = (): LocalGridCollection => ({
  localTileGrid: generateNewEmptyLocalTileGrid(),
  localPieceGrid: generateNewEmptyLocalTileGrid(),
})

export const getLocalGrids = (piece: Piece, player: Player): LocalGridCollection => {
  const tileStore = useTileStore()
  const map = tileStore.tilePiecePositionMap
  if (!piece || !player || !map) return generateEmptyLocalGridCollection()
  const localTileGrid: LocalTileGrid = getLocalTileGrid(piece)
  const localPieceGrid: LocalPieceGrid = getLocalPieceGrid(localTileGrid)
  const localGrids = { localTileGrid, localPieceGrid }
  if (isOdd(player.playerNumber)) return localGrids
  else return rotateLocalGrids(localGrids)
}

export const pieceIsAtEndOfBoard = (pieceID: PieceID): boolean => {
  const pieceStore = usePieceStore()
  const currentPosition = pieceStore.getPiecePosition(pieceID)
  const player = pieceStore.getPiecePlayer(pieceID)
  if (!player || !currentPosition) return false
  else if (isOdd(player.playerNumber)) return currentPosition[0] === 0
  else if (isEven(player.playerNumber)) return currentPosition[0] === 7
  else return false
}

export const rotateLocalGrids = (grids: LocalGridCollection): LocalGridCollection => {
  const rTileGrid = rotateGrid180Degrees(grids.localTileGrid) as LocalTileGrid
  const rPieceGrid = rotateGrid180Degrees(grids.localPieceGrid) as LocalPieceGrid
  return { localTileGrid: rTileGrid, localPieceGrid: rPieceGrid }
}
