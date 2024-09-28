import { useBoardStore } from '@/stores/boardStore'
import { useGameStore } from '@/stores/gameStore'
import { useTileStore } from '@/stores/tileStore'
import type { ColPosition, LocalTileMatrix, RowPosition, TileMatrix } from '@/types/Board'
import type { LocalPieceMatrix, Piece } from '@/types/Piece'
import type { Player } from '@/types/Player'
import { generateNullMatrix } from '@/utilities/matrices'
import { falsyNotZero } from './booleans'
import { getLocalPieceMatrix } from './pieces'

export type LocalMatrixCollection = {
  localTileMatrix: LocalTileMatrix
  localPieceMatrix: LocalPieceMatrix
}

export const generateNewEmptyLocalTileMatrix = (): LocalTileMatrix =>
  generateNullMatrix(3, 3) as LocalTileMatrix

export const generateNewEmptyTileMatrix = (): TileMatrix => generateNullMatrix(8, 8)

export const generateEmptyLocalMatrixCollection = (): LocalMatrixCollection => ({
  localTileMatrix: generateNewEmptyLocalTileMatrix(),
  localPieceMatrix: generateNewEmptyLocalTileMatrix(),
})

export const getLocalMatrices = (piece: Piece, player: Player): LocalMatrixCollection => {
  const tileStore = useTileStore()
  const map = tileStore.tilePiecePositionMap
  if (!piece || !player || !map) return generateEmptyLocalMatrixCollection()
  const localTileMatrix = getLocalTileMatrix(piece)
  const localPieceMatrix = getLocalPieceMatrix(localTileMatrix)
  return { localTileMatrix, localPieceMatrix }
}

export const getSurroundingPositions = (
  center: [RowPosition, ColPosition]
): [RowPosition, ColPosition][][] =>
  Array.from(Array(3), (...[, rIndex]) =>
    Array.from(Array(3), (...[, cIndex]) => [rIndex - 1 + center[0], cIndex - 1 + center[1]])
  )

export const getSurroundingTiles = (
  tiles: TileMatrix,
  center: [RowPosition, ColPosition]
): LocalTileMatrix => {
  const boardStore = useBoardStore()
  const matrix: LocalTileMatrix = generateNewEmptyLocalTileMatrix()
  // set center tile
  const ct = tiles[center[0]][center[1]]
  if (!ct) return matrix
  else matrix[1][1] = ct
  // set surrounding tiles if there
  const surrPos = getSurroundingPositions(center)
  surrPos.forEach((r, rIndex) =>
    r.forEach((p, cIndex) => {
      if (p[0] < 0 || p[1] < 0) matrix[rIndex][cIndex] = null
      else if (!tiles[p[0]]) matrix[rIndex][cIndex] = null
      else
        matrix[rIndex][cIndex] = boardStore.isValidPosition([p[0], p[1]]) ? tiles[p[0]][p[1]] : null
    })
  )
  return matrix
}

export const getLocalTileMatrix = (piece: Piece): LocalTileMatrix => {
  const tileStore = useTileStore()
  const gameStore = useGameStore()
  const matrix: LocalTileMatrix = generateNewEmptyLocalTileMatrix()
  // if no center tile id, return null matrix
  const centreTileID = gameStore.pieceTilePositionMap[piece.id]
  if (centreTileID === null || falsyNotZero(centreTileID)) return matrix
  const ctPos = tileStore.tiles[centreTileID].position
  return getSurroundingTiles(tileStore.tilePositionMatrix, [ctPos[0], ctPos[1]])
}
