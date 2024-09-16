<template>
  <div class="rowContainer flex gap-0 items-center justify-center flex-nowrap">
    <Tile
      v-for="tile in tiles"
      :key="'tile' + tile"
      :tile="tile"
    />
  </div>
</template>

<script setup lang="ts">
import Tile from '@/components/boards/Tile.vue'
import { useTileStore } from '@/stores/tileStore'
import type { Row, Tile as TileType } from '@/types/Board'
import { computed, type ComputedRef } from 'vue'

const props = defineProps<{
  row: Row
}>()

const tileStore = useTileStore()
const tiles: ComputedRef<TileType[]> = computed(() => props.row?.tiles?.map(t => tileStore.tiles[t])) || []
</script>