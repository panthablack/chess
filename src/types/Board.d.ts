import type { BOARD_TYPES, TILE_COLOURS, TILE_TYPES, TILE_SIZES } from '@/config/constants'

export type Board = {
  id: BoardID
  layout: BoardLayout
  rows: Row[]
  type: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type BoardID = number

export type BoardLayout = [RowLength, ColumnLength]

export type ColPosition = number

export type NewBoardOptions = {
  layout?: BoardLayout
  type?: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type NewRowOptions = {
  tiles: Tile[]
  position: number
}

export type NewTileOptions = {
  colour?: TileColour
  position: [RowPosition, ColPosition]
  type?: (typeof TILE_TYPES)[keyof typeof TILE_TYPES]
  value?: any
}

export type Row = {
  id: RowID
  position: RowPosition
  tiles: Tile[]
}

export type RowID = number

export type RowPosition = number

export type TileSize = (typeof TILE_SIZES)[keyof typeof TILE_SIZES]

export type TileColour = (typeof TILE_COLOURS)[keyof typeof TILE_COLOURS]

export type Tile = {
  id: number
  colour: TileColour
  position: [RowPosition, ColPosition]
  type: (typeof TILE_TYPES)[keyof typeof TILE_TYPES]
}
