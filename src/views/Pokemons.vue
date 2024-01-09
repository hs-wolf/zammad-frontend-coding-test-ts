<template>
  <div
    ref="viewRef"
    class="flex flex-col gap-10 h-full py-10 px-5 overflow-auto"
  >
    <div class="flex flex-col gap-2 w-full max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold">Search your Pokémon!</h1>
      <h2 class="text-xl">There are {{ pokemonsCount }} available!</h2>
    </div>
    <Transition name="slide-left">
      <PokemonDetailsCard
        v-if="selectedPokemon"
        v-bind:pokemon="selectedPokemon"
        v-on:close="selectPokemon()"
      />
    </Transition>
    <Pagination
      v-if="pokemonsToShow.length"
      v-bind:selected-limit="selectedLimit"
      v-bind:selected-page="selectedPage"
      v-bind:limits="limitsList"
      v-bind:pages="pagesList"
      v-bind:query-text="pokemonsFilterText"
      v-on:change-limit="(value) => (selectedLimit = value)"
      v-on:change-page="(value) => (selectedPage = value)"
      v-on:change-text="(value) => (pokemonsFilterText = value)"
    />
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 w-full max-w-5xl mx-auto"
    >
      <PokemonLiteCard
        v-for="pokemon in pokemonsToShow"
        v-bind:key="pokemon.name"
        v-bind:pokemon-lite="pokemon"
        v-on:select="selectPokemon"
      />
    </div>
    <Pagination
      v-if="pokemonsToShow.length"
      v-bind:selected-limit="selectedLimit"
      v-bind:selected-page="selectedPage"
      v-bind:limits="limitsList"
      v-bind:pages="pagesList"
      v-bind:hide-query-text="true"
      v-on:change-limit="(value) => (selectedLimit = value)"
      v-on:change-page="(value) => (selectedPage = value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokeapiStore } from '../stores'
import { Pokemon, PokemonLite } from '../types'
import Pagination from '../components/Pagination.vue'
import PokemonDetailsCard from '../components/PokemonDetailsCard.vue'
import PokemonLiteCard from '../components/PokemonLiteCard.vue'

const pokeapiStore = usePokeapiStore()
const { pokemonsFilterText, pokemonsCount, filteredPokemons } =
  storeToRefs(pokeapiStore)

const selectedLimit = ref(32)
const limitsList = [16, 32, 64, 128]
const selectedPage = ref(0)
const viewRef = ref<HTMLInputElement>()
const selectedPokemon = ref<Pokemon | null>()

// Get the list of pages based on the total o pokemons available and the limit per page.
const pagesList = computed(() => {
  const totalOfPages = Math.ceil(pokemonsCount.value / selectedLimit.value)
  const newPagesList = []
  for (let i = 0; i < totalOfPages; i += 1) {
    newPagesList.push(i)
  }
  return newPagesList
})

// Get a list of pokemons to show based on the limit and current page.
const pokemonsToShow = computed(() => {
  let offset = selectedLimit.value * selectedPage.value - 1
  if (offset < 0) {
    offset = 0
  }
  const section = filteredPokemons.value.slice(
    offset,
    offset + selectedLimit.value,
  )
  return section
})

// Select a pokemon from the Lite list, diplaying more information in a car at the top of the page. Also scroll back to the top.
const selectPokemon = async (pokemon?: PokemonLite) => {
  if (!pokemon) {
    selectedPokemon.value = null
    return
  }
  if (viewRef.value) {
    viewRef.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
  selectedPokemon.value = await pokeapiStore.fetchUniquePokemon(pokemon.id)
}

// If the query text changes, set the page back to 1.
watch(pokemonsFilterText, () => {
  selectedPage.value = 0
})

// When the pokemons are loaded, select the first one.
watch(filteredPokemons, () => {
  selectPokemon(filteredPokemons.value[0])
})
</script>

<style scoped>
.pagination-button {
  @apply flex justify-center items-center h-10 text-gray-300 bg-gray-700 px-3 py-2 text-sm font-medium;
  @apply hover:bg-gray-900 hover:text-white hover:scale-95 transition-all;
}
</style>
