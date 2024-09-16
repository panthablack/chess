import type { Tile, TilePosition } from '@/types/Board'

export const getTileByPosition = (tiles: Tile[], position: TilePosition): Tile | null =>
  tiles.find(t => {
    const rowMatch = t.position[0] === position[0]
    const colMatch = t.position[1] === position[1]
    return rowMatch && colMatch
  }) || null
