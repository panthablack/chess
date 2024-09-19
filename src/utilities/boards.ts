import type { Board, TilePosition } from '@/types/Board'

export const positionOnBoard = (p: TilePosition, board: Board): boolean => {
  // debugger
  return board.layout[0] === p[0]
}
