<template>
  <div class="playViewViewContainer">
    <div
      class="currentGameContainer my-4 max-w-4xl m-auto"
      v-if="gameStore.currentGame"
    >
      <div class="playerInfoBar flex gap-4 items-center justify-between">
        <div class="player1DetailsContainer">
          {{ gameStore.currentGame.player1.name }}
        </div>
        <div class="player2DetailsContainer">
          {{ gameStore.currentGame.player2.name }}
        </div>
      </div>
      <ChessBoard />
      <div class="actionsContainer my-8 flex items-center justify-end">
        <QuitGameForm />
      </div>
    </div>
    <div
      class="startNewGameContainer"
      v-else
    >
      <PageHeading>Start a New Game</PageHeading>
      <CreateNewGameForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateNewGameForm from '@/components/games/CreateNewGameForm.vue'
import QuitGameForm from '@/components/games/QuitGameForm.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>