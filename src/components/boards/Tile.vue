<template>
  <div
    class="tileContainer shadow-inner"
    :class="getClass"
  >
    <div class="tileContent w-full h-full flex items-center gap-0 justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TILE_COLOURS, TILE_SIZES } from '@/config/constants/boards'
import { useTileStore } from '@/stores/tileStore'
import type { Tile } from '@/types/Board'
import { computed } from 'vue'

const props = defineProps<{
  tile: Tile
}>()

const tileStore = useTileStore()

const getBorderClass = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getColourClass = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getSizeClass = computed(() => {
  if (tileStore.tileSize === TILE_SIZES.SMALL) return 'w-12 h-12'
  else if (tileStore.tileSize === TILE_SIZES.MEDIUM) return 'w-20 h-20'
  else if (tileStore.tileSize === TILE_SIZES.LARGE) return 'w-32 h-32'
  else return 'w-6 h-6'
})

const getClass = computed(() => {
  return `${getSizeClass.value} ${getColourClass.value} ${getBorderClass.value}`
})
</script>