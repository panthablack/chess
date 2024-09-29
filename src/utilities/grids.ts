import type { ColPosition, RowPosition } from '@/types/Board'

export const generateNullGrid = (rows: number, cols: number): null[][] =>
  Array.from(Array(rows), () => Array.from(Array(cols), () => null))

export const copyGrid = (grid: any[][]): any[][] => {
  const tMat: any[][] = []
  for (let r = 0; r < grid.length; r++) {
    const row = []
    for (let c = 0; c < grid[r].length; c++) row[c] = grid[r][c]
    tMat[r] = row
  }
  return tMat
}

export const translateGrid = (grid: any[][], offset: [RowPosition, ColPosition]): any[][] => {
  const tMat: any[][] = []
  for (let r = 0; r < grid.length; r++) {
    const row = []
    for (let c = 0; c < grid[r].length; c++) row[c - offset[1]] = grid[r][c]
    tMat[r - offset[0]] = row
  }
  return tMat
}

// *************************************************************************************************
// This won't work as negative indexes don't work.
// Needs a different solution requiring a positive offset.
export const translateGridToOrigin = (grid: any[][], center: [RowPosition, ColPosition]): any[][] =>
  translateGrid(grid, [0 - center[0], 0 - center[1]])
// *************************************************************************************************

export const rotateGrid180Degrees = (grid: any[][]): any[][] => {
  const rotatedGrid: any[][] = []
  const numRows = grid.length
  const numCols = grid[0].length
  for (let r = 0; r < numRows; r++) {
    const newRow: any[] = []
    for (let c = 0; c < numCols; c++) newRow[numCols - (c + 1)] = grid[r][c]
    rotatedGrid[numRows - (r + 1)] = newRow
  }
  return rotatedGrid
}
