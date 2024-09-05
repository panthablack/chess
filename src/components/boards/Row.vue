<template>
  <div class="rowContainer flex gap-0 items-center justify-center flex-nowrap">
    <Tile
      v-for="tile in props.row.tiles"
      :key="'tile' + tile"
      :tile="tile"
    />
  </div>
</template>

<script setup lang="ts">
import Tile from '@/components/boards/Tile.vue'
import type { Row } from '@/types/Board'

const props = defineProps<{
  row: Row
}>()
</script>