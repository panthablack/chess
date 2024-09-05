import type { BOARD_TYPES, TILE_COLOURS, TILE_TYPES, TILE_SIZES } from '@/config/constants'

export type Row = {
  id: number
  tiles: Tile[]
}

export type Board = {
  id: number
  rows: Row[]
  type: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type NewBoardOptions = {
  rows?: number
  cols?: number
  type: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type NewRowOptions = {
  cols?: number
}

export type TileSize = (typeof TILE_SIZES)[keyof typeof TILE_SIZES]

export type TileColour = (typeof TILE_COLOURS)[keyof typeof TILE_COLOURS]

export type Tile = {
  id: number
  colour: TileColour
  size: TileSize
  type: (typeof TILE_TYPES)[keyof typeof TILE_TYPES]
  value: any
}
