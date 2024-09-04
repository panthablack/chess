<template>
  <div class="createNewGameFormContainer">
    <PrimaryButton
      @click="onCreateClicked"
      :disabled="creating"
      :text="createNewGameButtonText"
    />
    <Modal
      :modelValue="creating"
      @update:modelValue="abortCreation"
    >
      <ModalHeading>New Game Options</ModalHeading>
      <ModalBody
        hasFooter
        hasHeader
      >
        <p>
          (For now this just creates a default Game of 2 players with default names.)
        </p>
      </ModalBody>
      <ModalFooter>
        <PrimaryButton
          type="submit"
          @click="onSubmit"
        >Start Game</PrimaryButton>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import Modal from '@/components/modals/Modal.vue'
import ModalBody from '@/components/modals/ModalBody.vue'
import ModalFooter from '@/components/modals/ModalFooter.vue'
import ModalHeading from '@/components/modals/ModalHeader.vue'
import { useGameStore } from '@/stores/gameStore'
import type { GameOptions } from '@/types/Game'
import { computed, reactive, ref, type Reactive } from 'vue'

const gameStore = useGameStore()

const creating = ref(false)

const formValues: Reactive<GameOptions> = reactive({})

const onCreateClicked = () => {
  creating.value = true
}

const onSubmit = () => {
  gameStore.startNewGame(formValues)
  resetForm()
}

const abortCreation = () => resetForm()

const resetForm = () => {
  creating.value = false
}

const createNewGameButtonText = computed(() => creating.value ? 'Loading...' : 'Start New Game')

</script>