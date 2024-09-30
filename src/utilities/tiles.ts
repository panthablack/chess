import { useTileStore } from '@/stores/tileStore'
import type { Tile, TileID, TilePosition } from '@/types/Board'
import { getPositionBetween, getPositionsFromMove } from '@/utilities/moves'
import { useBoardStore } from '@/stores/boardStore'
import { useGameStore } from '@/stores/gameStore'
import type { ColPosition, LocalTileGrid, RowPosition, TileGrid } from '@/types/Board'
import type { Piece } from '@/types/Piece'
import { generateNullGrid } from '@/utilities/grids'
import { falsyNotZero } from '@/utilities/booleans'
import type { Move } from '@/types/Game'
import type { Player } from '@/types/Player'
import { usePieceStore } from '@/stores/pieceStore'
import { getLocalGrids } from '@/utilities/boards'

export const detectTileBetweenDiagonal = (move: Move): Tile | null => {
  if (!move || !move?.before || !move?.after) return null
  const tileStore = useTileStore()
  const [oldPosition, newPosition] = getPositionsFromMove(move)
  const positionBetween = getPositionBetween(oldPosition, newPosition)
  return getTileByPosition(tileStore.activeTiles, positionBetween)
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

export const generateNewEmptyLocalTileGrid = (): LocalTileGrid =>
  generateNullGrid(3, 3) as LocalTileGrid

export const generateNewEmptyTileGrid = (): TileGrid => generateNullGrid(8, 8)

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

export const getTileByPosition = (tiles: Tile[], position: TilePosition): Tile | null =>
  tiles.find(t => {
    const rowMatch = t.position[0] === position[0]
    const colMatch = t.position[1] === position[1]
    return rowMatch && colMatch
  }) || null

export const pushIfTileBeyondIsFree = (
  target: TileID[],
  piece: Piece,
  player: Player,
  row: number,
  col: number
): void => {
  const pieceStore = usePieceStore()
  const oppositionPieceIDs = pieceStore.oppositionPieceIDs
  const { localPieceGrid: lpm } = getLocalGrids(piece, player)
  if (lpm[row][col] !== null) {
    if (oppositionPieceIDs.includes(lpm[row][col])) {
      // check if square beyond opposition piece is empty and exists
      const { localPieceGrid: lpmBeyond, localTileGrid: ltmBeyond } = getLocalGrids(
        pieceStore.pieces[lpm[row][col]],
        player
      )
      if (lpmBeyond[row][col] === null && ltmBeyond[row][col] !== null)
        target.push(ltmBeyond[row][col])
    }
  }
}

export const pushIfTileIsEmpty = (
  target: TileID[],
  piece: Piece,
  player: Player,
  row: number,
  col: number
): void => {
  const { localPieceGrid: lpm, localTileGrid: ltm } = getLocalGrids(piece, player)
  if (lpm[row][col] === null && ltm[row][col] !== null) target.push(ltm[row][col])
}
