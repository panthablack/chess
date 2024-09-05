<template>
  <div
    class="tileContainer clickable"
    :class="getClass"
  >
    <div class="w-full flex items-center justify-center border-2 border-amber-200">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TILE_COLOURS, TILE_SIZES } from '@/config/constants'
import type { Tile } from '@/types/Board'
import { computed } from 'vue'

const props = defineProps<{
  tile: Tile
}>()

const getColourClass = computed(() => {
  if (props.tile.colour === TILE_COLOURS.WHITE) return 'bg-amber-50 text-slate-950'
  else if (props.tile.colour === TILE_COLOURS.BLACK) return 'bg-black text-white'
  else return 'bg-gray-400 text-white'
})

const getSizeClass = computed(() => {
  if (props.tile.size === TILE_SIZES.SMALL) return 'w-6 h-6'
  else if (props.tile.size === TILE_SIZES.MEDIUM) return 'w-8 h-8'
  else if (props.tile.size === TILE_SIZES.LARGE) return 'w-10 h-10'
  else return 'w-6 h-6'
})

const getClass = computed(() => {
  return `${getSizeClass.value} ${getColourClass.value}`
})
</script>