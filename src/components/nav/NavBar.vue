<script setup lang="ts">
import NavBarLink from '@/components/nav/NavBarLink.vue'
</script>

<template>
  <nav class="navBar p-4 flex flex-no-wrap gap-y-4 gap-x-6 bg-gray-700">
    <!-- <NavBarLink to="/">Dashboard</NavBarLink> -->
    <NavBarLink to="/play">Play</NavBarLink>
    <NavBarLink to="/previous-games">Previous Games</NavBarLink>
  </nav>
</template>