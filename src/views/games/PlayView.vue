<template>
  <div class="playViewViewContainer">
    <div
      class="currentGameContainer my-4 max-w-4xl m-auto"
      v-if="gameStore.getCurrentGame && !loading"
    >
      <div class="playerInfoBar flex gap-4 items-center justify-between">
        <div
          class="playerDetailsContainer"
          v-for="player in playerStore.getCurrentPlayers"
          :key="player.id"
        >
          {{ player.name }}
        </div>
      </div>
      <div class="boardContainer">
        <ChessBoard v-if="gameStore.getCurrentGame.mode === GAME_MODES.CHESS" />
        <DraughtsBoard
          v-if="gameStore.getCurrentGame.mode === GAME_MODES.DRAUGHTS"
          :boardID="gameStore.getCurrentGame.board"
        />
      </div>
      <div class="actionsContainer my-8 flex items-center justify-end">
        <QuitGameForm />
      </div>
    </div>
    <Spinner
      class="loadingSpinner"
      v-if="loading"
    />
    <div
      class="startNewGameContainer"
      v-if="canStartNewGame"
    >
      <PageHeading>Start a New Game</PageHeading>
      <CreateNewGameForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessBoard from '@/components/boards/ChessBoard.vue'
import DraughtsBoard from '@/components/boards/DraughtsBoard.vue'
import CreateNewGameForm from '@/components/games/CreateNewGameForm.vue'
import QuitGameForm from '@/components/games/QuitGameForm.vue'
import Spinner from '@/components/loading/Spinner.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import { GAME_MODES } from '@/config/constants/games'
import { useGameStore } from '@/stores/gameStore'
import { usePlayerStore } from '@/stores/playerStore'
import { computed, onMounted, ref, type ComputedRef } from 'vue'

const gameStore = useGameStore()
const playerStore = usePlayerStore()

// TODO: IMPORTANT!!!! REMOVE WHEN INITIAL DEVELOPMENT COMPLETE!!! // ********************
const loading = ref(true)
onMounted(() => {
  gameStore.startNewGame()
  loading.value = false
})
const canStartNewGame: ComputedRef<boolean> = computed(() => !gameStore.currentGame)
// TODO: IMPORTANT!!!! REMOVE WHEN INITIAL DEVELOPMENT COMPLETE!!! // ********************
</script>