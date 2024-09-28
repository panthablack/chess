import type { ColPosition, RowPosition } from '@/types/Board'

export const generateNullMatrix = (rows: number, cols: number): null[][] =>
  Array.from(Array(rows), () => Array.from(Array(cols), () => null))

export const copyMatrix = (matrix: any[][]): any[][] => {
  const tMat: any[][] = []
  for (let r = 0; r < matrix.length; r++) {
    const row = []
    for (let c = 0; c < matrix[r].length; c++) row[c] = matrix[r][c]
    tMat[r] = row
  }
  return tMat
}

export const translateMatrix = (matrix: any[][], offset: [RowPosition, ColPosition]): any[][] => {
  const tMat: any[][] = []
  for (let r = 0; r < matrix.length; r++) {
    const row = []
    for (let c = 0; c < matrix[r].length; c++) row[c - offset[1]] = matrix[r][c]
    tMat[r - offset[0]] = row
  }
  return tMat
}

export const translateMatrixToOrigin = (
  matrix: any[][],
  center: [RowPosition, ColPosition]
): any[][] => translateMatrix(matrix, [0 - center[0], 0 - center[1]])
