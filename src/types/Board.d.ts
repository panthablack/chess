import type { BOARD_TYPES, TILE_COLOURS, TILE_TYPES, TILE_SIZES } from '@/config/constants'

export type Board = {
  id: BoardID
  layout: BoardLayout
  rows: RowID[]
  type: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type BoardID = number

export type BoardLayout = [RowLength, ColumnLength]

export type ColPosition = number

export type LocalTileID = TileID | null

export type LocalTileGrid = [
  [LocalTileID, LocalTileID, LocalTileID],
  [LocalTileID, LocalTileID, LocalTileID],
  [LocalTileID, LocalTileID, LocalTileID],
]

export type NewBoardOptions = {
  layout?: BoardLayout
  type?: (typeof BOARD_TYPES)[keyof typeof BOARD_TYPES]
}

export type NewRowOptions = {
  tiles: Tile[]
  position: RowPosition
}

export type NewTileOptions = {
  colour?: TileColour
  position: TilePosition
  type?: (typeof TILE_TYPES)[keyof typeof TILE_TYPES]
  value?: any
}

export type Row = {
  id: RowID
  position: RowPosition
  tiles: TileID[]
}

export type RowID = number

export type RowPosition = number

export type Tile = {
  id: number
  colour: TileColour
  position: TilePosition
  type: (typeof TILE_TYPES)[keyof typeof TILE_TYPES]
}

export type TileColour = (typeof TILE_COLOURS)[keyof typeof TILE_COLOURS]

export type TileID = number

export type TileGrid = TileGridID[][]

export type TileGridID = TileID | null

export type TilePosition = [RowPosition, ColPosition]

export type TilePositionGrid = TileGrid

export type TileSize = (typeof TILE_SIZES)[keyof typeof TILE_SIZES]
