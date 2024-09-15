<template>
  <div class="dashboardViewContainer">
    <PageHeading>Dashboard</PageHeading>
    <QuitGameForm v-if="gameStore.getCurrentGame" />
    <CreateNewGameForm v-else />
  </div>
</template>

<script setup lang="ts">
import CreateNewGameForm from '@/components/games/CreateNewGameForm.vue'
import QuitGameForm from '@/components/games/QuitGameForm.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>