import { useBoardStore } from '@/stores/boardStore'
import { useGameStore } from '@/stores/gameStore'
import { useTileStore } from '@/stores/tileStore'
import type { ColPosition, LocalTileGrid, RowPosition, TileGrid } from '@/types/Board'
import type { LocalPieceGrid, Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { generateNullGrid } from '@/utilities/grids'
import { falsyNotZero } from './booleans'
import { getLocalPieceGrid } from './pieces'

export type LocalGridCollection = {
  localTileGrid: LocalTileGrid
  localPieceGrid: LocalPieceGrid
}

export const generateNewEmptyLocalTileGrid = (): LocalTileGrid =>
  generateNullGrid(3, 3) as LocalTileGrid

export const generateNewEmptyTileGrid = (): TileGrid => generateNullGrid(8, 8)

export const generateEmptyLocalGridCollection = (): LocalGridCollection => ({
  localTileGrid: generateNewEmptyLocalTileGrid(),
  localPieceGrid: generateNewEmptyLocalTileGrid(),
})

export const getLocalMatrices = (piece: Piece, player: Player): LocalGridCollection => {
  const tileStore = useTileStore()
  const map = tileStore.tilePiecePositionMap
  if (!piece || !player || !map) return generateEmptyLocalGridCollection()
  const localTileGrid = getLocalTileGrid(piece)
  const localPieceGrid = getLocalPieceGrid(localTileGrid)
  return { localTileGrid, localPieceGrid }
}

export const getSurroundingPositions = (
  center: [RowPosition, ColPosition]
): [RowPosition, ColPosition][][] =>
  Array.from(Array(3), (...[, rIndex]) =>
    Array.from(Array(3), (...[, cIndex]) => [rIndex - 1 + center[0], cIndex - 1 + center[1]])
  )

export const getSurroundingTiles = (
  tiles: TileGrid,
  center: [RowPosition, ColPosition]
): LocalTileGrid => {
  const boardStore = useBoardStore()
  const grid: LocalTileGrid = generateNewEmptyLocalTileGrid()
  // set center tile
  const ct = tiles[center[0]][center[1]]
  if (!ct) return grid
  else grid[1][1] = ct
  // set surrounding tiles if there
  const surrPos = getSurroundingPositions(center)
  surrPos.forEach((r, rIndex) =>
    r.forEach((p, cIndex) => {
      if (p[0] < 0 || p[1] < 0) grid[rIndex][cIndex] = null
      else if (!tiles[p[0]]) grid[rIndex][cIndex] = null
      else
        grid[rIndex][cIndex] = boardStore.isValidPosition([p[0], p[1]]) ? tiles[p[0]][p[1]] : null
    })
  )
  return grid
}

export const getLocalTileGrid = (piece: Piece): LocalTileGrid => {
  const tileStore = useTileStore()
  const gameStore = useGameStore()
  const grid: LocalTileGrid = generateNewEmptyLocalTileGrid()
  // if no center tile id, return null grid
  const centreTileID = gameStore.pieceTilePositionMap[piece.id]
  if (centreTileID === null || falsyNotZero(centreTileID)) return grid
  const ctPos = tileStore.tiles[centreTileID].position
  return getSurroundingTiles(tileStore.tilePositionGrid, [ctPos[0], ctPos[1]])
}
