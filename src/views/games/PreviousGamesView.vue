<template>
  <div class="previousGamesViewViewContainer">
    <PageHeading>Previous Games</PageHeading>
    <CreateNewGameForm />
    <div class="gamesContainer my-4">
      <p>(There are no previous games to show.)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateNewGameForm from '@/components/games/CreateNewGameForm.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
</script>