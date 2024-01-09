<template>
  <nav class="flex space-x-4 items-center align-middle">
    <router-link
      v-for="tab in tabs"
      v-bind:key="tab.name"
      v-bind:to="tab.url"
      class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      exact-active-class="bg-gray-900 text-white"
    >
      {{ tab.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NavbarTab } from '../types'

const tabs = ref<NavbarTab[]>([
  {
    name: 'home',
    label: 'Home',
    url: '/',
  },
  {
    name: 'pokemons',
    label: 'Pokémons',
    url: '/pokemons',
  },
])
</script>

<style scoped></style>
