<template>
  <div class="createNewGameFormContainer">
    <DangerButton
      @click="onCreateClicked"
      :disabled="quitting"
      :text="createNewGameButtonText"
    />
    <Modal
      :modelValue="quitting"
      @update:modelValue="keepPlaying"
    >
      <ModalHeading theme="danger">Quit Game</ModalHeading>
      <ModalBody
        hasFooter
        hasHeader
      >
        <p>
          Are you sure you want to quit?
        </p>
      </ModalBody>
      <ModalFooter>
        <DangerButton
          type="submit"
          @click="onSubmit"
        >Quit Game</DangerButton>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import DangerButton from '@/components/buttons/DangerButton.vue'
import Modal from '@/components/modals/Modal.vue'
import ModalBody from '@/components/modals/ModalBody.vue'
import ModalFooter from '@/components/modals/ModalFooter.vue'
import ModalHeading from '@/components/modals/ModalHeader.vue'
import { useGameStore } from '@/stores/gameStore'
import { computed, ref } from 'vue'

const gameStore = useGameStore()

const quitting = ref(false)

const onCreateClicked = () => {
  quitting.value = true
}

const onSubmit = () => {
  gameStore.quitCurrentGame()
  resetForm()
}

const keepPlaying = () => resetForm()

const resetForm = () => {
  quitting.value = false
}

const createNewGameButtonText = computed(() => quitting.value ? 'Quitting...' : 'Quit Game')

</script>